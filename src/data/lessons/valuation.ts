import { LessonContent } from '../../types';

export const valuation: LessonContent = {
  id: 'valuation',
  title: 'Stock Price Valuation & Infinite Growth',
  subtitle: 'The algebra of perpetuity, growing dividend streams, and sensitive denominators',
  mathTopic: 'Infinite Geometric Series & Dividend Growth Convergence',
  equations: [
    'P_0 = \\sum_{t=1}^{\\infty} \\frac{D_0(1+g)^t}{(1+r)^t}',
    'P_0 = \\frac{D_1}{r - g} \\quad \\text{where } D_1 = D_0(1+g)',
    'r = \\frac{D_1}{P_0} + g'
  ],
  description: 'Learn how the stock market values forever-growing dividend streams, explore how an infinite geometric progression converges to a simple formula, and see why small shifts in growth assumptions cause massive price swings.',
  introduction: `How do you put a price tag on a company that could theoretically last forever? In our first unit, we valued cash flows over a finite number of years—like a five-year business loan or a short-lived lemonade stand. But when you buy a share of a public corporation like Apple, Coca-Cola, or McDonald's, you aren't buying something with an expiration date. You are buying a small slice of an enterprise designed to outlive its founders, its current customers, and perhaps even its current products. You are buying a stream of cash flows that stretches into infinity.

To understand how this is possible, we have to travel back to Amsterdam in the year 1602. Lenders and merchants wanted to fund voyages to the East Indies. These voyages were incredibly risky—ships sank, spices were lost, and fortunes vanished. To spread this risk, they invented the world's first "Joint-Stock Company": the Dutch East India Company. Instead of one person owning a whole ship, thousands of citizens bought "shares" of the company. In return, the company paid them a share of its actual cargo profits—what we call **Dividends**. Soon, in London coffee houses, people began buying and selling these paper shares. But how did they know what a share was worth?

In high school algebra, you learn about geometric sequences where each term is multiplied by a common ratio. If that ratio is less than one, a mathematical miracle occurs: you can add together an infinite list of numbers, and they will sum up to a single, finite value. This is the math of **Convergence**. In this unit, we will discover how stock market valuation is built upon this exact algebraic magic, turning an infinite sequence of future dividend payments into a solid, present-day stock price. You'll see why the stock market isn't just a casino; it's a giant, real-time calculator solving infinite geometric progressions.`,
  fullText: [
    '**The Hook: The Infinity Paradox**\nImagine a stock that pays you \\$1 this year, and promises to pay you a dividend every single year forever. Since you will receive an infinite amount of money over time, shouldn\'t the stock be worth an infinite amount of money today? \n\nThe answer is a resounding **No**. Because of the Time Value of Money, dividends in the distant future are discounted so heavily that their present value shrinks to practically zero. \n\nThink of a powerful flashlight shining down a dark, infinite hallway. Close to the flashlight, the beam is incredibly bright. But as you look further down the hall, the light grows weaker and weaker, eventually disappearing into absolute darkness. The "brightness" is the Present Value, and the "distance" is Time. Even though the hallway goes on forever, the total light inside it is finite. This is the core logic of the **Dividend Discount Model (DDM)**.',

    '1. **Understanding Stock Ownership & Dividends**\nWhen you buy a share of stock, you are not just buying a digital ticket that bounces up and down on a screen. You are buying a literal partnership in a business. As a partner, you are entitled to two sources of wealth:\n- **Direct Cash Dividends:** The portion of profits the company mails to your bank account.\n- **Retained Earnings & Growth:** The profits the company keeps to buy more factories, hire more scientists, or build new software, which increases the value of your shares over time.',

    '2. **The Algebraic Derivation: Summing to Infinity**\nIf a stock pays a dividend $D_0$ today, which grows at a constant annual rate $g$ forever, the dividend in year $t$ is $D_t = D_0(1+g)^t$. If our required discount rate is $r$, the price $P_0$ is the sum of all future discounted dividends:\n$P_0 = \\sum_{t=1}^{\\infty} \\frac{D_0(1+g)^t}{(1+r)^t} = D_0 \\sum_{t=1}^{\\infty} \\left(\\frac{1+g}{1+r}\\right)^t$\n\nThis is an infinite geometric series with a first term $a = D_0 \\left(\\frac{1+g}{1+r}\\right)$ and a common ratio $x = \\frac{1+g}{1+r}$. In algebra, an infinite geometric series $\\sum_{t=1}^{\\infty} a x^{t-1}$ converges to $\\frac{a}{1-x}$ if and only if the absolute value of the ratio is less than one ($|x| < 1$).\n\nFor our series to converge, we must have $\\frac{1+g}{1+r} < 1$, which algebraically simplifies to **$r > g$**. If the growth rate is greater than or equal to the discount rate, the series diverges to infinity! Assuming $r > g$, we can apply the geometric series sum formula:\n$P_0 = D_0 \\times \\frac{\\frac{1+g}{1+r}}{1 - \\frac{1+g}{1+r}} = D_0 \\times \\frac{1+g}{(1+r) - (1+g)} = \\frac{D_0(1+g)}{r - g} = \\frac{D_1}{r - g}$\n\nThis beautiful, simple result is known as the **Gordon Growth Model** (or Constant Growth DDM). It collapses an infinite sum into a single fraction.',

    '3. **Demystifying the Required Rate of Return ($r$)**\nWhy do different investors require different discount rates? The rate $r$ isn\'t a random guess. It represents your **Opportunity Cost** and is built from two elements:\n- **The Risk-Free Rate ($r_f$):** What you could earn on U.S. Government Bonds with zero risk (the "baseline floor").\n- **The Equity Risk Premium ($ERP$):** The extra return you demand to compensate for the risk that a company might fail or lose customers.\n\n$r = r_f + \\text{Risk Premium}$\n\nFor example, if risk-free bonds pay 4%, and you buy a risky technology stock, you might demand a 6% risk premium. Your total required return is $4\\% + 6\\% = 10\\%$. If the company\'s dividend grows at 6% ($g$), the algebraic denominator of your valuation is $r - g = 10\\% - 6\\% = 4\\%$.',

    'KNOWLEDGE_CHECK_VALUATION',

    '4. **The Extreme Sensitivity of the "r - g" Denominator**\nBecause the denominator of the model is $r - g$, small changes in either the required rate of return or the growth rate cause immense changes in the calculated stock price. This explains why stock prices are so volatile in the real world.',
    '**Worked Example — Small Shocks, Big Volatility:**\nSuppose a company pays next year\'s dividend $D_1 = \\$2.00$, and your required return is $r = 10\\%$. Watch what happens to the stock price as growth assumptions ($g$) shift slightly:',
    'SENSITIVITY_TABLE|Perpetual Growth (g) | Denominator (r - g) | Stock Price (P₀)\n2% | 8% ($0.10 - 0.02$) | \\$25.00 ($2.00 \\div 0.08$)\n5% | 5% ($0.10 - 0.05$) | \\$40.00 ($2.00 \\div 0.05$)\n8% | 2% ($0.10 - 0.08$) | \\$100.00 ($2.00 \\div 0.02$)\n9% | 1% ($0.10 - 0.09$) | \\$200.00 ($2.00 \\div 0.01$)',
    'Notice how a minor increase in growth expectation from 5% to 8% causes the stock price to **more than double** (from \\$40 to \\$100)! When a company announces its quarterly earnings and slightly adjusts its future growth forecast by even a fraction of a percent, the market reacts violently because the math of infinity amplifies those changes.',

    '5. **Decomposing the Stock Return**\nWe can also rearrange the Gordon Growth Model using basic algebra to solve for the expected rate of return ($r$):\n$r = \\frac{D_1}{P_0} + g$\n\nThis equation tells us that your total return from a stock comes from two distinct algebraic components:\n- **Dividend Yield ($\\frac{D_1}{P_0}$):** The cash return paid to you directly.\n- **Capital Gains Yield ($g$):** The rate at which the company (and its stock price) grows over time.\n\nFor example, if a stock trading at \\$50 pays a \\$2 dividend next year, its dividend yield is $4\\%$. If its dividends grow at $5\\%$ per year, your total expected annual return is $4\\% + 5\\% = 9\\%$.',

    '6. **Real-World Limitations: The No-Dividend Paradox**\nDoes this model work for tech companies like Alphabet (Google), Amazon, or Tesla that paid zero dividends for decades? At first glance, the Gordon Growth Model would price these at \\$0 since $D_1 = 0$.\n\nHowever, the *theory* still holds. These companies do not pay dividends today because they can invest their profits at extremely high returns internally. But eventually, as they mature, they must return cash to shareholders. In 2024, Meta (Facebook) and Alphabet announced their first-ever dividends! Valuation models for high-growth firms simply project that dividends will start in Year 10 or 20, discounting those values back to today. The math of geometric progression remains the ultimate arbiter of value.'
  ],
  quizzes: [
    {
      id: 'val_q1',
      question: 'If a company pays a dividend of \\$3.00 next year ($D_1$), your required return ($r$) is 9%, and the dividends grow at a constant rate of 4% ($g$) forever, what is the fair value of the stock?',
      options: [
        '\\$33.33',
        '\\$60.00',
        '\\$75.00',
        '\\$300.00'
      ],
      correctIndex: 1,
      explanation: 'Using the Gordon Growth Model formula: $P_0 = D_1 / (r - g)$. Substituting $D_1 = \\$3.00$, $r = 0.09$, and $g = 0.04$, we get $P_0 = 3.00 / (0.09 - 0.04) = 3.00 / 0.05 = \\$60.00$.',
      hint: 'Subtract the growth rate from the discount rate to get the denominator, then divide next year\'s dividend by this number.'
    },
    {
      id: 'val_q2',
      question: 'Under the Gordon Growth Model, what mathematically happens if the perpetual dividend growth rate ($g$) is equal to or greater than the discount rate ($r$)?',
      options: [
        'The stock price drops to exactly \\$0',
        'The stock price is mathematically undefined (or negative), since a real-world company cannot sustain a growth rate higher than the economy\'s discount rate forever',
        'The stock price becomes equal to next year\'s dividend',
        'The required return decreases automatically'
      ],
      correctIndex: 1,
      explanation: 'The Gordon Growth formula requires $r > g$. If $g \\geq r$, the denominator ($r - g$) is zero or negative, resulting in a mathematically undefined or negative stock price. Realistically, a single company cannot grow faster than the discount rate forever, as its size would eventually exceed the size of the entire market.',
      hint: 'Look at the denominator of the Gordon Growth formula, $r - g$. What happens when $g$ is equal to or larger than $r$?'
    },
    {
      id: 'val_q3',
      question: 'If a stock trades at \\$100, pays next year\'s dividend of \\$3.00 ($D_1$), and is valued with a required return of 10% ($r$), what is its implied constant perpetual growth rate ($g$)?',
      options: [
        '3%',
        '5%',
        '7%',
        '10%'
      ],
      correctIndex: 2,
      explanation: 'Rearranging the expected return formula $r = (D_1 / P_0) + g$ to solve for $g$, we get $g = r - (D_1 / P_0)$. Here, $r = 0.10$ and $D_1 / P_0 = 3.00 / 100 = 0.03$ (3% dividend yield). Thus, $g = 0.10 - 0.03 = 0.07$ or 7%.',
      hint: 'First find the dividend yield by dividing next year\'s dividend by the stock price, then subtract this yield from the required return to find the growth rate.'
    }
  ]
};
