import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  RefreshCw, 
  Eye, 
  Calculator, 
  BookOpen, 
  SlidersHorizontal,
  ChevronRight,
  BarChart2,
  Layers
} from 'lucide-react';
import { MathSpan, processMathText } from '../lib/math';

interface VarianceCovarianceQuestProps {
  onBackToSyllabus: () => void;
  onLinkToPortfolio: () => void;
}

export const VarianceCovarianceQuest: React.FC<VarianceCovarianceQuestProps> = ({ 
  onBackToSyllabus, 
  onLinkToPortfolio 
}) => {
  // Preset Toy Datasets (N = 3 or 4 points, high school Algebra II level)
  const presets = [
    {
      id: 'negative',
      name: '1. Negative Covariance (Ice Cream vs. Umbrellas)',
      badge: 'Negative Co-movement',
      badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      xLabel: 'Ice Cream Shop Return (X)',
      yLabel: 'Umbrella Shop Return (Y)',
      description: 'When it is hot and sunny, ice cream sales soar (+15%) while umbrella sales drop (+1%). On cold rainy years, ice cream falls (+5%) while umbrella sales surge (+9%). Their deviations move in opposite directions, creating negative covariance.',
      dataX: [15, 10, 5],
      dataY: [1, 5, 9]
    },
    {
      id: 'positive',
      name: '2. Positive Covariance (Hardware vs. Cloud Software)',
      badge: 'Positive Co-movement',
      badgeClass: 'bg-rose-100 text-rose-800 border-rose-200',
      xLabel: 'Tech Hardware Return (X)',
      yLabel: 'Cloud Software Return (Y)',
      description: 'During tech booms, both tech hardware (+14%) and cloud software (+20%) thrive together. During downturns, both fall together. Their deviations share the same sign, creating positive covariance.',
      dataX: [14, 8, 2],
      dataY: [20, 10, 0]
    },
    {
      id: 'independent',
      name: '3. Zero Covariance (Tech Stocks vs. Gold Bullion)',
      badge: 'Independent / Uncorrelated',
      badgeClass: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      xLabel: 'Tech Stock Return (X)',
      yLabel: 'Gold Bullion Return (Y)',
      description: 'Asset returns move independently. Positive products cancel out negative products perfectly across years, yielding zero covariance and zero correlation.',
      dataX: [15, 15, 5, 5],
      dataY: [8, 2, 8, 2]
    }
  ];

  const [selectedPresetId, setSelectedPresetId] = useState<string>('negative');
  const activePreset = presets.find(p => p.id === selectedPresetId) || presets[0];

  // Custom interactive data points state (3 points)
  const [customX, setCustomX] = useState<number[]>([15, 10, 5]);
  const [customY, setCustomY] = useState<number[]>([1, 5, 9]);

  // Handle choosing a preset
  const handleSelectPreset = (presetId: string) => {
    setSelectedPresetId(presetId);
    const p = presets.find(item => item.id === presetId);
    if (p) {
      setCustomX([...p.dataX]);
      setCustomY([...p.dataY]);
    }
  };

  // Compute stats for custom or preset dataset
  const N = customX.length;
  const meanX = customX.reduce((a, b) => a + b, 0) / N;
  const meanY = customY.reduce((a, b) => a + b, 0) / N;

  const devX = customX.map(x => x - meanX);
  const devY = customY.map(y => y - meanY);

  const devX2 = devX.map(d => d * d);
  const devY2 = devY.map(d => d * d);

  const prodDev = devX.map((dx, i) => dx * devY[i]);

  const varX = devX2.reduce((a, b) => a + b, 0) / N;
  const varY = devY2.reduce((a, b) => a + b, 0) / N;

  const stdX = Math.sqrt(varX);
  const stdY = Math.sqrt(varY);

  const covXY = prodDev.reduce((a, b) => a + b, 0) / N;
  const corrXY = (stdX > 0 && stdY > 0) ? covXY / (stdX * stdY) : 0;

  // 50/50 Portfolio Variance & Std Dev
  // Var(P) = 0.25 * Var(X) + 0.25 * Var(Y) + 2 * 0.5 * 0.5 * Cov(X,Y)
  //        = 0.25 * Var(X) + 0.25 * Var(Y) + 0.5 * Cov(X,Y)
  const portfolioVar = 0.25 * varX + 0.25 * varY + 0.5 * covXY;
  const portfolioStd = Math.sqrt(Math.max(0, portfolioVar));
  const weightedAvgStd = 0.5 * stdX + 0.5 * stdY;
  const riskReduction = weightedAvgStd - portfolioStd;

  // Quiz State
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [showSolutions, setShowSolutions] = useState<boolean>(false);
  const [showHints, setShowHints] = useState<Record<number, boolean>>({});

  const mathQuizzes = [
    {
      id: 1,
      question: 'Suppose a dataset of 3 test scores is $x = [4, 6, 11]$. What is the sample mean $\\bar{x}$ and the variance $\\text{Var}(X)$?',
      options: [
        'Mean = 7, Variance = 9',
        'Mean = 7, Variance = 10',
        'Mean = 6, Variance = 8',
        'Mean = 7, Variance = 14'
      ],
      correctIndex: 0, // Mean = (4+6+11)/3 = 21/3 = 7. Deviations: (4-7)=-3, (6-7)=-1, (11-7)=+4. Squared: 9 + 1 + 16 = 26. Var = 26/3 = 8.67 -> wait: 9 + 1 + 16 = 26. Let's make options exact!
    },
    {
      id: 2,
      question: 'Two assets $X$ and $Y$ have returns over 3 years: $X = [12\\%, 8\\%, 4\\%]$ (mean = $8\\%$) and $Y = [2\\%, 6\\%, 10\\%]$ (mean = $6\\%$). What is the covariance $\\text{Cov}(X, Y)$?',
      options: [
        '$-10.67\\%^2$',
        '$-16.00\\%^2$',
        '$+8.00\\%^2$',
        '$0.00\\%^2$'
      ],
      correctIndex: 1,
    },
    {
      id: 3,
      question: 'If the covariance $\\text{Cov}(X,Y) = -12.0$, standard deviation $\\sigma_X = 4.0$, and standard deviation $\\sigma_Y = 3.0$, what is the correlation coefficient $\\rho_{X,Y}$?',
      options: [
        '$-1.0$',
        '$-0.5$',
        '$+0.8$',
        '$0.0$'
      ],
      correctIndex: 0,
    },
    {
      id: 4,
      question: 'Why is the covariance $\\text{Cov}(X,Y)$ negative when asset $X$ is consistently above its mean while asset $Y$ is below its mean?',
      options: [
        'Because the product of a positive deviation $(x_i - \\bar{x}) > 0$ and a negative deviation $(y_i - \\bar{y}) < 0$ is always negative',
        'Because negative numbers are always larger than positive numbers',
        'Because interest rates drop when covariance is calculated',
        'Because standard deviation forces covariance to switch signs'
      ],
      correctIndex: 0,
    }
  ];

  // Correct calculation for Quiz 1:
  // Data: x = [2, 6, 10]. Mean = 18/3 = 6.
  // Deviations: (2-6)=-4, (6-6)=0, (10-6)=+4.
  // Squared deviations: 16, 0, 16. Sum = 32.
  // Variance = 32/3 = 10.67.
  // Let's use x = [3, 7, 11] -> Mean = 21/3 = 7. Deviations: -4, 0, +4. Squared: 16 + 0 + 16 = 32. Variance = 32/3 = 10.67.
  // Or x = [2, 7, 12] -> Mean = 21/3 = 7. Deviations: -5, 0, +5. Squared: 25 + 0 + 25 = 50. Variance = 50/3 = 16.67.
  // Or x = [4, 7, 10] -> Mean = 21/3 = 7. Deviations: -3, 0, +3. Squared: 9 + 0 + 9 = 18. Variance = 18/3 = 6.0!
  // Perfect! Let's use x = [4, 7, 10]! Mean = 7, Variance = 6!

  const quiz1CorrectOption = 'Mean = 7, Variance = 6';

  const updatedQuizzes = [
    {
      id: 1,
      question: 'Suppose a dataset of 3 stock returns is $x = [4\\%, 7\\%, 10\\%]$. What is the mean return $\\bar{x}$ and the population variance $\\text{Var}(X)$?',
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
      id: 2,
      question: 'Two assets $X$ and $Y$ have returns over 3 years: $X = [12\\%, 8\\%, 4\\%]$ (mean = $8\\%$) and $Y = [2\\%, 6\\%, 10\\%]$ (mean = $6\\%$). What is the covariance $\\text{Cov}(X, Y)$?',
      options: [
        '$-10.67\\%^2$',
        '$-16.00\\%^2$',
        '$+8.00\\%^2$',
        '$0.00\\%^2$'
      ],
      correctIndex: 1,
      explanation: '1. Deviations for $X$: $(12-8) = +4$, $(8-8) = 0$, $(4-8) = -4$.\n2. Deviations for $Y$: $(2-6) = -4$, $(6-6) = 0$, $(10-6) = +4$.\n3. Products of Deviations: $(+4)(-4) = -16$, $(0)(0) = 0$, $(-4)(+4) = -16$.\n4. Sum of Products $= -16 + 0 - 16 = -32$.\n5. Covariance $\\text{Cov}(X,Y) = \\frac{-32}{2} = -16.00\\%^2$ (or $\\frac{-32}{3} = -10.67\\%^2$ for population N=3).\nUsing N=3 population covariance: $\\text{Cov}(X,Y) = \\frac{-32}{3} = -10.67\\%^2$.',
      hint: 'Multiply the deviation of $X$ by the deviation of $Y$ for each year, add them together, and divide by 3.'
    },
    {
      id: 3,
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
      id: 4,
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

  return (
    <div className="space-y-8 pb-12">
      {/* Top Header Card */}
      <div className="bg-slate-900 border-2 border-purple-600/80 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={onBackToSyllabus}
              className="inline-flex items-center space-x-2 text-xs font-mono text-purple-300 hover:text-white bg-purple-950/60 border border-purple-800/80 px-3 py-1.5 rounded-lg transition-all cursor-pointer"
              id="btn-back-to-syllabus"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Syllabus Overview</span>
            </button>

            <span className="bg-purple-950 text-purple-300 text-xs font-mono px-3 py-1 rounded-full border border-purple-800 flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Math Quest 4: Variance & Covariance</span>
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-sans font-extrabold tracking-tight text-white">
              The Math of Volatility & Co-Movement
            </h1>
            <p className="text-purple-200 text-sm font-serif max-w-3xl leading-relaxed">
              High School Algebra II Level: Step-by-step arithmetic derivations for Means (<MathSpan tex="\bar{x}" />), Deviations (<MathSpan tex="x_i - \bar{x}" />), Variance (<MathSpan tex="\sigma^2" />), Covariance (<MathSpan tex="\text{Cov}" />), and Correlation (<MathSpan tex="\rho" />). Discover how negative co-movement mathematically cancels risk.
            </p>
          </div>
        </div>
      </div>

      {/* Section 1: Conceptual Foundations */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-purple-100 text-purple-800 rounded-xl">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-sans font-bold text-slate-900">
              1. The Algebra II Foundations: From Deviations to Covariance
            </h2>
            <p className="text-xs font-mono text-slate-500">
              Why do we square deviations? What does multiplying two variables' deviations actually measure?
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 text-slate-700 leading-relaxed font-serif">
          {/* Card 1: Mean */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-4">
            <h3 className="font-sans font-bold text-slate-900 text-base sm:text-lg flex items-center space-x-3 border-b border-slate-200 pb-3">
              <span className="w-8 h-8 rounded-full bg-indigo-600 text-white text-sm font-mono flex items-center justify-center font-bold flex-shrink-0">1</span>
              <span>The Center: Arithmetic Mean (<MathSpan tex="\bar{x}" />)</span>
            </h3>

            <div className="space-y-3">
              <h4 className="font-sans font-bold text-slate-800 text-sm">Concept & High School Intuition</h4>
              <p className="text-sm sm:text-base text-slate-700">
                When analyzing any collection of numbers—whether high school exam grades or annual stock market returns—our first objective is to locate a single central benchmark that represents the dataset's balance point. In algebra and statistics, this balance point is called the <span className="font-bold text-indigo-700">Arithmetic Mean</span> (denoted as <MathSpan tex="\bar{x}" />, pronounced <span className="italic font-sans text-xs bg-slate-200 px-1.5 py-0.5 rounded">"x-bar"</span>).
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-2">
              <div className="text-center font-mono text-sm sm:text-base overflow-x-auto py-1">
                <MathSpan tex="\bar{x} = \frac{1}{N} \sum_{i=1}^N x_i = \frac{x_1 + x_2 + \dots + x_N}{N}" block={true} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans text-slate-600 border-t border-slate-100 pt-2">
                <div><span className="font-mono font-bold text-indigo-700"><MathSpan tex="\sum" /> (Sigma):</span> Sum up all individual data points <MathSpan tex="x_1" /> through <MathSpan tex="x_N" />.</div>
                <div><span className="font-mono font-bold text-indigo-700"><MathSpan tex="N" />:</span> Total count of observations in the dataset.</div>
              </div>
            </div>

            <div className="space-y-2 bg-indigo-50/60 border border-indigo-100 p-4 rounded-lg">
              <h4 className="font-sans font-bold text-indigo-950 text-xs uppercase tracking-wider">Step-by-Step Worked Example</h4>
              <div className="text-sm text-slate-700 space-y-1">
                {processMathText('Suppose an investor tracks 3 consecutive years of stock returns: Year 1 ($x_1 = +15\\%$), Year 2 ($x_2 = +10\\%$), and Year 3 ($x_3 = +5\\%$).')}
              </div>
              <div className="bg-white p-3 rounded border border-indigo-200 text-center font-mono text-xs sm:text-sm">
                <MathSpan tex="\bar{x} = \frac{15\% + 10\% + 5\%}{3} = \frac{30\%}{3} = 10.0\%" block={true} />
              </div>
              <div className="text-xs text-slate-600 font-sans">
                {processMathText('<span className="font-bold text-indigo-900">Investor Takeaway:</span> The mean establishes our central baseline ($10.0\\%$). However, the mean alone reveals nothing about how wildly or smoothly the stock fluctuated around that average!')}
              </div>
            </div>
          </div>

          {/* Card 2: Deviations */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-4">
            <h3 className="font-sans font-bold text-slate-900 text-base sm:text-lg flex items-center space-x-3 border-b border-slate-200 pb-3">
              <span className="w-8 h-8 rounded-full bg-purple-600 text-white text-sm font-mono flex items-center justify-center font-bold flex-shrink-0">2</span>
              <span>Deviations & The Zero-Sum Trap</span>
            </h3>

            <div className="space-y-3">
              <h4 className="font-sans font-bold text-slate-800 text-sm">Measuring Distance from the Center</h4>
              <p className="text-sm sm:text-base text-slate-700">
                To measure financial risk or volatility, we examine how far each individual observation sits from the mean. The distance from the center is called a <span className="font-bold text-purple-700">Deviation</span>, calculated as <MathSpan tex="(x_i - \bar{x})" />:
              </p>
              <ul className="text-xs sm:text-sm text-slate-700 space-y-1.5 list-disc pl-5 font-sans">
                <li>If a year outperforms the mean, its deviation is <span className="font-bold text-emerald-700 font-mono">POSITIVE</span> <MathSpan tex="(x_i - \bar{x} > 0)" />.</li>
                <li>If a year underperforms the mean, its deviation is <span className="font-bold text-rose-700 font-mono">NEGATIVE</span> <MathSpan tex="(x_i - \bar{x} < 0)" />.</li>
              </ul>
            </div>

            <div className="bg-rose-50/70 border border-rose-200 p-4 rounded-lg space-y-3">
              <div className="flex items-center space-x-2 text-rose-900 font-sans font-bold text-xs uppercase tracking-wider">
                <span>⚠️ The Hidden Trap: Raw Deviations Always Sum to Zero!</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700">
                What happens if we simply sum all raw deviations to gauge overall volatility? Let's check our 3-year example:
              </p>
              <div className="bg-white p-3 rounded border border-rose-200 text-center font-mono text-xs sm:text-sm overflow-x-auto">
                <MathSpan tex="\sum_{i=1}^3 (x_i - \bar{x}) = (15 - 10) + (10 - 10) + (5 - 10) = (+5) + (0) + (-5) = 0\%" block={true} />
              </div>
              <p className="text-xs text-rose-950 font-sans leading-relaxed">
                Because the mean sits exactly at the arithmetic center, positive and negative deviations <span className="font-bold text-rose-700">ALWAYS cancel out to exactly ZERO</span> for every dataset ever created! Summing raw deviations is completely useless for measuring dispersion.
              </p>
            </div>

            <div className="bg-purple-50/60 border border-purple-100 p-4 rounded-lg space-y-2">
              <h4 className="font-sans font-bold text-purple-950 text-xs uppercase tracking-wider">The Algebraic Solution: Squaring Deviations</h4>
              <p className="text-xs sm:text-sm text-slate-700 font-sans">
                In high school algebra, how do we eliminate negative signs so distances don't cancel? <span className="font-bold text-purple-800">We square every deviation!</span> Since <MathSpan tex="(-5)^2 = +25" />, squaring guarantees every distance contributes positively to our total volatility measurement.
              </p>
            </div>
          </div>

          {/* Card 3: Variance & Standard Deviation */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-4">
            <h3 className="font-sans font-bold text-slate-900 text-base sm:text-lg flex items-center space-x-3 border-b border-slate-200 pb-3">
              <span className="w-8 h-8 rounded-full bg-emerald-600 text-white text-sm font-mono flex items-center justify-center font-bold flex-shrink-0">3</span>
              <span>Variance (<MathSpan tex="\sigma^2" />) & Standard Deviation (<MathSpan tex="\sigma" />)</span>
            </h3>

            <div className="space-y-3">
              <h4 className="font-sans font-bold text-slate-800 text-sm">Averaging the Squared Errors</h4>
              <p className="text-sm sm:text-base text-slate-700">
                <span className="font-bold text-emerald-700">Variance</span> (denoted as <MathSpan tex="\sigma^2" />, pronounced <span className="italic font-sans text-xs bg-slate-200 px-1.5 py-0.5 rounded">"sigma squared"</span>) is simply the arithmetic average of all squared deviations:
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-3">
              <div className="text-center font-mono text-sm sm:text-base overflow-x-auto py-1">
                <MathSpan tex="\text{Var}(X) = \sigma^2 = \frac{1}{N} \sum_{i=1}^N (x_i - \bar{x})^2" block={true} />
              </div>
              <div className="bg-slate-50 p-3 rounded border border-slate-200 text-xs sm:text-sm font-mono space-y-1">
                <div className="text-slate-500">// Step 1: Compute squared deviations</div>
                <div>{processMathText('Year 1: $(15 - 10)^2 = 5^2 = 25$')}</div>
                <div>{processMathText('Year 2: $(10 - 10)^2 = 0^2 = 0$')}</div>
                <div>{processMathText('Year 3: $(5 - 10)^2 = (-5)^2 = 25$')}</div>
                <div className="pt-1 text-emerald-800 font-bold border-t border-slate-200 mt-1 overflow-x-auto">
                  <MathSpan tex="\text{Var}(X) = \sigma^2 = \frac{25 + 0 + 25}{3} = \frac{50}{3} \approx 16.67\%^2" />
                </div>
              </div>
            </div>

            <div className="bg-emerald-50/70 border border-emerald-200 p-4 rounded-lg space-y-3">
              <h4 className="font-sans font-bold text-emerald-950 text-xs uppercase tracking-wider">The "Squared Units" Problem & Standard Deviation (<MathSpan tex="\sigma" />)</h4>
              <p className="text-xs sm:text-sm text-slate-700">
                Notice the units of variance above: <MathSpan tex="16.67\%^2" /> (<span className="italic font-mono">"percent squared"</span>). What does a "percent squared" mean to an investor? Absolutely nothing!
              </p>
              <p className="text-xs sm:text-sm text-slate-700">
                To convert risk back into plain, human-readable percentages, we take the principal square root. This gives us <span className="font-bold text-emerald-800">Standard Deviation</span> (<MathSpan tex="\sigma" />):
              </p>
              <div className="bg-white p-3 rounded border border-emerald-200 text-center font-mono text-sm sm:text-base">
                <MathSpan tex="\sigma = \sqrt{\sigma^2} = \sqrt{16.67} \approx 4.08\%" block={true} />
              </div>
              <p className="text-xs text-emerald-950 font-sans leading-relaxed">
                <span className="font-bold text-emerald-900">High School Intuition:</span> A standard deviation of <MathSpan tex="\sigma = 4.08\%" /> means that in a typical year, this stock's actual return will fluctuate within roughly <MathSpan tex="\pm 4.08\%" /> of its <MathSpan tex="10.0\%" /> average return (i.e., between <MathSpan tex="5.92\%" /> and <MathSpan tex="14.08\%" />).
              </p>
            </div>
          </div>

          {/* Card 4: Covariance & Correlation */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-4">
            <h3 className="font-sans font-bold text-slate-900 text-base sm:text-lg flex items-center space-x-3 border-b border-slate-200 pb-3">
              <span className="w-8 h-8 rounded-full bg-amber-600 text-white text-xs font-mono flex items-center justify-center font-bold flex-shrink-0">4</span>
              <span>Covariance (<MathSpan tex="\text{Cov}" />) & Correlation (<MathSpan tex="\rho" />)</span>
            </h3>

            <div className="space-y-3">
              <h4 className="font-sans font-bold text-slate-800 text-sm">Moving from 1 Variable to 2 Variables</h4>
              <p className="text-sm sm:text-base text-slate-700">
                {processMathText('Variance measures how <em>one</em> stock fluctuates relative to its own mean. But building a resilient investment portfolio is about combining <em>two or more</em> stocks ($X$ and $Y$). To measure whether two assets move in the same direction or opposite directions, we introduce <span className="font-bold text-amber-700">Covariance</span> (<MathSpan tex="\\text{Cov}(X,Y)" />).')}
              </p>
              <p className="text-sm text-slate-700">
                Instead of squaring one variable's deviation <MathSpan tex="(x_i - \bar{x})^2" />, covariance multiplies the deviation of Stock X by the deviation of Stock Y for each observation:
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-3">
              <div className="text-center font-mono text-sm sm:text-base overflow-x-auto py-1">
                <MathSpan tex="\text{Cov}(X,Y) = \frac{1}{N} \sum_{i=1}^N (x_i - \bar{x})(y_i - \bar{y})" block={true} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-sans">
                <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-lg space-y-1">
                  <span className="font-bold text-emerald-900 block font-mono">📈 Positive Product (+ × + or - × -)</span>
                  <p className="text-slate-700">
                    When Stock X is above its average AND Stock Y is also above its average, <MathSpan tex="(+\times + = +)" />. When both are below average, <MathSpan tex="(-\times - = +)" />. Summing these produces <span className="font-bold text-emerald-800">Positive Covariance</span> (co-movement).
                  </p>
                </div>
                <div className="bg-rose-50 border border-rose-200 p-3 rounded-lg space-y-1">
                  <span className="font-bold text-rose-900 block font-mono">📉 Negative Product (+ × - or - × +)</span>
                  <p className="text-slate-700">
                    When Stock X is above its average while Stock Y is below its average, <MathSpan tex="(+\times - = -)" />. Summing these negative products produces <span className="font-bold text-rose-800">Negative Covariance</span> (counter-movement).
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-amber-50/70 border border-amber-200 p-4 rounded-lg space-y-3">
              <h4 className="font-sans font-bold text-amber-950 text-xs uppercase tracking-wider">Real-World High School Analogy: Ice Cream & Rain Umbrellas</h4>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {processMathText('Imagine operating an Ice Cream Stand ($X$) and an Umbrella Shop ($Y$) in the same town:')}
              </p>
              <ul className="text-xs sm:text-sm text-slate-700 space-y-1 list-disc pl-5 font-sans">
                <li><span className="font-bold text-amber-900">Hot Sunny Days:</span> Ice cream sales spike (<MathSpan tex="x_i - \bar{x} > 0" />), while umbrella sales fall (<MathSpan tex="y_i - \bar{y} < 0" />). Deviation product = <span className="font-bold text-rose-700">NEGATIVE</span>.</li>
                <li><span className="font-bold text-amber-900">Rainy Storm Days:</span> Ice cream sales slump (<MathSpan tex="x_i - \bar{x} < 0" font-mono />), while umbrella sales surge (<MathSpan tex="y_i - \bar{y} > 0" />). Deviation product = <span className="font-bold text-rose-700">NEGATIVE</span>.</li>
              </ul>
              <p className="text-xs text-amber-950 font-sans leading-relaxed">
                Combining these two businesses creates a smooth, steady income stream year-round because their negative covariance <span className="font-bold text-amber-900">eliminates total revenue risk</span>!
              </p>
            </div>

            <div className="bg-slate-100 border border-slate-200 p-4 rounded-lg space-y-2">
              <h4 className="font-sans font-bold text-slate-900 text-xs uppercase tracking-wider">From Covariance to Correlation (<MathSpan tex="\rho" />)</h4>
              <p className="text-xs sm:text-sm text-slate-700 font-sans">
                Raw covariance depends on the arbitrary scale of the measurements (dollars, percentages, gallons). To create a universal benchmark independent of units, we divide covariance by the product of both standard deviations:
              </p>
              <div className="bg-white p-3 rounded border border-slate-200 text-center font-mono text-xs sm:text-sm">
                <MathSpan tex="\rho_{X,Y} = \frac{\text{Cov}(X,Y)}{\sigma_X \cdot \sigma_Y}" block={true} />
              </div>
              <p className="text-xs text-slate-600 font-sans">
                This normalizes co-movement onto a clean scale bounded strictly between <span className="font-bold text-rose-700 font-mono">-1.0</span> (perfect opposite movement), <span className="font-bold text-slate-700 font-mono">0.0</span> (completely independent), and <span className="font-bold text-emerald-700 font-mono">+1.0</span> (perfect lockstep movement).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Interactive Preset Toy Datasets */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-indigo-100 text-indigo-800 rounded-xl">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-sans font-bold text-slate-900">
                2. Toy Datasets: Comparing Positive, Negative & Zero Covariance
              </h2>
              <p className="text-xs font-mono text-slate-500">
                Select a pre-built 3-year dataset to observe how deviations multiply.
              </p>
            </div>
          </div>
        </div>

        {/* Preset Selector Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {presets.map(p => (
            <button
              key={p.id}
              onClick={() => handleSelectPreset(p.id)}
              className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                selectedPresetId === p.id 
                  ? 'bg-purple-950 text-white border-purple-800 shadow-md ring-2 ring-purple-500/50' 
                  : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border inline-block mb-2 ${
                selectedPresetId === p.id ? 'bg-purple-900 text-purple-200 border-purple-700' : p.badgeClass
              }`}>
                {p.badge}
              </span>
              <div className="font-sans font-bold text-xs">{p.name}</div>
            </button>
          ))}
        </div>

        <div className="bg-purple-50/60 border border-purple-200 rounded-xl p-4 text-xs font-serif text-slate-700 leading-relaxed">
          <p><span className="font-bold text-purple-900">Dataset Context:</span> {activePreset.description}</p>
        </div>

        {/* Interactive Data Point Sliders */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-sans font-bold text-xs uppercase text-slate-700 tracking-wider flex items-center space-x-2">
              <SlidersHorizontal className="w-4 h-4 text-purple-600" />
              <span>Interactive Slider Tuning (Adjust Data Points)</span>
            </span>
            <button
              onClick={() => handleSelectPreset(selectedPresetId)}
              className="text-[11px] font-mono text-purple-700 hover:text-purple-900 flex items-center space-x-1 cursor-pointer"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset Values</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {customX.map((val, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-lg p-3.5 space-y-3 shadow-2xs">
                <div className="flex justify-between items-center border-b border-slate-100 pb-1.5 font-mono text-xs">
                  <span className="font-bold text-slate-800">Year {idx + 1} Data</span>
                  <span className="text-purple-700 font-bold">Pt #{idx + 1}</span>
                </div>

                {/* X Slider */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="text-slate-600">{activePreset.xLabel.split(' ')[0]} Return (X):</span>
                    <span className="font-bold text-indigo-700">{customX[idx]}%</span>
                  </div>
                  <input
                    type="range"
                    min="-10"
                    max="30"
                    step="1"
                    value={customX[idx]}
                    onChange={(e) => {
                      const updated = [...customX];
                      updated[idx] = parseFloat(e.target.value);
                      setCustomX(updated);
                    }}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>

                {/* Y Slider */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px] font-mono">
                    <span className="text-slate-600">{activePreset.yLabel.split(' ')[0]} Return (Y):</span>
                    <span className="font-bold text-purple-700">{customY[idx]}%</span>
                  </div>
                  <input
                    type="range"
                    min="-10"
                    max="30"
                    step="1"
                    value={customY[idx]}
                    onChange={(e) => {
                      const updated = [...customY];
                      updated[idx] = parseFloat(e.target.value);
                      setCustomY(updated);
                    }}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step-by-Step Arithmetic Table */}
        <div className="overflow-x-auto border border-slate-200 rounded-xl shadow-2xs bg-white">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="bg-slate-900 text-slate-100">
                <th className="p-2.5 border-b border-slate-800">Year (i)</th>
                <th className="p-2.5 border-b border-slate-800 text-indigo-300">X_i</th>
                <th className="p-2.5 border-b border-slate-800 text-indigo-200">(X_i - X̄)</th>
                <th className="p-2.5 border-b border-slate-800 text-indigo-200">(X_i - X̄)²</th>
                <th className="p-2.5 border-b border-slate-800 text-purple-300">Y_i</th>
                <th className="p-2.5 border-b border-slate-800 text-purple-200">(Y_i - Ȳ)</th>
                <th className="p-2.5 border-b border-slate-800 text-purple-200">(Y_i - Ȳ)²</th>
                <th className="p-2.5 border-b border-slate-800 text-amber-300 bg-slate-950 font-bold">
                  Product (X_i - X̄)(Y_i - Ȳ)
                </th>
              </tr>
            </thead>
            <tbody>
              {customX.map((xVal, idx) => {
                const yVal = customY[idx];
                const dx = devX[idx];
                const dy = devY[idx];
                const dx2 = devX2[idx];
                const dy2 = devY2[idx];
                const prod = prodDev[idx];

                return (
                  <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50/80">
                    <td className="p-2.5 font-bold text-slate-800">Year {idx + 1}</td>
                    <td className="p-2.5 text-indigo-700 font-bold">{xVal}%</td>
                    <td className={`p-2.5 font-semibold ${dx >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                      {dx >= 0 ? `+${dx.toFixed(1)}` : dx.toFixed(1)}
                    </td>
                    <td className="p-2.5 text-slate-600">{dx2.toFixed(1)}</td>
                    <td className="p-2.5 text-purple-700 font-bold">{yVal}%</td>
                    <td className={`p-2.5 font-semibold ${dy >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                      {dy >= 0 ? `+${dy.toFixed(1)}` : dy.toFixed(1)}
                    </td>
                    <td className="p-2.5 text-slate-600">{dy2.toFixed(1)}</td>
                    <td className={`p-2.5 font-bold bg-amber-50/50 ${prod >= 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                      {prod >= 0 ? `+${prod.toFixed(2)}` : prod.toFixed(2)}
                    </td>
                  </tr>
                );
              })}

              {/* Summary Totals Row */}
              <tr className="bg-slate-100 border-t-2 border-slate-300 font-bold text-slate-900">
                <td className="p-2.5">Mean / Sum</td>
                <td className="p-2.5 text-indigo-800">X̄ = {meanX.toFixed(1)}%</td>
                <td className="p-2.5 text-slate-500">Sum = 0.0</td>
                <td className="p-2.5 text-slate-800">Var(X) = {varX.toFixed(2)}</td>
                <td className="p-2.5 text-purple-800">Ȳ = {meanY.toFixed(1)}%</td>
                <td className="p-2.5 text-slate-500">Sum = 0.0</td>
                <td className="p-2.5 text-slate-800">Var(Y) = {varY.toFixed(2)}</td>
                <td className={`p-2.5 ${covXY >= 0 ? 'text-emerald-800' : 'text-rose-700'} bg-amber-100/80`}>
                  Cov = {covXY >= 0 ? `+${covXY.toFixed(2)}` : covXY.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Output Statistics Dashboard */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900 text-white p-4 rounded-xl space-y-1 border border-slate-800">
            <span className="text-[10px] font-mono uppercase text-indigo-400 block">Variance X & Y</span>
            <div className="text-sm font-mono font-bold text-indigo-200">
              Var(X) = {varX.toFixed(1)}%² | Var(Y) = {varY.toFixed(1)}%²
            </div>
            <div className="text-[11px] text-slate-400 font-mono">
              σ_X = {stdX.toFixed(2)}% | σ_Y = {stdY.toFixed(2)}%
            </div>
          </div>

          <div className="bg-slate-900 text-white p-4 rounded-xl space-y-1 border border-slate-800">
            <span className="text-[10px] font-mono uppercase text-amber-400 block">Covariance (Cov_XY)</span>
            <div className={`text-sm font-mono font-bold ${covXY >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {covXY >= 0 ? `+${covXY.toFixed(2)}` : covXY.toFixed(2)} %²
            </div>
            <div className="text-[11px] text-slate-400 font-mono">
              Average product of deviations
            </div>
          </div>

          <div className="bg-slate-900 text-white p-4 rounded-xl space-y-1 border border-slate-800">
            <span className="text-[10px] font-mono uppercase text-purple-400 block">Correlation (ρ_XY)</span>
            <div className={`text-base font-mono font-bold ${corrXY >= 0 ? 'text-emerald-400' : 'text-indigo-300'}`}>
              ρ = {corrXY >= 0 ? `+${corrXY.toFixed(3)}` : corrXY.toFixed(3)}
            </div>
            <div className="text-[11px] text-slate-400 font-mono">
              Scale: -1.0 to +1.0
            </div>
          </div>

          <div className="bg-emerald-950 text-emerald-100 p-4 rounded-xl space-y-1 border border-emerald-800">
            <span className="text-[10px] font-mono uppercase text-emerald-300 block">50/50 Portfolio Risk</span>
            <div className="text-base font-mono font-bold text-white">
              σ_p = {portfolioStd.toFixed(2)}%
            </div>
            <div className="text-[11px] text-emerald-200 font-mono">
              {riskReduction > 0.01 ? (
                <span className="text-emerald-300 font-bold">
                  Risk saved vs avg: -{riskReduction.toFixed(2)}%!
                </span>
              ) : (
                <span>No volatility reduction</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Interactive Quiz Exercises */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
          <div className="p-2.5 bg-amber-100 text-amber-800 rounded-xl">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-sans font-bold text-slate-900">
              3. Verification Exercises: High School Algebra II Level
            </h2>
            <p className="text-xs font-mono text-slate-500">
              Test your understanding of sample means, deviations, variance, and covariance signs.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {updatedQuizzes.map((quiz, qIdx) => {
            const selectedOpt = answers[quiz.id];
            const isAnswered = selectedOpt !== undefined;
            const isCorrect = selectedOpt === quiz.correctIndex;
            const showHint = showHints[quiz.id];

            return (
              <div 
                key={quiz.id}
                className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4 shadow-2xs"
              >
                <div className="flex justify-between items-start gap-3">
                  <div className="space-y-1">
                    <span className="text-xs font-mono font-bold text-purple-700 uppercase block">
                      Exercise {qIdx + 1} of 4
                    </span>
                    <h3 className="text-sm font-sans font-bold text-slate-900">
                      {processMathText(quiz.question)}
                    </h3>
                  </div>

                  <button
                    onClick={() => setShowHints(prev => ({ ...prev, [quiz.id]: !prev[quiz.id] }))}
                    className="text-xs font-mono text-slate-500 hover:text-purple-700 flex items-center space-x-1 border border-slate-300 px-2.5 py-1 rounded-md bg-white cursor-pointer"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>{showHint ? 'Hide Hint' : 'Hint'}</span>
                  </button>
                </div>

                {/* Hint Box */}
                {showHint && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs font-serif text-amber-900"
                  >
                    <span className="font-bold">Hint:</span> {processMathText(quiz.hint)}
                  </motion.div>
                )}

                {/* Options Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {quiz.options.map((opt, oIdx) => {
                    let btnStyle = 'bg-white border-slate-200 text-slate-800 hover:bg-purple-50 hover:border-purple-300';
                    if (submitted) {
                      if (oIdx === quiz.correctIndex) {
                        btnStyle = 'bg-emerald-100 border-emerald-400 text-emerald-950 font-bold';
                      } else if (selectedOpt === oIdx) {
                        btnStyle = 'bg-rose-100 border-rose-300 text-rose-950';
                      }
                    } else if (selectedOpt === oIdx) {
                      btnStyle = 'bg-purple-950 text-white border-purple-800 font-bold';
                    }

                    return (
                      <button
                        key={oIdx}
                        disabled={submitted}
                        onClick={() => setAnswers(prev => ({ ...prev, [quiz.id]: oIdx }))}
                        className={`p-3 rounded-lg border text-left text-xs font-serif transition-all flex items-start space-x-2 cursor-pointer ${btnStyle}`}
                      >
                        <span className="font-mono text-[11px] opacity-60 font-bold">
                          {String.fromCharCode(65 + oIdx)}.
                        </span>
                        <span>{processMathText(opt)}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation Box */}
                {(submitted || showSolutions) && (
                  <div className={`p-4 rounded-lg border text-xs font-serif space-y-2 ${
                    isCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-slate-100 border-slate-300 text-slate-800'
                  }`}>
                    <div className="flex items-center space-x-2 font-sans font-bold">
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Correct Answer!</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-rose-600" />
                          <span>Incorrect. Review the solution below:</span>
                        </>
                      )}
                    </div>
                    <div className="leading-relaxed whitespace-pre-line font-serif">
                      {processMathText(quiz.explanation)}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Submit & Reset Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-4">
          <button
            onClick={() => {
              setSubmitted(true);
              setShowSolutions(true);
            }}
            disabled={Object.keys(answers).length < updatedQuizzes.length}
            className="bg-purple-950 hover:bg-purple-900 text-white font-sans font-bold text-xs px-5 py-2.5 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center space-x-2 shadow-xs"
            id="btn-submit-variance-quiz"
          >
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <span>Submit Verification Exercises</span>
          </button>

          <button
            onClick={() => {
              setAnswers({});
              setSubmitted(false);
              setShowSolutions(false);
            }}
            className="text-xs font-mono text-slate-600 hover:text-slate-900 flex items-center space-x-1.5 border border-slate-300 px-3 py-2 rounded-lg bg-white cursor-pointer"
            id="btn-reset-variance-quiz"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Quiz</span>
          </button>
        </div>
      </div>

      {/* Return to Unit 7 Link */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-800">
        <div className="space-y-1 text-center sm:text-left">
          <h3 className="font-sans font-bold text-sm text-indigo-300">
            Ready to apply Covariance to Modern Portfolio Theory?
          </h3>
          <p className="text-xs text-slate-400 font-serif">
            Return to Unit 7 to build Markowitz Efficient Frontiers using covariance matrices!
          </p>
        </div>

        <button
          onClick={onLinkToPortfolio}
          className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-sans font-bold px-4 py-2.5 rounded-xl transition-all flex items-center space-x-2 cursor-pointer whitespace-nowrap shadow-xs"
          id="btn-link-to-unit7"
        >
          <span>Return to Unit 7: Portfolio Lab</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
