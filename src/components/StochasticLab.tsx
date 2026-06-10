import React, { useState, useEffect, useRef } from 'react';
import { randomNormal, formatPercent, formatCurrency } from '../utils/mathUtils';

interface PathResult {
  pathId: number;
  prices: number[];
}

export const StochasticLab: React.FC = () => {
  const [s0, setS0] = useState<number>(100);
  const [drift, setDrift] = useState<number>(0.12); // Expected growth rate
  const [vol, setVol] = useState<number>(0.25); // Volatility (fluctuation size)
  const [days, setDays] = useState<number>(252); // Trading days (steps)
  const [numPaths, setNumPaths] = useState<number>(15);
  const [simulationResults, setSimulationResults] = useState<PathResult[]>([]);
  const [triggerSim, setTriggerSim] = useState<number>(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Generate paths using multi-sided "coin flip" random walks
  // Each day, the stock price compounds by a random percentage:
  // S_t = S_{t-1} * (1 + daily_drift + daily_volatility * random_factor)
  useEffect(() => {
    const dt = 1 / 252; // Trade-year time fraction
    const newPaths: PathResult[] = [];

    for (let p = 0; p < numPaths; p++) {
      const prices: number[] = [s0];
      let currentPrice = s0;

      for (let d = 1; d <= days; d++) {
        const randomFactor = randomNormal(); // Daily coin flip swing multiplier
        const dailyReturn = drift * dt + vol * randomFactor * Math.sqrt(dt);
        currentPrice = currentPrice * (1 + dailyReturn);
        // Ensure price stays above zero
        prices.push(Math.max(0.01, currentPrice));
      }

      newPaths.push({ pathId: p, prices });
    }

    setSimulationResults(newPaths);
  }, [s0, drift, vol, days, numPaths, triggerSim]);

  // Draw the coin-flick path visualisations with math overlays on Canvas
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
    const padRight = 50;
    const padTop = 30;
    const padBottom = 40;

    const graphWidth = width - padLeft - padRight;
    const graphHeight = height - padTop - padBottom;

    // Estimate typical upper and lower boundaries (algebraic approximation of 95% range)
    const totalT = days / 252;
    const typicalMax = s0 * Math.pow(1 + drift * (1/252) + 1.96 * vol * Math.sqrt(1/252), days);
    const typicalMin = s0 * Math.pow(1 + drift * (1/252) - 1.96 * vol * Math.sqrt(1/252), days);

    let maxPriceInSim = s0;
    let minPriceInSim = s0;

    simulationResults.forEach(p => {
      p.prices.forEach(pr => {
        if (pr > maxPriceInSim) maxPriceInSim = pr;
        if (pr < minPriceInSim) minPriceInSim = pr;
      });
    });

    const maxVal = Math.max(maxPriceInSim, typicalMax) * 1.1;
    const minVal = Math.max(0.01, Math.min(minPriceInSim, typicalMin) * 0.9);

    const getX = (stepIndex: number) => padLeft + (stepIndex / days) * graphWidth;
    const getY = (priceValue: number) => {
      const pct = (priceValue - minVal) / (maxVal - minVal);
      return padTop + (1 - pct) * graphHeight;
    };

    // Draw grid horizontal price lines
    const yTickCount = 6;
    ctx.strokeStyle = '#f1f5f9';
    ctx.lineWidth = 1;
    ctx.font = '10px font-mono, ui-monospace, sans-serif';
    ctx.fillStyle = '#64748b';
    ctx.textAlign = 'right';

    for (let i = 0; i < yTickCount; i++) {
      const priceTick = minVal + (i / (yTickCount - 1)) * (maxVal - minVal);
      const yCoord = getY(priceTick);

      ctx.beginPath();
      ctx.setLineDash([5, 5]);
      ctx.moveTo(padLeft, yCoord);
      ctx.lineTo(width - padRight, yCoord);
      ctx.stroke();

      ctx.fillText(formatCurrency(priceTick), padLeft - 8, yCoord + 3);
    }

    // Draw grid vertical days lines
    const xTickCount = 5;
    ctx.textAlign = 'center';
    for (let i = 0; i < xTickCount; i++) {
      const stepTick = Math.round((i / (xTickCount - 1)) * days);
      const xCoord = getX(stepTick);

      ctx.beginPath();
      ctx.setLineDash([5, 5]);
      ctx.moveTo(xCoord, padTop);
      ctx.lineTo(xCoord, height - padBottom);
      ctx.stroke();

      ctx.fillText(`Day ${stepTick}`, xCoord, height - padBottom + 15);
    }
    ctx.setLineDash([]);

    // Draw 95% Confidence Shaded Channel (Algebraic compounding boundary)
    ctx.fillStyle = 'rgba(239, 246, 255, 0.80)';
    ctx.beginPath();
    ctx.moveTo(getX(0), getY(s0));
    for (let d = 1; d <= days; d++) {
      const t = d / 252;
      const uApprox = s0 * Math.exp((drift - 0.5 * vol * vol) * t + 1.96 * vol * Math.sqrt(t));
      ctx.lineTo(getX(d), getY(uApprox));
    }
    for (let d = days; d >= 1; d--) {
      const t = d / 252;
      const lApprox = s0 * Math.exp((drift - 0.5 * vol * vol) * t - 1.96 * vol * Math.sqrt(t));
      ctx.lineTo(getX(d), getY(Math.max(0.01, lApprox)));
    }
    ctx.closePath();
    ctx.fill();

    // Outline bounds (Dashed gray)
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1;
    ctx.setLineDash([2, 4]);
    ctx.beginPath();
    ctx.moveTo(getX(0), getY(s0));
    for (let d = 1; d <= days; d++) {
      const t = d / 252;
      const uApprox = s0 * Math.exp((drift - 0.5 * vol * vol) * t + 1.96 * vol * Math.sqrt(t));
      ctx.lineTo(getX(d), getY(uApprox));
    }
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(getX(0), getY(s0));
    for (let d = 1; d <= days; d++) {
      const t = d / 252;
      const lApprox = s0 * Math.exp((drift - 0.5 * vol * vol) * t - 1.96 * vol * Math.sqrt(t));
      ctx.lineTo(getX(d), getY(Math.max(0.01, lApprox)));
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw Simulated Walk Lines
    simulationResults.forEach(path => {
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.35)'; // Light indigo paths
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(getX(0), getY(path.prices[0]));

      for (let d = 1; d <= days; d++) {
        ctx.lineTo(getX(d), getY(path.prices[d]));
      }
      ctx.stroke();
    });

    // Draw Theoretical Exponential Expected Path (Solid Blue)
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(getX(0), getY(s0));
    for (let d = 1; d <= days; d++) {
      const t = d / 252;
      const expectedS = s0 * Math.pow(1 + drift * (1/252), d);
      ctx.lineTo(getX(d), getY(expectedS));
    }
    ctx.stroke();

    // Draw Volatility-Dragg Typical (Median) Path (Solid Pink)
    ctx.strokeStyle = '#db2777';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(getX(0), getY(s0));
    for (let d = 1; d <= days; d++) {
      const t = d / 252;
      const medianS = s0 * Math.pow(1 + (drift - 0.5 * vol * vol) * (1/252), d);
      ctx.lineTo(getX(d), getY(medianS));
    }
    ctx.stroke();

    // Draw boundaries
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(padLeft, padTop);
    ctx.lineTo(padLeft, height - padBottom);
    ctx.lineTo(width - padRight, height - padBottom);
    ctx.stroke();
  }, [simulationResults, drift, vol, days, s0]);

  // Aggregate stats on simulated results
  const endingPrices = simulationResults.map(p => p.prices[p.prices.length - 1]);
  const avgEnding = endingPrices.reduce((acc, v) => acc + v, 0) / (endingPrices.length || 1);
  const minEnding = Math.min(...endingPrices);
  const maxEnding = Math.max(...endingPrices);

  // Analytical expectations
  const maxTime = days / 252;
  const theoreticalExpectation = s0 * Math.pow(1 + drift * (1/252), days);
  const theoreticalTypical = s0 * Math.pow(1 + (drift - 0.5 * vol * vol) * (1/252), days);
  const volDragPercentage = (theoreticalTypical - s0) / s0;

  return (
    <div className="space-y-6">
      <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-6">
        <h3 className="font-sans font-semibold text-slate-800 text-lg flex items-center justify-between">
          <span>Random Walk Simulation Controls</span>
          <button
            onClick={() => setTriggerSim(p => p + 1)}
            className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-mono font-bold rounded-lg transition-colors shadow-sm cursor-pointer"
            id="btn-trigger-stochastic-sim"
          >
            Re-Simulate (Flip Different Coins)
          </button>
        </h3>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Starting Price */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 font-medium font-sans">Starting Stock Price (S₀)</span>
              <span className="font-mono text-indigo-600 font-semibold">{formatCurrency(s0)}</span>
            </div>
            <input
              type="range"
              min="10"
              max="300"
              step="5"
              value={s0}
              onChange={(e) => setS0(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              id="slider-start-price"
            />
            <div className="flex justify-between text-xs text-slate-400 font-mono">
              <span>$10</span>
              <span>$300</span>
            </div>
          </div>

          {/* Expected Return */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 font-medium font-sans">Annual Trend Rate (μ - Drift)</span>
              <span className="font-mono text-indigo-600 font-semibold">{formatPercent(drift)}</span>
            </div>
            <input
              type="range"
              min="-0.2"
              max="0.5"
              step="0.01"
              value={drift}
              onChange={(e) => setDrift(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
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
              <span className="text-slate-500 font-medium font-sans">Daily Swing Size (σ - Volatility)</span>
              <span className="font-mono text-indigo-600 font-semibold">{formatPercent(vol)}</span>
            </div>
            <input
              type="range"
              min="0.02"
              max="1.0"
              step="0.01"
              value={vol}
              onChange={(e) => setVol(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              id="slider-volability"
            />
            <div className="flex justify-between text-xs text-slate-400 font-mono">
              <span>2% (Steady)</span>
              <span>100% (Wild Swings)</span>
            </div>
          </div>

          {/* Steps / Days */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 font-medium font-sans">Compounding Days (Steps)</span>
              <span className="font-mono text-indigo-600 font-semibold">{days} Steps</span>
            </div>
            <input
              type="range"
              min="30"
              max="365"
              step="5"
              value={days}
              onChange={(e) => setDays(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              id="slider-days"
            />
            <div className="flex justify-between text-xs text-slate-400 font-mono">
              <span>30 Days</span>
              <span>365 Days</span>
            </div>
          </div>

          {/* Path count */}
          <div className="space-y-2 col-span-1 md:col-span-2 lg:col-span-1">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 font-medium font-sans">Number of Stock Paths</span>
              <span className="font-mono text-indigo-600 font-semibold">{numPaths} Paths</span>
            </div>
            <input
              type="range"
              min="3"
              max="40"
              step="1"
              value={numPaths}
              onChange={(e) => setNumPaths(parseInt(e.target.value))}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              id="slider-numpaths"
            />
            <div className="flex justify-between text-xs text-slate-400 font-mono">
              <span>3 Paths</span>
              <span>40 Paths</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Canvas Display */}
        <div className="lg:col-span-8 p-5 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-sans font-semibold text-slate-800 text-sm">Coin-Flip Stock Price Simulator</h4>
              <p className="text-xs text-slate-500 font-sans mt-0.5">
                Each line shows a different simulated coin-flip pathway. The shaded blue zone shows the normal probability bounds.
              </p>
            </div>
            <div className="flex gap-4 text-xs font-sans font-medium text-slate-600">
              <div className="flex items-center gap-1">
                <span className="inline-block w-3 h-0.5 bg-[#2563eb]" />
                <span>Expected Path (Average)</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="inline-block w-3 h-0.5 bg-[#db2777]" />
                <span>Typical Path (With Drag)</span>
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

          <div className="flex items-center justify-center space-x-6 text-[11px] mt-4 text-slate-500 font-sans">
            <div className="flex items-center space-x-1.5">
              <div className="w-12 h-4 bg-blue-50 border border-dotted border-slate-300 rounded" />
              <span>Normal Compounding Range of Random Daily Returns</span>
            </div>
          </div>
        </div>

        {/* Statistical Panel */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-5 bg-slate-900 border border-slate-950 text-white rounded-2xl shadow-sm">
            <h4 className="font-sans text-xs uppercase tracking-wider text-slate-400">Random Walk Mathematics</h4>
            <div className="space-y-4 mt-4 font-sans text-sm">
              <div className="border-b border-slate-800 pb-3">
                <span className="text-slate-400 text-xs">Mathematical Expected Ending Price:</span>
                <div className="text-xl font-bold font-mono text-blue-400 mt-0.5">
                  {formatCurrency(theoreticalExpectation)}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">Formula: S_T = S_0 * (1 + daily_drift)ᵀ</div>
              </div>

              <div className="border-b border-slate-800 pb-3">
                <span className="text-slate-400 text-xs">Typical Path (Median) Ending Price:</span>
                <div className="text-xl font-bold font-mono text-pink-400 mt-0.5">
                  {formatCurrency(theoreticalTypical)}
                </div>
                <div className="text-[10px] text-slate-500 mt-0.5">
                  With Volatility drag: e.g., daily drift reduces by (volatility² / 2) &nbsp;
                  <span className="text-red-400 font-semibold">({formatPercent(theoreticalTypical/theoreticalExpectation - 1)} Volatility Drag)</span>
                </div>
              </div>

              <div>
                <span className="text-slate-400 text-xs">Monte Carlo Interactive Trials:</span>
                <div className="mt-2 grid grid-cols-2 gap-4 text-xs font-mono">
                  <div className="bg-slate-800/50 p-2 rounded border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Sim. Average:</span>
                    <span className="text-white font-bold text-sm block mt-0.5">{formatCurrency(avgEnding)}</span>
                  </div>
                  <div className="bg-slate-800/50 p-2 rounded border border-slate-800">
                    <span className="text-slate-400 block text-[10px]">Sim. Max:</span>
                    <span className="text-white font-bold text-sm block mt-0.5 text-green-400">{formatCurrency(maxEnding)}</span>
                  </div>
                  <div className="bg-slate-800/50 p-2 rounded border border-slate-800 col-span-2">
                    <span className="text-slate-400 block text-[10px]">Sim. Min:</span>
                    <span className="text-white font-bold text-sm block mt-0.5 text-amber-500">{formatCurrency(minEnding)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-5 bg-indigo-50 border border-indigo-100 rounded-2xl shadow-sm text-slate-705">
            <h4 className="font-sans font-semibold text-slate-800 text-xs mb-2">High School Math Deep Dive</h4>
            <div className="space-y-2 font-sans text-[11px] text-slate-600 leading-relaxed">
              <p>
                <span className="font-semibold text-slate-800">Skewed Distribution:</span> Stock prices cannot fall below $0 but can theoretically grow to infinity. A few extremely lucky paths pull the simulated average (expected path) far above the typical path!
              </p>
              <p>
                <span className="font-semibold text-slate-800">Volatility Drag:</span> Wild ups and downs drag down compound growth. If you make +10% one day and -10% the next, you don't break even — you end up with 99% of your money. More volatility means a higher drag on your actual wealth.
              </p>
              <p className="font-semibold text-indigo-700 font-mono text-[9px] bg-indigo-100 px-2 py-1 rounded inline-block">
                Drag component subtraction = {(vol * vol / 2 * 100).toFixed(2)}% per year
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
