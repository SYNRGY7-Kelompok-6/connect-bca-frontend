
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // for additional matchers
import ButtonIcon from '../buttonicon';

describe('ButtonIcon component', () => {
  test('renders with correct text and image', () => {
    render(
      <ButtonIcon
        ariaLabel="Test Icon Button"
        imgSrc="path/to/image.png"
        imgAlt="Test Image"
        text="Click Me"
      />
    );

    // Check if the text is rendered
    expect(screen.getByText('Click Me')).toBeInTheDocument();

    // Check if the image is rendered with the correct alt text
    expect(screen.getByAltText('Test Image')).toBeInTheDocument();
  });

  test('handles onClick event', () => {
    const handleClick = jest.fn();
    render(
      <ButtonIcon
        ariaLabel="Test Icon Button"
        imgSrc="path/to/image.png"
        imgAlt="Test Image"
        text="Click Me"
        onClick={handleClick}
      />
    );

    // Trigger the click event
    fireEvent.click(screen.getByText('Click Me'));

    // Check if the onClick function was called
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
