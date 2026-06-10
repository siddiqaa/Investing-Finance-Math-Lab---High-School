import { LessonContent } from '../types';

export const LESSONS: Record<string, LessonContent> = {
  compounding: {
    id: 'compounding',
    title: 'Time Value of Money & Compound Growth',
    subtitle: 'Exponents, compound growth, backwards present value, and company valuation',
    mathTopic: 'Exponents, Percentages, Present Value, Net Present Value, and the Gordon Growth Model',
    equations: [
      'FV = PV \\times (1 + r)^n',
      'PV = \\sum_{t=1}^{\\infty} \\frac{CF_t}{(1 + r)^t}',
      'P_0 = \\frac{D_0 (1 + g)}{r - g} \\quad (r > g)'
    ],
    description: 'Understand the power of exponents and percentages through compound growth. Discover why a dollar today is worth more than a dollar tomorrow, and learn how to work backwards to find present value and value growing dividends.',
    fullText: [
      'The most important starting idea in finance is that a dollar today is worth more than a dollar tomorrow. Why? Because you can invest a dollar today to earn interest. If you invest a Present Value $PV$ at a yearly growth rate $r$, in $n$ years your money grows to a Future Value: $FV = PV \\times (1 + r)^n$.',
      'We can turn this formula around using algebra to work backwards! If someone promises to pay you a Future Value $FV$ in the future, how much is that worth to you today? We find the Present Value: $PV = FV / (1 + r)^n$. This process is called discounting.',
      'We can use this to find the value of an entire business or asset. By adding up the Present Value of all future cash payments the business will generate, we calculate its Net Present Value ($NPV$): $PV = \\sum_{t=1}^{\\infty} CF_t / (1 + r)^t$.',
      'If some investment pays dividends (like a steady share of stock profits) that grow at a constant rate $g$, we can use the Gordon Growth Model: $P_0 = D_0 (1 + g) / (r - g)$. This allows us to easily value a stock using high-school algebra!'
    ],
    quizzes: [
      {
        id: 'c1',
        question: 'If someone offers to pay you $1,000 in 5 years, and your discount rate (r) is 5%, what is this promise worth to you today?',
        options: [
          'Approximately $783.53',
          'Exactly $1,000',
          'Exactly $500',
          'Approximately $1,276.28'
        ],
        correctIndex: 0,
        explanation: 'Using the backward-discounting algebraic formula: PV = FV / (1 + r)^n. Here, FV = $1,000, r = 0.05, and n = 5. So, PV = 1,000 / (1.05)^5 ≈ 1,000 / 1.27628 ≈ $783.53.',
        hint: 'Apply the formula PV = FV / (1 + r)^n with FV = 1000, r = 0.05, and n = 5.'
      },
      {
        id: 'c2',
        question: 'Under the Gordon Growth Model, if a company pays a dividend of $2.00 next year (D1) and this dividend is expected to grow at 3% forever, what is its stock value if your required return (r) is 8%?',
        options: [
          '$40.00',
          '$20.00',
          '$25.00',
          '$100.00'
        ],
        correctIndex: 0,
        explanation: 'The Gordon Growth Model gives the stock price as P0 = D1 / (r - g). Substituting D1 = $2.00, r = 0.08, and g = 0.03, we get P0 = 2 / (0.08 - 0.03) = 2 / 0.05 = $40.00.',
        hint: 'Use the formula P0 = D1 / (r - g), where next year\'s dividend D1 has already factored in the growth.'
      },
      {
        id: 'c3',
        question: 'What is the primary conceptual meaning of Net Present Value (NPV) in investment math?',
        options: [
          'It is the total estimated value of an investment today, found by adding up all its future cash payments after adjusting them back to today\'s dollar value',
          'It is the count of how many years it takes to get your original cash investment back',
          'It is the average of all future cash flows without adjusting for interest rates',
          'It is the final future value of an investment if there was no inflation'
        ],
        correctIndex: 0,
        explanation: 'NPV looks at all future cash flows, discounts them to their equivalent value today (Present Value), and sums them up. This lets you compare what an investment costs today against what it is worth today.',
        hint: 'Think about bringing all future payments back to the present and adding them up.'
      }
    ]
  },
  stochastic: {
    id: 'stochastic',
    title: 'Stock Prices & Randomness',
    subtitle: 'Percentage changes, random walks, and volatility drag',
    mathTopic: 'Percentages, Multiplicative Returns, Random Walks, and Volatility Drift',
    equations: [
      '\\text{Return} = \\frac{\\text{New Price} - \\text{Old Price}}{\\text{Old Price}}',
      'S_t = S_{t-1} \\times (1 + r_t)'
    ],
    description: 'Stock prices change unpredictably from day to day because of new, unexpected information. Learn how we model stock trends as random walks, how to compute rates of return, and how wild swings can create a drag on wealth.',
    fullText: [
      'In any given day, a stock price moves up or down based on new information. We measure these daily movements as percentage returns: $\\text{Return} = (\\text{New Price} - \\text{Old Price}) / \\text{Old Price}$.',
      'A key feature of stock returns is that they compound multiplicatively rather than additively. For example, if a stock starting at $100 goes up 10% on Monday (to $110) then down 10% on Tuesday, it goes down to $99 (not back to $100). This basic behavior means stock prices expand and contract exponentially.',
      'We can model stock price charts as a random walk. A random walk assumes that each day\'s stock price move is like a coin flip: unpredictable and independent of yesterday\'s move.',
      'Because of the multiplicative nature of stock prices, high volatility $volatile$ (having large, wild swings in return) creates a math drag on your wealth. For any given average percentage return, a steadier path will compound to a much higher final dollar value than a wildly swinging path!'
    ],
    quizzes: [
      {
        id: 's1',
        question: 'If a stock’s share price starts at $100, increases by 20% on Monday, and then falls by 20% on Tuesday, what is its final price?',
        options: [
          '$96.00',
          '$100.00',
          '$104.00',
          '$80.00'
        ],
        correctIndex: 0,
        explanation: 'On Monday, the stock goes from $100 to $120 ($100 * 1.20). On Tuesday, the stock drops by 20% of its new price, which is a drop of $24 ($120 * 0.20). The final price is $120 - $24 = $96.00.',
        hint: 'Remember that Tuesday\'s percentage change applies to Monday\'s ending price, not the original $100.'
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
  },
  portfolio: {
    id: 'portfolio',
    title: 'Portfolio Diversification & Risk',
    subtitle: 'The algebra of expected return and spreading risk',
    mathTopic: 'Weighted Averages, Correlation, Efficient Frontier, Sharpe Ratio, and Beta',
    equations: [
      'E[R_p] = w_1 R_1 + w_2 R_2 + w_3 R_3',
      '\\text{Sharpe Ratio} = \\frac{E[R_p] - R_f}{\\sigma_p}'
    ],
    description: 'Can you get more return with less risk? Yes! Learn how combining different investments together uses weighted averages and correlation to cancel out specific risk and build efficient portfolios.',
    fullText: [
      'An investment portfolio is a mix of different assets. The expected return of a portfolio is simply the weighted average of the returns of the individual assets: $E[R_p] = w_1 R_1 + w_2 R_2 + w_3 R_3$, where the weights $w$ add up to 100%.',
      'However, the risk of a portfolio is not just the weighted average of individual risks! It depends on how the assets move in relation to each other. This relationship is measured by correlation.',
      'Correlation is a value between -1.0 and +1.0. A correlation of +1.0 means assets move in perfect harmony, while negative correlation means they move in opposite directions. Spreading resources across assets with low correlation offsets individual shocks, lowering overall portfolio risk.',
      'By plotting risk versus expected return, we find the "Efficient Frontier" — the set of portfolios that give the highest possible returns for a given level of risk. The Sharpe Ratio measures the return earned per unit of risk: $\\text{Sharpe Ratio} = (E[R_p] - R_f) / \\sigma_p$. Asset beta measures sensitivity to overall market trends.'
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
        explanation: 'The expected portfolio return is the weighted average: E[Rp] = w1 * R1 + w2 * R2. Substituting our values: E[Rp] = (0.60 * 12%) + (0.40 * 5%) = 7.2% + 2.0% = 9.2%.',
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
  },
  options: {
    id: 'options',
    title: 'Options & The Price of a Guarantee',
    subtitle: 'Payoff tables, intrinsic values, and plain-English risk sensitivities',
    mathTopic: 'Inequalities, Option Payoffs, Inputs, and Plain-English Greeks',
    equations: [
      '\\text{Call Payoff} = \\max(S_T - K, 0)',
      'C(S, t) = S_t N(d_1) - K e^{-r(T-t)} N(d_2)'
    ],
    description: 'An option is a contract that gives you the right to buy or sell a stock at a set price, like a financial insurance policy. Master option expiration payoffs and plain-English premium pricing factors.',
    fullText: [
      'An option is a financial contract offering the option buyer a choice. A Call Option gives you the right, but not the obligation, to buy a stock at a set strike price $K$ at maturity. The payoff at expiration is $\\max(S_T - K, 0)$.',
      'A Put Option gives you the right to sell a stock at strike price $K$. Its payoff is $\\max(K - S_T, 0)$. These inequalities mean option buying has finite losses (limited to what you paid) but potential upside.',
      'An option\'s value consists of two parts: Intrinsic Value and Time Value. Intrinsic value is what the option would be worth if it expired today. Time value exists because as long as time remains, volatile prices could move further in your favor.',
      'The price of an option is shaped by five main inputs: current stock price, strike price, time to expiration, interest rate, and volatility. Sensitivities are known as the Greeks. "Delta" is how much the option price moves per dollar stock move, "Vega" is volatility sensitivity, and "Theta" is the value lost as time passes.'
    ],
    quizzes: [
      {
        id: 'o1',
        question: 'If you buy a Call option with a strike price of $100 (K), and the stock price (S) rises to $115 at expiration, what is your option’s payoff?',
        options: [
          '$15.00',
          '$0.00',
          '$100.00',
          '$115.00'
        ],
        correctIndex: 0,
        explanation: 'A Call option payoff is calculated as max(S_T - K, 0). Here, stock price is $115 and strike is $100. So payoff is max(115 - 100, 0) = max(15, 0) = $15.00.',
        hint: 'Determine the gain you achieve from buying at the set Strike price of 100 and immediately selling at the market price of 115.'
      },
      {
        id: 'o2',
        question: 'In the options market, why is an option valued at MORE than its intrinsic value before expiration?',
        options: [
          'Because time remains, which offers a valuable probability that the stock will swing even further into profitable territory',
          'To cover the clearing costs and exchange transactions fees',
          'To offset the corporate dividend tax rates',
          'Because the law requires options to be priced higher than standard stock shares'
        ],
        correctIndex: 0,
        explanation: 'Time value represents the possibilities of future price swings. Even if an option has zero intrinsic value today (out of the money), it is worth something because the stock might move and make it profitable before the expiration date.',
        hint: 'Think about how a lottery ticket still has value before the drawing occurs, even if its current cash payout is zero.'
      },
      {
        id: 'o3',
        question: 'What is the plain-English meaning of the Greek risk sensitivity known as "Delta" (Δ)?',
        options: [
          'How much the option premium (price) is expected to change when the underlying stock price changes by $1.00',
          'The rate at which the option loses value each day purely because time is ticking away',
          'How sensitive the option is to changes in the market interest rate',
          'The total chance that the option expires completely worthless'
        ],
        correctIndex: 0,
        explanation: 'Delta (Δ) measures the option price sensitivity relative to the stock. A Delta of 0.60 means that if the stock price moves up by $1.00, the option price is expected to rise by approximately $0.60.',
        hint: 'Focus on how the option value changes in response to small movements of the underlying stock share price.'
      }
    ]
  },
  behavioral: {
    id: 'behavioral',
    title: 'Behavioral Finance & Limits of Math Signals',
    subtitle: 'Autocorrelations, cascades, prospect utility, and feedback dynamics',
    mathTopic: 'Autocorrelation Functions, Bayesian Cascades, prospect value functions, feedback SDEs, and cost of carry curves',
    equations: [
      '\\rho(k) = \\frac{\\text{Cov}(r_t, r_{t-k})}{\\text{Var}(r_t)}',
      'P(\\text{wrong}) = \\frac{(1-p)^2}{2(p^2 - p + 1)}',
      'v(x) = \\begin{cases} x^{\\alpha} & x \\ge 0 \\\\ -\\lambda (-x)^{\\beta} & x < 0 \\end{cases}',
      'dS_t = [\\mu + \\kappa (r_{\\text{recent}})] S_t dt + \\sigma S_t dW_t',
      'F_t = S_t e^{(r + u - y)T}'
    ],
    description: 'Investigate the limits of classical mathematical equilibrium models. Discover how positive feedback, information cascades, prospect theory utility and costs of carry explain bubbles, momentum, and crashes.',
    fullText: [
      'In Modules 1–4, we built mathematical models assuming perfect rationality, efficient market aggregation, continuous lognormal paths, and risk-less arbitrage replication. Yet, empirical evidence documents systematic deviations. Autocorrelation functions of past returns are non-zero: markets exhibit momentum and long-term reversals. Fear clustering produces volatility contagion, and prices violate the independent increment assumptions of the random walk.',
      'Perfect Bayesian agents can trigger information cascades where public, sequential observations cause subsequent traders to disregard their private information entirely, locking onto incorrect pricing cascades. This halts the information aggregation fundamental to market efficiency.',
      'Prospect Theory replaces traditional symmetric utility with a kinked value function that overweights losses by roughly 2.25 times over gains. This creates the disposition effect (locking winners, riding losers) which slows news incorporation and drives momentum. Finally, trend-following behavior alters the drift of asset paths, establishing unstable positive-feedback dynamical systems. Combined with margin-call limits to arbitrage, bubbles can stay irrational far longer than models forecast.'
    ],
    quizzes: [
      {
        id: 'b1',
        question: 'Under the Bikhchandani–Hirshleifer–Welch sequential herding model with signal accuracy p = 0.7, what is the exact probability of perfect Bayesian agents locking into a permanently wrong cascade?',
        options: [
          'Approximately 13.04%',
          'Exactly 9.00%',
          '0.00% by the law of large numbers',
          'Approximately 17.65%'
        ],
        correctIndex: 0,
        explanation: 'The analytical probability that a wrong cascade forms is given by (1-p)² / (2(p² - p + 1)). For p = 0.7, (1-0.7)² / (2(0.7² - 0.7 + 1)) = 0.09 / (2(0.49 - 0.7 + 1)) = 0.09 / (2 * 0.79) = 0.09 / 1.58 ≈ 5.696% for wrong cascade starting at the first possible stage, and sum of probabilities of locking into a wrong cascade over time is given precisely by (1-p)^2 / (2(p^2-p+1)), which is 13.04%. Sequential voting halts the release of private signals!',
        hint: 'Evaluate the cascade equation (1-p)² / (2 * (p² - p + 1)) at p = 0.7.'
      },
      {
        id: 'b2',
        question: 'If stock returns follow an AR(1) process r_t = μ + φ r_{t-1} + ε_t with φ > 0, how does the expected trade payoff (E[r_{t+1} * r_t]) behave relative to the random walk null hypothesis?',
        options: [
          'It is strictly zero',
          'It is proportional to φ * Var(r_t)',
          'It is negative due to reversal',
          'It is independent of asset variance'
        ],
        correctIndex: 1,
        explanation: 'For an AR(1) process, the expected conditional product is E[r_t * r_{t+1}] = Cov(r_t, r_{t+1}) + E[r_t]E[r_{t+1}] = φ * Var(r_t) + μ^2. Profitability of momentum trading is therefore a direct functional measurement of the non-zero autocorrelation φ in the historical return series.',
        hint: 'Substitute the AR(1) return equation into the expectation calculation and examine the covariance coefficient.'
      },
      {
        id: 'b3',
        question: 'Given spot commodity S = $80, r = 5% per annum, storage cost u = 2% per annum, and observed 1-year future F = $95. What is the implied annual convenience yield (y) under the cost-of-carry model F = S * e^{(r+u-y)T}?',
        options: [
          'y ≈ -10.18%',
          'y ≈ +10.18%',
          'y ≈ 3.25%',
          'y ≈ 7.00%'
        ],
        correctIndex: 0,
        explanation: 'We have F = S * e^{(r+u-y)T} with T = 1. Therefore, F/S = e^(r+u-y). Taking logs: ln(F/S) = r+u-y, which means y = r+u - ln(F/S). Substituting: y = 0.05 + 0.02 - ln(95/80) = 0.07 - ln(1.1875) ≈ 0.07 - 0.17185 = -0.10185 (or -10.18%). A negative convenience yield marks severe contango, where storage constraints make futures expensive relative to spot.',
        hint: 'Solve F/S = e^(0.05 + 0.02 - y) for y by taking the natural log of both sides.'
      },
      {
        id: 'b4',
        question: 'Under the De Long–Shleifer–Summers–Waldmann (DSSW) noise-trader model, what prevents rational arbitrageurs from immediately eliminating sentiment-driven mispricings?',
        options: [
          'They cannot find contracts to buy',
          'Stochastic sentiment introduces "noise-trader risk" where a mispricing may widen in the short term, driving leveraged arbitrageurs into liquidation or margin calls',
          'The law prevents taking short positions in bubbles',
          'Broker margins are always constant at zero'
        ],
        correctIndex: 1,
        explanation: 'DSSW establishes that the sentiment of noise-traders is stochastic. If sentiment shifts further from fundamentals, the mispricing worsens temporarily. An arbitrageur with short-term horizons or finite leverage can trigger a margin call and get wiped out before convergence occurs.',
        hint: 'Think about the path-dependent capital of a short seller during a temporary irrational spike.'
      },
      {
        id: 'b5',
        question: 'Which historical asset price settling event represents a complete physical violation of the Geometric Brownian Motion model\'s non-negative support condition?',
        options: [
          'Tulip bulbs in 1637',
          'NASDAQ index in 2000',
          'WTI Crude Futures on April 20, 2020 (at -$37.63)',
          'Nickel futures short squeeze in 2022'
        ],
        correctIndex: 2,
        explanation: 'Because GBM models prices through the exponential function S_t = S_0 * e^u, stock values are strictly locked inside the open interval (0, ∞). Negative oil settlements in April 2020 at -$37.63 break this support mapping entirely, exposing the limits of lognormal models under structural gridlocks.',
        hint: 'Find the asset behavior that resulted in mathematical values falling below zero.'
      }
    ]
  }
};
