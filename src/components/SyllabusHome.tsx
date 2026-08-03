import { motion } from 'motion/react';
import { ChevronsRight, Sigma, TrendingUp, Sparkles, Zap, GraduationCap } from 'lucide-react';
import { PdfExportButton } from './PdfExportButton';

interface SyllabusHomeProps {
  setActiveModule: (module: string) => void;
}

export function SyllabusHome({ setActiveModule }: SyllabusHomeProps) {
  return (
    <motion.div
      key="syllabus-home"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.2 }}
      className="space-y-6"
    >
      {/* Visual Banner */}
      <div className="p-7 bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 text-white rounded-3xl relative overflow-hidden shadow-sm border border-indigo-950">
        <div className="relative z-10 space-y-3 max-w-2xl">
          <span className="font-mono text-indigo-400 text-xs uppercase tracking-wider font-bold">
            STUDY SYLLABUS — HIGH SCHOOL ALGEBRA LEVEL
          </span>
          <h2 className="font-sans font-extrabold text-2xl sm:text-3xl tracking-tight leading-tight">
            Mathematics of Investing & Financial Markets
          </h2>
          <p className="font-sans text-xs sm:text-sm text-indigo-100/80 leading-relaxed">
            An engaging overview designed specifically for high schoolers and families to investigate stock valuations, compound growth, risk diversification, market randomness, and option payouts side-by-side using algebra and real simulation labs.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => setActiveModule('compounding')}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold font-mono rounded-xl transition-all shadow shadow-indigo-950 cursor-pointer"
              id="start-syllabus-button"
            >
              Launch Lesson 1: Compound & Growth
            </button>
            <PdfExportButton />
          </div>
        </div>

        {/* Decorative background visual grids */}
        <div className="absolute right-0 bottom-0 opacity-15 pointer-events-none transform translate-y-12 translate-x-12 select-none font-mono text-[92px] leading-none font-bold select-all">
          A=P(1+r)ⁿ
        </div>
      </div>

      {/* Featured Daily Morning Refresh Banner */}
      <div className="p-5 bg-gradient-to-r from-amber-500/10 via-indigo-50/50 to-slate-50 border border-amber-200/80 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="bg-amber-100 text-amber-900 border border-amber-300/80 text-[10px] font-mono font-extrabold uppercase px-2 py-0.5 rounded-md flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-600" />
              <span>Daily Morning Refresh</span>
            </span>
            <span className="text-xs font-mono text-slate-500 font-semibold">38 Collated Exercises</span>
          </div>
          <h3 className="font-sans font-bold text-slate-900 text-base">
            Comprehensive Review Quiz Unit
          </h3>
          <p className="font-sans text-xs text-slate-600 max-w-xl">
            Collate and review exercises from every single unit (Units 1–8, Bonus Units A–C, and Side Quests). Practice daily retrieval with randomized warm-up sets and direct links back to unit lessons.
          </p>
        </div>

        <button
          onClick={() => setActiveModule('comprehensiveQuiz')}
          className="px-4 py-2.5 bg-slate-950 hover:bg-slate-800 text-amber-300 font-mono text-xs font-bold rounded-xl transition-all flex items-center space-x-2 shadow-sm cursor-pointer whitespace-nowrap self-stretch sm:self-auto justify-center"
          id="btn-nav-comprehensive-quiz-home"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Launch Comprehensive Quiz →</span>
        </button>
      </div>

      {/* Core Syllabus Chapters overview */}
      <div className="space-y-4">
        <h3 className="font-sans font-bold text-slate-800 text-base pl-1 flex items-center space-x-1.5">
          <span>Course Curriculum Roadmap</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Unit 1 */}
          <div className="bg-white border border-purple-200 hover:border-purple-300 transition-colors rounded-2xl p-5 space-y-3">
            <div className="flex justify-between items-start">
              <span className="font-mono text-xs font-bold text-slate-400 block uppercase">Unit 1</span>
              <span className="bg-purple-50 text-purple-800 text-[10px] font-mono px-2 py-0.5 rounded font-semibold">Exponents & Percentages</span>
            </div>
            <h4 className="font-sans font-bold text-slate-800 text-sm">
              Time Value of Money & Compound Growth
            </h4>
            <p className="text-slate-500 text-xs font-sans leading-relaxed">
              Learn how money grows using exponents: A = P(1 + r)ⁿ. Work backwards to find Present Value, and analyze cash flow streams via Net Present Value (NPV).
            </p>
            <button
              onClick={() => setActiveModule('compounding')}
              className="text-xs text-indigo-600 font-sans font-bold hover:text-indigo-800 flex items-center space-x-1 border border-indigo-100 hover:border-indigo-200 px-2.5 py-1.5 rounded-lg bg-indigo-50/20 transition-all cursor-pointer"
              id="btn-nav-unit-1"
            >
              <span>Open Topic Lab & Challenge</span>
              <ChevronsRight className="w-3 h-3" />
            </button>
          </div>

          {/* Unit 2 */}
          <div className="bg-white border border-purple-200 hover:border-purple-300 transition-colors rounded-2xl p-5 space-y-3">
            <div className="flex justify-between items-start">
              <span className="font-mono text-xs font-bold text-slate-400 block uppercase">Unit 2</span>
              <span className="bg-indigo-50 text-indigo-700 text-[10px] font-mono px-2 py-0.5 rounded">Savings & Opportunity Cost</span>
            </div>
            <h4 className="font-sans font-bold text-slate-800 text-sm">
              Selecting the Rate (r) in Practice
            </h4>
            <p className="text-slate-500 text-xs font-sans leading-relaxed">
              Understand where the rate r comes from. Explore bank savings accounts, locked Certificates of Deposit (CDs), and how they set a safe baseline for opportunity costs.
            </p>
            <button
              onClick={() => setActiveModule('rateSelection')}
              className="text-xs text-indigo-600 font-sans font-bold hover:text-indigo-800 flex items-center space-x-1 border border-indigo-100 hover:border-indigo-200 px-2.5 py-1.5 rounded-lg bg-indigo-50/20 transition-all cursor-pointer"
              id="btn-nav-unit-2"
            >
              <span>Open Topic Lab & Challenge</span>
              <ChevronsRight className="w-3 h-3" />
            </button>
          </div>

          {/* Unit 3 */}
          <div className="bg-white border border-purple-200 hover:border-purple-300 transition-colors rounded-2xl p-5 space-y-3">
            <div className="flex justify-between items-start">
              <span className="font-mono text-xs font-bold text-slate-400 block uppercase">Unit 3</span>
              <span className="bg-emerald-50 text-emerald-700 text-[10px] font-mono px-2 py-0.5 rounded">Fractional Ownership</span>
            </div>
            <h4 className="font-sans font-bold text-slate-800 text-sm">
              Bridging to Stocks: Why Own Businesses?
            </h4>
            <p className="text-slate-500 text-xs font-sans leading-relaxed">
              Learn how buying shares represents fractional ownership of a business. Understand why equity growth beats passive bank saving, laying the groundwork for stock valuation.
            </p>
            <button
              onClick={() => setActiveModule('stockBridge')}
              className="text-xs text-indigo-600 font-sans font-bold hover:text-indigo-800 flex items-center space-x-1 border border-indigo-100 hover:border-indigo-200 px-2.5 py-1.5 rounded-lg bg-indigo-50/20 transition-all cursor-pointer"
              id="btn-nav-unit-3"
            >
              <span>Open Topic Lab & Challenge</span>
              <ChevronsRight className="w-3 h-3" />
            </button>
          </div>

          {/* Unit 3.5 */}
          <div className="bg-white border border-purple-200 hover:border-purple-300 transition-colors rounded-2xl p-5 space-y-3">
            <div className="flex justify-between items-start">
              <span className="font-mono text-xs font-bold text-slate-400 block uppercase">Unit 3.5</span>
              <span className="bg-sky-50 text-sky-700 text-[10px] font-mono px-2 py-0.5 rounded">Zero-Growth DDM</span>
            </div>
            <h4 className="font-sans font-bold text-slate-800 text-sm">
              Stock Valuation Without Growth (Zero-Growth Dividend Discount Model — DDM)
            </h4>
            <p className="text-slate-500 text-xs font-sans leading-relaxed">
              Master the foundational zero-growth perpetuity formula P_0 = D / r for constant cash dividends, preferred stock, and discount rate inversion before adding growth.
            </p>
            <button
              onClick={() => setActiveModule('flatValuation')}
              className="text-xs text-indigo-600 font-sans font-bold hover:text-indigo-800 flex items-center space-x-1 border border-indigo-100 hover:border-indigo-200 px-2.5 py-1.5 rounded-lg bg-indigo-50/20 transition-all cursor-pointer"
              id="btn-nav-unit-3-5"
            >
              <span>Open Topic Lab & Challenge</span>
              <ChevronsRight className="w-3 h-3" />
            </button>
          </div>

          {/* Unit 4 */}
          <div className="bg-white border border-purple-200 hover:border-purple-300 transition-colors rounded-2xl p-5 space-y-3">
            <div className="flex justify-between items-start">
              <span className="font-mono text-xs font-bold text-slate-400 block uppercase">Unit 4</span>
              <span className="bg-amber-50 text-amber-700 text-[10px] font-mono px-2 py-0.5 rounded">Dividend Discount Perpetuities</span>
            </div>
            <h4 className="font-sans font-bold text-slate-800 text-sm">
              Stock Price Valuation & Infinite Growth
            </h4>
            <p className="text-slate-500 text-xs font-sans leading-relaxed">
              Explore the algebra of perpetual growing dividends, discover infinite geometric series convergence, and understand the highly sensitive r - g denominator.
            </p>
            <button
              onClick={() => setActiveModule('valuation')}
              className="text-xs text-indigo-600 font-sans font-bold hover:text-indigo-800 flex items-center space-x-1 border border-indigo-100 hover:border-indigo-200 px-2.5 py-1.5 rounded-lg bg-indigo-50/20 transition-all cursor-pointer"
              id="btn-nav-unit-4"
            >
              <span>Open Topic Lab & Challenge</span>
              <ChevronsRight className="w-3 h-3" />
            </button>
          </div>

          {/* Unit 5 */}
          <div className="bg-white border border-purple-200 hover:border-purple-300 transition-colors rounded-2xl p-5 space-y-3">
            <div className="flex justify-between items-start">
              <span className="font-mono text-xs font-bold text-slate-400 block uppercase">Unit 5</span>
              <span className="bg-rose-50 text-rose-700 text-[10px] font-mono px-2 py-0.5 rounded">Information & Catalyst Shocks</span>
            </div>
            <h4 className="font-sans font-bold text-slate-800 text-sm">
              The News Catalyst: Why Stock Prices Wiggle
            </h4>
            <p className="text-slate-500 text-xs font-sans leading-relaxed">
              Learn how unexpected news shifts future growth (g) and risk (r) expectations instantly, creating price discovery jumps that turn smooth mathematical formulas into random market paths.
            </p>
            <button
              onClick={() => setActiveModule('newsBridge')}
              className="text-xs text-indigo-600 font-sans font-bold hover:text-indigo-800 flex items-center space-x-1 border border-indigo-100 hover:border-indigo-200 px-2.5 py-1.5 rounded-lg bg-indigo-50/20 transition-all cursor-pointer"
              id="btn-nav-unit-5"
            >
              <span>Open Topic Lab & Challenge</span>
              <ChevronsRight className="w-3 h-3" />
            </button>
          </div>

          {/* Unit 5R */}
          <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white border border-purple-700/80 rounded-2xl p-5 space-y-3 shadow-sm md:col-span-2">
            <div className="flex justify-between items-start">
              <span className="font-mono text-xs font-bold text-indigo-300 block uppercase">Unit 5R • Topic Review Unit</span>
              <span className="bg-indigo-500/20 text-indigo-200 border border-indigo-400/30 text-[10px] font-mono px-2 py-0.5 rounded">Units 1–5 Test Prep</span>
            </div>
            <h4 className="font-sans font-bold text-white text-base">
              Gordon Growth Model Foundation Review (Units 1–5 Summary)
            </h4>
            <p className="text-indigo-100/80 text-xs font-sans leading-relaxed">
              A comprehensive study guide summarizing the mathematical progression from basic TVM (PV, NPV), discount rates (r), equity bridging, zero-growth perpetuities (P₀ = D/r), Gordon Growth (P₀ = D₁ / (r - g)), and expectation news shocks (Δg, Δr).
            </p>
            <button
              onClick={() => setActiveModule('unit5R')}
              className="text-xs text-indigo-200 font-sans font-bold hover:text-white flex items-center space-x-1 border border-indigo-400/40 hover:border-indigo-300 px-3 py-1.5 rounded-lg bg-indigo-600/30 transition-all cursor-pointer"
              id="btn-nav-unit-5r"
            >
              <span>Open Unit 5R Test Prep Review</span>
              <ChevronsRight className="w-3 h-3" />
            </button>
          </div>

          {/* Unit 6 */}
          <div className="bg-white border border-purple-200 hover:border-purple-300 transition-colors rounded-2xl p-5 space-y-3">
            <div className="flex justify-between items-start">
              <span className="font-mono text-xs font-bold text-slate-400 block uppercase">Unit 6</span>
              <span className="bg-purple-50 text-purple-800 text-[10px] font-mono px-2 py-0.5 rounded font-semibold">Daily Compounding & Random Walks</span>
            </div>
            <h4 className="font-sans font-bold text-slate-800 text-sm">
              Stock Prices & Random Walks
            </h4>
            <p className="text-slate-500 text-xs font-sans leading-relaxed">
              Bridge Unit 1 compounding and Unit 5 news shocks into daily market math. Master percentage loss asymmetry $(1+x)(1-x) = 1-x^2$, random walks, and volatility drag.
            </p>
            <button
              onClick={() => setActiveModule('stochastic')}
              className="text-xs text-purple-700 font-sans font-bold hover:text-purple-900 flex items-center space-x-1 border border-purple-200 hover:border-purple-300 px-2.5 py-1.5 rounded-lg bg-purple-50/50 transition-all cursor-pointer"
              id="btn-nav-unit-6"
            >
              <span>Open Topic Lab & Challenge</span>
              <ChevronsRight className="w-3 h-3" />
            </button>
          </div>

          {/* Unit 7 */}
          <div className="bg-white border border-purple-200 hover:border-purple-300 transition-colors rounded-2xl p-5 space-y-3">
            <div className="flex justify-between items-start">
              <span className="font-mono text-xs font-bold text-slate-400 block uppercase">Unit 7</span>
              <span className="bg-purple-50 text-purple-800 text-[10px] font-mono px-2 py-0.5 rounded font-semibold">Risk Reduction & Averages</span>
            </div>
            <h4 className="font-sans font-bold text-slate-800 text-sm">
              Portfolio Diversification & Risk
            </h4>
            <p className="text-slate-500 text-xs font-sans leading-relaxed">
              Calculate average expected return. Learn how low correlation lowers risk. Explore the Efficient Frontier, Sharpe Ratio, and the market risk scorer Beta.
            </p>
            <button
              onClick={() => setActiveModule('portfolio')}
              className="text-xs text-indigo-600 font-sans font-bold hover:text-indigo-800 flex items-center space-x-1 border border-indigo-100 hover:border-indigo-200 px-2.5 py-1.5 rounded-lg bg-indigo-50/20 transition-all cursor-pointer"
              id="btn-nav-unit-7"
            >
              <span>Open Topic Lab & Challenge</span>
              <ChevronsRight className="w-3 h-3" />
            </button>
          </div>

          {/* Unit 8 */}
          <div className="bg-white border border-purple-200 hover:border-purple-300 transition-colors rounded-2xl p-5 space-y-3">
            <div className="flex justify-between items-start">
              <span className="font-mono text-xs font-bold text-slate-400 block uppercase">Unit 8</span>
              <span className="bg-purple-50 text-purple-700 text-[10px] font-mono px-2 py-0.5 rounded">Retail Behavior & Irrationality</span>
            </div>
            <h4 className="font-sans font-bold text-slate-800 text-sm">
              Behavioral Finance & Limits of Math Signals
            </h4>
            <p className="text-slate-500 text-xs font-sans leading-relaxed">
              Investigate the limits of classical mathematical equilibrium models. Discover how positive feedback, information cascades, prospect theory utility and cost of carry curves explain bubbles, momentum, and crashes.
            </p>
            <button
              onClick={() => setActiveModule('behavioral')}
              className="text-xs text-indigo-600 font-sans font-bold hover:text-indigo-800 flex items-center space-x-1 border border-indigo-100 hover:border-indigo-200 px-2.5 py-1.5 rounded-lg bg-indigo-50/20 transition-all cursor-pointer"
              id="btn-nav-unit-8"
            >
              <span>Open Topic Lab & Challenge</span>
              <ChevronsRight className="w-3 h-3" />
            </button>
          </div>

          {/* Bonus Unit A */}
          <div className="bg-white border border-indigo-200 hover:border-indigo-300 transition-colors rounded-2xl p-5 space-y-3 bg-gradient-to-br from-white to-indigo-50/20">
            <div className="flex justify-between items-start">
              <span className="font-mono text-xs font-bold text-indigo-600 block uppercase">Bonus Unit A</span>
              <span className="bg-indigo-100 text-indigo-800 text-[10px] font-mono px-2 py-0.5 rounded font-bold">Options & Payoffs</span>
            </div>
            <h4 className="font-sans font-bold text-slate-800 text-sm">
              Options & The Price of a Guarantee
            </h4>
            <p className="text-slate-500 text-xs font-sans leading-relaxed">
              Understand Call and Put options and payoff inequalities at expiration. Discover the five pricing inputs, no-arbitrage reasoning, and English "Greeks" limits.
            </p>
            <button
              onClick={() => setActiveModule('options')}
              className="text-xs text-indigo-600 font-sans font-bold hover:text-indigo-800 flex items-center space-x-1 border border-indigo-200 hover:border-indigo-300 px-2.5 py-1.5 rounded-lg bg-indigo-50 transition-all cursor-pointer"
              id="btn-nav-bonus-unit-a"
            >
              <span>Open Topic Lab & Challenge</span>
              <ChevronsRight className="w-3 h-3" />
            </button>
          </div>

          {/* Bonus Unit B */}
          <div className="bg-white border border-indigo-200 hover:border-indigo-300 transition-colors rounded-2xl p-5 space-y-3 bg-gradient-to-br from-white to-indigo-50/20">
            <div className="flex justify-between items-start">
              <span className="font-mono text-xs font-bold text-indigo-600 block uppercase">Bonus Unit B</span>
              <span className="bg-indigo-100 text-indigo-800 text-[10px] font-mono px-2 py-0.5 rounded font-bold">Amortization & Car Ownership</span>
            </div>
            <h4 className="font-sans font-bold text-slate-800 text-sm">
              Auto Loans & Total Cost of Ownership
            </h4>
            <p className="text-slate-500 text-xs font-sans leading-relaxed">
              Master car loan amortization algebra PMT = P · r(1+r)ⁿ / ((1+r)ⁿ - 1). Calculate interest vs. principal decay and model Total Cost of Ownership (TCO) comparing Gas (ICE) vs. Electric (EV) vehicles.
            </p>
            <button
              onClick={() => setActiveModule('amortization')}
              className="text-xs text-indigo-600 font-sans font-bold hover:text-indigo-800 flex items-center space-x-1 border border-indigo-200 hover:border-indigo-300 px-2.5 py-1.5 rounded-lg bg-indigo-50 transition-all cursor-pointer"
              id="btn-nav-bonus-unit-b"
            >
              <span>Open Topic Lab & Challenge</span>
              <ChevronsRight className="w-3 h-3" />
            </button>
          </div>

          {/* Bonus Unit C */}
          <div className="bg-white border border-indigo-200 hover:border-indigo-300 transition-colors rounded-2xl p-5 space-y-3 bg-gradient-to-br from-white to-indigo-50/20">
            <div className="flex justify-between items-start">
              <span className="font-mono text-xs font-bold text-indigo-600 block uppercase">Bonus Unit C</span>
              <span className="bg-indigo-100 text-indigo-800 text-[10px] font-mono px-2 py-0.5 rounded font-bold">Mortgage Math & Equity</span>
            </div>
            <h4 className="font-sans font-bold text-slate-800 text-sm">
              Mortgages & Total Cost of Homeownership
            </h4>
            <p className="text-slate-500 text-xs font-sans leading-relaxed">
              Master 15-year and 30-year home mortgage math, Loan-to-Value (LTV) ratios, Private Mortgage Insurance (PMI), equity accumulation over time, property taxes, home insurance, and total PITI monthly housing expenses.
            </p>
            <button
              onClick={() => setActiveModule('mortgage')}
              className="text-xs text-indigo-600 font-sans font-bold hover:text-indigo-800 flex items-center space-x-1 border border-indigo-200 hover:border-indigo-300 px-2.5 py-1.5 rounded-lg bg-indigo-50 transition-all cursor-pointer"
              id="btn-nav-bonus-unit-c"
            >
              <span>Open Topic Lab & Challenge</span>
              <ChevronsRight className="w-3 h-3" />
            </button>
          </div>

          {/* Reference Module: Financial Math Glossary */}
          <div className="bg-white border border-indigo-300 hover:border-indigo-400 transition-colors rounded-2xl p-5 space-y-3 bg-gradient-to-br from-indigo-50/40 via-white to-purple-50/30">
            <div className="flex justify-between items-start">
              <span className="font-mono text-xs font-bold text-indigo-700 block uppercase">Reference Unit</span>
              <span className="bg-indigo-100 text-indigo-900 text-[10px] font-mono px-2 py-0.5 rounded font-bold">Dictionary & Sandbox</span>
            </div>
            <h4 className="font-sans font-bold text-slate-900 text-sm">
              Financial Math Glossary & Formula Compendium
            </h4>
            <p className="text-slate-600 text-xs font-sans leading-relaxed">
              Searchable dictionary of financial variables, equations, real-world analogies, and interactive micro-calculators across all 9 curriculum units.
            </p>
            <button
              onClick={() => setActiveModule('glossary')}
              className="text-xs text-indigo-700 font-sans font-bold hover:text-indigo-900 flex items-center space-x-1 border border-indigo-300 hover:border-indigo-400 px-2.5 py-1.5 rounded-lg bg-indigo-100/60 transition-all cursor-pointer"
              id="btn-nav-glossary"
            >
              <span>Open Financial Dictionary</span>
              <ChevronsRight className="w-3 h-3 text-indigo-700" />
            </button>
          </div>
        </div>
      </div>

      {/* Advanced Math Side Quests */}
      <div className="space-y-4 pt-6 border-t border-slate-200">
        <h3 className="font-sans font-bold text-slate-800 text-base pl-1 flex items-center space-x-1.5">
          <span>Advanced Math Side Quests</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Side Quest 1 */}
          <div className="bg-slate-900 border border-slate-950 text-slate-100 rounded-2xl p-5 space-y-3 relative overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <Sigma className="w-24 h-24 text-white" />
            </div>
            <div className="flex justify-between items-start">
              <span className="font-mono text-xs font-bold text-indigo-400 block uppercase">Math Quest 1</span>
              <span className="bg-indigo-950 text-indigo-300 text-[10px] font-mono px-2 py-0.5 rounded border border-indigo-900">Discrete Sums</span>
            </div>
            <h4 className="font-sans font-bold text-slate-100 text-sm">
              Summation Notation (Sigma)
            </h4>
            <p className="text-slate-400 text-xs font-serif leading-relaxed">
              Deep dive into summation, Carl Friedrich Gauss's arithmetic series derivation, and their applications to the dividend discount model.
            </p>
            <button
              onClick={() => setActiveModule('side_quest_sigma')}
              className="text-xs text-indigo-300 font-sans font-bold hover:text-indigo-100 flex items-center space-x-1 border border-indigo-900 hover:border-indigo-800 px-2.5 py-1.5 rounded-lg bg-indigo-950/40 transition-all cursor-pointer"
              id="btn-nav-side-quest-1"
            >
              <span>Launch Math Side Quest</span>
              <ChevronsRight className="w-3 h-3 text-indigo-400" />
            </button>
          </div>

          {/* Side Quest 2 */}
          <div className="bg-slate-900 border border-slate-950 text-slate-100 rounded-2xl p-5 space-y-3 relative overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <TrendingUp className="w-24 h-24 text-white" />
            </div>
            <div className="flex justify-between items-start">
              <span className="font-mono text-xs font-bold text-indigo-400 block uppercase">Math Quest 2</span>
              <span className="bg-indigo-950 text-indigo-300 text-[10px] font-mono px-2 py-0.5 rounded border border-indigo-900">Infinite Series</span>
            </div>
            <h4 className="font-sans font-bold text-slate-100 text-sm">
              Geometric Series & Convergence
            </h4>
            <p className="text-slate-400 text-xs font-serif leading-relaxed">
              Master the math that proves an infinite sum of cash flows can equal a finite, bounded price using infinite geometric series.
            </p>
            <button
              onClick={() => setActiveModule('side_quest_geometric')}
              className="text-xs text-indigo-300 font-sans font-bold hover:text-indigo-100 flex items-center space-x-1 border border-indigo-900 hover:border-indigo-800 px-2.5 py-1.5 rounded-lg bg-indigo-950/40 transition-all cursor-pointer"
              id="btn-nav-side-quest-2"
            >
              <span>Launch Math Side Quest</span>
              <ChevronsRight className="w-3 h-3 text-indigo-400" />
            </button>
          </div>

          {/* Side Quest 3 */}
          <div className="bg-slate-900 border border-slate-950 text-slate-100 rounded-2xl p-5 space-y-3 relative overflow-hidden shadow-sm">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
              <TrendingUp className="w-24 h-24 text-white" />
            </div>
            <div className="flex justify-between items-start">
              <span className="font-mono text-xs font-bold text-indigo-400 block uppercase">Math Quest 3</span>
              <span className="bg-indigo-950 text-indigo-300 text-[10px] font-mono px-2 py-0.5 rounded border border-indigo-900">Geometric Convergences</span>
            </div>
            <h4 className="font-sans font-bold text-slate-100 text-sm">
              The Gordon Growth Formula Derivation
            </h4>
            <p className="text-slate-400 text-xs font-serif leading-relaxed">
              Study dividend perpetuity equations starting from zero-growth ($g = 0$) up to constant compounding dividend expansion.
            </p>
            <button
              onClick={() => setActiveModule('side_quest_gordon')}
              className="text-xs text-indigo-300 font-sans font-bold hover:text-indigo-100 flex items-center space-x-1 border border-indigo-900 hover:border-indigo-800 px-2.5 py-1.5 rounded-lg bg-indigo-950/40 transition-all cursor-pointer"
              id="btn-nav-side-quest-3"
            >
              <span>Launch Math Side Quest</span>
              <ChevronsRight className="w-3 h-3 text-indigo-400" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
