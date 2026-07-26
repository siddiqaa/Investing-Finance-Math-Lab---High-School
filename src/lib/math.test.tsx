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

  it('handles bold text with ** and *', () => {
    const { container } = render(<>{processMathText('This is **bold** and *also bold* text')}</>);
    const boldSpans = container.querySelectorAll('span.font-bold');
    expect(boldSpans.length).toBe(2);
    expect(boldSpans[0].textContent).toBe('bold');
    expect(boldSpans[1].textContent).toBe('also bold');
  });

  it('restores escaped dollar signs as currency', () => {
    const { container } = render(<>{processMathText('Price is \\$100')}</>);
    expect(container.textContent).toContain('Price is $100');
  });
});
