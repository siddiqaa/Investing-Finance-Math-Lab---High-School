import { compounding } from './lessons/compounding';
import { rateSelection } from './lessons/rateSelection';
import { stockBridge } from './lessons/stockBridge';
import { flatValuation } from './lessons/flatValuation';
import { valuation } from './lessons/valuation';
import { newsBridge } from './lessons/newsBridge';
import { stochastic } from './lessons/stochastic';
import { portfolio } from './lessons/portfolio';
import { behavioral } from './lessons/behavioral';
import { options } from './lessons/options';
import { amortization } from './lessons/amortization';
import { mortgage } from './lessons/mortgage';
import { QuizQuestion } from '../types';

export interface CollatedQuizQuestion extends QuizQuestion {
  unitId: string;
  unitName: string;
  unitBadge: string;
  unitNumber: string;
}

export const SIGMA_QUEST_QUIZZES: CollatedQuizQuestion[] = [
  {
    id: 'quest_sigma_1',
    unitId: 'side_quest_sigma',
    unitName: 'Quest 1: Sigma Summation Notation',
    unitBadge: 'Discrete Sums',
    unitNumber: 'Quest 1',
    question: 'Calculate the value of the finite sum: $\\sum_{i=2}^{5} (2i + 1)$',
    options: ['30', '32', '36', '40'],
    correctIndex: 1,
    explanation: 'We expand the sum starting at $i = 2$ and ending at $i = 5$:\n- For $i = 2$: $2(2) + 1 = 5$\n- For $i = 3$: $2(3) + 1 = 7$\n- For $i = 4$: $2(4) + 1 = 9$\n- For $i = 5$: $2(5) + 1 = 11$\nAdding these terms together: $5 + 7 + 9 + 11 = 32$.',
    hint: 'Substitute $i = 2, 3, 4, \\text{ and } 5$ into $(2i + 1)$, then add the results.'
  },
  {
    id: 'quest_sigma_2',
    unitId: 'side_quest_sigma',
    unitName: 'Quest 1: Sigma Summation Notation',
    unitBadge: 'Discrete Sums',
    unitNumber: 'Quest 1',
    question: 'Which of the following represents the series $3 + 6 + 9 + 12 + 15$ written in Sigma notation?',
    options: ['$\\sum_{i=1}^{5} 3i$', '$\\sum_{i=1}^{5} (i + 3)$', '$\\sum_{i=3}^{15} i$', '$\\sum_{i=0}^{4} 3i$'],
    correctIndex: 0,
    explanation: 'Each term is a multiple of 3: $3(1)=3, 3(2)=6, 3(3)=9, 3(4)=12, 3(5)=15$. This corresponds to $\\sum_{i=1}^{5} 3i$.',
    hint: 'Notice each term is 3 times its position index.'
  },
  {
    id: 'quest_sigma_3',
    unitId: 'side_quest_sigma',
    unitName: 'Quest 1: Sigma Summation Notation',
    unitBadge: 'Discrete Sums',
    unitNumber: 'Quest 1',
    question: 'What is the value of the sum: $\\sum_{j=1}^{4} j^2$?',
    options: ['10', '16', '20', '30'],
    correctIndex: 3,
    explanation: 'Substitute $j = 1, 2, 3, 4$ into $j^2$:\n$1^2 + 2^2 + 3^2 + 4^2 = 1 + 4 + 9 + 16 = 30$.',
    hint: 'Square the numbers 1, 2, 3, and 4, then sum them up.'
  },
  {
    id: 'quest_sigma_4',
    unitId: 'side_quest_sigma',
    unitName: 'Quest 1: Sigma Summation Notation',
    unitBadge: 'Discrete Sums',
    unitNumber: 'Quest 1',
    question: 'In a summation expression like $\\sum_{i=a}^{b} f(i)$, what does the "Index of Summation" represent?',
    options: [
      'The final value where the sum stops accumulating',
      'The variable that acts as a counter, incrementing by 1 at each step of the sum',
      'The formula used to calculate each individual term',
      'The starting value of the summation calculation'
    ],
    correctIndex: 1,
    explanation: 'The Index of Summation ($i, j, k$) is the counter variable that increments by 1 at each step from lower limit $a$ to upper limit $b$.',
    hint: 'Think of $i$ in $\\sum_{i=a}^{b}$ as a loop counter variable.'
  }
];

