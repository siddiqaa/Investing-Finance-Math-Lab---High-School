import { LessonContent } from '../../types';

export const portfolio: LessonContent = {
  id: 'portfolio',
  title: 'Portfolio Diversification & Risk',
  subtitle: 'The algebra of expected return and spreading risk',
  mathTopic: 'Weighted Averages, Correlation, Efficient Frontier, Sharpe Ratio, and Beta',
  equations: [
    'E[R_p] = w_1 R_1 + w_2 R_2 + w_3 R_3',
    '\\text{Sharpe Ratio} = \\frac{E[R_p] - R_f}{\\sigma_p}',
    '\\beta_i = \\frac{\\text{Cov}(R_i, R_m)}{\\text{Var}(R_m)}'
  ],
  description: 'Can you get more return with less risk? Yes! Learn how combining different investments together uses weighted averages and correlation to cancel out specific risk and build efficient portfolios.',
  fullText: [
    '1. **Portfolio Expected Return**\nA portfolio is a mix of different assets. The expected return of a portfolio is the weighted average of its components:\n$E[R_p] = w_1 R_1 + w_2 R_2 + w_3 R_3 \\quad \\text{(where weights sum to 100\\%)}$',
    '**Worked Example — Expected Return Calculation:**\nYou split \\$10,000 across three assets as follows:',
    'PORTFOLIO_TABLE|Asset | Weight (w) | Expected Return (R) | Contribution\nTech Stock | 50% | 12% | 6.0%\nGovernment Bond | 30% | 4% | 1.2%\nGold | 20% | 6% | 1.2%\nPortfolio | 100% | — | 8.4%',
    'Your expected portfolio return is the sum of the individual contributions:\n$0.50 \\times 12\\% + 0.30 \\times 4\\% + 0.20 \\times 6\\% = 8.4\\%$.',
    '2. **Correlation: The Key to Risk Reduction**\nThe portfolio\'s risk is not simply the weighted average of individual risks. It depends critically on correlation $\\rho$ — how the assets move relative to each other.',
    '**Worked Example — Guess Before You Calculate:**',
    'CORRELATION_TABLE|Asset Pair | Likely Correlation | Why?\nExxonMobil & Chevron (both oil) | High (+0.85) | Same industry, same oil price exposure\nDelta Airlines & ExxonMobil | Negative (-0.40) | Rising oil prices hurt airlines, help oil companies\nWalmart & a Tech startup | Near zero (0.10) | Unrelated businesses, different risk drivers',
    'Correlation ranges from $-1.0$ to $+1.0$:\n- **+1.0**: Assets move in perfect lockstep — no diversification benefit\n- **0**: Completely unrelated — good diversification\n- **-1.0**: Assets move in perfect opposition — maximum risk offset',
    '3. **The Diversification Effect**\nLet\'s look at an analytical scenario showing how combining two imperfectly correlated investments together mathematically mitigates standard deviation.',
    '**Worked Example — Two Assets:**\n- **Asset A**: Expected Return $= 8\\%$, Volatility (Risk) $= 12\\%$\n- **Asset B**: Expected Return $= 6\\%$, Volatility (Risk) $= 8\\%$\n- **Correlation ($\\rho$) between A and B** $= 0.20$\n\nIf we construct a balanced 50/50 portfolio:\n- **Expected Return**: $0.50 \\times 8\\% + 0.50 \\times 6\\% = 7.0\\%$\n- **Portfolio Risk**: Less than either asset alone due to low correlation $\\rho = 0.20$!',
    'The portfolio expected return ($7.0\\%$) sits between the two assets — but because of low correlation, the mathematical portfolio risk is smaller than even the less risky Asset B alone! This has been famously called the only "free lunch" in finance.',
    '**What Bad Diversification Looks Like:**\nOwning 10 different bank stocks is not true diversification. All banks move together when interest rates change or a financial crisis hits. High correlation means owning more stocks barely reduces risk. True diversification requires assets that respond to different economic forces.',
    '4. **The Efficient Frontier & Sharpe Ratio**\nBy plotting thousands of portfolio combinations of different weight splits on a Risk vs. Return chart, we trace out the **Efficient Frontier** — the set of portfolios that deliver the highest possible expected return for each level of risk.',
    'Any portfolio below the frontier is inefficient — you could get the same return with less risk, or more return with the same risk, just by rebalancing.',
    'The **Sharpe Ratio** gives a single score to rank portfolios by quality, measuring the return earned per unit of risk above safe cash rates:\n$\\text{Sharpe Ratio} = \\frac{E[R_p] - R_f}{\\sigma_p}$',
    'SHARPE_TABLE|Investment | Expected Return | Volatility | Risk-Free Rate | Sharpe Ratio\nS&P 500 Index | 10% | 15% | 4% | 0.40\nGold | 6% | 12% | 4% | 0.17\nSpeculative Tech Fund | 18% | 40% | 4% | 0.35\nBalanced Portfolio | 9% | 10% | 4% | 0.50',
    'Higher Sharpe Ratio means more return per unit of risk. The Balanced Portfolio wins here, despite having a lower raw return than the speculative Tech Fund.',
    '5. **Beta: Sensitivity to the Market**\nBeta ($\\beta$) measures how much a stock tends to move relative to the overall market (e.g., the S&P 500 S&P 500 Index):\n- **$\\beta = 1.0$**: Moves exactly with the market\n- **$\\beta > 1.0$**: More volatile than the market (aggressive — e.g., high-growth tech stocks)\n- **$\\beta < 1.0$**: Less volatile than the market (defensive — e.g., utilities, consumer staples)\n- **$\\beta < 0$**: Moves opposite the market (rare — e.g., physical gold sometimes)',
    '**Real Examples:**',
    'BETA_TABLE|Stock | Typical Beta | Character\nProcter & Gamble | ~0.5 | Defensive — soap/consumer essentials\nApple | ~1.2 | Slightly aggressive — follows tech sentiment\nTesla | ~2.0 | Very aggressive — swings twice as hard as the market'
  ],
  quizzes: [
    {
      id: 'p1',
      question: 'If you have a portfolio with 60% in a Tech stock expecting a 12% return, and 40% in a Utility stock expecting a 5% return, what is the expected return of your portfolio?',
      options: [
        '9.2%',
        '8.5%',
        '7.0%',
        '17.0%'
      ],
      correctIndex: 0,
      explanation: 'The expected portfolio return is the weighted average: $E[R_p] = w_1 \\times R_1 + w_2 \\times R_2$. Substituting our values: $E[R_p] = (0.60 \\times 12\\%) + (0.40 \\times 5\\%) = 7.2\\% + 2.0\\% = 9.2\\%$.',
      hint: 'Multiply each asset weight by its respective expected return and add them together.'
    },
    {
      id: 'p2',
      question: 'Under portfolio mathematics, why does mixing low-correlation assets reduce overall portfolio risk?',
      options: [
        'When one asset performs poorly, another asset is likely keeping its value or rising, cushioning the total portfolio',
        'It forces companies to pay higher dividends to stay competitive',
        'It forces the federal reserve to lower interest rates for diversified businesses',
        'It eliminates inflation entirely from the cash holdings'
      ],
      correctIndex: 0,
      explanation: 'Low-correlation assets do not move together in lockstep. This dispersion means their price shocks offset each other, which reduces the standard deviation of the overall portfolio below the weighted average of individual deviations.',
      hint: 'Think about what happens to your ship if you put all the weight on one side versus balancing it out.'
    },
    {
      id: 'p3',
      question: 'What is measured by the "Sharpe Ratio" of an investment portfolio?',
      options: [
        'How much extra return the portfolio yields per unit of volatility (risk) above a risk-free rate',
        'The exact speed at which cash compounds over the course of exactly one day',
        'The total tax burden associated with selling stocks',
        'The percentage of the portfolio invested in technology sectors'
      ],
      correctIndex: 0,
      explanation: 'The Sharpe Ratio is defined as (Portfolio Return - Risk-Free Rate) / Portfolio Volatility. It gives a simple score of return-per-unit-of-risk, allowing you to see if your portfolio returns are due to smart choices or excessive risk.',
      hint: 'The numerator measures profit above safe cash, and the denominator measures risk.'
    }
  ]
};
