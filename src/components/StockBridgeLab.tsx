import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  Landmark, 
  LineChart, 
  Coins, 
  Zap, 
  HelpCircle, 
  Briefcase, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { formatCurrency, formatPercent } from '../utils/mathUtils';

export const StockBridgeLab: React.FC = () => {
  const [deposit, setDeposit] = useState<number>(1000); // $1,000 default
  const [bankRate, setBankRate] = useState<number>(0.04); // 4% default
  const [stockRate, setStockRate] = useState<number>(0.09); // 9% default
  const [years, setYears] = useState<number>(15); // 15 years default
  const [activeTab, setActiveTab] = useState<'comparison' | 'scenario'>('comparison');

  // Fast calculations
  const bankFV = deposit * Math.pow(1 + bankRate, years);
  const stockFV = deposit * Math.pow(1 + stockRate, years);
  const wealthGap = stockFV - bankFV;

  // Yearly projections for tables and dynamic charts
  const projections = [];
  for (let t = 1; t <= years; t++) {
    const bValue = deposit * Math.pow(1 + bankRate, t);
    const sValue = deposit * Math.pow(1 + stockRate, t);
    projections.push({
      year: t,
      bankValue: bValue,
      stockValue: sValue,
      gap: sValue - bValue,
    });
  }

  const maxChartValue = Math.max(stockFV, bankFV, 100);

  // Pre-configured real-world scenario helpers
  const applyScenario = (dep: number, bR: number, sR: number, yrs: number) => {
    setDeposit(dep);
    setBankRate(bR);
    setStockRate(sR);
    setYears(yrs);
  };

  return (
    <div className="space-y-6">
      {/* Parameter sandbox container */}
      <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="space-y-0.5">
            <h3 className="font-sans font-bold text-slate-800 text-lg flex items-center gap-2">
              <LineChart className="w-5 h-5 text-indigo-600" />
              <span>The Compounding Spread Lab</span>
            </h3>
            <p className="text-slate-500 text-xs font-sans">
              Compare how compound interest accumulates when you choose productive business ownership over standard bank lending.
            </p>
          </div>

          {/* Quick preset tabs */}
          <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-sans">
            <button
              onClick={() => setActiveTab('comparison')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeTab === 'comparison'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Manual Sliders
            </button>
            <button
              onClick={() => setActiveTab('scenario')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeTab === 'scenario'
                  ? 'bg-white text-indigo-700 shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Real Presets
            </button>
          </div>
        </div>

        {/* Dynamic Parameter adjustment view */}
        {activeTab === 'comparison' ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Deposit Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-sans">
                <span className="text-slate-500 font-semibold flex items-center gap-1">
                  <Coins className="w-3.5 h-3.5 text-slate-400" />
                  <span>Principal (PV)</span>
                </span>
                <span className="font-mono text-indigo-600 font-bold">{formatCurrency(deposit)}</span>
              </div>
              <input
                type="range"
                min="100"
                max="5000"
                step="100"
                value={deposit}
                onChange={(e) => setDeposit(parseInt(e.target.value) || 100)}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>$100</span>
                <span>$5,000</span>
              </div>
            </div>

            {/* Bank Rate Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-sans">
                <span className="text-slate-500 font-semibold flex items-center gap-1">
                  <Landmark className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Bank Rate (r_bank)</span>
                </span>
                <span className="font-mono text-indigo-600 font-bold">{formatPercent(bankRate)}</span>
              </div>
              <input
                type="range"
                min="0.01"
                max="0.06"
                step="0.001"
                value={bankRate}
                onChange={(e) => setBankRate(parseFloat(e.target.value) || 0.01)}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>1.0%</span>
                <span>6.0%</span>
              </div>
            </div>

            {/* Stock Rate Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-sans">
                <span className="text-slate-500 font-semibold flex items-center gap-1">
                  <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Stock Return (r_stock)</span>
                </span>
                <span className="font-mono text-indigo-600 font-bold">{formatPercent(stockRate)}</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.15"
                step="0.005"
                value={stockRate}
                onChange={(e) => setStockRate(parseFloat(e.target.value) || 0.05)}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>5.0%</span>
                <span>15.0%</span>
              </div>
            </div>

            {/* Time Horizon Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-sans">
                <span className="text-slate-500 font-semibold flex items-center gap-1">
                  <span>Investment Years</span>
                </span>
                <span className="font-mono text-indigo-600 font-bold">{years} Years</span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                step="1"
                value={years}
                onChange={(e) => setYears(parseInt(e.target.value) || 1)}
                className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>1 Year</span>
                <span>30 Years</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3 font-sans">
            <span className="text-xs text-slate-400 font-mono uppercase font-bold tracking-wider block">Choose a Realistic Milestone Scenario:</span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => applyScenario(1000, 0.035, 0.09, 10)}
                className="p-3 bg-slate-50 border border-slate-200 hover:border-indigo-400 rounded-xl text-left transition-all group cursor-pointer"
              >
                <div className="font-bold text-slate-800 text-xs sm:text-sm group-hover:text-indigo-700 flex items-center justify-between">
                  <span>🎓 College Book Fund</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-600" />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  $1,000 invested for 10 years. Compare standard savings (3.5%) vs. stock market index historical returns (9%).
                </p>
              </button>

              <button
                onClick={() => applyScenario(500, 0.04, 0.10, 20)}
                className="p-3 bg-slate-50 border border-slate-200 hover:border-indigo-400 rounded-xl text-left transition-all group cursor-pointer"
              >
                <div className="font-bold text-slate-800 text-xs sm:text-sm group-hover:text-indigo-700 flex items-center justify-between">
                  <span>🚗 First Car Budget</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-600" />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  $500 compound over 20 years. Illustrates the profound compound spread difference over a long horizon.
                </p>
              </button>

              <button
                onClick={() => applyScenario(2000, 0.045, 0.095, 30)}
                className="p-3 bg-slate-50 border border-slate-200 hover:border-indigo-400 rounded-xl text-left transition-all group cursor-pointer"
              >
                <div className="font-bold text-slate-800 text-xs sm:text-sm group-hover:text-indigo-700 flex items-center justify-between">
                  <span>🏡 Future Nest Egg</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-600" />
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  $2,000 initial nest-egg left untouched for 30 years. See how a 5.0% compound spread creates huge gaps.
                </p>
              </button>
            </div>
          </div>
        )}

        {/* Result summary dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Bank Side */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-mono text-slate-500 font-bold uppercase">
              <Landmark className="w-4 h-4 text-slate-400" />
              <span>Safe Bank Savings</span>
            </div>
            <div className="font-mono text-xl sm:text-2xl font-black text-slate-700">
              {formatCurrency(bankFV)}
            </div>
            <p className="text-[11px] text-slate-500 font-sans leading-normal">
              Slow but steady. Earning a guaranteed {formatPercent(bankRate)} return. No downside, but low upside.
            </p>
          </div>

          {/* Stock Side */}
          <div className="p-4 bg-indigo-50/50 border border-indigo-100 rounded-2xl space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-mono text-indigo-700 font-bold uppercase">
              <TrendingUp className="w-4 h-4 text-indigo-600" />
              <span>Business Ownership (Stock)</span>
            </div>
            <div className="font-mono text-xl sm:text-2xl font-black text-indigo-900">
              {formatCurrency(stockFV)}
            </div>
            <p className="text-[11px] text-slate-500 font-sans leading-normal">
              Active compounding. Earning an average of {formatPercent(stockRate)} by sharing in business productivity.
            </p>
          </div>

          {/* Compounding Gap */}
          <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-2xl space-y-1 relative overflow-hidden">
            <div className="absolute right-0 top-0 translate-x-3 -translate-y-3 w-16 h-16 bg-emerald-500/10 rounded-full blur-xl" />
            <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-700 font-bold uppercase">
              <Zap className="w-4 h-4 text-emerald-600" />
              <span>Ownership Premium</span>
            </div>
            <div className="font-mono text-xl sm:text-2xl font-black text-emerald-700">
              +{formatCurrency(wealthGap)}
            </div>
            <p className="text-[11px] text-slate-500 font-sans leading-normal">
              The **extra compounding wealth** generated by choosing business growth over bank lending.
            </p>
          </div>
        </div>

        {/* Visual Dynamic Stacked Bar Chart */}
        <div className="space-y-3 pt-2">
          <span className="font-mono text-[10px] uppercase text-slate-400 font-extrabold tracking-wider block">Visualizing the Gap Expansion</span>
          <div className="bg-slate-50 border border-slate-200 p-4 sm:p-6 rounded-2xl space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-sans font-bold text-slate-700">
                <span className="flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Business Ownership Portfolio (Stocks)</span>
                </span>
                <span className="font-mono text-indigo-600">{formatCurrency(stockFV)}</span>
              </div>
              <div className="w-full bg-slate-200 h-8 rounded-xl overflow-hidden flex relative shadow-3xs border border-slate-300">
                {/* Principal */}
                <motion.div
                  style={{ width: `${(deposit / maxChartValue) * 100}%` }}
                  className="bg-indigo-600 h-full flex items-center justify-center text-[10px] text-white font-mono font-bold"
                  layout
                >
                  Principal
                </motion.div>
                {/* Bank Growth */}
                <motion.div
                  style={{ width: `${((bankFV - deposit) / maxChartValue) * 100}%` }}
                  className="bg-indigo-400 h-full flex items-center justify-center text-[10px] text-white font-mono font-bold"
                  layout
                >
                  Bank Growth
                </motion.div>
                {/* Premium Growth */}
                <motion.div
                  style={{ width: `${(wealthGap / maxChartValue) * 100}%` }}
                  className="bg-emerald-500 h-full flex items-center justify-center text-[10px] text-white font-mono font-bold"
                  layout
                >
                  Ownership Premium (+{formatPercent((stockRate - bankRate))})
                </motion.div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs font-sans font-bold text-slate-700">
                <span className="flex items-center gap-1">
                  <Landmark className="w-3.5 h-3.5 text-slate-500" />
                  <span>Safe Bank Savings Account</span>
                </span>
                <span className="font-mono text-slate-500">{formatCurrency(bankFV)}</span>
              </div>
              <div className="w-full bg-slate-200 h-8 rounded-xl overflow-hidden flex relative shadow-3xs border border-slate-300">
                <motion.div
                  style={{ width: `${(deposit / maxChartValue) * 100}%` }}
                  className="bg-slate-400 h-full flex items-center justify-center text-[10px] text-white font-mono font-bold"
                  layout
                >
                  Principal
                </motion.div>
                <motion.div
                  style={{ width: `${((bankFV - deposit) / maxChartValue) * 100}%` }}
                  className="bg-indigo-400/80 h-full flex items-center justify-center text-[10px] text-white font-mono font-bold"
                  layout
                >
                  Bank Growth
                </motion.div>
                {/* Empty Lost space */}
                <motion.div
                  style={{ width: `${(wealthGap / maxChartValue) * 100}%` }}
                  className="bg-rose-50 border-l border-dashed border-rose-300 h-full flex items-center justify-center text-[10px] text-rose-500 font-mono font-bold"
                  layout
                >
                  Lost Opportunity
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* High Schooler Tips */}
        <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-3 font-sans">
          <h4 className="font-sans font-bold text-slate-800 text-xs sm:text-sm flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-indigo-600" />
            <span>High Schooler Insight: Risk and Reward</span>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-600 leading-relaxed">
            <div className="space-y-1">
              <span className="font-bold text-slate-800 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Why not put everything in stocks?</span>
              </span>
              <p>
                Stocks go up and down in the short term. If you need your money next month to buy a computer, keep it safe in the bank. Stocks are for money you don't need for 5, 10, or 20 years!
              </p>
            </div>
            <div className="space-y-1">
              <span className="font-bold text-slate-800 flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-indigo-600" />
                <span>The Magic of starting young:</span>
              </span>
              <p>
                As a teenager or young adult, your biggest financial asset isn't money—it is **time**. Having 30 or 40 years of compounding ahead of you means even small savings in stocks can turn into huge sums.
              </p>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="space-y-2 pt-2">
          <span className="font-sans font-bold text-xs text-slate-800 block">Year-by-Year Compounding Bridge:</span>
          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="min-w-full divide-y divide-slate-200 text-left text-xs font-sans">
              <thead className="bg-slate-50 text-slate-700 font-bold">
                <tr>
                  <th className="px-4 py-2">Year</th>
                  <th className="px-4 py-2">Bank Savings ({formatPercent(bankRate)})</th>
                  <th className="px-4 py-2">Stock Market ({formatPercent(stockRate)})</th>
                  <th className="px-4 py-2 text-emerald-700">Compound Wealth Gap</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white font-mono text-slate-600">
                {projections.filter((_, idx) => idx === 0 || (idx + 1) % 5 === 0 || idx === years - 1).map((p) => (
                  <tr key={p.year} className="hover:bg-slate-50/30">
                    <td className="px-4 py-2 font-bold font-sans">Year {p.year}</td>
                    <td className="px-4 py-2">{formatCurrency(p.bankValue)}</td>
                    <td className="px-4 py-2 text-indigo-700 font-semibold">{formatCurrency(p.stockValue)}</td>
                    <td className="px-4 py-2 text-emerald-700 font-bold">+{formatCurrency(p.gap)}</td>
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
