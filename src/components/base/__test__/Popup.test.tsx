import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Popup from '../popup';

describe('Popup component', () => {
  test('renders with correct content', () => {
    render(
      <Popup
        message="Test Message"
        svgSrc="path/to/image.svg"
        svgAlt="Test Image"
        labelButton="Test Button"
        labelPopup="Test Popup"
        buttonText="Click Me"
        onButtonClick={() => {}}
      />
    );

    // Cek apakah pesan dirender
    expect(screen.getByText('Test Message')).toBeInTheDocument();

    // Cek apakah gambar dirender dengan teks alt yang benar
    expect(screen.getByAltText('Test Image')).toBeInTheDocument();

    // Cek apakah tombol dirender dengan aria-label yang benar
    expect(screen.getByRole('button', { name: 'Test Button' })).toBeInTheDocument();
  });
});