export const GEOMETRIC_QUEST_QUIZZES: CollatedQuizQuestion[] = [
  {
    id: 'quest_geom_1',
    unitId: 'side_quest_geometric',
    unitName: 'Quest 2: Geometric Series & Convergence',
    unitBadge: 'Infinite Series',
    unitNumber: 'Quest 2',
    question: 'In a geometric series with first term $a = 100$ and common ratio $x = 0.5$, what is the sum out to infinity?',
    options: ['100', '150', '200', 'Infinity'],
    correctIndex: 2,
    explanation: 'Using the infinite geometric series formula $S = \\frac{a}{1 - x}$: $S = \\frac{100}{1 - 0.5} = \\frac{100}{0.5} = 200$.',
    hint: 'Apply the formula: $S = a / (1 - x)$.'
  },
  {
    id: 'quest_geom_2',
    unitId: 'side_quest_geometric',
    unitName: 'Quest 2: Geometric Series & Convergence',
    unitBadge: 'Infinite Series',
    unitNumber: 'Quest 2',
    question: 'What is the crucial condition for an infinite geometric series to converge to a finite number?',
    options: [
      'The first term $a$ must be less than 1',
      'The common ratio $x$ must be exactly 1',
      'The absolute value of the ratio $|x|$ must be less than 1 ($-1 < x < 1$)',
      'The ratio $x$ must be greater than 1'
    ],
    correctIndex: 2,
    explanation: 'For the sum not to blow up to infinity, each term must shrink towards 0, which requires $|x| < 1$.',
    hint: 'Terms must shrink as $n$ approaches infinity.'
  },
  {
    id: 'quest_geom_3',
    unitId: 'side_quest_geometric',
    unitName: 'Quest 2: Geometric Series & Convergence',
    unitBadge: 'Infinite Series',
    unitNumber: 'Quest 2',
    question: 'If a stock pays a constant dividend of \\$2 (so $a = \\frac{2}{1+r}$) and the discount rate is $r = 0.10$, making the ratio $x = \\frac{1}{1.10}$, what does the series sum to?',
    options: ['\\$2.00', '\\$10.00', '\\$20.00', '\\$22.00'],
    correctIndex: 2,
    explanation: 'The infinite sum simplifies algebraically to $P_0 = \\frac{D}{r} = \\frac{\\$2}{0.10} = \\$20.00$.',
    hint: 'Recall the Zero-Growth Perpetuity formula $P_0 = D / r$.'
  }
];

export const GORDON_QUEST_QUIZZES: CollatedQuizQuestion[] = [
  {
    id: 'quest_gordon_1',
    unitId: 'side_quest_gordon',
    unitName: 'Quest 3: Gordon Growth Formula Derivation',
    unitBadge: 'Gordon Growth',
    unitNumber: 'Quest 3',
    question: 'A company pays a constant dividend of $\\$3.00$ per year forever ($g = 0\\%$). If your discount rate is $6\\%$ ($0.06$), what is the fair price of the stock under the simple perpetuity model?',
    options: ['\\$18.00', '\\$50.00', '\\$30.00', '\\$180.00'],
    correctIndex: 1,
    explanation: 'Under $g = 0\\%$, $P_0 = \\frac{D}{r} = \\frac{\\$3.00}{0.06} = \\$50.00$.',
    hint: 'Divide the dividend $\$3.00$ by $0.06$.'
  },
  {
    id: 'quest_gordon_2',
    unitId: 'side_quest_gordon',
    unitName: 'Quest 3: Gordon Growth Formula Derivation',
    unitBadge: 'Gordon Growth',
    unitNumber: 'Quest 3',
    question: 'A company is expected to pay a dividend of $D_1 = \\$2.10$ next year ($t = 1$). Its dividend is expected to grow at $g = 4\\%$ ($0.04$) forever. If your discount rate is $7\\%$ ($0.07$), what is the value using the Gordon Growth Formula?',
    options: ['\\$30.00', '\\$70.00', '\\$52.50', '\\$21.00'],
    correctIndex: 1,
    explanation: 'Using $P_0 = \\frac{D_1}{r - g} = \\frac{\\$2.10}{0.07 - 0.04} = \\frac{\\$2.10}{0.03} = \\$70.00$.',
    hint: 'You are given $D_1$ directly, so divide $\$2.10$ by $(0.07 - 0.04) = 0.03$.'
  },
  {
    id: 'quest_gordon_3',
    unitId: 'side_quest_gordon',
    unitName: 'Quest 3: Gordon Growth Formula Derivation',
    unitBadge: 'Gordon Growth',
    unitNumber: 'Quest 3',
    question: 'A company just paid a dividend of $D_0 = \\$4.00$ today ($t = 0$). The dividend grows at $g = 5\\%$ ($0.05$). If your required rate of return is $9\\%$ ($0.09$), what is the stock value today?',
    options: ['\\$100.00', '\\$105.00', '\\$80.00', '\\$44.00'],
    correctIndex: 1,
    explanation: 'First calculate $D_1 = D_0(1+g) = \\$4.00 \\times 1.05 = \\$4.20$. Then $P_0 = \\frac{\\$4.20}{0.09 - 0.05} = \\frac{\\$4.20}{0.04} = \\$105.00$.',
    hint: 'Grow $D_0 = \$4.00$ by $5\\%$ to find $D_1 = \$4.20$, then divide by $0.04$.'
  },
  {
    id: 'quest_gordon_4',
    unitId: 'side_quest_gordon',
    unitName: 'Quest 3: Gordon Growth Formula Derivation',
    unitBadge: 'Gordon Growth',
    unitNumber: 'Quest 3',
    question: 'What mathematical phenomenon occurs in the Gordon Growth model if a company\'s dividend growth rate $g$ is equal to or greater than the discount rate $r$ ($g \\ge r$)?',
    options: [
      'The formula yields a negative price, representing a short-selling opportunity.',
      'The stock price drops to exactly zero because the company is growing too fast.',
      'The infinite series of future discounted dividends diverges to infinity, meaning the formula breaks and cannot yield a valid finite price.',
      'The price is calculated by taking the reciprocal of simple perpetuity: $P_0 = \\frac{r}{g}$.'
    ],
    correctIndex: 2,
    explanation: 'When $g \\ge r$, the common ratio of the geometric series $x = \\frac{1+g}{1+r} \\ge 1$, causing the infinite series to diverge to infinity.',
    hint: 'Think about what happens when the common ratio $x \\ge 1$ in an infinite geometric series.'
  }
];

