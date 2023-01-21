import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { ManageRectangle } from '../components/ManageRectangle';

it('renders Clear Button', () => {
  render(<ManageRectangle />);
  expect(screen.getByText('Clear')).toBeInTheDocument();
});

it('renders Selected Rectangle Header', () => {
    render(<ManageRectangle />);
    expect(screen.getByText('Selected Rectangle')).toBeInTheDocument();
});

it('renders None for not selectedId', () => {
    render(<ManageRectangle />);
    expect(screen.getByText('None')).toBeInTheDocument();
});

it('renders EditSection when passed a selectedRectangleId', () => {
    render(<ManageRectangle selectedId='someRect' rectangles={[{ id: 'someRect' }]}/>);
    expect(screen.getByTestId('EditSection')).toBeInTheDocument();
});

it('calls setRectangles on color Change button click', () => {
    const setRectangles = jest.fn()
    const setSelectedId = jest.fn()
    
    render(<ManageRectangle selectedId='someRect' rectangles={[{ id: 'someRect' }]} setRectangles={setRectangles} setSelectedId={setSelectedId} />);
    
    fireEvent(screen.getByText('Change'), new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }))

    expect(setRectangles).toHaveBeenCalled()
});

it('calls setSelectedId with null on color Change button click', () => {
    const setRectangles = jest.fn()
    const setSelectedId = jest.fn()
    
    render(<ManageRectangle selectedId='someRect' rectangles={[{ id: 'someRect' }]} setRectangles={setRectangles} setSelectedId={setSelectedId} />);
    
    fireEvent(screen.getByText('Change'), new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }))

    expect(setSelectedId).toHaveBeenCalledWith(null)
});