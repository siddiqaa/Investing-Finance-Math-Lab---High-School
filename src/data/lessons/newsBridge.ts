import { LessonContent } from '../../types';

export const newsBridge: LessonContent = {
  id: 'newsBridge',
  title: 'The News Catalyst: Why Stock Prices Wiggle',
  subtitle: 'From static formulas to market news, expectation shifts, and price discovery',
  mathTopic: 'Deterministic Sensitivity and Expectation Shifting',
  equations: [
    'P_0 = \\frac{D_1}{r - g} \\quad \\text{(Our baseline formula)}',
    '\\text{Unexpected News} \\implies \\Delta g \\text{ or } \\Delta r \\implies \\Delta P'
  ],
  description: 'Why do real stock charts look so jagged and chaotic? Learn how incoming news instantly alters collective expectations about the future, causing stock prices to adjust in sudden, unpredictable leaps.',
  introduction: `In Unit 2, we mastered the **Gordon Growth Model** ($P_0 = \\frac{D_1}{r - g}$). It felt clean, elegant, and perfectly solid. If you type in the numbers, you get a single, perfect "fair value" price. 

But if you look at a real-world stock ticker, the price is constantly flickering and jumping. It doesn't sit still. Why?

The secret is that a stock's price is not a historical record; it is a **prediction of the future** made by thousands of buyers and sellers. When you calculate a stock's price, you are choosing a growth rate $g$ and a discount rate $r$ based on what you *expect* to happen.

What happens when those expectations change? If Apple suddenly announces they invented a revolutionary new holographic phone, the expected growth rate $g$ shoots up. If they get hit with a surprise regulatory fine, the expected growth rate sinks, or the risk $r$ rises. 

In this bridge unit, we will see how **unpredictable news** forces investors to instantly re-calculate their formulas, turning smooth mathematical equations into the jagged, wiggling price paths we see in the real world.`,
  fullText: [
    '**1. Price as Current Collective Expectations**\nAt any given second, a stock\'s price reflects all the information that is currently public. The buyers and sellers in the market have already done the math, and they have agreed on a price based on their current estimates of the company\'s growth rate ($g$) and risk ($r$).\n\nBecause of this, **expected news does not change the price**. If everyone already expects a company to grow at $4\\%$ per year, and the company announces, "We grew by $4\\%$," the stock price will barely move. The expectation was already "priced in"!',
    '2. **The "Surprise" Factor (Delta g and Delta r)**\nOnly **unexpected information (news)** changes stock prices. When new information arrives, it changes our GGM inputs. Let\'s see the math of a news shock:\n\nSuppose a company has a dividend $D_1 = \\$2$, a discount rate $r = 8\\%$, and an expected growth rate $g = 3\\%$.\n- **Before News:**\n$P_{\\text{old}} = \\frac{\\$2}{0.08 - 0.03} = \\frac{\\$2}{0.05} = \\$40$\n\nSuddenly, news hits that the company\'s main product is selling twice as fast as expected. Investors revise their growth expectations upward to $g = 5\\%$ ($0.05$):\n- **After News:**\n$P_{\\text{new}} = \\frac{\\$2}{0.08 - 0.05} = \\frac{\\$2}{0.03} \\approx \\$66.67$\n\nThe stock price jumps instantly from \\$40 to \\$66.67! This instantaneous jump is called **Price Discovery**.',
    'KNOWLEDGE_CHECK_NEWS_BRIDGE',
    '3. **Why Price Charts Look Random**\nThink about this logically:\n- If stock prices only change when **unexpected news** arrives,\n- And news, by definition, is **unpredictable** (otherwise it wouldn\'t be a surprise),\n- Then stock price changes *must* also be unpredictable and random!\n\nThis is the philosophical bridge to Unit 3. Individual jumps are caused by logical, mathematical adjustments to news. But because news events occur randomly over time, when you zoom out, the series of continuous price jumps forms a jagged, random walk that looks like a chaotic wiggle. You are watching a deterministic formula adjust to a stochastic world!',
    '**Summary Check — The Three Golden Rules of Price Discovery:**\n- **Rule 1:** Prices reflect collective predictions about the future.\n- **Rule 2:** Only surprise news shifts the inputs ($g$ or $r$) of our valuation formulas.\n- **Rule 3:** Unpredictable news creates unpredictable price movements, causing stock charts to wiggle.'
  ],
  quizzes: [
    {
      id: 'nb1',
      question: 'A company\'s stock price is currently \\$50. The company announces their quarterly profits, and they are exactly as high as Wall Street analysts had predicted. What will most likely happen to the stock price?',
      options: [
        'The stock price will double, because high profits are always great news',
        'The stock price will remain relatively flat, because the good news was already expected and "priced in"',
        'The stock price will drop to \\$0, because investors prefer surprises',
        'The stock price will fluctuate wildly because formulas cannot handle expected values'
      ],
      correctIndex: 1,
      explanation: 'In financial markets, stock prices reflect current public expectations. If a company announces results that exactly match expectations, there is no new information to shift the growth rate ($g$) or discount rate ($r$). Therefore, the price remains relatively stable because the news was already "priced in."',
      hint: 'Ask yourself: was there any "surprise" in the announcement, or did it go exactly as everyone expected?'
    },
    {
      id: 'nb2',
      question: 'A company has a dividend of \\$3.00, a discount rate r of 10% (0.10), and a growth rate g of 4% (0.04), giving a price of \\$50. Suddenly, a new competitor enters the market, making investors nervous. This increases the discount rate (r) to 12% (0.12) because of higher risk. What is the new stock price?',
      options: [
        '\\$50 (Risk has no effect on prices)',
        '\\$37.50, because the denominator (r - g) increased to 0.08',
        '\\$60.00, because competition makes companies work harder',
        '\\$25.00, because the denominator (r - g) doubled'
      ],
      correctIndex: 1, // P = 3.00 / (0.12 - 0.04) = 3.00 / 0.08 = 37.50
      explanation: 'We apply the GGM formula with the adjusted discount rate: $P_{\\text{new}} = \\frac{D_1}{r_{\\text{new}} - g} = \\frac{\\$3.00}{0.12 - 0.04} = \\frac{\\$3.00}{0.08} = \\$37.50$. The price dropped from \\$50 to \\$37.50 because the increased risk ($r$) made future cash flows less valuable today.',
      hint: 'Plug $D_1 = 3$, $r = 0.12$, and $g = 0.04$ into the formula: $P = D_1 / (r - g)$.'
    },
    {
      id: 'nb3',
      question: 'Why do stock price charts look like chaotic, jagged, wiggling lines over time instead of smooth curves?',
      options: [
        'Because the stock exchanges use computer glitches to confuse amateur buyers',
        'Because unexpected news events arrive at random, unpredictable times, causing investors to constantly and suddenly adjust their growth and risk expectations',
        'Because companies change their business models every single minute of the day',
        'Because math formulas are only valid on weekends'
      ],
      correctIndex: 1,
      explanation: 'While valuation formulas themselves are smooth and logical, the inputs ($g$ and $r$) depend on human expectations. Since unexpected news events (like breakthroughs, lawsuits, or economic reports) arrive randomly, the resulting adjustments create a sequence of sudden, jagged leaps. This is the root of stock market randomness!',
      hint: 'Think about how sudden, unpredictable events in the real world impact what we expect for a company\'s future.'
    }
  ]
};
