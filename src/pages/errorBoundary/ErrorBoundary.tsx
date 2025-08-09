
import React from "react";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

// Fallback UI to display when an error occurs
const FallbackComponent = ({ error }: { error: Error }) => {
  if (import.meta.env.MODE === "development") {
    return (
      <div role="alert">
        <h2>Something went wrong:</h2>
        <pre>{error.message}</pre>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  } else {
    return (
      <div role="alert">
        <h2>Something went wrong:</h2>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }
};

const ErrorBoundary: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ReactErrorBoundary FallbackComponent={FallbackComponent}>
      {children}
    </ReactErrorBoundary>
  );
};

export default ErrorBoundary;
