import { LessonContent } from '../../types';

export const unit5R: LessonContent = {
  id: 'unit5R',
  title: 'Unit 5R: Topic Review — Foundations to the Gordon Growth Model',
  subtitle: 'A comprehensive summary and test prep guide synthesizing Units 1 through 5: Time Value of Money, Discount Rates, Equity Bridging, Zero-Growth Valuation, and Gordon Growth News Shocks',
  mathTopic: 'Topic Review: TVM, Discounting, DDM, Perpetuities, and Expectation Shocks',
  equations: [
    'PV = \\frac{FV}{(1 + r)^n} \\quad \\text{and} \\quad NPV = \\sum_{t=1}^{T} \\frac{CF_t}{(1 + r)^t} \\quad \\text{(Unit 1: Time Value of Money)}',
    'P_0 = \\frac{D}{r} \\quad \\text{(Unit 3.5: Zero-Growth DDM Perpetuity)}',
    'P_0 = \\frac{D_1}{r - g} = \\frac{D_0(1 + g)}{r - g} \\quad \\text{(Unit 4: Gordon Growth Model, } r > g \\text{)}',
    'P_{\\text{new}} = \\frac{D_1}{(r + \\Delta r) - (g + \\Delta g)} \\quad \\text{(Unit 5: Expectation Shocks \\& Price Re-rating)}'
  ],
  description: 'This unit provides a complete summary of the core algebraic concepts covered in Units 1 through 5. It is designed as a focused study guide and test preparation review to solidify your understanding before moving on to stochastic market paths.',
  introduction: `Welcome to <span className="text-indigo-600 font-bold">Unit 5R: Topic Review</span>. Over the first five units of this course, we built a complete mathematical bridge from fundamental high school algebra to modern equity valuation.

We began with the simple premise that money has a time value, learned how to discount future cash flows, explored where discount rates come from in banking and financial markets, derived zero-growth perpetuities, extended them to infinite growing geometric series under the <span className="text-indigo-600 font-bold">Gordon Growth Model</span> ($P_0 = \\frac{D_1}{r - g}$), and finally observed how real-world news shocks ($\\Delta g$ and $\\Delta r$) cause live stock prices to adjust.

This review unit synthesizes all five core topics into a clear, narrative study guide. Use this text as a prep guide for tests, quizzes, and problem sets.`,
  fullText: [
    '1. <span className="text-indigo-600 font-bold">Unit 1 Review: Time Value of Money & Net Present Value (NPV)</span>',
    'The foundational law of financial mathematics is that a dollar received today is worth more than a dollar received in the future. This difference exists because money held today can be invested to earn interest or investment returns over time.',
    'To calculate the <span className="text-indigo-600 font-bold">Future Value (FV)</span> of a deposit $P$ growing at an annual interest rate $r$ over $n$ years, we use compound exponentiation:',
    '$$FV = P(1 + r)^n$$',
    'To reverse this process and determine the <span className="text-indigo-600 font-bold">Present Value (PV)</span> of a guaranteed future cash payment, we divide by the compound discount factor:',
    '$$PV = \\frac{FV}{(1 + r)^n}$$',
    'When evaluating an asset or business that generates a sequence of cash flows over $T$ years ($CF_1, CF_2, \\dots, CF_T$), we discount each individual payment back to today\'s dollar value and sum them together. Subtracting the initial cost ($C_0$) gives the <span className="text-indigo-600 font-bold">Net Present Value (NPV)</span>:',
    '$$NPV = \\sum_{t=1}^{T} \\frac{CF_t}{(1 + r)^t} - C_0$$',
    'An investment creates economic value only if its NPV is positive ($NPV > 0$).',

    '2. <span className="text-indigo-600 font-bold">Unit 2 Review: Selecting the Discount Rate ($r$) & Opportunity Cost</span>',
    'The discount rate $r$ is not an arbitrary number. It represents the <span className="text-indigo-600 font-bold">opportunity cost of capital</span>—the rate of return you forfeit by committing your money to one investment instead of your next best alternative with equivalent risk.',
    'In financial markets, baseline discount rates begin with risk-free benchmark assets, such as government Treasury bills or FDIC-insured High-Yield Savings Accounts ($r_{\\text{rf}}$). If safe bank deposits yield $4.5\\%$, then $4.5\\%$ serves as the absolute minimum hurdle rate for any alternative investment.',
    'Furthermore, inflation reduces the real purchasing power of future dollars. The real rate of return ($r_{\\text{real}}$) accounts for inflation ($i$) approximately via $r_{\\text{real}} \\approx r_{\\text{nominal}} - i$. Higher inflation pushes required nominal returns higher across all asset classes.',

    '3. <span className="text-indigo-600 font-bold">Unit 3 Review: Bridging from Bank Accounts to Stock Ownership</span>',
    'While bank savings accounts offer fixed, guaranteed interest payments, buying shares of stock represents purchasing <span className="text-indigo-600 font-bold">fractional equity ownership</span> in a real commercial enterprise.',
    'Because business revenues fluctuate with economic conditions, stock ownership carries operational and market risk. To compensate investors for taking on this uncertainty, equities must offer a expected return higher than safe bank accounts. This additional return is the <span className="text-indigo-600 font-bold">Equity Risk Premium (ERP)</span>:',
    '$$r_{\\text{stock}} = r_{\\text{bank}} + \\text{Equity Risk Premium}$$',
    'Over multi-decade horizons, equity investments have historically outperformed cash savings because profitable corporations reinvest their earnings at high returns on equity, compounding wealth faster than fixed interest rates.',

    '4. <span className="text-indigo-600 font-bold">Unit 3.5 Review: Zero-Growth Stock Valuation ($P_0 = \\frac{D}{r}$)</span>',
    'Before analyzing growing companies, we master stock valuation for companies that pay a constant annual cash dividend $D$ forever ($g = 0\\%$), such as preferred shares or mature income utilities.',
    'The fair price of a zero-growth stock is the sum of an infinite sequence of identical annual dividend payments discounted back to the present:',
    '$$P_0 = \\frac{D}{1+r} + \\frac{D}{(1+r)^2} + \\frac{D}{(1+r)^3} + \\dots$$',
    'Using the sum formula for an infinite geometric series with initial term $a = \\frac{D}{1+r}$ and common ratio $x = \\frac{1}{1+r}$, this infinite sum simplifies directly to:',
    '$$P_0 = \\frac{D}{r}$$',
    'This zero-growth formula demonstrates that a stock\'s fair value is inversely proportional to its discount rate. Inverting the formula gives the dividend yield: $r = \\frac{D}{P_0}$. For instance, a preferred share paying a constant \\$3.00 dividend with a required return of $6\\%$ ($0.06$) has a fair value of $P_0 = \\frac{\\text{\\$3.00}}{0.06} = \\text{\\$50.00}$.',

    '5. <span className="text-indigo-600 font-bold">Unit 4 Review: Stock Valuation & The Gordon Growth Model ($P_0 = \\frac{D_1}{r - g}$)</span>',
    'Most healthy corporations do not keep their dividends flat; they grow their earnings and dividends over time. If dividends expand at a constant perpetual annual rate $g$, the dividend expected next year ($t = 1$) is $D_1 = D_0(1 + g)$.',
    'Summing the infinite stream of growing dividends yields a geometric series where each successive payment is multiplied by $\\frac{1+g}{1+r}$:',
    '$$P_0 = \\sum_{t=1}^{\\infty} \\frac{D_0(1+g)^t}{(1+r)^t} = \\frac{D_1}{r - g}$$',
    'This fundamental relation is the <span className="text-indigo-600 font-bold">Gordon Growth Model</span>. It rests on three crucial rules:',
    '• <span className="font-bold text-slate-800">Rule 1 — Required Next Dividend ($D_1$):</span> Always use the *next period\'s* expected dividend ($D_1$). If given the current dividend ($D_0$), you must first calculate $D_1 = D_0(1 + g)$.\n• <span className="font-bold text-slate-800">Rule 2 — Mathematical Constraint ($r > g$):</span> The discount rate $r$ must strictly exceed the perpetual growth rate $g$. If $g \\ge r$, the common ratio exceeds 1, causing the infinite sum to diverge to infinity.\n• <span className="font-bold text-slate-800">Rule 3 — Denominator Sensitivity:</span> The stock price depends on the spread $(r - g)$. As $g$ approaches $r$, the denominator shrinks toward zero, causing the theoretical price to surge dramatically.',

    '6. <span className="text-indigo-600 font-bold">Unit 5 Review: Catalysts, Expectation Shocks ($\\Delta g, \\Delta r$), & Price Discovery</span>',
    'In live financial markets, stock prices do not stay fixed because economic conditions and company performance are constantly changing. However, stock prices do not simply track past corporate profits; they reflect <span className="text-indigo-600 font-bold">live collective expectations about the future</span>.',
    'When new public information arrives, the market evaluates the news relative to consensus expectations:',
    '$$\\text{News Shock} = \\text{Actual Announcement} - \\text{Expected Consensus}$$',
    'If an announcement matches expectations perfectly, the news shock is zero and the stock price remains stable ("priced in"). If the news surprises the market, investors immediately update their estimates of perpetual growth by $\\Delta g$ or discount rate/risk by $\\Delta r$:',
    '$$P_{\\text{new}} = \\frac{D_1}{(r + \\Delta r) - (g + \\Delta g)}$$',
    'A positive growth shock ($\\Delta g > 0$) or negative risk shock ($\\Delta r < 0$) narrows the denominator spread, driving the stock price up. Conversely, a negative growth shock or positive rate hike ($\\Delta r > 0$) widens the denominator spread, compressing stock valuations.',
    'Because high-growth companies operate with small baseline spreads $(r - g)$, they are mathematically far more sensitive to changes in $r$ and $g$ than mature low-growth companies.',

    '7. <span className="text-indigo-600 font-bold">Summary Test Prep Cheat Sheet & Key Formulas</span>',
    'When preparing for exams or problem sets on Units 1 through 5, keep these key algebraic formulas and concepts handy:',
    '• <span className="font-bold text-slate-800">Compound Future Value:</span> $FV = P(1 + r)^n$\n• <span className="font-bold text-slate-800">Present Value:</span> $PV = \\frac{FV}{(1 + r)^n}$\n• <span className="font-bold text-slate-800">Net Present Value:</span> $NPV = \\sum_{t=1}^{T} \\frac{CF_t}{(1 + r)^t} - C_0$\n• <span className="font-bold text-slate-800">Zero-Growth Perpetuity:</span> $P_0 = \\frac{D}{r}$\n• <span className="font-bold text-slate-800">Gordon Growth Model:</span> $P_0 = \\frac{D_1}{r - g} = \\frac{D_0(1 + g)}{r - g} \\quad (r > g)$\n• <span className="font-bold text-slate-800">Expectation Re-Rating:</span> $P_{\\text{new}} = \\frac{D_1}{(r + \\Delta r) - (g + \\Delta g)}$',
    'By mastering these foundational formulas, you have built a complete quantitative framework for evaluating financial assets and understanding how expectations drive market valuation.'
  ],
  quizzes: []
};
