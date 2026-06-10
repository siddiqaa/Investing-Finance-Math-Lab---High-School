import React, { useState, useMemo } from 'react';
import { formatPercent } from '../utils/mathUtils';

// Asset constants
const ASSETS = [
  { id: 1, name: 'Tech Aggressive', return: 0.16, vol: 0.30, beta: 1.45, color: '#f59e0b' },
  { id: 2, name: 'Utility Defensive', return: 0.07, vol: 0.11, beta: 0.45, color: '#10b981' },
  { id: 3, name: 'Alternatives / Gold', return: 0.04, vol: 0.08, beta: 0.05, color: '#3b82f6' }
];

const RF_RATE = 0.035; // 3.5% risk-free rate

export const PortfolioLab: React.FC = () => {
  // Budget weight sliders: starts at roughly equal weights (sum to 1)
  const [w1, setW1] = useState<number>(0.33);
  const [w2, setW2] = useState<number>(0.33);
  const [w3, setW3] = useState<number>(0.34);

  // Correlation slider ρ₁₂ between Tech and Utility
  const [rho12, setRho12] = useState<number>(0.10);

  // Normalization logic: adjust weights when one slider is modified
  const handleWeightChange = (changedIndex: number, newValue: number) => {
    const newVal = Math.min(1.0, Math.max(0.0, newValue));

    if (changedIndex === 1) {
      setW1(newVal);
      const remaining = 1.0 - newVal;
      if (remaining === 0) {
        setW2(0);
        setW3(0);
      } else {
        const sumOthers = w2 + w3 || 1;
        setW2((w2 / sumOthers) * remaining);
        setW3((w3 / sumOthers) * remaining);
      }
    } else if (changedIndex === 2) {
      setW2(newVal);
      const remaining = 1.0 - newVal;
      if (remaining === 0) {
        setW1(0);
        setW3(0);
      } else {
        const sumOthers = w1 + w3 || 1;
        setW1((w1 / sumOthers) * remaining);
        setW3((w3 / sumOthers) * remaining);
      }
    } else {
      setW3(newVal);
      const remaining = 1.0 - newVal;
      if (remaining === 0) {
        setW1(0);
        setW2(0);
      } else {
        const sumOthers = w1 + w2 || 1;
        setW1((w1 / sumOthers) * remaining);
        setW2((w2 / sumOthers) * remaining);
      }
    }
  };

  // Fixed correlations
  const rho13 = 0.15; // Tech and Gold
  const rho23 = -0.10; // Utilities and Gold (inflation hedge)

  // Calculate Covariance Matrix Σ
  const covMatrix = useMemo(() => {
    const s1 = ASSETS[0].vol;
    const s2 = ASSETS[1].vol;
    const s3 = ASSETS[2].vol;

    return {
      cov11: s1 * s1,
      cov22: s2 * s2,
      cov33: s3 * s3,
      cov12: rho12 * s1 * s2,
      cov13: rho13 * s1 * s3,
      cov23: rho23 * s2 * s3
    };
  }, [rho12]);

  // Calculate selected portfolio return and risk
  const portfolioReturn = w1 * ASSETS[0].return + w2 * ASSETS[1].return + w3 * ASSETS[2].return;

  const portfolioVariance =
    w1 * w1 * covMatrix.cov11 +
    w2 * w2 * covMatrix.cov22 +
    w3 * w3 * covMatrix.cov33 +
    2 * w1 * w2 * covMatrix.cov12 +
    2 * w1 * w3 * covMatrix.cov13 +
    2 * w2 * w3 * covMatrix.cov23;

  const portfolioRisk = Math.sqrt(portfolioVariance);
  const sharpeRatio = portfolioRisk > 0 ? (portfolioReturn - RF_RATE) / portfolioRisk : 0;
  const portfolioBeta = w1 * ASSETS[0].beta + w2 * ASSETS[1].beta + w3 * ASSETS[2].beta;

  // Generate 400 random portfolio dots to chart the Markowitz Bullet
  const bulletPoints = useMemo(() => {
    const dots = [];

    for (let i = 0; i < 400; i++) {
      // Simulating standard uniform Dirichlet weights
      const r1 = Math.random();
      const r2 = Math.random();
      const r3 = Math.random();
      const sum = r1 + r2 + r3;
      const x1 = r1 / sum;
      const x2 = r2 / sum;
      const x3 = r3 / sum;

      const ret = x1 * ASSETS[0].return + x2 * ASSETS[1].return + x3 * ASSETS[2].return;
      const variance =
        x1 * x1 * covMatrix.cov11 +
        x2 * x2 * covMatrix.cov22 +
        x3 * x3 * covMatrix.cov33 +
        2 * x1 * x2 * covMatrix.cov12 +
        2 * x1 * x3 * covMatrix.cov13 +
        2 * x2 * x3 * covMatrix.cov23;
      const risk = Math.sqrt(variance);

      dots.push({ risk, return: ret });
    }
    return dots;
  }, [covMatrix]);

  // Coordinates limits for responsive SVG plotting
  const minRiskPlot = 0.04;
  const maxRiskPlot = 0.35;
  const minRetPlot = 0.02;
  const maxRetPlot = 0.20;

  // Convert stats to actual pixel coordinates
  const getSvgCoordinates = (risk: number, ret: number) => {
    const x = 50 + ((risk - minRiskPlot) / (maxRiskPlot - minRiskPlot)) * 400;
    const y = 310 - ((ret - minRetPlot) / (maxRetPlot - minRetPlot)) * 260;
    return { x, y };
  };

  const userPortfolioCoords = getSvgCoordinates(portfolioRisk, portfolioReturn);

  return (
    <div className="space-y-6">
      <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-6">
        <h3 className="font-sans font-semibold text-slate-800 text-lg">
          Asset Management & Correlation Lab
        </h3>

        {/* 2 Grid split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sliders Area */}
          <div className="lg:col-span-5 space-y-6">
            <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-slate-400">
              Portfolio Weight Allocation (Must sum to 100%)
            </h4>

            {/* Asset 1 Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 font-medium font-sans flex items-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 mr-2" />
                  {ASSETS[0].name}
                </span>
                <span className="font-mono text-amber-600 font-bold">{formatPercent(w1)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1.0"
                step="0.01"
                value={w1}
                onChange={(e) => handleWeightChange(1, parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-amber-500"
                id="weight-slider-tech"
              />
            </div>

            {/* Asset 2 Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 font-medium font-sans flex items-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mr-2" />
                  {ASSETS[1].name}
                </span>
                <span className="font-mono text-emerald-600 font-bold">{formatPercent(w2)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1.0"
                step="0.01"
                value={w2}
                onChange={(e) => handleWeightChange(2, parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                id="weight-slider-utility"
              />
            </div>

            {/* Asset 3 Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 font-medium font-sans flex items-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 mr-2" />
                  {ASSETS[2].name}
                </span>
                <span className="font-mono text-blue-600 font-bold">{formatPercent(w3)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="1.0"
                step="0.01"
                value={w3}
                onChange={(e) => handleWeightChange(3, parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-500"
                id="weight-slider-gold"
              />
            </div>

            {/* Correlation rho12 slider */}
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 font-semibold font-sans flex items-center">
                  <span>Correlation (ρ₁₂) Tech & Utility</span>
                </span>
                <span className="font-mono text-indigo-600 font-bold">
                  {rho12 > 0 ? `+${rho12.toFixed(2)}` : rho12.toFixed(2)}
                </span>
              </div>
              <input
                type="range"
                min="-0.95"
                max="0.95"
                step="0.05"
                value={rho12}
                onChange={(e) => setRho12(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                id="slider-correlation"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>Highly Diversified (-0.95)</span>
                <span>Uncorrelated (0)</span>
                <span>Moving Together (0.95)</span>
              </div>
            </div>
          </div>

          {/* SVG Markowitz bullet */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-slate-400 mb-4 text-center">
              The Markowitz Bullet & Efficient Frontier (Risk-Return Coordinates)
            </h4>

            {/* Interactive SVG graph */}
            <div className="w-full max-w-[480px] aspect-[4/3] bg-slate-50 border border-slate-150 rounded-2xl p-2 relative">
              <svg viewBox="0 0 480 340" className="w-full h-full overflow-visible">
                {/* Horizontal Grid lines (Return) */}
                {[0.04, 0.08, 0.12, 0.16, 0.20].map((tVal) => {
                  const coords = getSvgCoordinates(minRiskPlot, tVal);
                  return (
                    <g key={tVal}>
                      <line
                        x1="50"
                        y1={coords.y}
                        x2="450"
                        y2={coords.y}
                        stroke="#e2e8f0"
                        strokeWidth="1"
                        strokeDasharray="4 4"
                      />
                      <text
                        x="42"
                        y={coords.y + 4}
                        fill="#64748b"
                        fontSize="10"
                        fontFamily="font-mono, monospace"
                        textAnchor="end"
                      >
                        {formatPercent(tVal)}
                      </text>
                    </g>
                  );
                })}

                {/* Vertical Grid lines (Risk/Volatility) */}
                {[0.05, 0.10, 0.15, 0.20, 0.25, 0.30, 0.35].map((rVal) => {
                  const coords = getSvgCoordinates(rVal, minRetPlot);
                  return (
                    <g key={rVal}>
                      <line
                        x1={coords.x}
                        y1="10"
                        x2={coords.x}
                        y2="310"
                        stroke="#e2e8f0"
                        strokeWidth="1"
                        strokeDasharray="4 4"
                      />
                      <text
                        x={coords.x}
                        y="324"
                        fill="#64748b"
                        fontSize="10"
                        fontFamily="font-mono, monospace"
                        textAnchor="middle"
                      >
                        {formatPercent(rVal)}
                      </text>
                    </g>
                  );
                })}

                {/* Axis Titles */}
                <text x="250" y="338" fill="#475569" fontSize="11" fontFamily="sans-serif" fontWeight="600" textAnchor="middle">
                  Volatility / Portfolio Risk (σ_p)
                </text>
                <text x="14" y="160" fill="#475569" fontSize="11" fontFamily="sans-serif" fontWeight="600" textAnchor="middle" transform="rotate(-90 14 160)">
                  Expected Return (E[R])
                </text>

                {/* Markowitz Feasible Portfolio Region (Random Bullet Dots) */}
                {bulletPoints.map((pt, idx) => {
                  const coords = getSvgCoordinates(pt.risk, pt.return);
                  return (
                    <circle
                      key={idx}
                      cx={coords.x}
                      cy={coords.y}
                      r="1.8"
                      fill="#94a3b8"
                      opacity="0.45"
                    />
                  );
                })}

                {/* Draw Individual Asset markers */}
                {ASSETS.map((asset) => {
                  const coords = getSvgCoordinates(asset.vol, asset.return);
                  return (
                    <g key={asset.id} className="cursor-help">
                      <circle
                        cx={coords.x}
                        cy={coords.y}
                        r="6"
                        fill={asset.color}
                        stroke="#fff"
                        strokeWidth="1.5"
                      />
                      <text
                        x={coords.x + 8}
                        y={coords.y + 3}
                        fill="#000"
                        fontSize="9"
                        fontWeight="700"
                        fontFamily="sans-serif"
                      >
                        {asset.name.split(' ')[0]}
                      </text>
                    </g>
                  );
                })}

                {/* Capital Allocation Line representing risk-free lending starting at (0, R_f) */}
                {/* CAL starts at (0, RF_RATE) through Maximized Sharpe Portfolio, for basic rendering we can draw to boundary */}
                <line
                  x1={getSvgCoordinates(0, RF_RATE).x}
                  y1={getSvgCoordinates(0, RF_RATE).y}
                  x2="450"
                  y2={Math.max(10, userPortfolioCoords.y - 10)}
                  stroke="#818cf8"
                  strokeWidth="1.5"
                  strokeDasharray="5 3"
                />

                {/* Draw Selected Portfolio Dot */}
                <g className="animate-pulse">
                  <circle
                    cx={userPortfolioCoords.x}
                    cy={userPortfolioCoords.y}
                    r="10"
                    fill="rgba(99, 102, 241, 0.25)"
                  />
                  <circle
                    cx={userPortfolioCoords.x}
                    cy={userPortfolioCoords.y}
                    r="6.5"
                    fill="#4f46e5"
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Numerical Metrics Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Return Card */}
        <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
          <span className="text-xs text-slate-500 font-medium block">Expected Portfolio Return</span>
          <span className="text-xl font-bold font-mono text-slate-800 block mt-1" id="portfolio-return-display">
            {formatPercent(portfolioReturn)}
          </span>
          <span className="text-[10px] text-slate-400 font-sans block mt-0.5">Formula: <span className="font-serif italic font-semibold text-slate-500">w₁R₁ + w₂R₂ + w₃R₃</span></span>
        </div>

        {/* Risk Card */}
        <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
          <span className="text-xs text-slate-500 font-medium block">Portfolio Volatility (Risk)</span>
          <span className="text-xl font-bold font-mono text-slate-800 block mt-1" id="portfolio-risk-display">
            {formatPercent(portfolioRisk)}
          </span>
          <span className="text-[10px] text-slate-400 font-sans block mt-0.5">With Correlation-based canceling</span>
        </div>

        {/* Sharpe Ratio Card */}
        <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
          <span className="text-xs text-slate-500 font-medium block">Portfolio Sharpe Ratio</span>
          <span className={`text-xl font-bold font-mono block mt-1 ${sharpeRatio > 0.4 ? 'text-green-600': 'text-slate-800'}`} id="portfolio-sharpe-display">
            {sharpeRatio.toFixed(3)}
          </span>
          <span className="text-[10px] text-slate-400 font-sans block mt-0.5">Formula: <span className="font-serif italic font-semibold text-slate-500">(R_p - R_f) / Volatility</span></span>
        </div>

        {/* Portfolio Beta Card */}
        <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl">
          <span className="text-xs text-slate-500 font-medium block">Portfolio Beta (<span className="font-serif italic text-slate-500">β</span>)</span>
          <span className="text-xl font-bold font-mono text-slate-800 block mt-1" id="portfolio-beta-display">
            {portfolioBeta.toFixed(2)}
          </span>
          <span className="text-[10px] text-slate-400 font-sans block mt-0.5">Sensitivity to market index (1.0)</span>
        </div>
      </div>

      {/* Portfolio Analysis Math Box */}
      <div className="p-5 bg-gradient-to-r from-slate-900 to-indigo-950 border border-indigo-950 text-white rounded-2xl shadow">
        <h4 className="font-sans font-bold text-sm text-indigo-200">The Power of Low Correlation</h4>
        <div className="mt-2 text-xs md:text-sm text-slate-300 font-sans leading-relaxed space-y-3">
          <p>
            Notice what happens as you drag the correlation slider <span className="font-serif italic text-indigo-200 font-semibold text-sm">ρ</span> towards <span className="text-green-300 font-bold font-serif">-0.95</span>. The Markowitz Efficient Frontier curves far to the left, which creates accessible portfolios with highly reduced risk.
          </p>
          <p>
            This occurs because when correlation is low or negative, the assets do not move in perfect harmony. When one asset underperforms, the other protects values by staying steady or moving upwards. Balanced diversification actively cancels out individual variances of volatile stocks!
          </p>
          <p className="pt-2 border-t border-slate-800 text-xs font-serif text-indigo-200 flex flex-wrap gap-4">
            <span>R_f = {formatPercent(RF_RATE)} Risk-Free rate hurdle</span>
          </p>
        </div>
      </div>
    </div>
  );
};
