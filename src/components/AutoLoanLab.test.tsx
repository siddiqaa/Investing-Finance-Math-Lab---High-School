import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AutoLoanLab } from './AutoLoanLab';
import React from 'react';

describe('AutoLoanLab', () => {
  it('renders correctly with default vehicle and loan parameters', () => {
    render(<AutoLoanLab />);
    expect(screen.getByText(/Auto Loan & Total Cost of Ownership Simulator/i)).toBeInTheDocument();
    expect(screen.getByText(/Gas vs EV Comparison/i)).toBeInTheDocument();
    expect(screen.getByText(/Gasoline Car \(ICE\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Electric Vehicle \(EV\)/i)).toBeInTheDocument();
  });

  it('allows switching between Gas vs EV Comparison and Single Vehicle Loan modes', () => {
    render(<AutoLoanLab />);
    
    // Switch to Single Vehicle Loan mode
    const singleModeBtn = screen.getByText(/Single Vehicle Loan/i);
    fireEvent.click(singleModeBtn);

    expect(screen.getByText(/Monthly Loan Payment \(\$PMT\$\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Total Loan Interest Paid/i)).toBeInTheDocument();
    expect(screen.getByText(/Amortization Schedule Progression/i)).toBeInTheDocument();
  });

  it('updates loan term when term buttons are clicked', () => {
    render(<AutoLoanLab />);
    
    // Click 36m term button
    const btn36 = screen.getByRole('button', { name: '36m' });
    fireEvent.click(btn36);

    expect(screen.getAllByText(/36-Month Total Cost of Ownership:/i).length).toBeGreaterThan(0);
  });
});
