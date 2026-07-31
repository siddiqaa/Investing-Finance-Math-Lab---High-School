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
  Sigma, 
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import { MathSpan, processMathText } from '../lib/math';

interface SigmaSideQuestProps {
  onBackToSyllabus: () => void;
  onLinkToUnit1: () => void;
}

export const SigmaSideQuest: React.FC<SigmaSideQuestProps> = ({ onBackToSyllabus, onLinkToUnit1 }) => {
  // --- SUMMATION EXPANDER STATE ---
  const [expanderSummand, setExpanderSummand] = useState<'i' | '2i-1' | 'i2'>('i');
  const [expanderStart, setExpanderStart] = useState<number>(1);
  const [expanderEnd, setExpanderEnd] = useState<number>(5);

  // --- QUIZ STATE ---
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [showSolutions, setShowSolutions] = useState<boolean>(false);
  const [showHints, setShowHints] = useState<Record<number, boolean>>({});

  // Summation expander calculation
  const getExpanderCalculation = () => {
    const items: { i: number; term: number; tex: string }[] = [];
    let sum = 0;
    const limit = Math.min(expanderEnd, expanderStart + 10); // Limit to max 10 terms for visual safety
    for (let i = expanderStart; i <= limit; i++) {
      let term = 0;
      let tex = '';
      if (expanderSummand === 'i') {
        term = i;
        tex = `${i}`;
      } else if (expanderSummand === '2i-1') {
        term = 2 * i - 1;
        tex = `2(${i}) - 1 = ${term}`;
      } else {
        term = i * i;
        tex = `${i}^2 = ${term}`;
      }
      sum += term;
      items.push({ i, term, tex });
    }
    return { items, sum };
  };
  const { items: expanderItems, sum: expanderSum } = getExpanderCalculation();

  // Side Quest Quizzes - High School Algebra II Level
  const mathQuizzes = [
    {
      id: 1,
      question: 'Calculate the value of the finite sum: $\\sum_{i=2}^{5} (2i + 1)$',
      options: [
        '30',
        '32',
        '36',
        '40'
      ],
      correctIndex: 1, // 2(2)+1 = 5, 2(3)+1 = 7, 2(4)+1 = 9, 2(5)+1 = 11. Sum = 5+7+9+11 = 32
      explanation: 'We expand the sum starting at the lower limit $i = 2$ and ending at the upper limit $i = 5$:\n- For $i = 2$: $2(2) + 1 = 5$\n- For $i = 3$: $2(3) + 1 = 7$\n- For $i = 4$: $2(4) + 1 = 9$\n- For $i = 5$: $2(5) + 1 = 11$\nNow, we add these terms together: $5 + 7 + 9 + 11 = 32$.',
      hint: 'Substitute $i = 2, 3, 4, \\text{ and } 5$ into the term $(2i + 1)$, then add all four resulting numbers together.'
    },
    {
      id: 2,
      question: 'Which of the following represents the series $3 + 6 + 9 + 12 + 15$ written in Sigma notation?',
      options: [
        '$\\sum_{i=1}^{5} 3i$',
        '$\\sum_{i=1}^{5} (i + 3)$',
        '$\\sum_{i=3}^{15} i$',
        '$\\sum_{i=0}^{4} 3i$'
      ],
      correctIndex: 0,
      explanation: 'Each term in the series is a multiple of 3:\n- $1^{\\text{st}}$ term: $3(1) = 3$\n- $2^{\\text{nd}}$ term: $3(2) = 6$\n- $3^{\\text{rd}}$ term: $3(3) = 9$\n- $4^{\\text{th}}$ term: $3(4) = 12$\n- $5^{\\text{th}}$ term: $3(5) = 15$\nThis corresponds to the summand $3i$ with a counter $i$ starting at $1$ and ending at $5$, written as $\\sum_{i=1}^{5} 3i$.',
      hint: 'Notice that each term is $3$ times its position in the list (1st term is $3 \\times 1$, 2nd is $3 \\times 2$, and so on up to the 5th term).'
    },
    {
      id: 3,
      question: 'What is the value of the sum: $\\sum_{j=1}^{4} j^2$?',
      options: [
        '10',
        '16',
        '20',
        '30'
      ],
      correctIndex: 3,
      explanation: 'We substitute the values $j = 1, 2, 3, \\text{ and } 4$ into the summand $j^2$:\n- For $j = 1$: $1^2 = 1$\n- For $j = 2$: $2^2 = 4$\n- For $j = 3$: $3^2 = 9$\n- For $j = 4$: $4^2 = 16$\nAdding these terms: $1 + 4 + 9 + 16 = 30$.',
      hint: 'Square the numbers 1, 2, 3, and 4, then add those squares together.'
    },
    {
      id: 4,
      question: 'In a summation expression like $\\sum_{i=a}^{b} f(i)$, what does the "Index of Summation" represent?',
      options: [
        'The final value where the sum stops accumulating',
        'The variable that acts as a counter, incrementing by 1 at each step of the sum',
        'The formula used to calculate each individual term',
        'The starting value of the summation calculation'
      ],
      correctIndex: 1,
      explanation: 'The Index of Summation (represented by a variable like $i$, $j$, or $k$) is the dummy variable that acts as a loop counter. It starts at the lower limit $a$, increases by exactly $1$ at each step, and stops when it reaches the upper limit $b$.',
      hint: 'Think of the letter $i$ in $\\sum_{i=a}^{b}$. It increases from $a$ to $b$ step-by-step like a counter.'
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
    <div className="space-y-8" id="sigma-math-side-quest-module">
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
            Side Quest #1
          </span>
          <span className="font-mono text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full font-bold border border-slate-200">
            Algebra II Math Focus
          </span>
        </div>
      </div>

      {/* Hero Accent Card */}
      <div className="p-8 bg-slate-900 border border-slate-950 text-slate-100 rounded-3xl relative overflow-hidden shadow-md">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-4 max-w-3xl">
          <div className="flex items-center gap-2.5">
            <div className="bg-indigo-600 p-2 rounded-xl">
              <Sigma className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="font-mono text-xs text-indigo-400 uppercase tracking-widest font-extrabold block">MATH LAB COMPANION</span>
              <h1 className="font-sans font-extrabold text-2xl sm:text-3xl text-white tracking-tight leading-none mt-0.5">
                The Language of Sums: Sigma Notation
              </h1>
            </div>
          </div>
          <p className="font-serif text-slate-300 text-sm sm:text-base leading-relaxed">
            {processMathText('Ever wonder how mathematicians write down extremely long patterns of numbers without filling up the entire chalkboard? Welcome to <span className="font-bold text-slate-800">Sigma Notation ($\\sum$)</span>! This elegant shorthand allows us to express large sums of numbers with absolute clarity.')}
          </p>
          <div className="pt-2">
            <button
              onClick={onLinkToUnit1}
              className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 font-sans font-bold px-4 py-2 rounded-xl border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-indigo-400" />
              <span>Link Back to Unit 1 (Time Value of Money)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Concept Section 1: The Notation */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div className="space-y-1">
          <span className="font-mono text-xs text-indigo-600 font-extrabold uppercase tracking-wider block">Concept 1</span>
          <h2 className="font-sans font-extrabold text-lg sm:text-xl text-slate-950 tracking-tight flex items-center flex-wrap gap-1">
            <span>Demystifying Sigma (</span>
            <MathSpan tex="\sum" />
            <span>) Notation</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          <div className="xl:col-span-7 font-serif text-slate-700 text-sm sm:text-base leading-relaxed space-y-4">
            <p>
              {processMathText('When we want to add together a list of numbers that follow a specific pattern, we use the Greek uppercase letter <span className="font-bold text-slate-800">Sigma ($\\sum$)</span>. Sigma is the mathematical command for "sum up these values."')}
            </p>
            <p>
              {processMathText('Think of Sigma as a specialized, friendly <span className="font-bold text-slate-800">counting loop</span> that tells you to run a sequence of additions. Let\'s look at the anatomy of a summation expression:')}
            </p>
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2 font-sans text-xs sm:text-sm text-slate-800">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <p className="font-bold text-indigo-950 flex items-center gap-1.5">
                  <Calculator className="w-4 h-4 text-indigo-600" />
                  <span>{processMathText('The Anatomy of: $\\sum_{i=a}^{b} f(i)$')}</span>
                </p>
                <span className="font-mono text-xs font-bold bg-indigo-100 text-indigo-800 px-2.5 py-0.5 rounded-full">
                  Eq. 1.1
                </span>
              </div>
              <ul className="list-disc list-inside space-y-1.5 text-slate-600 pl-1 font-sans text-xs">
                <li>
                  <strong className="text-slate-800">
                    <MathSpan tex="\sum" /> (The Symbol):
                  </strong>{' '}
                  Represents the instruction to sum terms together.
                </li>
                <li>
                  <strong className="text-slate-800">
                    Index of Summation (<MathSpan tex="i" />):
                  </strong>{' '}
                  The variable that acts as our counter.
                </li>
                <li>
                  <strong className="text-slate-800">
                    Lower Limit of Summation (<MathSpan tex="a" />):
                  </strong>{' '}
                  The starting value of our counter <MathSpan tex="i" />.
                </li>
                <li>
                  <strong className="text-slate-800">
                    Upper Limit of Summation (<MathSpan tex="b" />):
                  </strong>{' '}
                  The ending value of our counter <MathSpan tex="i" /> (inclusive).
                </li>
                <li>
                  <strong className="text-slate-800">
                    Summand (<MathSpan tex="f(i)" />):
                  </strong>{' '}
                  The mathematical formula applied to each counter value to create the term.
                </li>
              </ul>
              <div className="pt-1 border-t border-slate-200/80">
                <MathSpan tex="\sum_{i=a}^{b} f(i) = f(a) + f(a+1) + \dots + f(b)" block />
              </div>
            </div>
            <p>
              {processMathText('Let\'s trace a simple example! The expression $\\sum_{i=1}^{4} i^2$ translates to: "Start at $i=1$. Square $i$, write it down, then increase $i$ by $1$. Do it again for $i=2$, $i=3$, and stop after $i=4$. Finally, add all those squares together."')}
            </p>
            <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-2xl">
              <div className="flex justify-between items-center mb-1">
                <span className="font-mono text-[10px] uppercase font-bold text-indigo-600 tracking-wider">Example Summation</span>
                <span className="font-mono text-xs font-bold bg-indigo-200/80 text-indigo-900 px-2.5 py-0.5 rounded-full">
                  Eq. 1.2
                </span>
              </div>
              <MathSpan tex="\sum_{i=1}^{4} i^2 = 1^2 + 2^2 + 3^2 + 4^2 = 1 + 4 + 9 + 16 = 30" block />
            </div>
          </div>

          {/* Interactive Summand Expander Sandbox */}
          <div className="xl:col-span-5 bg-slate-50 border border-slate-250 p-5 rounded-2xl space-y-4 shadow-3xs">
            <div className="flex items-center gap-1.5 border-b border-slate-200 pb-2">
              <SlidersHorizontal className="w-4 h-4 text-indigo-600" />
              <h3 className="font-sans font-bold text-xs uppercase tracking-wider text-slate-700">Notation Expander Sandbox</h3>
            </div>

            <div className="space-y-3 font-sans text-xs sm:text-sm">
              <div className="space-y-1">
                <label className="text-slate-500 block font-semibold">Choose Summand Formula ($f(i)$):</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setExpanderSummand('i')}
                    className={`px-3 py-1.5 rounded-lg border font-mono text-xs font-bold transition-colors cursor-pointer ${
                      expanderSummand === 'i'
                        ? 'bg-indigo-600 text-white border-transparent'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    i (linear)
                  </button>
                  <button
                    onClick={() => setExpanderSummand('2i-1')}
                    className={`px-3 py-1.5 rounded-lg border font-mono text-xs font-bold transition-colors cursor-pointer ${
                      expanderSummand === '2i-1'
                        ? 'bg-indigo-600 text-white border-transparent'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    2i - 1 (odd)
                  </button>
                  <button
                    onClick={() => setExpanderSummand('i2')}
                    className={`px-3 py-1.5 rounded-lg border font-mono text-xs font-bold transition-colors cursor-pointer ${
                      expanderSummand === 'i2'
                        ? 'bg-indigo-600 text-white border-transparent'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    i² (quadratic)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="space-y-1">
                  <label className="text-slate-500 block font-semibold">Lower Limit (a):</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={expanderStart}
                    onChange={(e) => {
                      const val = Math.max(1, Math.min(5, parseInt(e.target.value) || 1));
                      setExpanderStart(val);
                      if (expanderEnd <= val) {
                        setExpanderEnd(val + 1);
                      }
                    }}
                    className="w-full bg-white border border-slate-250 rounded-lg px-2.5 py-1.5 font-mono text-xs text-slate-800"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-500 block font-semibold">Upper Limit (b):</label>
                  <input
                    type="number"
                    min="2"
                    max="10"
                    value={expanderEnd}
                    onChange={(e) => setExpanderEnd(Math.max(expanderStart + 1, Math.min(10, parseInt(e.target.value) || expanderStart + 1)))}
                    className="w-full bg-white border border-slate-250 rounded-lg px-2.5 py-1.5 font-mono text-xs text-slate-800"
                  />
                </div>
              </div>

              {/* Visualized Math Statement */}
              <div className="bg-slate-900 border border-slate-950 p-3.5 rounded-xl text-center space-y-1.5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1">
                  <span className="text-[10px] text-slate-400 font-mono block">LIVE MATH EXPRESSION</span>
                  <span className="font-mono text-[10px] font-bold bg-slate-800 text-indigo-400 px-2 py-0.5 rounded">
                    Eq. 1.3
                  </span>
                </div>
                <div className="text-white text-sm">
                  {expanderSummand === 'i' && <MathSpan tex={`\\sum_{i=${expanderStart}}^{${expanderEnd}} i`} block />}
                  {expanderSummand === '2i-1' && <MathSpan tex={`\\sum_{i=${expanderStart}}^{${expanderEnd}} (2i - 1)`} block />}
                  {expanderSummand === 'i2' && <MathSpan tex={`\\sum_{i=${expanderStart}}^{${expanderEnd}} i^2`} block />}
                </div>
              </div>

              {/* Expansion Detail */}
              <div className="bg-white border border-slate-200 p-3.5 rounded-xl space-y-2 font-mono text-xs text-slate-600">
                <span className="font-sans font-bold text-slate-800 block">Expansion Step-by-Step:</span>
                <div className="divide-y divide-slate-100">
                  {expanderItems.map((item, idx) => (
                    <div key={idx} className="py-1.5 flex justify-between items-center text-[11px]">
                      <span className="text-slate-400">Term i = {item.i}:</span>
                      <span className="text-indigo-600 font-semibold">{item.tex}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-sm font-bold text-slate-800">
                  <span className="font-sans">Total Sum:</span>
                  <span className="text-indigo-600 font-bold">{expanderSum}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Knowledge Check Panel */}
      <div className="bg-slate-900 border border-slate-950 rounded-3xl p-6 sm:p-8 text-slate-100 shadow-xl space-y-6 relative overflow-hidden" id="sigma-math-knowledge-check">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Check Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-extrabold uppercase tracking-widest">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Interactive Practice</span>
            </div>
            <h4 className="font-sans font-extrabold text-xl sm:text-2xl text-white tracking-tight">
              Sigma Summation Practice Quiz
            </h4>
            <p className="font-serif text-slate-300 text-sm max-w-2xl">
              Test your understanding of index counters, limits, expansion, and writing patterns in Sigma shorthand.
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
                Sigma Master! 100% Correct!
              </h5>
              <p className="font-serif text-xs sm:text-sm text-emerald-200/90 leading-relaxed">
                Fantastic job! You have fully mastered reading, expanding, and writing Sigma summations. You are now ready to tackle time value formulas, cash flow tables, and asset growth algorithms with confidence!
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

export default SigmaSideQuest;
