import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DiscountKnowledgeCheck } from './DiscountKnowledgeCheck';
import React from 'react';

describe('DiscountKnowledgeCheck', () => {
  it('renders correctly with initial instructions', () => {
    render(<DiscountKnowledgeCheck />);
    expect(screen.getByText(/The Lottery Dilemma: Thinking in Reverse/)).toBeInTheDocument();
    expect(screen.getByText(/Apply Present Value discounting to make an informed choice/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter calculated PV (e.g. 1018800)')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter calculated PV (e.g. 885000)')).toBeInTheDocument();
  });

  it('toggles hint correctly', () => {
    render(<DiscountKnowledgeCheck />);
    const hintBtn = screen.getByText(/Show Hint/);
    fireEvent.click(hintBtn);
    expect(screen.getByText(/Formula Guide & Hint/)).toBeInTheDocument();
    expect(screen.getByText(/Hide Hint/)).toBeInTheDocument();
  });

  it('handles scenario selection and verification', () => {
    render(<DiscountKnowledgeCheck />);
    
    // Fill in incorrect values initially
    const inputs = screen.getAllByRole('textbox');
    fireEvent.change(inputs[0], { target: { value: '999' } }); // incorrect PV for 5%
    fireEvent.change(inputs[1], { target: { value: '111' } }); // incorrect PV for 8%

    // Select options (let's pick Option A for Scenario 1 - which is incorrect since B is better, and Option B for Scenario 2 - which is incorrect)
    const optionButtons = screen.getAllByRole('button');
    // Let's click the first Option A button
    const scenario1Buttons = screen.getAllByText('$1,000,000 Today');
    const scenario2Buttons = screen.getAllByText('$1,300,000 Later');

    fireEvent.click(scenario1Buttons[0]); // Option A for Scenario 1 (Incorrect)
    fireEvent.click(scenario2Buttons[1]); // Option B for Scenario 2 (Incorrect)

    const checkBtn = screen.getByText(/Check Answers/);
    fireEvent.click(checkBtn);

    // Should indicate review states
    const statusBadges = screen.getAllByText(/Review/);
    expect(statusBadges.length).toBeGreaterThan(0);

    // Reset and try correct input
    const resetBtn = screen.getByText(/Reset/);
    fireEvent.click(resetBtn);

    // Re-fill correct values
    const freshInputs = screen.getAllByRole('textbox');
    fireEvent.change(freshInputs[0], { target: { value: '1018800' } }); // Correct for 5%
    fireEvent.change(freshInputs[1], { target: { value: '885000' } });  // Correct for 8%

    const optBButtons = screen.getAllByText('$1,300,000 Later');
    const optAButtons = screen.getAllByText('$1,000,000 Today');

    fireEvent.click(optBButtons[0]); // Option B for Scenario 1 (Correct)
    fireEvent.click(optAButtons[1]); // Option A for Scenario 2 (Correct)

    fireEvent.click(screen.getByText(/Check Answers/));

    // Should see correct status badges and success banner
    expect(screen.getAllByText(/Correct/).length).toBeGreaterThan(0);
    expect(screen.getByText(/Outstanding Analysis! 100% Correct/)).toBeInTheDocument();
  });
});