export const ALL_COLLATED_QUIZZES: CollatedQuizQuestion[] = [
  ...compounding.quizzes.map(q => ({
    ...q,
    unitId: 'compounding',
    unitName: 'Unit 1: Time Value of Money & Compound Growth',
    unitBadge: 'Exponents & Percentages',
    unitNumber: '1'
  })),
  ...rateSelection.quizzes.map(q => ({
    ...q,
    unitId: 'rateSelection',
    unitName: 'Unit 2: Selecting the Discount Rate (r)',
    unitBadge: 'Savings & Opportunity Cost',
    unitNumber: '2'
  })),
  ...stockBridge.quizzes.map(q => ({
    ...q,
    unitId: 'stockBridge',
    unitName: 'Unit 3: Bridging to Stocks',
    unitBadge: 'Fractional Ownership',
    unitNumber: '3'
  })),
  ...flatValuation.quizzes.map(q => ({
    ...q,
    unitId: 'flatValuation',
    unitName: 'Unit 3.5: Zero-Growth Stock Valuation',
    unitBadge: 'Flat Dividends & Perpetuities',
    unitNumber: '3.5'
  })),
  ...valuation.quizzes.map(q => ({
    ...q,
    unitId: 'valuation',
    unitName: 'Unit 4: Stock Price Valuation & Gordon Growth',
    unitBadge: 'Gordon Growth Perpetuities',
    unitNumber: '4'
  })),
  ...newsBridge.quizzes.map(q => ({
    ...q,
    unitId: 'newsBridge',
    unitName: 'Unit 5: Catalysts & News Shocks',
    unitBadge: 'Information & Shocks',
    unitNumber: '5'
  })),
  ...stochastic.quizzes.map(q => ({
    ...q,
    unitId: 'stochastic',
    unitName: 'Unit 6: Stock Prices & Randomness',
    unitBadge: 'Market Randomness & GBM',
    unitNumber: '6'
  })),
  ...portfolio.quizzes.map(q => ({
    ...q,
    unitId: 'portfolio',
    unitName: 'Unit 7: Portfolio Diversification & Risk',
    unitBadge: 'Efficient Frontier & Beta',
    unitNumber: '7'
  })),
  ...behavioral.quizzes.map(q => ({
    ...q,
    unitId: 'behavioral',
    unitName: 'Unit 8: Behavioral Finance & Market Crowds',
    unitBadge: 'Irrationality & Cascades',
    unitNumber: '8'
  })),
  ...options.quizzes.map(q => ({
    ...q,
    unitId: 'options',
    unitName: 'Bonus Unit A: Options & Black-Scholes Pricing',
    unitBadge: 'Options & Payoffs',
    unitNumber: 'Bonus A'
  })),
  ...amortization.quizzes.map(q => ({
    ...q,
    unitId: 'amortization',
    unitName: 'Bonus Unit B: Auto Loans & TCO',
    unitBadge: 'Auto Amortization',
    unitNumber: 'Bonus B'
  })),
  ...mortgage.quizzes.map(q => ({
    ...q,
    unitId: 'mortgage',
    unitName: 'Bonus Unit C: Mortgages & Homeownership',
    unitBadge: 'Mortgage Math & Equity',
    unitNumber: 'Bonus C'
  })),
  ...SIGMA_QUEST_QUIZZES,
  ...GEOMETRIC_QUEST_QUIZZES,
  ...GORDON_QUEST_QUIZZES
];
