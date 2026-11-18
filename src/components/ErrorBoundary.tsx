import React from 'react';

interface State {
  hasError: boolean;
  message: string;
}

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  State
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message || 'Unexpected error' };
  }

  render() {
    if (this.state.hasError) {
      const parsedMsg = this.state.message;

      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0B0F17] p-6">
          <div className="max-w-lg w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131A26] p-8 space-y-4">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              Se ha producido una interrupción en la sesión
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed break-words">
              {parsedMsg}
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="px-4 py-2.5 rounded-lg bg-sky-600 text-white text-sm font-medium hover:bg-sky-500 transition-colors"
            >
              Recargar estudio
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
