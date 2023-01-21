import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { ManageLayouts } from '../components/ManageLayouts';

it('renders Layouts Header', () => {
  render(<ManageLayouts layouts={[]} />);
  expect(screen.getByText('Layouts')).toBeInTheDocument();
});

it('renders singular Layout selection', () => {
    render(<ManageLayouts layouts={[{ name: 'Layout 1' }]} />);
    expect(screen.getByText('Layout 1')).toBeInTheDocument();
});

it('renders two Layout selections', () => {
    render(<ManageLayouts layouts={[{ name: 'Layout 1' }, { name: 'Layout 2' }]} />);
    expect(screen.getByText('Layout 1')).toBeInTheDocument();
    expect(screen.getByText('Layout 2')).toBeInTheDocument();
});

it('renders three Layout selections', () => {
    render(<ManageLayouts layouts={[{ name: 'Layout 1' }, { name: 'Layout 2' }, { name: 'Layout 3' }]} />);
    expect(screen.getByText('Layout 1')).toBeInTheDocument();
    expect(screen.getByText('Layout 2')).toBeInTheDocument();
    expect(screen.getByText('Layout 3')).toBeInTheDocument();
});

it('calls setNewLayoutName when new layout name changed', () => {
    const setNewLayoutName = jest.fn()
    const setLayouts = jest.fn()
    const setSelectedLayoutIndex = jest.fn()
    render(<ManageLayouts layouts={[]} setNewLayoutName={setNewLayoutName} setLayouts={setLayouts} setSelectedLayoutIndex={setSelectedLayoutIndex} />);
    fireEvent.change(screen.getByTestId('NewLayoutNameTextbox'), {target: { value: 'NewLayout' }})
    
    expect(setNewLayoutName).toHaveBeenCalled()
});

it('calls setLayouts when + button clicked', () => {
    const setNewLayoutName = jest.fn()
    const setLayouts = jest.fn()
    const setSelectedLayoutIndex = jest.fn()
    render(<ManageLayouts layouts={[]} newLayoutName='NewLayout' setNewLayoutName={setNewLayoutName} setLayouts={setLayouts} setSelectedLayoutIndex={setSelectedLayoutIndex} />);

    fireEvent(screen.getByText('+'), new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }))
    
    expect(setLayouts).toHaveBeenCalled()
});

it('calls setSelectedLayoutIndex when + button clicked', () => {
    const setNewLayoutName = jest.fn()
    const setLayouts = jest.fn()
    const setSelectedLayoutIndex = jest.fn()
    render(<ManageLayouts layouts={[]} newLayoutName='NewLayout' setNewLayoutName={setNewLayoutName} setLayouts={setLayouts} setSelectedLayoutIndex={setSelectedLayoutIndex} />);

    fireEvent(screen.getByText('+'), new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }))
    
    expect(setSelectedLayoutIndex).toHaveBeenCalled()
});

it('does not call setLayouts when + button clicked for empty new layout name', () => {
    const setNewLayoutName = jest.fn()
    const setLayouts = jest.fn()
    const setSelectedLayoutIndex = jest.fn()
    render(<ManageLayouts layouts={[]} setNewLayoutName={setNewLayoutName} setLayouts={setLayouts} setSelectedLayoutIndex={setSelectedLayoutIndex} />);
    fireEvent(screen.getByText('+'), new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }))
    
    expect(setLayouts).not.toHaveBeenCalled()
});

it('calls setLayouts when delete button clicked with 2 layout options', () => {
    const setLayouts = jest.fn()
    const setSelectedLayoutIndex = jest.fn()
    render(<ManageLayouts layouts={[{ name: 'Layout 1' }, { name: 'Layout 2' }]} setLayouts={setLayouts} setSelectedLayoutIndex={setSelectedLayoutIndex} />);
    fireEvent(screen.getByText('Delete Selected Layout'), new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }))
    
    expect(setLayouts).toHaveBeenCalled()
});

it('calls setLayouts when delete button clicked with 3 layout options', () => {
    const setLayouts = jest.fn()
    const setSelectedLayoutIndex = jest.fn()
    render(<ManageLayouts layouts={[{ name: 'Layout 1' }, { name: 'Layout 2' }, { name: 'Layout 3' }]} setLayouts={setLayouts} setSelectedLayoutIndex={setSelectedLayoutIndex} />);
    fireEvent(screen.getByText('Delete Selected Layout'), new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }))
    
    expect(setLayouts).toHaveBeenCalled()
});

it('does not call setLayouts when delete button clicked with 1 layout options', () => {
    const setLayouts = jest.fn()
    const setSelectedLayoutIndex = jest.fn()
    render(<ManageLayouts layouts={[{ name: 'Layout 1' }]} setLayouts={setLayouts} setSelectedLayoutIndex={setSelectedLayoutIndex} />);
    fireEvent(screen.getByText('Delete Selected Layout'), new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }))
    
    expect(setLayouts).not.toHaveBeenCalled()
});