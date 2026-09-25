@echo off
rem ==============================================================================
rem  Universal GitHub Pages Deployment Script (Windows Batch)
rem  Reusable across Vite, React, Next.js (export), Vue, Angular, Astro, Hugo, HTML
rem ==============================================================================
setlocal enabledelayedexpansion

:: Ensure execution from the directory where this script is located (project root)
cd /d "%~dp0"

:: -----------------------------------------------------------------------------
:: Default Configuration (Can be overridden by environment variables or CLI flags)
:: -----------------------------------------------------------------------------
set "TARGET_BRANCH=gh-pages"
if defined GH_PAGES_BRANCH set "TARGET_BRANCH=%GH_PAGES_BRANCH%"

set "REMOTE_NAME=origin"
if defined GH_PAGES_REMOTE set "REMOTE_NAME=%GH_PAGES_REMOTE%"

set "BUILD_DIR="
if defined GH_PAGES_DIR set "BUILD_DIR=%GH_PAGES_DIR%"

set "CUSTOM_MSG="
if defined GH_PAGES_MESSAGE set "CUSTOM_MSG=%GH_PAGES_MESSAGE%"

set "CUSTOM_BUILD_CMD="
if defined GH_PAGES_BUILD_CMD set "CUSTOM_BUILD_CMD=%GH_PAGES_BUILD_CMD%"

set "DO_BUILD=1"
if defined GH_PAGES_NO_BUILD if "%GH_PAGES_NO_BUILD%"=="1" set "DO_BUILD=0"

set "NON_INTERACTIVE=0"
if defined GH_PAGES_YES if "%GH_PAGES_YES%"=="1" set "NON_INTERACTIVE=1"
if defined CI set "NON_INTERACTIVE=1"

set "DRY_RUN=0"
if defined GH_PAGES_DRY_RUN if "%GH_PAGES_DRY_RUN%"=="1" set "DRY_RUN=1"

:: -----------------------------------------------------------------------------
:: Parse Command Line Arguments
:: -----------------------------------------------------------------------------
:parse_args
if "%~1"=="" goto after_args

if /i "%~1"=="--help" goto show_help
if /i "%~1"=="-h" goto show_help
if /i "%~1"=="/?" goto show_help

if /i "%~1"=="--no-build" (
    set "DO_BUILD=0"
    shift
    goto parse_args
)
if /i "%~1"=="-n" (
    set "DO_BUILD=0"
    shift
    goto parse_args
)
if /i "%~1"=="--yes" (
    set "NON_INTERACTIVE=1"
    shift
    goto parse_args
)
if /i "%~1"=="-y" (
    set "NON_INTERACTIVE=1"
    shift
    goto parse_args
)
if /i "%~1"=="--dry-run" (
    set "DRY_RUN=1"
    shift
    goto parse_args
)
if /i "%~1"=="-d" (
    set "BUILD_DIR=%~2"
    shift
    shift
    goto parse_args
)
if /i "%~1"=="--dir" (
    set "BUILD_DIR=%~2"
    shift
    shift
    goto parse_args
)
if /i "%~1"=="-b" (
    set "TARGET_BRANCH=%~2"
    shift
    shift
    goto parse_args
)
if /i "%~1"=="--branch" (
    set "TARGET_BRANCH=%~2"
    shift
    shift
    goto parse_args
)
if /i "%~1"=="-r" (
    set "REMOTE_NAME=%~2"
    shift
    shift
    goto parse_args
)
if /i "%~1"=="--remote" (
    set "REMOTE_NAME=%~2"
    shift
    shift
    goto parse_args
)
if /i "%~1"=="-m" (
    set "CUSTOM_MSG=%~2"
    shift
    shift
    goto parse_args
)
if /i "%~1"=="--message" (
    set "CUSTOM_MSG=%~2"
    shift
    shift
    goto parse_args
)
if /i "%~1"=="-c" (
    set "CUSTOM_BUILD_CMD=%~2"
    shift
    shift
    goto parse_args
)
if /i "%~1"=="--cmd" (
    set "CUSTOM_BUILD_CMD=%~2"
    shift
    shift
    goto parse_args
)

:: Handle positional directory argument if not prefixed with dash
set "ARG=%~1"
if not "!ARG:~0,1!"=="-" (
    if not defined BUILD_DIR (
        set "BUILD_DIR=!ARG!"
        shift
        goto parse_args
    )
)

echo [WARNING] Unrecognized argument: %~1
shift
goto parse_args

:after_args

