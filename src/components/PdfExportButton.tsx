import React, { useRef, useEffect } from 'react';
import { Download, CheckCircle2, HelpCircle } from 'lucide-react';
import { LESSONS } from '../data/lessons';
import { MathSpan, processMathText } from '../lib/math';
import { ContentRenderer } from './ContentRenderer';

/**
 * PDF Book Generation logic
 * Renders all lessons into a hidden container and captures them as printable HTML / PDF view.
 */
export const PdfExportButton: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Pre-fetch and inline KaTeX CSS to avoid CORS issues in the PDF generator
  useEffect(() => {
    const inlineExternalCss = async () => {
      try {
        const katexUrl = 'https://unpkg.com/katex@0.16.11/dist/katex.min.css';
        const response = await fetch(katexUrl);
        if (response.ok) {
          const cssText = await response.text();
          const styleTag = document.createElement('style');
          styleTag.id = 'inlined-katex-styles';
          // Fix relative font paths in KaTeX CSS to absolute ones
          const absoluteCss = cssText.replace(/url\(fonts\//g, 'url(https://unpkg.com/katex@0.16.11/dist/fonts/');
          styleTag.textContent = absoluteCss;
          document.head.appendChild(styleTag);
        }
      } catch (err) {
        console.warn('Failed to inline KaTeX CSS for PDF generation:', err);
      }
    };
    
    inlineExternalCss();
  }, []);

  const openPrintableView = () => {
    if (!containerRef.current) return;
    
    const win = window.open('', '_blank');
    if (!win) {
      alert("Please allow popups to view the printable syllabus.");
      return;
    }

    const lessonsHtml = containerRef.current.innerHTML;
    
    win.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Investing & Finance Math Lab - Full Syllabus</title>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <script src="https://cdn.tailwindcss.com"></script>
          <link rel="stylesheet" href="https://unpkg.com/katex@0.16.11/dist/katex.min.css">
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800&family=JetBrains+Mono&family=Playfair+Display:ital,wght@0,700;1,400&family=Outfit:wght@400;700&display=swap" rel="stylesheet">
          <style>
            @media print {
              .no-print { display: none; }
              .page-break { page-break-after: always; }
              body { background-color: white !important; color: black !important; -webkit-print-color-adjust: exact; }
              .lesson-card { break-inside: avoid-page; margin-bottom: 2rem; }
            }
            body { 
              font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
              background-color: #f8fafc;
              color: #1e293b;
              padding: 2rem;
            }
            .print-container {
              max-width: 900px;
              margin: 0 auto;
              background: white;
              box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
              padding: 3rem;
              border-radius: 0.5rem;
            }
            @page {
              margin: 2cm;
            }
          </style>
        </head>
        <body>
          <div class="print-container">
            <div class="no-print mb-8 p-4 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-between">
              <div>
                <h3 class="font-bold text-indigo-900">Printable Study Guide</h3>
                <p class="text-sm text-indigo-700">Use <kbd class="px-1 py-0.5 bg-white border rounded tracking-tighter">Ctrl+P</kbd> to save as PDF or print.</p>
              </div>
              <button onclick="window.print()" class="px-6 py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-colors cursor-pointer">
                Print Syllabus
              </button>
            </div>
            
            <div id="syllabus-content">
              ${lessonsHtml}
            </div>
          </div>

          <script>
            tailwind.config = {
              theme: {
                extend: {
                  fontFamily: {
                    sans: ['Inter', 'sans-serif'],
                    mono: ['JetBrains Mono', 'monospace'],
                    serif: ['Georgia', 'serif'],
                  }
                }
              }
            }
          </script>
        </body>
      </html>
    `);
    win.document.close();
  };

  return (
    <>
      <button
        onClick={openPrintableView}
        className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all shadow-sm text-xs font-bold group cursor-pointer"
        id="btn-open-printable"
      >
        <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
        <span>Open Printable Syllabus</span>
      </button>

      {/* Hidden container for rendering */}
      <div className="fixed -left-[10000px] top-0 opacity-0 pointer-events-none" ref={containerRef}>
        {/* Cover Page */}
        <div id="pdf-lesson-cover" className="w-[800px] p-16 flex flex-col justify-center items-center text-center mb-16 rounded-2xl" style={{ backgroundColor: '#0f172a', color: '#ffffff' }}>
          <img src="/favicon.svg" alt="Investing & Finance Math Lab Logo" className="w-20 h-20 rounded-2xl mb-6 object-contain shadow-md" />
          <h1 className="text-4xl font-extrabold mb-3 font-sans tracking-tight">Investing & Finance Math Lab</h1>
          <p className="text-lg font-mono tracking-widest uppercase mb-8" style={{ color: '#a5b4fc' }}>Complete Course Syllabus & Study Guide</p>
          <div className="w-24 h-1 mb-8" style={{ backgroundColor: '#6366f1' }}></div>
          <p className="font-sans max-w-lg text-sm leading-relaxed mb-10" style={{ color: '#94a3b8' }}>
            A comprehensive guide to the mathematical foundations of financial markets, 
            designed for students and families studying quantitative economics, algebra, and stochastic finance.
          </p>

          <div className="w-full text-left bg-slate-800/80 border border-slate-700 p-6 rounded-xl space-y-3 font-sans text-xs">
            <h3 className="text-indigo-400 font-mono font-bold uppercase tracking-wider text-xs">Course Modules Index</h3>
            <div className="grid grid-cols-1 gap-2 text-slate-300">
              <div>• <strong>Unit 1:</strong> Compounding, Discounting & Time Value of Money</div>
              <div>• <strong>Unit 2:</strong> Selecting the Discount Rate & Cost of Capital</div>
              <div>• <strong>Unit 3:</strong> From Bank Accounts to Stock Ownership</div>
              <div>• <strong>Unit 3.5:</strong> Stock Valuation Without Growth (Zero-Growth Dividend Discount Model — DDM)</div>
              <div>• <strong>Unit 4:</strong> Dividend Discount Model & Gordon Growth Formula</div>
              <div>• <strong>Unit 5:</strong> Information Shocks & Random Walk Bridge</div>
              <div>• <strong>Unit 6:</strong> Stochastic Calculus & Asset Price Paths (GBM)</div>
              <div>• <strong>Unit 7:</strong> Modern Portfolio Theory & Mean-Variance Optimization</div>
              <div>• <strong>Unit 8:</strong> Black-Scholes-Merton Option Pricing & The Greeks</div>
              <div>• <strong>Unit 9:</strong> Behavioral Finance, Market Crowds & Speculative Dynamics</div>
              <div>• <strong>Bonus Unit:</strong> Auto Loans & Total Cost of Ownership</div>
            </div>
          </div>

          <div className="mt-12 font-mono text-xs" style={{ color: '#64748b' }}>
            Generated on {new Date().toLocaleDateString()}
          </div>
        </div>

        {Object.values(LESSONS).map((lesson) => (
          <div 
            key={lesson.id} 
            id={`pdf-lesson-${lesson.id}`} 
            className="w-[800px] p-10 mb-16 border border-slate-200 rounded-2xl lesson-card"
            style={{ backgroundColor: '#ffffff', color: '#1e293b', fontFamily: 'Georgia, serif' }}
          >
            {/* Unit Header */}
            <div className="mb-6 border-b-2 pb-4" style={{ borderBottomColor: '#4f46e5' }}>
              <div className="text-xs font-mono text-indigo-600 font-semibold uppercase tracking-wider mb-1">
                {lesson.mathTopic}
              </div>
              <h1 className="text-3xl font-bold mb-1 font-sans tracking-tight" style={{ color: '#0f172a' }}>{lesson.title}</h1>
              <p className="italic text-base" style={{ color: '#64748b' }}>{lesson.subtitle}</p>
            </div>

            <div className="space-y-6">
              {/* Narrative Introduction */}
              {lesson.introduction && (
                <div className="p-6 border-l-4 rounded-r-xl mb-6" style={{ backgroundColor: '#fcfcfd', borderLeftColor: '#4f46e5', borderTop: '1px solid #f1f5f9', borderRight: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9' }}>
                  <h2 className="text-lg font-bold mb-3 font-sans" style={{ color: '#0f172a' }}>The Big Picture</h2>
                  <div className="space-y-3 text-base leading-relaxed font-serif" style={{ color: '#475569' }}>
                    {lesson.introduction.split('\n\n').map((para, paraIdx) => (
                      <p key={paraIdx}>{processMathText(para)}</p>
                    ))}
                  </div>
                </div>
              )}

              {/* Core Formula Reference Block */}
              {lesson.equations && lesson.equations.length > 0 && (
                <div className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2 mb-6">
                  <span className="text-slate-500 font-mono text-xs block uppercase tracking-wider font-semibold">
                    Core Formula Reference
                  </span>
                  <div className="space-y-1.5 divide-y divide-slate-200/60 pt-0.5">
                    {lesson.equations.map((eq, eqIdx) => (
                      <div key={eqIdx} className="pt-1.5 first:pt-0 overflow-x-auto">
                        <MathSpan tex={eq} block className="my-0.5 [&_.katex-display]:my-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Full Text Content */}
              <ContentRenderer fullText={lesson.fullText} isPdfExport={true} />
            </div>

            {/* Quizzes & Practice Derivations */}
            {lesson.quizzes && lesson.quizzes.length > 0 && (
              <div className="mt-10 pt-8 border-t-2" style={{ borderTopColor: '#e2e8f0' }}>
                <h3 className="font-bold uppercase tracking-widest text-xs mb-6 font-sans text-indigo-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                  <span>Module Derivation & Practice Assessment</span>
                </h3>
                <div className="space-y-6">
                  {lesson.quizzes.map((quiz, qIdx) => (
                    <div key={quiz.id || qIdx} className="p-5 border border-slate-200 rounded-xl bg-slate-50/60 font-sans space-y-3">
                      <div className="font-bold text-sm text-slate-900">
                        {qIdx + 1}. {processMathText(quiz.question)}
                      </div>
                      <div className="grid grid-cols-1 gap-1.5 pl-2 text-xs text-slate-700">
                        {quiz.options.map((opt, optIdx) => {
                          const isCorrect = optIdx === quiz.correctIndex;
                          return (
                            <div 
                              key={optIdx} 
                              className={`p-2 rounded-lg border ${
                                isCorrect 
                                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-semibold' 
                                  : 'bg-white border-slate-200'
                              }`}
                            >
                              <span className="font-mono font-bold mr-2">{String.fromCharCode(65 + optIdx)}.</span>
                              {processMathText(opt)}
                              {isCorrect && <span className="ml-2 text-[10px] bg-emerald-600 text-white px-1.5 py-0.5 rounded font-mono font-bold">✓ CORRECT ANSWER</span>}
                            </div>
                          );
                        })}
                      </div>
                      <div className="pt-2 text-xs text-slate-600 bg-white p-3 rounded-lg border border-slate-200 space-y-1">
                        <div className="font-bold text-indigo-800 flex items-center gap-1 text-[11px]">
                          <HelpCircle className="w-3.5 h-3.5" />
                          <span>Mathematical Explanation & Step-by-Step Derivation:</span>
                        </div>
                        <div>{processMathText(quiz.explanation)}</div>
                        {quiz.hint && (
                          <div className="text-[11px] text-slate-500 italic pt-1 border-t border-slate-100">
                            Hint: {processMathText(quiz.hint)}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};
