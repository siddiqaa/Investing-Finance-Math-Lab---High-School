import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { QuizSection } from './QuizSection';
import React from 'react';

const mockQuizzes = [
  {
    id: 'q1',
    question: 'What is 1+1?',
    options: ['1', '2', '3'],
    correctIndex: 1,
    explanation: 'Basic math.',
    hint: 'Use fingers.'
  }
];

describe('QuizSection', () => {
  it('renders correctly', () => {
    render(<QuizSection quizzes={mockQuizzes} moduleName="Arithmetic" />);
    expect(screen.getByText(/What is 1\+1\?/)).toBeInTheDocument();
  });

  it('shows hint when requested', () => {
    render(<QuizSection quizzes={mockQuizzes} moduleName="Arithmetic" />);
    fireEvent.click(screen.getByText(/Show Hint/));
    expect(screen.getByText(/Pedagogical Hint:/)).toBeInTheDocument();
    expect(screen.getByText(/Use fingers\./)).toBeInTheDocument();
  });

  it('allows selecting an option and submitting', () => {
    render(<QuizSection quizzes={mockQuizzes} moduleName="Arithmetic" />);
    
    // Select correct option
    const optionB = screen.getByText('2');
    fireEvent.click(optionB);
    
    // Check if button is enabled
    const submitBtn = screen.getByText(/Submit Analytical Answer/);
    expect(submitBtn).not.toBeDisabled();
    
    fireEvent.click(submitBtn);
    
    // Check for success message and explanation
    expect(screen.getByText(/Mathematical derivation correct!/)).toBeInTheDocument();
    expect(screen.getByText(/Step-by-Step Analytical Proof/)).toBeInTheDocument();
    expect(screen.getByText(/Basic math\./)).toBeInTheDocument();
  });

  it('shows error message on wrong answer', () => {
    render(<QuizSection quizzes={mockQuizzes} moduleName="Arithmetic" />);
    
    // Select wrong option
    const optionA = screen.getByText('1');
    fireEvent.click(optionA);
    
    const submitBtn = screen.getByText(/Submit Analytical Answer/);
    fireEvent.click(submitBtn);
    
    expect(screen.getByText(/Answer mismatch/)).toBeInTheDocument();
  });
});
