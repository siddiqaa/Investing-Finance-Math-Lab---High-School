/**
 * Mathematical utility functions for quantitative finance formulas.
 */

/**
 * Standard Normal Probability Density Function (PDF)
 */
export function normalPDF(x: number): number {
  return Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
}

/**
 * Standard Normal Cumulative Distribution Function (CDF) - N(x)
 * Rational approximation with high precision (error < 1.5e-7)
 */
export function normalCDF(x: number): number {
  // Abramowitz and Stegun formula 26.2.17
  const p = 0.2316419;
  const b1 = 0.319381530;
  const b2 = -0.356563782;
  const b3 = 1.781477937;
  const b4 = -1.821255978;
  const b5 = 1.330274429;

  const t = 1.0 / (1.0 + p * Math.abs(x));
  const sigma = 1.0 - normalPDF(x) * (b1 * t + b2 * Math.pow(t, 2) + b3 * Math.pow(t, 3) + b4 * Math.pow(t, 4) + b5 * Math.pow(t, 5));

  return x >= 0 ? sigma : 1.0 - sigma;
}

/**
 * Box-Muller transform for generating standard normal random variables
 */
export function randomNormal(): number {
  let u = 0, v = 0;
  while(u === 0) u = Math.random(); // Converting [0,1) to (0,1)
  while(v === 0) v = Math.random();
  return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

/**
 * Format helper for percentages
 */
export function formatPercent(val: number): string {
  return `${(val * 100).toFixed(2)}%`;
}

/**
 * Format helper for currency
 */
export function formatCurrency(val: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
}
