import { LessonContent } from '../../types';

export const flatValuation: LessonContent = {
  id: 'flatValuation',
  title: 'Stock Valuation Without Growth (Zero-Growth Dividend Discount Model — DDM)',
  subtitle: 'Valuing constant perpetual cash flows and flat dividend streams',
  mathTopic: 'Zero-Growth Perpetuities & Dividend Discount Model (DDM) Baseline',
  equations: [
    'P_0 = \\sum_{t=1}^{\\infty} \\frac{D}{(1+r)^t} = \\frac{D}{r}',
    'r = \\frac{D}{P_0}',
    '\\text{Dividend Yield} = \\frac{D}{P_0} = r \\quad (\\text{when } g = 0)'
  ],
  description: 'Discover the fundamentals of the Dividend Discount Model (DDM). Learn what dividends are, why stock value equals the discounted sum of future dividend payments, and master the zero-growth formula P_0 = D / r.',
  introduction: `In Unit 3, we learned why buying shares of stock represents fractional ownership of a real business. As a part-owner, you are entitled to direct cash distributions paid out from the company's profits, known as <span className="text-indigo-600 font-bold">Dividends ($D$)</span>. But how do investors determine what a share of stock is actually worth today?

This fundamental valuation question is answered by the <span className="text-indigo-600 font-bold">Dividend Discount Model (DDM)</span>. The DDM states a clear, mathematical rule: <span className="italic text-slate-700 font-medium">A share of stock is worth the sum of all its expected future cash dividends, discounted back to present value today ($P_0$)</span>.

Before tackling complex businesses whose profits and dividends expand every year, we begin with the baseline valuation model: <span className="text-indigo-600 font-bold">a business that pays a flat, constant dividend ($D$) every single year into infinity without growing ($g = 0$)</span>.

By mastering $P_0 = \\frac{D}{r}$, you will see how discounting acts as gravity on perpetual cash flows, establishing the exact bridge you need before adding dividend growth ($g$) in Unit 4!`,
  fullText: [
    '1. <span className="text-indigo-600 font-bold">Understanding Dividends ($D$) & The DDM Premise</span>',
    'When a business makes a cash profit, its management has a choice: keep the cash in the bank to expand, or distribute it directly to the owners. When a public company sends a cash payout per share directly to its shareholders\' accounts, that payment is a <span className="text-indigo-600 font-bold">Dividend ($D$)</span>.',
    'The core insight of the <span className="text-indigo-600 font-bold">Dividend Discount Model (DDM)</span> is that a stock is not a magical lottery ticket. Its fundamental intrinsic value today ($P_0$) comes entirely from the total present value of all the future dividend checks you will ever collect as an owner:',
    '$$P_0 = \\text{PV}(D_1) + \\text{PV}(D_2) + \\text{PV}(D_3) + \\dots = \\sum_{t=1}^{\\infty} \\frac{D_t}{(1+r)^t}$$',

    '2. <span className="text-indigo-600 font-bold">The Zero-Growth Baseline ($g = 0$)</span>',
    'Think back to the Lemonade Stand example from earlier units. If you bought a 10% ownership stake in a friend\'s stand that reliably earns \\$100 in total profit every summer, your share of the profits would be \\$10 in cash every year. In the stock market, mature companies (like electric utilities or water companies) often work just like this steady stand.',
    'Imagine a mature utility stock that pays a fixed dividend of \\$2.00 per share every single year forever. Because the business is mature and not reinvesting for expansion, its dividend growth rate is zero ($g = 0\\%$). Each year\'s expected dividend is identical:',
    '$$D_1 = D_2 = D_3 = \\dots = D_t = D$$',

    '3. <span className="text-indigo-600 font-bold">The Infinity Paradox & Infinite Series Derivation</span>',
    'If a stock promises to pay you a \\$2.00 dividend every year forever, shouldn\'t the share cost an infinite amount of money today?',
    'The answer is a resounding <span className="text-indigo-600 font-bold">No</span>. Thanks to the Time Value of Money (Units 1 & 2), cash received in the distant future is heavily discounted. A \\$2 dividend paid 50 years from now is worth only cents in present-day dollars!',
    'To calculate the exact price today ($P_0$), we sum the present value of every future constant dividend $D$ out to infinity ($t = 1$ to $t = \\infty$):',
    '$$P_0 = \\frac{D}{(1+r)^1} + \\frac{D}{(1+r)^2} + \\frac{D}{(1+r)^3} + \\dots$$',
    'Factoring out the constant dividend $D$ from every term:',
    '$$P_0 = D \\left[ \\frac{1}{(1+r)^1} + \\frac{1}{(1+r)^2} + \\frac{1}{(1+r)^3} + \\dots \\right]$$',
    'In high school algebra, adding an infinite sequence where each term is multiplied by a common fraction less than 1 forms a convergent <span className="text-indigo-600 font-bold">infinite geometric series</span>. The infinite sum equals $\\frac{\\text{first term}}{1 - \\text{multiplier}}$.',
    'Here, the first term is $\\frac{1}{1+r}$, and the multiplier for each step is also $\\frac{1}{1+r}$. Plugging these into the limit formula gives:',
    '$$\\frac{\\frac{1}{1+r}}{1 - \\frac{1}{1+r}} = \\frac{\\frac{1}{1+r}}{\\frac{(1+r) - 1}{1+r}} = \\frac{\\frac{1}{1+r}}{\\frac{r}{1+r}} = \\frac{1}{r}$$',
    'SIDE_QUEST_CALLOUT|side_quest_geometric|Geometric Series',
    'Multiplying by $D$ yields our clean, foundational <span className="text-indigo-600 font-bold">Zero-Growth Stock Valuation Formula</span>:',
    '$$P_0 = \\frac{D}{r}$$',

    '4. <span className="text-indigo-600 font-bold">Concrete Numerical Examples</span>',
    'Let\'s see how $P_0 = \\frac{D}{r}$ works with real dollars. Suppose a stock pays a fixed annual dividend of $D = \\$5.00$ per share:',
    '• <span className="text-indigo-600 font-bold">Case A: Required Return $r = 10\\%$ ($0.10$)</span>\n$$P_0 = \\frac{\\$5.00}{0.10} = \\$50.00$$',
    '• <span className="text-indigo-600 font-bold">Case B: Rates Fall, Required Return drops to $r = 5\\%$ ($0.05$)</span>\n$$P_0 = \\frac{\\$5.00}{0.05} = \\$100.00$$',
    '• <span className="text-indigo-600 font-bold">Case C: Risk or Rates Rise, Required Return jumps to $r = 12.5\\%$ ($0.125$)</span>\n$$P_0 = \\frac{\\$5.00}{0.125} = \\$40.00$$',

    '5. <span className="text-indigo-600 font-bold">The Inverse Relationship: Price ($P_0$) vs. Discount Rate ($r$)</span>',
    'Notice the fundamental financial rule: <span className="text-indigo-600 font-bold">Stock prices move inversely to required discount rates ($r$)!</span>',
    'When market interest rates rise or investor risk demands increase ($r$ goes UP), the denominator in $P_0 = \\frac{D}{r}$ gets bigger, pulling the stock price $P_0$ DOWN.',
    'Conversely, when interest rates drop ($r$ goes DOWN), future cash flows become more valuable in present terms, pushing the stock price $P_0$ UP!',

    '6. <span className="text-indigo-600 font-bold">Solving for Expected Return & Dividend Yield ($r = \\frac{D}{P_0}$)</span>',
    'If a stock is trading in the market for $P_0 = \\$40.00$ and pays a flat dividend of $D = \\$2.00$ per year, you can instantly calculate your expected annual return ($r$):',
    '$$r = \\frac{D}{P_0} = \\frac{\\$2.00}{\\$40.00} = 0.05 = 5\\%$$',
    'This fraction $\\frac{D}{P_0}$ is known as the <span className="text-indigo-600 font-bold">Dividend Yield</span>. It measures how much cash flow you receive each year as a percentage of the price you paid for the stock.',
    'Because a zero-growth company ($g=0$) never expands, its stock price theoretically won\'t appreciate. Thus, your entire investment return comes 100% from this Dividend Yield.'
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
      question: 'What is the core mathematical premise of the Dividend Discount Model (DDM)?',
      options: [
        'A stock\'s price is strictly equal to the cash in the company\'s bank account today',
        'A stock\'s intrinsic value equals the sum of all its expected future cash dividends, discounted back to present value today',
        'A stock\'s price always doubles every 7 years regardless of business earnings',
        'A stock\'s value is calculated by multiplying its annual revenue by the number of employees'
      ],
      correctIndex: 1,
      explanation: 'The Dividend Discount Model (DDM) asserts that a share of stock is worth the present value of every future cash dividend payment it distributes to its owners over time.',
      hint: 'Think about what "discounting future dividend cash flows back to present value" means.'
    }
  ]
};

