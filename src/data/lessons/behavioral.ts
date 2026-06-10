import { LessonContent } from '../../types';

export const behavioral: LessonContent = {
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
    'Perfect **Bayesian agents** can trigger information cascades where public, sequential observations cause subsequent traders to disregard their private information entirely, locking onto incorrect pricing cascades. This halts the information aggregation fundamental to market efficiency.',
    '**Prospect Theory** replaces traditional symmetric utility with a kinked value function that overweights losses by roughly $2.25$ times over gains. This creates the **disposition effect** (locking winners, riding losers) which slows news incorporation and drives momentum. Finally, trend-following behavior alters the drift of asset paths, establishing unstable positive-feedback dynamical systems. Combined with margin-call limits to arbitrage, bubbles can stay irrational far longer than models forecast.'
  ],
  quizzes: [
    {
      id: 'b1',
      question: "Under the Bikhchandani–Hirshleifer–Welch sequential herding model with signal accuracy $p = 0.7$, what is the exact probability of perfect Bayesian agents locking into a permanently wrong cascade?",
      options: [
        'Approximately 13.04%',
        'Exactly 9.00%',
        '0.00% by the law of large numbers',
        'Approximately 17.65%'
      ],
      correctIndex: 0,
      explanation: 'The analytical probability that a wrong cascade forms is given by $(1-p)^2 / (2(p^2 - p + 1))$. For $p = 0.7$, $(1-0.7)^2 / (2(0.7^2 - 0.7 + 1)) = 0.09 / (2(0.49 - 0.7 + 1)) = 0.09 / (2 \\times 0.79) = 0.09 / 1.58 \\approx 5.696\\%$ for wrong cascade starting at the first possible stage, and sum of probabilities of locking into a wrong cascade over time is given precisely by $(1-p)^2 / (2(p^2-p+1))$, which is $13.04\\%$. Sequential voting halts the release of private signals!',
      hint: 'Evaluate the cascade equation $(1-p)^2 / (2 \\times (p^2 - p + 1))$ at $p = 0.7$.'
    },
    {
      id: 'b2',
      question: 'If stock returns follow an $AR(1)$ process $r_t = \\mu + \\varphi r_{t-1} + \\varepsilon_t$ with $\\varphi > 0$, how does the expected trade payoff ($E[r_{t+1} \\times r_t]$) behave relative to the random walk null hypothesis?',
      options: [
        'It is strictly zero',
        'It is proportional to $\\varphi \\times \\text{Var}(r_t)$',
        'It is negative due to reversal',
        'It is independent of asset variance'
      ],
      correctIndex: 1,
      explanation: 'For an $AR(1)$ process, the expected conditional product is $E[r_t \\times r_{t+1}] = \\text{Cov}(r_t, r_{t+1}) + E[r_t]E[r_{t+1}] = \\varphi \\times \\text{Var}(r_t) + \\mu^2$. Profitability of momentum trading is therefore a direct functional measurement of the non-zero autocorrelation $\\varphi$ in the historical return series.',
      hint: 'Substitute the $AR(1)$ return equation into the expectation calculation and examine the covariance coefficient.'
    },
    {
      id: 'b3',
      question: 'Given spot commodity $S = \\$80$, $r = 5\\%$ per annum, storage cost $u = 2\\%$ per annum, and observed 1-year future $F = \\$95$. What is the implied annual convenience yield ($y$) under the cost-of-carry model $F = S \\times e^{(r+u-y)T}$?',
      options: [
        '$y \\approx -10.18\\%$',
        '$y \\approx +10.18\\%$',
        '$y \\approx 3.25\\%$',
        '$y \\approx 7.00\\%$'
      ],
      correctIndex: 0,
      explanation: 'We have $F = S \\times e^{(r+u-y)T}$ with $T = 1$. Therefore, $F/S = e^{r+u-y}$. Taking logs: $\\ln(F/S) = r+u-y$, which means $y = r+u - \\ln(F/S)$. Substituting: $y = 0.05 + 0.02 - \\ln(95/80) = 0.07 - \\ln(1.1875) \\approx 0.07 - 0.17185 = -0.10185$ (or $-10.18\\%$). A negative convenience yield marks severe contango, where storage constraints make futures expensive relative to spot.',
      hint: 'Solve $F/S = e^{(0.05 + 0.02 - y)}$ for $y$ by taking the natural log of both sides.'
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
};
