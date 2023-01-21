import React from 'react';
import { render, screen } from '@testing-library/react';
import { Header } from '../components/Header';

it('renders Header', () => {
  render(<Header />);
  expect(screen.getByText('Rectangular Manipulation')).toBeInTheDocument();
});