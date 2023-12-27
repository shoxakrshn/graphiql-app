import { render, screen } from '@testing-library/react';
import { Footer } from '../../widgets/Footer';

describe('Footer Component', () => {
  test('renders Footer component with GitHub icons', () => {
    render(<Footer />);

    const githubIcons = screen.getAllByAltText('git-icon');
    expect(githubIcons.length).toBe(3);
  });

  test('renders Footer component with RSSCHOOL logo', () => {
    render(<Footer />);

    const rssLogo = screen.getByAltText('RSSCHOOL');
    expect(rssLogo).toBeInTheDocument();
  });

  test('renders Footer component with a link to RSSCHOOL', () => {
    render(<Footer />);

    const rssSchoolLink = screen.getByRole('link', { name: 'RSSCHOOL' });
    expect(rssSchoolLink).toBeInTheDocument();
    expect(rssSchoolLink).toHaveAttribute('href', 'https://rs.school/react/');
  });

  test('renders Footer component with a copyright statement', () => {
    render(<Footer />);

    const copyrightStatement = screen.getByText('© 2023 QraphiQL All Rights Reserved.');
    expect(copyrightStatement).toBeInTheDocument();
  });
});