:: -----------------------------------------------------------------------------
:: Pre-Flight Checks
:: -----------------------------------------------------------------------------
echo.
echo ============================================================
echo   GitHub Pages Reusable Deployer
echo ============================================================

:: 1. Check if git is available
where git >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Git is not installed or not in your PATH.
    echo Please install Git from https://git-scm.com/
    goto exit_error
)

:: 2. Check if current directory is a git repository
git rev-parse --is-inside-work-tree >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Not inside a Git repository.
    echo Please run this script from the root of a Git-tracked project.
    goto exit_error
)

:: 3. Check for remote repository URL
set "REMOTE_URL="
for /f "delims=" %%u in ('git config --get remote.%REMOTE_NAME%.url 2^>nul') do set "REMOTE_URL=%%u"
if not defined REMOTE_URL (
    for /f "delims=" %%u in ('git remote get-url %REMOTE_NAME% 2^>nul') do set "REMOTE_URL=%%u"
)

if not defined REMOTE_URL (
    echo [ERROR] Git remote '%REMOTE_NAME%' was not found.
    echo Configure a remote with: git remote add %REMOTE_NAME% ^<repository-url^>
    goto exit_error
)

:: 4. Auto-detect build directory if not specified
if not defined BUILD_DIR (
    if exist "dist\" (
        set "BUILD_DIR=dist"
    ) else if exist "build\" (
        set "BUILD_DIR=build"
    ) else if exist "out\" (
        set "BUILD_DIR=out"
    ) else if exist "public\" (
        set "BUILD_DIR=public"
    ) else (
        set "BUILD_DIR=dist"
    )
)

:: 5. Auto-detect build command if enabled
set "BUILD_EXEC="
if "%DO_BUILD%"=="1" (
    if defined CUSTOM_BUILD_CMD (
        set "BUILD_EXEC=%CUSTOM_BUILD_CMD%"
    ) else if exist "pnpm-lock.yaml" (
        set "BUILD_EXEC=pnpm run build"
    ) else if exist "yarn.lock" (
        set "BUILD_EXEC=yarn build"
    ) else if exist "bun.lockb" (
        set "BUILD_EXEC=bun run build"
    ) else if exist "package.json" (
        set "BUILD_EXEC=npm run build"
    ) else (
        echo [INFO] No package.json found; skipping build step.
        set "DO_BUILD=0"
    )
)

:: 6. Determine commit message
set "GIT_HASH="
for /f "tokens=*" %%c in ('git rev-parse --short HEAD 2^>nul') do set "GIT_HASH=%%c"

if defined CUSTOM_MSG (
    set "COMMIT_MSG=%CUSTOM_MSG%"
) else (
    if defined GIT_HASH (
        set "COMMIT_MSG=Deploy from %GIT_HASH% [%DATE% %TIME%]"
    ) else (
        set "COMMIT_MSG=Deploy to GitHub Pages [%DATE% %TIME%]"
    )
)

:: 7. Resolve predicted GitHub Pages URL
set "CLEAN_URL=%REMOTE_URL%"
set "CLEAN_URL=%CLEAN_URL:https://github.com/=%"
set "CLEAN_URL=%CLEAN_URL:http://github.com/=%"
set "CLEAN_URL=%CLEAN_URL:git@github.com:=%"
set "GH_USER="
set "GH_REPO="
for /f "tokens=1,2 delims=/" %%a in ("%CLEAN_URL%") do (
    set "GH_USER=%%a"
    set "GH_REPO=%%b"
)
if defined GH_REPO set "GH_REPO=%GH_REPO:.git=%"

set "PREDICTED_URL="
if defined GH_USER if defined GH_REPO (
    if /i "%GH_REPO%"=="%GH_USER%.github.io" (
        set "PREDICTED_URL=https://%GH_USER%.github.io/"
    ) else (
        set "PREDICTED_URL=https://%GH_USER%.github.io/%GH_REPO%/"
    )
)

:: -----------------------------------------------------------------------------
:: Display Plan & Confirm
:: -----------------------------------------------------------------------------
echo   Target Folder : %BUILD_DIR%
echo   Target Branch : %TARGET_BRANCH%
echo   Git Remote    : %REMOTE_NAME% (%REMOTE_URL%)
if "%DO_BUILD%"=="1" (
    echo   Build Command : %BUILD_EXEC%
) else (
    echo   Build Step    : Skipped ^(--no-build^)
)
echo   Commit Message: %COMMIT_MSG%
if defined PREDICTED_URL echo   Site URL      : %PREDICTED_URL%
if "%DRY_RUN%"=="1" echo   Mode          : [DRY RUN - No changes will be pushed]
echo ============================================================
echo.

