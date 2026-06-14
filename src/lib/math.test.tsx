import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { processMathText } from './math';
import React from 'react';

describe('processMathText', () => {
  it('renders plain text as spans', () => {
    const { container } = render(<>{processMathText('Hello World')}</>);
    expect(container.textContent).toBe('Hello World');
  });

  it('identifies math between dollar signs', () => {
    const { container } = render(<>{processMathText('The formula is $E=mc^2$')}</>);
    // The fallback for MathSpan (since window.katex is missing) is a code tag with $tex$
    const codeTag = container.querySelector('code');
    expect(codeTag).toBeInTheDocument();
    expect(codeTag?.textContent).toBe('$E=mc^2$');
  });

  it('handles bold text with **', () => {
    const { container } = render(<>{processMathText('This is **bold** text')}</>);
    const strongTag = container.querySelector('strong');
    expect(strongTag).toBeInTheDocument();
    expect(strongTag?.textContent).toBe('bold');
  });

  it('restores escaped dollar signs as currency', () => {
    const { container } = render(<>{processMathText('Price is \\$100')}</>);
    expect(container.textContent).toContain('Price is $100');
  });
});
