import { Component } from "react";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    console.error("ErrorBoundary caught:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="rounded-lg border border-red-300 bg-red-50 p-4 text-red-700">
          <h2 className="font-bold">Erreur de rendu</h2>
          <p className="text-sm">{this.state.error?.message}</p>
          <details className="mt-2 text-xs">
            <summary>Détails</summary>
            <pre className="mt-1 overflow-auto bg-white p-2 text-red-600">
              {this.state.error?.stack}
            </pre>
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}