if "%NON_INTERACTIVE%"=="0" (
    set /p CONFIRM="Proceed with deployment? [Y/n]: "
    if /i "!CONFIRM!"=="n" (
        echo [INFO] Deployment cancelled by user.
        goto exit_ok
    )
    if /i "!CONFIRM!"=="no" (
        echo [INFO] Deployment cancelled by user.
        goto exit_ok
    )
)

:: -----------------------------------------------------------------------------
:: Step 1: Run Build
:: -----------------------------------------------------------------------------
if "%DO_BUILD%"=="1" (
    echo [STEP 1/3] Running build command: %BUILD_EXEC% ...
    call %BUILD_EXEC%
    if !ERRORLEVEL! neq 0 (
        echo.
        echo [ERROR] Build command failed with exit code !ERRORLEVEL!.
        echo Deployment aborted.
        goto exit_error
    )
    echo [INFO] Build completed successfully.
) else (
    echo [STEP 1/3] Skipping build step as requested.
)

:: Verify build directory exists
if not exist "%BUILD_DIR%\" (
    echo.
    echo [ERROR] Build directory '%BUILD_DIR%' does not exist!
    echo Ensure your build tool outputs to '%BUILD_DIR%' or specify the folder using:
    echo   deploy-gh-pages.bat --dir ^<folder^>
    goto exit_error
)

:: -----------------------------------------------------------------------------
:: Step 2: Prepare GitHub Pages Assets (.nojekyll, CNAME, 404 SPA fallback)
:: -----------------------------------------------------------------------------
echo.
echo [STEP 2/3] Preparing deployment bundle in '%BUILD_DIR%' ...

:: 1. Bypass Jekyll processing (critical for assets and folders prefixed with _)
if not exist "%BUILD_DIR%\.nojekyll" (
    type nul > "%BUILD_DIR%\.nojekyll"
    echo   + Created .nojekyll
)

:: 2. Handle SPA client-side routing fallback (copy index.html -> 404.html)
if exist "%BUILD_DIR%\index.html" (
    if not exist "%BUILD_DIR%\404.html" (
        copy /y "%BUILD_DIR%\index.html" "%BUILD_DIR%\404.html" >nul
        echo   + Created 404.html ^(SPA routing fallback^)
    )
)

:: 3. Preserve custom domain CNAME if present in project root or public directory
if not exist "%BUILD_DIR%\CNAME" (
    if exist "CNAME" (
        copy /y "CNAME" "%BUILD_DIR%\CNAME" >nul
        echo   + Copied CNAME from root
    ) else if exist "public\CNAME" (
        copy /y "public\CNAME" "%BUILD_DIR%\CNAME" >nul
        echo   + Copied CNAME from public\
    )
)

:: If CNAME exists, update URL output
if exist "%BUILD_DIR%\CNAME" (
    set /p CUSTOM_CNAME=<"%BUILD_DIR%\CNAME"
    if defined CUSTOM_CNAME set "PREDICTED_URL=https://!CUSTOM_CNAME!/"
)

:: Capture local git user config to preserve author info in isolated push
set "GIT_AUTHOR_NAME="
set "GIT_AUTHOR_EMAIL="
for /f "delims=" %%n in ('git config user.name 2^>nul') do set "GIT_AUTHOR_NAME=%%n"
for /f "delims=" %%e in ('git config user.email 2^>nul') do set "GIT_AUTHOR_EMAIL=%%e"

:: -----------------------------------------------------------------------------
:: Step 3: Isolated Git Deployment
:: -----------------------------------------------------------------------------
echo.
echo [STEP 3/3] Deploying to branch '%TARGET_BRANCH%' on '%REMOTE_NAME%' ...

if "%DRY_RUN%"=="1" (
    echo [DRY RUN] Would initialize Git in '%BUILD_DIR%', commit all files,
    echo           and force-push to: %REMOTE_URL% ^(%TARGET_BRANCH%^)
    echo [DRY RUN] Deployment skipped.
    goto exit_ok
)

pushd "%BUILD_DIR%"

:: Clean up any lingering git metadata inside build folder
if exist ".git\" (
    attrib -r -h -s ".git\*.*" /s /d >nul 2>nul
    rmdir /s /q ".git" >nul 2>nul
)

