import React, { useState, useEffect, useRef } from 'react';
import { randomNormal, formatPercent, formatCurrency } from '../utils/mathUtils';
import { 
  Users, 
  Flame, 
  Boxes, 
  RefreshCw, 
  AlertTriangle,
  Zap,
  Activity
} from 'lucide-react';

export const BehavioralLab: React.FC = () => {
  const [activeTab, setActiveTab ] = useState<'momentum' | 'cascades' | 'bubbles' | 'commodities'>('momentum');

  // ---------------------------------------------------------
  // LAB 1 STATE (Trend Chasing & Momentum)
  // ---------------------------------------------------------
  const [trendChasing, setTrendChasing] = useState<number>(0.15); // replaces phi
  const [noiseLevel, setNoiseLevel] = useState<number>(0.20); // replaces vol
  const [longestStreak, setLongestStreak] = useState<number>(0);
  const [holdReturn, setHoldReturn] = useState<number>(0);
  const [momReturn, setMomReturn] = useState<number>(0);
  const canvasAutoRef = useRef<HTMLCanvasElement | null>(null);
  const [simTrigger, setSimTrigger] = useState<number>(0);

  // LAB 1 SIMULATOR
  useEffect(() => {
    const N = 200;
    const dt = 1 / 252;
    const rawReturns: number[] = [];
    
    let lastRet = 0.001;
    for (let t = 0; t < N; t++) {
      const z = randomNormal();
      // Simple daily return with trend memory plus random market noise
      const currentRet = trendChasing * lastRet + Math.sqrt(1 - trendChasing * trendChasing) * noiseLevel * Math.sqrt(dt) * z;
      rawReturns.push(currentRet);
      lastRet = currentRet;
    }

    // Calculate longest consecutive price streak
    let maxStreak = 0;
    let currentStreak = 0;
    let currentSign = 1;
    rawReturns.forEach(ret => {
      const sign = ret >= 0 ? 1 : -1;
      if (sign === currentSign) {
        currentStreak++;
      } else {
        if (currentStreak > maxStreak) maxStreak = currentStreak;
        currentStreak = 1;
        currentSign = sign;
      }
    });
    if (currentStreak > maxStreak) maxStreak = currentStreak;
    setLongestStreak(maxStreak);

    // Build price paths
    const spotPath: number[] = [100];
    const momPath: number[] = [100];
    
    let activeSpot = 100;
    let activeMom = 100;

    for (let t = 0; t < N; t++) {
      const ret = rawReturns[t];
      activeSpot *= Math.exp(ret);
      spotPath.push(activeSpot);

      // Strategy signal: long if preceding returns positive, short if preceding returns negative
      const signal = t > 0 && rawReturns[t-1] > 0 ? 1 : -1;
      activeMom *= Math.exp(signal * ret);
      momPath.push(activeMom);
    }

    setHoldReturn(((activeSpot - 100) / 100) * 100);
    setMomReturn(((activeMom - 100) / 100) * 100);

    // Draw Price Path & Momentum Strategy Chart
    const canvas = canvasAutoRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    ctx.clearRect(0,0,W,H);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0,0,W,H);

    // Padding
    const padL = 50, padR = 20, padT = 30, padB = 40;
    const graphW = W - padL - padR;
    const graphH = H - padT - padB;

    const maxP = Math.max(...spotPath, ...momPath) * 1.05;
    const minP = Math.min(...spotPath, ...momPath) * 0.95;

    const mapX = (index: number) => padL + (index / N) * graphW;
    const mapY = (val: number) => padT + (1 - (val - minP) / (maxP - minP)) * graphH;

    // Draw grid
    ctx.strokeStyle = '#f1f5f9';
    ctx.lineWidth = 1;
    for (let r = 0; r <= 5; r++) {
      const yVal = minP + (r / 5) * (maxP - minP);
      ctx.beginPath();
      ctx.moveTo(padL, mapY(yVal));
      ctx.lineTo(W - padR, mapY(yVal));
      ctx.stroke();

      ctx.fillStyle = '#64748b';
      ctx.font = '9px monospace';
      ctx.fillText(formatCurrency(yVal), 8, mapY(yVal) + 3);
    }

    // Draw Spot Path (Buy & Hold)
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(mapX(0), mapY(spotPath[0]));
    for (let i = 1; i <= N; i++) {
      ctx.lineTo(mapX(i), mapY(spotPath[i]));
    }
    ctx.stroke();

    // Draw Momentum Path (Trend Rider)
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(mapX(0), mapY(momPath[0]));
    for (let i = 1; i <= N; i++) {
      ctx.lineTo(mapX(i), mapY(momPath[i]));
    }
    ctx.stroke();

    // Draw Labels
    ctx.fillStyle = '#64748b';
    ctx.font = '10px sans-serif';
    ctx.fillText("Time steps (Daily)", padL, H - 12);

    ctx.fillStyle = '#6366f1';
    ctx.font = 'bold 10px sans-serif';
    ctx.fillText(`Momentum Portfolio: ${formatCurrency(activeMom)}`, padL + 10, padT - 10);

    ctx.fillStyle = '#64748b';
    ctx.font = 'bold 10px sans-serif';
    ctx.fillText(`Buy & Hold Stock: ${formatCurrency(activeSpot)}`, padL + 210, padT - 10);

  }, [trendChasing, noiseLevel, simTrigger]);

  // ---------------------------------------------------------
  // LAB 2 STATE (Information Cascade Simulator)
  // ---------------------------------------------------------
  const [accuracyP, setAccuracyP] = useState<number>(0.65);
  const [showContrarian, setShowContrarian] = useState<boolean>(false);
  const [cascadeState, setCascadeState] = useState<'Good' | 'Bad'>('Good');
  // Agents decisions: each can be "unacted", "Buy" (1), "Sell" (-1)
  const [decisions, setDecisions] = useState<number[]>([]);
  const [privateSignals, setPrivateSignals] = useState<number[]>([]);
  const [agentsStatuses, setAgentsStatuses] = useState<string[]>([]); // "normal" | "contrarian" | "cascade"
  const [simStepsCompleted, setSimStepsCompleted] = useState<number>(0);
  const [statsHistory, setStatsHistory] = useState<{runsCount: number, errorCascades: number}>({runsCount: 0, errorCascades: 0});

  const getPublicStateValue = (index: number, currentDecisions: number[]) => {
    let diff = 0;
    for (let j = 0; j < index; j++) {
      diff += currentDecisions[j];
    }
    return diff;
  };

  const reseedCascadeSim = () => {
    const trueState = Math.random() > 0.5 ? 'Good' : 'Bad';
    setCascadeState(trueState);

    // Pre-generate private signals based on accuracy rate
    const signals: number[] = [];
    for (let i = 0; i < 30; i++) {
      const isCorrect = Math.random() < accuracyP;
      if (trueState === 'Good') {
        signals.push(isCorrect ? 1 : -1);
      } else {
        signals.push(isCorrect ? -1 : 1);
      }
    }
    setPrivateSignals(signals);
    setDecisions(Array(30).fill(0));
    setAgentsStatuses(Array(30).fill('normal'));
    setSimStepsCompleted(0);
  };

  // Run cascade simulation step-by-step
  const stepCascadeSim = () => {
    if (simStepsCompleted >= 30) return;
    const idx = simStepsCompleted;
    const curDecisions = [...decisions];
    const curStatuses = [...agentsStatuses];

    const privateSig = privateSignals[idx];
    const publicBalance = getPublicStateValue(idx, curDecisions);

    let choice = 0;
    
    // Is contrarian agent check
    const isContrarianSpot = showContrarian && idx === 14; 

    if (isContrarianSpot) {
      choice = privateSig;
      curStatuses[idx] = 'contrarian';
    } else {
      // BHW sequence herd logic: if public majority is +2 or more, ignore private signal and buy.
      if (publicBalance >= 2) {
        choice = 1;
        curStatuses[idx] = privateSig === -1 ? 'cascade' : 'normal';
      } else if (publicBalance <= -2) {
        choice = -1;
        curStatuses[idx] = privateSig === 1 ? 'cascade' : 'normal';
      } else if (publicBalance === 1) {
        if (privateSig === 1) {
          choice = 1;
          curStatuses[idx] = 'normal';
        } else {
          choice = privateSig;
          curStatuses[idx] = 'normal';
        }
      } else if (publicBalance === -1) {
        if (privateSig === -1) {
          choice = -1;
          curStatuses[idx] = 'normal';
        } else {
          choice = privateSig;
          curStatuses[idx] = 'normal';
        }
      } else {
        choice = privateSig;
        curStatuses[idx] = 'normal';
      }
    }

    curDecisions[idx] = choice;
    setDecisions(curDecisions);
    setAgentsStatuses(curStatuses);
    setSimStepsCompleted(idx + 1);

    // Track statistics when consensus aggregates
    if (idx + 1 === 30) {
      const finalSells = curDecisions.filter(c => c === -1).length;
      const finalBuys = curDecisions.filter(c => c === 1).length;
      const consensusIsBuy = finalBuys > finalSells;
      const isConsensusCorrect = (cascadeState === 'Good' && consensusIsBuy) || (cascadeState === 'Bad' && !consensusIsBuy);
      
      setStatsHistory(prev => ({
        runsCount: prev.runsCount + 1,
        errorCascades: prev.errorCascades + (isConsensusCorrect ? 0 : 1)
      }));
    }
  };

  const simulateAllCascades = () => {
    let steps = simStepsCompleted;
    while (steps < 30) {
      stepCascadeSim();
      steps++;
    }
  };

  useEffect(() => {
    reseedCascadeSim();
  }, [accuracyP, showContrarian]);

  // ---------------------------------------------------------
  // LAB 3 STATE (Bubble Feedback Sandbox)
  // ---------------------------------------------------------
  const [kappa, setKappa] = useState<number>(0.15); // Speculative interest feedback
  const [leverage, setLeverage] = useState<number>(3.0); // Leverage peak-lowering factor
  const [arbiCapital, setArbiCapital] = useState<number>(0.40); // Skeptics' capital dampening force
  const [liquidationRate, setLiquidationRate] = useState<number>(0); // Plays role of 'Bubble Popped' (1.0 or 0.0)
  const [maxBubbleAmp, setMaxBubbleAmp] = useState<number>(1.0);
  const canvasBubbleRef = useRef<HTMLCanvasElement | null>(null);
  const [reTriggerBubbles, setReTriggerBubbles] = useState<number>(0);

  useEffect(() => {
    const canvas = canvasBubbleRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, W, H);

    const padL = 55, padR = 20, padT = 30, padB = 40;
    const graphW = W - padL - padR;
    const graphH = H - padT - padB;

    const steps = 150;
    const intrinsicValue = 100;
    const prices: number[] = [100];
    let currentPrice = 100;
    let bubbleBurst = false;
    let burstIndex = -1;
    let peakPrice = 100;

    // Simulate smooth price updates with feedback loop and Pop breaking points
    for (let t = 1; t <= steps; t++) {
      if (bubbleBurst) {
        // Deflate rapidly to DCF fundamental anchor line with mild vibration noise
        currentPrice = currentPrice * 0.82 + intrinsicValue * 0.18 + (Math.random() * 2 - 1);
        prices.push(Math.max(10, currentPrice));
        continue;
      }

      const noise = (Math.random() * 6 - 3); // random shocks
      const dev = currentPrice - intrinsicValue;

      // Speculative enthusiasm feeds on price momentum
      const feedbackPush = Math.max(0, dev) * kappa * 0.18;

      // Skeptics' capital force counteracts speculation, pulling price back towards DCF intrinsic anchor
      const arbiDrag = Math.max(0, dev) * (arbiCapital * 0.08);

      currentPrice = currentPrice + noise + feedbackPush - arbiDrag;

      // Speculative breaking threshold pop limit: higher leverage is more fragile, lowering the burst tolerance limit
      const popThreshold = 120 + (1 / Math.max(0.2, leverage)) * 120;
      if (currentPrice > popThreshold) {
        bubbleBurst = true;
        burstIndex = t;
      }

      if (currentPrice > peakPrice) {
        peakPrice = currentPrice;
      }

      prices.push(Math.max(10, currentPrice));
    }

    setLiquidationRate(bubbleBurst ? 1.0 : 0.0);
    setMaxBubbleAmp(peakPrice / 100);

    const maxVal = Math.max(220, peakPrice * 1.1);
    const minVal = 20;

    const mapX = (index: number) => padL + (index / steps) * graphW;
    const mapY = (price: number) => padT + (1 - (price - minVal) / (maxVal - minVal)) * graphH;

    // Draw grid lines
    ctx.strokeStyle = '#f1f5f9';
    ctx.lineWidth = 1;
    for (let r = 0; r <= 5; r++) {
      const gridPrice = minVal + (r / 5) * (maxVal - minVal);
      ctx.beginPath();
      ctx.moveTo(padL, mapY(gridPrice));
      ctx.lineTo(W - padR, mapY(gridPrice));
      ctx.stroke();

      ctx.fillStyle = '#64748b';
      ctx.font = '9px monospace';
      ctx.fillText(formatCurrency(gridPrice), 8, mapY(gridPrice) + 3);
    }

    // Draw Intrinsic Value Line (Module 1 DCF reference!)
    ctx.strokeStyle = '#22c55e'; // Green stable anchor
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padL, mapY(intrinsicValue));
    ctx.lineTo(W - padR, mapY(intrinsicValue));
    ctx.stroke();

    ctx.fillStyle = '#16a34a';
    ctx.font = 'bold 9px sans-serif';
    ctx.fillText("True Intrinsic DCF Value (Module 1 Landmark)", padL + 10, mapY(intrinsicValue) - 6);

    // Draw Pop Breaking Threshold
    const limitPrice = 120 + (1 / Math.max(0.2, leverage)) * 120;
    ctx.strokeStyle = '#ef4444'; // Red limit line
    ctx.setLineDash([4, 4]);
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(padL, mapY(limitPrice));
    ctx.lineTo(W - padR, mapY(limitPrice));
    ctx.stroke();
    ctx.setLineDash([]); // clear dash

    ctx.fillStyle = '#ef4444';
    ctx.font = 'bold 9px sans-serif';
    ctx.fillText(`Speculative Breaking Point: ${formatCurrency(limitPrice)}`, padL + 10, mapY(limitPrice) - 6);

    // Draw Actual Price Curve
    ctx.strokeStyle = bubbleBurst ? '#d97706' : '#6366f1';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(mapX(0), mapY(prices[0]));
    for (let i = 1; i <= steps; i++) {
      ctx.lineTo(mapX(i), mapY(prices[i]));
    }
    ctx.stroke();

    // Draw boom bubble explosion point
    if (bubbleBurst && burstIndex !== -1) {
      const bX = mapX(burstIndex);
      const bY = mapY(prices[burstIndex]);
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(bX, bY, 6, 0, 2 * Math.PI);
      ctx.fill();

      ctx.fillStyle = '#b91c1c';
      ctx.font = 'extrabold 9px sans-serif';
      ctx.fillText("💥 POP BURST!", bX - 30, bY - 12);
    }

    ctx.fillStyle = '#64748b';
    ctx.font = '10px sans-serif';
    ctx.fillText("Bubble Timeline (Days)", padL, H - 12);

  }, [kappa, leverage, arbiCapital, reTriggerBubbles]);

  // ---------------------------------------------------------
  // LAB 4 STATE (Commodity Squeeze Lab)
  // ---------------------------------------------------------
  const [rfRate, setRfRate] = useState<number>(0.05);
  const [storageU, setStorageU] = useState<number>(0.02);
  const [convenienceY, setConvenienceY] = useState<number>(0.03);
  const [sentimentFlow, setSentimentFlow] = useState<number>(0); // positive value rotates curves shifts up
  const [spotPrice, setSpotPrice] = useState<number>(80);
  const [squeezeActive, setSqueezeActive] = useState<boolean>(false);
  const canvasCommRef = useRef<HTMLCanvasElement | null>(null);

  // Trigger live squeeze animation
  const runShortSqueezeAnimation = () => {
    if (squeezeActive) return;
    setSqueezeActive(true);

    let count = 0;
    const interval = setInterval(() => {
      setSpotPrice(prev => prev + 12);
      // Convenience yield shoots up in a squeeze as short sellers panic buy physical inventories
      setConvenienceY(prev => Math.min(0.35, prev + 0.02));
      setSentimentFlow(prev => prev + 15);
      count++;

      if (count > 15) {
        clearInterval(interval);
        setTimeout(() => {
          // Reset after a delay
          setSpotPrice(80);
          setConvenienceY(0.03);
          setSentimentFlow(0);
          setSqueezeActive(false);
        }, 3200);
      }
    }, 120);
  };

  useEffect(() => {
    const canvas = canvasCommRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#ffffff'; // Pristine clean minimalist workspace theme background
    ctx.fillRect(0, 0, W, H);

    const padL = 50, padR = 25, padT = 35, padB = 40;
    const graphW = W - padL - padR;
    const graphH = H - padT - padB;

    const maxT = 2.0; // 2 years maturity
    const steps = 50;

    // Build the curve data using straightforward discrete annual compounding (high-school algebra friendly)
    // F(T) = (Spot + Sentiment) * (1 + r + u - y) ^ T
    const curvePoints: {t: number, f: number}[] = [];
    const basicNoArbPoints: {t: number, f: number}[] = []; // benchmark baseline carry flat

    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * maxT;
      const f = (spotPrice + sentimentFlow) * Math.pow(Math.max(0.01, 1 + rfRate + storageU - convenienceY), t);
      const fBase = spotPrice * Math.pow(Math.max(0.01, 1 + rfRate + storageU - 0.03), t); // Baseline curve
      curvePoints.push({ t, f });
      basicNoArbPoints.push({ t, f: fBase });
    }

    const allPrices = [...curvePoints.map(c=>c.f), ...basicNoArbPoints.map(c=>c.f)];
    const maxVal = Math.max(...allPrices) * 1.08;
    const minVal = Math.max(10, Math.min(20, ...allPrices) * 0.92);

    const mapX = (t: number) => padL + (t / maxT) * graphW;
    const mapY = (price: number) => padT + (1 - (price - minVal) / (maxVal - minVal)) * graphH;

    // Draw grids
    ctx.strokeStyle = '#f1f5f9';
    ctx.lineWidth = 1;
    for (let r = 0; r <= 5; r++) {
      const gridPrice = minVal + (r / 5) * (maxVal - minVal);
      ctx.beginPath();
      ctx.moveTo(padL, mapY(gridPrice));
      ctx.lineTo(W - padR, mapY(gridPrice));
      ctx.stroke();

      ctx.fillStyle = '#64748b';
      ctx.font = '9px monospace';
      ctx.fillText(formatCurrency(gridPrice), 8, mapY(gridPrice) + 3);
    }

    // Draw baseline flat carry curves (Contango dashboard)
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(mapX(basicNoArbPoints[0].t), mapY(basicNoArbPoints[0].f));
    for (let i = 1; i <= steps; i++) {
      ctx.lineTo(mapX(basicNoArbPoints[i].t), mapY(basicNoArbPoints[i].f));
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw Active Futures Curve
    ctx.strokeStyle = squeezeActive ? '#e11d48' : '#6366f1'; // premium rose red for squeezes, deep indigo for default
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(mapX(curvePoints[0].t), mapY(curvePoints[0].f));
    for (let i = 1; i <= steps; i++) {
      ctx.lineTo(mapX(curvePoints[i].t), mapY(curvePoints[i].f));
    }
    ctx.stroke();

    // Draw Title description
    ctx.fillStyle = '#64748b';
    ctx.font = '10px sans-serif';
    ctx.fillText("Maturity Term T (Years)", padL, H - 12);
    ctx.fillText("Dashed: Benchmark Carry Curve (Contango)", padL + 130, padT - 15);
    
    ctx.fillStyle = squeezeActive ? '#e11d48' : '#6366f1';
    ctx.font = 'bold 10px sans-serif';
    ctx.fillText(squeezeActive ? "🚨 PANEL SQUEEZE DETECTED (BACKWARDATION)" : "Effective Sentiment Price Curve", padL, padT - 15);

  }, [rfRate, storageU, convenienceY, sentimentFlow, spotPrice, squeezeActive]);


  return (
    <div className="space-y-6" id="behavioral-comprehensive-lab-container">
      {/* Tab Navigation header */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('momentum')}
          className={`px-4 py-2 text-xs sm:text-sm font-sans font-bold rounded-lg transition-all flex items-center space-x-1 border ${
            activeTab === 'momentum'
              ? 'bg-slate-950 text-white border-slate-950'
              : 'text-slate-600 hover:bg-slate-100 bg-white border-slate-200'
          }`}
          id="tab-behavioral-momentum"
        >
          <Activity className="w-4 h-4" />
          <span>1. Trend & Momentum</span>
        </button>

        <button
          onClick={() => setActiveTab('cascades')}
          className={`px-4 py-2 text-xs sm:text-sm font-sans font-bold rounded-lg transition-all flex items-center space-x-1 border ${
            activeTab === 'cascades'
              ? 'bg-slate-950 text-white border-slate-950'
              : 'text-slate-600 hover:bg-slate-100 bg-white border-slate-200'
          }`}
          id="tab-behavioral-herding"
        >
          <Users className="w-4 h-4" />
          <span>2. Information Cascades</span>
        </button>

        <button
          onClick={() => setActiveTab('bubbles')}
          className={`px-4 py-2 text-xs sm:text-sm font-sans font-bold rounded-lg transition-all flex items-center space-x-1 border ${
            activeTab === 'bubbles'
              ? 'bg-slate-950 text-white border-slate-950'
              : 'text-slate-600 hover:bg-slate-100 bg-white border-slate-200'
          }`}
          id="tab-behavioral-bubbles"
        >
          <Flame className="w-4 h-4" />
          <span>3. Bubble Sandbox</span>
        </button>

        <button
          onClick={() => setActiveTab('commodities')}
          className={`px-4 py-2 text-xs sm:text-sm font-sans font-bold rounded-lg transition-all flex items-center space-x-1 border ${
            activeTab === 'commodities'
              ? 'bg-slate-950 text-white border-slate-950'
              : 'text-slate-600 hover:bg-slate-100 bg-white border-slate-200'
          }`}
          id="tab-behavioral-commodities"
        >
          <Boxes className="w-4 h-4" />
          <span>4. Commodity Squeezes</span>
        </button>
      </div>

      {/* LAB 1: Autocorrelation & Momentum */}
      {activeTab === 'momentum' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-sm space-y-6">
          <div className="space-y-1.5">
            <h3 className="font-sans font-extrabold text-lg text-slate-800 font-sans">Lab 1: Trend-Chasing & Momentum Playground</h3>
            <p className="text-xs text-slate-500 max-w-3xl leading-relaxed">
              Explore how positive feedback creates waves of momentum in stock prices. Adjust the <strong>Trend-Chasing Force</strong> to see how memory effects keep prices trending in the same direction, letting momentum riders outperform investors who simply buy and hold.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Control Column */}
            <div className="lg:col-span-4 space-y-4 bg-slate-50 border border-slate-150 p-4 rounded-2xl">
              <div>
                <label className="text-xs font-sans font-semibold text-slate-700 flex justify-between">
                  <span>Trend-Chasing Force (φ):</span>
                  <span className="font-mono text-indigo-600 font-bold">{trendChasing.toFixed(2)}</span>
                </label>
                <input
                  type="range"
                  min="-0.50"
                  max="0.50"
                  step="0.05"
                  value={trendChasing}
                  onChange={(e) => setTrendChasing(parseFloat(e.target.value))}
                  className="w-full mt-2 accent-indigo-600"
                />
                <span className="text-[10px] text-slate-400 block mt-1">
                  Positive values make price moves persist (momentum); negative values make daily moves snap back.
                </span>
              </div>

              <div>
                <label className="text-xs font-sans font-semibold text-slate-700 flex justify-between">
                  <span>Market Noise Level (Volatility):</span>
                  <span className="font-mono text-indigo-600 font-bold">{formatPercent(noiseLevel)}</span>
                </label>
                <input
                  type="range"
                  min="0.10"
                  max="0.50"
                  step="0.02"
                  value={noiseLevel}
                  onChange={(e) => setNoiseLevel(parseFloat(e.target.value))}
                  className="w-full mt-2 accent-indigo-600"
                />
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setSimTrigger(p => p + 1)}
                  className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold font-sans rounded-lg transition-all flex items-center justify-center space-x-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Resimulate Price Paths</span>
                </button>
              </div>
            </div>

            {/* Visual Screen Column */}
            <div className="lg:col-span-8 space-y-4">
              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <canvas 
                  ref={canvasAutoRef} 
                  width={600} 
                  height={250} 
                  className="w-full h-auto block"
                />
              </div>

              {/* Momentum Diagnostics Scorecard */}
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-3">
                <span className="font-mono text-slate-500 text-[10px] block uppercase tracking-wide font-bold">Momentum Diagnostics Scorecard</span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-3 rounded-lg border border-slate-100 shadow-3xs">
                    <span className="text-[10px] text-slate-400 font-sans block">Longest Trend Streak</span>
                    <span className="text-xs sm:text-sm font-mono font-extrabold text-indigo-700">{longestStreak} Consecutive Days</span>
                    <span className="text-[9px] text-slate-400 block mt-0.5">Consecutive days moving in same direction.</span>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-slate-100 shadow-3xs">
                    <span className="text-[10px] text-slate-400 font-sans block">Buy & Hold Return</span>
                    <span className={`text-xs sm:text-sm font-mono font-extrabold ${holdReturn >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {holdReturn >= 0 ? '+' : ''}{holdReturn.toFixed(1)}%
                    </span>
                    <span className="text-[9px] text-slate-400 block mt-0.5">Static investor path choice.</span>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-slate-100 shadow-3xs">
                    <span className="text-[10px] text-slate-400 font-sans block">Momentum Trader Return</span>
                    <span className={`text-xs sm:text-sm font-mono font-extrabold ${momReturn >= 0 ? 'text-indigo-600' : 'text-rose-600'}`}>
                      {momReturn >= 0 ? '+' : ''}{momReturn.toFixed(1)}%
                    </span>
                    <span className="text-[9px] text-slate-400 block mt-0.5">Strategy: ride positive days, bet against negative days.</span>
                  </div>
                </div>
                <div className="p-3 bg-indigo-50/50 rounded-lg text-[11px] text-indigo-900 border border-indigo-100/30 leading-relaxed font-sans">
                  <strong>High Schooler Rule of Thumb:</strong> {trendChasing > 0 
                    ? "With high positive Trend-Chasing, prices are sticky and form long trends (like a skateboard rolling downhill). This helps Momentum Traders crush simple Buy & Hold investors!"
                    : trendChasing < 0 
                    ? "Negative Trend-Chasing means tomorrow reverses today (like a bouncing ball). Momentum gets whipped around, and classical buy-and-hold is much safer."
                    : "The stock is in a pure un-biased random walk (coin flip). Momentum has no systematic advantage."}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LAB 2: Information Cascades */}
      {activeTab === 'cascades' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-sm space-y-6">
          <div className="space-y-1.5">
            <h3 className="font-sans font-extrabold text-lg text-slate-800">Lab 2: Herding & Information Cascade Simulator</h3>
            <p className="text-xs text-slate-500 max-w-3xl leading-relaxed">
              Watch 30 agents trade sequentially. Each acts based on the crowd's visible history and a private research signal. Notice how easily a <strong>false cascade</strong> locks the entire crowd into a wrong decision because the first few agents happened to swap incorrect cards!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Simulation controls */}
            <div className="lg:col-span-4 p-4 bg-slate-50 border border-slate-150 rounded-2xl space-y-4">
              <div>
                <label className="text-xs font-sans font-semibold text-slate-700 flex justify-between">
                  <span>Private Signal Reliability (p):</span>
                  <span className="font-mono text-indigo-600 font-bold">{formatPercent(accuracyP)}</span>
                </label>
                <input
                  type="range"
                  min="0.55"
                  max="0.85"
                  step="0.05"
                  value={accuracyP}
                  onChange={(e) => setAccuracyP(parseFloat(e.target.value))}
                  className="w-full mt-2 accent-indigo-600"
                />
              </div>

              <div className="flex items-center justify-between border-t border-slate-200/60 pt-3">
                <div>
                  <span className="text-xs font-sans font-semibold text-slate-700 block">Introduce Contrarian (Agent 15):</span>
                  <span className="text-[10px] text-slate-400 block max-w-[200px]">Agent 15 breaks herding by reporting their true signal openly.</span>
                </div>
                <input
                  type="checkbox"
                  checked={showContrarian}
                  onChange={(e) => setShowContrarian(e.target.checked)}
                  className="w-4 h-4 accent-indigo-600 rounded"
                />
              </div>

              <div className="pt-2 space-y-1.5 flex flex-col">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={reseedCascadeSim}
                    className="px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-850 text-xs font-bold font-sans rounded-lg transition-all"
                  >
                    Reseed Setup
                  </button>
                  <button
                    onClick={stepCascadeSim}
                    disabled={simStepsCompleted >= 30}
                    className="px-3 py-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white text-xs font-bold font-sans rounded-lg transition-all"
                  >
                    Action Step ({simStepsCompleted}/30)
                  </button>
                </div>
                <button
                  onClick={simulateAllCascades}
                  className="w-full px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold font-sans rounded-lg transition-all"
                >
                  Simulate All Steps
                </button>
              </div>

              {/* Bayesian math display panel */}
              <div className="bg-indigo-50/50 border border-indigo-150 p-3 rounded-xl text-xs space-y-2">
                <div className="flex justify-between font-mono text-[10px] text-indigo-800 font-bold uppercase">
                  <span>Cascade Scoreboard</span>
                  <span className="text-indigo-600">Actual State: {cascadeState === 'Good' ? '💡 GOOD ASSET' : '📉 BAD ASSET'}</span>
                </div>
                <div className="space-y-1 text-slate-700">
                  <div className="flex justify-between">
                    <span>Public Buy/Sell Imbalance:</span>
                    <span className="font-mono font-bold text-slate-900">
                      {getPublicStateValue(simStepsCompleted, decisions) > 0 ? '+' : ''}
                      {getPublicStateValue(simStepsCompleted, decisions)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Simulated Session Errors:</span>
                    <span className="font-mono font-semibold text-rose-600">{statsHistory.errorCascades} / {statsHistory.runsCount} ({statsHistory.runsCount > 0 ? ((statsHistory.errorCascades/statsHistory.runsCount)*100).toFixed(0) : 0}%)</span>
                  </div>
                </div>
                <p className="text-[10px] text-slate-500 italic pt-1.5 border-t border-indigo-100/50 leading-normal">
                  <strong>High School Rule of Thumb:</strong> When signal reliability is {formatPercent(accuracyP)}, there is a {(((1 - accuracyP)**2) / (2 * (accuracyP**2 - accuracyP + 1) || 1) * 100).toFixed(0)}% chance that the entire crowd locks into the incorrect action simply because the first 2 people happened to flip an error! Herd dynamics break traditional price discovery.
                </p>
              </div>
            </div>

            {/* Simulated Avatars grid */}
            <div className="lg:col-span-8 p-4 border border-slate-150 rounded-2xl">
              <span className="font-mono text-slate-400 text-[10px] block uppercase font-bold mb-3 tracking-wide">30 Sequential Perfect Agents</span>
              
              <div className="grid grid-cols-5 sm:grid-cols-6 gap-3 pt-2">
                {Array(30).fill(0).map((_, i) => {
                  const dec = decisions[i];
                  const sig = privateSignals[i];
                  const status = agentsStatuses[i];
                  const isActive = i < simStepsCompleted;

                  let bgColor = 'bg-slate-50 text-slate-400 border-slate-200';
                  let borderRing = '';
                  let label = `Agent ${i+1}`;

                  if (isActive) {
                    if (status === 'contrarian') {
                      bgColor = 'bg-amber-100 text-amber-800 border-amber-300 font-bold';
                      borderRing = 'ring-2 ring-amber-400';
                      label = `A-${i+1} (Raw Signal)`;
                    } else if (status === 'cascade') {
                      bgColor = 'bg-purple-600 text-white border-purple-700 font-bold';
                      label = `A-${i+1} (Herd Choice)`;
                    } else {
                      // Acted normal
                      if (dec === 1) {
                        bgColor = cascadeState === 'Good' ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white';
                      } else {
                        bgColor = cascadeState === 'Bad' ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white';
                      }
                    }
                  }

                  return (
                    <div 
                      key={i} 
                      className={`h-14 flex flex-col justify-center items-center rounded-xl border text-[9px] text-center transition-all shadow-sm ${bgColor} ${borderRing}`}
                    >
                      <span className="font-bold">{label}</span>
                      <span className="text-[8px] font-mono opacity-80 uppercase mt-0.5">
                        {isActive ? (dec === 1 ? 'BUY' : 'SELL') : `Sig: ${sig === 1 ? '+' : '-'}`}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Color guide */}
              <div className="mt-4 flex flex-wrap gap-4 text-[10px] text-slate-500 pt-3 border-t border-slate-100 font-mono">
                <div className="flex items-center space-x-1">
                  <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
                  <span>Correct Action (Matches True State)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="w-2.5 h-2.5 bg-rose-500 rounded-full" />
                  <span>Incorrect Action (Errors/Bias)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="w-2.5 h-2.5 bg-purple-600 rounded-full" />
                  <span>Herd Bound (Private Signal Ignored)</span>
                </div>
                {showContrarian && (
                  <div className="flex items-center space-x-1">
                    <span className="w-2.5 h-2.5 bg-amber-400 rounded-full" />
                    <span>Contrarian (Breaks the herd)</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LAB 3: Bubble Feedback Sandbox */}
      {activeTab === 'bubbles' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-sm space-y-6">
          <div className="space-y-1.5">
            <h3 className="font-sans font-extrabold text-lg text-slate-800">Lab 3: Speculative Bubble Feedback Sandbox</h3>
            <p className="text-xs text-slate-500 max-w-3xl leading-relaxed">
              Synthesize a stock path where performance triggers brand-new buyers. Watch what happens when immediate prices decouple from the green <strong>DCF intrinsic value line</strong>. Can skeptics successfully sell it back to value, or will leverage trigger a spectacular speculative pop?
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Sliders panel */}
            <div className="lg:col-span-4 p-4 bg-slate-50 border border-slate-150 rounded-2xl space-y-4">
              <div>
                <label className="text-xs font-sans font-semibold text-slate-700 flex justify-between">
                  <span>Speculative Enthusiasm (κ):</span>
                  <span className="font-mono text-indigo-600 font-bold">{kappa.toFixed(2)}</span>
                </label>
                <input
                  type="range"
                  min="0.01"
                  max="0.45"
                  step="0.02"
                  value={kappa}
                  onChange={(e) => setKappa(parseFloat(e.target.value))}
                  className="w-full mt-2 accent-indigo-600"
                />
                <span className="text-[10px] text-slate-400 block mt-1">
                  When κ increases, buying momentum overrules fundamental cash flow constraints.
                </span>
              </div>

              <div>
                <label className="text-xs font-sans font-semibold text-slate-700 flex justify-between">
                  <span>Skeptic Capital Force:</span>
                  <span className="font-mono text-indigo-600 font-bold">{formatPercent(arbiCapital)}</span>
                </label>
                <input
                  type="range"
                  min="0.10"
                  max="0.70"
                  step="0.05"
                  value={arbiCapital}
                  onChange={(e) => setArbiCapital(parseFloat(e.target.value))}
                  className="w-full mt-2 accent-indigo-600"
                />
                <span className="text-[10px] text-slate-400 block mt-1">
                  Represents smart money pushing prices back to true DCF intrinsic values.
                </span>
              </div>

              <div>
                <label className="text-xs font-sans font-semibold text-slate-700 flex justify-between">
                  <span>Trading Leverage Excess:</span>
                  <span className="font-mono text-indigo-600 font-bold">{leverage.toFixed(1)}x</span>
                </label>
                <input
                  type="range"
                  min="1.0"
                  max="5.0"
                  step="0.2"
                  value={leverage}
                  onChange={(e) => setLeverage(parseFloat(e.target.value))}
                  className="w-full mt-2 accent-indigo-600"
                />
                <span className="text-[10px] text-slate-400 block mt-1">
                  Higher leverage makes the speculative bubble fragile, lowering the pop tolerance.
                </span>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setReTriggerBubbles(p => p+1)}
                  className="w-full px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-sans font-bold rounded-lg"
                >
                  Regenerate Simulation Path
                </button>
              </div>

              <div className="bg-slate-950 text-slate-100 p-3.5 rounded-xl text-xs font-mono space-y-2">
                <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider block">Bubble Simulation Output</span>
                <div className="flex justify-between">
                  <span>Simulation Status:</span>
                  <span className={liquidationRate > 0.5 ? 'text-rose-450 font-bold animate-pulse' : 'text-emerald-400 font-bold'}>
                    {liquidationRate > 0.5 ? '💥 BUBBLE BURST!' : '✅ Stabilized by Skeptics'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Peak Inflation Level:</span>
                  <span className="text-amber-300 font-bold">
                    {((maxBubbleAmp - 1) * 100).toFixed(0)}% Over Intrinsic
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 leading-normal pt-1.5 border-t border-slate-800 font-sans">
                  {liquidationRate > 0.5 
                    ? "Skeptics ran out of capital (or prices went vertical). The bubble inflated quickly, exceeded the breaking point, and crashed back down to our green DCF fundamental line!" 
                    : "Excellent! The Skeptic Capital Force was strong enough to keep speculators from running away with the price. The market returned safely to its proper DCF anchor."}
                </p>
              </div>
            </div>

            {/* Bubble Chart Screen */}
            <div className="lg:col-span-8 p-4 border border-slate-150 rounded-2xl space-y-2">
              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs bg-white">
                <canvas 
                  ref={canvasBubbleRef} 
                  width={600} 
                  height={260} 
                  className="w-full h-auto block"
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 font-mono pl-1">
                <div className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
                  <span>Skeptics Keep Price Tethered</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 bg-yellow-500 rounded-full" />
                  <span>Speculative Bubble Deflating</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 bg-red-500 rounded-full" />
                  <span>Immediate Pop Burst triggered!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LAB 4: Commodity Squeeze Lab */}
      {activeTab === 'commodities' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-sm space-y-6">
          <div className="space-y-1.5 border-b border-slate-100 pb-3">
            <span className="text-indigo-600 font-mono text-xs uppercase tracking-wider">Lab 4: Storable Commodities Curve Twist</span>
            <h3 className="font-sans font-extrabold text-lg text-slate-800 flex items-center space-x-2">
              <Zap className="w-5 h-5 text-amber-500 fill-amber-500" />
              <span>Storable Carrying Math vs. Sentiment Squeezes</span>
            </h3>
            <p className="text-xs text-slate-500 max-w-4xl leading-relaxed">
              Storable commodities are priced strictly by carry math: F = S × (1 + r + u - y)<sup>T</sup> where u is storage rent, r is financing interest rate, and y is emergency convenience yield. Squeezes trigger forced demand (short covers), twisting the curve into extreme downward slope (backwardation).
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Commodity Controls */}
            <div className="lg:col-span-4 p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-4 text-xs text-slate-700">
              <div>
                <label className="font-sans font-semibold text-slate-700 flex justify-between">
                  <span>Interest rate cost (r):</span>
                  <span className="text-indigo-600 font-bold">{formatPercent(rfRate)}</span>
                </label>
                <input
                  type="range"
                  min="0.01"
                  max="0.10"
                  step="0.01"
                  value={rfRate}
                  onChange={(e) => setRfRate(parseFloat(e.target.value))}
                  className="w-full mt-2 accent-indigo-600"
                />
              </div>

              <div>
                <label className="font-sans font-semibold text-slate-700 flex justify-between">
                  <span>Physical Storage cost (u):</span>
                  <span className="text-indigo-600 font-bold">{formatPercent(storageU)}</span>
                </label>
                <input
                  type="range"
                  min="0.01"
                  max="0.15"
                  step="0.01"
                  value={storageU}
                  onChange={(e) => setStorageU(parseFloat(e.target.value))}
                  className="w-full mt-2 accent-indigo-600"
                />
              </div>

              <div>
                <label className="font-sans font-semibold text-slate-700 flex justify-between">
                  <span>Convenience Yield (y):</span>
                  <span className="text-indigo-600 font-bold">{formatPercent(convenienceY)}</span>
                </label>
                <input
                  type="range"
                  min="0.01"
                  max="0.35"
                  step="0.01"
                  value={convenienceY}
                  onChange={(e) => setConvenienceY(parseFloat(e.target.value))}
                  className="w-full mt-2 accent-indigo-600"
                />
              </div>

              <div>
                <label className="font-sans font-semibold text-slate-700 flex justify-between">
                  <span>Index sentiment bias:</span>
                  <span className="text-indigo-600 font-bold">+{formatCurrency(sentimentFlow)}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="80"
                  value={sentimentFlow}
                  onChange={(e) => setSentimentFlow(parseInt(e.target.value))}
                  className="w-full mt-2 accent-indigo-600"
                />
              </div>

              {/* Squeeze trigger */}
              <div className="pt-2 border-t border-slate-200">
                <button
                  onClick={runShortSqueezeAnimation}
                  disabled={squeezeActive}
                  className="w-full py-2.5 bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white font-sans font-bold uppercase tracking-wider rounded-lg transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <Flame className="w-4 h-4 fill-white" />
                  <span>Trigger live Short Squeeze</span>
                </button>
              </div>

              <div className="p-3 bg-slate-100 border border-slate-200 rounded-xl space-y-1 mt-2 text-[10px] leading-relaxed">
                <span className="font-sans font-extrabold text-indigo-700 block uppercase">Squeeze Case Study</span>
                <p className="text-slate-500">
                  <strong>Nickel Squeeze 2022:</strong> A short seller got trapped with massive margin calls, forcing panic buying. Convenience yield shot up instantly, bending the futures curve into backwardation!
                </p>
              </div>
            </div>

            {/* Twist Commodity Chart */}
            <div className="lg:col-span-8 p-4 border border-slate-200 rounded-2xl bg-slate-50">
              <div className="border border-slate-200 rounded-xl overflow-hidden relative shadow-xs bg-white">
                <canvas 
                  ref={canvasCommRef} 
                  width={600} 
                  height={280} 
                  className="w-full h-auto block"
                />

                {squeezeActive && (
                  <div className="absolute top-4 right-4 bg-rose-600 text-white font-mono px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest animate-pulse border border-rose-500 flex items-center space-x-1 shadow-sm">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Extreme Squeeze Backwardation</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
