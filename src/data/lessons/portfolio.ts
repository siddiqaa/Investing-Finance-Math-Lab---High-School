import { LessonContent } from '../../types';

export const portfolio: LessonContent = {
  id: 'portfolio',
  title: 'Portfolio Diversification & Risk',
  subtitle: 'The algebra of expected return, correlation, and spreading risk',
  mathTopic: 'Weighted Averages, Correlation, Portfolio Variance, Efficient Frontier, Sharpe Ratio, and Beta',
  equations: [
    'E[R_p] = \\sum_{i=1}^n w_i E[R_i]',
    '\\sigma_p = \\sqrt{w_1^2 \\sigma_1^2 + w_2^2 \\sigma_2^2 + 2 w_1 w_2 \\sigma_1 \\sigma_2 \\rho_{1,2}}',
    '\\text{Sharpe Ratio} = \\frac{E[R_p] - R_f}{\\sigma_p}',
    '\\beta_i = \\frac{\\text{Cov}(R_i, R_m)}{\\text{Var}(R_m)}'
  ],
  description: 'Can you get more return with less risk? Yes! Discover how combining different investments using weighted averages and correlation cancels out specific risk, builds the Markowitz Efficient Frontier, and optimizes risk-adjusted returns.',
  introduction: `In almost every area of life, there is a fundamental trade-off: if you want more of something good, you have to accept more of something bad. If you want a faster sports car, you have to pay more for fuel and insurance. If you want a bigger house, you have to spend more weekends cleaning it. In the world of investing, this trade-off is usually between <span className="text-indigo-600 font-bold">Risk</span> and <span className="text-indigo-600 font-bold">Return</span>. If you want the chance to double your money in a single year, you have to accept the very real chance that you could lose half of it in a month. This seems like an unbreakable law of financial physics. But in 1952, a 25-year-old graduate student at the University of Chicago named Harry Markowitz discovered a "cheat code" that changed finance forever. He proved mathematically that by combining different investments in just the right way, you could actually lower your total portfolio risk without giving up your expected return. This breakthrough was so revolutionary that it laid the foundation for modern quantitative finance and eventually earned Markowitz the 1990 Nobel Memorial Prize in Economic Sciences.

The secret behind Markowitz's discovery is <span className="text-indigo-600 font-bold">Diversification</span>. You have probably heard the age-old advice: "Don't put all your eggs in one basket." If you have ten eggs in one basket and trip on a rock, all ten eggs smash. If you put one egg in each of ten separate baskets and trip, you only lose one egg. That is common sense. But financial mathematics goes far deeper. It doesn't just ask how many baskets you hold; it asks whether the baskets are tied to each other with an invisible rope! Imagine you carry two baskets of eggs, but you hold both of them in your left hand. If you trip on your left foot, both baskets smash at the exact same moment. Mathematically, those two baskets are "Highly Correlated." Even though you bought two separate baskets, you haven't actually lowered your risk at all—you simply double-exposed yourself to the exact same crash.

To achieve what economists call the "Only Free Lunch in Finance," you must find investments that move independently of one another—or better yet, move in opposite directions. Consider a simple real-world business example: Imagine you own a shop on the beach that sells umbrellas. When it rains, umbrella sales skyrocket and your profit surges. When it's sunny, nobody buys umbrellas and your profit collapses. Now imagine you also buy a second shop on the same beach that sells ice cream. When it's sunny, ice cream sales go through the roof, but when it rains, ice cream profit plunges to zero. If you own only the umbrella shop or only the ice cream shop, your monthly income fluctuates wildly between feast and famine depending on the weather forecast. But if you own <span className="text-indigo-600 font-bold">both</span> shops 50/50, your total monthly income stays remarkably smooth and steady regardless of rain or shine! The profit "Zig" of the umbrella shop perfectly offsets the profit "Zag" of the ice cream shop.

This is the magic of <span className="text-indigo-600 font-bold">Correlation</span>. By combining assets that don't move in lockstep, the overall volatility of your wealth shrinks dramatic fashion. This "smoothing" is not just a visual comfort; it is a mathematical engine for wealth accumulation because it protects you from the devastating impact of geometric volatility drag. In this unit, we will explore the algebra behind portfolio construction: calculating weighted averages, measuring cross-asset correlation $\\rho$, calculating portfolio variance $\\sigma_p^2$, dissecting stock Beta $\\beta$, and scoring risk-adjusted efficiency with the famous <span className="text-indigo-600 font-bold">Sharpe Ratio</span>. You will learn how real-world investors survived historical market shocks like the 1987 Black Monday, the 2000 Dot-Com crash, the 2008 Global Financial Crisis, and the 2022 inflation shock by building resilient, multi-asset portfolios.`,
  fullText: [
    '<span className="text-indigo-600 font-bold">The Hook: The Only Free Lunch in Finance</span>\nIn economics, there is a famous proverb: "There is no such thing as a free lunch." If you want higher returns, you must swallow higher risk. But <span className="text-indigo-600 font-bold">Modern Portfolio Theory (MPT)</span> proves there is one glorious exception. By mathematically combining assets whose price movements are not perfectly synchronized, you can reduce total portfolio risk below the average risk of its individual components without sacrificing expected return. Diversification is the only mathematical mechanism in finance that gives you something for nothing.',

    '1. <span className="text-indigo-600 font-bold">The Epiphany of 1952 — Harry Markowitz & The Birth of MPT</span>\nIn 1952, Harry Markowitz was a PhD candidate reviewing early investment literature, specifically John Burr Williams\' 1938 classic <span className="italic">The Theory of Investment Value</span>. Williams argued that an investor should calculate the expected net present value ($NPV$) of future cash flows for every available stock and invest 100% of their wealth in whichever single stock had the highest expected valuation.\nMarkowitz immediately spotted a fatal flaw in Williams\' logic: If an investor puts all their money into the single best stock, they face catastrophic single-company risk. If that company goes bankrupt due to a scandal or sudden product failure, the investor loses everything. Markowitz realized that investors do not care about expected return in isolation—they care about the <span className="text-indigo-600 font-bold">trade-off between expected return and return variance (risk)</span> across their entire collection of holdings.',

    '2. <span className="text-indigo-600 font-bold">Portfolio Expected Return: The Weighted Average Algebra</span>\nA portfolio is a collection of asset weights $w_1, w_2, \\dots, w_n$ that sum to 100% ($1.0$). To calculate the overall portfolio expected return $E[R_p]$, we take the <span className="text-indigo-600 font-bold">Weighted Average</span> of the individual asset expected returns:\n$E[R_p] = \\sum_{i=1}^n w_i E[R_i] = w_1 E[R_1] + w_2 E[R_2] + \\dots + w_n E[R_n]$\nWhere $w_i = \\frac{\\text{Dollars in Asset } i}{\\text{Total Portfolio Dollars}}$ and $\\sum_{i=1}^n w_i = 1.0$.',

    '<span className="text-indigo-600 font-bold">Worked Example 1 — The Three-Asset Balanced Portfolio:</span>\nAn investor has \\$100,000 to invest across three asset classes: \\$50,000 in a US Tech Stock Index ($E[R_1] = 12\\%$), \\$30,000 in an International Equity Fund ($E[R_2] = 8\\%$), and \\$20,000 in US Treasury Bonds ($E[R_3] = 4\\%$).',

    'PORTFOLIO_TABLE|Asset Class | Dollar Value | Weight (w) | Expected Return (R) | Weighted Contribution\nUS Tech Index | \\$50,000 | 50% (0.50) | 12.0% | 6.00%\nInternational Equity | \\$30,000 | 30% (0.30) | 8.0% | 2.40%\nUS Treasury Bonds | \\$20,000 | 20% (0.20) | 4.0% | 0.80%\nTotal Portfolio | \\$100,000 | 100% (1.00) | — | 9.20%',

    'The expected annual return of this balanced portfolio is exactly <span className="font-bold text-indigo-700">9.20%</span>. Notice that expected return scales linearly with weights. But as we are about to see, <span className="text-indigo-600 font-bold">Portfolio Risk does NOT scale linearly!</span>',

    '3. <span className="text-indigo-600 font-bold">Correlation ($\\rho$): The Mathematical Engine of Risk Reduction</span>\nThe total risk (volatility $\\sigma_p$) of a two-asset portfolio depends on three factors: the individual asset volatilities ($\\sigma_1, \\sigma_2$), the asset weights ($w_1, w_2$), and the <span className="text-indigo-600 font-bold">Correlation Coefficient ($\\rho_{1,2}$)</span> between the two assets:\n$\\sigma_p^2 = w_1^2 \\sigma_1^2 + w_2^2 \\sigma_2^2 + 2 w_1 w_2 \\sigma_1 \\sigma_2 \\rho_{1,2}$\n$\\sigma_p = \\sqrt{w_1^2 \\sigma_1^2 + w_2^2 \\sigma_2^2 + 2 w_1 w_2 \\sigma_1 \\sigma_2 \\rho_{1,2}}$\nThe correlation coefficient $\\rho_{1,2}$ measures how two assets move relative to each other on a scale from $-1.0$ to $+1.0$:',

    'SIDE_QUEST_CALLOUT|side_quest_variance|Variance & Covariance Algebra',

    '- <span className="text-indigo-600 font-bold">Perfect Positive Correlation ($\\rho = +1.0$)</span>: Both assets move in identical directions at identical proportions. No risk reduction occurs; portfolio standard deviation is simply the weighted average $\\sigma_p = w_1 \\sigma_1 + w_2 \\sigma_2$.\n- <span className="text-indigo-600 font-bold">Uncorrelated ($\\rho = 0.0$)</span>: Asset returns have zero linear relationship. The cross-term $2 w_1 w_2 \\sigma_1 \\sigma_2 (0) = 0$ vanishes, significantly reducing overall portfolio volatility!\n- <span className="text-indigo-600 font-bold">Perfect Negative Correlation ($\\rho = -1.0$)</span>: Assets move in exact opposite directions. By setting weights $w_1 = \\frac{\\sigma_2}{\\sigma_1 + \sigma_2}$ and $w_2 = \\frac{\\sigma_1}{\\sigma_1 + \sigma_2}$, you can completely eliminate portfolio volatility down to <span className="text-indigo-600 font-bold">EXACTLY ZERO</span> ($\\sigma_p = 0$) while retaining a positive expected return!',

    '4. <span className="text-indigo-600 font-bold">Real-World Case Study 1: Oil Companies vs. Commercial Airlines</span>\nTo see how negative operational correlation works in practice, consider the real-world relationship between crude oil producers (like ExxonMobil or Chevron) and commercial airlines (like Delta Air Lines or United Airlines).\nJet fuel accounts for <span className="text-indigo-600 font-bold">25% to 35% of an airline\'s total operating expenses</span>. When world oil prices spike due to geopolitical tension, oil producers reap record profits because they sell crude at higher prices. Conversely, airlines suffer severe margin compression because their largest input cost skyrockets.',

    'OIL_AIRLINE_TABLE|Economic Event | Crude Oil Price | Oil Stock Return | Airline Stock Return | 50/50 Portfolio Return\n1973 OPEC Embargo | Tripled (\\$3 to \\$12) | +45.0% | -35.0% | +5.0%\n1990 Gulf War Shock | Doubled (\\$17 to \\$36) | +32.0% | -28.0% | +2.0%\n2014 Oil Supply Glut | Dropped (\\$100 to \\$45) | -25.0% | +38.0% | +6.5%',

    'Notice what happens to the 50/50 portfolio: While holding only oil stocks or only airline stocks exposes an investor to terrifying $\\pm 35\\%$ swings during energy shocks, holding both together yields a smooth, positive return in every scenario! Their operational inverse dependence creates a natural negative correlation ($\\rho \\approx -0.40$), effectively insulating the investor from oil market chaos.',

    '5. <span className="text-indigo-600 font-bold">Real-World Case Study 2: Stocks vs. Treasury Bonds (2008 Crisis vs. 2022 Inflation)</span>\nFor decades, the bedrock of institutional asset allocation has been the classic <span className="text-indigo-600 font-bold">60/40 Portfolio</span> (60% Equities / 40% High-Grade Treasury Bonds). Why do stocks and bonds complement each other so well?',

    '- <span className="text-indigo-600 font-bold">The 2008 Global Financial Crisis (Flight to Quality)</span>: When Lehman Brothers collapsed in September 2008, global stock markets suffered a brutal panic. The S&P 500 plunged <span className="font-bold text-rose-600">-37.0%</span> for the year. However, terrified investors fled risk assets and piled into safe US 10-Year Treasury Bonds, pushing bond prices up <span className="font-bold text-emerald-600">+20.1%</span> (correlation $\\rho \\approx -0.50$). An investor holding a 60/40 portfolio lost only ~14% during the worst panic since the Great Depression—preserving capital and allowing them to rebalance into cheap stocks at generational lows in March 2009!',

    '- <span className="text-indigo-600 font-bold">The 2022 Inflation Shock (When Correlation Breaks Down)</span>: In 2022, CPI inflation surged to a 40-year high of 9.1%. The Federal Reserve responded by aggressively raising interest rates from 0% to 5.25%. High interest rates hurt equities (by increasing discount rates $r$) AND hurt fixed-rate bonds (because bond prices fall when market interest rates rise). In 2022, the S&P 500 fell <span className="font-bold text-rose-600">-18.1%</span> and 10-Year Treasury Bonds fell <span className="font-bold text-rose-600">-13.0%</span> (correlation flipped positive to $\\rho \\approx +0.70$).\nThis historical breakdown taught modern investors a critical lesson: <span className="text-indigo-600 font-bold">Correlation is not a static constant—it shifts across economic regimes!</span> To survive inflation shocks, portfolios require multi-asset expansion including commodities, real estate (REITs), Treasury Inflation-Protected Securities (TIPS), and international assets.',

    '6. <span className="text-indigo-600 font-bold">Real-World Case Study 3: The Lost Decades of Japan & Home Country Bias</span>\nBehavioral finance shows that most individual investors fall into the trap of <span className="text-indigo-600 font-bold">Home Country Bias</span>—investing 80% or more of their portfolio in domestic companies they recognize locally (e.g., American investors holding 90% US stocks, or Japanese investors holding 90% Japanese stocks).',

    'Consider the cautionary tale of Japan\'s stock market bubble: In December 1989, the Nikkei 225 index touched an all-time peak of 38,915 points. When the massive real estate and financial asset bubble burst in 1990, Japanese equities entered a grueling 30-year secular bear market. It took <span className="text-indigo-600 font-bold">34 years (until February 2024!)</span> for the Nikkei 225 index to finally surpass its 1989 high!',

    'A Japanese investor who placed 100% of their wealth in domestic Japanese equities in 1989 experienced zero net capital appreciation over three decades. However, a Japanese investor who diversified globally—allocating 50% to international markets (US, Europe, emerging economies)—benefited from the global technology expansion and multiplied their wealth several-fold over that same period. International diversification protects you against single-country demographic and economic stagnations.',

    '7. <span className="text-indigo-600 font-bold">Systematic vs. Unsystematic Risk — Why 30 Stocks Kill Specific Risk</span>\nModern Portfolio Theory breaks total asset risk into two distinct mathematical components:\n$\\text{Total Risk (Variance)} = \\text{Systematic Risk (Market)} + \\text{Unsystematic Risk (Company-Specific)}$',

    '- <span className="text-indigo-600 font-bold">Unsystematic (Specific / Idiosyncratic) Risk</span>: Risk unique to an individual firm—such as a CEO resigning, a factory fire, a failed FDA clinical drug trial, or a localized strike. Because these events occur independently across companies, unsystematic risk can be <span className="text-indigo-600 font-bold">completely eliminated</span> simply by holding a basket of 20 to 30 uncorrelated stocks!\n- <span className="text-indigo-600 font-bold">Systematic (Market) Risk</span>: Macroeconomic risk that affects the entire business environment—such as global interest rate changes, recessions, geopolitical conflicts, or broad inflation shocks. Systematic risk <span className="text-indigo-600 font-bold">cannot</span> be diversified away within a single asset class because all companies share the same macroeconomic ocean.',

    'STOCKS_RISK_TABLE|Number of Stocks in Portfolio (N) | Unsystematic Risk Remaining | Systematic Risk Remaining | Total Portfolio Volatility\n1 Stock | 100% | 100% | 35.0% (High Agony)\n5 Stocks | 20% | 100% | 22.1%\n15 Stocks | 6.7% | 100% | 17.5%\n30+ Stocks | < 3% | 100% | 15.2% (Pure Market Risk)',

    'Holding fewer than 20 stocks means taking on massive unsystematic risk for <span className="text-indigo-600 font-bold">zero extra expected return</span>. The market does not reward you for taking risks that you could have easily diversified away for free!',

    '8. <span className="text-indigo-600 font-bold">Beta ($\\beta$): Measuring Market Volatility Sensitivity</span>\nWhile standard deviation $\\sigma$ measures an asset\'s standalone volatility, <span className="text-indigo-600 font-bold">Beta ($\\beta$)</span> measures how strongly an individual stock moves in tandem with the broader benchmark market (like the S&P 500):\n$\\beta_i = \\frac{\\text{Cov}(R_i, R_m)}{\\text{Var}(R_m)}$',

    '- <span className="text-indigo-600 font-bold">$\\beta = 1.0$</span>: The stock moves in exact harmony with the market. If the S&P 500 rises +10%, the stock is expected to rise +10%.\n- <span className="text-indigo-600 font-bold">$\\beta = 1.8$ (High-Beta Growth Stock)</span>: Extremely sensitive to market waves (e.g., Tesla or Nvidia). If the market jumps +10%, the stock skyrockets +18%. But if the market drops -10%, the stock crashes -18%!\n- <span className="text-indigo-600 font-bold">$\\beta = 0.5$ (Low-Beta Defensive Stock)</span>: Resistant to market shocks (e.g., Procter & Gamble, Walmart, or Utility companies). If the market collapses -20%, the stock drops only -10%.\n- <span className="text-indigo-600 font-bold">$\\beta \\approx 0.0$ (Zero Beta)</span>: Asset returns are completely independent of stock market swings (e.g., Cash, Gold, short-term Treasury bills).',

    '9. <span className="text-indigo-600 font-bold">The Sharpe Ratio: Grading Return per Unit of Agony</span>\nSuppose two fund managers both generated a +12% annual return last year. Manager A invested in a calm, diversified multi-asset index with an annual volatility of 8%. Manager B invested in a hyper-volatile, leveraged tech fund with an annual volatility of 35%. Which manager actually performed better?\nIn 1966, Nobel laureate William F. Sharpe introduced the <span className="text-indigo-600 font-bold">Sharpe Ratio</span> to grade an investment\'s risk-adjusted efficiency:\n$\\text{Sharpe Ratio} = \\frac{E[R_p] - R_f}{\\sigma_p}$\nWhere $R_f$ is the Risk-Free Rate (e.g., 4% US Treasury bill rate). The numerator represents "Excess Return" over cash, while the denominator represents "Volatility Risk Stress."',

    'SHARPE_TABLE|Portfolio Strategy | Expected Return | Volatility (\\sigma) | Excess Return (R - R_f) | Sharpe Score\nSpeculative Crypto Fund | 25.0% | 40.0% | 21.0% | 0.525\nS&P 500 Stock Index | 10.0% | 15.0% | 6.0% | 0.400\nOptimized Multi-Asset Blend | 12.0% | 12.0% | 8.0% | 0.667 (Winner!)',

    'The Optimized Multi-Asset Blend is the undisputed winner! Even though the Speculative Crypto Fund had a higher raw return (25%), its extreme 40% volatility meant investors endured far more stomach-churning risk per unit of profit. Professional institutional investors live and die by the Sharpe Ratio.',

    '10. <span className="text-indigo-600 font-bold">The Markowitz Efficient Frontier & Capital Allocation Line</span>\nIf you plot thousands of random asset combinations on a graph with Risk ($\\sigma$) on the horizontal x-axis and Expected Return ($E[R]$) on the vertical y-axis, something beautiful emerges: the top curved boundary of possible portfolios forms an parabolic arch known as the <span className="text-indigo-600 font-bold">Markowitz Efficient Frontier</span>.',

    '- <span className="text-indigo-600 font-bold">Efficient Portfolios</span>: Any portfolio lying directly on the upper curve is "Efficient"—meaning it offers the absolute highest possible expected return for that specific level of risk.\n- <span className="text-indigo-600 font-bold">Inefficient Portfolios</span>: Any portfolio lying below the frontier curve is suboptimal—you are taking on unnecessary volatility without getting paid for it.\n- <span className="text-indigo-600 font-bold">The Tangency Portfolio</span>: By drawing a straight line from the Risk-Free Rate $R_f$ on the y-axis to where it touches the Efficient Frontier curve tangentially (the <span className="text-indigo-600 font-bold">Capital Allocation Line / CAL</span>), we find the single portfolio combination that maximizes the Sharpe Ratio across all possible assets!',

    '11. <span className="text-indigo-600 font-bold">Practical Action Plan for High Schoolers & Families</span>\nHow do you apply Modern Portfolio Theory to your personal finances today?\n- <span className="text-indigo-600 font-bold">Embrace Broad Low-Cost Index Funds</span>: Buying a total stock market index fund (like an S&P 500 or Total World stock ETF) instantly gives you ownership in thousands of companies, eliminating unsystematic risk for a fraction of a percent in management fees.\n- <span className="text-indigo-600 font-bold">Diversify Across Asset Classes</span>: Don\'t stop at US tech stocks. Include international equities, fixed-income bonds, real estate, and short-term cash reserves.\n- <span className="text-indigo-600 font-bold">Rebalance Annually</span>: When one asset class surges (e.g., tech stocks after a bull run), its weight in your portfolio grows beyond your target. Rebalancing means systematically selling a portion of your high-flying assets to buy undervalued asset classes—forcing you to mathematically "buy low and sell high!"'
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
      explanation: 'The expected portfolio return is the weighted average: $E[R_p] = w_1 \\times R_1 + w_2 \\times R_2$. Substituing our values: $E[R_p] = (0.60 \\times 12\\%) + (0.40 \\times 5\\%) = 7.2\\% + 2.0\\% = 9.2\\%$.',
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
