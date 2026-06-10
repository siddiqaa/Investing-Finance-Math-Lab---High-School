import { LessonContent } from '../../types';

export const compounding: LessonContent = {
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
    '1. **The Time Value of Money**\nThe most important starting idea in finance is that a dollar today is worth more than a dollar tomorrow. Why? Because you can invest a dollar today to earn interest — so waiting costs you that potential growth.',
    'If you invest a Present Value $PV$ at a yearly growth rate $r$, in $n$ years your money grows to a Future Value:\n$FV = PV \\times (1 + r)^n$',
    '**Worked Example — The Power of Compounding:**\nSuppose you invest \\$10,000 at a 7% annual return. Watch what happens over time:',
    'YEARS_TABLE|Years | Calculation | Final Value\n10 | $10,000 \\times (1.07)^{10}$ | \\$19,672\n20 | $10,000 \\times (1.07)^{20}$ | \\$38,697\n30 | $10,000 \\times (1.07)^{30}$ | \\$76,123',
    'Notice: the jump from year 20 to year 30 (\\$37,000) is nearly double the jump from year 0 to year 10 (\\$9,000). This acceleration is what "exponential growth" means in practice. The longer money compounds, the faster it grows in absolute dollars.',
    '⚠️ **Common Mistake:** Students often think 7% per year for 10 years = 70% total growth. Wrong! It\'s $(1.07)^{10} - 1 \\approx 96.7\\%$ total growth. Always multiply rates — never add them.',
    '2. **Discounting & Backward Valuation**\nWe can flip the formula using algebra to work *backwards*. If someone promises to pay you a Future Value $FV$ in $n$ years, how much is that promise worth to you *right now*? We find the Present Value:\n$PV = \\frac{FV}{(1 + r)^n}$\nThis process is called discounting — we\'re shrinking the future amount back to its equivalent today.',
    '**Real-World Problem — The Lottery Dilemma:**\nYou win a lottery. You can take either:\n- Option A: \\$1,000,000 today\n- Option B: \\$1,300,000 paid in 5 years',
    'Which should you choose? It depends on your discount rate. At $r = 5\\%$: \n$PV_B = \\frac{1{,}300{,}000}{(1.05)^5} = \\frac{1{,}300{,}000}{1.276} \\approx \\$1{,}018{,}800$\nOption B is worth about 1.02M in today\'s dollars — slightly better than Option A. But at $r = 8\\%$: \n$PV_B = \\frac{1{,}300{,}000}{(1.08)^5} = \\frac{1{,}300{,}000}{1.469} \\approx \\$885{,}000$\nNow Option A wins. The "right" choice depends entirely on what return you believe you could earn with the money in the meantime.',
    '3. **Net Present Value (NPV)**\nWe can use discounting to find the value of an *entire business or investment* — not just one future payment. By adding up the Present Value of all future cash payments the business will generate, we calculate its **Net Present Value (NPV)**:\n$NPV = \\sum_{t=1}^{T} \\frac{CF_t}{(1 + r)^t}$',
    '**Worked Example — Valuing a Lemonade Stand:**\nYour friend\'s lemonade stand earns \\$500 in profit every year for 5 years, then closes. What is this business worth today if your required return is $r = 10\\%$?',
    'STAND_TABLE|Year | Cash Flow | Discount Factor | Present Value\n1 | \\$500 | $\\div 1.10^1 = 0.909$ | \\$454.50\n2 | \\$500 | $\\div 1.10^2 = 0.826$ | \\$413.00\n3 | \\$500 | $\\div 1.10^3 = 0.751$ | \\$375.50\n4 | \\$500 | $\\div 1.10^4 = 0.683$ | \\$341.55\n5 | \\$500 | $\\div 1.10^5 = 0.621$ | \\$310.45\nTotal NPV | | | \\$1,895.00',
    'The lemonade stand is worth \\$1,895 today — even though it will pay out \\$2,500 total over 5 years. That difference is the "cost" of waiting for your money.',
    '4. **Gordon Growth Model**\nMany real companies pay dividends — regular cash payments to shareholders, like interest on a savings account. If dividends grow at a constant rate $g$ forever, we can value the stock with a single elegant formula:\n$P_0 = \\frac{D_0 \\times (1 + g)}{r - g} \\qquad \\text{(requires } r > g \\text{)}$\nWhere $D_0$ is today\'s dividend, $r$ is the required return, and $g$ is the growth rate.',
    '**Worked Example:**\nA utility company pays a \\$2.00 dividend today, growing at $g = 3\\%$ per year. Investors require $r = 8\\%$ return.\n$P_0 = \\frac{2.00 \\times 1.03}{0.08 - 0.03} = \\frac{2.06}{0.05} = \\$41.20$\nThe stock is theoretically worth \\$41.20 per share.',
    '**What Happens as $g$ Approaches $r$?**',
    'GORDON_TABLE|Growth Rate $g$ | $r - g$ | Stock Price\n3% | 5% | \\$41.20\n5% | 3% | \\$68.67\n7% | 1% | \\$206.00\n7.9% | 0.1% | \\$2,060.00\n8% (= r) | 0 | Undefined!',
    'As $g$ approaches $r$, the price explodes toward infinity. This is why growth assumptions are *extremely* sensitive inputs in stock valuation — a small change in expected growth can dramatically change what a stock is "worth."'
  ],
  quizzes: [
    {
      id: 'c1',
      question: 'If someone offers to pay you \\$1,000 in 5 years, and your discount rate ($r$) is 5%, what is this promise worth to you today?',
      options: [
        'Approximately \\$783.53',
        'Exactly \\$1,000',
        'Exactly \\$500',
        'Approximately \\$1,276.28'
      ],
      correctIndex: 0,
      explanation: 'Using the backward-discounting algebraic formula: $PV = FV / (1 + r)^n$. Here, $FV = \\$1,000$, $r = 0.05$, and $n = 5$. So, $PV = 1,000 / (1.05)^5 \\approx 1,000 / 1.27628 \\approx \\$783.53$.',
      hint: 'Apply the formula $PV = FV / (1 + r)^n$ with $FV = 1000$, $r = 0.05$, and $n = 5$.'
    },
    {
      id: 'c2',
      question: 'Under the Gordon Growth Model, if a company pays a dividend of \\$2.00 next year ($D_1$) and this dividend is expected to grow at 3% forever, what is its stock value if your required return ($r$) is 8%?',
      options: [
        '\\$40.00',
        '\\$20.00',
        '\\$25.00',
        '\\$100.00'
      ],
      correctIndex: 0,
      explanation: 'The Gordon Growth Model gives the stock price as $P_0 = D_1 / (r - g)$. Substituting $D_1 = \\$2.00$, $r = 0.08$, and $g = 0.03$, we get $P_0 = 2 / (0.08 - 0.03) = 2 / 0.05 = \\$40.00$.',
      hint: 'Use the formula $P_0 = D_1 / (r - g)$, where next year\'s dividend $D_1$ has already factored in the growth.'
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
};
