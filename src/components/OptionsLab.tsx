import React, { useState, useMemo } from 'react';
import { normalCDF, normalPDF, formatPercent, formatCurrency } from '../utils/mathUtils';

export const OptionsLab: React.FC = () => {
  const [s, setS] = useState<number>(100);
  const [k, setK] = useState<number>(100);
  const [maturity, setMaturity] = useState<number>(0.5); // Years to expiration
  const [rate, setRate] = useState<number>(0.05); // 5% risk free
  const [vol, setVol] = useState<number>(0.25); // 25% volatility
  const [isCall, setIsCall] = useState<boolean>(true); // Call vs Put selector

  // Compute option pricing parameters
  const bsmStats = useMemo(() => {
    // Avoid division by zero
    const t = Math.max(0.001, maturity);
    const sigma = Math.max(0.01, vol);

    const d1 = (Math.log(s / k) + (rate + 0.5 * sigma * sigma) * t) / (sigma * Math.sqrt(t));
    const d2 = d1 - sigma * Math.sqrt(t);

    const Nd1 = normalCDF(d1);
    const Nd2 = normalCDF(d2);
    const N_d1 = normalCDF(-d1);
    const N_d2 = normalCDF(-d2);

    const pdf_d1 = normalPDF(d1);

    // Call Option Price
    const callPrice = s * Nd1 - k * Math.exp(-rate * t) * Nd2;
    // Put Option Price
    const putPrice = k * Math.exp(-rate * t) * N_d2 - s * N_d1;

    // Greeks
    const deltaCall = Nd1;
    const deltaPut = Nd1 - 1;

    const gamma = pdf_d1 / (s * sigma * Math.sqrt(t));
    const vega = s * Math.sqrt(t) * pdf_d1;

    // Theta (per year, usually quoted per day division of 365)
    const thetaCall =
      -(s * pdf_d1 * sigma) / (2 * Math.sqrt(t)) - rate * k * Math.exp(-rate * t) * Nd2;
    const thetaPut =
      -(s * pdf_d1 * sigma) / (2 * Math.sqrt(t)) + rate * k * Math.exp(-rate * t) * N_d2;

    const price = isCall ? callPrice : putPrice;
    const delta = isCall ? deltaCall : deltaPut;
    const theta = isCall ? thetaCall : thetaPut;

    return {
      d1,
      d2,
      price,
      delta,
      gamma,
      vega,
      theta,
      intrinsic: isCall ? Math.max(0, s - k) : Math.max(0, k - s),
      timeValue: Math.max(0, (isCall ? callPrice : putPrice) - (isCall ? Math.max(0, s - k) : Math.max(0, k - s)))
    };
  }, [s, k, maturity, rate, vol, isCall]);

  // Generate curves for SVG Graph plot: Stock price on X-axis vs Option value on Y-axis
  const graphPoints = useMemo(() => {
    const points = [];
    const minS = Math.max(10, k * 0.4);
    const maxS = k * 1.6;
    const count = 50;

    const t = Math.max(0.001, maturity);
    const sigma = Math.max(0.01, vol);

    for (let xS = minS; xS <= maxS; xS += (maxS - minS) / count) {
      const d1_x = (Math.log(xS / k) + (rate + 0.5 * sigma * sigma) * t) / (sigma * Math.sqrt(t));
      const d2_x = d1_x - sigma * Math.sqrt(t);

      let pOption = 0;
      if (isCall) {
        pOption = xS * normalCDF(d1_x) - k * Math.exp(-rate * t) * normalCDF(d2_x);
      } else {
        pOption = k * Math.exp(-rate * t) * normalCDF(-d2_x) - xS * normalCDF(-d1_x);
      }

      const pPayoff = isCall ? Math.max(0, xS - k) : Math.max(0, k - xS);

      points.push({ stock: xS, optionVal: pOption, payoffVal: pPayoff });
    }
    return points;
  }, [k, maturity, rate, vol, isCall]);

  const minS = Math.max(10, k * 0.4);
  const maxS = k * 1.6;
  const maxYPlot = isCall ? k * 0.8 : k * 0.6;

  // Coordinate transforms
  const getCoordinates = (stk: number, opt: number) => {
    const x = 50 + ((stk - minS) / (maxS - minS)) * 390;
    const y = 290 - (opt / maxYPlot) * 250;
    return { x, y };
  };

  const currentCoords = getCoordinates(s, bsmStats.price);

  // Build the option and payoff path
  let bsmPath = '';
  let payoffPath = '';

  graphPoints.forEach((pt, idx) => {
    const optC = getCoordinates(pt.stock, pt.optionVal);
    const payC = getCoordinates(pt.stock, pt.payoffVal);

    if (idx === 0) {
      bsmPath = `M ${optC.x} ${optC.y}`;
      payoffPath = `M ${payC.x} ${payC.y}`;
    } else {
      bsmPath += ` L ${optC.x} ${optC.y}`;
      payoffPath += ` L ${payC.x} ${payC.y}`;
    }
  });

  return (
    <div className="space-y-6">
      <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h3 className="font-sans font-semibold text-slate-800 text-lg">
            Option Premium & Sensitivity Lab (Greeks)
          </h3>
          {/* Call/Put Switcher */}
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setIsCall(true)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold uppercase font-sans transition-all cursor-pointer ${
                isCall ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
              id="btn-option-call"
            >
              Call Option
            </button>
            <button
              onClick={() => setIsCall(false)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold uppercase font-sans transition-all cursor-pointer ${
                !isCall ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'
              }`}
              id="btn-option-put"
            >
              Put Option
            </button>
          </div>
        </div>

        {/* Dynamic Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Stock Price */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 font-medium font-sans">Underlying Stock Price (S)</span>
              <span className="font-mono text-indigo-600 font-semibold">{formatCurrency(s)}</span>
            </div>
            <input
              type="range"
              min={k * 0.5}
              max={k * 1.5}
              step="1"
              value={s}
              onChange={(e) => setS(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              id="option-s-slider"
            />
            <div className="flex justify-between text-xs text-slate-400 font-mono">
              <span>${(k * 0.5).toFixed(0)}</span>
              <span>${(k * 1.5).toFixed(0)}</span>
            </div>
          </div>

          {/* Option Strike price option-k-slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 font-medium font-sans">Option Strike Price (K)</span>
              <span className="font-mono text-slate-800 font-semibold">{formatCurrency(k)}</span>
            </div>
            <input
              type="range"
              min="50"
              max="150"
              step="5"
              value={k}
              onChange={(e) => setK(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              id="option-k-slider"
            />
            <div className="flex justify-between text-xs text-slate-400 font-mono">
              <span>$50</span>
              <span>$150</span>
            </div>
          </div>

          {/* Time to Maturity */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 font-medium font-sans">Time to Expiration (T)</span>
              <span className="font-mono text-indigo-600 font-semibold">{maturity.toFixed(2)} Years ({Math.round(maturity * 365)} days)</span>
            </div>
            <input
              type="range"
              min="0.01"
              max="2.5"
              step="0.05"
              value={maturity}
              onChange={(e) => setMaturity(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              id="option-t-slider"
            />
            <div className="flex justify-between text-xs text-slate-400 font-mono">
              <span>4 Days</span>
              <span>2.5 Years</span>
            </div>
          </div>

          {/* Risk-free Rate */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 font-medium font-sans">Risk-Free Rate (r)</span>
              <span className="font-mono text-indigo-600 font-semibold">{formatPercent(rate)}</span>
            </div>
            <input
              type="range"
              min="0.01"
              max="0.15"
              step="0.005"
              value={rate}
              onChange={(e) => setRate(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              id="option-r-slider"
            />
            <div className="flex justify-between text-xs text-slate-400 font-mono">
              <span>1%</span>
              <span>15%</span>
            </div>
          </div>

          {/* Volatility */}
          <div className="space-y-2 col-span-1 md:col-span-2 lg:col-span-1">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 font-medium font-sans">Asset Volatility (σ - standard dev)</span>
              <span className="font-mono text-indigo-600 font-semibold">{formatPercent(vol)}</span>
            </div>
            <input
              type="range"
              min="0.05"
              max="1.0"
              step="0.05"
              value={vol}
              onChange={(e) => setVol(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              id="option-vol-slider"
            />
            <div className="flex justify-between text-xs text-slate-400 font-mono">
              <span>5%</span>
              <span>100%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* SVG Graph option curve vs stock */}
        <div className="lg:col-span-7 p-5 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col justify-between">
          <div>
            <h4 className="font-sans font-semibold text-slate-800 text-sm">Theoretical Pricing Curve vs Payoff</h4>
            <p className="text-xs text-slate-500 font-sans mt-0.5">
              Drag parameters and notice how the curve shifts close to the static payoff line as maturity shrinks or volatility drops.
            </p>
          </div>

          <div className="w-full aspect-[4/3] bg-slate-50 border border-slate-150 rounded-xl mt-4 relative p-1">
            <svg viewBox="0 0 450 310" className="w-full h-full overflow-visible font-sans">
              {/* Horizontal Return grid lines */}
              {[10, 20, 30, 40, 50, 60, 70, 80].map((yTick) => {
                if (yTick > maxYPlot) return null;
                const c = getCoordinates(minS, yTick);
                return (
                  <g key={yTick}>
                    <line x1="50" y1={c.y} x2="440" y2={c.y} stroke="#edf2f7" strokeWidth="1" strokeDasharray="3 3"/>
                    <text x="42" y={c.y + 3} fill="#64748b" fontSize="9" fontFamily="font-mono" textAnchor="end">
                      {formatCurrency(yTick)}
                    </text>
                  </g>
                );
              })}

              {/* Vertical Stock prices grid lines */}
              {Array.from({ length: 6 }).map((_, i) => {
                const sTick = minS + (i / 5) * (maxS - minS);
                const c = getCoordinates(sTick, 0);
                return (
                  <g key={i}>
                    <line x1={c.x} y1="10" x2={c.x} y2="290" stroke="#edf2f7" strokeWidth="1" strokeDasharray="3 3"/>
                    <text x={c.x} y="303" fill="#64748b" fontSize="9" fontFamily="font-mono" textAnchor="middle">
                      {formatCurrency(sTick)}
                    </text>
                  </g>
                );
              })}

              {/* Payoff line path at maturity (Dashed slate) */}
              <path d={payoffPath} stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />

              {/* Option pricing curved line */}
              <path d={bsmPath} stroke="#6366f1" strokeWidth="2.5" fill="none" />

              {/* Point of current valuation */}
              <circle cx={currentCoords.x} cy={currentCoords.y} r="5" fill="#4f46e5" stroke="#fff" strokeWidth="1.5" />

              {/* Line guides for current point */}
              <line x1="50" y1={currentCoords.y} x2={currentCoords.x} y2={currentCoords.y} stroke="#818cf8" strokeWidth="1" strokeDasharray="2 2" />
              <line x1={currentCoords.x} y1={currentCoords.y} x2={currentCoords.x} y2="290" stroke="#818cf8" strokeWidth="1" strokeDasharray="2 2" />

              {/* Axis labels */}
              <text x="245" y="306" fill="#475569" fontSize="10" fontWeight="600" textAnchor="middle">
                Underlying Stock Price (S)
              </text>
              <text x="14" y="150" fill="#475569" fontSize="10" fontWeight="600" textAnchor="middle" transform="rotate(-90 14 150)">
                Option Price Premium (V)
              </text>
            </svg>
          </div>

          <div className="flex items-center justify-center space-x-6 text-xs mt-3">
            <div className="flex items-center space-x-1.5">
              <div className="w-12 h-0.5 border-dashed border-slate-400" />
              <span>Payoff at Expiration T=0</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <div className="w-6 h-1 bg-indigo-500" />
              <span>BSM Premium Curve</span>
            </div>
          </div>
        </div>

        {/* Premium Breakdown & Live Greeks metrics */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 bg-slate-900 border border-slate-950 text-white rounded-2xl shadow-sm">
            <span className="text-slate-400 text-xs uppercase tracking-wider block">Theoretical Premium Price</span>
            <div className="text-3xl font-extrabold font-mono text-indigo-400 mt-1" id="option-premium-value-display">
              {formatCurrency(bsmStats.price)}
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-slate-800 text-xs">
              <div>
                <span className="text-slate-400">Intrinsic Value:</span>
                <span className="font-mono text-white block font-bold text-sm mt-0.5">{formatCurrency(bsmStats.intrinsic)}</span>
              </div>
              <div>
                <span className="text-slate-400">Time Decay Value:</span>
                <span className="font-mono text-white block font-bold text-sm mt-0.5">{formatCurrency(bsmStats.timeValue)}</span>
              </div>
            </div>
          </div>

          <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-slate-400 pl-1 mt-4">
            Analytical Option Sensitivity (The Greeks)
          </h4>

          {/* Greeks Table list */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-200">
            {/* Delta */}
            <div className="p-3.5 flex justify-between items-center bg-white">
              <div className="space-y-0.5">
                <div className="text-xs font-semibold text-slate-700 flex items-center">
                  <span>Delta (Δ)</span>
                  <span className="mx-2 text-slate-300 font-normal">|</span>
                  <span className="text-[10px] font-mono text-slate-400">Stock Price Sensitivity</span>
                </div>
                <div className="text-[10px] text-slate-500 font-sans">
                  The probability that the option will end up profitable. The option price moves by this amount for every $1 rise in stock price.
                </div>
              </div>
              <span className="font-mono text-slate-900 font-bold text-sm pl-2">
                {bsmStats.delta > 0 ? `+${bsmStats.delta.toFixed(4)}` : bsmStats.delta.toFixed(4)}
              </span>
            </div>

            {/* Vega */}
            <div className="p-3.5 flex justify-between items-center bg-white">
              <div className="space-y-0.5">
                <div className="text-xs font-semibold text-slate-700 flex items-center">
                  <span>Vega (v)</span>
                  <span className="mx-2 text-slate-300 font-normal">|</span>
                  <span className="text-[10px] font-mono text-slate-400">Volatility / Swing Sensitivity</span>
                </div>
                <div className="text-[10px] text-slate-500 font-sans">
                  How much premium price increases as underlying stock swings become more unpredictable and wild.
                </div>
              </div>
              <span className="font-mono text-slate-900 font-bold text-sm pl-2">
                {bsmStats.vega.toFixed(4)}
              </span>
            </div>

            {/* Theta */}
            <div className="p-3.5 flex justify-between items-center bg-white">
              <div className="space-y-0.5">
                <div className="text-xs font-semibold text-slate-700 flex items-center">
                  <span>Theta (Θ)</span>
                  <span className="mx-2 text-slate-300 font-normal">|</span>
                  <span className="text-[10px] font-mono text-slate-400">Time Decay (Rate of Loss)</span>
                </div>
                <div className="text-[10px] text-slate-500 font-sans">
                  The amount of premium lost each day purely from the calendar moving closer to the expiration date.
                </div>
              </div>
              <span className="font-mono text-red-600 font-bold text-sm pl-2">
                {/* Divide of year theta to represent standard daily decay */}
                {(bsmStats.theta / 365).toFixed(4)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
