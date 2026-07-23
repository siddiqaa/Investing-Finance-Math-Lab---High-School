import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Landmark, TrendingUp, Sparkles, Receipt, Coins, ShieldAlert } from 'lucide-react';
import { formatCurrency, formatPercent } from '../utils/mathUtils';

export const BankLab: React.FC = () => {
  const [initialDeposit, setInitialDeposit] = useState<number>(1000); // $1,000 default
  const [bankRate, setBankRate] = useState<number>(0.045); // 4.5% default
  const [years, setYears] = useState<number>(5); // 5 years default
  const [accountType, setAccountType] = useState<'savings' | 'cd'>('cd');

  // Adjust rates automatically when switching account types to make it realistic
  const handleAccountTypeChange = (type: 'savings' | 'cd') => {
    setAccountType(type);
    if (type === 'savings') {
      setBankRate(0.035); // Lower rate for standard high-yield savings
    } else {
      setBankRate(0.05); // Higher rate for locked-in CD
    }
  };

  // Calculations
  const bankFutureValue = initialDeposit * Math.pow(1 + bankRate, years);
  const mattressValue = initialDeposit;
  const opportunityCost = bankFutureValue - mattressValue;

  // Let's create the year-by-year projections for visualization
  const yearlyProjections = [];
  for (let t = 1; t <= years; t++) {
    const bankVal = initialDeposit * Math.pow(1 + bankRate, t);
    yearlyProjections.push({
      year: t,
      bankValue: bankVal,
      mattressValue: initialDeposit,
      interestEarned: bankVal - initialDeposit,
    });
  }

  const maxValForChart = Math.max(bankFutureValue, 100);

  return (
    <div className="space-y-6">
      <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="font-sans font-bold text-slate-800 text-lg flex items-center gap-2">
            <Landmark className="w-5 h-5 text-indigo-600" />
            <span>Bank Savings vs. Mattress Sandbox</span>
          </h3>

          {/* Account selector pills */}
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => handleAccountTypeChange('savings')}
              className={`px-3 py-1.5 rounded-lg text-xs font-sans font-bold transition-all cursor-pointer ${
                accountType === 'savings'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              High-Yield Savings (Flexible)
            </button>
            <button
              onClick={() => handleAccountTypeChange('cd')}
              className={`px-3 py-1.5 rounded-lg text-xs font-sans font-bold transition-all cursor-pointer ${
                accountType === 'cd'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Certificate of Deposit (CD - Locked)
            </button>
          </div>
        </div>

        {/* Sliders layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Initial Deposit */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-sans">
              <span className="text-slate-500 font-semibold">Initial Deposit (PV)</span>
              <span className="font-mono text-indigo-600 font-bold">{formatCurrency(initialDeposit)}</span>
            </div>
            <input
              type="range"
              min="100"
              max="10000"
              step="100"
              value={initialDeposit}
              onChange={(e) => setInitialDeposit(parseInt(e.target.value) || 100)}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>$100</span>
              <span>$10,000</span>
            </div>
          </div>

          {/* Bank Rate r */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-sans">
              <span className="text-slate-500 font-semibold">Bank Interest Rate (r)</span>
              <span className="font-mono text-indigo-600 font-bold">{formatPercent(bankRate)}</span>
            </div>
            <input
              type="range"
              min="0.01"
              max="0.10"
              step="0.001"
              value={bankRate}
              onChange={(e) => setBankRate(parseFloat(e.target.value) || 0.01)}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>1.0%</span>
              <span>10.0%</span>
            </div>
          </div>

          {/* Years n */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-sans">
              <span className="text-slate-500 font-semibold">Time Horizon (Years)</span>
              <span className="font-mono text-indigo-600 font-bold">{years} {years === 1 ? 'Year' : 'Years'}</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              step="1"
              value={years}
              onChange={(e) => setYears(parseInt(e.target.value) || 1)}
              className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>1 Year</span>
              <span>10 Years</span>
            </div>
          </div>
        </div>

        {/* Outputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Bank FV card */}
          <div className="p-4 bg-indigo-50/50 border border-indigo-100 rounded-2xl space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-mono text-indigo-700 font-bold uppercase">
              <TrendingUp className="w-4 h-4 text-indigo-600" />
              <span>Grows at Bank</span>
            </div>
            <div className="font-mono text-xl sm:text-2xl font-black text-slate-900">
              {formatCurrency(bankFutureValue)}
            </div>
            <p className="text-[11px] text-slate-500 font-sans leading-normal">
              Accumulates compound interest at {formatPercent(bankRate)} annually over {years} years.
            </p>
          </div>

          {/* Mattress cash card */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500 font-bold uppercase">
              <Coins className="w-4 h-4 text-slate-400" />
              <span>Mattress Cache</span>
            </div>
            <div className="font-mono text-xl sm:text-2xl font-black text-slate-700">
              {formatCurrency(mattressValue)}
            </div>
            <p className="text-[11px] text-slate-500 font-sans leading-normal">
              Stays flat at 0% interest rate. No compounding, no growth.
            </p>
          </div>

          {/* Opportunity Cost card */}
          <div className="p-4 bg-rose-50/50 border border-rose-100 rounded-2xl space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-mono text-rose-700 font-bold uppercase">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <span>Opportunity Cost</span>
            </div>
            <div className="font-mono text-xl sm:text-2xl font-black text-rose-600">
              {formatCurrency(opportunityCost)}
            </div>
            <p className="text-[11px] text-slate-500 font-sans leading-normal">
              The wealth you missed out on by keeping cash hidden instead of lending it to the bank.
            </p>
          </div>
        </div>

        {/* Visual Growth bar chart */}
        <div className="space-y-3 pt-2">
          <span className="font-mono text-[10px] uppercase text-slate-400 font-extrabold tracking-wider block">Visualizing the Growth Split</span>
          <div className="space-y-4 bg-slate-50 border border-slate-200 p-4 rounded-2xl">
            {/* The Bank Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-sans font-bold text-slate-700">
                <span className="flex items-center gap-1">
                  <Landmark className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Future Value at Bank</span>
                </span>
                <span className="font-mono text-indigo-600">{formatCurrency(bankFutureValue)}</span>
              </div>
              <div className="w-full bg-slate-200 h-6 rounded-lg overflow-hidden flex relative shadow-3xs">
                {/* Principal Portion */}
                <motion.div
                  style={{ width: `${(initialDeposit / maxValForChart) * 100}%` }}
                  className="bg-indigo-600 h-full flex items-center justify-center text-[10px] text-white font-mono font-bold"
                  layout
                >
                  Principal
                </motion.div>
                {/* Interest Portion */}
                <motion.div
                  style={{ width: `${((bankFutureValue - initialDeposit) / maxValForChart) * 100}%` }}
                  className="bg-indigo-400 h-full flex items-center justify-center text-[10px] text-white font-mono font-bold"
                  layout
                >
                  +Interest
                </motion.div>
              </div>
            </div>

            {/* The Mattress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-sans font-bold text-slate-700">
                <span className="flex items-center gap-1">
                  <Coins className="w-3.5 h-3.5 text-slate-500" />
                  <span>Value under Mattress</span>
                </span>
                <span className="font-mono text-slate-500">{formatCurrency(mattressValue)}</span>
              </div>
              <div className="w-full bg-slate-200 h-6 rounded-lg overflow-hidden flex relative shadow-3xs">
                <motion.div
                  style={{ width: `${(initialDeposit / maxValForChart) * 100}%` }}
                  className="bg-slate-400 h-full flex items-center justify-center text-[10px] text-white font-mono font-bold"
                  layout
                >
                  Principal
                </motion.div>
                {/* Empty / Lost Space represent opportunity cost */}
                <motion.div
                  style={{ width: `${(opportunityCost / maxValForChart) * 100}%` }}
                  className="bg-rose-50 border-l border-dashed border-rose-300 h-full flex items-center justify-center text-[10px] text-rose-500 font-mono font-bold"
                  layout
                >
                  Lost Potential
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Year-by-Year Growth Table */}
        <div className="space-y-2 pt-2">
          <span className="font-sans font-bold text-xs text-slate-800 block">Year-by-Year Comparison Table:</span>
          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="min-w-full divide-y divide-slate-200 text-left text-xs font-sans">
              <thead className="bg-slate-50 text-slate-700 font-bold">
                <tr>
                  <th className="px-4 py-2">Year</th>
                  <th className="px-4 py-2">Mattress Balance</th>
                  <th className="px-4 py-2">Bank Balance (CD/Savings)</th>
                  <th className="px-4 py-2">Interest Earned</th>
                  <th className="px-4 py-2 text-rose-600">Opportunity Cost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white font-mono text-slate-600">
                {yearlyProjections.map((p) => (
                  <tr key={p.year} className="hover:bg-slate-50/30">
                    <td className="px-4 py-1.5 font-bold">Year {p.year}</td>
                    <td className="px-4 py-1.5">{formatCurrency(p.mattressValue)}</td>
                    <td className="px-4 py-1.5 font-semibold text-indigo-700">{formatCurrency(p.bankValue)}</td>
                    <td className="px-4 py-1.5 text-indigo-600">+{formatCurrency(p.interestEarned)}</td>
                    <td className="px-4 py-1.5 text-rose-600">-{formatCurrency(p.interestEarned)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
