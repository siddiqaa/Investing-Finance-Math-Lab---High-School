import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  RefreshCw, 
  Layers,
  ChevronsRight
} from 'lucide-react';
import { MathSpan, processMathText } from '../lib/math';
import { useMastery } from '../context/MasteryContext';

interface ProductNotationQuestProps {
  onBackToSyllabus: () => void;
  onLinkToUnit6: () => void;
}

export const ProductNotationQuest: React.FC<ProductNotationQuestProps> = ({
  onBackToSyllabus,
  onLinkToUnit6
}) => {
  const { masteredUnits, submitAnswer } = useMastery();
  const mastered = masteredUnits['side_quest_pi'] === true;

  // Quiz state
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  // Quiz questions
  const quizQuestions = [
    {
      id: 'q1',
      question: 'What does the Capital Pi symbol ($\\prod_{k=1}^t$) represent in mathematical finance?',
      options: [
        'Summing up a list of numbers linearly like $x_1 + x_2 + \\dots + x_t$',
        'Multiplying a series of factors sequentially like $(1+r_1)(1+r_2)\\dots(1+r_t)$',
        'Finding the maximum value in a set of asset returns',
        'Dividing the initial stock price by total trading days'
      ],
      correctIndex: 1,
      explanation: 'Capital Pi ($\\prod$) is the mathematical operator for sequential multiplication. In asset pricing, $S_t = S_0 \\prod_{k=1}^t (1+r_k)$ multiplies consecutive daily growth factors.'
    },
    {
      id: 'q2',
      question: 'Why is an additive formula $\\cancel{S_t = S_0 (1 + r_1 + r_2 + \\dots)}$ mathematically WRONG for stock price compounding?',
      options: [
        'Because stock exchanges ban addition algorithms in trading software',
        'Because daily price percentage changes operate on yesterday\'s accumulated total, not the original starting principal',
        'Because percentage changes are always required to sum to 100%',
        'Because addition is only permitted for continuous interest rates'
      ],
      correctIndex: 1,
      explanation: 'Compounding is inherently multiplicative. Each day\'s return applies to the accumulated ending value of the previous day ($S_{t-1}$), requiring factor multiplication.'
    },
    {
      id: 'q3',
      question: 'How do quantitative analysts convert a Capital Pi product ($\\prod$) into a simple Sigma sum ($\\sum$)?',
      options: [
        'By multiplying every term by 100',
        'By taking the natural logarithm ($\\ln$) of the stock price equation',
        'By taking the square root of all return percentages',
        'By setting all return values to zero'
      ],
      correctIndex: 1,
      explanation: 'Since $\\ln(a \\cdot b) = \\ln(a) + \\ln(b)$, taking logarithms transforms $\\ln(S_t) = \\ln(S_0) + \\sum_{k=1}^t \\ln(1+r_k)$, turning multiplication into addition of log-returns!'
    }
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const currentQ = quizQuestions[currentQuestionIndex];

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
    setShowExplanation(true);
    submitAnswer(currentQ.id, index, currentQ.correctIndex, 'side_quest_pi');
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    setCurrentQuestionIndex((prev) => (prev + 1) % quizQuestions.length);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Top Banner Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <button
          onClick={onBackToSyllabus}
          className="inline-flex items-center space-x-2 text-xs font-sans font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-all cursor-pointer"
          id="btn-back-syllabus-pi"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Syllabus</span>
        </button>

        <div className="flex items-center space-x-3">
          {mastered && (
            <span className="inline-flex items-center space-x-1.5 bg-emerald-100 text-emerald-800 text-xs font-sans font-bold px-3 py-1 rounded-full border border-emerald-300">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Quest Mastered</span>
            </span>
          )}
          <button
            onClick={onLinkToUnit6}
            className="inline-flex items-center space-x-1.5 text-xs font-sans font-bold text-slate-700 hover:text-indigo-600 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-all cursor-pointer"
            id="btn-link-unit-6"
          >
            <span>Unit 6: Random Walks</span>
            <ChevronsRight className="w-4 h-4 text-indigo-500" />
          </button>
        </div>
      </div>

      {/* Main Title Header Card */}
      <div className="bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden space-y-4 border border-indigo-950">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <span className="font-mono text-9xl font-extrabold text-white">∏</span>
        </div>

        <div className="space-y-2 relative z-10">
          <div className="flex items-center space-x-2">
            <span className="bg-purple-800/80 text-purple-200 text-xs font-mono px-2.5 py-1 rounded-full border border-purple-700">
              Math Side Quest 3.5
            </span>
            <span className="bg-indigo-950 text-indigo-300 text-xs font-mono px-2.5 py-1 rounded-full border border-indigo-800">
              Algebra & Product Series
            </span>
          </div>
          <h1 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Capital Pi (<MathSpan tex="\prod" />) & Multiplicative Product Series
          </h1>
          <p className="text-purple-200 text-sm font-serif max-w-3xl leading-relaxed">
            Unpack the mathematics behind continuous asset compounding: how Capital Pi product notation (<MathSpan tex="\prod" />) governs stock random walks, and how it differs fundamentally from Addition Series (<MathSpan tex="\sum" />) and Geometric Series (<MathSpan tex="\sum a r^k" />).
          </p>
        </div>

        {/* Featured Equation Highlight */}
        <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-xl text-center space-y-2">
          <div className="text-xs font-mono text-purple-300 uppercase tracking-widest font-semibold">
            The Fundamental Stock Price Product Equation
          </div>
          <div className="text-white text-xl sm:text-2xl font-mono py-2 overflow-x-auto">
            <MathSpan tex="S_t = S_0 \prod_{k=1}^t (1 + r_k)" block={true} />
          </div>
          <div className="text-xs font-sans text-purple-200 max-w-2xl mx-auto leading-relaxed">
            Where <MathSpan tex="S_0" /> is initial price, <MathSpan tex="r_k" /> is the random return on step <MathSpan tex="k" />, and <MathSpan tex="\prod_{k=1}^t" /> multiplies all growth factors <MathSpan tex="(1 + r_1)(1 + r_2)\dots(1 + r_t)" />.
          </div>
        </div>
      </div>

      {/* Section 1: The Three Mathematical Series Comparison */}
      <div className="space-y-4">
        <div className="space-y-1">
          <h2 className="font-sans font-bold text-slate-900 text-lg flex items-center space-x-2">
            <Layers className="w-5 h-5 text-indigo-600" />
            <span>1. The Three Types of Mathematical Series in High School Algebra</span>
          </h2>
          <p className="text-sm text-slate-600 font-serif">
            Students often confuse summation, geometric series, and product series. Here is the exact mathematical distinction between all three:
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {/* Series 1: Summation */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 sm:p-6 space-y-4 shadow-xs">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded border border-indigo-200">
                  Type A
                </span>
                <span className="text-xs font-sans text-slate-500 font-semibold">Additive Series</span>
              </div>
              <h3 className="font-sans font-bold text-slate-900 text-lg">
                Adding Series (<MathSpan tex="\sum_{i=1}^N x_i" />)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-serif leading-relaxed">
                Summing up isolated, independent numerical quantities sequentially using Capital Sigma.
              </p>
              <div className="bg-white p-3 rounded-lg border border-slate-200 text-center font-mono text-xs sm:text-sm">
                <MathSpan tex="\sum_{i=1}^N x_i = x_1 + x_2 + \dots + x_N" block={true} />
              </div>
            </div>

            <div className="bg-indigo-50/70 border border-indigo-100 p-3.5 rounded-lg text-xs space-y-1 font-sans text-indigo-950">
              <span className="font-bold block text-indigo-900">Finance Application:</span>
              <div>{processMathText('Summing isolated cash flow checks received across separate years (e.g. adding dividend payments $D_1 + D_2 + D_3$).')}</div>
            </div>

            {/* Step-by-Step Numerical Example */}
            <div className="bg-white border border-indigo-200 rounded-lg p-4 space-y-2.5">
              <div className="flex items-center justify-between border-b border-indigo-100 pb-2">
                <span className="font-mono text-xs font-bold text-indigo-700 uppercase tracking-wider">Step-by-Step Numerical Example</span>
                <span className="text-[11px] font-sans text-slate-500 font-medium">Independent Additions</span>
              </div>
              <p className="text-xs text-slate-700 font-serif leading-relaxed">
                Suppose an investor receives annual cash dividend payouts over 3 consecutive years:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-xs text-center">
                <div className="bg-slate-50 p-2 rounded border border-slate-200">
                  <span className="text-slate-500 block text-[10px]">{processMathText('Year 1 ($x_1$)')}</span>
                  <span className="font-bold text-indigo-700">$100.00</span>
                </div>
                <div className="bg-slate-50 p-2 rounded border border-slate-200">
                  <span className="text-slate-500 block text-[10px]">{processMathText('Year 2 ($x_2$)')}</span>
                  <span className="font-bold text-indigo-700">$150.00</span>
                </div>
                <div className="bg-slate-50 p-2 rounded border border-slate-200">
                  <span className="text-slate-500 block text-[10px]">{processMathText('Year 3 ($x_3$)')}</span>
                  <span className="font-bold text-indigo-700">$200.00</span>
                </div>
              </div>
              <div className="bg-indigo-950 text-white p-3 rounded text-xs font-mono text-center space-y-1">
                <div className="text-indigo-300 text-[10px] uppercase font-sans font-bold">Total Cash Flow Calculation</div>
                <div><MathSpan tex="\text{Total} = \sum_{i=1}^3 x_i = \$100 + \$150 + \$200 = \$450.00" /></div>
              </div>
              <p className="text-[11px] text-slate-600 font-sans italic">
                {processMathText('Key takeaway: Each term is added directly. Year 2 (\\$150) is independent of Year 1 (\\$100).')}
              </p>
            </div>
          </div>

          {/* Series 2: Geometric Series */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 sm:p-6 space-y-4 shadow-xs">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                  Type B
                </span>
                <span className="text-xs font-sans text-slate-500 font-semibold">Discounted Sum</span>
              </div>
              <h3 className="font-sans font-bold text-slate-900 text-lg">
                Geometric Series (<MathSpan tex="\sum_{k=0}^{\infty} a r^k" />)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-serif leading-relaxed">
                Summing infinite terms where each subsequent term is scaled down by a constant discount ratio factor <MathSpan tex="r = \frac{1}{1+d}" />.
              </p>
              <div className="bg-white p-3 rounded-lg border border-slate-200 text-center font-mono text-xs sm:text-sm">
                <MathSpan tex="S = \sum_{k=0}^{\infty} a r^k = a + a r + a r^2 + \dots = \frac{a}{1 - r}" block={true} />
              </div>
            </div>

            <div className="bg-emerald-50/70 border border-emerald-100 p-3.5 rounded-lg text-xs space-y-1 font-sans text-emerald-950">
              <span className="font-bold block text-emerald-900">Finance Application:</span>
              <div>{processMathText('Valuing constant perpetuities & Gordon Growth ($P_0 = \\frac{D_1}{r - g}$) by summing shrinking discounted future cash flows.')}</div>
            </div>

            {/* Step-by-Step Numerical Example */}
            <div className="bg-white border border-emerald-200 rounded-lg p-4 space-y-2.5">
              <div className="flex items-center justify-between border-b border-emerald-100 pb-2">
                <span className="font-mono text-xs font-bold text-emerald-700 uppercase tracking-wider">Step-by-Step Numerical Example</span>
                <span className="text-[11px] font-sans text-slate-500 font-medium">Constant Shrinking Ratio</span>
              </div>
              <p className="text-xs text-slate-700 font-serif leading-relaxed">
                Suppose a stock pays a constant $100 annual dividend forever, discounted at hurdle rate $d = 10\%$ ($r = \frac{1}{1.10} \approx 0.9091$):
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-xs text-center">
                <div className="bg-slate-50 p-2 rounded border border-slate-200">
                  <span className="text-slate-500 block text-[10px]">{processMathText('Year 0 ($a$)')}</span>
                  <span className="font-bold text-emerald-800">$100.00</span>
                </div>
                <div className="bg-slate-50 p-2 rounded border border-slate-200">
                  <span className="text-slate-500 block text-[10px]">{processMathText('Year 1 PV ($a \\cdot r$)')}</span>
                  <span className="font-bold text-emerald-800">$90.91</span>
                </div>
                <div className="bg-slate-50 p-2 rounded border border-slate-200">
                  <span className="text-slate-500 block text-[10px]">{processMathText('Year 2 PV ($a \\cdot r^2$)')}</span>
                  <span className="font-bold text-emerald-800">$82.64</span>
                </div>
              </div>
              <div className="bg-emerald-950 text-white p-3 rounded text-xs font-mono text-center space-y-1">
                <div className="text-emerald-300 text-[10px] uppercase font-sans font-bold">Infinite Perpetuity Sum Formula</div>
                <div><MathSpan tex="P_0 = \frac{\$100}{0.10} = \$1,000.00" /></div>
              </div>
              <p className="text-[11px] text-slate-600 font-sans italic">
                {processMathText('Key takeaway: Each term shrinks geometrically ($100 \\to 90.91 \\to 82.64 \\dots$), summing up to a finite total present value.')}
              </p>
            </div>
          </div>

          {/* Series 3: Capital Pi Product */}
          <div className="bg-purple-50/80 border border-purple-300 rounded-xl p-5 sm:p-6 space-y-4 shadow-sm">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-purple-700 bg-purple-100 px-2.5 py-1 rounded border border-purple-200">
                  Type C
                </span>
                <span className="text-xs font-sans text-purple-700 font-semibold">Multiplicative Series</span>
              </div>
              <h3 className="font-sans font-bold text-purple-950 text-lg">
                Capital Pi Product (<MathSpan tex="\prod_{k=1}^t (1 + r_k)" />)
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 font-serif leading-relaxed">
                Multiplying consecutive growth factors together across consecutive periods. Today's factor multiplies yesterday's accumulated total!
              </p>
              <div className="bg-white p-3 rounded-lg border border-purple-200 text-center font-mono text-xs sm:text-sm">
                <MathSpan tex="S_t = S_0 \prod_{k=1}^t (1 + r_k) = S_0 (1+r_1)(1+r_2)\dots(1+r_t)" block={true} />
              </div>
            </div>

            <div className="bg-purple-100/80 border border-purple-200 p-3.5 rounded-lg text-xs space-y-1 font-sans text-purple-950">
              <span className="font-bold block text-purple-900">Finance Application:</span>
              <span>Stock Price Random Walks & Multi-Period Wealth Trajectories. Compounding operates directly on accumulated capital!</span>
            </div>

            {/* Step-by-Step Numerical Example */}
            <div className="bg-white border border-purple-300 rounded-lg p-4 space-y-2.5">
              <div className="flex items-center justify-between border-b border-purple-100 pb-2">
                <span className="font-mono text-xs font-bold text-purple-800 uppercase tracking-wider">Step-by-Step Numerical Example</span>
                <span className="text-[11px] font-sans text-purple-600 font-medium">Multiplicative Compounding</span>
              </div>
              <p className="text-xs text-slate-700 font-serif leading-relaxed">
                {processMathText('Start with initial stock price $S_0 = \\$100$. Year 1 return $r_1 = +20\\%$ (factor $1.20$), Year 2 return $r_2 = -10\\%$ (factor $0.90$):')}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs text-center">
                <div className="bg-purple-50 p-2.5 rounded border border-purple-200">
                  <span className="text-purple-700 block text-[10px]">{processMathText('End of Year 1 ($S_1$)')}</span>
                  <div className="font-bold text-slate-800">$100.00 × 1.20</div>
                  <div className="text-indigo-700 font-bold font-mono text-xs">= $120.00</div>
                </div>
                <div className="bg-purple-50 p-2.5 rounded border border-purple-200">
                  <span className="text-purple-700 block text-[10px]">{processMathText('End of Year 2 ($S_2$)')}</span>
                  <div className="font-bold text-slate-800">$120.00 × 0.90</div>
                  <div className="text-purple-900 font-bold font-mono text-xs">= $108.00</div>
                </div>
              </div>
              <div className="bg-purple-950 text-white p-3 rounded text-xs font-mono text-center space-y-1">
                <div className="text-purple-300 text-[10px] uppercase font-sans font-bold">Capital Pi Product Chain</div>
                <div><MathSpan tex="S_2 = \$100 \times \prod_{k=1}^2 (1+r_k) = \$100 \times (1.20) \times (0.90) = \$108.00" /></div>
              </div>
              <p className="text-[11px] text-slate-700 font-sans italic">
                {processMathText('Key takeaway: Year 2\\\'s $-10\\%$ drop subtracts \\$12.00 (since it acts on \\$120), yielding \\$108.00. Naive addition ($+20\\% - 10\\% = +10\\% \\to \\$110$) ignores multiplicative compounding!')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Self-Check Quiz & Mastery Challenge */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <span className="font-mono text-xs font-bold text-purple-700 uppercase tracking-wider block">Quest 3.5 Checkpoint</span>
            <h2 className="font-sans font-bold text-slate-900 text-lg">Test Your Mastery</h2>
          </div>
          <span className="text-xs font-mono text-slate-500">
            Question {currentQuestionIndex + 1} of {quizQuestions.length}
          </span>
        </div>

        <div className="space-y-4">
          <h3 className="font-sans font-bold text-slate-800 text-base">
            {processMathText(currentQ.question)}
          </h3>

          <div className="space-y-2.5">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedAnswer === idx;
              const isCorrect = idx === currentQ.correctIndex;

              let btnStyle = "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100";
              if (showExplanation) {
                if (isCorrect) {
                  btnStyle = "bg-emerald-50 border-emerald-300 text-emerald-900 font-semibold";
                } else if (isSelected && !isCorrect) {
                  btnStyle = "bg-rose-50 border-rose-300 text-rose-900 font-semibold";
                }
              } else if (isSelected) {
                btnStyle = "bg-purple-50 border-purple-300 text-purple-900 font-semibold";
              }

              return (
                <button
                  key={idx}
                  onClick={() => !showExplanation && handleAnswerSelect(idx)}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-sans transition-all flex items-start justify-between cursor-pointer ${btnStyle}`}
                >
                  <span className="flex-1 pr-3">{processMathText(opt)}</span>
                  {showExplanation && (
                    <span className="flex-shrink-0 pt-0.5">
                      {isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : isSelected ? (
                        <XCircle className="w-4 h-4 text-rose-500" />
                      ) : null}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-3"
            >
              <div className="flex items-center space-x-2 text-xs font-sans font-bold text-slate-800">
                <HelpCircle className="w-4 h-4 text-purple-600" />
                <span>Explanation</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 font-serif leading-relaxed">
                {processMathText(currentQ.explanation)}
              </p>
              <button
                onClick={handleNextQuestion}
                className="inline-flex items-center space-x-1 text-xs font-sans font-bold text-purple-700 hover:text-purple-900 cursor-pointer pt-1"
              >
                <span>Next Question</span>
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
