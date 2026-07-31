import { LessonContent } from '../../types';

export const glossary: LessonContent = {
  id: 'glossary',
  title: 'Financial Math Glossary & Formula Compendium',
  subtitle: 'A comprehensive, searchable dictionary of financial algebra terms, variable symbols, core equations, and real-world analogies',
  mathTopic: 'Algebraic Terminology, Variable Symbol Keys, and Master Equation Reference',
  equations: [
    'PV = \\frac{FV}{(1+r)^n}',
    'P_0 = \\frac{D_1}{r - g}',
    'PMT = P \\times \\frac{r(1+r)^n}{(1+r)^n - 1}',
    'LTV = \\frac{\\text{Loan Principal}}{\\text{Purchase Price}} \\times 100\\%',
    'dS_t = \\mu S_t dt + \\sigma S_t dW_t'
  ],
  description: 'Explore the complete terminology reference of the Investing & Finance Math Lab. Access quick mathematical definitions, variable keys, core formulas, and intuitive real-world analogies across all units.',
  introduction: `Financial literacy requires speaking the language of quantitative finance. Behind every stock price movement, mortgage payment, option contract, or retirement projection lies a system of precise mathematical definitions and variable relationships.

Whether you are analyzing a 30-year home loan, evaluating stock dividend growth, or balancing a multi-asset portfolio, mastering these core terms and symbols gives you the power to translate complex financial products into simple algebra.

Use this Glossary & Formula Compendium to look up terms, review formula derivations, understand key variable symbols, and test your vocabulary mastery across all lab topics.`,
  fullText: [
    '<span className="text-indigo-600 font-bold">1. How to Use the Financial Math Glossary</span>\nEvery entry in this reference provides four crucial layers of understanding:\n• <span className="font-bold text-slate-800">Formal Definition:</span> The precise mathematical or economic definition used by financial analysts.\n• <span className="font-bold text-slate-800">Formula & Variables:</span> The underlying algebraic equations and symbol definitions.\n• <span className="font-bold text-slate-800">Real-World Analogy:</span> An intuitive high school or family metaphor to demystify complex concepts.\n• <span className="font-bold text-slate-800">Curriculum Unit Mapping:</span> Direct links to the relevant laboratory unit where you can interact with live numerical simulations.',

    '<span className="text-indigo-600 font-bold">2. Master Variable Symbol Legend</span>\nIn financial algebra, specific letters represent standard quantities across textbooks and financial markets:\n• <span className="font-bold text-slate-800">$PV$ & $FV$:</span> Present Value (current discounted cash amount) and Future Value (accumulated value after time $n$).\n• <span className="font-bold text-slate-800">$r$:</span> Annual or periodic discount rate, hurdle rate, or interest rate.\n• <span className="font-bold text-slate-800">$g$:</span> Expected perpetual growth rate of cash flows or dividends ($r > g$).\n• <span className="font-bold text-slate-800">$P_0$ & $D_1$:</span> Current fair price of equity share ($P_0$) and expected next-period dividend payout ($D_1$).\n• <span className="font-bold text-slate-800">$PMT$:</span> Equal periodic payment on an amortized loan installment.\n• <span className="font-bold text-slate-800">$\\mu$ & $\\sigma$:</span> Expected annual drift rate (trend) and diffusion volatility (risk spread) in stochastic price models.\n• <span className="font-bold text-slate-800">$\\beta$ (Beta):</span> Measure of systematic market sensitivity relative to a broad index ($Market \\beta = 1.0$).',

    '<span className="text-indigo-600 font-bold">3. Essential Financial Categories</span>\nThe glossary is organized into six core analytical domains:\n• <span className="font-bold text-slate-800">Time Value of Money (TVM):</span> Compounding, discounting, opportunity cost, and Net Present Value ($NPV$).\n• <span className="font-bold text-slate-800">Cost of Capital & Rates:</span> Risk-free benchmarks ($r_{rf}$), inflation rates ($\\pi$), and hurdle rates.\n• <span className="font-bold text-slate-800">Equity Valuation:</span> Dividend Discount Model ($DDM$), Gordon Growth Model, and earnings retention ($b$).\n• <span className="font-bold text-slate-800">Risk & Portfolios:</span> Efficient Frontier, Sharpe Ratio, covariance matrices ($\\Sigma$), and diversification.\n• <span className="font-bold text-slate-800">Consumer Loans & Real Estate:</span> Amortization, Loan-to-Value ($LTV$), Private Mortgage Insurance ($PMI$), and $PITI$.\n• <span className="font-bold text-slate-800">Derivatives & Behavior:</span> Option payoffs, Black-Scholes Greeks ($\\Delta, \\Gamma, \\Theta, Vega$), and market crowds.'
  ],
  quizzes: []
};
