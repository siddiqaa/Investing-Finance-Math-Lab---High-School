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

export const PRODUCT_QUEST_QUIZZES: CollatedQuizQuestion[] = [
  {
    id: 'quest_pi_1',
    unitId: 'side_quest_pi',
    unitName: 'Quest 3.5: Capital Pi (∏) & Multiplicative Product Series',
    unitBadge: 'Multiplicative Series',
    unitNumber: 'Quest 3.5',
    question: 'What does the Capital Pi symbol ($\\prod_{k=1}^t$) denote in the stock price equation $S_t = S_0 \\prod_{k=1}^t (1+r_k)$?',
    options: [
      'The sum of all daily return percentages $r_1 + r_2 + \\dots + r_t$',
      'The product of all consecutive daily growth factors $(1+r_1)(1+r_2)\\dots(1+r_t)$',
      'The geometric series sum of future discounted dividend cash flows',
      'The variance of daily stock price fluctuations around the mean'
    ],
    correctIndex: 1,
    explanation: 'Capital Pi ($\\prod$) represents sequential multiplication of growth factors $(1+r_k)$ across periods.',
    hint: 'Pi stands for Product (multiplication), just as Sigma stands for Sum (addition).'
  },
  {
    id: 'quest_pi_2',
    unitId: 'side_quest_pi',
    unitName: 'Quest 3.5: Capital Pi (∏) & Multiplicative Product Series',
    unitBadge: 'Multiplicative Series',
    unitNumber: 'Quest 3.5',
    question: 'How do financial economists transform a Capital Pi product ($\\prod$) into a simple Capital Sigma sum ($\\sum$)?',
    options: [
      'By multiplying all returns by 100',
      'By taking the natural logarithm ($\\ln$) of both sides of the equation',
      'By taking the square root of all return percentages',
      'By dividing by total elapsed years'
    ],
    correctIndex: 1,
    explanation: 'Since $\\ln(a \\cdot b) = \\ln(a) + \\ln(b)$, taking natural logarithms transforms $\\ln(S_t) = \\ln(S_0) + \\sum_{k=1}^t \\ln(1+r_k)$, converting multiplication into addition of log-returns.',
    hint: 'Recall the algebraic identity for $\\ln(a \\cdot b)$.'
  }
];

export const VARIANCE_QUEST_QUIZZES: CollatedQuizQuestion[] = [
  {
    id: 'quest_var_1',
    unitId: 'side_quest_variance',
    unitName: 'Quest 4: Variance & Covariance Algebra',
    unitBadge: 'Algebra II Statistics',
    unitNumber: 'Quest 4',
    question: 'Suppose a dataset of 3 stock returns is $x = [4\\%, 7\\%, 10\\%]$. What is the mean return $\\bar{x}$ and population variance $\\text{Var}(X)$?',
    options: [
      'Mean = 7%, Variance = 6%²',
      'Mean = 7%, Variance = 9%²',
      'Mean = 6%, Variance = 8%²',
      'Mean = 8%, Variance = 12%²'
    ],
    correctIndex: 0,
    explanation: '1. Mean $\\bar{x} = \\frac{4 + 7 + 10}{3} = \\frac{21}{3} = 7\\%$.\n2. Deviations $(x_i - \\bar{x})$: $(4-7) = -3$, $(7-7) = 0$, $(10-7) = +3$.\n3. Squared Deviations: $(-3)^2 = 9$, $0^2 = 0$, $3^2 = 9$.\n4. Sum of Squared Deviations $= 9 + 0 + 9 = 18$.\n5. Variance $\\text{Var}(X) = \\frac{18}{3} = 6\\%^2$.',
    hint: 'Calculate the average first, subtract the average from each number, square those differences, and take their average.'
  },
  {
    id: 'quest_var_2',
    unitId: 'side_quest_variance',
    unitName: 'Quest 4: Variance & Covariance Algebra',
    unitBadge: 'Algebra II Statistics',
    unitNumber: 'Quest 4',
    question: 'Two assets $X$ and $Y$ have returns over 3 years: $X = [12\\%, 8\\%, 4\\%]$ (mean = $8\\%$) and $Y = [2\\%, 6\\%, 10\\%]$ (mean = $6\\%$). What is the population covariance $\\text{Cov}(X, Y)$?',
    options: [
      '$-10.67\\%^2$',
      '$-16.00\\%^2$',
      '$+8.00\\%^2$',
      '$0.00\\%^2$'
    ],
    correctIndex: 0,
    explanation: '1. Deviations for $X$: $(12-8) = +4$, $(8-8) = 0$, $(4-8) = -4$.\n2. Deviations for $Y$: $(2-6) = -4$, $(6-6) = 0$, $(10-6) = +4$.\n3. Products of Deviations: $(+4)(-4) = -16$, $(0)(0) = 0$, $(-4)(+4) = -16$.\n4. Sum of Products $= -16 + 0 - 16 = -32$.\n5. Population Covariance $\\text{Cov}(X,Y) = \\frac{-32}{3} = -10.67\\%^2$.',
    hint: 'Multiply the deviation of $X$ by the deviation of $Y$ for each year, add them together, and divide by 3.'
  },
  {
    id: 'quest_var_3',
    unitId: 'side_quest_variance',
    unitName: 'Quest 4: Variance & Covariance Algebra',
    unitBadge: 'Algebra II Statistics',
    unitNumber: 'Quest 4',
    question: 'If covariance $\\text{Cov}(X,Y) = -12.0$, standard deviation $\\sigma_X = 4.0$, and standard deviation $\\sigma_Y = 3.0$, what is the correlation coefficient $\\rho_{X,Y}$?',
    options: [
      '$-1.0$',
      '$-0.5$',
      '$+0.8$',
      '$0.0$'
    ],
    correctIndex: 0,
    explanation: 'Using the correlation formula $\\rho_{X,Y} = \\frac{\\text{Cov}(X,Y)}{\\sigma_X \\cdot \\sigma_Y}$:\n$$\\rho_{X,Y} = \\frac{-12.0}{4.0 \\times 3.0} = \\frac{-12.0}{12.0} = -1.0$$\nThe two assets have perfect negative linear correlation.',
    hint: 'Divide covariance by the product of the two standard deviations: $\\sigma_X \\times \\sigma_Y$.'
  },
  {
    id: 'quest_var_4',
    unitId: 'side_quest_variance',
    unitName: 'Quest 4: Variance & Covariance Algebra',
    unitBadge: 'Algebra II Statistics',
    unitNumber: 'Quest 4',
    question: 'Why is the covariance $\\text{Cov}(X,Y)$ negative when asset $X$ is consistently above its mean while asset $Y$ is below its mean?',
    options: [
      'Because the product of a positive deviation $(x_i - \\bar{x}) > 0$ and a negative deviation $(y_i - \\bar{y}) < 0$ is always mathematically negative',
      'Because negative numbers are always larger than positive numbers in portfolio theory',
      'Because interest rates drop whenever covariance is calculated',
      'Because standard deviation forces covariance to switch signs automatically'
    ],
    correctIndex: 0,
    explanation: 'By basic arithmetic, $(\\text{Positive}) \\times (\\text{Negative}) = \\text{Negative}$. When one asset exceeds its average while the other falls below its average, their cross-product is negative, pulling the total covariance below zero.',
    hint: 'Recall the rule of signs in algebra: a positive number times a negative number produces a negative result.'
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
  ...GORDON_QUEST_QUIZZES,
  ...PRODUCT_QUEST_QUIZZES,
  ...VARIANCE_QUEST_QUIZZES
];
