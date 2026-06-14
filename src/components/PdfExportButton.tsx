import React, { useRef, useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import * as htmlToImage from 'html-to-image';
import { Download, Loader2, BrainCircuit } from 'lucide-react';
import { LESSONS } from '../data/lessons';
import { MathSpan, processMathText } from '../lib/math';

/**
 * PDF Book Generation logic
 * Renders all lessons into a hidden container and captures them as PDF.
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
              padding: 4rem;
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
              <button onclick="window.print()" class="px-6 py-2 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-colors">
                Print Syllabus
              </button>
            </div>
            
            <div id="syllabus-content">
              ${lessonsHtml}
            </div>
          </div>

          <script>
            // Ensure tailwind config matches app
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

      {/* Hidden container for rendering - we keep it so we can grab the HTML */}
      <div className="fixed -left-[10000px] top-0 opacity-0 pointer-events-none" ref={containerRef}>
        {/* Cover Page */}
        <div id="pdf-lesson-cover" className="w-[800px] h-[1130px] p-24 flex flex-col justify-center items-center text-center" style={{ backgroundColor: '#0f172a', color: '#ffffff' }}>
          <div className="w-24 h-24 rounded-3xl mb-8 flex items-center justify-center" style={{ backgroundColor: '#4f46e5' }}>
            <BrainCircuit className="w-16 h-16 text-white" />
          </div>
          <h1 className="text-5xl font-extrabold mb-4 font-sans tracking-tight">Investing & Finance Math Lab</h1>
          <p className="text-xl font-mono tracking-widest uppercase mb-12" style={{ color: '#a5b4fc' }}>Syllabus Study Guide</p>
          <div className="w-32 h-1 mb-12" style={{ backgroundColor: '#6366f1' }}></div>
          <p className="font-sans max-w-md" style={{ color: '#94a3b8' }}>
            A comprehensive guide to the mathematical foundations of financial markets, 
            designed for high school students and families studying quantitative economics.
          </p>
          <div className="mt-auto pt-24 font-mono text-sm" style={{ color: '#64748b' }}>
            Generated on {new Date().toLocaleDateString()}
          </div>
        </div>

        {Object.values(LESSONS).map((lesson) => (
          <div 
            key={lesson.id} 
            id={`pdf-lesson-${lesson.id}`} 
            className="w-[800px] p-12"
            style={{ backgroundColor: '#ffffff', color: '#1e293b', fontFamily: 'Georgia, serif' }}
          >
            <div className="mb-8 border-b-2 pb-4" style={{ borderBottomColor: '#4f46e5' }}>
              <h1 className="text-3xl font-bold mb-2 font-sans tracking-tight" style={{ color: '#0f172a' }}>{lesson.title}</h1>
              <p className="italic text-lg" style={{ color: '#64748b' }}>{lesson.subtitle}</p>
            </div>

            <div className="space-y-6">
              {/* Narrative Introduction */}
              {lesson.introduction && (
                <div className="p-8 border-l-4 rounded-r-xl mb-8" style={{ backgroundColor: '#fcfcfd', borderLeftColor: '#4f46e5', borderTop: '1px solid #f1f5f9', borderRight: '1px solid #f1f5f9', borderBottom: '1px solid #f1f5f9' }}>
                  <h2 className="text-xl font-bold mb-4 font-sans" style={{ color: '#0f172a' }}>The Big Picture</h2>
                  <div className="space-y-4 text-lg leading-relaxed font-serif" style={{ color: '#475569' }}>
                    {lesson.introduction.split('\n\n').map((para, paraIdx) => (
                      <p key={paraIdx}>{processMathText(para)}</p>
                    ))}
                  </div>
                </div>
              )}

              {lesson.fullText.map((p, pIdx) => {
                const trimmed = p.trim();

                // Simple header check
                const headerMatch = trimmed.match(/^(\d+)\.\s+\*\*([^*]+)\*\*/);
                if (headerMatch) {
                  const [_, num, headerText] = headerMatch;
                  return (
                    <div key={pIdx} className="pt-6">
                      <h2 className="text-2xl font-bold mb-4 font-sans flex items-center gap-3" style={{ color: '#0f172a' }}>
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-lg font-bold" style={{ backgroundColor: '#e0e7ff', color: '#4338ca' }}>
                          {num}
                        </span>
                        {headerText}
                      </h2>
                    </div>
                  );
                }

                // Table parsing
                if (trimmed.includes('|') && !trimmed.startsWith('DIAGRAM|')) {
                  const tableContent = trimmed.replace(/^[A-Z0-9_]+_TABLE\|/, '');
                  const lines = tableContent.split('\n').map(l => l.trim()).filter(l => l.length > 0);
                  if (lines.length > 0) {
                    const headers = lines[0].split('|').map(h => h.trim());
                    const rows = lines.slice(1).map(line => line.split('|').map(cell => cell.trim()));
                    return (
                      <div className="my-6 border rounded-lg overflow-hidden" key={pIdx} style={{ borderColor: '#e2e8f0' }}>
                        <table className="w-full border-collapse text-sm">
                          <thead className="font-bold" style={{ backgroundColor: '#f8fafc', color: '#334155' }}>
                            <tr>
                              {headers.map((h, hIdx) => (
                                <th key={hIdx} className="px-4 py-3 border-b text-left" style={{ borderBottomColor: '#e2e8f0' }}>
                                  {processMathText(h)}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y" style={{ borderTopColor: '#f1f5f9' }}>
                            {rows.map((row, rIdx) => (
                              <tr key={rIdx}>
                                {row.map((cell, cIdx) => (
                                  <td key={cIdx} className="px-4 py-3" style={{ color: '#475569', borderTop: '1px solid #f1f5f9' }}>
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

                // Diagrams
                if (trimmed.startsWith('DIAGRAM|')) {
                  return (
                    <pre key={pIdx} className="border p-6 rounded-xl font-mono text-xs my-6 whitespace-pre" style={{ backgroundColor: '#f8fafc', borderColor: '#e2e8f0', color: '#334155' }}>
                      {trimmed.substring(8)}
                    </pre>
                  );
                }

                return (
                  <p key={pIdx} className="text-lg leading-relaxed font-serif" style={{ color: '#334155' }}>
                    {processMathText(p)}
                  </p>
                );
              })}
            </div>

            {/* Formulas Summary Section in PDF */}
            <div className="mt-12 p-8 border rounded-2xl" style={{ backgroundColor: '#f5f7ff', borderColor: '#e0e7ff' }}>
              <h3 className="font-bold uppercase tracking-widest text-sm mb-6 border-b pb-2 font-sans" style={{ color: '#3730a3', borderBottomColor: '#c7d2fe' }}>
                Key Formulas for Reference
              </h3>
              <div className="grid grid-cols-1 gap-8">
                {lesson.equations.map((eq, eqIdx) => (
                  <div key={eqIdx} className="text-xl">
                    <MathSpan tex={eq} block />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
