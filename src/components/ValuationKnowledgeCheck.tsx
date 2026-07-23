import React, { useState } from 'react';
import { CheckCircle2, XCircle, HelpCircle, RefreshCw, Eye, Sparkles, TrendingUp } from 'lucide-react';
import { processMathText } from '../lib/math';

interface RowState {
  d1Input: string;
  priceInput: string;
  isCorrect?: boolean;
}

export const ValuationKnowledgeCheck: React.FC = () => {
  const [rowStates, setRowStates] = useState<Record<number, RowState>>({
    1: { d1Input: '', priceInput: '' },
    2: { d1Input: '', priceInput: '' },
    3: { d1Input: '', priceInput: '' },
  });

  const [showSolutions, setShowSolutions] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Scenario definition:
  // Scenario 1: D0 = $2.00, g = 4%, r = 8%  => D1 = $2.08, r-g = 4% => P0 = $52.00
  // Scenario 2: D0 = $3.00, g = 2%, r = 8%  => D1 = $3.06, r-g = 6% => P0 = $51.00
  // Scenario 3: D0 = $4.00, g = 5%, r = 10% => D1 = $4.20, r-g = 5% => P0 = $84.00
  const scenarios = [
    { id: 1, d0: 2.00, g: 0.04, r: 0.08, d1Target: 2.08, priceTarget: 52.00, desc: 'D₀ = $2.00, g = 4%, r = 8%' },
    { id: 2, d0: 3.00, g: 0.02, r: 0.08, d1Target: 3.06, priceTarget: 51.00, desc: 'D₀ = $3.00, g = 2%, r = 8%' },
    { id: 3, d0: 4.00, g: 0.05, r: 0.10, d1Target: 4.20, priceTarget: 84.00, desc: 'D₀ = $4.00, g = 5%, r = 10%' },
  ];

  const handleInputChange = (id: number, field: 'd1Input' | 'priceInput', value: string) => {
    if (submitted) return;
    setRowStates((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const validateD1 = (id: number, input: string): boolean => {
    if (!input.trim()) return false;
    const val = parseFloat(input.replace(/[\$,\s]/g, ''));
    if (isNaN(val)) return false;
    const target = scenarios.find(s => s.id === id)?.d1Target || 0;
    return Math.abs(val - target) < 0.02; // Allow small rounding error
  };

  const validatePrice = (id: number, input: string): boolean => {
    if (!input.trim()) return false;
    const val = parseFloat(input.replace(/[\$,\s]/g, ''));
    if (isNaN(val)) return false;
    const target = scenarios.find(s => s.id === id)?.priceTarget || 0;
    return Math.abs(val - target) < 0.5; // Allow $0.50 margin
  };

  const handleCheckAnswers = () => {
    setSubmitted(true);
    const updated: Record<number, RowState> = {};
    scenarios.forEach((s) => {
      const state = rowStates[s.id] || { d1Input: '', priceInput: '' };
      const d1Ok = validateD1(s.id, state.d1Input);
      const priceOk = validatePrice(s.id, state.priceInput);
      updated[s.id] = {
        ...state,
        isCorrect: d1Ok && priceOk,
      };
    });
    setRowStates(updated);
  };

  const handleReset = () => {
    setSubmitted(false);
    setShowSolutions(false);
    setShowHint(false);
    setRowStates({
      1: { d1Input: '', priceInput: '' },
      2: { d1Input: '', priceInput: '' },
      3: { d1Input: '', priceInput: '' },
    });
  };

  const totalCorrect = scenarios.filter((s) => {
    const row = rowStates[s.id];
    return row && validateD1(s.id, row.d1Input) && validatePrice(s.id, row.priceInput);
  }).length;

  const isAllCorrect = totalCorrect === scenarios.length;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-slate-100 shadow-xl my-8 space-y-6 relative overflow-hidden" id="valuation-knowledge-check">
      {/* Background Accent glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs font-extrabold uppercase tracking-widest">
            <TrendingUp className="w-4 h-4 text-indigo-400" />
            <span>Interactive Knowledge Check</span>
          </div>
          <h4 className="font-sans font-extrabold text-xl sm:text-2xl text-white tracking-tight">
            {processMathText('Gordon Growth Practice: Collapsing Infinity')}
          </h4>
          <p className="font-serif text-slate-300 text-sm leading-relaxed max-w-2xl">
            {processMathText('Practice calculating next year’s expected dividend ($D_1$) and the infinite perpetuity stock value ($P_0$) under different discount rate conditions.')}
          </p>
        </div>

        {/* Score Badge */}
        {submitted && (
          <div className={`px-4 py-2 rounded-2xl border flex items-center gap-2 font-mono text-xs sm:text-sm font-bold flex-shrink-0 ${
            isAllCorrect
              ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300'
              : 'bg-amber-950/80 border-amber-500/50 text-amber-300'
          }`}>
            <Sparkles className="w-4 h-4 animate-spin" />
            <span>Score: {totalCorrect} / {scenarios.length} Correct</span>
          </div>
        )}
      </div>

      {/* Reference Card */}
      <div className="bg-slate-950/70 border border-slate-800/80 p-5 rounded-2xl space-y-2 font-serif text-xs sm:text-sm text-slate-300">
        <h5 className="font-sans font-bold text-amber-400 text-xs uppercase tracking-wider">Formulas Reference</h5>
        <p>
          {processMathText('1. Next year\'s expected dividend: $D_1 = D_0 \\times (1 + g)$')}
        </p>
        <p>
          {processMathText('2. Current stock valuation: $P_0 = \\frac{D_1}{r - g}$')}
        </p>
      </div>

      {/* Interactive Grid Table */}
      <div className="overflow-x-auto border border-slate-800 rounded-2xl">
        <table className="w-full text-left border-collapse font-sans text-xs sm:text-sm min-w-[500px]">
          <thead>
            <tr className="bg-slate-950 text-slate-400 border-b border-slate-800 font-mono uppercase tracking-wider">
              <th className="px-4 py-3 font-semibold">Inputs & Rates</th>
              <th className="px-4 py-3 font-semibold">Step 1: Calculate $D_1$</th>
              <th className="px-4 py-3 font-semibold">Step 2: Calculate $P_0$</th>
              <th className="px-4 py-3 font-semibold text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {scenarios.map((s) => {
              const row = rowStates[s.id] || { d1Input: '', priceInput: '' };
              const isD1Correct = validateD1(s.id, row.d1Input);
              const isPriceCorrect = validatePrice(s.id, row.priceInput);

              return (
                <tr key={s.id} className="hover:bg-slate-950/20 transition-colors">
                  <td className="px-4 py-4 font-mono font-medium text-indigo-300">
                    <div>{s.desc}</div>
                    <div className="text-[10px] text-slate-500 mt-1">Denominator: {(s.r - s.g * 100).toFixed(0)}%</div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="space-y-1.5">
                      <input
                        type="text"
                        disabled={submitted}
                        value={row.d1Input}
                        onChange={(e) => handleInputChange(s.id, 'd1Input', e.target.value)}
                        placeholder="e.g. $2.08"
                        className={`w-28 sm:w-32 bg-slate-950 border rounded-xl px-2.5 py-1.5 font-mono text-white placeholder-slate-600 focus:outline-none focus:ring-1 transition-all ${
                          submitted
                            ? isD1Correct
                              ? 'border-emerald-500/60 bg-emerald-950/20'
                              : 'border-rose-500/60 bg-rose-950/20'
                            : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20'
                        }`}
                      />
                      {showSolutions && (
                        <div className="text-[10px] text-indigo-300 font-mono">
                          {processMathText(`$${s.d1Target.toFixed(2)}$`)}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="space-y-1.5">
                      <input
                        type="text"
                        disabled={submitted}
                        value={row.priceInput}
                        onChange={(e) => handleInputChange(s.id, 'priceInput', e.target.value)}
                        placeholder="e.g. $52.00"
                        className={`w-28 sm:w-32 bg-slate-950 border rounded-xl px-2.5 py-1.5 font-mono text-white placeholder-slate-600 focus:outline-none focus:ring-1 transition-all ${
                          submitted
                            ? isPriceCorrect
                              ? 'border-emerald-500/60 bg-emerald-950/20'
                              : 'border-rose-500/60 bg-rose-950/20'
                            : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20'
                        }`}
                      />
                      {showSolutions && (
                        <div className="text-[10px] text-emerald-300 font-mono">
                          {processMathText(`$${s.priceTarget.toFixed(2)}$`)}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right">
                    {submitted && (
                      <span className="inline-flex">
                        {row.isCorrect ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        ) : (
                          <XCircle className="w-5 h-5 text-rose-400" />
                        )}
                      </span>
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
            <span>Step-by-Step Solver Hint</span>
          </div>
          <ul className="list-disc list-inside space-y-1 text-xs text-indigo-300/90 font-sans">
            <li>{processMathText('For Scenario 1: $D_1 = \\$2.00 \\times (1 + 0.04) = \\$2.08$. The denominator $r - g$ is $0.08 - 0.04 = 0.04$. The Stock Price $P_0 = \\frac{\\$2.08}{0.04} = \\$52.00$.')}</li>
            <li>{processMathText('For Scenario 2: $D_1 = \\$3.00 \\times (1 + 0.02) = \\$3.06$. The denominator $r - g$ is $0.08 - 0.02 = 0.06$. The Stock Price $P_0 = \\frac{\\$3.06}{0.06} = \\$51.00$.')}</li>
            <li>{processMathText('For Scenario 3: $D_1 = \\$4.00 \\times (1 + 0.05) = \\$4.20$. The denominator $r - g$ is $0.10 - 0.05 = 0.05$. The Stock Price $P_0 = \\frac{\\$4.20}{0.05} = \\$84.00$.')}</li>
          </ul>
        </div>
      )}

      {/* Success Notification */}
      {submitted && isAllCorrect && (
        <div className="bg-emerald-950/80 border border-emerald-500/50 rounded-2xl p-5 text-emerald-200 flex items-start gap-3 shadow-lg">
          <Sparkles className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5 animate-bounce" />
          <div className="space-y-1">
            <h5 className="font-sans font-bold text-emerald-300 text-base">
              Superb Convergence Proof! 100% Correct
            </h5>
            <p className="font-serif text-xs sm:text-sm text-emerald-200/90 leading-relaxed">
              You have perfectly mastered the infinite perpetuity calculations! You've shown exactly how expected future growth is baked into a stock's valuation today.
            </p>
          </div>
        </div>
      )}

      {/* Action Controls */}
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
