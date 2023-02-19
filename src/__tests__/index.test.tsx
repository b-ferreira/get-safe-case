import { render, screen } from '@testing-library/react';
import React from 'react';

import Home from '@pages/index';

it('renders learn react link', () => {
  render(<Home />);
  const linkElement = screen.getByText(/Get started/i);
  expect(linkElement).toBeInTheDocument();
});
