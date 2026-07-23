import React, { useState } from 'react';
import { CheckCircle2, XCircle, HelpCircle, RefreshCw, Eye, Sparkles, Calculator } from 'lucide-react';
import { processMathText } from '../lib/math';

interface TvmKnowledgeCheckProps {
  initialValue?: number;
  annualRate?: number;
}

interface RowState {
  calcInput: string;
  fvInput: string;
  calcChecked?: boolean;
  fvChecked?: boolean;
  isCorrect?: boolean;
}

export const TvmKnowledgeCheck: React.FC<TvmKnowledgeCheckProps> = ({
  initialValue = 5000,
  annualRate = 0.06,
}) => {
  const years = [1, 5, 10];
  const ratePct = Math.round(annualRate * 100);
  const factor = (1 + annualRate).toFixed(2);

  // Expected target values
  const rowsData = years.map((n) => {
    const fvExact = initialValue * Math.pow(1 + annualRate, n);
    const fvRounded = Math.round(fvExact * 100) / 100;
    const calcExample = `$5,000 \\times (1.${ratePct < 10 ? '0' + ratePct : ratePct})^{${n}}$`;
    return {
      year: n,
      fvExact,
      fvRounded,
      calcExample,
      calcDisplay: `$5,000 \\times (1.06)^{${n}}$`,
      fvDisplay: `$${fvRounded.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    };
  });

  const [rowStates, setRowStates] = useState<Record<number, RowState>>({
    1: { calcInput: '', fvInput: '' },
    5: { calcInput: '', fvInput: '' },
    10: { calcInput: '', fvInput: '' },
  });

  const [showSolutions, setShowSolutions] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleInputChange = (year: number, field: 'calcInput' | 'fvInput', value: string) => {
    setRowStates((prev) => ({
      ...prev,
      [year]: {
        ...prev[year],
        [field]: value,
      },
    }));
  };

  const validateCalc = (year: number, input: string): boolean => {
    if (!input.trim()) return false;
    const clean = input.replace(/\s+/g, '').replace(/\\times/g, '*').replace(/x/gi, '*');
    // Needs to include 5000 or 5,000 or 5k
    const hasPrincipal = clean.includes('5000') || clean.includes('5,000') || clean.includes('5k');
    // Needs to include 1.06 or 1+0.06 or 1.06^year
    const hasRate = clean.includes('1.06') || clean.includes('1+0.06') || clean.includes('1+6%');
    // Needs exponent year or year in parentheses
    const hasYear = clean.includes(`^${year}`) || clean.includes(`**${year}`) || clean.includes(`^(${year})`) || clean.includes(`${year}`);

    return (hasPrincipal && hasRate) || (clean.includes('5000') && clean.includes('1.06'));
  };

  const validateFv = (year: number, input: string): boolean => {
    if (!input.trim()) return false;
    const numericStr = input.replace(/[\$,\s]/g, '');
    const userVal = parseFloat(numericStr);
    if (isNaN(userVal)) return false;

    const targetData = rowsData.find((r) => r.year === year);
    if (!targetData) return false;

    // Accept exact cents, rounded whole dollars, or within $2 margin
    const diffExact = Math.abs(userVal - targetData.fvExact);
    const diffRounded = Math.abs(userVal - Math.round(targetData.fvExact));

    return diffExact < 2.0 || diffRounded <= 2.0;
  };

  const handleCheckAnswers = () => {
    setSubmitted(true);
    const updated: Record<number, RowState> = {};
    years.forEach((year) => {
      const state = rowStates[year] || { calcInput: '', fvInput: '' };
      const calcOk = validateCalc(year, state.calcInput);
      const fvOk = validateFv(year, state.fvInput);
      updated[year] = {
        ...state,
        calcChecked: true,
        fvChecked: true,
        isCorrect: calcOk && fvOk,
      };
    });
    setRowStates(updated);
  };

  const handleReset = () => {
    setSubmitted(false);
    setShowSolutions(false);
    setShowHint(false);
    const resetObj: Record<number, RowState> = {};
    years.forEach((n) => {
      resetObj[n] = { calcInput: '', fvInput: '' };
    });
    setRowStates(resetObj);
  };

  const totalCorrect = years.filter((y) => {
    const s = rowStates[y];
    return s && validateCalc(y, s.calcInput) && validateFv(y, s.fvInput);
  }).length;

  const isAllCorrect = totalCorrect === years.length;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-slate-100 shadow-xl my-8 space-y-6 relative overflow-hidden" id="tvm-knowledge-check">
      {/* Background Accent glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-extrabold uppercase tracking-widest">
            <Calculator className="w-4 h-4 text-indigo-400" />
            <span>Interactive Knowledge Check</span>
          </div>
          <h4 className="font-sans font-extrabold text-xl sm:text-2xl text-white tracking-tight">
            {processMathText(`Compounding Table Practice ($PV = \\$5,000$, $r = ${ratePct}\\%$)`)}
          </h4>
          <p className="font-serif text-slate-300 text-sm leading-relaxed max-w-2xl">
            {processMathText('Test your understanding of the Time Value of Money equation $FV = PV \\times (1 + r)^n$.')}
            {' Given an initial investment of '}
            <span className="text-amber-300 font-semibold font-sans">$5,000</span>
            {' and an annual growth rate of '}
            <span className="text-emerald-300 font-semibold font-sans">{ratePct}%</span>
            {' ('}
            {processMathText('$1.06$ multiplier')}
            {'), fill in the calculation formula and calculate the final value for each year.'}
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
            <span>Score: {totalCorrect} / {years.length} Correct</span>
          </div>
        )}
      </div>

      {/* Main Table */}
      <div className="overflow-x-auto border border-slate-800 rounded-2xl bg-slate-950/60 shadow-inner">
        <table className="min-w-full divide-y divide-slate-800/80 text-left text-xs sm:text-sm">
          <thead className="bg-slate-900/90 font-sans font-bold text-slate-300">
            <tr>
              <th className="px-4 py-3 font-semibold text-slate-400 font-sans uppercase tracking-wider">
                {processMathText('Years ($n$)')}
              </th>
              <th className="px-4 py-3 font-semibold text-slate-400 font-sans uppercase tracking-wider">
                {processMathText('Initial Value ($PV$)')}
              </th>
              <th className="px-4 py-3 font-semibold text-slate-300 font-sans uppercase tracking-wider">
                Enter Calculation Formula
              </th>
              <th className="px-4 py-3 font-semibold text-slate-300 font-sans uppercase tracking-wider">
                {processMathText('Enter Final Value ($FV$)')}
              </th>
              <th className="px-4 py-3 font-semibold text-slate-400 font-sans uppercase tracking-wider text-center">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-serif text-slate-300">
            {rowsData.map((row) => {
              const state = rowStates[row.year] || { calcInput: '', fvInput: '' };
              const calcValid = validateCalc(row.year, state.calcInput);
              const fvValid = validateFv(row.year, state.fvInput);
              const rowCorrect = calcValid && fvValid;

              return (
                <tr key={row.year} className="hover:bg-slate-900/50 transition-colors">
                  {/* Years */}
                  <td className="px-4 py-3 font-sans font-bold text-indigo-300 text-sm">
                    {row.year} {row.year === 1 ? 'Year' : 'Years'}
                  </td>

                  {/* Initial Value */}
                  <td className="px-4 py-3 font-sans text-slate-300 text-sm">
                    $5,000
                  </td>

                  {/* Calculation Input */}
                  <td className="px-4 py-3">
                    <div className="space-y-1">
                      <input
                        type="text"
                        value={state.calcInput}
                        onChange={(e) => handleInputChange(row.year, 'calcInput', e.target.value)}
                        placeholder={`e.g. 5000 * (1.06)^${row.year}`}
                        className={`w-full bg-slate-900 border rounded-xl px-3 py-2 text-xs sm:text-sm font-mono text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                          submitted
                            ? calcValid
                              ? 'border-emerald-500/60 focus:ring-emerald-500/40 bg-emerald-950/20'
                              : 'border-rose-500/60 focus:ring-rose-500/40 bg-rose-950/20'
                            : 'border-slate-700 focus:border-indigo-500 focus:ring-indigo-500/30'
                        }`}
                      />
                      {showSolutions && (
                        <div className="text-[11px] font-sans text-indigo-300 bg-indigo-950/50 px-2 py-1 rounded border border-indigo-800/40">
                          Solution: {processMathText(row.calcExample)}
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Final Value Input */}
                  <td className="px-4 py-3">
                    <div className="space-y-1">
                      <input
                        type="text"
                        value={state.fvInput}
                        onChange={(e) => handleInputChange(row.year, 'fvInput', e.target.value)}
                        placeholder={`e.g. ${row.fvRounded}`}
                        className={`w-full bg-slate-900 border rounded-xl px-3 py-2 text-xs sm:text-sm font-mono text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                          submitted
                            ? fvValid
                              ? 'border-emerald-500/60 focus:ring-emerald-500/40 bg-emerald-950/20'
                              : 'border-rose-500/60 focus:ring-rose-500/40 bg-rose-950/20'
                            : 'border-slate-700 focus:border-indigo-500 focus:ring-indigo-500/30'
                        }`}
                      />
                      {showSolutions && (
                        <div className="text-[11px] font-sans text-emerald-300 bg-emerald-950/50 px-2 py-1 rounded border border-emerald-800/40">
                          Solution: {row.fvDisplay}
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td className="px-4 py-3 text-center">
                    {submitted ? (
                      rowCorrect ? (
                        <span className="inline-flex items-center gap-1 text-emerald-400 font-mono text-xs font-bold bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-1 rounded-full">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          Correct
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-rose-400 font-mono text-xs font-bold bg-rose-950/60 border border-rose-800/60 px-2.5 py-1 rounded-full">
                          <XCircle className="w-3.5 h-3.5 text-rose-400" />
                          Check
                        </span>
                      )
                    ) : (
                      <span className="text-slate-500 font-mono text-xs italic">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Hint Accordion */}
      {showHint && (
        <div className="bg-indigo-950/40 border border-indigo-800/50 rounded-2xl p-4 text-xs sm:text-sm text-indigo-200 space-y-2 font-serif">
          <div className="font-sans font-bold text-indigo-300 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-indigo-400" />
            <span>Formula Guide & Hint</span>
          </div>
          <p>
            The compounding formula is <span className="font-sans font-semibold text-amber-300">{processMathText('$FV = PV \\times (1 + r)^n$')}</span>.
          </p>
          <ul className="list-disc list-inside space-y-1 font-sans text-xs text-indigo-300">
            <li>{processMathText('$PV = \\$5,000$')}</li>
            <li>{processMathText('$1 + r = 1 + 0.06 = 1.06$')}</li>
            <li>For Year 1: {processMathText('$5,000 \\times (1.06)^1 = \\$5,300.00$')}</li>
            <li>For Year 5: {processMathText('$5,000 \\times (1.06)^5 = \\$6,691.13$')}</li>
            <li>For Year 10: {processMathText('$5,000 \\times (1.06)^{10} = \\$8,954.24$')}</li>
          </ul>
        </div>
      )}

      {/* Success Notification */}
      {submitted && isAllCorrect && (
        <div className="bg-emerald-950/80 border border-emerald-500/50 rounded-2xl p-5 text-emerald-200 flex items-start gap-3 shadow-lg">
          <Sparkles className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5 animate-bounce" />
          <div className="space-y-1">
            <h5 className="font-sans font-bold text-emerald-300 text-base">
              Outstanding Work! 100% Correct
            </h5>
            <p className="font-serif text-xs sm:text-sm text-emerald-200/90 leading-relaxed">
              You have mastered the compounding exponential formula for TVM. Notice how in Year 10, the $5,000 investment has nearly doubled to $8,954.24 purely through compounding growth!
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
