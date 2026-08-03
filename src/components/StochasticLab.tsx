import React, { useState, useEffect, useRef } from 'react';
import { randomNormal, formatPercent, formatCurrency } from '../utils/mathUtils';

interface PathResult {
  pathId: number;
  prices: number[];
}

export const StochasticLab: React.FC = () => {
  const s0 = 100; // Fixed starting stock price
  const numPaths = 25; // Fixed 25 simulation paths
  const [drift, setDrift] = useState<number>(0.12); // Expected annual growth rate
  const [vol, setVol] = useState<number>(0.25); // Annual volatility (swing size)
  const [months, setMonths] = useState<number>(24); // Compounding months (up to 60)
  const [simulationResults, setSimulationResults] = useState<PathResult[]>([]);
  const [triggerSim, setTriggerSim] = useState<number>(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Generate paths using monthly random walks
  // Each month, the stock price compounds by a random percentage:
  // S_t = S_{t-1} * (1 + monthly_drift + monthly_volatility * random_factor)
  useEffect(() => {
    const dt = 1 / 12; // Monthly time fraction (12 months = 1 year)
    const newPaths: PathResult[] = [];

    for (let p = 0; p < numPaths; p++) {
      const prices: number[] = [s0];
      let currentPrice = s0;

      for (let m = 1; m <= months; m++) {
        const randomFactor = randomNormal(); // Monthly random swing multiplier
        const monthlyReturn = drift * dt + vol * randomFactor * Math.sqrt(dt);
        currentPrice = currentPrice * (1 + monthlyReturn);
        // Ensure price stays above zero
        prices.push(Math.max(0.01, currentPrice));
      }

      newPaths.push({ pathId: p, prices });
    }

    setSimulationResults(newPaths);
  }, [s0, drift, vol, months, numPaths, triggerSim]);

  // Draw the coin-flip path visualisations with math overlays on Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || simulationResults.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear background
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    const padLeft = 60;
    const padRight = 60;
    const padTop = 30;
    const padBottom = 40;

    const graphWidth = width - padLeft - padRight;
    const graphHeight = height - padTop - padBottom;

    let maxPriceInSim = s0;
    let minPriceInSim = s0;

    simulationResults.forEach(p => {
      p.prices.forEach(pr => {
        if (pr > maxPriceInSim) maxPriceInSim = pr;
        if (pr < minPriceInSim) minPriceInSim = pr;
      });
    });

    const maxVal = Math.max(s0 * 1.05, maxPriceInSim * 1.08);
    const minVal = Math.max(0.01, Math.min(s0 * 0.95, minPriceInSim * 0.92));

    const getX = (stepIndex: number) => padLeft + (stepIndex / months) * graphWidth;
    const getY = (priceValue: number) => {
      const pct = (priceValue - minVal) / (maxVal - minVal);
      return padTop + (1 - pct) * graphHeight;
    };

    // Draw grid horizontal price lines with dual vertical axis (left & right)
    const yTickCount = 6;
    ctx.strokeStyle = '#f1f5f9';
    ctx.lineWidth = 1;
    ctx.font = '10px font-mono, ui-monospace, sans-serif';
    ctx.fillStyle = '#64748b';

    for (let i = 0; i < yTickCount; i++) {
      const priceTick = minVal + (i / (yTickCount - 1)) * (maxVal - minVal);
      const yCoord = getY(priceTick);

      ctx.beginPath();
      ctx.setLineDash([5, 5]);
      ctx.moveTo(padLeft, yCoord);
      ctx.lineTo(width - padRight, yCoord);
      ctx.stroke();

      // Left vertical axis label
      ctx.textAlign = 'right';
      ctx.fillText(formatCurrency(priceTick), padLeft - 8, yCoord + 3);

      // Right vertical axis label (duplicated)
      ctx.textAlign = 'left';
      ctx.fillText(formatCurrency(priceTick), width - padRight + 8, yCoord + 3);
    }

    // Draw grid vertical months lines
    const xTickCount = Math.min(6, months + 1);
    ctx.textAlign = 'center';
    for (let i = 0; i < xTickCount; i++) {
      const stepTick = Math.round((i / (xTickCount - 1)) * months);
      const xCoord = getX(stepTick);

      ctx.beginPath();
      ctx.setLineDash([5, 5]);
      ctx.moveTo(xCoord, padTop);
      ctx.lineTo(xCoord, height - padBottom);
      ctx.stroke();

      ctx.fillText(`Month ${stepTick}`, xCoord, height - padBottom + 15);
    }
    ctx.setLineDash([]);

    // Draw S0 starting price reference baseline (indigo dashed line)
    const s0Y = getY(s0);
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(padLeft, s0Y);
    ctx.lineTo(width - padRight, s0Y);
    ctx.stroke();

    ctx.fillStyle = '#4f46e5';
    ctx.font = 'bold 10px font-mono, ui-monospace, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`S₀ Baseline (${formatCurrency(s0)})`, padLeft + 6, s0Y - 4);
    ctx.setLineDash([]);

    // Draw Simulated Walk Lines (Green for gain >= S0, Red for loss < S0)
    simulationResults.forEach(path => {
      const finalPrice = path.prices[path.prices.length - 1];
      const isPositive = finalPrice >= s0;

      ctx.strokeStyle = isPositive
        ? 'rgba(16, 185, 129, 0.65)' // Emerald green for profit
        : 'rgba(239, 68, 68, 0.65)';  // Rose red for loss
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.moveTo(getX(0), getY(path.prices[0]));

      for (let m = 1; m <= months; m++) {
        ctx.lineTo(getX(m), getY(path.prices[m]));
      }
      ctx.stroke();
    });

    // Draw canvas outer boundaries
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(padLeft, padTop);
    ctx.lineTo(padLeft, height - padBottom);
    ctx.lineTo(width - padRight, height - padBottom);
    ctx.lineTo(width - padRight, padTop);
    ctx.stroke();
  }, [simulationResults, drift, vol, months, s0]);

  // Aggregate stats on simulated results
  const endingPrices = simulationResults.map(p => p.prices[p.prices.length - 1]);
  const avgEnding = endingPrices.reduce((acc, v) => acc + v, 0) / (endingPrices.length || 1);
  const minEnding = Math.min(...endingPrices);
  const maxEnding = Math.max(...endingPrices);

  return (
    <div className="space-y-6">
      <div className="p-5 bg-white border border-purple-200 rounded-2xl shadow-sm space-y-6">
        <h3 className="font-sans font-semibold text-slate-800 text-lg flex items-center justify-between">
          <span>Random Walk Simulation Controls</span>
          <button
            onClick={() => setTriggerSim(p => p + 1)}
            className="px-4 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-mono font-bold rounded-lg transition-colors shadow-sm cursor-pointer"
            id="btn-trigger-stochastic-sim"
          >
            Re-Simulate (Flip Different Coins)
          </button>
        </h3>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Expected Return */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 font-medium font-sans">Annual Trend Rate (Drift)</span>
              <span className="font-mono text-purple-700 font-semibold">{formatPercent(drift)}</span>
            </div>
            <input
              type="range"
              min="-0.2"
              max="0.5"
              step="0.01"
              value={drift}
              onChange={(e) => setDrift(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-purple-600"
              id="slider-drift"
            />
            <div className="flex justify-between text-xs text-slate-400 font-mono">
              <span>-20%</span>
              <span>+50%</span>
            </div>
          </div>

          {/* Volatility */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 font-medium font-sans">Annual Swing Size (Volatility)</span>
              <span className="font-mono text-purple-700 font-semibold">{formatPercent(vol)}</span>
            </div>
            <input
              type="range"
              min="0.02"
              max="1.0"
              step="0.01"
              value={vol}
              onChange={(e) => setVol(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-purple-600"
              id="slider-volatility"
            />
            <div className="flex justify-between text-xs text-slate-400 font-mono">
              <span>2% (Steady)</span>
              <span>100% (Wild Swings)</span>
            </div>
          </div>

          {/* Compounding Months (Steps) */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 font-medium font-sans">Compounding Months</span>
              <span className="font-mono text-purple-700 font-semibold">{months} Months</span>
            </div>
            <input
              type="range"
              min="1"
              max="60"
              step="1"
              value={months}
              onChange={(e) => setMonths(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-purple-600"
              id="slider-months"
            />
            <div className="flex justify-between text-xs text-slate-400 font-mono">
              <span>1 Month</span>
              <span>60 Months (5 Yrs)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chart & Monte Carlo Simulation Results */}
      <div className="p-5 bg-white border border-purple-200 rounded-2xl shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h4 className="font-sans font-semibold text-slate-800 text-sm">Coin-Flip Stock Price Simulator</h4>
            <p className="text-xs text-slate-500 font-sans mt-0.5">
              Each line shows a different simulated pathway over {months} monthly compounding steps.
            </p>
          </div>
          <div className="flex items-center gap-2.5 text-xs font-sans font-medium">
            <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
              <span className="inline-block w-2.5 h-2.5 bg-emerald-500 rounded-full" />
              <span>Gain (≥ S₀)</span>
            </div>
            <div className="flex items-center gap-1.5 text-rose-700 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-100">
              <span className="inline-block w-2.5 h-2.5 bg-rose-500 rounded-full" />
              <span>Loss (&lt; S₀)</span>
            </div>
            <div className="flex items-center gap-1.5 text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-100">
              <span className="inline-block w-3 h-0.5 bg-indigo-500 rounded" />
              <span>{numPaths} Paths</span>
            </div>
          </div>
        </div>

        <div className="relative border border-slate-100 rounded-xl overflow-hidden bg-slate-50 flex items-center justify-center">
          <canvas
            ref={canvasRef}
            width={750}
            height={360}
            className="w-full h-auto bg-white"
            id="canvas-stochastic-paths"
          />
        </div>

        {/* 3 Simulation Results Cards directly below the chart */}
        <div className="pt-2 border-t border-purple-100 space-y-3">
          <h4 className="font-sans text-xs uppercase tracking-wider text-slate-500 font-bold">
            Monte Carlo Simulation Results ({numPaths} Trials over {months} Months)
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-sans">
            <div className="p-4 bg-slate-900 border border-slate-950 text-white rounded-xl shadow-sm">
              <span className="text-slate-400 text-xs font-medium block">Simulated Average Ending Price</span>
              <div className="text-2xl font-bold font-mono text-purple-300 mt-1">
                {formatCurrency(avgEnding)}
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Average return: <span className="font-mono text-purple-200 font-semibold">{formatPercent((avgEnding - s0) / s0)}</span>
              </div>
            </div>

            <div className="p-4 bg-slate-900 border border-slate-950 text-white rounded-xl shadow-sm">
              <span className="text-slate-400 text-xs font-medium block">Simulated Maximum</span>
              <div className="text-2xl font-bold font-mono text-emerald-400 mt-1">
                {formatCurrency(maxEnding)}
              </div>
              <div className="text-xs text-emerald-400/80 mt-1">
                Max return: <span className="font-mono font-semibold">{formatPercent((maxEnding - s0) / s0)}</span>
              </div>
            </div>

            <div className="p-4 bg-slate-900 border border-slate-950 text-white rounded-xl shadow-sm">
              <span className="text-slate-400 text-xs font-medium block">Simulated Minimum</span>
              <div className="text-2xl font-bold font-mono text-amber-400 mt-1">
                {formatCurrency(minEnding)}
              </div>
              <div className="text-xs text-amber-400/80 mt-1">
                Min return: <span className="font-mono font-semibold">{formatPercent((minEnding - s0) / s0)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
