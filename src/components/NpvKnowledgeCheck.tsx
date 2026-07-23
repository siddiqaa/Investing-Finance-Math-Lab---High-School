import React, { useState } from 'react';
import { CheckCircle2, XCircle, HelpCircle, RefreshCw, Eye, Sparkles, Calculator } from 'lucide-react';
import { processMathText } from '../lib/math';

interface RowState {
  calcInput: string;
  pvInput: string;
  calcChecked?: boolean;
  pvChecked?: boolean;
  isCorrect?: boolean;
}

export const NpvKnowledgeCheck: React.FC = () => {
  const discountRate = 0.10;
  const ratePct = 10;

  const rowsData = [
    {
      year: 1,
      cashFlow: 1100,
      pvExact: 1000,
      calcExample: `$1,100 \\div (1.10)^1$`,
      calcDisplay: `$1,100 \\div (1.10)^1$`,
      pvDisplay: `$1,000.00`,
    },
    {
      year: 2,
      cashFlow: 2420,
      pvExact: 2000,
      calcExample: `$2,420 \\div (1.10)^2$`,
      calcDisplay: `$2,420 \\div (1.10)^2$`,
      pvDisplay: `$2,000.00`,
    },
    {
      year: 3,
      cashFlow: 3993,
      pvExact: 3000,
      calcExample: `$3,993 \\div (1.10)^3$`,
      calcDisplay: `$3,993 \\div (1.10)^3$`,
      pvDisplay: `$3,000.00`,
    },
  ];

  const totalNpvExact = 6000;

  const [rowStates, setRowStates] = useState<Record<number, RowState>>({
    1: { calcInput: '', pvInput: '' },
    2: { calcInput: '', pvInput: '' },
    3: { calcInput: '', pvInput: '' },
  });

  const [totalNpvInput, setTotalNpvInput] = useState('');
  const [totalNpvChecked, setTotalNpvChecked] = useState(false);
  const [totalNpvCorrect, setTotalNpvCorrect] = useState(false);

  const [showSolutions, setShowSolutions] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleInputChange = (year: number, field: 'calcInput' | 'pvInput', value: string) => {
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
    const clean = input.replace(/\s+/g, '').replace(/\\div/g, '/').replace(/\\times/g, '*').replace(/x/gi, '*');
    
    // Check if the base cash flow is present
    const row = rowsData.find(r => r.year === year);
    if (!row) return false;
    const hasCashFlow = clean.includes(row.cashFlow.toString());
    
    // Needs to include 1.1 or 1.10 or 1+0.1
    const hasRate = clean.includes('1.1') || clean.includes('1+0.1') || clean.includes('1+10%');
    
    // Check if we divide or use negative exponent
    const isDividing = clean.includes('/') || clean.includes('^-') || clean.includes('**-');
    
    return hasCashFlow && hasRate && isDividing;
  };

  const validatePv = (year: number, input: string): boolean => {
    if (!input.trim()) return false;
    const numericStr = input.replace(/[\$,\s]/g, '');
    const userVal = parseFloat(numericStr);
    if (isNaN(userVal)) return false;

    const row = rowsData.find(r => r.year === year);
    if (!row) return false;

    return Math.abs(userVal - row.pvExact) < 5.0;
  };

  const validateTotalNpv = (input: string): boolean => {
    if (!input.trim()) return false;
    const numericStr = input.replace(/[\$,\s]/g, '');
    const userVal = parseFloat(numericStr);
    if (isNaN(userVal)) return false;

    return Math.abs(userVal - totalNpvExact) < 10.0;
  };

  const handleCheckAnswers = () => {
    setSubmitted(true);
    const updated: Record<number, RowState> = {};
    rowsData.forEach((row) => {
      const state = rowStates[row.year] || { calcInput: '', pvInput: '' };
      const calcOk = validateCalc(row.year, state.calcInput);
      const pvOk = validatePv(row.year, state.pvInput);
      updated[row.year] = {
        ...state,
        calcChecked: true,
        pvChecked: true,
        isCorrect: calcOk && pvOk,
      };
    });
    setRowStates(updated);

    const totalNpvOk = validateTotalNpv(totalNpvInput);
    setTotalNpvChecked(true);
    setTotalNpvCorrect(totalNpvOk);
  };

  const handleReset = () => {
    setSubmitted(false);
    setShowSolutions(false);
    setShowHint(false);
    const resetObj: Record<number, RowState> = {};
    rowsData.forEach((row) => {
      resetObj[row.year] = { calcInput: '', pvInput: '' };
    });
    setRowStates(resetObj);
    setTotalNpvInput('');
    setTotalNpvChecked(false);
    setTotalNpvCorrect(false);
  };

  const rowsCorrectCount = rowsData.filter((row) => {
    const s = rowStates[row.year];
    return s && validateCalc(row.year, s.calcInput) && validatePv(row.year, s.pvInput);
  }).length;

  const totalNpvOk = validateTotalNpv(totalNpvInput);
  const totalCorrect = rowsCorrectCount + (totalNpvOk ? 1 : 0);
  const maxPossible = rowsData.length + 1;
  const isAllCorrect = totalCorrect === maxPossible;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-slate-100 shadow-xl my-8 space-y-6 relative overflow-hidden" id="npv-knowledge-check">
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
            {processMathText(`Net Present Value Practice ($r = ${ratePct}\\%$)`)}
          </h4>
          <p className="font-serif text-slate-300 text-sm leading-relaxed max-w-2xl">
            {processMathText('Test your understanding of the Net Present Value equation $NPV = \\sum_{t=1}^{T} \\frac{CF_t}{(1 + r)^t}$.')}
            {' Given a project with cash flows of '}
            <span className="text-amber-300 font-semibold font-sans">$1,100</span>
            {', '}
            <span className="text-amber-300 font-semibold font-sans">$2,420</span>
            {', and '}
            <span className="text-amber-300 font-semibold font-sans">$3,993</span>
            {' at Years 1, 2, and 3, respectively, and a required return rate of '}
            <span className="text-emerald-300 font-semibold font-sans">{ratePct}%</span>
            {', fill in the calculation formula, calculate the Present Value (PV) for each year, and find the total NPV.'}
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
            <span>Score: {totalCorrect} / {maxPossible} Correct</span>
          </div>
        )}
      </div>

      {/* Main Table */}
      <div className="overflow-x-auto border border-slate-800 rounded-2xl bg-slate-950/60 shadow-inner">
        <table className="min-w-full divide-y divide-slate-800/80 text-left text-xs sm:text-sm">
          <thead className="bg-slate-900/90 font-sans font-bold text-slate-300">
            <tr>
              <th className="px-4 py-3 font-semibold text-slate-400 font-sans uppercase tracking-wider">
                {processMathText('Years ($t$)')}
              </th>
              <th className="px-4 py-3 font-semibold text-slate-400 font-sans uppercase tracking-wider">
                {processMathText('Cash Flow ($CF_t$)')}
              </th>
              <th className="px-4 py-3 font-semibold text-slate-300 font-sans uppercase tracking-wider">
                Enter Calculation Formula
              </th>
              <th className="px-4 py-3 font-semibold text-slate-300 font-sans uppercase tracking-wider">
                {processMathText('Enter Present Value ($PV_t$)')}
              </th>
              <th className="px-4 py-3 font-semibold text-slate-400 font-sans uppercase tracking-wider text-center">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-serif text-slate-300">
            {rowsData.map((row) => {
              const state = rowStates[row.year] || { calcInput: '', pvInput: '' };
              const calcValid = validateCalc(row.year, state.calcInput);
              const pvValid = validatePv(row.year, state.pvInput);
              const rowCorrect = calcValid && pvValid;

              return (
                <tr key={row.year} className="hover:bg-slate-900/50 transition-colors">
                  {/* Years */}
                  <td className="px-4 py-3 font-sans font-bold text-indigo-300 text-sm">
                    Year {row.year}
                  </td>

                  {/* Cash Flow */}
                  <td className="px-4 py-3 font-sans text-slate-300 text-sm">
                    ${row.cashFlow.toLocaleString()}
                  </td>

                  {/* Calculation Input */}
                  <td className="px-4 py-3">
                    <div className="space-y-1">
                      <input
                        type="text"
                        value={state.calcInput}
                        onChange={(e) => handleInputChange(row.year, 'calcInput', e.target.value)}
                        placeholder={`e.g. ${row.cashFlow} / (1.10)^${row.year}`}
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

                  {/* Present Value Input */}
                  <td className="px-4 py-3">
                    <div className="space-y-1">
                      <input
                        type="text"
                        value={state.pvInput}
                        onChange={(e) => handleInputChange(row.year, 'pvInput', e.target.value)}
                        placeholder="e.g. 1000"
                        className={`w-full bg-slate-900 border rounded-xl px-3 py-2 text-xs sm:text-sm font-mono text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all ${
                          submitted
                            ? pvValid
                              ? 'border-emerald-500/60 focus:ring-emerald-500/40 bg-emerald-950/20'
                              : 'border-rose-500/60 focus:ring-rose-500/40 bg-rose-950/20'
                            : 'border-slate-700 focus:border-indigo-500 focus:ring-indigo-500/30'
                        }`}
                      />
                      {showSolutions && (
                        <div className="text-[11px] font-sans text-emerald-300 bg-emerald-950/50 px-2 py-1 rounded border border-emerald-800/40">
                          Solution: {row.pvDisplay}
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

            {/* Total NPV Row */}
            <tr className="bg-slate-900/40">
              <td colSpan={2} className="px-4 py-4 font-sans font-extrabold text-sm text-slate-200">
                Total Net Present Value (NPV)
              </td>
              <td className="px-4 py-4 font-sans text-xs text-slate-400 italic">
                Sum of all individual Present Values (PV)
              </td>
              <td className="px-4 py-4">
                <div className="space-y-1">
                  <input
                    type="text"
                    value={totalNpvInput}
                    onChange={(e) => setTotalNpvInput(e.target.value)}
                    placeholder="e.g. 6000"
                    className={`w-full bg-slate-900 border rounded-xl px-3 py-2 text-xs sm:text-sm font-mono text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all font-bold ${
                      submitted
                        ? totalNpvOk
                          ? 'border-emerald-500/60 focus:ring-emerald-500/40 bg-emerald-950/20 text-emerald-300'
                          : 'border-rose-500/60 focus:ring-rose-500/40 bg-rose-950/20 text-rose-300'
                        : 'border-slate-700 focus:border-indigo-500 focus:ring-indigo-500/30'
                    }`}
                  />
                  {showSolutions && (
                    <div className="text-[11px] font-sans font-bold text-amber-300 bg-amber-950/50 px-2 py-1 rounded border border-amber-800/40">
                      Solution NPV: $6,000.00
                    </div>
                  )}
                </div>
              </td>
              <td className="px-4 py-4 text-center">
                {submitted ? (
                  totalNpvOk ? (
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
          </tbody>
        </table>
      </div>

      {/* Hint Accordion */}
      {showHint && (
        <div className="bg-indigo-950/40 border border-indigo-800/50 rounded-2xl p-4 text-xs sm:text-sm text-indigo-200 space-y-2 font-serif">
          <div className="font-sans font-bold text-indigo-300 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-indigo-400" />
            <span>NPV Formula Guide & Hint</span>
          </div>
          <p>
            The discounting formula for each year is <span className="font-sans font-semibold text-amber-300">{processMathText('$PV = \\frac{CF_t}{(1 + r)^t}$')}</span>.
          </p>
          <p>
            To find Net Present Value, calculate the PV for each year and sum them up:
          </p>
          <ul className="list-disc list-inside space-y-1 font-sans text-xs text-indigo-300">
            <li>{processMathText('$PV_1 = \\frac{\\$1,100}{(1.10)^1} = \\$1,000.00$')}</li>
            <li>{processMathText('$PV_2 = \\frac{\\$2,420}{(1.10)^2} = \\frac{\\$2,420}{1.21} = \\$2,000.00$')}</li>
            <li>{processMathText('$PV_3 = \\frac{\\$3,993}{(1.10)^3} = \\frac{\\$3,993}{1.331} = \\$3,000.00$')}</li>
            <li>{processMathText('$NPV = \\$1,000 + \\$2,000 + \\$3,000 = \\$6,000.00$')}</li>
          </ul>
        </div>
      )}

      {/* Success Notification */}
      {submitted && isAllCorrect && (
        <div className="bg-emerald-950/80 border border-emerald-500/50 rounded-2xl p-5 text-emerald-200 flex items-start gap-3 shadow-lg">
          <Sparkles className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5 animate-bounce" />
          <div className="space-y-1">
            <h5 className="font-sans font-bold text-emerald-300 text-base">
              Amazing Job! 100% Correct on NPV
            </h5>
            <p className="font-serif text-xs sm:text-sm text-emerald-200/90 leading-relaxed">
              You have perfectly applied discounting to a stream of multiple future cash flows to compute the overall Net Present Value. This is the cornerstone of corporate finance and valuation!
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
