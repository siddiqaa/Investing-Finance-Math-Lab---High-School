import React, { useState } from 'react';
import { formatCurrency, formatPercent } from '../utils/mathUtils';
import { Sparkles, TrendingUp, HelpCircle, ArrowRight, BookOpen } from 'lucide-react';
import { processMathText, MathSpan } from '../lib/math';

export const ValuationLab: React.FC = () => {
  const [d0, setD0] = useState<number>(2.50); // Initial dividend $2.50
  const [g, setG] = useState<number>(0.04); // Growth rate 4%
  const [r, setR] = useState<number>(0.08); // Required return 8%

  // Push values dynamically to ensure r > g + 0.005 always holds true
  const handleGChange = (val: number) => {
    setG(val);
    if (val >= r - 0.005) {
      setR(Number((val + 0.005).toFixed(4)));
    }
  };

  const handleRChange = (val: number) => {
    setR(val);
    if (val <= g + 0.005) {
      setG(Number((val - 0.005).toFixed(4)));
    }
  };

  // Calculations
  const d1 = d0 * (1 + g);
  let theoreticalPrice = 0;
  if (r > g) {
    theoreticalPrice = d1 / (r - g);
  }

  // Decomposed Yields
  const divYield = theoreticalPrice > 0 ? (d1 / theoreticalPrice) : 0;
  const capGainsYield = g;

  // Projections for the next 10 years
  const projections = [];
  let maxDividendVal = 0;

  for (let t = 1; t <= 10; t++) {
    const d_t = d0 * Math.pow(1 + g, t);
    const pv_t = d_t / Math.pow(1 + r, t);
    if (d_t > maxDividendVal) maxDividendVal = d_t;
    projections.push({
      year: t,
      dividend: d_t,
      presentValue: pv_t,
    });
  }

  return (
    <div className="space-y-6" id="stock-valuation-lab">
      {/* Parameter Sliders Panel */}
      <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-6">
        <h3 className="font-sans font-semibold text-slate-800 text-lg flex items-center justify-between">
          <span>Stock Valuation Parameter Lab</span>
          <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2.5 py-1 rounded border border-slate-200 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
            Gordon Growth Model Engine
          </span>
        </h3>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Recent Dividend (D0) */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 font-medium font-sans">Recent Dividend (<MathSpan tex="D_0" />)</span>
              <span className="font-mono text-indigo-600 font-semibold">{formatCurrency(d0)}</span>
            </div>
            <input
              type="range"
              min="0.50"
              max="10.00"
              step="0.10"
              value={d0}
              onChange={(e) => setD0(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              id="slider-val-d0"
            />
            <div className="flex justify-between text-xs text-slate-400 font-mono">
              <span>$0.50</span>
              <span>$10.00</span>
            </div>
          </div>

          {/* Growth Rate (g) */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 font-medium font-sans">Dividend Growth Rate (<MathSpan tex="g" />)</span>
              <span className="font-mono text-indigo-600 font-semibold">{formatPercent(g)}</span>
            </div>
            <input
              type="range"
              min="0"
              max="0.15"
              step="0.001"
              value={g}
              onChange={(e) => handleGChange(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              id="slider-val-g"
            />
            <div className="flex justify-between text-xs text-slate-400 font-mono">
              <span>0.0%</span>
              <span>15.0%</span>
            </div>
          </div>

          {/* Required Return (r) */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 font-medium font-sans">Required Discount Rate (<MathSpan tex="r" />)</span>
              <span className="font-mono text-indigo-600 font-semibold">{formatPercent(r)}</span>
            </div>
            <input
              type="range"
              min="0.03"
              max="0.20"
              step="0.001"
              value={r}
              onChange={(e) => handleRChange(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              id="slider-val-r"
            />
            <div className="flex justify-between text-xs text-slate-400 font-mono">
              <span>3.0%</span>
              <span>20.0%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Numerical Output Dashboard & Visual Convergence Graph */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Value Dashboard */}
        <div className="lg:col-span-5 space-y-4">
          {/* Main Stock Price Card */}
          <div className="p-5 bg-gradient-to-br from-indigo-900 to-slate-900 border border-indigo-950 text-white rounded-2xl shadow-md space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
              <TrendingUp className="w-24 h-24 text-indigo-300" />
            </div>
            
            <div className="relative z-10">
              <h4 className="font-sans text-xs uppercase tracking-wider text-indigo-200">Theoretical Stock Price (<MathSpan tex="P_0" />)</h4>
              <div className="font-sans text-4xl font-extrabold tracking-tight mt-1" id="stock-theoretical-price">
                {theoreticalPrice > 0 ? formatCurrency(theoreticalPrice) : 'Infinite / Error'}
              </div>
              <p className="font-serif italic text-xs text-indigo-100/70 mt-2">
                Derived using the single-stage Gordon growth infinite geometric limit.
              </p>

              <div className="mt-5 border-t border-indigo-800/50 pt-4 space-y-3">
                <div className="flex justify-between text-xs font-mono text-indigo-200">
                  <span>Next Year Dividend (<MathSpan tex="D_1" />):</span>
                  <span className="text-white font-bold">{formatCurrency(d1)}</span>
                </div>
                <div className="flex justify-between text-xs font-mono text-indigo-200">
                  <span>Algebraic Denominator (<MathSpan tex="r - g" />):</span>
                  <span className="text-white font-bold">
                    {formatPercent(r)} - {formatPercent(g)} = {formatPercent(r - g)}
                  </span>
                </div>
                <div className="flex justify-between text-xs font-mono text-indigo-200 border-t border-indigo-850/30 pt-2">
                  <span>Calculation Process:</span>
                  <span className="text-white font-bold">
                    {formatCurrency(d1)} ÷ {(r - g).toFixed(4)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Breakdown of Return Components Card */}
          <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-3">
            <h4 className="font-sans font-bold text-slate-700 text-xs uppercase tracking-wider">Expected Return Decomposed</h4>
            <p className="text-xs text-slate-500 font-sans leading-relaxed">
              {processMathText('Your required return ($r$) consists of a cash payout yield plus your capital growth yield:')}
            </p>

            <div className="grid grid-cols-2 gap-4 pt-1 font-sans">
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                <span className="text-[10px] text-slate-500 uppercase tracking-wide block font-semibold">Dividend Yield (<MathSpan tex="\frac{D_1}{P_0}" />)</span>
                <div className="text-lg font-bold font-mono text-slate-800 mt-0.5">{formatPercent(divYield)}</div>
                <p className="text-[10px] text-slate-400 mt-0.5">Annual cash flow payout</p>
              </div>
              <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl">
                <span className="text-[10px] text-slate-500 uppercase tracking-wide block font-semibold">Capital Growth (<MathSpan tex="g" />)</span>
                <div className="text-lg font-bold font-mono text-slate-800 mt-0.5">{formatPercent(capGainsYield)}</div>
                <p className="text-[10px] text-slate-400 mt-0.5">Infinite price appreciation</p>
              </div>
            </div>

            <div className="bg-indigo-50/50 rounded-xl p-3 border border-indigo-100/50 flex items-center justify-between text-xs font-sans font-semibold text-indigo-800">
              <span>Total Expected Annual Return</span>
              <span className="font-mono">{formatPercent(r)}</span>
            </div>
          </div>
        </div>

        {/* Right: Visual Convergence Graph */}
        <div className="lg:col-span-7 p-5 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col justify-between">
          <div>
            <h4 className="font-sans font-semibold text-slate-800 text-sm">Visualizing Geometric Convergence</h4>
            <p className="text-xs text-slate-500 font-sans mt-0.5">
              Watch the <span className="text-slate-400 font-bold font-mono">gray future dividend</span> expand, while the <span className="text-indigo-600 font-bold font-mono">indigo present value</span> exponentially collapses to zero today.
            </p>
          </div>

          {/* Bar Chart Svg-alike */}
          <div className="h-64 flex items-end justify-between gap-2.5 pt-10 border-b border-slate-100 px-3 relative">
            {projections.map((p) => {
              // Scale bar heights relative to maximum future dividend
              const divPct = (p.dividend / maxDividendVal) * 85;
              const pvPct = (p.presentValue / maxDividendVal) * 85;

              return (
                <div key={p.year} className="flex-1 flex flex-col items-center h-full justify-end group relative">
                  {/* Tooltip */}
                  <div className="absolute bottom-full mb-2 bg-slate-800 text-white text-[10px] p-2 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 w-32 text-center font-mono">
                    <div className="font-semibold text-slate-200">Year {p.year}</div>
                    <div className="text-slate-300">Div: {formatCurrency(p.dividend)}</div>
                    <div className="text-indigo-400 font-bold">PV: {formatCurrency(p.presentValue)}</div>
                  </div>

                  {/* Dual stacked bars */}
                  <div className="w-full bg-slate-50 border border-slate-100 rounded-t flex items-end h-full relative overflow-hidden">
                    {/* Future dividend amount */}
                    <div
                      className="absolute bottom-0 w-full bg-slate-200/90 hover:bg-slate-300/90 transition-all duration-300 rounded-t"
                      style={{ height: `${divPct}%` }}
                    />
                    {/* Present value amount */}
                    <div
                      className="absolute bottom-0 w-full bg-indigo-600 hover:bg-indigo-500 transition-all duration-300 rounded-t z-5 border-t border-indigo-700/30"
                      style={{ height: `${pvPct}%` }}
                    />
                  </div>

                  {/* Year Label */}
                  <span className="font-mono text-[10px] font-bold text-slate-500 mt-2">Y{p.year}</span>
                </div>
              );
            })}
          </div>

          {/* Explanation Footer */}
          <div className="pt-4 flex items-start gap-2 text-xs text-slate-500 leading-relaxed font-serif">
            <BookOpen className="w-4 h-4 text-indigo-500 flex-shrink-0 mt-0.5" />
            <p>
              {processMathText(`Even though the company continues paying dividends forever, their Present Value shrinking to zero proves why the total sum is **finite**. The sum of these heights is exactly equal to the calculated stock price of **${formatCurrency(theoreticalPrice)}**.`)}
            </p>
          </div>
        </div>
      </div>

      {/* High Schooler's Insight Case Study Box */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3.5">
        <h4 className="font-sans font-semibold text-slate-800 text-sm flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Interactive Mathematical Insights</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans text-slate-600">
          <div className="space-y-1.5">
            <span className="font-bold text-slate-800 block">1. The Infinity Denominator Paradox</span>
            <p className="leading-relaxed">
              {processMathText('When the required return $r$ approaches the growth rate $g$ from above, the denominator $(r - g)$ approaches zero. Mathematically, dividing by a number close to zero causes the stock price to **skyrocket toward infinity**. This is why the stock market goes into wild swings when growth expectations drop by even 0.5%—the math multiplies tiny changes dramatically!')}
            </p>
          </div>
          <div className="space-y-1.5">
            <span className="font-bold text-slate-800 block">{processMathText('2. Why can\'t a company grow faster than r forever? ($g \\ge r$)')}</span>
            <p className="leading-relaxed">
              {processMathText('If $g \\ge r$, the denominator becomes zero or negative, resulting in a negative or infinite price. In the real world, a company cannot grow faster than its required discount rate (which is bounded by the growth of the overall economy) forever. If it did, that single company would eventually become larger than the entire global economy combined!')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
