import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; 
import Button from '../button'; 

describe('Button component', () => {
  test('renders with correct label', () => {
    render(<Button ariaLabel="Test Button">Click Me</Button>);
    const buttonElement = screen.getByLabelText(/Test Button/i);
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent('Click Me');
  });

  test('handles onClick event', () => {
    const handleClick = jest.fn();
    render(
      <Button ariaLabel="Test Button" onClick={handleClick}>
        Click Me
      </Button>
    );
    const buttonElement = screen.getByLabelText(/Test Button/i);
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
