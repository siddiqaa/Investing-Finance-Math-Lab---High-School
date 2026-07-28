import React from 'react';
import { Sparkles, Sigma, ChevronsRight } from 'lucide-react';
import { MathSpan, processMathText } from '../lib/math';
import { ContentBlock, parseLessonBlocks } from '../lib/contentParser';

// Import Knowledge Checks (we can import them or pass them as a render prop/map, but let's import them directly for simplicity if this is for the web)
import { TvmKnowledgeCheck } from './TvmKnowledgeCheck';
import { DiscountKnowledgeCheck } from './DiscountKnowledgeCheck';
import { NpvKnowledgeCheck } from './NpvKnowledgeCheck';
import { ValuationKnowledgeCheck } from './ValuationKnowledgeCheck';
import { NewsBridgeKnowledgeCheck } from './NewsBridgeKnowledgeCheck';

interface ContentRendererProps {
  fullText: string[];
  setActiveModule?: (module: string) => void;
  isPdfExport?: boolean;
}

export function ContentRenderer({ fullText, setActiveModule, isPdfExport = false }: ContentRendererProps) {
  const blocks = parseLessonBlocks(fullText);

  return (
    <>
      {blocks.map((block, idx) => {
        switch (block.type) {
          case 'header':
            if (isPdfExport) {
              return (
                <div key={idx} className="pt-4">
                  <h2 className="text-xl font-bold mb-3 font-sans flex items-center gap-2.5" style={{ color: '#0f172a' }}>
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg text-sm font-bold" style={{ backgroundColor: '#e0e7ff', color: '#4338ca' }}>
                      {block.level}
                    </span>
                    {processMathText(block.content!)}
                  </h2>
                </div>
              );
            }
            return (
              <div key={idx} className="pt-4 pb-1">
                <h4 className="font-sans font-bold text-slate-800 text-base md:text-lg flex items-center gap-2">
                  <span className="flex items-center justify-center bg-indigo-100 text-indigo-700 w-7 h-7 rounded-lg text-sm font-bold flex-shrink-0">
                    {block.level}
                  </span>
                  {processMathText(block.content!)}
                </h4>
              </div>
            );

          case 'title':
            if (isPdfExport) {
              return (
                <h3 key={idx} className="font-sans font-bold text-base text-slate-800 pt-3">
                  {processMathText(block.content!)}
                </h3>
              );
            }
            return (
              <div key={idx} className="pt-3 pb-1">
                <h5 className="font-sans font-bold text-slate-800 text-xs sm:text-sm uppercase tracking-wider text-slate-600">
                  {processMathText(block.content!)}
                </h5>
              </div>
            );

          case 'example':
            return (
              <div key={idx} className="my-4 p-4 border border-indigo-200 rounded-xl bg-indigo-50/40 font-sans text-xs sm:text-sm text-slate-800 space-y-2">
                {processMathText(block.content!)}
              </div>
            );

          case 'bullet_list':
            return (
              <ul key={idx} className="my-3 space-y-1.5 list-disc list-inside font-serif text-sm leading-relaxed text-slate-700">
                {block.items!.map((line, lIdx) => (
                  <li key={lIdx}>{processMathText(line)}</li>
                ))}
              </ul>
            );

          case 'paragraph':
            return (
              <p key={idx} className={isPdfExport ? "text-base leading-relaxed font-serif my-3 text-slate-700" : "text-base leading-relaxed font-serif my-3 text-slate-600"}>
                {processMathText(block.content!)}
              </p>
            );

          case 'side_quest':
            if (isPdfExport) return null;
            return (
              <div key={idx} className="bg-indigo-50/60 border border-indigo-150 rounded-2xl p-5 my-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-3xs" id={`side-quest-callout-${block.questId}`}>
                <div className="space-y-1 text-left">
                  <div className="flex items-center gap-1.5 text-xs text-indigo-700 font-mono font-extrabold uppercase">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
                    <span>Core Math Side Quest Available</span>
                  </div>
                  <h5 className="font-sans font-bold text-slate-900 text-sm">
                    {processMathText(block.questTitle!)}
                  </h5>
                </div>
                {setActiveModule && (
                  <button
                    type="button"
                    onClick={() => setActiveModule(block.questId!)}
                    className="text-xs bg-indigo-600 hover:bg-indigo-500 text-white font-sans font-extrabold px-4 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer whitespace-nowrap self-start sm:self-center"
                  >
                    <Sigma className="w-4 h-4 text-white" />
                    <span>Open Side Quest</span>
                    <ChevronsRight className="w-3.5 h-3.5 text-indigo-200" />
                  </button>
                )}
              </div>
            );

          case 'knowledge_check_tvm':
            if (isPdfExport) return null;
            return <TvmKnowledgeCheck key={idx} initialValue={5000} annualRate={0.06} />;
            
          case 'knowledge_check_discount':
            if (isPdfExport) return null;
            return <DiscountKnowledgeCheck key={idx} />;

          case 'knowledge_check_npv':
            if (isPdfExport) return null;
            return <NpvKnowledgeCheck key={idx} />;

          case 'knowledge_check_valuation':
            if (isPdfExport) return null;
            return <ValuationKnowledgeCheck key={idx} />;

          case 'knowledge_check_news':
            if (isPdfExport) return null;
            return <NewsBridgeKnowledgeCheck key={idx} />;

          case 'table':
            if (isPdfExport) return null;
            return (
              <div className="my-4 overflow-x-auto border border-slate-200 rounded-xl overflow-hidden shadow-xs" key={idx}>
                <table className="min-w-full divide-y divide-slate-200 text-left text-xs sm:text-sm">
                  <thead className="bg-slate-50 font-sans font-bold text-slate-700">
                    <tr>
                      {block.headers!.map((h, hIdx) => (
                        <th key={hIdx} className="px-4 py-2 hover:bg-slate-100/50 transition-colors font-semibold">
                          {processMathText(h)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white font-serif text-slate-600">
                    {block.rows!.map((row, rIdx) => (
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

          case 'warning':
            if (isPdfExport) return null;
            return (
              <div className="bg-amber-50/60 border-l-4 border-amber-500 rounded-r-xl p-4 my-4 flex items-start gap-3 shadow-xs font-sans text-xs sm:text-sm" key={idx}>
                <div className="text-amber-800 leading-relaxed">
                  {processMathText(block.content!)}
                </div>
              </div>
            );

          case 'experiment':
            if (isPdfExport) return null;
            return (
              <div className="bg-emerald-50/60 border-l-4 border-emerald-500 rounded-r-xl p-4 my-4 flex items-start gap-3 shadow-xs font-sans text-xs sm:text-sm" key={idx}>
                <div className="text-emerald-800 leading-relaxed">
                  {processMathText(block.content!)}
                </div>
              </div>
            );

          case 'search':
            if (isPdfExport) return null;
            return (
              <div className="bg-sky-50/60 border-l-4 border-sky-500 rounded-r-xl p-4 my-4 flex items-start gap-3 shadow-xs font-sans text-xs sm:text-sm" key={idx}>
                <div className="text-sky-800 leading-relaxed">
                  {processMathText(block.content!)}
                </div>
              </div>
            );

          case 'diagram':
            if (isPdfExport) return null;
            
            const cleanDiagram = block.content!;
            
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
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-4 overflow-x-auto shadow-xs" key={idx}>
                <pre className="font-mono text-xs sm:text-sm text-slate-600">
                  {cleanDiagram}
                </pre>
              </div>
            );

          default:
            return null;
        }
      })}
    </>
  );
}
