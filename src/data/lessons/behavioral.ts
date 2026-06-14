import { LessonContent } from '../../types';

export const behavioral: LessonContent = {
  id: 'behavioral',
  title: 'Behavioral Finance & Limits of Math Signals',
  subtitle: 'When the Crowd Overrules the Math',
  mathTopic: 'Limits of Rational Equilibrium in Real-World Trading',
  equations: [
    '\\rho(k) = \\frac{\\text{Cov}(r_t, r_{t-k})}{\\text{Var}(r_t)}',
    'P(\\text{wrong}) = \\frac{(1-p)^2}{2(p^2 - p + 1)}',
    'v(x) = \\begin{cases} x^{\\alpha} & x \\ge 0 \\\\ -\\lambda (-x)^{\\beta} & x < 0 \\end{cases}'
  ],
  description: 'Investigate the limits of classical mathematical equilibrium models. Discover how positive feedback, information cascades, prospect theory utility and costs of carry explain bubbles, momentum, and crashes.',
  introduction: `In the first four units of this lab, we have treated the stock market like a giant clock—a complex machine made of gears called interest rates, probabilities, and cash flows. We've used algebra to predict how those gears should move. If we know the growth rate, we can find the price. If we know the volatility, we can find the diversification. It is a world of logic, where the "Rational Investor" sits with a calculator and always makes the right decision. But if you have ever seen a video of a crowd rushing into a store on Black Friday, or a stadium of people doing "The Wave," you know that humans do not always act like logical gears in a clock. Sometimes, the clock explodes because everyone decides to pull the same lever at once. This is the domain of **Behavioral Finance**.

The traditional math of finance assumes that if a stock is worth \\$100 and the price drops to \\$80, everyone will see it as a "Sale" and start buying. This buying should push the price back up to \\$100. This is called "Mean Reversion," and it is the backbone of almost all financial models. But in the real world, when a stock drops from \\$100 to \\$80, people don't always see a sale; they see a **Fire**. Instead of buying, they panic. They think, "If it dropped \\$20, it must be going to zero!" They sell their shares, pushing the price down to \\$60, which causes more people to panic, pushing it to \\$40. In these moments, the math is still screaming that the stock is worth \\$100, but the crowd is screaming louder. The crowd creates its own reality, and for a short time, that reality is the only one that matters.

This is what we call an **Information Cascade**. Imagine you are walking through a city and you see one person looking up at a building. You probably ignore them. If you see five people looking up, you might glance up too. If you see a hundred people pointing and screaming at the top of the building, you don't stop to calculate the probability of a fire—you start running. In the markets, this "Herding" behavior creates bubbles and crashes. People stop asking "What is this worth?" and start asking "What will the person behind me pay for it tomorrow?" This is the "Greater Fool Theory"—you don't need the math to be right as long as there is someone even more excited than you ready to buy your shares. Bubbles are what happen when the collective imagination of a crowd outruns the reality of the mathematical gears.

Psychologists have also discovered a strange glitch in our brains called **Prospect Theory**. They've proven that the pain of losing \\$100 is about twice as strong as the joy of winning \\$100. This tiny bias destroys rational math. It's why we hold onto our losing stocks for years, hoping they'll "get back to even" so we don't have to admit we were wrong, while we sell our winning stocks the moment they go up a little bit to "lock in" the good feeling. We are hard-wired to be bad at the math of probability because our ancestors survived by being afraid of losses, not by maximizing their portfolios.

In this final unit, we are going to look at the math of "Irrationality." We will study the "Limit of Arbitrage"—the terrifying reality that you can be 100% mathematically correct that a bubble exists, but if the crowd stays crazy for longer than you have money, you will still go bankrupt. We are going to learn that the ultimate investor needs two things: a calculator to find the truth, and the emotional discipline to survive the crowd. We will move beyond the clean lines of the "Slow Market" and enter the messy, human, and often profitable world of the "Fast Market." This is where the laboratory of math meets the laboratory of the human soul. By understanding our own biases, we can learn to use the math as a compass even when the world around us has lost its way.`,
  fullText: [
    '**The Hook: The Crowd vs. The Calculator**\nImagine you live in a town where every morning, everyone gathers in the square to vote on what a single loaf of bread is worth. Usually, the townspeople are reasonable, checking the price of wheat and flour. But one morning, a rumor spreads that bread causes eternal youth. Suddenly, people are trading their houses for a sourdough boule. The math of wheat hasn\'t changed — but the "Price" has entered a galaxy of its own. This is Behavioral Finance.',
    '1. **The Central Tension**\nClassical finance assumes that prices are set by individuals methodically doing the math—discounting cash flows and weighing risk. The uncomfortable truth is that prices are set by whoever shows up to trade that day. On many days, the marginal buyer is not running a math model; they are chasing a trend, panicking out of a loss, or buying simply because their neighbors are.',
    '**The Two Market Clocks:**\n- **The Slow Market**: Governed by cash flows and math. **It always wins eventually.**\n- **The Fast Market**: Driven by momentum and fear. **It usually wins today.**',
    '2. **Momentum: The Anomaly That Refuses to Die**\nThe "Random Walk" model says yesterday\'s price move tells you nothing about tomorrow. But in the real world, **Momentum** is real. Stocks that have been going up tend to keep going up. Why? Because information doesn\'t hit a market like a lightning bolt; it seeps in like a leak. By the time the "Rational" crowd has finished their math, the "Impatience" crowd has already started a trend.',
    '3. **Prospect Theory: Why Losses Hurt Twice as Much**\nPsychologists have proven that losing \\$100 feels twice as "painful" as winning \\$100 feels "good." This single fact destroys rational portfolios:\n- **The Disposition Effect**: We sell our "winners" too early (to lock in the good feeling) and hold our "losers" too long (to avoid the pain of admitting defeat).\n- **The Lottery Preference**: We overpay for tiny chances at massive payouts (Penny stocks, out-of-the-money options).',
    '4. **Herding and Information Cascades**\nHerding isn\'t always "stupid." If you see 100 people running out of a building, you don\'t stop to calculate the structural integrity of the walls — you run too! In markets, when everyone starts selling, it creates a **Cascade**. Your own private research might say the stock is 100% fine, but the "Social Signal" of a crash is so loud it drowns out your data.',
    '5. **Bubbles and the "Greater Fool" Theory**\nA bubble occurs when we stop asking "What is this worth?" and start asking "What will the next person pay me for it?" \n- **The Feedack Loop**: Rising prices $\\rightarrow$ Media Attention $\\rightarrow$ New Buyers $\\rightarrow$ Rising Prices.\n- **The Limit of Arbitrage**: You might *know* a bubble is irrational, but as the saying goes: *"The market can stay irrational longer than you can stay solvent."* Shorting a bubble is mathematically correct but financially suicidal if the crowd stays crazy for one month longer than you have money.',
    '6. **Synthesis: Humility vs. Calculation**\nThe goal of this lab isn\'t to tell you the math is "wrong." It\'s to show you that the math tells you where prices *should* be, while behavior tells you where they *will* be on the way. The complete investor needs both: the calculator to find reality, and the discipline to survive the crowd.'
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
      explanation: 'The analytical probability that a wrong cascade forms is given by $(1-p)^2 / (2(p^2 - p + 1))$. For $p = 0.7$, $(1-0.7)^2 / (2(0.7^2 - 0.7 + 1)) = 0.09 / (2(0.49 - 0.7 + 1)) = 0.09 / (2 \\times 0.79) = 0.09 / 1.58 \\approx 5.696\\%$. Sequential voting halts the release of private signals!',
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
    }
  ]
};