:: Initialize isolated repository
git init -q
if !ERRORLEVEL! neq 0 (
    echo [ERROR] Failed to initialize temporary git repository in %BUILD_DIR%.
    popd
    goto exit_error
)

git checkout -B "%TARGET_BRANCH%" -q

:: Restore user credentials for this isolated commit
if defined GIT_AUTHOR_NAME git config user.name "%GIT_AUTHOR_NAME%"
if defined GIT_AUTHOR_EMAIL git config user.email "%GIT_AUTHOR_EMAIL%"

git add -A
git commit -m "%COMMIT_MSG%" -q
if !ERRORLEVEL! neq 0 (
    echo [WARNING] No new changes to commit in '%BUILD_DIR%'.
)

echo [INFO] Pushing '%TARGET_BRANCH%' to %REMOTE_URL% ...
git push -f "%REMOTE_URL%" "%TARGET_BRANCH%"
set "PUSH_STATUS=!ERRORLEVEL!"

popd

:: Clean up temporary git folder inside build dir
if exist "%BUILD_DIR%\.git\" (
    attrib -r -h -s "%BUILD_DIR%\.git\*.*" /s /d >nul 2>nul
    rmdir /s /q "%BUILD_DIR%\.git" >nul 2>nul
)

if %PUSH_STATUS% neq 0 (
    echo.
    echo ============================================================
    echo [ERROR] Git push failed with exit code %PUSH_STATUS%.
    echo.
    echo Troubleshooting Tips:
    echo 1. Check your internet connection and GitHub authentication (PAT/SSH).
    echo 2. Verify write access to %REMOTE_URL%.
    echo 3. Ensure the branch '%TARGET_BRANCH%' is not branch-protected from force-pushes.
    echo ============================================================
    goto exit_error
)

:: -----------------------------------------------------------------------------
:: Success Summary
:: -----------------------------------------------------------------------------
echo.
echo ============================================================
echo   SUCCESS! Deployment complete.
echo ============================================================
if defined PREDICTED_URL (
    echo   Your site will be live shortly at:
    echo   %PREDICTED_URL%
    echo.
)
echo   First-time setup reminder:
echo   In your GitHub repository settings:
echo   Settings -^> Pages -^> Build and deployment:
echo     - Source: Deploy from a branch
echo     - Branch: %TARGET_BRANCH% / (root)
echo ============================================================
goto exit_ok

:: -----------------------------------------------------------------------------
:: Help Menu
:: -----------------------------------------------------------------------------
:show_help
echo.
echo Universal GitHub Pages Deployment Script for Windows
echo.
echo USAGE:
echo   deploy-gh-pages.bat [directory] [options]
echo.
echo ARGUMENTS:
echo   [directory]             Build output directory (default: dist, build, out, or public)
echo.
echo OPTIONS:
echo   -d, --dir ^<folder^>      Specify build output directory explicitly
echo   -b, --branch ^<branch^>   Target GitHub Pages branch (default: gh-pages)
echo   -r, --remote ^<remote^>   Git remote name (default: origin)
echo   -m, --message ^<msg^>     Custom commit message for deployment
echo   -c, --cmd ^<command^>     Custom build command (e.g. "npm run build:prod")
echo   -n, --no-build          Skip build step and deploy existing build folder
echo   -y, --yes               Skip confirmation prompt (non-interactive / CI mode)
echo       --dry-run           Simulate deployment without pushing to GitHub
echo   -h, --help, /?          Display this help message
echo.
echo EXAMPLES:
echo   deploy-gh-pages.bat
echo   deploy-gh-pages.bat --no-build
echo   deploy-gh-pages.bat -d build -b gh-pages
echo   deploy-gh-pages.bat -m "Release v2.0" -y
echo   deploy-gh-pages.bat --cmd "pnpm build" --dry-run
echo.
echo ENVIRONMENT VARIABLES:
echo   GH_PAGES_DIR            Default build directory
echo   GH_PAGES_BRANCH         Default deployment branch
echo   GH_PAGES_REMOTE         Default git remote
echo   GH_PAGES_MESSAGE        Default commit message
echo   GH_PAGES_BUILD_CMD      Default build command
echo   GH_PAGES_NO_BUILD=1     Skip build by default
echo   GH_PAGES_YES=1          Non-interactive by default
echo.
goto exit_ok

:: -----------------------------------------------------------------------------
:: Exit Handlers
:: -----------------------------------------------------------------------------
:exit_ok
endlocal
exit /b 0

:exit_error
endlocal
exit /b 1
