import React, { useState } from 'react';
import { formatCurrency, formatPercent } from '../utils/mathUtils';

export const DcfLab: React.FC = () => {
  const [cf0, setCf0] = useState<number>(10); // $10M
  const [g1, setG1] = useState<number>(0.15); // 15% high growth
  const [g2, setG2] = useState<number>(0.03); // 3% terminal growth
  const [r, setR] = useState<number>(0.09); // 9% discount rate
  const [years, setYears] = useState<number>(5); // 5 years of high growth
  const [isContinuous, setIsContinuous] = useState<boolean>(false);

  // Calculate annual projections
  const projections = [];
  let totalPVOfCashFlows = 0;

  for (let t = 1; t <= years; t++) {
    let cf_t = 0;
    let df_t = 0;

    if (!isContinuous) {
      cf_t = cf0 * Math.pow(1 + g1, t);
      df_t = 1 / Math.pow(1 + r, t);
    } else {
      cf_t = cf0 * Math.exp(g1 * t);
      df_t = Math.exp(-r * t);
    }

    const pv_t = cf_t * df_t;
    totalPVOfCashFlows += pv_t;

    projections.push({
      year: t,
      cashFlow: cf_t,
      discountFactor: df_t,
      presentValue: pv_t,
    });
  }

  // Terminal value calculation at year N
  let terminalValue = 0;
  let pvOfTerminalValue = 0;

  // Let terminal growth CF grow into year N+1
  const cf_N_plus_1 = !isContinuous
    ? projections[years - 1].cashFlow * (1 + g2)
    : projections[years - 1].cashFlow * Math.exp(g2);

  if (r > g2) {
    if (!isContinuous) {
      terminalValue = cf_N_plus_1 / (r - g2);
      pvOfTerminalValue = terminalValue / Math.pow(1 + r, years);
    } else {
      // Continuous capitalization integral from N to infinity of CF_N * e^(g2*(t-N)) * e^(-r*(t-N)) d(t-N)
      // Result = CF_N / (r - g2), discounted to PV.
      terminalValue = projections[years - 1].cashFlow / (r - g2);
      pvOfTerminalValue = terminalValue * Math.exp(-r * years);
    }
  }

  const intrinsicValue = totalPVOfCashFlows + pvOfTerminalValue;

  // Render variables for interactive dynamic bar chart
  const maxVal = Math.max(...projections.map(p => p.cashFlow), terminalValue * 0.15 || 1);

  return (
    <div className="space-y-6">
      <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-6">
        <h3 className="font-sans font-semibold text-slate-800 text-lg flex items-center justify-between">
          <span>DCF Parameter Lab</span>
          <button
            onClick={() => setIsContinuous(!isContinuous)}
            className={`px-3 py-1 text-xs rounded-full font-mono transition-colors border ${
              isContinuous
                ? 'bg-indigo-50 border-indigo-200 text-indigo-700'
                : 'bg-slate-50 border-slate-200 text-slate-600'
            }`}
            id="toggle-continuous-dcf"
          >
            {isContinuous ? 'Continuous Compounding (e^-rt)' : 'Discrete Compounding (1+r)^-t'}
          </button>
        </h3>

        {/* 2x3 Grid for Parameter Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* CF0 */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 font-medium font-sans">Initial Cash Flow (CF₀)</span>
              <span className="font-mono text-indigo-600 font-semibold">{formatCurrency(cf0 * 1e6)}</span>
            </div>
            <input
              type="range"
              min="1"
              max="100"
              step="0.5"
              value={cf0}
              onChange={(e) => setCf0(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              id="slider-cf0"
            />
            <div className="flex justify-between text-xs text-slate-400 font-mono">
              <span>$1.0M</span>
              <span>$100.0M</span>
            </div>
          </div>

          {/* Growth g1 */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 font-medium font-sans">Stage 1 Growth Rate (g₁)</span>
              <span className="font-mono text-indigo-600 font-semibold">{formatPercent(g1)}</span>
            </div>
            <input
              type="range"
              min="0"
              max="0.4"
              step="0.01"
              value={g1}
              onChange={(e) => setG1(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              id="slider-g1"
            />
            <div className="flex justify-between text-xs text-slate-400 font-mono">
              <span>0%</span>
              <span>40%</span>
            </div>
          </div>

          {/* Limit / Discount Rate r */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 font-medium font-sans">Required Discount Rate (r)</span>
              <span className="font-mono text-indigo-600 font-semibold">{formatPercent(r)}</span>
            </div>
            <input
              type="range"
              min={g2 + 0.01}
              max="0.25"
              step="0.005"
              value={r}
              onChange={(e) => setR(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              id="slider-r"
            />
            <div className="flex justify-between text-xs text-slate-400 font-mono">
              <span>{formatPercent(g2 + 0.01)}</span>
              <span>25%</span>
            </div>
          </div>

          {/* Stage 1 Duration (N) */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 font-medium font-sans">High Growth Period (N)</span>
              <span className="font-mono text-indigo-600 font-semibold">{years} Years</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              step="1"
              value={years}
              onChange={(e) => setYears(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              id="slider-years"
            />
            <div className="flex justify-between text-xs text-slate-400 font-mono">
              <span>1 Year</span>
              <span>10 Years</span>
            </div>
          </div>

          {/* Perpetual growth g2 */}
          <div className="space-y-2 col-span-1 md:col-span-2 lg:col-span-1">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 font-medium font-sans flex items-center">
                <span>Perpetual Growth (g₂)</span>
                {r <= g2 && (
                  <span className="text-red-500 text-xs ml-2 font-mono">(Must be &lt; r)</span>
                )}
              </span>
              <span className="font-mono text-indigo-600 font-semibold">{formatPercent(g2)}</span>
            </div>
            <input
              type="range"
              min="0"
              max={Math.min(r - 0.01, 0.08)}
              step="0.005"
              value={g2}
              onChange={(e) => setG2(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              id="slider-g2"
            />
            <div className="flex justify-between text-xs text-slate-400 font-mono">
              <span>0%</span>
              <span>{formatPercent(Math.min(r - 0.01, 0.08))}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Results summary & Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Value Dashboard Cards */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 bg-gradient-to-br from-indigo-900 to-slate-900 border border-indigo-950 text-white rounded-2xl shadow-md">
            <h4 className="font-sans text-xs uppercase tracking-wider text-indigo-200">Calculated Intrinsic Value</h4>
            <div className="font-sans text-3xl font-extrabold tracking-tight mt-1" id="dcf-intrinsic-value-display">
              {formatCurrency(intrinsicValue * 1e6)}
            </div>
            <p className="font-serif italic text-xs text-indigo-100/70 mt-2">
              Based on the discounted sum of discrete Stage 1 cash flows and capitalized infinite Stage 2 perpetuity.
            </p>

            <div className="mt-5 border-t border-indigo-800/50 pt-4 grid grid-cols-2 gap-4 text-xs font-sans">
              <div>
                <span className="text-indigo-200">PV of Growth (Years 1-{years}):</span>
                <div className="text-base font-semibold font-mono text-white mt-0.5">
                  {formatCurrency(totalPVOfCashFlows * 1e6)}
                </div>
              </div>
              <div>
                <span className="text-indigo-200">PV of perpetuity (Terminal):</span>
                <div className="text-base font-semibold font-mono text-white mt-0.5">
                  {formatCurrency(pvOfTerminalValue * 1e6)}
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
            <h4 className="font-sans font-semibold text-slate-700 text-sm">A High Schooler's Insight</h4>
            <ul className="text-xs text-slate-600 list-disc list-outside pl-4 space-y-2 font-sans">
              <li>
                <span className="font-semibold text-slate-800">The Power of Exponents:</span> Compound growth grows exponentially using exponents: $A = P(1 + r)^n$. A tiny increase in the rate $r$ creates a massive difference over many years because the growth compounds on top of previous growth!
              </li>
              <li>
                <span className="font-semibold text-slate-800">Working Backwards (Discounting):</span> Present value ($PV = FV / (1 + r)^n$) is the opposite of future compounding. Since money grew to get here, we divide by the compound factor to see what that future cash is worth to us today.
              </li>
              <li>
                <span className="font-semibold text-slate-800">Stable Company Valuation:</span> We can value a whole company by adding up all its future cash returns today. Under the Gordon Growth model, we do this with a simple division: $P_0 = D_1 / (r - g)$. If growth ($g$) is bigger than rate ($r$), the company has "infinite" value!
              </li>
            </ul>
          </div>
        </div>

        {/* Bar Chart Representation of PV vs FV decay */}
        <div className="lg:col-span-7 p-5 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col justify-between">
          <div>
            <h4 className="font-sans font-semibold text-slate-800 text-sm">Visualizing Value Decay over Time</h4>
            <p className="text-xs text-slate-500 font-sans mt-0.5">
              The solid dark bars represent the cash flow in that year. The green overlay shows its Present Value today.
            </p>
          </div>

          <div className="h-64 flex items-end justify-between gap-4 pt-10 border-b border-slate-100 px-4">
            {projections.map((p) => {
              const cfPct = (p.cashFlow / maxVal) * 100;
              const pvPct = (p.presentValue / maxVal) * 100;

              return (
                <div key={p.year} className="flex-1 flex flex-col items-center h-full justify-end group relative">
                  {/* Tooltip */}
                  <div className="absolute bottom-full mb-2 bg-slate-800 text-white text-[10px] p-2 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 w-28 text-center font-mono">
                    <div className="font-semibold">Year {p.year}</div>
                    <div className="text-slate-300">CF: {formatCurrency(p.cashFlow * 1e6)}</div>
                    <div className="text-green-400">PV: {formatCurrency(p.presentValue * 1e6)}</div>
                  </div>

                  {/* Visual Bar container */}
                  <div className="w-full bg-slate-100 rounded-t flex flex-col justify-end h-full relative overflow-hidden">
                    {/* Future Value */}
                    <div
                      className="absolute bottom-0 w-full bg-indigo-200 transition-all duration-300 rounded-t"
                      style={{ height: `${cfPct}%` }}
                    />
                    {/* Present Value */}
                    <div
                      className="absolute bottom-0 w-full bg-green-500 transition-all duration-300 rounded-t"
                      style={{ height: `${pvPct}%` }}
                    />
                  </div>

                  {/* Labels */}
                  <span className="font-mono text-xs font-semibold text-slate-700 mt-2">Y{p.year}</span>
                </div>
              );
            })}

            {/* Terminal Value Bar representation */}
            {r > g2 && (
              <div className="flex-1 flex flex-col items-center h-full justify-end group relative border-l border-slate-200 pl-4">
                {/* Tooltip */}
                <div className="absolute bottom-full mb-2 bg-slate-800 text-white text-[10px] p-2 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 w-36 text-center font-mono">
                  <div className="font-semibold">Terminal Value</div>
                  <div className="text-slate-300">TV: {formatCurrency(terminalValue * 1e6)}</div>
                  <div className="text-green-400">PV: {formatCurrency(pvOfTerminalValue * 1e6)}</div>
                </div>

                <div className="w-full bg-slate-100 rounded-t flex flex-col justify-end h-full relative overflow-hidden">
                  {/* Future Value - scaled down so it doesn't break the layout scale */}
                  <div
                    className="absolute bottom-0 w-full bg-indigo-300/60 transition-all duration-300 rounded-t border-dashed border-t border-indigo-700"
                    style={{ height: `${Math.min(100, (terminalValue * 0.15 / maxVal) * 100)}%` }}
                  />
                  {/* Present Value */}
                  <div
                    className="absolute bottom-0 w-full bg-green-600 transition-all duration-300 rounded-t"
                    style={{ height: `${Math.min(100, (pvOfTerminalValue / maxVal) * 100)}%` }}
                  />
                </div>

                <span className="font-mono text-xs font-semibold text-indigo-700 mt-2">TV</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-center space-x-6 text-xs mt-3">
            <div className="flex items-center space-x-1.5">
              <div className="w-3.5 h-3.5 bg-indigo-200 rounded" />
              <span className="text-slate-600 font-sans">Projected Cash Flow (FV)</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <div className="w-3.5 h-3.5 bg-green-500 rounded" />
              <span className="text-slate-600 font-sans">Discounted Present Value</span>
            </div>
          </div>
        </div>
      </div>

      {/* Projections Excel-like Table */}
      <div className="p-1 bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-mono border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Year</th>
                <th className="px-4 py-3 text-right">Cash Flow (CF_t)</th>
                <th className="px-4 py-3 text-right">Discount Factor</th>
                <th className="px-4 py-3 text-right">Present Value (PV_t)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-slate-700 text-xs">
              {projections.map((p) => (
                <tr key={p.year} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-4 py-3.5 font-sans font-semibold text-slate-800">Year {p.year}</td>
                  <td className="px-4 py-3.5 text-right">{formatCurrency(p.cashFlow * 1e6)}</td>
                  <td className="px-4 py-3.5 text-right font-medium text-slate-500">{p.discountFactor.toFixed(5)}</td>
                  <td className="px-4 py-3.5 text-right font-semibold text-green-700">{formatCurrency(p.presentValue * 1e6)}</td>
                </tr>
              ))}
              {r > g2 && (
                <tr className="bg-indigo-50/20 text-indigo-950 font-semibold border-t-2 border-slate-200">
                  <td className="px-4 py-4 font-sans font-bold">Terminal Value (Year {years} onwards)</td>
                  <td className="px-4 py-4 text-right">{formatCurrency(terminalValue * 1e6)}</td>
                  <td className="px-4 py-4 text-right text-indigo-600">Dis. Factor: {isContinuous ? Math.exp(-r * years).toFixed(5) : (1 / Math.pow(1 + r, years)).toFixed(5)}</td>
                  <td className="px-4 py-4 text-right text-indigo-700 font-bold">{formatCurrency(pvOfTerminalValue * 1e6)}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
