import { LessonContent } from '../../types';

export const flatValuation: LessonContent = {
  id: 'flatValuation',
  title: 'Stock Valuation Without Growth (Zero-Growth Dividend Discount Model — DDM)',
  subtitle: 'Valuing constant perpetual cash flows and flat dividend streams',
  mathTopic: 'Zero-Growth Perpetuities & Discount Rate Inversion',
  equations: [
    'P_0 = \\sum_{t=1}^{\\infty} \\frac{D}{(1+r)^t} = \\frac{D}{r}',
    'r = \\frac{D}{P_0}',
    '\\text{Dividend Yield} = \\frac{D}{P_0} = r \\quad (\\text{when } g = 0)'
  ],
  description: 'Before introducing dividend growth (g), discover how to value a company that pays a flat, constant dividend forever using the simple zero-growth formula P_0 = D / r.',
  introduction: `In Unit 3, we learned why buying shares of stock represents fractional ownership of a real business. As a partner, you are entitled to direct cash payments from the company's profits, known as <span className="text-indigo-600 font-bold">dividends ($D$)</span>. But how much should an investor actually pay for a share of stock today? This fair value is known as the <span className="text-indigo-600 font-bold">Price today ($P_0$)</span>.

Before jumping into complex businesses whose profits and dividends grow every year, let's start with the simplest stock valuation model imaginable: <span className="text-indigo-600 font-bold">a business that pays a flat, constant cash dividend ($D$) every single year into infinity without growing ($g = 0$)</span>.

This model applies directly to mature businesses and flat perpetual cash flow streams. By mastering $P_0 = \\frac{D}{r}$, you will gain a crystal-clear intuition for how the required rate of return ($r$) acts as a discount gravity on asset prices—laying the exact foundation you need before adding dividend growth ($g$) in Unit 4!`,
  fullText: [
    '1. <span className="text-indigo-600 font-bold">The Zero-Growth Concept ($g = 0$)</span>',
    'Think back to the Lemonade Stand example from earlier units. If you bought a 10% ownership stake in a friend\'s stand that reliably earns \\$100 in total profit every summer, your share of the profits would be \\$10 in cash every year. In the stock market, this cash distribution to fractional owners is exactly what a <span className="text-indigo-600 font-bold">dividend</span> ($D$) is.',
    'Now imagine a mature utility company that works just like a giant lemonade stand. It pays a fixed dividend of \\$2.00 per share every single year forever. Because the business is not expanding or reinvesting for growth, $g = 0\\%$. Each year\'s expected dividend is identical:',
    '$$D_1 = D_2 = D_3 = \\dots = D_t = D$$',

    '2. <span className="text-indigo-600 font-bold">Mathematical Derivation (How does an infinite sum not equal infinity?)</span>',
    'To find the fair price today ($P_0$), we sum the present value of every future constant dividend $D$ out to infinity ($t = 1$ to $t = \\infty$):',
    '$$P_0 = \\frac{D}{(1+r)^1} + \\frac{D}{(1+r)^2} + \\frac{D}{(1+r)^3} + \\dots$$',
    'Notice that we can factor out the constant dividend $D$ from every term:',
    '$$P_0 = D \\left[ \\frac{1}{(1+r)^1} + \\frac{1}{(1+r)^2} + \\frac{1}{(1+r)^3} + \\dots \\right]$$',
    'You might wonder: if we add up an infinite number of dividends, shouldn\'t the price be infinity? The answer is no! Because we divide by $(1+r)^t$, which grows exponentially larger each year, the present value of distant dividends shrinks towards zero.',
    'In Algebra, a pattern of repeatedly multiplying by the same fraction is called an <span className="text-indigo-600 font-bold">infinite geometric series</span>. As long as the multiplier is less than 1, the infinite sum converges to a simple limit: $\\frac{\\text{first term}}{1 - \\text{multiplier}}$.',
    'In our bracketed series, the first term is $\\frac{1}{1+r}$, and the multiplier for each step is also $\\frac{1}{1+r}$. Plugging these into the algebra limit formula gives us:',
    '$$\\frac{\\frac{1}{1+r}}{1 - \\frac{1}{1+r}} = \\frac{\\frac{1}{1+r}}{\\frac{(1+r) - 1}{1+r}} = \\frac{\\frac{1}{1+r}}{\\frac{r}{1+r}} = \\frac{1}{r}$$',
    'SIDE_QUEST_CALLOUT|side_quest_geometric|Geometric Series',
    'Multiplying by $D$ yields our clean, foundational <span className="text-indigo-600 font-bold">Zero-Growth Stock Valuation Formula</span>:',
    '$$P_0 = \\frac{D}{r}$$',

    '3. <span className="text-indigo-600 font-bold">Concrete Numerical Examples</span>',
    'Let\'s see how the zero-growth formula works with real numbers. Suppose a stock pays a fixed annual dividend of $D = \\$5.00$ per share:',
    '- <span className="text-indigo-600 font-bold">Case A: Required Return $r = 10\\%$ ($0.10$)</span>',
    '$$P_0 = \\frac{\\$5.00}{0.10} = \\$50.00$$',
    '- <span className="text-indigo-600 font-bold">Case B: Rates Fall, Required Return drops to $r = 5\\%$ ($0.05$)</span>',
    '$$P_0 = \\frac{\\$5.00}{0.05} = \\$100.00$$',
    '- <span className="text-indigo-600 font-bold">Case C: Risk or Rates Rise, Required Return jumps to $r = 12.5\\%$ ($0.125$)</span>',
    '$$P_0 = \\frac{\\$5.00}{0.125} = \\$40.00$$',

    '4. <span className="text-indigo-600 font-bold">The Inverse Relationship: Price ($P_0$) vs. Discount Rate ($r$)</span>',
    'Notice the profound financial rule: <span className="text-indigo-600 font-bold">Stock prices move inversely to required discount rates ($r$)!</span>',
    'When market interest rates rise or investor risk demands increase ($r$ goes UP), the denominator in $P_0 = \\frac{D}{r}$ gets bigger, pulling the stock price $P_0$ DOWN.',
    'Conversely, when interest rates drop ($r$ goes DOWN), future cash flows become more valuable in present terms, pushing the stock price $P_0$ UP!',

    '5. <span className="text-indigo-600 font-bold">Solving for Expected Return & Dividend Yield ($r = \\frac{D}{P_0}$)</span>',
    'If a stock is trading in the market for $P_0 = \\$40.00$ and pays a flat dividend of $D = \\$2.00$ per year, you can instantly calculate your expected annual return ($r$):',
    '$$r = \\frac{D}{P_0} = \\frac{\\$2.00}{\\$40.00} = 0.05 = 5\\%$$',
    'This fraction $\\frac{D}{P_0}$ is known as the <span className="text-indigo-600 font-bold">Dividend Yield</span>. It measures how much cash flow you receive each year as a percentage of the price you paid for the stock.',
    'For example, a \\$100 stock paying a \\$4 dividend has a 4% Dividend Yield. Because our zero-growth company ($g=0$) never expands, its stock price theoretically won\'t appreciate. Thus, your entire return comes 100% from this Dividend Yield.'
  ],
  quizzes: [
    {
      id: 'fv1',
      question: 'A stock pays a constant cash dividend of \\$4.00 per share every year forever. If investors require an 8% annual return ($r = 0.08$), what is the fair value ($P_0$) of the share today?',
      options: [
        '\\$32.00',
        '\\$40.00',
        '\\$50.00',
        '\\$100.00'
      ],
      correctIndex: 2,
      explanation: 'Using the Zero-Growth formula $P_0 = \\frac{D}{r}$, we divide $D = \\$4.00$ by $r = 0.08$: $P_0 = \\frac{\\$4.00}{0.08} = \\$50.00$.',
      hint: 'Divide the flat dividend ($4.00) by the discount rate expressed as a decimal ($0.08).'
    },
    {
      id: 'fv2',
      question: 'Suppose a zero-growth stock pays a flat dividend of \\$3.00 per year. What happens to its stock price ($P_0$) if the required return ($r$) drops from 10% down to 5%?',
      options: [
        'The stock price cuts in half from \\$60.00 to \\$30.00',
        'The stock price stays exactly the same at \\$30.00',
        'The stock price doubles from \\$30.00 to \\$60.00',
        'The stock price increases by \\$5.00 to \\$35.00'
      ],
      correctIndex: 2,
      explanation: 'At $r = 10\\%$, $P_0 = \\frac{\\$3.00}{0.10} = \\$30.00$. When $r$ falls to $5\\%$, $P_0 = \\frac{\\$3.00}{0.05} = \\$60.00$. Cutting the discount rate in half doubles the present value of the perpetual cash stream!',
      hint: 'Calculate $P_0 = 3 / 0.10$ and $P_0 = 3 / 0.05$ and compare the two results.'
    },
    {
      id: 'fv3',
      question: 'You see a stock trading on the exchange for \\$80.00 per share. It pays an annual flat dividend of \\$4.00. What is your expected annual rate of return ($r$)?',
      options: [
        '4.0%',
        '5.0%',
        '8.0%',
        '10.0%'
      ],
      correctIndex: 1,
      explanation: 'Rearranging $P_0 = \\frac{D}{r}$ gives $r = \\frac{D}{P_0}$. Dividing $D = \\$4.00$ by $P_0 = \\$80.00$ gives $r = \\frac{\\$4.00}{\\$80.00} = 0.05 = 5.0\\%$.',
      hint: 'Divide the annual dividend ($4.00) by the stock price ($80.00).'
    },
    {
      id: 'fv4',
      question: 'If a zero-growth stock pays a fixed dividend of \\$2.00 forever, what happens to its Dividend Yield if the stock\'s market price ($P_0$) suddenly increases?',
      options: [
        'The Dividend Yield goes up',
        'The Dividend Yield goes down',
        'The Dividend Yield stays exactly the same',
        'The Dividend Yield becomes negative'
      ],
      correctIndex: 1,
      explanation: 'Dividend Yield is calculated as $D / P_0$. Since the dividend $D$ is fixed at \\$2.00, an increase in the denominator (price $P_0$) mathematically causes the yield to go down. Higher prices mean lower yields!',
      hint: 'Look at the formula for Dividend Yield: $D / P_0$. What happens to the result of a fraction when the denominator gets bigger?'
    }
  ]
};
