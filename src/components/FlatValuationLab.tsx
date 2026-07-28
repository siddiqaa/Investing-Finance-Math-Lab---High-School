import React, { useState } from 'react';
import { formatCurrency, formatPercent } from '../utils/mathUtils';
import { Sparkles, TrendingUp, ArrowRight, Layers } from 'lucide-react';
import { MathSpan, processMathText } from '../lib/math';

export const FlatValuationLab: React.FC = () => {
  const [d, setD] = useState<number>(4.00); // Constant dividend $4.00
  const [r, setR] = useState<number>(0.08); // Required return 8%

  // Calculation
  const theoreticalPrice = r > 0 ? d / r : 0;
  const divYield = theoreticalPrice > 0 ? d / theoreticalPrice : 0;

  // Projections for the next 10 years
  const projections = [];
  let maxPvVal = 0;

  for (let t = 1; t <= 10; t++) {
    const pv_t = d / Math.pow(1 + r, t);
    if (pv_t > maxPvVal) maxPvVal = pv_t;
    projections.push({
      year: t,
      dividend: d,
      presentValue: pv_t,
    });
  }

  // Sensitivity across discount rates
  const sensitivityRates = [0.04, 0.06, 0.08, 0.10, 0.12, 0.15];

  return (
    <div className="space-y-6" id="flat-valuation-lab">
      {/* Parameter Sliders Panel */}
      <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-6">
        <h3 className="font-sans font-semibold text-slate-800 text-lg flex items-center justify-between">
          <span>Zero-Growth Stock Valuation Lab</span>
          <span className="text-xs font-mono bg-slate-100 text-slate-600 px-2.5 py-1 rounded border border-slate-200 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
            <span>Zero-Growth Dividend Discount Model (DDM) Engine (<MathSpan tex="g = 0" />)</span>
          </span>
        </h3>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Constant Dividend (D) */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 font-medium font-sans flex items-center gap-1">
                <span>Constant Annual Dividend</span>
                <span>(<MathSpan tex="D" />)</span>
              </span>
              <span className="font-mono text-indigo-600 font-semibold">{formatCurrency(d)}</span>
            </div>
            <input
              type="range"
              min="0.50"
              max="10.00"
              step="0.10"
              value={d}
              onChange={(e) => setD(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              id="slider-flat-d"
            />
            <div className="flex justify-between text-xs text-slate-400 font-mono">
              <span>$0.50</span>
              <span>$10.00</span>
            </div>
          </div>

          {/* Discount Rate (r) */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 font-medium font-sans flex items-center gap-1">
                <span>Required Return / Discount Rate</span>
                <span>(<MathSpan tex="r" />)</span>
              </span>
              <span className="font-mono text-indigo-600 font-semibold">{formatPercent(r)}</span>
            </div>
            <input
              type="range"
              min="0.01"
              max="0.20"
              step="0.001"
              value={r}
              onChange={(e) => setR(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              id="slider-flat-r"
            />
            <div className="flex justify-between text-xs text-slate-400 font-mono">
              <span>1.0%</span>
              <span>20.0%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Output Results Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Card 1: Fair Price P0 */}
        <div className="p-5 bg-indigo-900 text-white rounded-2xl shadow-md border border-indigo-800 space-y-2 relative overflow-hidden">
          <div className="text-xs font-mono text-indigo-300 font-semibold uppercase tracking-wider flex items-center justify-between">
            <span className="flex items-center gap-1">
              <span>Fair Stock Price</span>
              <span>(<MathSpan tex="P_0" />)</span>
            </span>
            <Sparkles className="w-4 h-4 text-indigo-300" />
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold font-mono tracking-tight" id="flat-stock-price">
            {formatCurrency(theoreticalPrice)}
          </div>
          <div className="text-xs text-indigo-200 font-mono">
            Formula: <MathSpan tex="P_0 = \frac{D}{r}" /> = {formatCurrency(d)} ÷ {formatPercent(r)}
          </div>
        </div>

        {/* Card 2: Dividend Yield */}
        <div className="p-5 bg-slate-900 text-white rounded-2xl shadow-md border border-slate-800 space-y-2">
          <div className="text-xs font-mono text-slate-400 font-semibold uppercase tracking-wider flex items-center gap-1.5">
            <span>Dividend Yield</span>
            <span>(<MathSpan tex="\frac{D}{P_0}" />)</span>
          </div>
          <div className="text-3xl sm:text-4xl font-extrabold font-mono tracking-tight text-emerald-400" id="flat-div-yield">
            {formatPercent(divYield)}
          </div>
          <div className="text-xs text-slate-400 font-sans">
            100% of return comes from direct cash dividends
          </div>
        </div>
      </div>

      {/* Discounted Cash Flow Breakdown Chart */}
      <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <h4 className="font-sans font-semibold text-slate-800 text-sm flex items-center gap-2">
            <Layers className="w-4 h-4 text-indigo-600" />
            <span>Present Value Decay of Flat Cash Flows (Years 1–10)</span>
          </h4>
          <span className="text-xs text-slate-500 font-mono">
            Constant Dividend: {formatCurrency(d)} / year
          </span>
        </div>

        <div className="grid grid-cols-10 gap-1.5 sm:gap-2 h-44 items-end pt-6 pb-2 border-b border-slate-100">
          {projections.map((item) => {
            const heightPercent = maxPvVal > 0 ? (item.presentValue / maxPvVal) * 100 : 0;
            return (
              <div key={item.year} className="flex flex-col items-center gap-1.5 h-full justify-end group">
                <div className="text-[10px] font-mono text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  {formatCurrency(item.presentValue)}
                </div>
                <div
                  className="w-full bg-indigo-500 hover:bg-indigo-600 transition-all rounded-t-md relative"
                  style={{ height: `${Math.max(8, heightPercent)}%` }}
                >
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[9px] font-mono text-slate-400 whitespace-nowrap">
                    Year {item.year}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-xs text-slate-500 font-sans leading-relaxed">
          Notice how every year\'s cash dividend is identical ({formatCurrency(d)}), but discounting at {formatPercent(r)} reduces the Present Value of future cash flows year after year. The sum of all infinite future bars equals exactly <strong className="text-slate-800">{formatCurrency(theoreticalPrice)}</strong>.
        </p>
      </div>

      {/* Sensitivity Table */}
      <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-3">
        <h4 className="font-sans font-semibold text-slate-800 text-sm flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-indigo-600" />
          <span>Discount Rate Sensitivity Table (<MathSpan tex={`D = ${formatCurrency(d)}`} />)</span>
        </h4>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-mono">
                <th className="py-2 px-3">Required Return (<MathSpan tex="r" />)</th>
                <th className="py-2 px-3">Calculation (<MathSpan tex="D \div r" />)</th>
                <th className="py-2 px-3 text-right">Fair Stock Price (<MathSpan tex="P_0" />)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sensitivityRates.map((rateVal) => {
                const price = d / rateVal;
                const isCurrent = Math.abs(rateVal - r) < 0.001;
                return (
                  <tr
                    key={rateVal}
                    className={`transition-colors ${isCurrent ? 'bg-indigo-50/60 font-semibold text-indigo-900' : 'text-slate-700 hover:bg-slate-50'}`}
                  >
                    <td className="py-2.5 px-3 font-mono">{formatPercent(rateVal)}</td>
                    <td className="py-2.5 px-3 font-mono text-slate-500">
                      {formatCurrency(d)} ÷ {formatPercent(rateVal)}
                    </td>
                    <td className="py-2.5 px-3 font-mono font-bold text-right">
                      {formatCurrency(price)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
