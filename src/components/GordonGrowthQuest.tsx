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
  TrendingUp, 
  SlidersHorizontal,
  ChevronRight,
  TrendingDown,
  Info
} from 'lucide-react';
import { MathSpan, processMathText } from '../lib/math';

interface GordonGrowthQuestProps {
  onBackToSyllabus: () => void;
  onLinkToUnit2: () => void;
}

export const GordonGrowthQuest: React.FC<GordonGrowthQuestProps> = ({ onBackToSyllabus, onLinkToUnit2 }) => {
  // --- SIMULATOR STATE ---
  const [d0, setD0] = useState<number>(2.00); // Initial dividend
  const [r, setR] = useState<number>(0.08);   // Discount rate (8%)
  const [g, setG] = useState<number>(0.03);   // Growth rate (3%)

  // --- QUIZ STATE ---
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [showSolutions, setShowSolutions] = useState<boolean>(false);
  const [showHints, setShowHints] = useState<Record<number, boolean>>({});

  // Calculations for Sandbox
  const isDivergent = g >= r;
  const d1 = d0 * (1 + g);
  const theoreticalPrice = isDivergent ? null : d1 / (r - g);
  const simplePerpetuityPrice = d0 / r; // If g = 0

  // Generate the first 5 terms for visual representation
  const getTermsData = () => {
    const terms: { year: number; dividend: number; dcf: number; cumulative: number }[] = [];
    let cumulative = 0;
    for (let t = 1; t <= 5; t++) {
      const dividend = d0 * Math.pow(1 + g, t);
      const dcf = dividend / Math.pow(1 + r, t);
      cumulative += dcf;
      terms.push({ year: t, dividend, dcf, cumulative });
    }
    return terms;
  };
  const termsData = getTermsData();

  // Quizzes - Gordon Growth Mathematical Finance Quizzes
  const mathQuizzes = [
    {
      id: 1,
      question: 'A company pays a constant dividend of $\\$3.00$ per year forever, with no growth ($g = 0\\%$). If your discount rate (required return) is $6\\%$ ($0.06$), what is the fair price of the stock under the simple perpetuity model?',
      options: [
        '\\$18.00',
        '\\$50.00',
        '\\$30.00',
        '\\$180.00'
      ],
      correctIndex: 1, // 3.00 / 0.06 = 50.00
      explanation: 'With no growth ($g = 0$), the stock price is modeled as a simple perpetuity:\n$P_0 = \\frac{D}{r}$\nSubstituting the values:\n$P_0 = \\frac{\\$3.00}{0.06} = \\$50.00$.',
      hint: 'Use the zero-growth perpetuity formula $P_0 = \\frac{D}{r}$. Divide the dividend of $\\$3.00$ by the rate $0.06$.'
    },
    {
      id: 2,
      question: 'A company is expected to pay a dividend of $D_1 = \\$2.10$ next year ($t = 1$). Its dividend is expected to grow at a constant rate of $g = 4\\%$ ($0.04$) per year forever. If your discount rate is $7\\%$ ($0.07$), what is the value of the stock using the Gordon Growth Formula?',
      options: [
        '\\$30.00',
        '\\$70.00',
        '\\$52.50',
        '\\$21.00'
      ],
      correctIndex: 1, // 2.10 / (0.07 - 0.04) = 2.10 / 0.03 = 70.00
      explanation: 'Since we are given the next period\'s dividend $D_1 = \\$2.10$, we can plug it directly into the Gordon Growth Formula:\n$P_0 = \\frac{D_1}{r - g}$\nSubstitute the known values:\n$P_0 = \\frac{\\$2.10}{0.07 - 0.04} = \\frac{\\$2.10}{0.03} = \\$70.00$.',
      hint: 'Be careful! The formula is $P_0 = \\frac{D_1}{r - g}$. Since we are already given $D_1 = \\$2.10$, you do not need to multiply by $(1 + g)$ again. Simply calculate $\\$2.10$ divided by $(0.07 - 0.04)$.'
    },
    {
      id: 3,
      question: 'A company just paid a dividend of $D_0 = \\$4.00$ today ($t = 0$). The dividend grows at a constant annual rate of $g = 5\\%$ ($0.05$). If your required required rate of return is $9\\%$ ($0.09$), what is the value of the stock today?',
      options: [
        '\\$100.00',
        '\\$105.00',
        '\\$80.00',
        '\\$44.00'
      ],
      correctIndex: 1, // D1 = 4 * 1.05 = 4.20. Price = 4.20 / (0.09 - 0.05) = 4.20 / 0.04 = 105.00
      explanation: 'We are given the *current* dividend $D_0 = \\$4.00$. First, we must calculate the *expected next dividend* $D_1$:\n$D_1 = D_0 \\times (1 + g) = \\$4.00 \\times (1 + 0.05) = \\$4.20$\nNow, apply the Gordon Growth Formula:\n$P_0 = \\frac{D_1}{r - g} = \\frac{\\$4.20}{0.09 - 0.05} = \\frac{\\$4.20}{0.04} = \\$105.00$.',
      hint: 'The formula uses $D_1$, but you are given $D_0 = \\$4.00$. First, grow the dividend by $5\\%$ to find $D_1$: $D_1 = \\$4.00 \\times 1.05 = \\$4.20$. Then divide by $(0.09 - 0.05)$.'
    },
    {
      id: 4,
      question: 'What mathematical phenomenon occurs in the Gordon Growth model if a company\'s dividend growth rate $g$ is equal to or greater than the discount rate $r$ ($g \\ge r$)?',
      options: [
        'The formula yields a negative price, which represents a short-selling opportunity.',
        'The stock price drops to exactly zero because the company is growing too fast.',
        'The infinite series of future discounted dividends diverges to infinity, meaning the formula breaks and cannot yield a valid finite price.',
        'The price is calculated by taking the reciprocal of simple perpetuity: $P_0 = \\frac{r}{g}$.'
      ],
      correctIndex: 2,
      explanation: 'The Gordon Growth Formula is derived from the sum of an infinite geometric series with common ratio $x = \\frac{1+g}{1+r}$. For this infinite series to sum to a finite value, the ratio must be strictly less than 1 ($x < 1$), which mathematically requires $g < r$. If $g \\ge r$, we are adding increasingly larger numbers over time, causing the sum to blow up to infinity (it diverges). In real life, no company can grow faster than the entire economy forever!',
      hint: 'Think about the common ratio of our geometric series: $x = \\frac{1+g}{1+r}$. What happens to an infinite series if the ratio is $1.0$ or larger?'
    }
  ];

  const handleSelectOption = (qId: number, oIdx: number) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qId]: oIdx }));
  };

  const handleToggleHint = (qId: number) => {
    setShowHints(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  const totalCorrect = mathQuizzes.filter(q => answers[q.id] === q.correctIndex).length;
  const isAllCorrect = totalCorrect === mathQuizzes.length;

  return (
    <div className="space-y-8" id="gordon-math-side-quest-module">
      {/* Back Header navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <button
          onClick={onBackToSyllabus}
          className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors font-sans text-sm font-bold group cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Curriculum Roadmap</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="font-mono text-xs bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full font-bold border border-indigo-100">
            Side Quest #2
          </span>
          <span className="font-mono text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-bold border border-slate-200">
            Finance & Calculus Convergence
          </span>
        </div>
      </div>

      {/* Hero Accent Card */}
      <div className="p-8 bg-slate-900 border border-slate-950 text-slate-100 rounded-3xl relative overflow-hidden shadow-md">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="flex items-center gap-2.5">
            <div className="bg-indigo-600 p-2 rounded-xl">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="font-mono text-xs text-indigo-400 uppercase tracking-widest font-extrabold block">MATH LAB COMPANION</span>
              <h1 className="font-sans font-extrabold text-2xl sm:text-3xl text-white tracking-tight leading-none mt-0.5">
                Valuing Infinity: The Gordon Growth Formula
              </h1>
            </div>
          </div>
          <p className="font-serif text-slate-300 text-sm sm:text-base leading-relaxed">
            {processMathText('How do we put a exact dollar value on a stock that can pay dividends *forever*? Let\'s discover the algebra behind <span className="font-bold text-slate-800">simple perpetuities</span>, and then see how introducing a constant growth rate $g$ reveals the famous <span className="font-bold text-indigo-600">Gordon Growth Formula ($\\frac{D_1}{r-g}$)</span>.')}
          </p>
          <div className="pt-2">
            <button
              onClick={onLinkToUnit2}
              className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 font-sans font-bold px-4 py-2 rounded-xl border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-indigo-400" />
              <span>Link Back to Unit 4 (Stock Price Valuation)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Concept Section 1: Perpetuity without Growth */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="space-y-1">
          <span className="font-mono text-xs text-indigo-600 font-extrabold uppercase tracking-wider block">Concept 1</span>
          <h2 className="font-sans font-extrabold text-lg sm:text-xl text-slate-950 tracking-tight flex items-center flex-wrap gap-1">
            <span>No Growth Perpetuities (</span>
            <MathSpan tex="g = 0" />
            <span>)</span>
          </h2>
        </div>

        <div className="font-serif text-slate-700 text-sm sm:text-base leading-relaxed space-y-4">
          <p>
            {processMathText('Imagine a high-quality financial asset that promises to pay you a constant cash dividend $D$ every single year, forever, with <span className="font-bold text-slate-800">zero growth</span> ($g=0$). How much is that promise worth to you *today*?')}
          </p>
          <p>
            {processMathText('To find its fair value ($P_0$), we sum the discounted present values of all future payments from Year 1 to infinity ($\infty$):')}
          </p>
          <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-2xl">
            <div className="flex justify-between items-center mb-1">
              <span className="font-mono text-[10px] font-bold uppercase text-indigo-700">Perpetuity Discounted Sum</span>
              <span className="font-mono text-xs font-bold bg-indigo-200/80 text-indigo-900 px-2.5 py-0.5 rounded-full">
                Eq. 3.1
              </span>
            </div>
            <MathSpan tex="P_0 = \sum_{t=1}^{\infty} \frac{D}{(1+r)^t} = \frac{D}{1+r} + \frac{D}{(1+r)^2} + \frac{D}{(1+r)^3} + \dots" block />
          </div>
          <p>
            {processMathText('Since the dividend $D$ is constant, we can factor it out of the sum:')}
          </p>
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
            <div className="flex justify-between items-center mb-1">
              <span className="font-mono text-[10px] font-bold uppercase text-slate-500">Factoring Constant Dividend</span>
              <span className="font-mono text-xs font-bold bg-slate-200 text-slate-700 px-2.5 py-0.5 rounded-full">
                Eq. 3.2
              </span>
            </div>
            <MathSpan tex="P_0 = D \cdot \sum_{t=1}^{\infty} \left(\frac{1}{1+r}\right)^t" block />
          </div>
          <p>
            {processMathText('The summation term is an <span className="font-bold text-slate-800">infinite geometric series</span> with a common ratio of $x = \frac{1}{1+r}$. Because the discount rate $r > 0$, the ratio is strictly less than 1 ($|x| < 1$).')}
          </p>
          <p>
            {processMathText('Using the algebraic formula for the sum of an infinite geometric series, $S = \frac{\text{First Term}}{1 - \text{Ratio}}$:')}
          </p>
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
            <div className="flex justify-between items-center mb-1">
              <span className="font-mono text-[10px] font-bold uppercase text-slate-500">Series Algebraic Reduction</span>
              <span className="font-mono text-xs font-bold bg-slate-200 text-slate-700 px-2.5 py-0.5 rounded-full">
                Eq. 3.3
              </span>
            </div>
            <MathSpan tex="S = \frac{\frac{1}{1+r}}{1 - \frac{1}{1+r}} = \frac{\frac{1}{1+r}}{\frac{1+r-1}{1+r}} = \frac{\frac{1}{1+r}}{\frac{r}{1+r}} = \frac{1}{r}" block />
          </div>
          <p>
            {processMathText('Multiplying this sum by the factored-out dividend $D$ gives us the beautifully simple <span className="font-bold text-indigo-600">Perpetuity Formula</span>:')}
          </p>
          <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-2xl">
            <div className="flex justify-between items-center mb-1">
              <span className="font-mono text-[10px] font-bold uppercase text-indigo-700">Zero-Growth Perpetuity Formula</span>
              <span className="font-mono text-xs font-bold bg-indigo-200/80 text-indigo-900 px-2.5 py-0.5 rounded-full">
                Eq. 3.4
              </span>
            </div>
            <MathSpan tex="P_0 = \frac{D}{r}" block />
          </div>
          <p>
            {processMathText('<span className="font-bold text-slate-800">Example:</span> If a preferred share pays a constant annual dividend of $D = \\$2.00$ forever and your required rate of return is $r = 5\\%$ ($0.05$), its value is:')}
          </p>
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl font-mono text-center font-bold text-slate-800 text-xs sm:text-sm">
            <div className="flex justify-between items-center mb-2 font-sans font-normal text-slate-500 text-[10px]">
              <span className="uppercase font-bold">Preferred Share Example ($D = \$2.00, r = 5\%$)</span>
              <span className="font-mono text-xs font-bold bg-slate-200 text-slate-700 px-2.5 py-0.5 rounded-full">
                Eq. 3.5
              </span>
            </div>
            <MathSpan tex="P_0 = \frac{\$2.00}{0.05} = \$40.00" block />
          </div>
        </div>
      </div>

      {/* Concept Section 2: Incorporating Growth */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="space-y-1">
          <span className="font-mono text-xs text-indigo-600 font-extrabold uppercase tracking-wider block">Concept 2</span>
          <h2 className="font-sans font-extrabold text-lg sm:text-xl text-slate-950 tracking-tight flex items-center flex-wrap gap-1">
            <span>Incorporating Constant Growth (</span>
            <MathSpan tex="g > 0" />
            <span>)</span>
          </h2>
        </div>

        <div className="font-serif text-slate-700 text-sm sm:text-base leading-relaxed space-y-4">
          <p>
            {processMathText('In the real world, successful businesses expand, raise prices, and increase their dividends over time. Let\'s suppose dividends grow at a constant compound annual growth rate of <span className="font-bold text-slate-800">$g$</span>.')}
          </p>
          <p>
            {processMathText('If the current dividend is $D_0$, then:')}
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-600 pl-1 font-sans text-xs sm:text-sm">
            <li>{processMathText('Year 1 Dividend ($D_1$): $D_1 = D_0(1+g)$')}</li>
            <li>{processMathText('Year 2 Dividend ($D_2$): $D_2 = D_1(1+g) = D_0(1+g)^2$')}</li>
            <li>{processMathText('Year $t$ Dividend ($D_t$): $D_t = D_0(1+g)^t$')}</li>
          </ul>
          <p>
            {processMathText('Let\'s add up the present values of all future growing dividends from Year 1 to infinity:')}
          </p>
          <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-2xl">
            <div className="flex justify-between items-center mb-1">
              <span className="font-mono text-[10px] font-bold uppercase text-indigo-700">Growing Dividend Series ($g &gt; 0$)</span>
              <span className="font-mono text-xs font-bold bg-indigo-200/80 text-indigo-900 px-2.5 py-0.5 rounded-full">
                Eq. 3.6
              </span>
            </div>
            <MathSpan tex="P_0 = \sum_{t=1}^{\infty} \frac{D_0(1+g)^t}{(1+r)^t} = D_0 \sum_{t=1}^{\infty} \left(\frac{1+g}{1+r}\right)^t" block />
          </div>
          <p>
            {processMathText('This is a geometric series with a common ratio of $x = \frac{1+g}{1+r}$. For this infinite sum to converge to a finite number, the ratio must be strictly less than 1:')}
          </p>
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl font-sans text-xs sm:text-sm">
            <p className="font-bold text-red-950 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-indigo-600" />
              <span>{processMathText('The Convergence Rule: $g < r$')}</span>
            </p>
            <p className="text-slate-600 font-serif mt-1">
              {processMathText('For the series to converge, we require $\\frac{1+g}{1+r} < 1$, which algebraically reduces to <span className="font-bold text-amber-900">$g < r$</span>. If a company could grow at a rate $g \\ge r$ forever, its dividend growth would outpace the discounting effect, making the stock worth an infinite amount of money!')}
            </p>
          </div>
          <p>
            {processMathText('Under the assumption that $g < r$, we use the infinite series sum formula where the first term is $a = \frac{1+g}{1+r}$:')}
          </p>
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
            <div className="flex justify-between items-center mb-1">
              <span className="font-mono text-[10px] font-bold uppercase text-slate-500">Growing Series Convergence Sum</span>
              <span className="font-mono text-xs font-bold bg-slate-200 text-slate-700 px-2.5 py-0.5 rounded-full">
                Eq. 3.7
              </span>
            </div>
            <MathSpan tex="S = \frac{\frac{1+g}{1+r}}{1 - \frac{1+g}{1+r}} = \frac{\frac{1+g}{1+r}}{\frac{1+r-(1+g)}{1+r}} = \frac{1+g}{r-g}" block />
          </div>
          <p>
            {processMathText('Multiplying this converged sum by the factored-out $D_0$ gives us:')}
          </p>
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
            <div className="flex justify-between items-center mb-1">
              <span className="font-mono text-[10px] font-bold uppercase text-slate-500">Valuation with $D_0$</span>
              <span className="font-mono text-xs font-bold bg-slate-200 text-slate-700 px-2.5 py-0.5 rounded-full">
                Eq. 3.8
              </span>
            </div>
            <MathSpan tex="P_0 = D_0 \cdot \frac{1+g}{r-g} = \frac{D_0(1+g)}{r-g}" block />
          </div>
          <p>
            {processMathText('Since the next expected dividend is $D_1 = D_0(1+g)$, we arrive at the famous <span className="font-bold text-indigo-600">Gordon Growth Formula</span>:')}
          </p>
          <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-2xl">
            <div className="flex justify-between items-center mb-1">
              <span className="font-mono text-[10px] font-bold uppercase text-indigo-700">The Gordon Growth Model</span>
              <span className="font-mono text-xs font-bold bg-indigo-200/80 text-indigo-900 px-2.5 py-0.5 rounded-full">
                Eq. 3.9
              </span>
            </div>
            <MathSpan tex="P_0 = \frac{D_1}{r - g}" block />
          </div>
        </div>
      </div>

      {/* Perpetuity and Growth Simulator Sandbox */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="space-y-1">
          <span className="font-mono text-xs text-indigo-600 font-extrabold uppercase tracking-wider block">Interactive Sandbox</span>
          <h2 className="font-sans font-extrabold text-lg sm:text-xl text-slate-950 tracking-tight flex items-center gap-1.5">
            <SlidersHorizontal className="w-5 h-5 text-indigo-600" />
            <span>Perpetuity & Growth Simulator</span>
          </h2>
          <p className="text-xs text-slate-500 font-sans">
            Adjust the sliders below to see how changes in growth ($g$) and discount rate ($r$) dynamically alter the discounted cash flows and ultimate stock price.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          {/* Controls column */}
          <div className="xl:col-span-5 space-y-5 font-sans text-xs sm:text-sm">
            {/* Slider 1: D0 */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-bold">
                <span className="text-slate-600">Current Dividend ($D_0$):</span>
                <span className="text-indigo-600">${d0.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.50"
                max="5.00"
                step="0.10"
                value={d0}
                onChange={(e) => setD0(parseFloat(e.target.value))}
                className="w-full accent-indigo-600"
              />
              <span className="text-[10px] text-slate-400 block">The initial cash payout today ($t=0$).</span>
            </div>

            {/* Slider 2: Discount Rate (r) */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-bold">
                <span className="text-slate-600">Discount Rate ($r$):</span>
                <span className="text-indigo-600">{(r * 100).toFixed(1)}%</span>
              </div>
              <input
                type="range"
                min="0.04"
                max="0.20"
                step="0.005"
                value={r}
                onChange={(e) => {
                  const newR = parseFloat(e.target.value);
                  setR(newR);
                }}
                className="w-full accent-indigo-600"
              />
              <span className="text-[10px] text-slate-400 block">Your required annual return based on asset risk.</span>
            </div>

            {/* Slider 3: Growth Rate (g) */}
            <div className="space-y-1.5">
              <div className="flex justify-between font-bold">
                <span className="text-slate-600">Growth Rate ($g$):</span>
                <span className={`font-bold ${isDivergent ? 'text-rose-500' : 'text-indigo-600'}`}>
                  {(g * 100).toFixed(1)}%
                </span>
              </div>
              <input
                type="range"
                min="0.00"
                max="0.15"
                step="0.005"
                value={g}
                onChange={(e) => setG(parseFloat(e.target.value))}
                className="w-full accent-indigo-600"
              />
              <span className="text-[10px] text-slate-400 block">The perpetual annual growth rate of the dividend.</span>
            </div>

            {/* Formulas Card */}
            <div className="bg-slate-900 border border-slate-950 p-4 rounded-xl space-y-2 text-slate-300 font-mono text-[11px]">
              <span className="text-slate-500 font-extrabold uppercase tracking-wider text-[9px] block">LIVE MODEL SUMMARY</span>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Simple Perpetuity ($g = 0$):</span>
                  <span className="text-white font-bold">${simplePerpetuityPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Gordon Growth Price:</span>
                  <span className={`font-bold ${isDivergent ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {isDivergent ? 'DIVERGENT (∞)' : `$${theoreticalPrice?.toFixed(2)}`}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Visualization / Step-by-Step Table Column */}
          <div className="xl:col-span-7 space-y-4">
            {isDivergent ? (
              <div className="bg-rose-50/50 border border-rose-200 rounded-2xl p-6 text-center space-y-3 shadow-3xs">
                <div className="bg-rose-100 text-rose-700 w-12 h-12 rounded-full flex items-center justify-center mx-auto text-xl font-bold">
                  ⚠️
                </div>
                <h3 className="font-sans font-extrabold text-slate-900 text-base">
                  Divergent Infinite Series! ($g \ge r$)
                </h3>
                <p className="font-serif text-slate-600 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
                  {processMathText(`Because the dividend growth rate <span className="font-bold text-rose-700">(${(g * 100).toFixed(1)}%)</span> is equal to or greater than the discount rate <span className="font-bold text-rose-700">(${(r * 100).toFixed(1)}%)</span>, each future discounted cash flow is larger than (or equal to) the previous one. The sum blows up to <span className="font-bold text-rose-800">infinity</span> ($\\infty$) and the formula breaks!`)}
                </p>
                <div className="bg-white border border-rose-100 p-3 rounded-xl max-w-sm mx-auto font-mono text-[11px] text-rose-800">
                  {processMathText(`Common Ratio $x = \\frac{1 + g}{1 + r} = \\frac{1 + ${g.toFixed(3)}}{1 + ${r.toFixed(3)}} = ${((1 + g) / (1 + r)).toFixed(3)} \\ge 1.0$`)}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-emerald-50/40 border border-emerald-100 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-center sm:text-left">
                    <span className="font-mono text-[10px] text-emerald-600 uppercase font-extrabold tracking-wider block">THEORETICAL stock PRICE</span>
                    <span className="font-sans font-extrabold text-2xl text-slate-900">${theoreticalPrice?.toFixed(2)}</span>
                  </div>
                  <div className="text-center sm:text-right font-mono text-xs text-slate-500">
                    <div>Denominator ($r - g$):</div>
                    <div className="font-bold text-slate-700">{(r*100).toFixed(1)}% - {(g*100).toFixed(1)}% = {((r - g)*100).toFixed(1)}%</div>
                  </div>
                </div>

                {/* Table of first 5 payments */}
                <div className="border border-slate-200 rounded-xl overflow-hidden shadow-3xs">
                  <table className="min-w-full divide-y divide-slate-200 text-left text-xs sm:text-sm">
                    <thead className="bg-slate-50 font-sans font-bold text-slate-700">
                      <tr>
                        <th className="px-4 py-2 font-semibold">Year (t)</th>
                        <th className="px-4 py-2 font-semibold">Dividend ($D_t$)</th>
                        <th className="px-4 py-2 font-semibold">Discounted ($DCF_t$)</th>
                        <th className="px-4 py-2 font-semibold">Cumulative Sum</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white font-mono text-slate-600 text-[11px] sm:text-xs">
                      {termsData.map((term) => (
                        <tr key={term.year} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-4 py-2 text-slate-400 font-bold">Year {term.year}</td>
                          <td className="px-4 py-2">${term.dividend.toFixed(2)}</td>
                          <td className="px-4 py-2 text-indigo-600">${term.dcf.toFixed(2)}</td>
                          <td className="px-4 py-2 text-slate-800 font-semibold">${term.cumulative.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-[10px] text-slate-400 italic font-serif leading-relaxed">
                  {processMathText(`Notice that the cumulative sum of the first 5 terms is <span className="font-bold text-indigo-700">$${termsData[4].cumulative.toFixed(2)}</span>, which is already climbing toward the theoretical infinite sum of <span className="font-bold text-indigo-700">$${theoreticalPrice?.toFixed(2)}</span>!`)}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Practice Quiz Panel */}
      <div className="bg-slate-900 border border-slate-950 rounded-3xl p-6 sm:p-8 text-slate-100 shadow-xl space-y-6 relative overflow-hidden" id="gordon-math-knowledge-check">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Check Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-extrabold uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Interactive Practice</span>
            </div>
            <h4 className="font-sans font-extrabold text-xl sm:text-2xl text-white tracking-tight">
              Gordon Growth Practice Quiz
            </h4>
            <p className="font-serif text-slate-300 text-sm max-w-2xl">
              Solve algebraic cash flow problems, analyze perpetuity variables, and master the $r - g$ denominator.
            </p>
          </div>

          {submitted && (
            <div className={`px-4 py-2 rounded-2xl border flex items-center gap-2 font-mono text-xs sm:text-sm font-bold flex-shrink-0 ${
              isAllCorrect
                ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300'
                : 'bg-amber-950/80 border-amber-500/50 text-amber-300'
            }`}>
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>Score: {totalCorrect} / {mathQuizzes.length} Correct</span>
            </div>
          )}
        </div>

        {/* Quizzes Form list */}
        <div className="space-y-8">
          {mathQuizzes.map((q, qIdx) => {
            const selectedOpt = answers[q.id];
            const isAnswered = selectedOpt !== undefined;
            const isCorrect = isAnswered && selectedOpt === q.correctIndex;
            const showHint = showHints[q.id];

            return (
              <div key={q.id} className="bg-slate-950/50 border border-slate-800/80 rounded-2xl p-5 sm:p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <span className="flex items-center justify-center bg-slate-800 text-slate-300 border border-slate-700 w-7 h-7 rounded-lg font-mono text-xs font-bold flex-shrink-0 mt-0.5">
                    {qIdx + 1}
                  </span>
                  <div className="space-y-1.5">
                    <h5 className="font-sans font-bold text-white text-sm sm:text-base">
                      {processMathText(q.question)}
                    </h5>
                  </div>
                </div>

                {/* Options grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-0 sm:pl-10">
                  {q.options.map((opt, oIdx) => {
                    const isSelected = selectedOpt === oIdx;
                    return (
                      <button
                        key={oIdx}
                        disabled={submitted}
                        onClick={() => handleSelectOption(q.id, oIdx)}
                        className={`text-left px-4 py-3 rounded-xl border text-xs sm:text-sm font-sans transition-all flex items-center justify-between group cursor-pointer ${
                          submitted
                            ? isSelected
                              ? isCorrect
                                ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                                : 'bg-rose-950/40 border-rose-500/50 text-rose-300'
                              : oIdx === q.correctIndex
                                ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-400'
                                : 'bg-slate-900 border-slate-800/40 text-slate-500'
                            : isSelected
                              ? 'bg-indigo-600 border-indigo-500 text-white shadow shadow-indigo-950'
                              : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800/80 hover:border-slate-700'
                        }`}
                      >
                        <span className="flex-1 pr-2">{processMathText(opt)}</span>
                        {submitted ? (
                          isSelected ? (
                            isCorrect ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                            ) : (
                              <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                            )
                          ) : oIdx === q.correctIndex ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500/60 flex-shrink-0" />
                          ) : null
                        ) : (
                          <ChevronRight className={`w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity ${isSelected ? 'text-white' : 'text-indigo-400'}`} />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Hint box toggle button */}
                {!submitted && (
                  <div className="pl-0 sm:pl-10 pt-1">
                    <button
                      type="button"
                      onClick={() => handleToggleHint(q.id)}
                      className="text-slate-400 hover:text-white font-sans text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
                      <span>{showHint ? 'Hide Hint' : 'Need a hint?'}</span>
                    </button>
                    {showHint && (
                      <div className="bg-indigo-950/30 border border-indigo-900/50 rounded-xl p-3.5 text-indigo-300 text-xs font-serif mt-2 max-w-xl">
                        {processMathText(q.hint || '')}
                      </div>
                    )}
                  </div>
                )}

                {/* Question Explanation */}
                {submitted && (showSolutions || answers[q.id] !== undefined) && (
                  <div className="pl-0 sm:pl-10 pt-2">
                    <div className={`rounded-xl p-4 text-xs font-sans leading-relaxed ${isCorrect ? 'bg-emerald-950/20 border border-emerald-900/30 text-emerald-200' : 'bg-slate-900 border border-slate-800 text-slate-300'}`}>
                      <strong className={`block text-xs uppercase font-mono font-bold mb-1 ${isCorrect ? 'text-emerald-400' : 'text-indigo-400'}`}>
                        {isCorrect ? '✓ Correct Explanation' : 'Explanation:'}
                      </strong>
                      <div className="prose prose-sm prose-invert font-serif text-[11px] sm:text-xs">
                        {processMathText(q.explanation)}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Success Banner */}
        {submitted && isAllCorrect && (
          <div className="bg-emerald-950/80 border border-emerald-500/50 rounded-2xl p-5 text-emerald-200 flex items-start gap-3 shadow-lg">
            <Sparkles className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5 animate-bounce" />
            <div className="space-y-1">
              <h5 className="font-sans font-bold text-emerald-300 text-base">
                Gordon Growth Scholar! 100% Correct!
              </h5>
              <p className="font-serif text-xs sm:text-sm text-emerald-200/90 leading-relaxed">
                Superb job! You have fully mastered the mathematics of simple perpetuities and constant growing dividend series. You now understand how future expected payouts can be discounted into a single, exact stock valuation today!
              </p>
            </div>
          </div>
        )}

        {/* Quiz Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={() => setShowSolutions(!showSolutions)}
            disabled={!submitted}
            className={`px-4 py-2 rounded-xl text-xs font-sans font-bold border transition-colors flex items-center gap-1.5 cursor-pointer ${
              submitted
                ? 'text-slate-300 bg-slate-800 hover:bg-slate-700 border-slate-700'
                : 'text-slate-600 bg-slate-900/40 border-slate-900 cursor-not-allowed'
            }`}
          >
            <Eye className="w-3.5 h-3.5 text-emerald-400" />
            <span>{showSolutions ? 'Hide Solutions' : 'Show Solutions'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setAnswers({});
                setShowSolutions(false);
                setShowHints({});
              }}
              className="px-4 py-2 rounded-xl text-xs font-sans font-bold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Quiz</span>
            </button>

            <button
              type="button"
              onClick={() => setSubmitted(true)}
              disabled={Object.keys(answers).length === 0}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-sans font-bold transition-all flex items-center gap-2 cursor-pointer ${
                Object.keys(answers).length > 0
                  ? 'text-white bg-indigo-600 hover:bg-indigo-500 shadow-md'
                  : 'text-slate-500 bg-slate-800 border border-slate-700/50 cursor-not-allowed'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Check Answers</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
