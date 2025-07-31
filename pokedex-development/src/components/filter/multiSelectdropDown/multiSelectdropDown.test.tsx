import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AppMultiSelectDropDown, { AppMultiSelectDropDownProps } from './multiSelectdropDown';

describe('AppMultiSelectDropDown', () => {
  const mockProps: AppMultiSelectDropDownProps = {
    label: 'Select options',
    placeholder: 'Choose...',
    data: [
      { label: 'Option 1', value: 1 },
      { label: 'Option 2', value: 2 },
    ],
    onChangeHandler: jest.fn(),
    onCloseHandler: jest.fn(),
    onOpenHandler: jest.fn(),
    onCleanHandler: jest.fn(),
    isOpen: true,
  };

  it('renders the component with label and placeholder', () => {
    render(<AppMultiSelectDropDown {...mockProps} />);
    expect(screen.getByText('Select options')).toBeInTheDocument();
    expect(screen.getByText('Choose...')).toBeInTheDocument();
  });

  it('calls onOpenHandler when dropdown is opened', () => {
    render(<AppMultiSelectDropDown {...mockProps} />);
    fireEvent.click(screen.getByText('Choose...'));
    expect(mockProps.onOpenHandler).toHaveBeenCalled();
  });

  it('calls onChangeHandler when an option is selected', () => {
    render(<AppMultiSelectDropDown {...mockProps} />);
    fireEvent.click(screen.getByText('Choose...'));
    const option = screen.getByText('Option 1');
    fireEvent.click(option);
    expect(mockProps.onChangeHandler).toHaveBeenCalled();
  });
});
