import { isDesktop } from "@/utils";
import { Button } from "@mui/material";
import React from "react";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

// Fallback UI to display when an error occurs
const FallbackComponent = ({ error }: { error: Error }) => {
  const isDesktopMode = isDesktop();
  if (import.meta.env.MODE === "development") {
    return (
      <div
        className={`flex justify-center items-center h-screen gap-4 ${
          isDesktopMode ? "flex-row-reverse" : "flex-col"
        }`}
        role="alert"
      >
        <h2>Something went wrong</h2>
        <pre>{error.message}</pre>
        <Button
          variant="outlined"
          color="error"
          onClick={() => window.location.reload()}
        >
          Try Again
        </Button>
      </div>
    );
  } else {
    return (
      <div
        className={`flex justify-center items-center h-screen gap-4 ${
          isDesktopMode ? "flex-row-reverse" : "flex-col"
        }`}
        role="alert"
      >
        <h2>Something went wrong</h2>
        <Button
          variant="outlined"
          color="error"
          onClick={() => window.location.reload()}
        >
          Try Again
        </Button>
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
