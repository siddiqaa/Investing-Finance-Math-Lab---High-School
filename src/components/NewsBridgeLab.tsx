import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  AlertTriangle, 
  TrendingUp, 
  Landmark, 
  TrendingDown, 
  Plus, 
  RotateCcw,
  Sparkles,
  Play,
  HelpCircle,
  Clock,
  Briefcase
} from 'lucide-react';
import { formatCurrency, formatPercent } from '../utils/mathUtils';
import { processMathText, MathSpan } from '../lib/math';

interface NewsEvent {
  id: string;
  headline: string;
  category: 'positive_g' | 'negative_g' | 'positive_r' | 'negative_r';
  impactText: string;
  gShift: number; // e.g. +0.02
  rShift: number; // e.g. +0.015
  icon: React.ReactNode;
}

export const NewsBridgeLab: React.FC = () => {
  // GGM baseline parameters
  const [baseD1, setBaseD1] = useState<number>(2.50); // $2.50
  const [baseR, setBaseR] = useState<number>(0.09); // 9%
  const [baseG, setBaseG] = useState<number>(0.04); // 4%

  // Current active parameters (shifted by news events)
  const [currentR, setCurrentR] = useState<number>(0.09);
  const [currentG, setCurrentG] = useState<number>(0.04);
  const [previousPrice, setPreviousPrice] = useState<number>(50.00);
  const [currentPrice, setCurrentPrice] = useState<number>(50.00);

  // Price history for the mini "price discovery chart"
  const [priceHistory, setPriceHistory] = useState<{ id: string; eventName: string; price: number; timestamp: string }[]>([
    { id: 'start', eventName: 'Baseline Valuation', price: 50.00, timestamp: '10:00 AM' }
  ]);

  // News catalog
  const newsEvents: NewsEvent[] = [
    {
      id: 'news_ai',
      headline: 'AI Integration Doubles Corporate Productivity',
      category: 'positive_g',
      impactText: 'Boosts growth rate (g) by +2.0%',
      gShift: 0.02,
      rShift: 0,
      icon: <Sparkles className="w-4 h-4 text-emerald-600" />
    },
    {
      id: 'news_competitor',
      headline: 'Major Competitor Files for Bankruptcy',
      category: 'positive_g',
      impactText: 'Boosts growth rate (g) by +1.5%',
      gShift: 0.015,
      rShift: 0,
      icon: <TrendingUp className="w-4 h-4 text-emerald-600" />
    },
    {
      id: 'news_fed_hike',
      headline: 'Federal Reserve Raises Interest Rates unexpectedly',
      category: 'positive_r',
      impactText: 'Increases discount rate (r) by +1.5% due to higher safe-asset alternatives',
      gShift: 0,
      rShift: 0.015,
      icon: <Landmark className="w-4 h-4 text-rose-600" />
    },
    {
      id: 'news_patent',
      headline: 'Key Product Patent Expires Early',
      category: 'negative_g',
      impactText: 'Reduces growth rate (g) by -1.5% due to generic competitors',
      gShift: -0.015,
      rShift: 0,
      icon: <TrendingDown className="w-4 h-4 text-rose-600" />
    },
    {
      id: 'news_lawsuit',
      headline: 'Unexpected Government Antitrust Investigation Launched',
      category: 'positive_r',
      impactText: 'Increases risk discount rate (r) by +2.0% due to corporate uncertainty',
      gShift: 0,
      rShift: 0.02,
      icon: <AlertTriangle className="w-4 h-4 text-amber-600" />
    },
    {
      id: 'news_efficiency',
      headline: 'Proprietary Supply Chain Upgrade Cuts Overhead Costs',
      category: 'negative_r',
      impactText: 'Reduces risk discount rate (r) by -1.0% (increased stability and cash safety)',
      gShift: 0,
      rShift: -0.01,
      icon: <Briefcase className="w-4 h-4 text-emerald-600" />
    }
  ];

  // Calculate price safely
  const calculateGGM = (d1: number, r: number, g: number) => {
    const denominator = r - g;
    if (denominator <= 0.005) {
      return d1 / 0.005; // Prevent dividing by zero or negative rates cleanly
    }
    return d1 / denominator;
  };

  const baselinePrice = calculateGGM(baseD1, baseR, baseG);

  // Trigger a news event
  const handleTriggerNews = (event: NewsEvent) => {
    setPreviousPrice(currentPrice);

    // Calculate new parameters, keeping them in healthy ranges
    const targetG = Math.max(0.01, Math.min(baseR - 0.01, currentG + event.gShift));
    const targetR = Math.max(currentG + 0.01, Math.min(0.20, currentR + event.rShift));

    setCurrentG(targetG);
    setCurrentR(targetR);

    const nextPrice = calculateGGM(baseD1, targetR, targetG);
    setCurrentPrice(nextPrice);

    // Add to history
    const date = new Date();
    const timeStr = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
    
    setPriceHistory(prev => [
      ...prev,
      {
        id: Math.random().toString(),
        eventName: event.headline,
        price: nextPrice,
        timestamp: timeStr
      }
    ]);
  };

  // Reset the sandbox
  const handleReset = () => {
    setCurrentG(baseG);
    setCurrentR(baseR);
    setPreviousPrice(baselinePrice);
    setCurrentPrice(baselinePrice);
    setPriceHistory([
      { id: 'start', eventName: 'Baseline Valuation Reset', price: baselinePrice, timestamp: 'Reset Time' }
    ]);
  };

  const priceDiff = currentPrice - previousPrice;
  const priceDiffPct = previousPrice > 0 ? (priceDiff / previousPrice) : 0;

  return (
    <div className="space-y-6">
      <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-6">
        
        {/* Header section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="space-y-0.5">
            <h3 className="font-sans font-bold text-slate-800 text-lg flex items-center gap-2">
              <Zap className="w-5 h-5 text-indigo-600 animate-pulse" />
              <span>The News Discovery & Catalyst Sandbox</span>
            </h3>
            <p className="text-slate-500 text-xs font-sans">
              Inject unexpected events to witness how changing expectations instantly alter the Gordon Growth parameters and jump the stock price.
            </p>
          </div>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 hover:border-slate-300 text-xs font-sans font-bold text-slate-600 rounded-lg bg-slate-50 hover:bg-slate-100 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Sandbox</span>
          </button>
        </div>

        {/* Top Section: Base Gordon Growth Setup */}
        <div className="space-y-3 bg-slate-50/50 p-4 border border-slate-100 rounded-xl">
          <span className="font-mono text-[10px] uppercase text-slate-400 font-extrabold tracking-wider block">Set the Baseline Business State (Static Formula)</span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* D1 */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-sans">
                <span className="text-slate-500 font-bold flex items-center gap-1">
                  <span>Next Year Dividend</span> (<MathSpan tex="D_1" />)
                </span>
                <span className="font-mono font-bold text-indigo-600">{formatCurrency(baseD1)}</span>
              </div>
              <input
                type="range"
                min="0.50"
                max="5.00"
                step="0.10"
                value={baseD1}
                onChange={(e) => {
                  const d = parseFloat(e.target.value) || 0.50;
                  setBaseD1(d);
                  // also update current price
                  setCurrentPrice(calculateGGM(d, currentR, currentG));
                }}
                className="w-full h-1 bg-slate-200 rounded appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            {/* r */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-sans">
                <span className="text-slate-500 font-bold">Baseline Discount Rate (r)</span>
                <span className="font-mono font-bold text-indigo-600">{formatPercent(baseR)}</span>
              </div>
              <input
                type="range"
                min="0.06"
                max="0.18"
                step="0.005"
                value={baseR}
                onChange={(e) => {
                  const rVal = parseFloat(e.target.value) || 0.06;
                  setBaseR(rVal);
                  setCurrentR(rVal);
                  setCurrentPrice(calculateGGM(baseD1, rVal, currentG));
                }}
                className="w-full h-1 bg-slate-200 rounded appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            {/* g */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-sans">
                <span className="text-slate-500 font-bold">Baseline Growth Rate (g)</span>
                <span className="font-mono font-bold text-indigo-600">{formatPercent(baseG)}</span>
              </div>
              <input
                type="range"
                min="0.01"
                max="0.08"
                step="0.005"
                value={baseG}
                onChange={(e) => {
                  const gVal = parseFloat(e.target.value) || 0.01;
                  setBaseG(gVal);
                  setCurrentG(gVal);
                  setCurrentPrice(calculateGGM(baseD1, currentR, gVal));
                }}
                className="w-full h-1 bg-slate-200 rounded appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

          </div>
        </div>

        {/* Mid Panel: Parameter shifts and Active price ticker */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Active News Catalysts (Left 7 Columns) */}
          <div className="md:col-span-7 space-y-3">
            <span className="font-mono text-[10px] uppercase text-slate-400 font-extrabold tracking-wider block">Incoming Market News (Click to Trigger Shock)</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {newsEvents.map((evt) => (
                <button
                  key={evt.id}
                  onClick={() => handleTriggerNews(evt)}
                  className="p-3 bg-white border border-slate-200 hover:border-indigo-400 hover:shadow-xs rounded-xl text-left transition-all flex gap-3 cursor-pointer group"
                >
                  <div className="p-1.5 bg-slate-50 rounded-lg flex-shrink-0 group-hover:bg-indigo-50 transition-colors">
                    {evt.icon}
                  </div>
                  <div className="space-y-1 min-w-0">
                    <span className="font-sans font-bold text-[11px] sm:text-xs text-slate-800 line-clamp-1 group-hover:text-indigo-700 transition-colors">
                      {evt.headline}
                    </span>
                    <p className="text-[10px] text-slate-400 font-mono leading-normal">
                      {evt.impactText}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Real-time Ticker & Price Discovery (Right 5 Columns) */}
          <div className="md:col-span-5 bg-slate-50 border border-slate-200 p-4 rounded-2xl flex flex-col justify-between space-y-4">
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-mono text-[10px] uppercase text-slate-400 font-extrabold tracking-wider block">Price Discovery Ticker</span>
                <span className="bg-indigo-100 text-indigo-700 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded animate-pulse">ACTIVE FEED</span>
              </div>

              {/* Price Display */}
              <div className="p-4 bg-white border border-slate-200 rounded-xl flex items-center justify-between shadow-3xs">
                <div className="space-y-0.5">
                  <span className="text-[10px] text-slate-400 font-sans font-bold uppercase flex items-center gap-1">
                    <span>Current Fair Value</span> (<MathSpan tex="P_0" />)
                  </span>
                  <div className="font-mono text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                    {formatCurrency(currentPrice)}
                  </div>
                </div>

                {/* Return Shock Pill */}
                <div className="text-right">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentPrice}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      className={`font-mono text-xs font-bold px-2.5 py-1 rounded-full ${
                        priceDiff === 0 
                          ? 'bg-slate-100 text-slate-500' 
                          : priceDiff > 0 
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' 
                            : 'bg-rose-50 text-rose-700 border border-rose-100'
                      }`}
                    >
                      {priceDiff === 0 ? 'No Change' : `${priceDiff > 0 ? '▲ +' : '▼ '}${formatCurrency(priceDiff)} (${formatPercent(Math.abs(priceDiffPct))})`}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Current GGM Inputs Display */}
            <div className="space-y-1.5 bg-white border border-slate-150 p-3 rounded-xl text-xs font-sans">
              <span className="text-[10px] text-slate-400 font-bold uppercase block pb-1 border-b border-slate-100">Formula Parameters Shifted</span>
              <div className="flex justify-between font-mono">
                <span className="text-slate-500">Growth expectation (g):</span>
                <span className="font-bold text-slate-800">{formatPercent(currentG)}</span>
              </div>
              <div className="flex justify-between font-mono">
                <span className="text-slate-500">Discount hurdle (r):</span>
                <span className="font-bold text-slate-800">{formatPercent(currentR)}</span>
              </div>
              <div className="flex justify-between font-mono">
                <span className="text-slate-500">Resulting Spread (r - g):</span>
                <span className="font-bold text-indigo-600">{formatPercent(currentR - currentG)}</span>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Section: Dynamic Step Chart / Discovery logs */}
        <div className="space-y-3 pt-2">
          <span className="font-mono text-[10px] uppercase text-slate-400 font-extrabold tracking-wider block">The Price Discovery Staircase (News Path)</span>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-4">
            
            {/* Quick visualization of the price path */}
            <div className="h-28 flex items-end gap-1 border-b border-slate-200 pb-2 relative overflow-hidden">
              <div className="absolute left-2 top-2 text-[9px] text-slate-400 font-sans font-bold uppercase">
                Cumulative Discovery Trend
              </div>
              
              {priceHistory.map((pt, idx) => {
                const maxHistoryVal = Math.max(...priceHistory.map(h => h.price), 100);
                const heightPct = (pt.price / maxHistoryVal) * 80; // Scale to fit well

                return (
                  <div key={pt.id} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                    
                    {/* Hover tooltip */}
                    <div className="absolute bottom-full mb-1 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-[9px] px-2 py-1 rounded shadow-md pointer-events-none z-10 font-mono whitespace-nowrap">
                      {pt.eventName} ({formatCurrency(pt.price)})
                    </div>

                    {/* Step column */}
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${heightPct}%` }}
                      className={`w-full rounded-t-sm max-w-[40px] ${
                        idx === priceHistory.length - 1 
                          ? 'bg-indigo-600' 
                          : 'bg-indigo-300 hover:bg-indigo-400 transition-colors'
                      }`}
                    />
                    
                    {/* Mini year-marker */}
                    <span className="text-[8px] font-mono text-slate-400 mt-1">
                      #{idx}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Dynamic News Logs */}
            <div className="space-y-2">
              <span className="font-sans font-bold text-xs text-slate-700 block flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Catalyst Timeline History:</span>
              </span>
              <div className="max-h-24 overflow-y-auto space-y-1.5 border border-slate-200 rounded-lg p-2 bg-white">
                {priceHistory.map((item, idx) => (
                  <div key={item.id} className="flex justify-between items-center text-[11px] font-mono border-b border-slate-50 pb-1 last:border-0 last:pb-0">
                    <span className="text-slate-500 font-sans">
                      <strong className="text-slate-400">Step {idx}:</strong> {item.eventName}
                    </span>
                    <span className="font-bold text-indigo-700">
                      {formatCurrency(item.price)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Bridge conclusion */}
        <div className="bg-indigo-50/40 border border-indigo-100 p-4 rounded-xl space-y-2 font-sans">
          <span className="font-bold text-slate-800 text-xs sm:text-sm flex items-center gap-1">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>Bridging to Stochastic Calculus (Unit 6):</span>
          </span>
          <p className="text-xs text-slate-600 leading-relaxed">
            {processMathText('Look at the stair-step chart above! By clicking positive and negative news events randomly, you have created a jagged, unpredictable path. This represents <span className="font-bold text-slate-800">exactly</span> how stock prices behave in the real world. In the next unit, we will upgrade from discrete "step shocks" to <span className="font-bold text-slate-800">continuous stochastic processes</span> where random market forces operate at every single millisecond.')}
          </p>
        </div>

      </div>
    </div>
  );
};
