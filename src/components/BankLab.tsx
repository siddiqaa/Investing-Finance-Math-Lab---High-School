import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  Landmark, 
  TrendingUp, 
  Info, 
  Coins, 
  ShieldAlert,
  LineChart,
  RefreshCcw,
  ChevronRight
} from 'lucide-react';
import { formatCurrency, formatPercent } from '../utils/mathUtils';
import { MathSpan, processMathText } from '../lib/math';

export const BankLab: React.FC = () => {
  const [initialDeposit, setInitialDeposit] = useState<number>(1000);
  const [bankRate, setBankRate] = useState<number>(0.045);
  const [years, setYears] = useState<number>(5);
  const [accountType, setAccountType] = useState<'savings' | 'cd'>('cd');

  const handleAccountTypeChange = (type: 'savings' | 'cd') => {
    setAccountType(type);
    if (type === 'savings') {
      setBankRate(0.035);
    } else {
      setBankRate(0.05);
    }
  };

  // Calculations
  const yearlyProjections = useMemo(() => {
    const projections = [];
    for (let t = 1; t <= years; t++) {
      const bankVal = initialDeposit * Math.pow(1 + bankRate, t);
      projections.push({
        year: t,
        bankValue: bankVal,
        interestEarned: bankVal - initialDeposit,
        principal: initialDeposit
      });
    }
    return projections;
  }, [initialDeposit, bankRate, years]);

  const bankFutureValue = initialDeposit * Math.pow(1 + bankRate, years);
  const mattressValue = initialDeposit;
  const totalInterest = bankFutureValue - mattressValue;

  const maxValForChart = Math.max(bankFutureValue, initialDeposit * 1.2);

  return (
    <div className="flex flex-col space-y-6">
      {/* Header & Concept Intro */}
      <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
              <Landmark className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800">The Opportunity Cost Lab</h3>
              <p className="text-slate-500 text-sm">Compare bank interest against "mattress" storage.</p>
            </div>
          </div>

          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => handleAccountTypeChange('savings')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                accountType === 'savings'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Savings (Flexible)
            </button>
            <button
              onClick={() => handleAccountTypeChange('cd')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                accountType === 'cd'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              CD (Locked)
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              <span>Initial Deposit</span> (<MathSpan tex="P" />)
            </label>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-slate-700">$</span>
              <input 
                type="number"
                value={initialDeposit}
                onChange={(e) => setInitialDeposit(Number(e.target.value))}
                className="w-full bg-transparent text-2xl font-bold text-indigo-600 focus:outline-none"
              />
            </div>
            <p className="text-[10px] text-slate-400 mt-1 uppercase">Principal Amount</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span><span>Annual Interest Rate</span> (<MathSpan tex="r" />)</span>
              <Info className="w-3 h-3 cursor-help text-slate-300" />
            </label>
            <div className="flex items-center gap-2">
              <input 
                type="range"
                min="0.005"
                max="0.10"
                step="0.001"
                value={bankRate}
                onChange={(e) => setBankRate(Number(e.target.value))}
                className="w-full h-2 bg-indigo-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <span className="text-xl font-bold text-indigo-600 min-w-[3.5rem] text-right">{formatPercent(bankRate)}</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1 italic">Growth multiplier per year</p>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg border border-slate-100">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              <span>Years</span> (<MathSpan tex="n" />)
            </label>
            <div className="flex items-center gap-2">
              <input 
                type="range"
                min="1"
                max="10"
                step="1"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-600"
              />
              <span className="text-xl font-bold text-slate-700 min-w-[2rem] text-right">{years}y</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1 uppercase">Investment Length</p>
          </div>
        </div>
      </div>

      {/* Main Simulation Area */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Panel: The Bar Chart Visualizer */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col min-h-[400px]">
          <div className="flex items-center justify-between mb-8">
            <h4 className="font-bold text-slate-700 flex items-center gap-2">
              <LineChart className="w-4 h-4 text-indigo-500" />
              Wealth Growth Over Time
            </h4>
            <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 bg-indigo-500 rounded" />
                <span className="text-indigo-600">Bank (with Interest)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 bg-slate-200 rounded" />
                <span className="text-slate-400">Cash (Principal Only)</span>
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

            {yearlyProjections.map((p) => (
              <div key={p.year} className="flex-grow flex flex-col items-center group relative h-full justify-end px-1">
                {/* Bank Growth Bar (Indigo) */}
                <motion.div 
                  className="w-full bg-indigo-500 rounded-t-sm relative shadow-sm"
                  animate={{ height: `${(p.bankValue / maxValForChart) * 100}%` }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                >
                  {/* Mattress Bar Overlay (Light) - The "Principal" that never grows */}
                  <motion.div 
                    className="absolute bottom-0 left-0 right-0 bg-slate-200 rounded-t-sm"
                    animate={{ height: `${(initialDeposit / p.bankValue) * 100}%` }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  />
                </motion.div>
                
                <div className="mt-2 text-[10px] font-mono font-bold text-slate-400">Y{p.year}</div>

                {/* Tooltip on Hover */}
                <div className="absolute bottom-full mb-2 bg-slate-800 text-white p-2 rounded text-[10px] opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none whitespace-nowrap shadow-xl">
                  <div className="font-bold border-b border-white/10 pb-1 mb-1">Year {p.year} Growth</div>
                  <div>Bank Balance: <span className="text-indigo-300 font-bold">{formatCurrency(p.bankValue)}</span></div>
                  <div>Interest Only: <span className="text-emerald-400">+{formatCurrency(p.interestEarned)}</span></div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-slate-50 rounded-xl text-xs text-slate-500 italic flex gap-3">
            <RefreshCcw className="w-4 h-4 text-slate-400 shrink-0 mt-0.5 animate-spin-slow" />
            <p>
              The <span className="font-bold text-slate-800">indigo gap</span> above the gray bars represents your compound interest. Notice how it grows wider each year as interest begins to earn interest on itself.
            </p>
          </div>
        </div>

        {/* Right Panel: The Opportunity Cost Balance */}
        <div className="bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden shadow-xl flex flex-col h-full">
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -mr-32 -mt-32" />
          
          <div className="relative z-10 flex flex-col h-full">
            <div className="mb-8">
              <h4 className="text-indigo-400 text-xs font-bold uppercase tracking-[0.2em] mb-1">Wealth Analysis</h4>
              <h3 className="text-2xl font-bold font-serif italic tracking-tight">The Growth Gap</h3>
            </div>

            <div className="space-y-6 flex-grow">
              {/* Mattress Value */}
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <span className="text-slate-400 font-medium flex items-center gap-2">
                  <Coins className="w-4 h-4" />
                  Cash Under Mattress
                </span>
                <span className="text-slate-300 font-mono font-bold">{formatCurrency(mattressValue)}</span>
              </div>

              {/* Interest Earned */}
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <span className="text-slate-400 font-medium flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Total Compound Interest
                </span>
                <span className="text-indigo-300 font-mono font-bold">+{formatCurrency(totalInterest)}</span>
              </div>

              {/* Opportunity Cost */}
              <div className="pt-4 flex flex-col items-center justify-center space-y-4">
                <div className="text-xs text-rose-400 uppercase font-bold tracking-widest flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4" />
                  Opportunity Cost (Lost Wealth)
                </div>
                <motion.div 
                  key={totalInterest}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-6xl font-black font-mono tracking-tighter text-rose-400"
                >
                  {formatCurrency(totalInterest)}
                </motion.div>
                
                <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
                  <MathSpan tex={`A = P(1+r)^n = ${initialDeposit}(1 + ${bankRate})^{${years}}`} className="text-xs text-slate-400" />
                </div>
              </div>
            </div>

            <div className="mt-auto pt-8">
              <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-xs text-slate-400 leading-relaxed">
                <span className="text-white font-bold block mb-1">Economics Lesson:</span>
                "By keeping {formatCurrency(initialDeposit)} in cash, you are effectively 'paying' {formatCurrency(totalInterest)} for the safety of having physical bills. That is your <span className="font-bold text-white">Opportunity Cost</span>."
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Year-by-Year Table - Preserved but styled better */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <h4 className="font-bold text-slate-700 text-sm">Detailed Compound Schedule</h4>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Growth Matrix</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] font-black uppercase tracking-widest text-slate-400 border-b border-slate-100">
                <th className="px-6 py-4">Year</th>
                <th className="px-6 py-4">Principal</th>
                <th className="px-6 py-4">Bank Balance</th>
                <th className="px-6 py-4">Total Interest</th>
                <th className="px-6 py-4 text-right">Yield Multiplier</th>
              </tr>
            </thead>
            <tbody className="text-sm font-mono text-slate-600">
              {yearlyProjections.map((p) => (
                <tr key={p.year} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-400">Year {p.year}</td>
                  <td className="px-6 py-4">{formatCurrency(p.principal)}</td>
                  <td className="px-6 py-4 font-bold text-indigo-600">{formatCurrency(p.bankValue)}</td>
                  <td className="px-6 py-4 text-emerald-600">+{formatCurrency(p.interestEarned)}</td>
                  <td className="px-6 py-4 text-right text-slate-300">
                    x{Math.pow(1 + bankRate, p.year).toFixed(3)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

