import React, { useState } from 'react';
import { CheckCircle2, XCircle, HelpCircle, RefreshCw, Eye, Sparkles, Zap, ArrowRight } from 'lucide-react';
import { processMathText } from '../lib/math';

interface ScenarioState {
  newInputRate: string; // User enters the new rate (g or r) as a percent e.g. "5%" or "12%"
  newInputPrice: string; // User enters the calculated new price e.g. "$50.00"
  isCorrect?: boolean;
}

export const NewsBridgeKnowledgeCheck: React.FC = () => {
  const [rowStates, setRowStates] = useState<Record<number, ScenarioState>>({
    1: { newInputRate: '', newInputPrice: '' },
    2: { newInputRate: '', newInputPrice: '' },
    3: { newInputRate: '', newInputPrice: '' },
  });

  const [showSolutions, setShowSolutions] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Scenarios mapping
  // Scenario 1: AI Break-through
  // Baseline: D1 = $2.00, r = 8%, g = 3% => Price = $40.00
  // News: growth rate (g) increases by +2%
  // New g target: 5% (0.05), New Price target: $66.67
  //
  // Scenario 2: Patent Expiry
  // Baseline: D1 = $3.00, r = 9%, g = 5% => Price = $75.00
  // News: growth rate (g) drops by -2%
  // New g target: 3% (0.03), New Price target: $50.00
  //
  // Scenario 3: Fed Rate Hike
  // Baseline: D1 = $4.00, r = 10%, g = 4% => Price = $66.67
  // News: risk rate (r) increases by +2%
  // New r target: 12% (0.12), New Price target: $50.00

  const scenarios = [
    {
      id: 1,
      name: 'Scenario A: AI Breakthrough (Positive g-Shock)',
      baselineDesc: 'D₁ = $2.00, r = 8%, g = 3% (Price: $40.00)',
      newsDesc: 'A revolutionary new AI system boosts product growth (g) by +2% (or +0.02).',
      rateLabel: 'New Growth Rate (g_new)',
      rateTarget: 5, // 5%
      priceTarget: 66.67,
      hintFormula: 'P = \\frac{\\$2.00}{0.08 - 0.05}'
    },
    {
      id: 2,
      name: 'Scenario B: New Competitor (Negative g-Shock)',
      baselineDesc: 'D₁ = $3.00, r = 9%, g = 5% (Price: $75.00)',
      newsDesc: 'A powerful new competitor enters the market, cutting company growth (g) by -2% (or -0.02).',
      rateLabel: 'New Growth Rate (g_new)',
      rateTarget: 3, // 3%
      priceTarget: 50.00,
      hintFormula: 'P = \\frac{\\$3.00}{0.09 - 0.03}'
    },
    {
      id: 3,
      name: 'Scenario C: Fed Rate Hike (Positive r-Shock)',
      baselineDesc: 'D₁ = $4.00, r = 10%, g = 4% (Price: $66.67)',
      newsDesc: 'The Federal Reserve aggressively hikes interest rates, increasing investor required return (r) by +2% (or +0.02).',
      rateLabel: 'New Discount Rate (r_new)',
      rateTarget: 12, // 12%
      priceTarget: 50.00,
      hintFormula: 'P = \\frac{\\$4.00}{0.12 - 0.04}'
    }
  ];

  const handleInputChange = (id: number, field: 'newInputRate' | 'newInputPrice', value: string) => {
    if (submitted) return;
    setRowStates((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const validateRate = (id: number, input: string): boolean => {
    if (!input.trim()) return false;
    // Strip % and spaces
    const val = parseFloat(input.replace(/[\%\s]/g, ''));
    if (isNaN(val)) return false;
    const target = scenarios.find(s => s.id === id)?.rateTarget || 0;
    // Accept either "5" or "0.05" for 5%
    if (Math.abs(val - target) < 0.1) return true;
    if (Math.abs(val - (target / 100)) < 0.002) return true;
    return false;
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
    const updated: Record<number, ScenarioState> = {};
    scenarios.forEach((s) => {
      const state = rowStates[s.id] || { newInputRate: '', newInputPrice: '' };
      const rateOk = validateRate(s.id, state.newInputRate);
      const priceOk = validatePrice(s.id, state.newInputPrice);
      updated[s.id] = {
        ...state,
        isCorrect: rateOk && priceOk,
      };
    });
    setRowStates(updated);
  };

  const handleReset = () => {
    setSubmitted(false);
    setShowSolutions(false);
    setShowHint(false);
    setRowStates({
      1: { newInputRate: '', newInputPrice: '' },
      2: { newInputRate: '', newInputPrice: '' },
      3: { newInputRate: '', newInputPrice: '' },
    });
  };

  const totalCorrect = scenarios.filter((s) => {
    const row = rowStates[s.id];
    return row && validateRate(s.id, row.newInputRate) && validatePrice(s.id, row.newInputPrice);
  }).length;

  const isAllCorrect = totalCorrect === scenarios.length;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 text-slate-100 shadow-xl my-8 space-y-6 relative overflow-hidden" id="news-bridge-knowledge-check">
      {/* Background Accent glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-extrabold uppercase tracking-widest">
            <Zap className="w-4 h-4 text-rose-400" />
            <span>Interactive Knowledge Check</span>
          </div>
          <h4 className="font-sans font-extrabold text-xl sm:text-2xl text-white tracking-tight">
            {processMathText('Catalyst Shock Practice: Delta g and Delta r')}
          </h4>
          <p className="font-serif text-slate-300 text-sm leading-relaxed max-w-2xl">
            {processMathText('Practice shifting expectation parameters and calculating the resulting stock price shock when surprise news arrives.')}
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
          {processMathText('Gordon Growth Model: $P_0 = \\frac{D_1}{r - g}$')}
        </p>
        <p>
          {processMathText('When a news shock hits, add/subtract the shift to find $g_{\\text{new}}$ or $r_{\\text{new}}$, then recalculate.')}
        </p>
      </div>

      {/* Interactive Scenario Cards (Flattened layout instead of dense nested card borders to comply with style rules) */}
      <div className="space-y-6">
        {scenarios.map((s) => {
          const row = rowStates[s.id] || { newInputRate: '', newInputPrice: '' };
          const isRateCorrect = validateRate(s.id, row.newInputRate);
          const isPriceCorrect = validatePrice(s.id, row.newInputPrice);

          return (
            <div key={s.id} className="border-b border-slate-800/60 pb-6 last:border-0 last:pb-0 space-y-3 font-sans">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="font-bold text-sm text-slate-200 block">
                  {s.name}
                </span>
                {submitted && (
                  <div className="flex items-center gap-1">
                    {row.isCorrect ? (
                      <span className="text-emerald-400 text-xs font-mono font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Correct
                      </span>
                    ) : (
                      <span className="text-rose-400 text-xs font-mono font-bold flex items-center gap-1">
                        <XCircle className="w-4 h-4" /> Incorrect
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Description of the event */}
              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed font-serif bg-slate-950/40 p-4 border border-slate-850 rounded-2xl space-y-1.5">
                <div className="text-[10px] uppercase font-mono font-bold text-slate-500">Baseline Parameters:</div>
                <div className="font-mono text-slate-300">{s.baselineDesc}</div>
                <div className="text-[10px] uppercase font-mono font-bold text-slate-500 mt-2">Unexpected Catalyst News:</div>
                <div className="text-rose-300 font-medium">{s.newsDesc}</div>
              </div>

              {/* Form Input fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Shifted Rate Input */}
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-400 block font-mono">
                    {s.rateLabel}
                  </label>
                  <div className="space-y-1">
                    <input
                      type="text"
                      disabled={submitted}
                      value={row.newInputRate}
                      onChange={(e) => handleInputChange(s.id, 'newInputRate', e.target.value)}
                      placeholder="e.g. 5%"
                      className={`w-full bg-slate-950 border rounded-xl px-3 py-2 font-mono text-white placeholder-slate-600 focus:outline-none focus:ring-1 transition-all ${
                        submitted
                          ? isRateCorrect
                            ? 'border-emerald-500/60 bg-emerald-950/20'
                            : 'border-rose-500/60 bg-rose-950/20'
                          : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20'
                      }`}
                    />
                    {showSolutions && (
                      <div className="text-[11px] text-indigo-300 font-mono mt-1">
                        Solution: {s.rateTarget}%
                      </div>
                    )}
                  </div>
                </div>

                {/* New Price Input */}
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-400 block font-mono">
                    New Fair Value Price (P_new)
                  </label>
                  <div className="space-y-1">
                    <input
                      type="text"
                      disabled={submitted}
                      value={row.newInputPrice}
                      onChange={(e) => handleInputChange(s.id, 'newInputPrice', e.target.value)}
                      placeholder="e.g. $50.00"
                      className={`w-full bg-slate-950 border rounded-xl px-3 py-2 font-mono text-white placeholder-slate-600 focus:outline-none focus:ring-1 transition-all ${
                        submitted
                          ? isPriceCorrect
                            ? 'border-emerald-500/60 bg-emerald-950/20'
                            : 'border-rose-500/60 bg-rose-950/20'
                          : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20'
                      }`}
                    />
                    {showSolutions && (
                      <div className="text-[11px] text-emerald-300 font-mono mt-1">
                        Solution: ${s.priceTarget.toFixed(2)}
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Hint Accordion */}
      {showHint && (
        <div className="bg-indigo-950/40 border border-indigo-800/50 rounded-2xl p-4 text-xs sm:text-sm text-indigo-200 space-y-2 font-serif">
          <div className="font-sans font-bold text-indigo-300 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-indigo-400" />
            <span>Step-by-Step Solver Hint</span>
          </div>
          <ul className="list-disc list-inside space-y-2 text-xs text-indigo-300/90 font-sans">
            <li>
              {processMathText('**Scenario A:** $g_{\\text{new}} = 3\\% + 2\\% = 5\\%$. Now divide $D_1 = \\$2.00$ by the new spread $(r - g_{\\text{new}}) = 0.08 - 0.05 = 0.03$. Price: $\\frac{\\$2.00}{0.03} \\approx \\$66.67$.')}
            </li>
            <li>
              {processMathText('**Scenario B:** $g_{\\text{new}} = 5\\% - 2\\% = 3\\%$. Now divide $D_1 = \\$3.00$ by the new spread $(r - g_{\\text{new}}) = 0.09 - 0.03 = 0.06$. Price: $\\frac{\\$3.00}{0.06} = \\$50.00$.')}
            </li>
            <li>
              {processMathText('**Scenario C:** $r_{\\text{new}} = 10\\% + 2\\% = 12\\%$. Now divide $D_1 = \\$4.00$ by the new spread $(r_{\\text{new}} - g) = 0.12 - 0.04 = 0.08$. Price: $\\frac{\\$4.00}{0.08} = \\$50.00$.')}
            </li>
          </ul>
        </div>
      )}

      {/* Success Notification */}
      {submitted && isAllCorrect && (
        <div className="bg-emerald-950/80 border border-emerald-500/50 rounded-2xl p-5 text-emerald-200 flex items-start gap-3 shadow-lg">
          <Sparkles className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5 animate-bounce" />
          <div className="space-y-1">
            <h5 className="font-sans font-bold text-emerald-300 text-base">
              Amazing Price Discovery Skills!
            </h5>
            <p className="font-serif text-xs sm:text-sm text-emerald-200/90 leading-relaxed">
              You have perfectly solved all the expectation-shifting scenarios! You have proven exactly how surprising news shifts the inputs to GGM and triggers instantaneous valuation jumps in the marketplace.
            </p>
          </div>
        </div>
      )}

      {/* Action Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowHint(!showHint)}
            className="px-3.5 py-2 rounded-xl text-xs font-sans font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5 text-rose-400" />
            <span>{showHint ? 'Hide Hint' : 'Show Hint'}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowSolutions(!showSolutions)}
            className="px-3.5 py-2 rounded-xl text-xs font-sans font-bold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-emerald-400" />
            <span>{showSolutions ? 'Hide Solutions' : 'Show Solutions'}</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="px-3.5 py-2 rounded-xl text-xs font-sans font-bold text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          <button
            type="button"
            onClick={handleCheckAnswers}
            className="px-5 py-2 rounded-xl text-xs sm:text-sm font-sans font-bold text-white bg-rose-600 hover:bg-rose-500 shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Check Answers</span>
          </button>
        </div>
      </div>
    </div>
  );
};
