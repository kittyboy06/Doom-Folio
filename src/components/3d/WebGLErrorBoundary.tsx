import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class WebGLErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('WebGL Rendering Error intercepted by Doom Boundary:', error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="w-full h-full min-h-[350px] flex flex-col items-center justify-center border border-[#235C3A] bg-[#0D120F]/90 p-6 text-center">
          <div className="w-12 h-12 rounded-full border border-[#B8954A] flex items-center justify-center text-[#D5B968] mb-3">
            <AlertTriangle className="w-6 h-6 animate-pulse" />
          </div>
          <div className="text-sm font-mono font-bold tracking-widest text-[#E7E4D8] uppercase">
            3D WEBGL SUBSYSTEM OFFLINE
          </div>
          <p className="text-xs font-mono text-[#858C84] mt-1 max-w-sm">
            Hardware acceleration unavailable or GPU context interrupted. Core archives remain operational.
          </p>
          <button
            onClick={this.handleRetry}
            className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 border border-[#235C3A] bg-[#173D28]/40 text-[#62D58A] text-xs font-mono tracking-wider hover:bg-[#235C3A] transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>RE-ENGAGE 3D CORE</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
