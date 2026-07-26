import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  Info, 
  Store, 
  LineChart,
  RefreshCcw
} from 'lucide-react';
import { MathSpan, processMathText } from '../lib/math';

export const LemonadeStandLab: React.FC = () => {
  // Scenario State
  const [initialInvestment, setInitialInvestment] = useState(100);
  const [discountRate, setDiscountRate] = useState(10); // in percent
  const [growthRate, setGrowthRate] = useState(15); // in percent
  const [baseProfit, setBaseProfit] = useState(40); // Year 1 profit
  const [timeHorizon, setTimeHorizon] = useState(5); // Number of years

  // Derived Cash Flows based on growth and horizon
  const cashFlows = useMemo(() => {
    const flows = [];
    for (let i = 1; i <= timeHorizon; i++) {
      flows.push({ 
        year: i, 
        amount: baseProfit * Math.pow(1 + growthRate / 100, i - 1) 
      });
    }
    return flows;
  }, [baseProfit, growthRate, timeHorizon]);

  // Calculations
  const npvDetails = useMemo(() => {
    let totalPV = 0;
    const discountedFlows = cashFlows.map(cf => {
      const rate = discountRate / 100;
      const pv = cf.amount / Math.pow(1 + rate, cf.year);
      totalPV += pv;
      return { ...cf, pv };
    });
    const npv = totalPV - initialInvestment;
    return { discountedFlows, totalPV, npv };
  }, [initialInvestment, discountRate, cashFlows]);

  const isProfitable = npvDetails.npv >= 0;

  // Max value for chart scaling
  const maxVal = Math.max(...cashFlows.map(cf => cf.amount), initialInvestment) * 1.1;

  return (
    <div className="flex flex-col space-y-6">
      {/* Header & Concept Intro */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
            <Store className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800">The Lemonade Stand Venture</h3>
            <p className="text-slate-500 text-sm">How much is a future business actually worth today?</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Stand Price
            </label>
            <div className="flex items-center gap-2">
              <input 
                type="range"
                min="20"
                max="500"
                step="5"
                value={initialInvestment}
                onChange={(e) => setInitialInvestment(Number(e.target.value))}
                className="w-full h-2 bg-indigo-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <span className="text-xl font-bold text-indigo-600 min-w-[3.5rem] text-right">${initialInvestment}</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">{processMathText('Initial Pay ($I_0$)')}</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Profit Growth
            </label>
            <div className="flex items-center gap-2">
              <input 
                type="range"
                min="0"
                max="100"
                step="1"
                value={growthRate}
                onChange={(e) => setGrowthRate(Number(e.target.value))}
                className="w-full h-2 bg-emerald-100 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <span className="text-xl font-bold text-emerald-600 min-w-[3.5rem] text-right">{growthRate}%</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1 italic">{processMathText('Annual Growth ($g$)')}</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>{processMathText('Bank Rate ($r$)')}</span>
              <Info className="w-3 h-3 cursor-help text-slate-300" />
            </label>
            <div className="flex items-center gap-2">
              <input 
                type="range"
                min="0"
                max="25"
                step="0.5"
                value={discountRate}
                onChange={(e) => setDiscountRate(Number(e.target.value))}
                className="w-full h-2 bg-indigo-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <span className="text-xl font-bold text-indigo-600 min-w-[3rem] text-right">{discountRate}%</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1 italic">Opportunity Cost</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              Time Horizon
            </label>
            <div className="flex items-center gap-2">
              <input 
                type="range"
                min="1"
                max="10"
                step="1"
                value={timeHorizon}
                onChange={(e) => setTimeHorizon(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-600"
              />
              <span className="text-xl font-bold text-slate-700 min-w-[2rem] text-right">{timeHorizon}y</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1 uppercase">Investment Length</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 flex flex-col justify-center">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Verdict
            </label>
            <motion.div 
              key={isProfitable ? 'buy' : 'skip'}
              initial={{ scale: 0.9, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`text-xl font-black uppercase tracking-tight ${isProfitable ? 'text-emerald-600' : 'text-rose-600'}`}
            >
              {isProfitable ? '✅ Buy It' : '❌ Skip It'}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Simulation Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Panel: The Bar Chart Visualizer */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h4 className="font-bold text-slate-700 flex items-center gap-2">
              <LineChart className="w-4 h-4 text-indigo-500" />
              Future Value vs. Value Today
            </h4>
            <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 bg-slate-100 border border-slate-200 rounded" />
                <span className="text-slate-400">Future Profit</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 bg-indigo-500 rounded" />
                <span className="text-indigo-600">Value Today (PV)</span>
              </div>
            </div>
          </div>

          <div className="flex-grow flex items-end justify-between gap-1 h-64 border-b border-slate-100 pb-2 relative">
            {/* Horizontal Grid Lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((p) => (
              <div 
                key={p} 
                className="absolute left-0 right-0 border-t border-slate-50 pointer-events-none" 
                style={{ bottom: `${p * 100}%` }}
              />
            ))}

            {npvDetails.discountedFlows.map((cf) => (
              <div key={cf.year} className="flex-grow flex flex-col items-center group relative h-full justify-end px-1">
                {/* Future Value Bar (Light) */}
                <motion.div 
                  className="w-full bg-slate-100 rounded-t-sm border border-slate-200 relative"
                  animate={{ height: `${(cf.amount / maxVal) * 100}%` }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                >
                  {/* Present Value Overlay (Dark) */}
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 bg-indigo-500 rounded-t-sm"
                    animate={{ height: `${(cf.pv / cf.amount) * 100}%` }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  />
                </motion.div>
                
                <div className="mt-2 text-[10px] font-mono font-bold text-slate-400">Y{cf.year}</div>

                {/* Tooltip on Hover */}
                <div className="absolute bottom-full mb-2 bg-slate-800 text-white p-2 rounded text-[10px] opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none whitespace-nowrap shadow-xl">
                  <div className="font-bold border-b border-white/10 pb-1 mb-1">Year {cf.year} Detail</div>
                  <div>Expected: <span className="text-slate-300">${cf.amount.toFixed(0)}</span></div>
                  <div>Worth Today: <span className="text-indigo-300 font-bold">${cf.pv.toFixed(2)}</span></div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-slate-50 rounded-xl text-xs text-slate-500 italic flex gap-3">
            <RefreshCcw className="w-4 h-4 text-slate-400 shrink-0 mt-0.5 animate-spin-slow" />
            <p>
              Notice how the <span className="font-bold text-slate-800">indigo bars</span> get shorter relative to the light bars as time passes. Even if profits grow, their <span className="font-bold text-slate-800">value today</span> is eaten away by the discount rate.
            </p>
          </div>
        </div>

        {/* Right Panel: The "Math Balance" */}
        <div className="bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden shadow-xl min-h-[400px]">
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-32 -mt-32" />
          
          <div className="relative z-10 flex flex-col h-full">
            <div className="mb-8">
              <h4 className="text-indigo-400 text-xs font-bold uppercase tracking-[0.2em] mb-1">Financial Equation</h4>
              <h3 className="text-2xl font-bold font-serif italic tracking-tight">The NPV Calculation</h3>
            </div>

            <div className="space-y-6 flex-grow">
              {/* Cost */}
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <span className="text-slate-400 font-medium">Initial Cost</span>
                <span className="text-rose-400 font-mono font-bold">-${initialInvestment.toFixed(2)}</span>
              </div>

              {/* Combined Future Value */}
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <span className="text-slate-400 font-medium">Sum of All PVs</span>
                <span className="text-indigo-300 font-mono font-bold">+${npvDetails.totalPV.toFixed(2)}</span>
              </div>

              {/* Final Result */}
              <div className="pt-4 flex flex-col items-center justify-center space-y-4">
                <div className="text-xs text-slate-500 uppercase font-bold tracking-widest">Net Present Value (NPV)</div>
                <motion.div 
                  key={npvDetails.npv}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className={`text-6xl font-black font-mono tracking-tighter ${isProfitable ? 'text-emerald-400' : 'text-rose-400'}`}
                >
                  ${npvDetails.npv.toFixed(2)}
                </motion.div>
                
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                  <MathSpan tex="NPV = \sum_{t=1}^{n} \frac{C_t}{(1+r)^t} - I_0" className="text-sm text-slate-400" />
                </div>
              </div>
            </div>

            <div className="mt-auto pt-8">
              <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-xs text-slate-400 leading-relaxed">
                <span className="text-white font-bold block mb-1">Concept Summary:</span>
                "If the NPV is positive, the stand earns more than your bank account would over {timeHorizon} years. If negative, you're better off keeping your money in the bank!"
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
