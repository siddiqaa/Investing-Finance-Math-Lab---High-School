import { LessonContent } from '../../types';

export const stochastic: LessonContent = {
  id: 'stochastic',
  title: 'Stock Prices & Random Walks',
  subtitle: 'Daily Compounding, Percentage Asymmetry, and Extreme Market Deviations',
  mathTopic: 'Multiplicative Random Walks, Percentage Loss Asymmetry $(1+x)(1-x) = 1-x^2$, and Geometric vs. Arithmetic Means',
  equations: [
    '(1 + x)(1 - x) = 1 - x^2',
    'S_t = S_0 \\prod_{k=1}^t (1 + r_k)',
    '\\%\\text{ Gain Needed to Recover} = \\frac{L}{1 - L}'
  ],
  description: 'Bridge from Unit 1 annual compounding and Unit 5 news catalyst shocks into daily market math. Discover how daily random news flips create multiplicative random walks, why percentage loss asymmetry penalizes volatile portfolios, and how historical market panics create extreme deviations from intrinsic value.',
  introduction: `In Unit 1, we mastered annual compound interest using the deterministic formula $FV = PV(1+r)^n$, assuming a smooth, constant growth rate $r$. Then in Unit 5, we saw how unexpected corporate news shocks $(\\Delta r)$ instantly alter a stock's intrinsic value. Unit 6 brings these two fundamental concepts together: what happens when compound growth meets continuous, unpredictable daily news shocks?

In the real world, unexpected surprises hit the market every single day—earnings releases, central bank interest rate decisions, geopolitical events, weather disruptions, and sudden technological breakthroughs. Because news surprises are equally likely to be positive or negative on any given morning, daily stock prices trace out a <span className="text-purple-700 font-bold">Random Walk</span>. In 1900, French mathematician Louis Bachelier first modeled stock price movements using the same mathematical equations that describe dust particles colliding randomly in water (Brownian motion). Decades later, Nobel laureate Paul Samuelson refined this into the Modern Random Walk Hypothesis: while long-term stock prices drift upward due to business earnings growth, short-term daily price movements are inherently unpredictable noise.

However, a fundamental algebraic rule creates a hidden trap in daily percentage compounding. In high school algebra, you learned the difference of squares identity: $(1 + x)(1 - x) = 1 - x^2$. In finance, this simple identity means that a $+10\\%$ gain followed by a $-10\\%$ loss does <span className="italic">not</span> leave you at break-even—it leaves you at $1 - 0.10^2 = 0.99$ ($99\\%$) of your starting money! The wider daily price swings are, the more $x^2$ stealthily drains your compounded wealth over time.

In this unit, we will explore the algebra of multiplicative random walks, derive the recovery formula $\\frac{L}{1-L}$, and analyze real-world historical market dislocations—including the 1987 Black Monday crash, the 2000 Dot-Com bubble collapse, the 2008 Financial Crisis, and the 2020 COVID market shock. You will learn why disciplined investors focus on geometric return rather than arithmetic averages to survive market fluctuations.`,
  fullText: [
    '<span className="text-purple-700 font-bold">The Hook: The Drunkard\'s Walk on Wall Street</span>\nImagine a drunkard standing beneath a lamppost. Every second, he takes one step randomly to the left or one step to the right with equal $50\\%$ probability. Where will he be after 100 steps? While his average expected position is still directly under the lamppost, his actual location after 100 steps could be 10 steps to the left or 15 steps to the right. In financial economics, daily stock price movements behave remarkably like this random walk. While long-term asset prices drift upward driven by economic productivity and dividend compounding, short-term daily prices wander unpredictably driven by random news shocks.',

    '1. <span className="text-purple-700 font-bold">Bridging Unit 1 & Unit 5: Multiplicative Compounding Under Daily Shocks</span>\nIn Unit 1, we calculated compounded growth over $n$ years as $FV = PV(1+r)^n$ with a fixed annual rate $r$. In Unit 5, we learned that stock prices react immediately to surprise news shocks $\\Delta r$. In the real market, unexpected news happens every day, so the daily return $r_t$ changes randomly each day.\nTo calculate the stock price $S_t$ on day $t$, we chain together daily multiplicative growth factors:\n$$S_t = S_0 (1 + r_1)(1 + r_2)(1 + r_3) \\cdots (1 + r_t) = S_0 \\prod_{k=1}^t (1 + r_k)$$\nNotice that daily returns compound <span className="text-purple-700 font-bold">multiplicatively</span>, not additively. This multiplicative structure is the root cause of percentage loss asymmetry.',

    '2. <span className="text-purple-700 font-bold">The Algebra of Percentage Loss Asymmetry: $(1+x)(1-x) = 1-x^2$</span>\nWhy do percentage gains and losses behave differently than basic addition and subtraction? Consider the fundamental algebraic difference of squares:\n$$(1 + x)(1 - x) = 1 - x^2$$\nWhen $x = 0.10$ ($10\\%$):\n$$(1 + 0.10)(1 - 0.10) = (1.10)(0.90) = 0.99$$\nYou lose $1\\%$ of your total wealth on every equal $+10\\% / -10\\%$ pair! If $x = 0.20$ ($20\\%$):\n$$(1 + 0.20)(1 - 0.20) = (1.20)(0.80) = 0.96$$\nYou lose $4\\%$ of your wealth on an equal $+20\\% / -20\\%$ cycle. The larger the swing $x$, the greater the penalty $x^2$!',

    'To recover from a percentage loss $L$, the percentage gain $G$ required to return to your starting capital is given by the algebraic recovery formula:\n$$G = \\frac{L}{1 - L}$$\nAs the loss $L$ grows, the required gain $G$ explodes exponentially:',

    'RECOVERY_TABLE|Percentage Loss (L) | Remaining Wealth | Percentage Gain Needed to Break Even | Severity Level\n10% Loss | 90% ($0.90) | 11.1% Gain | Minor Market Pullback\n20% Loss | 80% ($0.80) | 25.0% Gain | Standard Bear Market\n33.3% Loss | 66.7% ($0.667) | 50.0% Gain | Moderate Financial Crash\n50% Loss | 50% ($0.50) | 100.0% Gain | Severe Financial Crisis\n75% Loss | 25% ($0.25) | 300.0% Gain | Extreme Bubble Burst\n90% Loss | 10% ($0.10) | 900.0% Gain | Catastrophic Corporate Failure',

    'Notice the brutal truth of the math: A $50\\%$ loss requires a <span className="font-bold text-rose-600">100% gain</span> just to get back to where you started! A $90\\%$ loss requires a staggering <span className="font-bold text-rose-600">900% gain</span>. This is why preserving capital during market drawdowns is far more important than chasing speculative spikes.',

    '3. <span className="text-purple-700 font-bold">The Coin-Flip Portfolio: Arithmetic vs. Geometric Mean</span>\nSuppose an investment manager offers you a game: Start with \\$100. Every month, a fair coin is flipped. Heads = $+20\\%$, Tails = $-20\\%$. You play for 10 months and get exactly 5 Heads and 5 Tails.\nWhat is your average return?\n- <span className="text-purple-700 font-bold">Arithmetic Average Return</span>: $\\frac{5(+20\\%) + 5(-20\\%)}{10} = 0.0\\%$ per month. It sounds like you should break even!\n- <span className="text-purple-700 font-bold">Actual Geometric Wealth</span>:\n$$\\$100 \\times (1.20)^5 \\times (0.80)^5 = \\$100 \\times (0.96)^5 = \\$81.54$$\nEven though the arithmetic average was $0\\%$, you lost <span className="font-bold text-rose-600">\\$18.46</span> of your starting money! The sequence of coin flips does not matter; whether you get 5 Heads first or alternate Heads/Tails, the end result is identically $\\$81.54$.',

    'Now compare two investors who achieve the exact same arithmetic average return of $10\\%$ over 4 years:',

    'VOLATILITY_TABLE|Year | Investor A (Steady) | Investor B (Wild)\nYear 1 | +10% | +40%\nYear 2 | +10% | -20%\nYear 3 | +10% | +40%\nYear 4 | +10% | -20%\nArithmetic Average | 10.0% | 10.0%\nFinal Balance ($100 start) | \\$146.41 | \\$125.44',

    'Investor B lost <span className="font-bold text-purple-900">\\$20.97</span> compared to Investor A, despite having the exact same average return of $10\\%$. Steady compound growth mathematically beats volatile growth every single time.',

    '4. <span className="text-purple-700 font-bold">Real-World Case Study 1: The 1987 Black Monday Crash (-22.6% in 1 Day)</span>\nOn Monday, October 19, 1987 ("Black Monday"), the Dow Jones Industrial Average collapsed by <span className="font-bold text-rose-600">-22.6% in a single trading day</span>—the largest single-day percentage drop in stock market history.\nWhat triggered this sudden panic? Was there a world war or major corporate bankruptcy? No! The crash was amplified by newly introduced computer trading systems called "Portfolio Insurance." These automated algorithms were programmed to automatically sell stock index futures whenever prices fell by a set percentage. When prices dipped slightly on Monday morning, the algorithms triggered automated sell orders, which pushed prices lower, which triggered more algorithm sales in a violent self-reinforcing downward spiral.',

    'Applying our recovery formula $G = \\frac{L}{1-L}$:\n$$G = \\frac{0.226}{1 - 0.226} = \\frac{0.226}{0.774} \\approx 29.2\\%$$\nTo recover from that single 6.5-hour trading collapse, the market had to rally <span className="font-bold text-indigo-700">+29.2%</span> over the subsequent months just to reach break-even. Investors who panicked and sold at the bottom converted paper volatility into permanent capital loss.',

    '5. <span className="text-purple-700 font-bold">Real-World Case Study 2: The 2000 Dot-Com Crash & Leveraged ETF Decay</span>\nDuring the late 1990s, investor excitement over the commercial internet created an immense speculative bubble in technology stocks. The Nasdaq Composite Index skyrocketed from 1,000 points in 1995 to a peak of 5,048 in March 2000. But when tech earnings failed to justify sky-high valuations, the bubble burst. Between March 2000 and October 2002, the Nasdaq crashed <span className="font-bold text-rose-600">-78%</span>.',

    'Recovering from a $78\\%$ drawdown required a staggering <span className="font-bold text-rose-600">+355% gain</span>! It took the Nasdaq index <span className="text-purple-700 font-bold">15 years (until April 2015!)</span> to finally break even and cross 5,000 points again.',

    'This historical event highlights a modern financial trap: <span className="text-purple-700 font-bold">Daily Leveraged ETFs (e.g. 3x Leveraged Funds like TQQQ)</span>. These funds rebalance daily to deliver 300% of an index\'s daily return. If an index goes up +5% on Day 1 and down -5% on Day 2, the underlying index is at $(1.05)(0.95) = 0.9975$ (a $0.25\\%$ loss). But the 3x leveraged fund moves $+15\\%$ on Day 1 and $-15\\%$ on Day 2: $(1.15)(0.85) = 0.9775$ (a <span className="font-bold text-rose-600">2.25% loss</span>!). In choppy, sideways markets, volatility decay gradually erodes leveraged fund values down to zero.',

    '6. <span className="text-purple-700 font-bold">Real-World Case Study 3: The 2020 COVID Market Shock & V-Shaped Rebound</span>\nIn February and March 2020, as the COVID-19 pandemic triggered global economic lockdowns, the S&P 500 experienced the fastest $30\\%+$ market crash in history—plunging <span className="font-bold text-rose-600">-34% in just 23 trading days</span>.\nDriven by extreme fear, many retail investors liquidated their stock portfolios into cash at the March 23, 2020 low. However, massive fiscal stimulus and central bank liquidity sparked a swift V-shaped recovery. By August 2020—just 5 months later—the stock market surpassed its pre-pandemic high, and by the end of 2021, the market was up over <span className="font-bold text-emerald-600">+100%</span> from the March 2020 bottom!',

    'This historical event illustrates a crucial quantitative lesson: <span className="text-purple-700 font-bold">Short-term market random walks frequently detach from long-term intrinsic value</span>. Investors who panic during short-term noise lock in permanent losses, while disciplined investors who remain invested benefit from long-term compound drift.',

    '7. <span className="text-purple-700 font-bold">Practical Action Plan for High Schoolers & Families</span>\nHow do you navigate random walks in your personal life?\n- <span className="text-purple-700 font-bold">Dollar-Cost Averaging (DCA)</span>: Instead of investing a large lump sum all at once, invest a fixed dollar amount (e.g., \\$100 every month). When the market drops, your \\$100 automatically buys more shares at a discount. When the market rises, your \\$100 buys fewer shares. DCA turns market volatility into a friend!\n- <span className="text-purple-700 font-bold">Maintain an Emergency Cash Buffer</span>: Keep 3 to 6 months of living expenses in a safe high-yield savings account or Treasury bills. Having cash reserves ensures you will never be forced to sell stocks during a market drawdown to pay for living expenses.\n- <span className="text-purple-700 font-bold">Lengthen Your Time Horizon</span>: Over a 1-day period, stock market returns are essentially a $50/50$ coin flip. But over a 20-year holding period, historical US stock market returns have been positive <span className="font-bold text-emerald-600">100% of the time</span>! Time smooths out short-term random noise.'
  ],
  quizzes: [
    {
      id: 's1',
      question: 'Using the algebraic difference of squares formula $(1+x)(1-x) = 1-x^2$, if a stock price starts at \\$100, gains 20% on Monday, and loses 20% on Tuesday, what is its final price?',
      options: [
        '\\$96.00',
        '\\$100.00',
        '\\$104.00',
        '\\$80.00'
      ],
      correctIndex: 0,
      explanation: 'Using $(1+0.20)(1-0.20) = 1 - (0.20)^2 = 1 - 0.04 = 0.96$, the price becomes $\\$100 \\times 0.96 = \\$96.00$. You lose $4\\%$ of your wealth.',
      hint: 'Apply the difference of squares identity $(1+x)(1-x) = 1-x^2$ where $x = 0.20$.'
    },
    {
      id: 's2',
      question: 'According to the recovery formula $G = \\frac{L}{1-L}$, if an investor suffers a 50% loss during a financial panic, what percentage gain is required to break even?',
      options: [
        '100% gain',
        '50% gain',
        '75% gain',
        '200% gain'
      ],
      correctIndex: 0,
      explanation: 'Substituting $L = 0.50$ into $G = \\frac{0.50}{1 - 0.50} = \\frac{0.50}{0.50} = 1.00$, a $100\\%$ gain is required just to return to the initial starting value.',
      hint: 'If \\$100 drops by 50% to \\$50, how much must \\$50 grow to reach \\$100 again?'
    },
    {
      id: 's3',
      question: 'Why does higher return volatility cause compound geometric growth to be lower than simple arithmetic average return?',
      options: [
        'Because percentage losses require larger percentage gains to recover, as shown by $(1+x)(1-x) = 1-x^2$',
        'Because volatile stocks are prohibited by law from paying quarterly dividends',
        'Because wild swings automatically trigger brokerage maintenance fees',
        'Because inflation drops to zero during volatile periods'
      ],
      correctIndex: 0,
      explanation: 'Due to percentage loss asymmetry ($(1+x)(1-x) = 1-x^2$), wild fluctuations penalize compound geometric growth compared to steady growth with the same average return.',
      hint: 'Recall that $(1+0.10)(1-0.10) = 0.99$, which is less than 1.0.'
    }
  ]
};
