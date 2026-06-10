import { useState } from 'react';
import { LESSONS } from './data/lessons';
import { DcfLab } from './components/DcfLab';
import { StochasticLab } from './components/StochasticLab';
import { PortfolioLab } from './components/PortfolioLab';
import { OptionsLab } from './components/OptionsLab';
import { BehavioralLab } from './components/BehavioralLab';
import { QuizSection } from './components/QuizSection';
import { MathSpan, processMathText } from './lib/math';
import { 
  BookOpen, 
  PieChart, 
  ChevronsRight, 
  GraduationCap, 
  Clock, 
  LineChart, 
  BrainCircuit, 
  Activity, 
  HeartHandshake,
  Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeModule, setActiveModule] = useState<string>('syllabus');

  // Render content based on active selection
  const renderLabWidget = (moduleId: string) => {
    switch (moduleId) {
      case 'compounding':
        return <DcfLab />;
      case 'stochastic':
        return <StochasticLab />;
      case 'portfolio':
        return <PortfolioLab />;
      case 'options':
        return <OptionsLab />;
      case 'behavioral':
        return <BehavioralLab />;
      default:
        return null;
    }
  };

  const currentLesson = activeModule !== 'syllabus' ? LESSONS[activeModule] : null;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col antialiased selection:bg-indigo-500 selection:text-white">
      {/* Upper Navigation Banner */}
      <header className="sticky top-0 z-50 bg-slate-900 text-white border-b border-slate-950 py-3 px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-600 p-1.5 rounded-lg">
              <BrainCircuit className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-sans font-bold text-base tracking-tight leading-tight uppercase">
                Investing & Finance Math Lab
              </h1>
              <p className="font-mono text-[9px] text-indigo-300 tracking-wider">
                FOR MATHEMATICS AND STOCHASTIC CALCULUS STUDY
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="font-mono text-[10px] bg-slate-800 text-slate-300 px-2.5 py-1 rounded border border-slate-700/50 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              Real-time Simulation Engine Activated
            </span>
          </div>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-6 p-4 sm:p-6">
        {/* Navigation Sidebar */}
        <aside className="lg:col-span-3 space-y-4 mb-6 lg:mb-0">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-3.5">
            <h2 className="font-sans font-bold text-xs uppercase text-slate-400 tracking-wider pl-1">
              Study Syllabus Hub
            </h2>

            <nav className="space-y-1">
              <button
                onClick={() => setActiveModule('syllabus')}
                className={`w-full text-left px-3 py-2.5 rounded-xl transition-all font-sans text-xs sm:text-sm font-semibold flex items-center justify-between group ${
                  activeModule === 'syllabus'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
                }`}
                id="sidebar-nav-syllabus"
              >
                <span className="flex items-center space-x-2.5">
                  <BookOpen className="w-4 h-4 flex-shrink-0" />
                  <span>Syllabus Home</span>
                </span>
                <ChevronsRight className={`w-3.5 h-3.5 transition-transform ${activeModule === 'syllabus' ? 'translate-x-0.5' : 'opacity-0 group-hover:opacity-100'}`} />
              </button>

              <div className="h-px bg-slate-100 my-2" />

              {/* Module Items */}
              {Object.values(LESSONS).map((les, idx) => {
                const isSelected = activeModule === les.id;
                let stepIcon = <Clock className="w-4 h-4 flex-shrink-0" />;
                if (les.id === 'compounding') stepIcon = <GraduationCap className="w-4 h-4 flex-shrink-0" />;
                if (les.id === 'stochastic') stepIcon = <Activity className="w-4 h-4 flex-shrink-0" />;
                if (les.id === 'portfolio') stepIcon = <PieChart className="w-4 h-4 flex-shrink-0" />;
                if (les.id === 'options') stepIcon = <LineChart className="w-4 h-4 flex-shrink-0" />;
                if (les.id === 'behavioral') stepIcon = <Users className="w-4 h-4 flex-shrink-0" />;

                let unitTitle = 'Unknown Unit';
                if (les.id === 'compounding') unitTitle = 'Compound & NPV';
                if (les.id === 'stochastic') unitTitle = 'Stock Prices & Randomness';
                if (les.id === 'portfolio') unitTitle = 'Portfolio Diversification';
                if (les.id === 'options') unitTitle = 'Options & Payoffs';
                if (les.id === 'behavioral') unitTitle = 'Behavioral Market Math';

                return (
                  <button
                    key={les.id}
                    onClick={() => setActiveModule(les.id)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl transition-all font-sans text-xs sm:text-sm font-semibold flex items-center justify-between group ${
                      isSelected
                        ? 'bg-slate-950 text-white border-transparent'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
                    }`}
                    id={`sidebar-nav-${les.id}`}
                  >
                    <span className="flex items-center space-x-2.5 min-w-0">
                      <span className={isSelected ? 'text-indigo-400' : 'text-slate-400'}>{stepIcon}</span>
                      <span className="truncate">Unit {idx + 1}: {unitTitle}</span>
                    </span>
                    <ChevronsRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'translate-x-0.5' : 'opacity-0 group-hover:opacity-100'}`} />
                  </button>
                );
              })}
            </nav>
          </div>


        </aside>

        {/* Dynamic Main Workspace Content */}
        <main className="lg:col-span-9 space-y-6">
          <AnimatePresence mode="wait">
            {activeModule === 'syllabus' ? (
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
                    </div>
                  </div>

                  {/* Decorative background visual grids */}
                  <div className="absolute right-0 bottom-0 opacity-15 pointer-events-none transform translate-y-12 translate-x-12 select-none font-mono text-[92px] leading-none font-bold select-all">
                    A=P(1+r)ⁿ
                  </div>
                </div>

                {/* Core Syllabus Chapters overview */}
                <div className="space-y-4">
                  <h3 className="font-sans font-bold text-slate-800 text-base pl-1 flex items-center space-x-1.5">
                    <span>Course Curriculum Roadmap</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Unit 1 */}
                    <div className="bg-white border border-slate-200 hover:border-slate-300 transition-colors rounded-2xl p-5 space-y-3">
                      <div className="flex justify-between items-start">
                        <span className="font-mono text-xs font-bold text-slate-400 block uppercase">Unit 1</span>
                        <span className="bg-slate-100 text-slate-700 text-[10px] font-mono px-2 py-0.5 rounded">Exponents & Percentages</span>
                      </div>
                      <h4 className="font-sans font-bold text-slate-800 text-sm">
                        Time Value of Money & Compound Growth
                      </h4>
                      <p className="text-slate-500 text-xs font-sans leading-relaxed">
                        Learn how money grows using exponents: A = P(1 + r)ⁿ. Work backwards to find Present Value, examine Net Present Value (NPV), and master the Gordon Growth Model.
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
                    <div className="bg-white border border-slate-200 hover:border-slate-300 transition-colors rounded-2xl p-5 space-y-3">
                      <div className="flex justify-between items-start">
                        <span className="font-mono text-xs font-bold text-slate-400 block uppercase">Unit 2</span>
                        <span className="bg-indigo-50 text-indigo-700 text-[10px] font-mono px-2 py-0.5 rounded">Market Randomness</span>
                      </div>
                      <h4 className="font-sans font-bold text-slate-800 text-sm">
                        Stock Prices & Randomness
                      </h4>
                      <p className="text-slate-500 text-xs font-sans leading-relaxed">
                        Explore percentage changes, the multiplicative compounding of stock returns, random walks, volatility drag, and simulate coin-flip price paths by hand.
                      </p>
                      <button
                        onClick={() => setActiveModule('stochastic')}
                        className="text-xs text-indigo-600 font-sans font-bold hover:text-indigo-800 flex items-center space-x-1 border border-indigo-100 hover:border-indigo-200 px-2.5 py-1.5 rounded-lg bg-indigo-50/20 transition-all cursor-pointer"
                        id="btn-nav-unit-2"
                      >
                        <span>Open Topic Lab & Challenge</span>
                        <ChevronsRight className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Unit 3 */}
                    <div className="bg-white border border-slate-200 hover:border-slate-300 transition-colors rounded-2xl p-5 space-y-3">
                      <div className="flex justify-between items-start">
                        <span className="font-mono text-xs font-bold text-slate-400 block uppercase">Unit 3</span>
                        <span className="bg-slate-100 text-slate-700 text-[10px] font-mono px-2 py-0.5 rounded">Risk Reduction & Averages</span>
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
                        id="btn-nav-unit-3"
                      >
                        <span>Open Topic Lab & Challenge</span>
                        <ChevronsRight className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Unit 4 */}
                    <div className="bg-white border border-slate-200 hover:border-slate-300 transition-colors rounded-2xl p-5 space-y-3">
                      <div className="flex justify-between items-start">
                        <span className="font-mono text-xs font-bold text-slate-400 block uppercase">Unit 4</span>
                        <span className="bg-indigo-50 text-indigo-700 text-[10px] font-mono px-2 py-0.5 rounded">Inequalities & Insurance</span>
                      </div>
                      <h4 className="font-sans font-bold text-slate-800 text-sm">
                        Options & The Price of a Guarantee
                      </h4>
                      <p className="text-slate-500 text-xs font-sans leading-relaxed">
                        Understand Call and Put options and payoff inequalities at expiration. Discover the five pricing inputs, no-arbitrage reasoning, and English "Greeks" limits.
                      </p>
                      <button
                        onClick={() => setActiveModule('options')}
                        className="text-xs text-indigo-600 font-sans font-bold hover:text-indigo-800 flex items-center space-x-1 border border-indigo-100 hover:border-indigo-200 px-2.5 py-1.5 rounded-lg bg-indigo-50/20 transition-all cursor-pointer"
                        id="btn-nav-unit-4"
                      >
                        <span>Open Topic Lab & Challenge</span>
                        <ChevronsRight className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Unit 5 */}
                    <div className="bg-white border border-slate-200 hover:border-slate-300 transition-colors rounded-2xl p-5 space-y-3">
                      <div className="flex justify-between items-start">
                        <span className="font-mono text-xs font-bold text-slate-400 block uppercase">Unit 5</span>
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
                        id="btn-nav-unit-5"
                      >
                        <span>Open Topic Lab & Challenge</span>
                        <ChevronsRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>


              </motion.div>
            ) : (
              currentLesson && (
                <motion.div
                  key={currentLesson.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-8"
                >
                  {/* Lesson Heading Banner */}
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-xs font-mono font-medium uppercase text-slate-400">
                      <span className="text-indigo-600 font-bold">Academic Unit</span>
                      <span>•</span>
                      <span>{currentLesson.mathTopic}</span>
                    </div>
                    <h2 className="font-sans font-extrabold text-2xl sm:text-3xl text-slate-800 tracking-tight leading-tight" id="lesson-module-title">
                      {currentLesson.title}
                    </h2>
                    <p className="font-serif italic text-sm text-slate-500">
                      {currentLesson.subtitle}
                    </p>
                  </div>

                  {/* Math Derivation Text section */}
                  <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-sm space-y-5">
                    <h3 className="font-sans font-bold text-slate-800 text-sm uppercase tracking-wider border-b border-slate-100 pb-2">
                      Mathematical Background & Formula Derivation
                    </h3>

                    {/* Left/Right layout for text and key equations */}
                    <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
                      <div className="xl:col-span-8 space-y-4 text-slate-600 font-serif text-sm sm:text-base leading-relaxed">
                        {currentLesson.fullText.map((p, idx) => {
                          const trimmed = p.trim();

                          // 1. Header parsing (e.g. "1. **The Time Value of Money**" or "### **The...")
                          const headerMatch = trimmed.match(/^(\d+)\.\s+\*\*([^*]+)\*\*/);
                          if (headerMatch) {
                            const [_, num, headerText] = headerMatch;
                            return (
                              <div key={idx} className="pt-4 pb-1">
                                <h4 className="font-sans font-bold text-slate-800 text-base md:text-lg flex items-center gap-2">
                                  <span className="flex items-center justify-center bg-indigo-100 text-indigo-700 w-7 h-7 rounded-lg text-sm font-bold flex-shrink-0">
                                    {num}
                                  </span>
                                  {headerText}
                                </h4>
                              </div>
                            );
                          }

                          // General bold title check without digit
                          if (trimmed.startsWith('**') && trimmed.endsWith('**') && !trimmed.includes('\n')) {
                            const cleanText = trimmed.replace(/\*\*/g, '');
                            return (
                              <div key={idx} className="pt-3 pb-1">
                                <h5 className="font-sans font-bold text-slate-800 text-xs sm:text-sm uppercase tracking-wider text-slate-600">
                                  {processMathText(cleanText)}
                                </h5>
                              </div>
                            );
                          }

                          // 2. Table parsing
                          if (trimmed.includes('|')) {
                            const tableContent = trimmed.replace(/^[A-Z0-9_]+_TABLE\|/, '');
                            const lines = tableContent.split('\n').map(l => l.trim()).filter(l => l.length > 0);
                            if (lines.length > 0) {
                              const headers = lines[0].split('|').map(h => h.trim());
                              const rows = lines.slice(1).map(line => line.split('|').map(cell => cell.trim()));
                              return (
                                <div className="my-4 overflow-x-auto border border-slate-200 rounded-xl overflow-hidden shadow-xs" key={idx}>
                                  <table className="min-w-full divide-y divide-slate-200 text-left text-xs sm:text-sm">
                                    <thead className="bg-slate-50 font-sans font-bold text-slate-700">
                                      <tr>
                                        {headers.map((h, hIdx) => (
                                          <th key={hIdx} className="px-4 py-2 hover:bg-slate-100/50 transition-colors font-semibold">
                                            {processMathText(h)}
                                          </th>
                                        ))}
                                      </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 bg-white font-serif text-slate-600">
                                      {rows.map((row, rIdx) => (
                                        <tr key={rIdx} className="hover:bg-slate-50/50 transition-colors">
                                          {row.map((cell, cIdx) => (
                                            <td key={cIdx} className="px-4 py-2">
                                              {processMathText(cell)}
                                            </td>
                                          ))}
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              );
                            }
                          }

                          // 3. Warning callout
                          if (trimmed.startsWith('⚠️')) {
                            return (
                              <div className="bg-amber-50/60 border-l-4 border-amber-500 rounded-r-xl p-4 my-4 flex items-start gap-3 shadow-xs font-sans text-xs sm:text-sm" key={idx}>
                                <div className="text-amber-800 leading-relaxed">
                                  {processMathText(trimmed)}
                                </div>
                              </div>
                            );
                          }

                          // 4. Worked Example / Problem callouts
                          if (trimmed.startsWith('**Worked Example') || trimmed.startsWith('**Real-World Problem')) {
                            return (
                              <div className="bg-indigo-50/40 border-l-4 border-indigo-500/80 rounded-r-xl p-4 my-4 font-serif text-slate-700 shadow-2xs leading-relaxed" key={idx}>
                                {processMathText(trimmed)}
                              </div>
                            );
                          }

                          // 5. Bullet points / Lists
                          if (trimmed.includes('\n') && (trimmed.includes('• ') || trimmed.includes('- Option') || trimmed.includes('- '))) {
                            const lines = trimmed.split('\n').map(l => l.trim()).filter(l => l.length > 0);
                            return (
                              <div className="space-y-2 my-3 pl-2" key={idx}>
                                {lines.map((line, lIdx) => {
                                  const cleanLine = line.replace(/^[•\-\*]\s*/, '');
                                  return (
                                    <div key={lIdx} className="flex items-start gap-2.5 text-xs sm:text-sm font-serif text-slate-600">
                                      <span className="text-indigo-500 mt-1 flex-shrink-0">•</span>
                                      <div>{processMathText(cleanLine)}</div>
                                    </div>
                                  );
                                })}
                              </div>
                            );
                          }

                          // 6. Default standard text paragraph
                          return <p key={idx} className="font-serif leading-relaxed text-sm sm:text-base text-slate-600 my-3">{processMathText(p)}</p>;
                        })}
                      </div>

                      {/* Display Equations block on the right */}
                      <div className="xl:col-span-4 p-4 bg-slate-50 border border-slate-250 rounded-2xl space-y-3">
                        <span className="text-slate-500 font-mono text-[10px] block uppercase tracking-wider font-semibold">
                          Core Formula Reference
                        </span>
                        <div className="space-y-4 divide-y divide-slate-200/60 pt-1">
                          {currentLesson.equations.map((eq, eqIdx) => (
                            <div key={eqIdx} className="pt-3 first:pt-0">
                              <MathSpan tex={eq} block />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Interactive Simulation Lab container */}
                  <div className="space-y-3">
                    <div className="pl-1">
                      <h3 className="font-sans font-extrabold text-slate-800 text-lg">
                        Interactive Numerical Sandbox
                      </h3>
                      <p className="text-xs text-slate-500 font-sans">
                        Slide inputs and investigate numerical limits in real time. Compare simulation variations against math expectation limits.
                      </p>
                    </div>

                    {renderLabWidget(currentLesson.id)}
                  </div>

                  {/* Multiple-Choice Derivation Quiz segment */}
                  <QuizSection quizzes={currentLesson.quizzes} moduleName={currentLesson.title} />
                </motion.div>
              )
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Quantitative Footer */}
      <footer className="bg-slate-900 border-t border-slate-950 text-slate-400 py-6 px-6 mt-12 text-center text-xs font-mono">
        <div className="max-w-7xl mx-auto space-y-2">
          <p>© 2026 Investing & Finance Math Lab. Created for families studying high-level economics together.</p>
          <p className="text-[10px] text-slate-600">
            No real currency is processed. Calculations are based on Black-Scholes formulas and Brownian simulations.
          </p>
        </div>
      </footer>
    </div>
  );
}
