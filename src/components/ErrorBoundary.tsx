import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  message: string;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
    message: '',
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      message: error.message,
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Application crashed:', error, errorInfo);
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      return (
        <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-6 py-12">
          <section className="w-full max-w-3xl rounded-2xl border border-slate-700 bg-slate-900 p-8 shadow-xl">
            <h1 className="text-2xl font-bold mb-3">Rendering Error</h1>
            <p className="text-slate-300 mb-4">
              The landing page crashed while rendering. Refresh once, and if this persists share the message below.
            </p>
            <pre className="rounded-lg bg-slate-950 border border-slate-800 p-4 text-sm text-rose-300 whitespace-pre-wrap break-words">
              {this.state.message || 'Unknown render error'}
            </pre>
          </section>
        </main>
      );
    }

    return this.props.children;
  }
}
