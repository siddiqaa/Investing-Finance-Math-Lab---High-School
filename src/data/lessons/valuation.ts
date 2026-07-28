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

To understand how this is possible, we have to travel back to Amsterdam in the year 1602. Lenders and merchants wanted to fund voyages to the East Indies. These voyages were incredibly risky—ships sank, spices were lost, and fortunes vanished. To spread this risk, they invented the world's first "Joint-Stock Company": the Dutch East India Company. Instead of one person owning a whole ship, thousands of citizens bought "shares" of the company. In return, the company paid them a share of its actual cargo profits—what we call <span className="text-indigo-600 font-bold">Dividends</span>. Soon, in London coffee houses, people began buying and selling these paper shares. But how did they know what a share was worth?

In high school algebra, you learn about geometric sequences where each term is multiplied by a common ratio. If that ratio is less than one, a mathematical miracle occurs: you can add together an infinite list of numbers, and they will sum up to a single, finite value. This is the math of <span className="text-indigo-600 font-bold">Convergence</span>. In this unit, we will discover how stock market valuation is built upon this exact algebraic magic, turning an infinite sequence of future dividend payments into a solid, present-day stock price. You'll see why the stock market isn't just a casino; it's a giant, real-time calculator solving infinite geometric progressions.`,
  fullText: [
    '<span className="text-indigo-600 font-bold">The Hook: The Infinity Paradox</span>',
    'Imagine a stock that pays you \\$1 this year, and promises to pay you a dividend every single year forever. Since you will receive an infinite amount of money over time, shouldn\'t the stock be worth an infinite amount of money today?',
    'The answer is a resounding <span className="text-indigo-600 font-bold">No</span>. Because of the Time Value of Money, dividends in the distant future are discounted so heavily that their present value shrinks to practically zero.',
    'Think of a powerful flashlight shining down a dark, infinite hallway. Close to the flashlight, the beam is incredibly bright. But as you look further down the hall, the light grows weaker and weaker, eventually disappearing into absolute darkness. The "brightness" is the Present Value, and the "distance" is Time. Even though the hallway goes on forever, the total light inside it is finite. This is the core logic of the <span className="text-indigo-600 font-bold">Dividend Discount Model (DDM)</span>.',

    '1. <span className="text-indigo-600 font-bold">Understanding Stock Ownership & Dividends</span>',
    'When you buy a share of stock, you are not just buying a digital ticket that bounces up and down on a screen. You are buying a literal partnership in a business. As a partner, you are entitled to two sources of wealth:',
    '- <span className="text-indigo-600 font-bold">Direct Cash Dividends:</span> The portion of profits the company mails to your bank account.',
    '- <span className="text-indigo-600 font-bold">Retained Earnings & Growth:</span> The profits the company keeps to buy more factories, hire more scientists, or build new software, which increases the value of your shares over time.',

    '2. <span className="text-indigo-600 font-bold">The Algebraic Derivation: Summing to Infinity</span>',
    'To derive the Gordon Growth Model deliberately without rushing, let\'s first define every symbol in our financial algebra:',
    '- <span className="text-indigo-600 font-bold">Current Dividend</span> ($D_0$): The cash dividend paid today per share (e.g., \\$1.00).',
    '- <span className="text-indigo-600 font-bold">Annual Growth Rate</span> ($g$): The perpetual rate at which dividends grow every year (e.g., $5\\%$ or $0.05$).',
    '- <span className="text-indigo-600 font-bold">Discount Rate / Required Return</span> ($r$): The annual rate of return demanded by investors (e.g., $10\\%$ or $0.10$).',
    '- <span className="text-indigo-600 font-bold">Dividend in Year $t$</span> ($D_t$): Growing compounded each year: $D_1 = D_0(1+g)$, $D_2 = D_0(1+g)^2$, and $D_t = D_0(1+g)^t$.',

    '<span className="text-indigo-600 font-bold">Step 1: Concrete Cash Flow Example</span>',
    'Let\'s see how these formulas work with real dollars before jumping into infinite series. Suppose $D_0 = \\$1.00$, $g = 5\\%$ ($0.05$), and $r = 10\\%$ ($0.10$):',
    '• <span className="text-indigo-600 font-bold">Year 1</span> ($t=1$): Expected dividend $D_1 = \\$1.00 \\times (1 + 0.05) = \\$1.05$. Its Present Value is:',
    '$$\\text{PV}_1 = \\frac{\\$1.05}{1.10^1} = \\$0.9545$$',
    '• <span className="text-indigo-600 font-bold">Year 2</span> ($t=2$): Expected dividend $D_2 = \\$1.00 \\times 1.05^2 = \\$1.1025$. Its Present Value is:',
    '$$\\text{PV}_2 = \\frac{\\$1.1025}{1.10^2} = \\frac{\\$1.1025}{1.21} = \\$0.9112$$',
    '• <span className="text-indigo-600 font-bold">Year 3</span> ($t=3$): Expected dividend $D_3 = \\$1.00 \\times 1.05^3 = \\$1.1576$. Its Present Value is:',
    '$$\\text{PV}_3 = \\frac{\\$1.1576}{1.10^3} = \\frac{\\$1.1576}{1.331} = \\$0.8697$$',
    'Notice the key pattern: Even though the cash dividend is growing larger every year (\\$1.05 \\to \\$1.1025 \\to \\$1.1576), discounting at $10\\%$ shrinks its present value faster than $5\\%$ growth inflates it! The present values shrink year after year: $\\$0.9545 \\to \\$0.9112 \\to \\$0.8697 \\dots$',

    '<span className="text-indigo-600 font-bold">Step 2: Expressing the Infinite Sum</span>',
    'To find the total fair value of the stock $P_0$, we sum the present value of every future dividend out to infinity ($t = 1$ to $t = \\infty$):',
    '$$P_0 = \\text{PV}_1 + \\text{PV}_2 + \\text{PV}_3 + \\dots = \\frac{D_0(1+g)^1}{(1+r)^1} + \\frac{D_0(1+g)^2}{(1+r)^2} + \\frac{D_0(1+g)^3}{(1+r)^3} + \\dots$$',
    'Notice that we can factor out $D_0$ and rewrite the expression using a common multiplier ratio $x = \\frac{1+g}{1+r}$:',
    '$$P_0 = D_0 \\left[ \\left(\\frac{1+g}{1+r}\\right)^1 + \\left(\\frac{1+g}{1+r}\\right)^2 + \\left(\\frac{1+g}{1+r}\\right)^3 + \\dots \\right] = D_0 \\sum_{t=1}^{\\infty} \\left(\\frac{1+g}{1+r}\\right)^t$$',
    'In our numerical example ($g=0.05$, $r=0.10$), $x = \\frac{1.05}{1.10} \\approx 0.9545$. Each term in our sum is simply the previous term multiplied by $0.9545$!',

    '<span className="text-indigo-600 font-bold">Step 3: Connecting to Geometric Progression & Convergence ($r > g$)</span>',
    'In algebra, an infinite geometric series has the form $S = a + ax + ax^2 + ax^3 + \\dots = \\sum_{t=1}^{\\infty} a x^{t-1}$, where $a$ is the first term and $x$ is the common ratio:',
    '- <span className="text-indigo-600 font-bold">First Term</span> ($a$): The discounted Year 1 dividend, $a = \\frac{D_0(1+g)}{1+r} = \\frac{D_1}{1+r}$ (in our example, $\\frac{\\$1.05}{1.10} = \\$0.9545$).',
    '- <span className="text-indigo-600 font-bold">Common Ratio</span> ($x$): The multiplier ratio $x = \\frac{1+g}{1+r}$ (in our example, $0.9545$).',
    '<span className="text-indigo-600 font-bold">Why does the infinite sum converge?</span> An infinite geometric series sums to a finite limit if and only if the absolute value of the ratio is strictly less than 1 ($|x| < 1$):',
    '$$\\frac{1+g}{1+r} < 1 \\implies 1+g < 1+r \\implies r > g$$',
    'This provides our foundational financial rule: <span className="text-indigo-600 font-bold">Your required rate of return ($r$) MUST be strictly greater than the perpetual growth rate ($g$)!</span> If a company could grow at $12\\%$ forever when required returns were only $10\\%$, the ratio $x = \\frac{1.12}{1.10} > 1$ would cause the sum to diverge to infinity—meaning a single share of stock would be worth infinite dollars!',

    '<span className="text-indigo-600 font-bold">Step 4: Step-by-Step Algebraic Simplification</span>',
    'When $|x| < 1$, algebra proves that an infinite geometric series sums to $S = \\frac{a}{1 - x}$. Let\'s substitute our exact financial terms $a = \\frac{D_1}{1+r}$ (the discounted Year 1 dividend) and $x = \\frac{1+g}{1+r}$ (the growth/discount ratio) and simplify step-by-step:',

    '<span className="text-indigo-600 font-bold">Sub-step 1: Set up the master fraction ($S = \\frac{a}{1 - x}$)</span>',
    'Place $a$ in the numerator and $1 - x$ in the denominator:',
    '$$P_0 = \\frac{\\frac{D_1}{1+r}}{1 - \\frac{1+g}{1+r}}$$',

    '<span className="text-indigo-600 font-bold">Sub-step 2: Simplify the bottom denominator ($1 - x$)</span>',
    'Find a common denominator of $(1+r)$ to combine the terms in the bottom expression:',
    '$$1 - \\frac{1+g}{1+r} = \\frac{1+r}{1+r} - \\frac{1+g}{1+r} = \\frac{(1+r) - (1+g)}{1+r} = \\frac{r - g}{1+r}$$',

    '<span className="text-indigo-600 font-bold">Sub-step 3: Substitute the simplified denominator back into $P_0$</span>',
    'Replace the bottom fraction with $\\frac{r - g}{1+r}$:',
    '$$P_0 = \\frac{\\frac{D_1}{1+r}}{\\frac{r - g}{1+r}}$$',

    '<span className="text-indigo-600 font-bold">Sub-step 4: Cancel out the common denominator $(1+r)$</span>',
    'Because both the top fraction and bottom fraction are divided by $(1+r)$, we multiply top and bottom by $(1+r)$ to cancel them out completely:',
    '$$P_0 = \\frac{D_1}{r - g}$$',

    '<span className="text-indigo-600 font-bold">Numerical Example Verification:</span>',
    'Plugging back our concrete numbers ($D_1 = \\$1.05$, $r = 10\\%$ or $0.10$, $g = 5\\%$ or $0.05$):',
    '$$P_0 = \\frac{\\$1.05}{0.10 - 0.05} = \\frac{\\$1.05}{0.05} = \\$21.00$$',

    'This magnificent result is the famous <span className="text-indigo-600 font-bold">Gordon Growth Model</span> (or Constant Growth DDM). It collapses an infinite sequence of future cash flows into a single, elegant fraction!',

    '<span className="text-indigo-600 font-bold">Interactive Math Sandbox & Side Quest:</span>',
    'Want to experiment with this derivation hands-on or solve guided practice problems? Open our dedicated math side quest below to explore an interactive geometric series sandbox and test your skills with instant-feedback quizzes!',
    'SIDE_QUEST_CALLOUT|side_quest_gordon|Gordon Growth Formula & Geometric Series',

    '3. <span className="text-indigo-600 font-bold">Demystifying the Required Rate of Return ($r$)</span>',
    'Why do different investors require different discount rates? The rate $r$ isn\'t a random guess. It represents your <span className="text-indigo-600 font-bold">Opportunity Cost</span> and is built from two elements:',
    '- <span className="text-indigo-600 font-bold">Risk-Free Rate</span> ($r_f$): What you could earn on U.S. Government Bonds with zero risk (the "baseline floor").',
    '- <span className="text-indigo-600 font-bold">Equity Risk Premium</span> ($ERP$): The extra return you demand to compensate for the risk that a company might fail or lose customers.',
    '$r = r_f + \\text{Risk Premium}$',
    'For example, if risk-free bonds pay 4%, and you buy a risky technology stock, you might demand a 6% risk premium. Your total required return is $4\\% + 6\\% = 10\\%$. If the company\'s dividend grows at 6% ($g$), the algebraic denominator of your valuation is $r - g = 10\\% - 6\\% = 4\\%$.',

    'KNOWLEDGE_CHECK_VALUATION',

    '4. <span className="text-indigo-600 font-bold">The Extreme Sensitivity of the "r - g" Denominator</span>',
    'Because the denominator of the model is $r - g$, small changes in either the required rate of return or the growth rate cause immense changes in the calculated stock price. This explains why stock prices are so volatile in the real world.',
    '<span className="text-indigo-600 font-bold">Worked Example — Small Shocks, Big Volatility:</span>',
    'Suppose a company pays next year\'s dividend $D_1 = \\$2.00$, and your required return is $r = 10\\%$. Watch what happens to the stock price as growth assumptions ($g$) shift slightly:',
    'SENSITIVITY_TABLE|Perpetual Growth (g) | Denominator (r - g) | Stock Price (P₀)\n2% | 8% ($0.10 - 0.02$) | \\$25.00 ($2.00 \\div 0.08$)\n5% | 5% ($0.10 - 0.05$) | \\$40.00 ($2.00 \\div 0.05$)\n8% | 2% ($0.10 - 0.08$) | \\$100.00 ($2.00 \\div 0.02$)\n9% | 1% ($0.10 - 0.09$) | \\$200.00 ($2.00 \\div 0.01$)',
    'Notice how a minor increase in growth expectation from 5% to 8% causes the stock price to <span className="text-indigo-600 font-bold">more than double</span> (from \\$40 to \\$100)! When a company announces its quarterly earnings and slightly adjusts its future growth forecast by even a fraction of a percent, the market reacts violently because the math of infinity amplifies those changes.',

    '5. <span className="text-indigo-600 font-bold">Decomposing the Stock Return</span>',
    'We can also rearrange the Gordon Growth Model using basic algebra to solve for the expected rate of return ($r$):',
    '$r = \\frac{D_1}{P_0} + g$',
    'This equation tells us that your total return from a stock comes from two distinct algebraic components:',
    '- <span className="text-indigo-600 font-bold">Dividend Yield</span> ($\\frac{D_1}{P_0}$): The cash return paid to you directly.',
    '- <span className="text-indigo-600 font-bold">Capital Gains Yield</span> ($g$): The rate at which the company (and its stock price) grows over time.',
    'For example, if a stock trading at \\$50 pays a \\$2 dividend next year, its dividend yield is $4\\%$. If its dividends grow at $5\\%$ per year, your total expected annual return is $4\\% + 5\\% = 9\\%$.',

    '6. <span className="text-indigo-600 font-bold">Real-World Limitations: The No-Dividend Paradox</span>',
    'Does this model work for tech companies like Alphabet (Google), Amazon, or Tesla that paid zero dividends for decades? At first glance, the Gordon Growth Model would price these at \\$0 since $D_1 = 0$.',
    'However, the <span className="italic">theory</span> still holds. These companies do not pay dividends today because they can invest their profits at extremely high returns internally. But eventually, as they mature, they must return cash to shareholders. In 2024, Meta (Facebook) and Alphabet announced their first-ever dividends! Valuation models for high-growth firms simply project that dividends will start in Year 10 or 20, discounting those values back to today. The math of geometric progression remains the ultimate arbiter of value.'
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
