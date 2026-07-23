import React, { useState } from 'react';
import { CheckCircle2, XCircle, HelpCircle, RefreshCw, Eye, Sparkles, Trophy } from 'lucide-react';
import { processMathText } from '../lib/math';

interface ScenarioState {
  selectedOption: 'A' | 'B' | null;
  pvInput: string;
  isOptionCorrect?: boolean;
  isPvCorrect?: boolean;
}

export const DiscountKnowledgeCheck: React.FC = () => {
  const [scenarios, setScenarios] = useState<Record<number, ScenarioState>>({
    1: { selectedOption: null, pvInput: '' },
    2: { selectedOption: null, pvInput: '' },
  });

  const [submitted, setSubmitted] = useState(false);
  const [showSolutions, setShowSolutions] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleOptionSelect = (scenario: number, option: 'A' | 'B') => {
    if (submitted) return;
    setScenarios((prev) => ({
      ...prev,
      [scenario]: {
        ...prev[scenario],
        selectedOption: option,
      },
    }));
  };

  const handlePvChange = (scenario: number, value: string) => {
    if (submitted) return;
    setScenarios((prev) => ({
      ...prev,
      [scenario]: {
        ...prev[scenario],
        pvInput: value,
      },
    }));
  };

  const validateOption = (scenario: number, option: 'A' | 'B' | null): boolean => {
    if (scenario === 1) {
      // 5% rate: PV_B is $1,018,800, which is > $1,000,000. So Option B is better.
      return option === 'B';
    } else {
      // 8% rate: PV_B is $885,000, which is < $1,000,000. So Option A is better.
      return option === 'A';
    }
  };

  const validatePv = (scenario: number, input: string): boolean => {
    if (!input.trim()) return false;
    const numericStr = input.replace(/[\$,\s]/g, '');
    const userVal = parseFloat(numericStr);
    if (isNaN(userVal)) return false;

    if (scenario === 1) {
      // 5% rate: exact is 1,018,824. Lesson says ~1,018,800.
      return userVal >= 1018000 && userVal <= 1019000;
    } else {
      // 8% rate: exact is 884,737. Lesson says ~885,000.
      return userVal >= 884000 && userVal <= 886000;
    }
  };

  const handleCheckAnswers = () => {
    setSubmitted(true);
    setScenarios((prev) => ({
      1: {
        ...prev[1],
        isOptionCorrect: validateOption(1, prev[1].selectedOption),
        isPvCorrect: validatePv(1, prev[1].pvInput),
      },
      2: {
        ...prev[2],
        isOptionCorrect: validateOption(2, prev[2].selectedOption),
        isPvCorrect: validatePv(2, prev[2].pvInput),
      },
    }));
  };

  const handleReset = () => {
    setSubmitted(false);
    setShowSolutions(false);
    setShowHint(false);
    setScenarios({
      1: { selectedOption: null, pvInput: '' },
      2: { selectedOption: null, pvInput: '' },
    });
  };

  const isScenario1Correct = validateOption(1, scenarios[1].selectedOption) && validatePv(1, scenarios[1].pvInput);
  const isScenario2Correct = validateOption(2, scenarios[2].selectedOption) && validatePv(2, scenarios[2].pvInput);
  const totalCorrect = (isScenario1Correct ? 1 : 0) + (isScenario2Correct ? 1 : 0);
  const isAllCorrect = totalCorrect === 2;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-slate-100 shadow-xl my-8 space-y-6 relative overflow-hidden" id="discount-knowledge-check">
      {/* Background Accent glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-extrabold uppercase tracking-widest">
            <Trophy className="w-4 h-4 text-indigo-400" />
            <span>Interactive Knowledge Check</span>
          </div>
          <h4 className="font-sans font-extrabold text-xl sm:text-2xl text-white tracking-tight">
            {processMathText('The Lottery Dilemma: Thinking in Reverse')}
          </h4>
          <p className="font-serif text-slate-300 text-sm leading-relaxed max-w-2xl">
            {processMathText('Apply Present Value discounting to make an informed choice between a lump sum today or a larger payment later.')}
          </p>
        </div>

        {/* Score Badge */}
        {submitted && (
          <div className={`px-4 py-2 rounded-2xl border flex items-center gap-2 font-mono text-xs sm:text-sm font-bold flex-shrink-0 ${
            isAllCorrect
              ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300'
              : 'bg-amber-950/80 border-amber-500/50 text-amber-300'
          }`}>
            <Sparkles className="w-4 h-4" />
            <span>Score: {totalCorrect} / 2 Scenarios Correct</span>
          </div>
        )}
      </div>

      {/* The Dilemma Setup Card */}
      <div className="bg-slate-950/70 border border-slate-800/80 p-5 rounded-2xl space-y-3 font-serif text-sm">
        <h5 className="font-sans font-bold text-amber-400 text-sm uppercase tracking-wider">The Real-World Dilemma</h5>
        <p className="text-slate-300 leading-relaxed">
          Imagine you just won a lottery. You are offered a choice between:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-indigo-400 font-sans font-extrabold text-xs uppercase tracking-wider">Option A</span>
            <div className="font-sans font-black text-xl text-white">$1,000,000</div>
            <p className="text-slate-400 text-xs font-serif">Paid instantly today.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <span className="text-emerald-400 font-sans font-extrabold text-xs uppercase tracking-wider">Option B</span>
            <div className="font-sans font-black text-xl text-white">$1,300,000</div>
            <p className="text-slate-400 text-xs font-serif">
              {processMathText('Guaranteed payment in exactly 5 years ($n = 5$).')}
            </p>
          </div>
        </div>
        <p className="text-slate-400 text-xs italic pt-1">
          {processMathText('Formula Guide: The Present Value ($PV_B$) of Option B is calculated as $PV = \\frac{FV}{(1 + r)^n}$.')}
        </p>
      </div>

      {/* Interactive Scenario Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scenario 1: r = 5% */}
        <div className="bg-slate-950/40 border border-slate-800 rounded-2xl p-5 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-sans font-semibold bg-indigo-950 text-indigo-300 border border-indigo-800/50">
                Scenario 1: Low Rate (r = 5%)
              </span>
              {submitted && (
                isScenario1Correct ? (
                  <span className="inline-flex items-center gap-1 text-emerald-400 font-sans text-xs font-bold bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-1 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Correct
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-rose-400 font-sans text-xs font-bold bg-rose-950/60 border border-rose-800/60 px-2.5 py-1 rounded-full">
                    <XCircle className="w-3.5 h-3.5 text-rose-400" />
                    Review
                  </span>
                )
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-sans font-bold text-slate-300 uppercase tracking-wider">
                {processMathText('1. Calculate the Present Value of Option B at $r = 5\\%$:')}
              </label>
              <div className="relative">
                <input
                  type="text"
                  disabled={submitted}
                  value={scenarios[1].pvInput}
                  onChange={(e) => handlePvChange(1, e.target.value)}
                  placeholder="Enter calculated PV (e.g. 1018800)"
                  className={`w-full bg-slate-900 border rounded-xl px-3.5 py-2.5 text-sm font-mono text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                    submitted
                      ? validatePv(1, scenarios[1].pvInput)
                        ? 'border-emerald-500/60 focus:ring-emerald-500/40 bg-emerald-950/20'
                        : 'border-rose-500/60 focus:ring-rose-500/40 bg-rose-950/20'
                      : 'border-slate-700 focus:border-indigo-500 focus:ring-indigo-500/30'
                  }`}
                />
                {showSolutions && (
                  <div className="mt-1.5 text-xs font-sans text-indigo-300 bg-indigo-950/50 px-2.5 py-1.5 rounded-lg border border-indigo-800/30">
                    {processMathText('Solution: $PV_B = \\frac{\\$1{,}300{,}000}{(1.05)^5} \\approx \\$1{,}018{,}800$')}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-sans font-bold text-slate-300 uppercase tracking-wider">
                2. Which option is mathematically superior?
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  disabled={submitted}
                  onClick={() => handleOptionSelect(1, 'A')}
                  className={`px-4 py-3 rounded-xl text-xs sm:text-sm font-sans font-bold text-left border transition-all ${
                    scenarios[1].selectedOption === 'A'
                      ? submitted
                        ? 'bg-rose-950/40 border-rose-500/60 text-rose-300'
                        : 'bg-indigo-600 border-indigo-500 text-white shadow-md'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-900 hover:border-slate-700'
                  }`}
                >
                  <div className="text-[10px] opacity-70">Option A</div>
                  <div className="truncate">$1,000,000 Today</div>
                </button>
                <button
                  type="button"
                  disabled={submitted}
                  onClick={() => handleOptionSelect(1, 'B')}
                  className={`px-4 py-3 rounded-xl text-xs sm:text-sm font-sans font-bold text-left border transition-all ${
                    scenarios[1].selectedOption === 'B'
                      ? submitted
                        ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-300'
                        : 'bg-indigo-600 border-indigo-500 text-white shadow-md'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-900 hover:border-slate-700'
                  }`}
                >
                  <div className="text-[10px] opacity-70">Option B</div>
                  <div className="truncate">$1,300,000 Later</div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Scenario 2: r = 8% */}
        <div className="bg-slate-950/40 border border-slate-800 rounded-2xl p-5 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full text-xs font-sans font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800/50">
                Scenario 2: High Rate (r = 8%)
              </span>
              {submitted && (
                isScenario2Correct ? (
                  <span className="inline-flex items-center gap-1 text-emerald-400 font-sans text-xs font-bold bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-1 rounded-full">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Correct
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-rose-400 font-sans text-xs font-bold bg-rose-950/60 border border-rose-800/60 px-2.5 py-1 rounded-full">
                    <XCircle className="w-3.5 h-3.5 text-rose-400" />
                    Review
                  </span>
                )
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-sans font-bold text-slate-300 uppercase tracking-wider">
                {processMathText('1. Calculate the Present Value of Option B at $r = 8\\%$:')}
              </label>
              <div className="relative">
                <input
                  type="text"
                  disabled={submitted}
                  value={scenarios[2].pvInput}
                  onChange={(e) => handlePvChange(2, e.target.value)}
                  placeholder="Enter calculated PV (e.g. 885000)"
                  className={`w-full bg-slate-900 border rounded-xl px-3.5 py-2.5 text-sm font-mono text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                    submitted
                      ? validatePv(2, scenarios[2].pvInput)
                        ? 'border-emerald-500/60 focus:ring-emerald-500/40 bg-emerald-950/20'
                        : 'border-rose-500/60 focus:ring-rose-500/40 bg-rose-950/20'
                      : 'border-slate-700 focus:border-indigo-500 focus:ring-indigo-500/30'
                  }`}
                />
                {showSolutions && (
                  <div className="mt-1.5 text-xs font-sans text-emerald-300 bg-emerald-950/50 px-2.5 py-1.5 rounded-lg border border-emerald-800/30">
                    {processMathText('Solution: $PV_B = \\frac{\\$1{,}300{,}000}{(1.08)^5} \\approx \\$885{,}000$')}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-sans font-bold text-slate-300 uppercase tracking-wider">
                2. Which option is mathematically superior?
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  disabled={submitted}
                  onClick={() => handleOptionSelect(2, 'A')}
                  className={`px-4 py-3 rounded-xl text-xs sm:text-sm font-sans font-bold text-left border transition-all ${
                    scenarios[2].selectedOption === 'A'
                      ? submitted
                        ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-300'
                        : 'bg-indigo-600 border-indigo-500 text-white shadow-md'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-900 hover:border-slate-700'
                  }`}
                >
                  <div className="text-[10px] opacity-70">Option A</div>
                  <div className="truncate">$1,000,000 Today</div>
                </button>
                <button
                  type="button"
                  disabled={submitted}
                  onClick={() => handleOptionSelect(2, 'B')}
                  className={`px-4 py-3 rounded-xl text-xs sm:text-sm font-sans font-bold text-left border transition-all ${
                    scenarios[2].selectedOption === 'B'
                      ? submitted
                        ? 'bg-rose-950/40 border-rose-500/60 text-rose-300'
                        : 'bg-indigo-600 border-indigo-500 text-white shadow-md'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-900 hover:border-slate-700'
                  }`}
                >
                  <div className="text-[10px] opacity-70">Option B</div>
                  <div className="truncate">$1,300,000 Later</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hint Accordion */}
      {showHint && (
        <div className="bg-indigo-950/40 border border-indigo-800/50 rounded-2xl p-4 text-xs sm:text-sm text-indigo-200 space-y-2 font-serif">
          <div className="font-sans font-bold text-indigo-300 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-indigo-400" />
            <span>Formula Guide & Hint</span>
          </div>
          <p>
            For a guaranteed payout of <span className="text-amber-300 font-semibold">$1,300,000</span> paid in 5 years ($n=5$):
          </p>
          <ul className="list-disc list-inside space-y-1 font-sans text-xs text-indigo-300">
            <li>{processMathText('At $r=5\\%$, calculate: $PV = \\frac{\\$1{,}300{,}000}{(1.05)^5}$')}</li>
            <li>{processMathText('At $r=8\\%$, calculate: $PV = \\frac{\\$1{,}300{,}000}{(1.08)^5}$')}</li>
            <li>{processMathText('Compare each calculated Present Value to the \\$1,000,000 lump sum available today. If $PV_B > \\$1{,}000{,}000$, select Option B. Otherwise, take the money today (Option A).')}</li>
          </ul>
        </div>
      )}

      {/* Success Notification */}
      {submitted && isAllCorrect && (
        <div className="bg-emerald-950/80 border border-emerald-500/50 rounded-2xl p-5 text-emerald-200 flex items-start gap-3 shadow-lg">
          <Sparkles className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5 animate-bounce" />
          <div className="space-y-1">
            <h5 className="font-sans font-bold text-emerald-300 text-base">
              Outstanding Analysis! 100% Correct
            </h5>
            <p className="font-serif text-xs sm:text-sm text-emerald-200/90 leading-relaxed">
              You have accurately computed present values and identified the optimal choices under both discount rates! You've perfectly illustrated how value depends on your discount rate. Excellent job!
            </p>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowHint(!showHint)}
            className="px-3.5 py-2 rounded-xl text-xs font-sans font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors flex items-center gap-1.5"
          >
            <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
            <span>{showHint ? 'Hide Hint' : 'Show Hint'}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowSolutions(!showSolutions)}
            className="px-3.5 py-2 rounded-xl text-xs font-sans font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5 text-emerald-400" />
            <span>{showSolutions ? 'Hide Solutions' : 'Show Solutions'}</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="px-3.5 py-2 rounded-xl text-xs font-sans font-bold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          <button
            type="button"
            onClick={handleCheckAnswers}
            className="px-5 py-2 rounded-xl text-xs sm:text-sm font-sans font-bold text-white bg-indigo-600 hover:bg-indigo-500 shadow-md transition-all flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Check Answers</span>
          </button>
        </div>
      </div>
    </div>
  );
};
