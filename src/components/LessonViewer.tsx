import { motion } from 'motion/react';
import { 
  BookOpen, 
  HeartHandshake, 
  Sparkles, 
  Sigma, 
  ChevronsRight 
} from 'lucide-react';
import { LessonContent } from '../types';
import { MathSpan, processMathText } from '../lib/math';

// Import Labs
import { LemonadeStandLab } from './LemonadeStandLab';
import { BankLab } from './BankLab';
import { StockBridgeLab } from './StockBridgeLab';
import { ValuationLab } from './ValuationLab';
import { NewsBridgeLab } from './NewsBridgeLab';
import { StochasticLab } from './StochasticLab';
import { PortfolioLab } from './PortfolioLab';
import { OptionsLab } from './OptionsLab';
import { BehavioralLab } from './BehavioralLab';

// Import Knowledge Checks
import { TvmKnowledgeCheck } from './TvmKnowledgeCheck';
import { DiscountKnowledgeCheck } from './DiscountKnowledgeCheck';
import { NpvKnowledgeCheck } from './NpvKnowledgeCheck';
import { ValuationKnowledgeCheck } from './ValuationKnowledgeCheck';
import { NewsBridgeKnowledgeCheck } from './NewsBridgeKnowledgeCheck';

// Quiz Section
import { QuizSection } from './QuizSection';

interface LessonViewerProps {
  currentLesson: LessonContent;
  setActiveModule: (module: string) => void;
}

