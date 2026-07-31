import { LessonContent } from '../../types';

export const newsBridge: LessonContent = {
  id: 'newsBridge',
  title: 'The News Catalyst: Why Stock Prices Wiggle & Re-Rate',
  subtitle: 'From static valuation formulas to market news shocks, expectation shifts, and real-world price discovery',
  mathTopic: 'Expectation Shifting, Growth Shocks (Δg), and Discount Rate Shocks (Δr) in the Gordon Growth Model',
  equations: [
    'P_0 = \\frac{D_1}{r - g} \\quad \\text{(Baseline Gordon Growth Model)}',
    'P_{\\text{new}} = \\frac{D_1}{(r + \\Delta r) - (g + \\Delta g)} \\quad \\text{(Price Adjustment Under News Shocks)}',
    '\\text{News Shock} = \\text{Actual Announcement} - \\text{Expected Consensus}'
  ],
  description: 'Why do real stock charts look like jagged, wiggling lines? Move beyond static formulas to understand how unpredictable news instantly shifts collective expectations for growth (g) and risk (r), driving real-world price discovery.',
  introduction: `In Unit 4, we derived the celebrated <span className="text-indigo-600 font-bold">Gordon Growth Model</span> ($P_0 = \\frac{D_1}{r - g}$). It provided a clean, logical formula for calculating the fair value of a stock based on its next expected dividend ($D_1$), required return ($r$), and perpetual growth rate ($g$).

However, if you watch live stock tickers on financial news networks, prices rarely stand still. They jump, dip, and trace out wiggling, unpredictable paths throughout the trading day. Why does a company\'s stock price move every few seconds when its real-world operations change over months and years?

The answer is that stock prices do not measure past accounting records; they reflect <span className="text-indigo-600 font-bold">live, collective expectations about the future</span>. Whenever unexpected news reaches the market, investors immediately update their estimates for growth ($g$) and risk ($r$). In this bridge unit, we explore the mechanics of news shocks, examine iconic real-world case studies, and discover how shifts in $\\Delta g$ and $\\Delta r$ transform static valuation formulas into dynamic price movements.`,
  fullText: [
    '1. <span className="text-indigo-600 font-bold">Stock Prices as Live Expectation Engines</span>',
    'To understand market volatility, we must first recognize that a stock price is a live voting mechanism. Millions of buyers and sellers continuously assess all available information to estimate a company\'s future cash flows and risk profile.',
    'Because trading happens instantly on digital exchanges, current market prices already incorporate everything that is currently known or widely anticipated. If analysts universally expect a technology firm to expand its sales by $20\\%$ next year, that $20\\%$ growth rate is already factored into the market\'s growth estimate $g$. The stock price does not wait for the official earnings report to rise; it adjusts in advance to reflect those expectations.',
    'Consequently, when new information arrives, the market does not evaluate the news in a vacuum. It evaluates the news relative to what was already expected. This brings us to the fundamental law of market catalysts:',
    '$$\\text{News Shock} = \\text{Actual Announcement} - \\text{Expected Consensus}$$',
    'If an announcement matches prior expectations perfectly, the news shock is zero, and the stock price barely moves. Price movements occur only when an event surprises the market, forcing investors to revise their baseline assumptions.',

    '2. <span className="text-indigo-600 font-bold">The "Priced In" Paradox</span>',
    'This expectation mechanism explains a common puzzle that confuses many new investors: why a stock price can plunge immediately after a company reports record-breaking profits.',
    'Suppose a popular retail company announces that its quarterly earnings grew by a impressive $15\\%$. On the surface, $15\\%$ profit growth sounds like fantastic news. However, if market consensus heading into the announcement had anticipated $25\\%$ growth, the actual result falls short of expectations. The effective news shock is negative:',
    '$$\\text{News Shock} = 15\\% - 25\\% = -10\\%$$',
    'Because the result was weaker than expected, investors lower their long-term growth forecast from $g$ to $g - \\Delta g$. When $g$ decreases in the Gordon Growth formula $P_0 = \\frac{D_1}{r - g}$, the denominator $(r - g)$ widens, and the fair value stock price drops. The market was not punishing the company for earning money; it was adjusting the stock price to reflect a lower future growth trajectory.',

    '3. <span className="text-indigo-600 font-bold">The Mechanics of Growth Shocks ($\\Delta g$) and Rate Shocks ($\\Delta r$)</span>',
    'In the Gordon Growth Model, every piece of news impacts stock prices by altering one or both of the key denominator inputs: the perpetual growth rate ($g$) and the required discount rate ($r$).',
    'When positive news emerges—such as a technological breakthrough or an unexpected surge in customer demand—investors increase their growth estimate by $\\Delta g$. The updated valuation equation becomes:',
    '$$P_{\\text{new}} = \\frac{D_1}{r - (g + \\Delta g)}$$',
    'Notice how adding $\\Delta g$ shrinks the denominator. A smaller denominator increases the overall fraction, lifting $P_{\\text{new}}$ above the initial price $P_0$. Conversely, if growth expectations fall by $\\Delta g$, the denominator widens, and the stock price declines.',
    'Similarly, news affecting market risk or interest rates changes the discount rate by $\\Delta r$:',
    '$$P_{\\text{new}} = \\frac{D_1}{(r + \\Delta r) - g}$$',
    'When economy-wide interest rates rise or a business faces heightened risk, investors demand a higher return ($r + \\Delta r$). This expands the denominator $(r + \\Delta r - g)$, reducing the present value of future dividends and driving the stock price down.',

    '4. <span className="text-indigo-600 font-bold">Real-World Case Study 1: The 2022 Federal Reserve Rate Hikes ($\\Delta r$ Macro Shock)</span>',
    'We can observe these principles in major historical market events. During 2020 and 2021, central banks maintained interest rates near zero to support economic recovery. Safe government bond yields were exceptionally low, allowing required returns on equities ($r$) to remain modest—around $6.5\\%$. For high-growth stocks with estimated growth rates of $g = 4.5\\%$, the denominator spread $(r - g)$ was a narrow $2.0\\%$ ($0.02$).',
    'For a company paying an expected dividend of $D_1 = \\text{\\$2.00}$, this narrow spread yielded a high valuation:',
    '$$P_0 = \\frac{\\text{\\$2.00}}{0.065 - 0.045} = \\frac{\\text{\\$2.00}}{0.02} = \\text{\\$100.00}$$',
    'In 2022, surging inflation prompted the U.S. Federal Reserve to raise benchmark interest rates rapidly. Yields on low-risk Treasury bonds jumped from $1.5\\%$ to over $4.5\\%$. This economy-wide shift forced investors to raise their required discount rate for stocks from $r = 6.5\\%$ to $r = 9.5\\%$—a positive discount rate shock of $\\Delta r = +3.0\\%$.',
    'Even for companies whose underlying business revenues and dividend payments ($D_1 = \\text{\\$2.00}$) remained unchanged, the wider discount rate expanded the denominator spread from $2.0\\%$ to $5.0\\%$ ($0.095 - 0.045 = 0.05$):',
    '$$P_{\\text{new}} = \\frac{\\text{\\$2.00}}{0.095 - 0.045} = \\frac{\\text{\\$2.00}}{0.05} = \\text{\\$40.00}$$',
    'The stock price fell from \\$100.00 to \\$40.00—a $60\\%$ decline—without any drop in corporate earnings. This dramatic market drop was a classic macroeconomic rate shock ($\\Delta r > 0$) that compressed stock valuations across global markets.',

    '5. <span className="text-indigo-600 font-bold">Real-World Case Study 2: NVIDIA\'s AI Demand Surge in 2023 ($\\Delta g$ Catalyst)</span>',
    'In contrast, positive growth shocks can generate rapid wealth creation. In May 2023, technology company NVIDIA published its quarterly financial outlook. Financial analysts had anticipated quarterly revenues of approximately \\$7.2 Billion.',
    'Instead, driven by unprecedented global demand for artificial intelligence chips, NVIDIA projected upcoming quarterly revenues of \\$11.0 Billion—a massive $53\\%$ surprise beat above consensus estimates.',
    'This announcement forced investors to re-evaluate the long-term growth prospects of the company. Analysts raised perpetual dividend growth expectations from $g = 5.0\\%$ ($0.050$) to $g = 7.5\\%$ ($0.075$). Assuming a required return of $r = 9.5\\%$ ($0.095$), the growth shock narrowed the denominator spread $(r - g)$ from $4.5\\%$ to $2.0\\%$:',
    '$$\\text{Initial Spread: } 0.095 - 0.050 = 0.045 \\implies P_0 = \\frac{D_1}{0.045}$$',
    '$$\\text{New Spread: } 0.095 - 0.075 = 0.020 \\implies P_{\\text{new}} = \\frac{D_1}{0.020}$$',
    'Because the denominator was cut by more than half, the stock price surged by over $24\\%$ in a single trading session, adding nearly \\$200 Billion in market value within 24 hours. The surge reflected investors applying a higher growth rate ($g + \\Delta g$) to the Gordon Growth Model in real time.',

    '6. <span className="text-indigo-600 font-bold">Real-World Case Study 3: The Netflix Subscriber Shock of 2022 (Combined $\\Delta g$ and $\\Delta r$)</span>',
    'Sometimes a single news event hits a stock with a negative growth shock and a positive risk shock simultaneously.',
    'In early 2022, streaming service Netflix reported a loss of 200,000 subscribers—its first quarterly subscriber drop in a decade. The surprise announcement altered investor perceptions in two distinct ways:',
    'First, investors realized streaming market saturation was arriving sooner than expected, leading them to lower long-term growth estimates from $g = 5.0\\%$ to $g = 1.0\\%$ ($\\Delta g = -4.0\\%$). Second, increased competitive pressure raised perceived business risk, prompting investors to increase the discount rate from $r = 8.0\\%$ to $r = 10.0\\%$ ($\\Delta r = +2.0\\%$).',
    '$$\\text{Initial Valuation: } P_0 = \\frac{D_1}{0.08 - 0.05} = \\frac{D_1}{0.03}$$',
    '$$\\text{Post-Shock Valuation: } P_{\\text{new}} = \\frac{D_1}{0.10 - 0.01} = \\frac{D_1}{0.09}$$',
    'The denominator spread widened threefold from $3.0\\%$ to $9.0\\%$. As a result, the stock price fell by more than $35\\%$ in a single day. When a lower growth estimate combines with a higher risk discount rate, the widening denominator severely depresses stock valuation.',

    'KNOWLEDGE_CHECK_NEWS_BRIDGE',

    '7. <span className="text-indigo-600 font-bold">Why High-Growth Stocks Are More Sensitive to News</span>',
    'These mathematical relationships also explain why high-growth technology shares experience much larger percentage price swings than mature utility or consumer staple companies when interest rates change.',
    'Consider two hypothetical companies that each pay an annual dividend of $D_1 = \\text{\\$2.00}$ with a baseline discount rate of $r = 10.0\\%$:',
    'A mature utility company with a low growth rate of $g = 2.0\\%$ has a denominator spread of $(0.10 - 0.02) = 0.08$. Its baseline price is $P_0 = \\frac{\\text{\\$2.00}}{0.08} = \\text{\\$25.00}$.',
    'A high-growth tech firm with a growth rate of $g = 8.0\\%$ has a much narrower denominator spread of $(0.10 - 0.08) = 0.02$. Its baseline price is $P_0 = \\frac{\\text{\\$2.00}}{0.02} = \\text{\\$100.00}$.',
    'Now suppose macroeconomic news causes market interest rates to rise, pushing the discount rate up by $1.0\\%$ to $r = 11.0\\%$ ($\\Delta r = +0.01$):',
    'For the utility company, the denominator widens from $0.08$ to $0.09$, moving the price to $\\frac{\\text{\\$2.00}}{0.09} = \\text{\\$22.22}$—a decline of $11.1\\%$.',
    'For the high-growth company, the same $1.0\\%$ rate increase widens the denominator from $0.02$ to $0.03$, moving the price to $\\frac{\\text{\\$2.00}}{0.03} = \\text{\\$66.67}$—a sharp drop of $33.3\\%$.',
    'Because high-growth companies operate with smaller baseline denominator spreads $(r - g)$, any shift in $\\Delta r$ or $\\Delta g$ represents a larger proportional change in the denominator. This mathematical structure makes high-growth stocks naturally more sensitive to news catalysts.',

    '8. <span className="text-indigo-600 font-bold">From Static Valuation to Dynamic Market Paths</span>',
    'We now have a complete framework connecting fundamental valuation formulas to the real-world behavior of financial markets:',
    'At any given moment, a stock price is governed by logical valuation principles like the Gordon Growth Model ($P_0 = \\frac{D_1}{r - g}$). However, because the future is uncertain, world events—such as scientific breakthroughs, policy changes, quarterly earnings reports, and economic shifts—occur unpredictably over time.',
    'Each unexpected event creates a news shock that leads investors to adjust their estimates of growth ($\\Delta g$) or risk ($\\Delta r$). As these inputs are updated, the stock price steps up or down to its new equilibrium level.',
    'Because unexpected world news arrives at random intervals, the resulting sequence of price adjustments traces out a jagged, wiggling path on stock charts. The wiggles are not evidence of market irrationality; they are the visual signature of a logical valuation model continuously updating as new information arrives.',
    'This insight provides the ideal transition to <span className="text-indigo-600 font-bold">Unit 6: Stochastic Calculus & Asset Paths</span>, where we formalize how continuous streams of random news shape the probabilistic paths of financial assets over time.'
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
      explanation: 'In financial markets, stock prices reflect current public expectations. If a company announces results that match expectations, there is no surprise news shock to shift growth ($g$) or risk ($r$). Therefore, the price remains relatively stable because the news was already "priced in."',
      hint: 'Ask yourself: was there any "surprise" in the announcement, or did it go exactly as everyone expected?'
    },
    {
      id: 'nb2',
      question: 'A company pays an expected dividend of \\$3.00, with discount rate r = 10% (0.10) and growth rate g = 4% (0.04), giving a price of \\$50. Suddenly, new market risk increases the required discount rate (r) to 12% (0.12). What is the new stock price under Gordon Growth?',
      options: [
        '\\$50.00 (Risk has no effect on prices)',
        '\\$37.50, because the denominator (r - g) increased from 0.06 to 0.08',
        '\\$60.00, because competition makes companies work harder',
        '\\$25.00, because the denominator (r - g) doubled'
      ],
      correctIndex: 1,
      explanation: 'Applying $P = \\frac{D_1}{r_{\\text{new}} - g} = \\frac{\\$3.00}{0.12 - 0.04} = \\frac{\\$3.00}{0.08} = \\$37.50$. The stock price drops from \\$50.00 to \\$37.50 because the rate shock ($\\Delta r = +0.02$) expanded the denominator.',
      hint: 'Plug $D_1 = 3$, $r = 0.12$, and $g = 0.04$ into $P = D_1 / (r - g)$.'
    },
    {
      id: 'nb3',
      question: 'During the 2022 Federal Reserve interest rate hikes, why did high-growth technology stocks suffer much steeper percentage price drops than mature utility stocks?',
      options: [
        'Because technology companies do not use electricity',
        'Because high-growth stocks have small baseline spreads (r - g), making the same +1% rate hike ($\\Delta r$) represent a much larger proportional change in the denominator',
        'Because the Federal Reserve passed a law banning software development',
        'Because utility companies are immune to inflation and interest rates'
      ],
      correctIndex: 1,
      explanation: 'High-growth stocks have perpetual growth rates $g$ close to discount rates $r$, making their baseline denominator spread $(r - g)$ very small (e.g. 0.02). A 1% increase in discount rate $r$ widens that spread by 50% (from 0.02 to 0.03), causing a steep percentage crash in share price.',
      hint: 'Recall how small denominator spreads (r - g) amplify rate changes.'
    },
    {
      id: 'nb4',
      question: 'Why do real stock price charts trace out wiggling, unpredictable paths over time instead of smooth straight lines?',
      options: [
        'Because stock exchanges use computer glitches to confuse buyers',
        'Because unexpected world news arrives at unpredictable times, causing rational investors to continuously update growth ($\\Delta g$) and risk ($\\Delta r$) in valuation formulas',
        'Because companies change their business models every single minute',
        'Because math formulas are only valid on weekends'
      ],
      correctIndex: 1,
      explanation: 'While valuation equations like Gordon Growth are smooth and logical, their inputs ($g$ and $r$) update whenever unexpected news arrives. Because news arrives unpredictably, the sequence of price adjustments forms a wiggling path.',
      hint: 'Think about how unexpected world news forces investors to update future growth and risk assumptions.'
    }
  ]
};
