import { LessonContent } from '../../types';

export const stochastic: LessonContent = {
  id: 'stochastic',
  title: 'Stock Prices & Random Walks',
  subtitle: 'Daily Compounding, Percentage Asymmetry, and Volatility Drag',
  mathTopic: 'Percentage Loss Asymmetry $(1+x)(1-x) = 1-x^2$ and Volatility Drag',
  equations: [
    '(1 + x)(1 - x) = 1 - x^2'
  ],
  description: 'Bridge from Unit 1 annual compounding and Unit 5 catalyst news shocks into daily market math. Discover how daily random news flips create multiplicative random walks, and why percentage loss asymmetry creates a mathematical drag on volatile portfolios.',
  introduction: `In Unit 1, we mastered annual compound interest using the formula $FV = PV(1+r)^n$, assuming a steady, fixed rate $r$. Then in Unit 5, we saw how unexpected corporate news shocks $(\\Delta r)$ instantly shift stock valuations. Unit 6 brings these two fundamental concepts together: what happens when compound growth meets unpredictable daily news shocks?

Instead of a smooth annual interest rate $r$, every single day brings a fresh news shock $r_t$. Because news surprises are equally likely to be positive or negative on any given day, the price path traces out a <span className="text-purple-700 font-bold">Random Walk</span>.

However, a fundamental algebraic rule creates a hidden trap in daily percentage compounding. In basic algebra, you learned the difference of squares identity: $(1 + x)(1 - x) = 1 - x^2$. In finance, this identity means that a $+10\\%$ gain followed by a $-10\\%$ loss does <span className="italic">not</span> bring you back to even—it leaves you at $1 - 0.10^2 = 0.99$ ($99\\%$) of your starting money!

This algebraic asymmetry creates <span className="text-purple-700 font-bold">Volatility Drag</span>. The wider daily price swings are, the more $x^2$ steals from your compounded wealth. In this unit, we will use high school algebra and coin-flip simulations to explore how daily random walks behave, calculate the exact drag created by wild market swings, and understand why steady compounding beats volatile growth over long time horizons.`,
  fullText: [
    '<span className="text-purple-700 font-bold">1. Bridging Unit 1 & Unit 5: From Fixed Rates to Daily Random Shocks</span>\nIn Unit 1, we calculated compounded growth over $n$ years as $FV = PV(1+r)^n$ with a fixed rate $r$. In Unit 5, we learned that stock prices react immediately to surprise news shocks $\\Delta r$. In the real market, unexpected news happens every day, so the daily return $r_t$ changes randomly each day.',

    '2. <span className="text-purple-700 font-bold">The High School Algebra of Percentage Asymmetry</span>\nWhy do percentage gains and losses behave differently than addition? Consider the fundamental algebraic difference of squares:\n$$(1 + x)(1 - x) = 1 - x^2$$\nWhen $x = 0.10$ ($10\\%$):\n$$(1 + 0.10)(1 - 0.10) = (1.10)(0.90) = 0.99$$\n\nYou lose $1\\%$ of your wealth on every equal $+10\\% / -10\\%$ pair! To recover from a $10\\%$ loss, you need an $11.1\\%$ gain. To recover from a $50\\%$ market crash, you need a <span className="text-purple-700 font-bold font-sans">100% gain</span> just to get back to even.',

    '3. <span className="text-purple-700 font-bold font-sans">3. The Coin Flip Portfolio & Volatility Drag</span>\nImagine starting with \\$100 and flipping a fair coin 10 times: Heads = $+10\\%$, Tails = $-10\\%$. With 5 Heads and 5 Tails:\n$$\\$100 \\times (1.10)^5 \\times (0.90)^5 = \\$100 \\times (0.99)^5 = \\$95.10$$\nEven though the coin flips were perfectly fair ($50\\%$ heads, $50\\%$ tails), you lost \\$4.90! The "choppiness" of the market acts as a mathematical tax on your compounded wealth.',

    '4. <span className="text-purple-700 font-bold font-sans">4. Comparing Steady vs. Wild Growth</span>\nTwo portfolios can have the exact same arithmetic average return, but end up with vastly different bank balances:',

    'VOLATILITY_TABLE|Year | Investor A (Steady) | Investor B (Wild)\n1 | +10% | +40%\n2 | +10% | -20%\n3 | +10% | +40%\n4 | +10% | -20%\nAverage Return | 10% | 10%\nFinal Balance | \\$146.41 | \\$125.44',

    '<span className="text-purple-700 font-bold font-sans">Investor B lost \\$20.97 compared to Investor A</span>, despite having the exact same average return of $10\\%$. The key take-away: Lower volatility preserves compound wealth, making steady growth mathematically superior to wild fluctuations.'
  ],
  quizzes: [
    {
      id: 's1',
      question: 'Using the algebraic formula $(1+x)(1-x) = 1-x^2$, if a share price starts at \\$100, gains 20% on Monday, and loses 20% on Tuesday, what is its final price?',
      options: [
        '\\$96.00',
        '\\$100.00',
        '\\$104.00',
        '\\$80.00'
      ],
      correctIndex: 0,
      explanation: 'Using $(1+0.20)(1-0.20) = 1 - (0.20)^2 = 1 - 0.04 = 0.96$, the price becomes $\\$100 \\times 0.96 = \\$96.00$.',
      hint: 'Apply the difference of squares identity $(1+x)(1-x) = 1-x^2$ where $x = 0.20$.'
    },
    {
      id: 's2',
      question: 'How does Unit 6 extend the compounding formula $FV = PV(1+r)^n$ from Unit 1?',
      options: [
        'It replaces the constant rate $r$ with daily random percentage growth factors $(1+r_t)$ driven by news shocks',
        'It replaces compounding with simple linear addition',
        'It assumes stock prices never change after day 1',
        'It forces all interest rates to zero'
      ],
      correctIndex: 0,
      explanation: 'Unit 6 transitions from a fixed annual rate $r$ to daily compounding $S_t = S_{t-1}(1+r_t)$, where each day’s rate $r_t$ reflects surprise news shocks.',
      hint: 'Think about chaining daily growth factors $(1+r_1)(1+r_2)...(1+r_N)$.'
    },
    {
      id: 's3',
      question: 'Why does higher volatility cause a "drag" on long-term compound portfolio wealth?',
      options: [
        'Because percentage losses require larger percentage gains to recover from, subtracting approximately $\\frac{1}{2}\\sigma^2$ from compound growth',
        'Because wild swings automatically trigger brokerage maintenance fees',
        'Because volatile stocks are prohibited from paying cash dividends',
        'Because inflation drops to zero during volatile periods'
      ],
      correctIndex: 0,
      explanation: 'Due to percentage loss asymmetry ($(1+x)(1-x) = 1-x^2$), wild fluctuations penalize compound growth compared to steady growth with the same average return.',
      hint: 'Recall the comparison between Investor A (Steady) and Investor B (Wild).'
    }
  ]
};

