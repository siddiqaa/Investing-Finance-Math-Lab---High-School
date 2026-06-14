import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PdfExportButton } from './PdfExportButton';
import React from 'react';

// Mock high-level libraries that might cause side-effects on import
vi.mock('jspdf', () => ({
  default: vi.fn(),
}));

vi.mock('html-to-image', () => ({
  toCanvas: vi.fn(),
}));

describe('PdfExportButton', () => {
  it('renders the open printable button in its initial state', () => {
    render(<PdfExportButton />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
    expect(screen.getByText(/Open Printable Syllabus/i)).toBeInTheDocument();
  });

  it('renders the hidden export container for PDF generation', () => {
    const { container } = render(<PdfExportButton />);
    // The component renders a hidden div with many lessons for the export engine
    const hiddenContainer = container.querySelector('.fixed.-left-\\[10000px\\]');
    expect(hiddenContainer).toBeInTheDocument();
  });

  it('renders progress and introductions in the hidden container', () => {
    render(<PdfExportButton />);
    // Check if "The Big Picture" appears in the hidden container (multiple times)
    const bigPictures = screen.getAllByText(/The Big Picture/i);
    expect(bigPictures.length).toBeGreaterThan(0);
  });
});
