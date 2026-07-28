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
  Activity,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import { MathSpan, processMathText } from '../lib/math';

interface GeometricSeriesQuestProps {
  onBackToSyllabus: () => void;
  onLinkToUnit3_5: () => void;
}

export const GeometricSeriesQuest: React.FC<GeometricSeriesQuestProps> = ({ onBackToSyllabus, onLinkToUnit3_5 }) => {
  // --- VISUALIZER STATE ---
  const [firstTerm, setFirstTerm] = useState<number>(100);
  const [ratio, setRatio] = useState<number>(0.5); // Must be strictly between -1 and 1 for convergence
  const [numTerms, setNumTerms] = useState<number>(5);
  const [activeExampleTab, setActiveExampleTab] = useState<number>(0);

  // --- CONCEPT EXAMPLES DATA ---
  const conceptExamples = [
    {
      id: 'explosive',
      title: 'Explosive Growth (Divergent)',
      aLabel: 'a = 2',
      xLabel: 'x = 3',
      badge: 'x = 3 (> 1)',
      badgeClass: 'bg-rose-100 text-rose-800 border-rose-200',
      eqTag: 'Eq. 2.1a',
      tex: '2 + 6 + 18 + 54 + 162 + \\dots',
      steps: [
        'Term 1: a = 2',
        'Term 2: 2 \\times 3 = 6',
        'Term 3: 6 \\times 3 = 18',
        'Term 4: 18 \\times 3 = 54'
      ],
      explanation: 'Because the multiplier $|x| = 3 \\ge 1$, every subsequent term is three times larger than the previous one. The terms expand rapidly and the infinite sum explodes to infinity ($\\infty$).',
      resultTex: '\\text{Sum } S \\to \\infty \\quad \\text{(Diverges)}',
      isConvergent: false
    },
    {
      id: 'halving',
      title: 'Halving Decay (Convergent)',
      aLabel: 'a = 100',
      xLabel: 'x = 0.5',
      badge: 'x = 0.5 (< 1)',
      badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      eqTag: 'Eq. 2.1b',
      tex: '100 + 50 + 25 + 12.5 + 6.25 + \\dots',
      steps: [
        'Term 1: a = 100',
        'Term 2: 100 \\times 0.5 = 50',
        'Term 3: 50 \\times 0.5 = 25',
        'Term 4: 25 \\times 0.5 = 12.5'
      ],
      explanation: 'Because $0 < x = 0.5 < 1$, each term shrinks by half. The numbers collapse towards zero so quickly that an infinite number of additions equals a clean, finite total.',
      resultTex: 'S = \\frac{100}{1 - 0.5} = \\frac{100}{0.5} = 200',
      isConvergent: true
    },
    {
      id: 'alternating',
      title: 'Alternating Sign Series',
      aLabel: 'a = 10',
      xLabel: 'x = -0.5',
      badge: 'x = -0.5 (-1 < x < 0)',
      badgeClass: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      eqTag: 'Eq. 2.1c',
      tex: '10 - 5 + 2.5 - 1.25 + 0.625 - \\dots',
      steps: [
        'Term 1: a = 10',
        'Term 2: 10 \\times (-0.5) = -5',
        'Term 3: -5 \\times (-0.5) = 2.5',
        'Term 4: 2.5 \\times (-0.5) = -1.25'
      ],
      explanation: 'Multiplying by a negative multiplier $x = -0.5$ causes the terms to oscillate between positive and negative values while rapidly decaying in size. The sum converges cleanly.',
      resultTex: 'S = \\frac{10}{1 - (-0.5)} = \\frac{10}{1.5} = 6.67',
      isConvergent: true
    },
    {
      id: 'cashflow',
      title: 'Financial Cash Flow Stream',
      aLabel: 'a = \\$1,000',
      xLabel: 'x = 0.90',
      badge: 'Discounting (x = 0.90)',
      badgeClass: 'bg-amber-100 text-amber-800 border-amber-200',
      eqTag: 'Eq. 2.1d',
      tex: '\\$1,000 + \\$900 + \\$810 + \\$729 + \\$656.10 + \\dots',
      steps: [
        'Year 1: a = \\$1,000',
        'Year 2: \\$1,000 \\times 0.9 = \\$900',
        'Year 3: \\$900 \\times 0.9 = \\$810',
        'Year 4: \\$810 \\times 0.9 = \\$729'
      ],
      explanation: 'In finance, future payments are discounted by $x = \\frac{1}{1+r}$. Here, a \\$1,000 annual cash stream discounted at $r \\approx 11.1\\%$ ($x=0.90$) converges to a finite present value.',
      resultTex: 'S = \\frac{\\$1,000}{1 - 0.90} = \\frac{\\$1,000}{0.10} = \\$10,000',
      isConvergent: true
    }
  ];

  // --- QUIZ STATE ---
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [showSolutions, setShowSolutions] = useState<boolean>(false);
  const [showHints, setShowHints] = useState<Record<number, boolean>>({});

  // Calculation logic
  const calculateSeries = () => {
    const items = [];
    let runningSum = 0;
    
    // Safety limit to 20 terms max for visual display
    const limit = Math.min(Math.max(numTerms, 1), 20);
    
    for (let i = 0; i < limit; i++) {
      const termValue = firstTerm * Math.pow(ratio, i);
      runningSum += termValue;
      items.push({
        n: i,
        value: termValue,
        runningSum: runningSum
      });
    }

    const isConvergent = Math.abs(ratio) < 1;
    const infiniteSum = isConvergent ? firstTerm / (1 - ratio) : null;

    return { items, finalFiniteSum: runningSum, isConvergent, infiniteSum };
  };

  const { items: seriesItems, finalFiniteSum, isConvergent, infiniteSum } = calculateSeries();

  const mathQuizzes = [
    {
      id: 1,
      question: 'In a geometric series with first term $a = 100$ and common ratio $x = 0.5$, what is the sum out to infinity?',
      options: [
        '100',
        '150',
        '200',
        'Infinity'
      ],
      correctIndex: 2,
      explanation: 'Using the infinite geometric series formula $S = \\frac{a}{1 - x}$, we plug in $a = 100$ and $x = 0.5$: $S = \\frac{100}{1 - 0.5} = \\frac{100}{0.5} = 200$.',
      hint: 'Apply the formula: sum = first term / (1 - ratio).'
    },
    {
      id: 2,
      question: 'What is the crucial condition for an infinite geometric series to converge to a finite number?',
      options: [
        'The first term $a$ must be less than 1',
        'The common ratio $x$ must be exactly 1',
        'The absolute value of the ratio $|x|$ must be less than 1 ($-1 < x < 1$)',
        'The ratio $x$ must be greater than 1'
      ],
      correctIndex: 2,
      explanation: 'For the sum to not blow up to infinity (or negative infinity), each subsequent term must shrink. This requires multiplying by a fraction whose magnitude is less than 1. Thus, $|x| < 1$.',
      hint: 'Think about what happens to the terms as $n$ goes to infinity. They must get smaller and approach zero.'
    },
    {
      id: 3,
      question: 'If a stock pays a constant dividend of \\$2 (so $a = \\frac{2}{1+r}$) and the discount rate is $r = 0.10$, making the ratio $x = \\frac{1}{1.10}$, what does the series sum to?',
      options: [
        '\\$2.00',
        '\\$10.00',
        '\\$20.00',
        '\\$22.00'
      ],
      correctIndex: 2,
      explanation: 'Plugging the series into the formula $\\frac{a}{1-x}$ translates algebraically to $P_0 = \\frac{D}{r}$. Therefore, $P_0 = \\frac{\\$2}{0.10} = \\$20.00$.',
      hint: 'Remember that the algebra simplifies this specific sequence into the Zero-Growth formula: $P_0 = D / r$.'
    }
  ];

  const handleSelectOption = (qId: number, oIdx: number) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qId]: oIdx }));
  };

  const handleToggleHint = (qId: number) => {
    setShowHints(prev => ({ ...prev, [qId]: !prev[qId] }));
  };

  const isAllCorrect = mathQuizzes.every(q => answers[q.id] === q.correctIndex);

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={onBackToSyllabus}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-sans text-sm font-semibold transition-colors bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-xl w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Syllabus
        </button>

        <div className="flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-800 rounded-xl w-fit font-mono text-xs font-bold border border-amber-200 shadow-sm">
          <Sparkles className="w-4 h-4" />
          <span>ALGEBRA II SIDE QUEST</span>
        </div>
      </div>

      <div className="text-center space-y-4 py-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight font-sans">
          Geometric Series & Convergence
        </h1>
        <p className="text-slate-600 font-serif text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Master the math that proves an infinite sum of cash flows can equal a finite, bounded price.
        </p>
      </div>

      {/* CORE THEORY GRID */}
      <div className="grid grid-cols-1 gap-6">
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-indigo-600" />
              <h3 className="text-xl font-bold font-sans text-slate-800">What is a Geometric Series?</h3>
            </div>
            
            <p className="text-slate-600 font-serif text-sm leading-relaxed">
              {processMathText('A <span className="font-bold text-slate-800">geometric series</span> is a sum of numbers where each term after the first ($a$) is obtained by multiplying the previous term by a constant multiplier called the <span className="font-bold text-slate-800">common ratio</span> ($x$):')}
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-center">
              <MathSpan tex="S_n = a + a(x) + a(x)^2 + a(x)^3 + \dots + a(x)^{n-1}" block={true} />
            </div>

            {/* INTERACTIVE EXAMPLE TABS */}
            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">Explore Examples (a & x Variations):</span>
                <span className="text-[11px] font-mono font-bold text-indigo-600">{activeExampleTab + 1} of {conceptExamples.length}</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 bg-slate-100 rounded-xl">
                {conceptExamples.map((ex, idx) => (
                  <button
                    key={ex.id}
                    onClick={() => setActiveExampleTab(idx)}
                    className={`px-2 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all text-center truncate ${
                      activeExampleTab === idx
                        ? 'bg-white text-indigo-900 shadow-sm border border-slate-200 font-bold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                    }`}
                  >
                    Ex {idx + 1}: {ex.xLabel}
                  </button>
                ))}
              </div>

              {/* ACTIVE EXAMPLE CARD */}
              {(() => {
                const ex = conceptExamples[activeExampleTab];
                return (
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3 transition-all">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/80 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-sans font-bold text-xs sm:text-sm text-slate-800">{ex.title}</span>
                        <span className={`px-2 py-0.5 rounded-full font-mono text-[10px] font-bold border ${ex.badgeClass}`}>
                          {ex.badge}
                        </span>
                      </div>
                      <span className="font-mono text-xs font-bold bg-slate-200 text-slate-700 px-2.5 py-0.5 rounded-full">
                        {ex.eqTag}
                      </span>
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl p-3">
                      <MathSpan tex={ex.tex} block={true} />
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-white/70 p-2.5 rounded-xl border border-slate-100">
                      {ex.steps.map((st, sIdx) => (
                        <div key={sIdx} className="text-slate-700 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 flex-shrink-0" />
                          <span>{processMathText(`$${st}$`)}</span>
                        </div>
                      ))}
                    </div>

                    <p className="text-xs font-serif text-slate-600 leading-relaxed">
                      {processMathText(ex.explanation)}
                    </p>

                    <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-500 font-semibold">Infinite Sum Result:</span>
                      <span className={`font-bold ${ex.isConvergent ? 'text-indigo-700' : 'text-rose-700'}`}>
                        {processMathText(`$${ex.resultTex}$`)}
                      </span>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>

        <div className="bg-indigo-900 rounded-2xl p-6 sm:p-8 shadow-md border border-indigo-800 text-white flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Activity className="w-6 h-6 text-indigo-400" />
              <h3 className="text-xl font-bold font-sans text-white">The Infinite Limit (Convergence)</h3>
            </div>

            <p className="prose prose-invert prose-sm font-serif leading-relaxed text-indigo-100">
              {processMathText('If the magnitude of the common ratio is strictly less than 1 ($|x| < 1$), every subsequent term gets exponentially smaller. The series <span className="font-bold text-white">converges</span> to a bounded limit:')}
            </p>

            <div className="bg-indigo-950/70 border border-indigo-800 rounded-xl p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-sans font-bold text-indigo-300 uppercase">Sum of Infinite Geometric Series</span>
                <span className="font-mono text-xs font-bold bg-indigo-800 text-indigo-100 px-2.5 py-0.5 rounded-full">
                  Eq. 2.2
                </span>
              </div>
              <MathSpan tex="S = \frac{\text{first term}}{1 - \text{ratio}} = \frac{a}{1 - x}" block={true} />
            </div>

            <p className="font-serif text-xs sm:text-sm text-indigo-200 leading-relaxed">
              {processMathText('This one algebraic formula is the mathematical engine behind all of investing. It proves that an infinite string of future cash flows has a bounded, finite price today.')}
            </p>

            {/* COMPARISON SUMMARY GRID */}
            <div className="pt-3 border-t border-indigo-800/80 space-y-2">
              <h4 className="text-xs font-mono font-bold text-indigo-300 uppercase tracking-wider">
                Multipliers At A Glance
              </h4>
              <div className="grid grid-cols-2 gap-2 text-[11px] font-sans">
                <div className="bg-indigo-950/60 p-2.5 rounded-xl border border-indigo-800/60 space-y-1">
                  <div className="font-mono font-bold text-rose-300">{processMathText('Case 1: $|x| \\ge 1.0$')}</div>
                  <div className="text-indigo-200">{processMathText('Terms grow or stay constant. Series diverges to $\\infty$.')}</div>
                </div>
                <div className="bg-indigo-950/60 p-2.5 rounded-xl border border-indigo-800/60 space-y-1">
                  <div className="font-mono font-bold text-emerald-300">{processMathText('Case 2: $0 < x < 1.0$')}</div>
                  <div className="text-indigo-200">{processMathText('Terms decay monotonically. Sum converges cleanly.')}</div>
                </div>
                <div className="bg-indigo-950/60 p-2.5 rounded-xl border border-indigo-800/60 space-y-1">
                  <div className="font-mono font-bold text-indigo-300">{processMathText('Case 3: $-1 < x < 0$')}</div>
                  <div className="text-indigo-200">{processMathText('Terms oscillate sign while decaying. Sum converges.')}</div>
                </div>
                <div className="bg-indigo-950/60 p-2.5 rounded-xl border border-indigo-800/60 space-y-1">
                  <div className="font-mono font-bold text-amber-300">{processMathText('Case 4: Finance ($x = \\frac{1}{1+r}$)')}</div>
                  <div className="text-indigo-200">{processMathText('Cash flows discounted by rate $r$. Yields Present Value ($PV$).')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* INTERACTIVE VISUALIZER */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="bg-slate-900 px-6 py-4 border-b border-slate-800 flex items-center gap-3">
          <Calculator className="w-5 h-5 text-indigo-400" />
          <h2 className="font-sans font-bold text-white text-lg">Interactive Series Explorer</h2>
        </div>
        
        <div className="p-6 flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4 bg-slate-50 p-5 rounded-xl border border-slate-200 flex flex-col justify-between">
              <h3 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4" />
                Parameters
              </h3>
              
              <div className="space-y-2">
                <label className="text-sm font-sans font-semibold text-slate-700 flex justify-between">
                  <span>First Term (<MathSpan tex="a" />)</span>
                  <span className="text-indigo-600 font-mono">{firstTerm}</span>
                </label>
                <input
                  type="range"
                  min="10"
                  max="1000"
                  step="10"
                  value={firstTerm}
                  onChange={(e) => setFirstTerm(Number(e.target.value))}
                  className="w-full accent-indigo-600"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-sans font-semibold text-slate-700 flex justify-between">
                  <span>Common Ratio (<MathSpan tex="x" />)</span>
                  <span className="text-rose-600 font-mono">{ratio.toFixed(2)}</span>
                </label>
                <input
                  type="range"
                  min="-1.5"
                  max="1.5"
                  step="0.05"
                  value={ratio}
                  onChange={(e) => setRatio(Number(e.target.value))}
                  className="w-full accent-rose-600"
                />
                <p className="text-[10px] text-slate-500 font-sans">
                  Notice what happens to the infinite sum when |ratio| ≥ 1.0!
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-sans font-semibold text-slate-700 flex justify-between">
                  <span>Terms to display (<MathSpan tex="n" />)</span>
                  <span className="text-slate-600 font-mono">{numTerms}</span>
                </label>
                <input
                  type="range"
                  min="2"
                  max="20"
                  step="1"
                  value={numTerms}
                  onChange={(e) => setNumTerms(Number(e.target.value))}
                  className="w-full accent-slate-600"
                />
              </div>
            </div>

            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-5 space-y-4 flex flex-col justify-between">
              <div className="flex justify-between items-center border-b border-indigo-100 pb-2">
                <h3 className="text-xs font-mono font-bold text-indigo-800 uppercase tracking-wider">
                  Infinite Sum Limit
                </h3>
                <span className="font-mono text-xs font-bold bg-indigo-200/80 text-indigo-900 px-2.5 py-0.5 rounded-full">
                  Eq. 2.3
                </span>
              </div>
              
              <div className="bg-white/90 border border-indigo-100 rounded-xl p-4 shadow-sm space-y-3">
                <MathSpan tex="\sum_{i=0}^{\infty} a(x)^i = \frac{a}{1-x}" block={true} />
                <div className="flex items-center justify-between pt-2 border-t border-indigo-100/80 font-mono">
                  <span className="text-xs text-indigo-800 font-bold uppercase tracking-wider">Infinite Sum (S):</span>
                  <span className={`text-2xl font-extrabold tracking-tight ${isConvergent ? 'text-indigo-600' : 'text-rose-600'}`}>
                    {isConvergent && infiniteSum !== null ? infiniteSum.toFixed(2) : 'DIVERGES (∞)'}
                  </span>
                </div>
              </div>

              <p className="text-xs font-serif text-indigo-700 leading-relaxed">
                {isConvergent 
                  ? processMathText(`Because $|${ratio.toFixed(2)}| < 1$, the series converges. Formula: $S = \\frac{${firstTerm}}{1 - ${ratio.toFixed(2)}} = ${infiniteSum?.toFixed(2)}$.`)
                  : processMathText(`Because $|${ratio.toFixed(2)}| \\ge 1$, the series diverges. The sum grows without bound.`)
                }
              </p>
            </div>
          </div>

          <div className="w-full bg-slate-950 rounded-xl p-4 overflow-hidden flex flex-col">
            <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-4 px-2">
              Step-by-Step Visualization
            </h3>
            
            <div className="overflow-x-auto pb-4 flex-1">
              <div className="flex gap-2 min-w-max px-2">
                {seriesItems.map((item) => (
                  <div key={item.n} className="flex flex-col gap-2 items-center w-20">
                    <div className="h-40 w-full bg-slate-900 border border-slate-800 rounded flex items-end justify-center pb-2 relative overflow-hidden group">
                       <div 
                         className={`w-12 rounded-sm transition-all duration-300 ${item.value >= 0 ? 'bg-indigo-500' : 'bg-rose-500'}`}
                         style={{ 
                           height: isConvergent && infiniteSum ? `${Math.min(100, Math.max(2, (Math.abs(item.value) / Math.abs(firstTerm)) * 100))}%` : '100%',
                           opacity: Math.max(0.2, 1 - (item.n * 0.05))
                         }}
                       />
                       
                       {/* Tooltip on hover */}
                       <div className="absolute inset-0 bg-slate-900/95 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center p-2 text-center transition-opacity z-10 border border-slate-700">
                          <span className="text-[10px] text-slate-400 font-mono mb-1">Term {item.n}</span>
                          <span className={`text-xs font-bold font-mono ${item.value >= 0 ? 'text-indigo-400' : 'text-rose-400'}`}>
                            {item.value.toFixed(1)}
                          </span>
                       </div>
                    </div>
                    
                    <div className="text-[10px] font-mono text-slate-500 font-semibold bg-slate-900 px-2 py-0.5 rounded border border-slate-800 w-full text-center truncate">
                      {item.n === 0 ? 'a' : `a(${ratio.toFixed(2)})^${item.n}`}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-slate-800 px-2 flex justify-between items-center text-sm font-mono text-slate-400">
               <span>Finite Sum (first {numTerms} terms):</span>
               <span className="font-bold text-white text-lg">{finalFiniteSum.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* QUIZ SECTION */}
      <div className="bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-slate-800">
        <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-indigo-400" />
            <h2 className="font-sans font-bold text-white text-lg">Knowledge Check</h2>
          </div>
        </div>
        
        <div className="p-6 sm:p-8 space-y-8">
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

        {submitted && isAllCorrect && (
          <div className="m-6 sm:m-8 bg-emerald-950/80 border border-emerald-500/50 rounded-2xl p-5 text-emerald-200 flex items-start gap-3 shadow-lg">
            <Sparkles className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5 animate-bounce" />
            <div className="space-y-1">
              <h5 className="font-sans font-bold text-emerald-300 text-base">
                Geometric Master! 100% Correct!
              </h5>
              <p className="font-serif text-xs sm:text-sm text-emerald-200/90 leading-relaxed">
                Fantastic job! You've mastered the secret to infinity. You're now ready to value cash flows that continue forever in the Flat Valuation Lab!
              </p>
              <button 
                onClick={onLinkToUnit3_5}
                className="mt-3 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-colors shadow shadow-emerald-900/20"
              >
                Continue to Unit 3.5: Flat Valuation ➔
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3 px-6 sm:px-8 py-5 border-t border-slate-800 bg-slate-950">
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
