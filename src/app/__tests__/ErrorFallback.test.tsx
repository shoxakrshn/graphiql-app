import { render, screen, fireEvent } from '@testing-library/react';
import ErrorFallback from './../../shared/ui/ErrorFallback/index';

describe('ErrorFallback Component', () => {
  test('renders error message and a "Try again" button', () => {
    const error = new Error('Test error message');
    const resetErrorBoundary = () => {};

    render(<ErrorFallback error={error} resetErrorBoundary={resetErrorBoundary} />);

    const errorMessage = screen.getByText('Something went wrong');
    expect(errorMessage).toBeInTheDocument();

    const tryAgainButton = screen.getByRole('button', { name: 'Try again' });
    expect(tryAgainButton).toBeInTheDocument();

    fireEvent.click(tryAgainButton);
  });
});