export function LessonViewer({ currentLesson, setActiveModule }: LessonViewerProps) {
  const renderLabWidget = (moduleId: string) => {
    switch (moduleId) {
      case 'compounding':
        return <LemonadeStandLab />;
      case 'rateSelection':
        return <BankLab />;
      case 'stockBridge':
        return <StockBridgeLab />;
      case 'valuation':
        return <ValuationLab />;
      case 'newsBridge':
        return <NewsBridgeLab />;
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

  return (
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

      {/* Narrative Introduction Panel */}
      {currentLesson.introduction && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white border-l-4 border-l-indigo-600 border-y border-r border-slate-200 rounded-r-3xl rounded-l-lg p-8 sm:p-10 shadow-sm space-y-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
            <BookOpen className="w-32 h-32 text-indigo-900" />
          </div>
          <div className="relative z-10">
            <h3 className="font-sans font-bold text-slate-900 text-lg sm:text-xl flex items-center gap-2 mb-4">
              <HeartHandshake className="w-5 h-5 text-indigo-600" />
              The Big Picture
            </h3>
            <div className="font-serif text-slate-700 text-base sm:text-lg leading-relaxed space-y-4 max-w-4xl prose prose-slate prose-indigo">
              {currentLesson.introduction.split('\n\n').map((paragraph, pIdx) => (
                <p key={pIdx}>{processMathText(paragraph)}</p>
              ))}
            </div>
            <div className="pt-6 border-t border-slate-100 flex items-center gap-3">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">End of Narrative Hook — Transitioning to Mathematical Models</span>
              <div className="flex-1 h-px bg-slate-100" />
            </div>
          </div>
        </motion.div>
      )}

      {/* Math Derivation Text section */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-sm space-y-5">
        <h3 className="font-sans font-bold text-slate-800 text-sm uppercase tracking-wider border-b border-slate-100 pb-2">
          {currentLesson.id === 'behavioral' ? 'Core Concept Overview' : 'Mathematical Background & Formula Derivation'}
        </h3>

        {/* Left/Right layout for text and key equations */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
          <div className="xl:col-span-8 space-y-4 text-slate-600 font-serif text-sm sm:text-base leading-relaxed">
            {currentLesson.fullText.flatMap(p => {
              const trimmed = p.trim();
              const headerMatch = trimmed.match(/^(\d+)\.\s+\*\*([^*]+)\*\*/);
              if (headerMatch) {
                const parts = trimmed.split('\n');
                const heading = parts[0].trim();
                const remaining = parts.slice(1).join('\n').trim();
                if (remaining) {
                  return [heading, remaining];
                } else {
                  return [heading];
                }
              }
              return [p];
            }).map((p, idx) => {
              const trimmed = p.trim();

              // 1. Header parsing (e.g. "1. **The Time Value of Money**")
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

              // 1.4 Math Side Quest Callout
              if (trimmed.startsWith('SIDE_QUEST_CALLOUT|')) {
                const [_, questId, questName] = trimmed.split('|');
                return (
                  <div key={idx} className="bg-indigo-50/60 border border-indigo-150 rounded-2xl p-5 my-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-3xs" id={`side-quest-callout-${questId}`}>
                    <div className="space-y-1 text-left">
                      <div className="flex items-center gap-1.5 text-xs text-indigo-700 font-mono font-extrabold uppercase">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
                        <span>Core Math Side Quest Available</span>
                      </div>
                      <h5 className="font-sans font-bold text-slate-900 text-sm">
                        Master Summation Notation ($\Sigma$) & Series
                      </h5>
                      <p className="text-xs text-slate-500 font-sans leading-relaxed">
                        Struggling to read or calculate the NPV summation symbol? Open this interactive side quest to master Sigma notation and Gauss's series shortcut.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveModule(questId)}
                      className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white font-sans font-extrabold px-4 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer whitespace-nowrap self-start sm:self-center"
                    >
                      <Sigma className="w-4 h-4 text-white" />
                      <span>Open Side Quest</span>
                      <ChevronsRight className="w-3.5 h-3.5 text-indigo-200" />
                    </button>
                  </div>
                );
              }

              // 1.5 Knowledge Check Table (TVM)
              if (trimmed.startsWith('KNOWLEDGE_CHECK_TVM')) {
                return (
                  <TvmKnowledgeCheck key={idx} initialValue={5000} annualRate={0.06} />
                );
              }

              // 1.5.5 Knowledge Check Table (DISCOUNT)
              if (trimmed.startsWith('KNOWLEDGE_CHECK_DISCOUNT')) {
                return (
                  <DiscountKnowledgeCheck key={idx} />
                );
              }

              // 1.6 Knowledge Check Table (NPV)
              if (trimmed.startsWith('KNOWLEDGE_CHECK_NPV')) {
                return (
                  <NpvKnowledgeCheck key={idx} />
                );
              }

              // 1.6.5 Knowledge Check Table (VALUATION)
              if (trimmed.startsWith('KNOWLEDGE_CHECK_VALUATION')) {
                return (
                  <ValuationKnowledgeCheck key={idx} />
                );
              }

              // 1.6.75 Knowledge Check (NEWS BRIDGE)
              if (trimmed.startsWith('KNOWLEDGE_CHECK_NEWS_BRIDGE')) {
                return (
                  <NewsBridgeKnowledgeCheck key={idx} />
                );
              }

              // 2. Table parsing
              if (trimmed.includes('|') && !trimmed.startsWith('DIAGRAM|') && !trimmed.startsWith('SIDE_QUEST_CALLOUT|') && !trimmed.startsWith('KNOWLEDGE_CHECK_TVM') && !trimmed.startsWith('KNOWLEDGE_CHECK_DISCOUNT') && !trimmed.startsWith('KNOWLEDGE_CHECK_NPV') && !trimmed.startsWith('KNOWLEDGE_CHECK_VALUATION') && !trimmed.startsWith('KNOWLEDGE_CHECK_NEWS_BRIDGE')) {
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

              // 3.1 Classroom Experiment callout
              if (trimmed.startsWith('🧪')) {
                return (
                  <div className="bg-emerald-50/60 border-l-4 border-emerald-500 rounded-r-xl p-4 my-4 flex items-start gap-3 shadow-xs font-sans text-xs sm:text-sm" key={idx}>
                    <div className="text-emerald-900 leading-relaxed font-serif">
                      {processMathText(trimmed)}
                    </div>
                  </div>
                );
              }

              // 3.2 Anatomy or Search Case callout
              if (trimmed.startsWith('🔍')) {
                return (
                  <div className="bg-sky-50/60 border-l-4 border-sky-500 rounded-r-xl p-4 my-4 flex items-start gap-3 shadow-xs font-sans text-xs sm:text-sm" key={idx}>
                    <div className="text-sky-900 leading-relaxed font-serif">
                      {processMathText(trimmed)}
                    </div>
                  </div>
                );
              }

              // 3.3 Text-art / Preformatted Diagram codeblock
              if (trimmed.startsWith('DIAGRAM|')) {
                const cleanDiagram = trimmed.substring(8);
                
                // Check for "TWO MARKETS, ONE TICKER PRICE" diagram
                if (cleanDiagram.includes('TWO MARKETS, ONE TICKER PRICE')) {
                  return (
                    <div key={idx} className="my-6 p-6 bg-slate-50 border border-slate-200 rounded-3xl space-y-6 shadow-xs max-w-2xl mx-auto" id="graphic-two-markets-one-price">
                      <div className="text-center font-sans">
                        <span className="font-mono text-xs uppercase text-indigo-600 font-extrabold tracking-widest bg-indigo-50 px-2.5 py-1 rounded-full">DIAGRAM SUMMARY</span>
                        <h4 className="font-extrabold text-base md:text-lg text-slate-900 mt-2">TWO MARKETS, ONE TICKER PRICE</h4>
                        <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">Every transaction on a price ticker represents an ongoing tug-of-war between fundamental value and human behavior.</p>
                      </div>
                      
                      {/* The Ticker Box */}
                      <div className="flex flex-col items-center">
                        <div className="bg-slate-950 border border-slate-850 text-emerald-400 font-mono font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl shadow-md tracking-wider flex items-center space-x-1.5">
                          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping"></span>
                          <span>THE TICKER</span>
                        </div>
                        <div className="w-0.5 h-6 bg-slate-200"></div>
                        {/* Horizontal Split Line */}
                        <div className="w-4/5 border-t border-slate-200 relative">
                          <div className="absolute left-0 top-0 w-0.5 h-3 bg-slate-200"></div>
                          <div className="absolute right-0 top-0 w-0.5 h-3 bg-slate-200"></div>
                        </div>
                      </div>

                      {/* Two Markets Comparison columns */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-1 max-w-xl mx-auto relative">
                        
                        {/* Left: The Slow Market */}
                        <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-4 flex flex-col justify-between hover:shadow-sm transition-shadow relative">
                          <div className="space-y-3">
                            <div className="flex items-center space-x-2 border-b border-indigo-100 pb-2">
                              <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
                              <span className="font-sans font-bold text-indigo-900 text-xs sm:text-sm">THE SLOW MARKET</span>
                            </div>
                            <ul className="space-y-2 text-xs font-serif text-slate-600">
                              <li className="flex items-center space-x-1.5">
                                <span className="text-indigo-400 font-bold">•</span>
                                <span>Cash Flows (DCF Model)</span>
                              </li>
                              <li className="flex items-center space-x-1.5">
                                <span className="text-indigo-400 font-bold">•</span>
                                <span>Discount & Valuation Rates</span>
                              </li>
                              <li className="flex items-center space-x-1.5">
                                <span className="text-indigo-400 font-bold">•</span>
                                <span>Arbitrage & Price Boundaries</span>
                              </li>
                              <li className="flex items-center space-x-1.5">
                                <span className="text-indigo-400 font-bold">•</span>
                                <span>Portfolio Diversification</span>
                              </li>
                            </ul>
                          </div>
                          <div className="mt-4 bg-indigo-50 border border-indigo-100 text-indigo-700 rounded-xl py-1.5 text-center font-sans font-extrabold text-xs">
                            Wins EVENTUALLY
                          </div>
                        </div>

                        {/* Tug-of-war indicator badge absolute */}
                        <div className="hidden md:flex absolute top-[110px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-white border border-slate-200 text-slate-700 font-mono text-[9px] font-bold px-2 py-1 rounded-full shadow-xs uppercase tracking-wider">
                          TUG-OF-WAR
                        </div>

                        {/* Right: The Fast Market */}
                        <div className="bg-white border border-slate-200 rounded-2xl p-4 space-y-4 flex flex-col justify-between hover:shadow-sm transition-shadow">
                          <div className="space-y-3">
                            <div className="flex items-center space-x-2 border-b border-rose-100 pb-2">
                              <span className="w-2.5 h-2.5 rounded-full bg-rose-600"></span>
                              <span className="font-sans font-bold text-rose-900 text-xs sm:text-sm">THE FAST MARKET</span>
                            </div>
                            <ul className="space-y-2 text-xs font-serif text-slate-600">
                              <li className="flex items-center space-x-1.5">
                                <span className="text-rose-400 font-bold">•</span>
                                <span>Momentum & Trends</span>
                              </li>
                              <li className="flex items-center space-x-1.5">
                                <span className="text-rose-400 font-bold">•</span>
                                <span>Herds & Information Cascades</span>
                              </li>
                              <li className="flex items-center space-x-1.5">
                                <span className="text-rose-400 font-bold">•</span>
                                <span>Short Options Squeezes</span>
                              </li>
                              <li className="flex items-center space-x-1.5">
                                <span className="text-rose-400 font-bold">•</span>
                                <span>Immediate Order Flow</span>
                              </li>
                            </ul>
                          </div>
                          <div className="mt-4 bg-rose-50 border border-rose-100 text-rose-700 rounded-xl py-1.5 text-center font-sans font-extrabold text-xs">
                            Wins TODAY
                          </div>
                        </div>

                      </div>
                    </div>
                  );
                }

                // Check for "THE POSITIVE FEEDBACK LOOP OF A BUBBLE" diagram
                if (cleanDiagram.includes('THE POSITIVE FEEDBACK LOOP OF A BUBBLE')) {
                  return (
                    <div key={idx} className="my-6 p-6 bg-slate-50 border border-slate-200 rounded-3xl space-y-6 shadow-xs max-w-2xl mx-auto" id="graphic-positive-feedback-loop">
                      <div className="text-center font-sans">
                        <span className="font-mono text-xs uppercase text-amber-600 font-extrabold tracking-widest bg-amber-50 px-2.5 py-1 rounded-full">SPECULATIVE ENGINE</span>
                        <h4 className="font-extrabold text-base md:text-lg text-slate-950 mt-2">THE POSITIVE FEEDBACK LOOP OF A BUBBLE</h4>
                        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">Rising prices attract media coverage, which sparks retail hype and drives prices even higher recursively.</p>
                      </div>

                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-3 max-w-xl mx-auto">
                        {/* Step 1 */}
                        <div className="bg-white border border-slate-200 rounded-2xl p-3 flex flex-col justify-between items-center text-center hover:border-indigo-300 transition-colors shadow-3xs">
                          <span className="text-[9px] font-mono font-bold text-indigo-600 uppercase">Phase 1</span>
                          <span className="font-sans font-bold text-slate-800 text-xs mt-1 min-h-[32px] flex items-center">Rising Prices</span>
                          <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mt-2 font-bold font-sans text-xs">↑</div>
                        </div>

                        {/* Step 2 */}
                        <div className="bg-white border border-slate-200 rounded-2xl p-3 flex flex-col justify-between items-center text-center hover:border-amber-300 transition-colors shadow-3xs">
                          <span className="text-[9px] font-mono font-bold text-amber-600 uppercase">Phase 2</span>
                          <span className="font-sans font-bold text-slate-800 text-xs mt-1 min-h-[32px] flex items-center">Media Hype</span>
                          <div className="w-8 h-8 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mt-2 font-bold text-xs">📢</div>
                        </div>

                        {/* Step 3 */}
                        <div className="bg-white border border-slate-200 rounded-2xl p-3 flex flex-col justify-between items-center text-center hover:border-emerald-300 transition-colors shadow-3xs">
                          <span className="text-[9px] font-mono font-bold text-emerald-600 uppercase">Phase 3</span>
                          <span className="font-sans font-bold text-slate-800 text-xs mt-1 min-h-[32px] flex items-center">Buyers Enter</span>
                          <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mt-2 font-bold text-xs">👥</div>
                        </div>

                        {/* Step 4 */}
                        <div className="bg-white border border-slate-200 rounded-2xl p-3 flex flex-col justify-between items-center text-center hover:border-rose-300 transition-colors shadow-3xs">
                          <span className="text-[9px] font-mono font-bold text-rose-600 uppercase">Phase 4</span>
                          <span className="font-sans font-bold text-slate-800 text-xs mt-1 min-h-[32px] flex items-center">Boost Higher</span>
                          <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mt-2 font-bold text-xs">🚀</div>
                        </div>
                      </div>

                      <div className="text-center font-mono text-[9px] text-indigo-500 font-semibold uppercase flex items-center justify-center space-x-1.5 pt-1">
                        <span>Loop Cycle Feedback: Phase 4 feeds back into Phase 1 automatically!</span>
                      </div>
                    </div>
                  );
                }

                return (
                  <pre key={idx} className="font-mono text-[10px] sm:text-xs leading-normal bg-slate-50 border border-slate-200 p-4 rounded-xl overflow-x-auto text-slate-700 my-4 whitespace-pre">
                    {cleanDiagram}
                  </pre>
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
  );
}
