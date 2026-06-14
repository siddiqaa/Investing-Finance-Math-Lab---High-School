import { LessonContent } from '../../types';

export const portfolio: LessonContent = {
  id: 'portfolio',
  title: 'Portfolio Diversification & Risk',
  subtitle: 'The algebra of expected return and spreading risk',
  mathTopic: 'Weighted Averages, Correlation, Efficient Frontier, Sharpe Ratio, and Beta',
  equations: [
    'E[R_p] = w_1 R_1 + w_2 R_2 + w_3 R_3',
    '\\text{Sharpe Ratio} = \\frac{E[R_p] - R_f}{\\sigma_p}',
    '\\beta_i = \\frac{\\text{Cov}(R_i, R_m)}{\\text{Var}(R_m)}'
  ],
  description: 'Can you get more return with less risk? Yes! Learn how combining different investments together uses weighted averages and correlation to cancel out specific risk and build efficient portfolios.',
  introduction: `In almost every area of life, there is a fundamental trade-off: if you want more of something good, you have to accept more of something bad. If you want a faster car, you have to pay more for insurance. If you want a bigger house, you have to spend more time cleaning it. In the world of investing, this trade-off is usually between **Risk** and **Return**. If you want the chance to double your money in a year, you have to accept the very real chance that you could lose it all in a month. This seems like an unbreakable law of the universe. But in the 1950s, a mathematician named Harry Markowitz discovered a "cheat code" that changed finance forever. He discovered that by combining different investments in just the right way, you could actually lower your total risk without necessarily lowering your total return. This discovery was so powerful it eventually won him the Nobel Prize, and it is known today as **Modern Portfolio Theory**.

The secret is a concept called **Diversification**. You have probably heard the old advice: "Don't put all your eggs in one basket." If you have ten eggs and ten baskets, and you drop one basket, you still have nine eggs. That's common sense. But finance math goes deeper. It doesn't just ask how many baskets you have; it asks if the baskets are tied to each other with a rope. Imagine you have two baskets, but you are carrying them both on the same arm. If you trip, both baskets hit the ground at the exact same time. Mathematically, these baskets are "Highly Correlated." Even though you have two baskets, you haven't actually lowered your risk at all. You have simply double-exposed yourself to the same disaster.

To get the "Free Lunch" of finance, you need to find baskets that move independently. Imagine you own a business that sells umbrellas. When it rains, business is great. When it's sunny, business is terrible. Now imagine you also own a business that sells ice cream. When it's sunny, business is great, and when it rains, business is terrible. If you own both businesses, your total income stays steady no matter what the weather does. The "Zig" of the umbrella shop is cancelled out by the "Zag" of the ice cream shop. This is the magic of **Correlation**. By finding assets that move in opposite directions—or even just assets that don't move together—you can "smooth out" the ride of your wealth. This "smoothing" is not just aesthetic; it is a mathematical strategy for survival.

In this unit, we are going to learn the algebra behind this magic. We will learn how to calculate a "Weighted Average" to find out how much a portfolio is expected to return. We will look at "Beta," which is a single number that tells us how much a stock tends to "vibrate" along with the rest of the market. And most importantly, we will learn about the **Sharpe Ratio**. If you have two portfolios that both earned 10% last year, but one felt like a smooth flight and the other felt like a plane crash, the Sharpe Ratio is the math that tells you which one was actually more "efficient." It is the "Grade" we give to an investor's skill. It helps us answer the question: Was the profit due to smart strategy, or just blind luck and high heart-rate risk?

We are going to learn how to stop gambling on single stocks and start building foundations that can survive almost any market weather. We're moving from the chaos of individual jags to the elegance of the "Efficient Frontier," where risk is managed by design, not by luck. By the end of this lab, you will understand that a portfolio is more than just a list of stocks—it is a carefully balanced machine, where the parts are chosen specifically for how they interact with each other. You will learn to see the world not as a collection of separate events, but as a web of correlations that can be mastered.`,
  fullText: [
    '**The Hook: The Only Free Lunch in Finance**\nYou\'ve heard the phrase "don\'t put all your eggs in one basket." But did you know there is a mathematical specific name for why this works? It is called **Modern Portfolio Theory**. In the real world, "risk" and "return" are usually tied together — if you want more money, you have to take more risk. Diversification is the only time in math where you can actually *lower* your risk without necessarily giving up your return.',
    '1. **Portfolio Expected Return: The Weighted Average**\nA portfolio is just a collection of different "buckets" of money. To find the total return, we use a **Weighted Average**:\n$E[R_p] = w_1 R_1 + w_2 R_2 + w_3 R_3$\nWhere $w$ is the percentage of your total wealth in that asset.',
    '**Worked Example — The Balanced Mix:**\nYou have \\$10,000. You put \\$5,000 in a Tech Stock (12% return) and \\$5,000 in a safe Bond (4% return).',
    'PORTFOLIO_TABLE|Asset | Weight (w) | Expected Return (R) | Contribution\nTech Stock | 50% | 12% | 6.0%\nSafe Bond | 50% | 4% | 2.0%\nTotal Portfolio | 100% | — | 8.0%',
    'By mixing the two, you "blended" your return to 8%. Simple, right? But the magic happens next.',
    '2. **Correlation: The Zig and the Zag**\nThe risk of a portfolio isn\'t just the average of the risks. It depends on **Correlation** ($\\rho$): how much assets move together.\n- **High Correlation (+1.0)**: If you own two different oil companies, when oil prices drop, both stocks crash together. You aren\'t diversified; you just have two baskets in the same truck.\n- **Low Correlation (0 to -1.0)**: If you own an Airline (which hates high oil prices) and an Oil Company (which loves them), when one "zigs," the other "zags." This cancels out the drama.',
    '3. **The Diversification Effect: Lowering the Floor**\nWhen you combine assets that aren\'t perfectly correlated, the "swings" of the portfolio become smaller than the swings of the individual stocks. This is the "Free Lunch."',
    '**Real-World Example:**\nImagine two stocks that both return 10% on average, but they are volatile. \n- **Scenario A**: You put all your money in one. You might be up 30% or down 30% next year.\n- **Scenario B**: You split it 50/50 between two stocks that are unrelated. When one crashes 30%, the other happens to be up 10%. Your total move is only -10%. You\'ve "smoothed out" the ride.',
    '4. **The Sharpe Ratio: Grading Your Risk**\nIf you have two portfolios that both returned 10%, but one was a wild roller coaster and the other was a smooth cruise, which is better? The **Sharpe Ratio** tells us. It measures how much "Bonus Return" you got for every unit of "Risk Stress" you took.',
    '$\\text{Sharpe Ratio} = \\frac{\\text{Return} - \\text{Risk Free Rate}}{\\sigma (Risk)}$',
    'SHARPE_TABLE|Investment | Return | Volatility (Risk) | Sharpe Score\nS&P 500 Index | 10% | 15% | 0.40\n"Hot" Crypto | 50% | 200% | 0.23\nBalanced Asset Mix | 8% | 8% | 0.50',
    'The Balanced Mix wins! Even though it has the lowest return, it provides the most "reward per unit of pain." Professional investors live and die by this number.',
    '5. **Beta ($\\beta$): The Market’s Thermometer**\nBeta measures how sensitive a stock is to the overall market. \n- **$\\beta = 1.0$**: The stock is the market. If the S&P 500 rises 1%, the stock rises 1%.\n- **$\\beta = 2.0$**: The stock is a "high-beta" stock (like Tesla). It moves twice as fast as the market, up or down.\n- **$\\beta = 0.5$**: The stock is "defensive" (like Walmart or Johnson & Johnson). It only feels half the market\'s swings.',
    'Understanding your portfolio\'s total Beta tells you how much you\'ll suffer during a market crash, regardless of how "diversified" you think you are.'
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
      explanation: 'The expected portfolio return is the weighted average: $E[R_p] = w_1 \\times R_1 + w_2 \\times R_2$. Substituting our values: $E[R_p] = (0.60 \\times 12\\%) + (0.40 \\times 5\\%) = 7.2\\% + 2.0\\% = 9.2\\%$.',
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
