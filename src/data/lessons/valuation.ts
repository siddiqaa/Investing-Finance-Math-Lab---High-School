import { LessonContent } from '../../types';

export const valuation: LessonContent = {
  id: 'valuation',
  title: 'Stock Price Valuation & Infinite Growth',
  subtitle: 'From zero-growth perpetuities to growing business dividends & the Gordon Growth Model',
  mathTopic: 'Growing Infinite Geometric Series & Gordon Growth Convergence',
  equations: [
    'P_0 = \\sum_{t=1}^{\\infty} \\frac{D_0(1+g)^t}{(1+r)^t}',
    'P_0 = \\frac{D_1}{r - g} \\quad \\text{where } D_1 = D_0(1+g)',
    'r = \\frac{D_1}{P_0} + g'
  ],
  description: 'Build on zero-growth valuation to discover how real companies reinvest profits to grow dividends over time. Derive the Gordon Growth Model (P_0 = D_1 / (r - g)) step-by-step using infinite geometric series, explore why r > g is mathematically required, and analyze the extreme sensitivity of stock market prices.',
  introduction: `In Unit 3.5, we mastered zero-growth stock valuation, finding that a stock paying a flat dividend $D$ forever is worth $P_0 = \\frac{D}{r}$. But look at iconic real-world companies like Apple, Microsoft, Nike, or Starbucks—do their sales and profits stay flat forever? Of course not!

How do companies grow? A thriving company doesn't pay out 100% of its earnings as dividends to shareholders. Instead, it keeps a portion of its profits—known as <span className="text-indigo-600 font-bold">Retained Earnings</span>—and reinvests that cash to build new stores, open automated distribution hubs, hire scientists, or code breakthrough software.

Reinvesting profits drives business expansion, causing annual cash dividends ($D$) to grow year after year at a perpetual growth rate ($g > 0$). In this unit, we step beyond flat zero-growth perpetuities and discover how to value forever-growing cash flow streams, deriving the celebrated <span className="text-indigo-600 font-bold">Gordon Growth Model</span> step-by-step with high school algebra!`,
  fullText: [
    '1. <span className="text-indigo-600 font-bold">The Bridge: Retained Earnings & Growing Dividends ($g > 0$)</span>',
    'When a company earns profits, management makes a critical strategic decision. If it pays out all profits as dividends, the business remains steady but stagnant ($g = 0\\%$), as we saw in Unit 3.5.',
    'However, if the company retains a fraction of its earnings and reinvests that cash into high-return growth projects, its future earnings expand. As earnings grow, future dividend payouts increase year after year at a perpetual growth rate $g$:',
    '• <span className="font-bold text-slate-800">Year 0</span> (Paid today): $D_0$\n• <span className="font-bold text-slate-800">Year 1</span>: $D_1 = D_0(1+g)$\n• <span className="font-bold text-slate-800">Year 2</span>: $D_2 = D_1(1+g) = D_0(1+g)^2$\n• <span className="font-bold text-slate-800">Year 3</span>: $D_3 = D_2(1+g) = D_0(1+g)^3$\n• <span className="font-bold text-slate-800">Year $t$</span>: $D_t = D_0(1+g)^t$',

    '2. <span className="text-indigo-600 font-bold">Concrete Cash Flow Example (Why the Infinite Sum Stays Finite)</span>',
    'Let\'s trace a real dollar example before diving into the general algebraic proof!',
    'Suppose a stock just paid $D_0 = \\text{\\$1.00}$ today. Its dividend grows at $g = 5\\%$ ($0.05$) per year, and investors demand a required return of $r = 10\\%$ ($0.10$).',
    '• <span className="font-bold text-slate-800">Year 1</span> ($t=1$): Expected dividend $D_1 = \\text{\\$1.00} \\times (1 + 0.05) = \\text{\\$1.05}$. Its Present Value is:\n$$\\text{PV}_1 = \\frac{\\text{\\$1.05}}{1.10^1} = \\text{\\$0.9545}$$',
    '• <span className="font-bold text-slate-800">Year 2</span> ($t=2$): Expected dividend $D_2 = \\text{\\$1.05} \\times 1.05 = \\text{\\$1.1025}$. Its Present Value is:\n$$\\text{PV}_2 = \\frac{\\text{\\$1.1025}}{1.10^2} = \\frac{\\text{\\$1.1025}}{1.21} = \\text{\\$0.9112}$$',
    '• <span className="font-bold text-slate-800">Year 3</span> ($t=3$): Expected dividend $D_3 = \\text{\\$1.1025} \\times 1.05 = \\text{\\$1.1576}$. Its Present Value is:\n$$\\text{PV}_3 = \\frac{\\text{\\$1.1576}}{1.10^3} = \\frac{\\text{\\$1.1576}}{1.331} = \\text{\\$0.8697}$$',
    'Notice the mathematical miracle! Even though future dividend checks grow bigger every year (\\$1.05 $\\to$ \\$1.1025 $\\to$ \\$1.1576), discounting at 10% shrinks their present value faster than 5% growth inflates them! The present values shrink year after year (\\$0.9545 $\\to$ \\$0.9112 $\\to$ \\$0.8697 ...).',
    'Because each term shrinks by a constant factor, the infinite sum out to eternity converges to a clean, finite dollar amount!',

    '3. <span className="text-indigo-600 font-bold">Step-by-Step Algebraic Derivation of the Gordon Growth Model</span>',
    'To find the total fair price today ($P_0$), we sum the present value of every future growing dividend out to infinity ($t = 1$ to $t = \\infty$):',
    '$$P_0 = \\text{PV}_1 + \\text{PV}_2 + \\text{PV}_3 + \\dots = \\frac{D_1}{(1+r)^1} + \\frac{D_1(1+g)}{(1+r)^2} + \\frac{D_1(1+g)^2}{(1+r)^3} + \\dots$$',
    'This is an <span className="text-indigo-600 font-bold">Infinite Geometric Series</span> ($S = a + ax + ax^2 + \\dots = \\frac{a}{1 - x}$):',
    '• <span className="font-bold text-slate-800">First Term</span> ($a$): $a = \\frac{D_1}{1+r}$ (the discounted Year 1 dividend)\n• <span className="font-bold text-slate-800">Multiplier Ratio</span> ($x$): $x = \\frac{1+g}{1+r}$',
    '<span className="font-bold text-slate-800">The Convergence Condition ($r > g$):</span> For an infinite geometric series to sum to a finite limit, the multiplier $x$ must be strictly less than 1 ($x < 1$):',
    '$$\\frac{1+g}{1+r} < 1 \\implies 1+g < 1+r \\implies r > g$$',
    'This gives us our cardinal financial law: <span className="text-indigo-600 font-bold">Your required rate of return ($r$) MUST be strictly greater than the perpetual growth rate ($g$)!</span> If a company could grow dividends at $12\\%$ forever when required returns were $10\\%$, the ratio $x = \\frac{1.12}{1.10} > 1$ would cause the sum to diverge to infinity—meaning a single share of stock would be worth infinite dollars!',
    '<span className="font-bold text-slate-800">Algebraic Simplification Step-by-Step:</span>',
    'Sub-step 1: Substitute $a = \\frac{D_1}{1+r}$ and $x = \\frac{1+g}{1+r}$ into $S = \\frac{a}{1 - x}$:\n$$P_0 = \\frac{\\frac{D_1}{1+r}}{1 - \\frac{1+g}{1+r}}$$',
    'Sub-step 2: Simplify the denominator ($1 - x$):\n$$1 - \\frac{1+g}{1+r} = \\frac{(1+r) - (1+g)}{1+r} = \\frac{r - g}{1+r}$$',
    'Sub-step 3: Substitute the simplified denominator back into $P_0$:\n$$P_0 = \\frac{\\frac{D_1}{1+r}}{\\frac{r - g}{1+r}}$$',
    'Sub-step 4: Multiply top and bottom by $(1+r)$ to cancel common terms:\n$$P_0 = \\frac{D_1}{r - g}$$',
    '<span className="font-bold text-slate-800">Numerical Verification:</span> Plugging in our concrete numbers ($D_1 = \\$1.05$, $r = 0.10$, $g = 0.05$):\n$$P_0 = \\frac{\\$1.05}{0.10 - 0.05} = \\frac{\\$1.05}{0.05} = \\$21.00$$',
    '<span className="font-bold text-slate-800">Connecting to Unit 3.5 (Zero Growth Special Case):</span> If $g = 0$, $D_1 = D$, giving $P_0 = \\frac{D}{r - 0} = \\frac{D}{r}$. The Zero-Growth formula from Unit 3.5 is simply a special case of the Gordon Growth Model where $g = 0$!',
    'SIDE_QUEST_CALLOUT|side_quest_gordon|Gordon Growth Formula & Geometric Series',

    '4. <span className="text-indigo-600 font-bold">Demystifying the Required Rate of Return ($r$)</span>',
    'Why do discount rates differ across companies? The required rate $r$ represents your opportunity cost and is composed of two parts:',
    '$$r = r_f + \\text{Equity Risk Premium (ERP)}$$',
    '• <span className="font-bold text-slate-800">Risk-Free Rate</span> ($r_f$): What you could earn on safe U.S. Treasury Bonds (Unit 2).\n• <span className="font-bold text-slate-800">Equity Risk Premium</span> ($ERP$): The extra return demanded for taking business risk (Unit 3).',
    'Example: If Treasury bonds pay 4% ($r_f$) and stock risk demands a 6% ERP, total required return is $r = 4\\% + 6\\% = 10\\%$.',

    '5. <span className="text-indigo-600 font-bold">The Extreme Sensitivity of the "r - g" Denominator</span>',
    'KNOWLEDGE_CHECK_VALUATION',
    'Because the denominator is $(r - g)$, small changes in growth ($g$) or discount rates ($r$) cause massive swings in stock prices. This explains why stock markets can be so volatile when economic news breaks!',
    'Consider a stock with $D_1 = \\$2.00$ and $r = 10\\%$. Watch what happens as expected perpetual growth ($g$) shifts:',
    'SENSITIVITY_TABLE|Perpetual Growth (g) | Denominator (r - g) | Stock Price (P₀)\n2% | 8% ($0.10 - 0.02$) | \\$25.00 ($2.00 \\div 0.08$)\n5% | 5% ($0.10 - 0.05$) | \\$40.00 ($2.00 \\div 0.05$)\n8% | 2% ($0.10 - 0.08$) | \\$100.00 ($2.00 \\div 0.02$)\n9% | 1% ($0.10 - 0.09$) | \\$200.00 ($2.00 \\div 0.01$)',
    'Notice how a small increase in growth expectations from 5% to 8% causes the stock price to <span className="text-indigo-600 font-bold">more than double</span> from \\$40 to \\$100! When a company adjusts its long-term growth outlook, the denominator responds powerfully.',

    '6. <span className="text-indigo-600 font-bold">Decomposing Total Return ($r = \\frac{D_1}{P_0} + g$)</span>',
    'We can rearrange $P_0 = \\frac{D_1}{r - g}$ using basic algebra to solve for expected return ($r$):',
    '$$r = \\frac{D_1}{P_0} + g$$',
    'Your total investment return comes from two distinct streams:',
    '• <span className="font-bold text-slate-800">Dividend Yield</span> ($\\frac{D_1}{P_0}$): Direct cash payout received in your bank account.\n• <span className="font-bold text-slate-800">Capital Gains Growth Yield</span> ($g$): The annual rate at which the company\'s value and share price appreciate.',
    'Example: A \\$50 stock paying a \\$2 dividend next year has a 4% dividend yield. If dividends grow at 5%, your total expected annual return is $4\\% + 5\\% = 9\\%$.',

    '7. <span className="text-indigo-600 font-bold">Real-World Application: What About Non-Dividend Tech Firms?</span>',
    'How do we value companies like Amazon or Tesla that paid zero dividends for decades? At first glance, setting $D_1 = 0$ gives $P_0 = \\$0$.',
    'However, high-growth firms reinvest 100% of profits internally at high rates of return during their expansion phase. As they mature, they eventually initiate dividends (as Meta and Alphabet did in 2024). Multi-stage DDM models account for this by projecting future dividends starting years down the road and discounting them back to today.'
  ],
  quizzes: [
    {
      id: 'val_q1',
      question: 'A company is expected to pay a dividend of \\$3.00 next year ($D_1$). Your required rate of return ($r$) is 9% ($0.09$), and the dividend is projected to grow at a constant rate of 4% ($0.04$) forever. What is the fair price ($P_0$) of the stock today?',
      options: [
        '\\$33.33',
        '\\$60.00',
        '\\$75.00',
        '\\$300.00'
      ],
      correctIndex: 1,
      explanation: 'Using the Gordon Growth Model $P_0 = \\frac{D_1}{r - g}$, substitute $D_1 = \\$3.00$, $r = 0.09$, and $g = 0.04$: $P_0 = \\frac{\\$3.00}{0.09 - 0.04} = \\frac{\\$3.00}{0.05} = \\$60.00$.',
      hint: 'Subtract $g = 0.04$ from $r = 0.09$ to get $0.05$, then divide $D_1 = \\$3.00$ by $0.05$.'
    },
    {
      id: 'val_q2',
      question: 'Why does the Gordon Growth Model mathematically require that the discount rate ($r$) be strictly greater than the growth rate ($g$)?',
      options: [
        'If $g \\ge r$, the geometric series multiplier $\\frac{1+g}{1+r} \\ge 1$, causing the infinite sum to diverge to infinity',
        'If $g \\ge r$, the stock price becomes negative',
        'If $g \\ge r$, the company goes bankrupt immediately',
        'If $g \\ge r$, dividends are taxed at 100%'
      ],
      correctIndex: 0,
      explanation: 'For an infinite geometric series to converge to a finite sum, its common ratio $x = \\frac{1+g}{1+r}$ must be strictly less than 1, which requires $1+g < 1+r \\implies r > g$. If $g \\ge r$, the series explodes to infinity.',
      hint: 'Think about what happens to an infinite geometric series when its ratio $x \\ge 1$.'
    },
    {
      id: 'val_q3',
      question: 'A stock is currently trading for \\$100.00 per share. It is expected to pay a dividend of \\$3.00 next year ($D_1$). If your required return ($r$) is 10% ($0.10$), what is the stock\'s implied dividend growth rate ($g$)?',
      options: [
        '3.0%',
        '5.0%',
        '7.0%',
        '10.0%'
      ],
      correctIndex: 2,
      explanation: 'Rearranging $r = \\frac{D_1}{P_0} + g$ gives $g = r - \\frac{D_1}{P_0}$. Calculating Dividend Yield: $\\frac{\\$3.00}{\\$100.00} = 0.03 = 3\\%$. Subtracting yield from required return: $g = 10\\% - 3\\% = 7\\%$.',
      hint: 'First find Dividend Yield = $3 / 100 = 3\\%$. Then $g = r - \\text{Dividend Yield} = 10\\% - 3\\%$.'
    },
    {
      id: 'val_q4',
      question: 'Why does reinvesting retained earnings allow a company to transition from zero-growth valuation ($P_0 = \\frac{D}{r}$) to constant dividend growth ($P_0 = \\frac{D_1}{r - g}$)?',
      options: [
        'Retaining earnings reduces the company\'s tax rate to zero',
        'Reinvesting retained earnings into productive assets expands future earnings, allowing dividends to grow each year at rate $g$',
        'Retaining earnings forces investors to accept a 0% required return',
        'Reinvesting earnings prevents the stock price from ever changing'
      ],
      correctIndex: 1,
      explanation: 'By keeping a portion of profits as Retained Earnings and reinvesting in new projects, factories, or products, the company grows its earning power and increases future dividends over time at rate $g$.',
      hint: 'Think about what happens when profits are used to buy new equipment or expand operations.'
    }
  ]
};

