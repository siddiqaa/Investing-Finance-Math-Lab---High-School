import { LessonContent } from '../../types';

export const stochastic: LessonContent = {
  id: 'stochastic',
  title: 'Stock Prices & Randomness',
  subtitle: 'Percentage changes, random walks, and volatility drag',
  mathTopic: 'Percentages, Multiplicative Returns, Random Walks, and Volatility Drag',
  equations: [
    '\\text{Return} = \\frac{\\text{New Price} - \\text{Old Price}}{\\text{Old Price}}',
    'S_t = S_{t-1} \\times (1 + r_t)',
    'S_T = S_0 \\times (1.10)^5 \\times (0.90)^5'
  ],
  description: 'Stock prices change unpredictably from day to day because of new, unexpected information. Learn how we model stock trends as random walks, how to compute rates of return, and how wild swings can create a drag on wealth.',
  fullText: [
    '1. **Calculating Percentage Returns**\nIn any given day, a stock price moves up or down based on new information. We measure these movements as percentage returns:\n$\\text{Return} = \\frac{\\text{New Price} - \\text{Old Price}}{\\text{Old Price}}$',
    '**Real-World Anchors: What moves a stock price?**\n- **Earnings surprises**: A company reports better profits than expected $\\rightarrow$ price jumps\n- **Federal Reserve decisions**: Interest rates rise unexpectedly $\\rightarrow$ many stocks fall\n- **CEO announcements**: A major leadership change $\\rightarrow$ uncertainty causes a swing\n- **Macro events**: A war, a pandemic, a new trade policy',
    'The key insight is that only new, unexpected information moves prices. News that was already anticipated was already "priced in."',
    '2. **Multiplicative Compounding**\nA key feature of stock returns is that they compound multiplicatively, not additively.\n$S_t = S_{t-1} \\times (1 + r_t)$',
    '**Worked Example — The Asymmetry Trap:**\nSuppose a stock starts at \\$100, rises 10% on Monday, then falls 10% on Tuesday.\n- Monday close: $\\$100 \\times 1.10 = \\$110$\n- Tuesday close: $\\$110 \\times 0.90 = \\$99$ (not \\$100!)',
    'You\'re down \\$1 even though you had an "equal" up and down percentage move. This is not intuitive — it\'s a direct result of multiplicative compounding. Percentage losses always bite harder than percentage gains of the same size.',
    '3. **The Random Walk Model**\nWe model stock prices as a **random walk**: each day\'s price move is unpredictable and independent of yesterday\'s move — like a coin flip.',
    '**Worked Example — The Coin Flip Portfolio:**\nStart at \\$100. Flip a coin 10 times where heads increases your portfolio by 10% and tails decreases it by 10%:\n- Heads: $+10\\%$ (multiply by $1.10$)\n- Tails: $-10\\%$ (multiply by $0.90$)',
    'Most students expect to end up near \\$100 after 10 flips (5 heads, 5 tails). Let\'s check the best case of a perfectly balanced outcome:\n$\\$100 \\times (1.10)^5 \\times (0.90)^5 = \\$100 \\times 1.611 \\times 0.590 = \\$95.10$',
    'Even with exactly 5 ups and 5 downs in the most balanced possible result, you end at \\$95.10 — not \\$100! This is the multiplicative asymmetry at work again. The random walk model captures why stock investing feels unsatisfying even in "flat" markets.',
    '⚠️ **Try it yourself:** Flip a real coin 10 times and track a \\$100 "portfolio." Compare results across the class — how spread out are the outcomes?',
    '4. **Volatility Drag**\nBecause of multiplicative compounding, high volatility actively destroys wealth — even when the average percentage return looks the same.',
    '**Real-World Problem — Head-to-Head Comparison:**\nTwo investors both average a 10% annual return over 4 years. But they get there very differently. One path is perfectly steady, while the other is wildly volatile.',
    'VOLATILITY_TABLE|Year | Investor A (Steady) | Investor B (Volatile)\n1 | +10% | +30%\n2 | +10% | -10%\n3 | +10% | +30%\n4 | +10% | -10%\nAverage Return | 10% | 10%\nFinal Balance | \\$146.41 | \\$136.89',
    'Let\'s calculate the compounding for both:\n- **Investor A (Steady)**: $\\$100 \\times (1.10)^4 = \\$146.41$\n- **Investor B (Volatile)**: $\\$100 \\times 1.30 \\times 0.90 \\times 1.30 \\times 0.90 = \\$136.89$',
    'Investor B earned \\$9.52 less despite the exact same average rate! The wild swings actively ate into the compounding power. This phenomenon is called **volatility drag** — it is a real, mathematical cost of market turbulence.'
  ],
  quizzes: [
    {
      id: 's1',
      question: 'If a stock’s share price starts at \\$100, increases by 20% on Monday, and then falls by 20% on Tuesday, what is its final price?',
      options: [
        '\\$96.00',
        '\\$100.00',
        '\\$104.00',
        '\\$80.00'
      ],
      correctIndex: 0,
      explanation: 'On Monday, the stock goes from \\$100 to \\$120 ($\\$100 \\times 1.20$). On Tuesday, the stock drops by 20% of its new price, which is a drop of \\$24 ($\\$120 \\times 0.20$). The final price is $\\$120 - \\$24 = \\$96.00$.',
      hint: 'Remember that Tuesday\'s percentage change applies to Monday\'s ending price, not the original \\$100.'
    },
    {
      id: 's2',
      question: 'What is the core idea of a stock price modeled as a "random walk"?',
      options: [
        'Each day’s stock price move is independent and unpredictable, meaning past prices cannot predict future moves',
        'Stock prices always move up on sunny days and down on rainy days',
        'Stock prices follow a perfectly predictable repetitive wave pattern over time',
        'The stock market is completely rigged and prices are set by a central computer'
      ],
      correctIndex: 0,
      explanation: 'A random walk maps price moves as independent random steps. Since each step is triggered by new, surprises-only information, the path itself is fundamentally unpredictable from yesterday\'s trend.',
      hint: 'Think about coin flips where previous flips don\'t affect the next flip.'
    },
    {
      id: 's3',
      question: 'How does high volatility (wild fluctuations) create a "drag" on compounding wealth?',
      options: [
        'Large downs require much larger percentage gains to recover from, making steady growth mathematically superior for the same average return',
        'Wild swings increase transaction taxable fees automatically on the exchange',
        'Volatility makes stock splits happen too frequently',
        'It makes interest rates rise automatically'
      ],
      correctIndex: 0,
      explanation: 'Since a drop of 50% requires a 100% gain to break even, wild fluctuations have a built-in mathematical handicap. The larger the swings, the lower the actual geometric compounded growth is relative to a direct arithmetic mean.',
      hint: 'Think about how hard it is to work backwards and recover after a massive portfolio drop.'
    }
  ]
};
