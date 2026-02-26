import React from 'react';
import { FallbackProps, getErrorMessage } from 'react-error-boundary';

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const errorMessage = getErrorMessage(error);

  return (
    <div>
      <h2>Something went wrong</h2>
      <p>{errorMessage}</p>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

export default ErrorFallback;
