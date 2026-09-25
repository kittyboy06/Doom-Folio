@echo off
@rem Alias forwarding to deploy-gh-pages.bat
call "%~dp0deploy-gh-pages.bat" %*
exit /b %ERRORLEVEL%
