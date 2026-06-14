import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import App from './App';
import React from 'react';

// Mock high-level libraries that might cause side-effects on import or render
vi.mock('canvas-confetti', () => ({
  default: vi.fn(),
}));

// Mock motion to avoid issues with animations in tests
vi.mock('motion/react', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

// ResizeObserver mock
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe('App', () => {
  beforeEach(() => {
    cleanup();
  });

  it('renders correctly and allows switching between all labs', async () => {
    render(<App />);
    
    // 1. DCF Initial State
    expect(screen.getAllByText(/Investing & Finance Math Lab/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/The Big Picture/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/time is a physical dimension of value/i).length).toBeGreaterThan(0);
    
    // 2. Switch to Stochastic Calculus
    const stochasticBtn = screen.getByText(/Unit 2: Stock Prices & Randomness/i);
    fireEvent.click(stochasticBtn);
    expect(await screen.findByText(/heartbeat of a person running a marathon/i)).toBeInTheDocument();
    
    // 3. Switch to Modern Portfolio Theory
    const portfolioBtn = screen.getByText(/Unit 3: Portfolio Diversification/i);
    fireEvent.click(portfolioBtn);
    expect(await screen.findByText(/The secret is a concept called/i)).toBeInTheDocument();
    
    // 4. Switch to Black-Scholes Options
    const optionsBtn = screen.getByText(/Unit 4: Options & Payoffs/i);
    fireEvent.click(optionsBtn);
    expect(await screen.findByText(/origins of the options market date back/i)).toBeInTheDocument();
    
    // 5. Switch to Behavioral Finance
    const behavioralBtn = screen.getByText(/Unit 5: Behavioral Market Math/i);
    fireEvent.click(behavioralBtn);
    expect(await screen.findByText(/treated the stock market like a giant clock/i)).toBeInTheDocument();
  });
});
