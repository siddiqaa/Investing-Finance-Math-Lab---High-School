import React from 'react';

/**
 * Global interface for KaTeX from CDN
 */
declare global {
  interface Window {
    katex: any;
  }
}

/**
 * Standardizes LaTeX expressions to ensure KaTeX compatibility.
 * Replaces escaped currency signs if they were doubled and handles spacing.
 */
const cleanLaTeX = (latex: string): string => {
  return latex
    .trim()
    .replace(/\\\\\$/g, '\\$') // Normalize double escapes
    .replace(/___ESC_DOLLAR___/g, '\\$'); // Restore custom placeholders
};

/**
 * Safely renders LaTeX using KaTeX CDN.
 */
export const MathSpan: React.FC<{ tex: string; block?: boolean; className?: string }> = ({ 
  tex, 
  block = false, 
  className = "" 
}) => {
  const isKatexLoaded = typeof window !== 'undefined' && !!window.katex;
  
  if (isKatexLoaded) {
    try {
      const html = window.katex.renderToString(cleanLaTeX(tex), {
        displayMode: block,
        throwOnError: false,
        trust: true,
        strict: false
      });
      
      return (
        <span
          className={`${block ? "block text-center my-4 overflow-x-auto" : "inline-block align-middle mx-1"} ${className}`}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    } catch (err) {
      console.error("KaTeX render error:", err);
    }
  }

  // Raw text fallback if CDN fails
  return (
    <code className={`bg-slate-100 px-1 rounded text-slate-800 ${className}`}>
      {block ? `$$${tex}$$` : `$${tex}$`}
    </code>
  );
};

/**
 * Parses text strings for $math$ delimiters and returns React nodes.
 * Handles currency escaping (using \$ to differentiate from math delimiters).
 */
export const processMathText = (text: string): React.ReactNode => {
  if (!text) return null;

  // Use a unique placeholder for escaped dollar signs (currency)
  const escapedText = text.replace(/\\\\\$/g, '___ESC_DOLLAR___').replace(/\\\$/g, '___ESC_DOLLAR___');
  const tokens = escapedText.split('$');

  return (
    <>
      {tokens.map((token, i) => {
        if (i % 2 === 1) {
          // Odd indices are the content inside $...$
          return <MathSpan key={i} tex={token} />;
        }
        
        // Even indices are standard text - restore currency signs
        const restoredText = token.replace(/___ESC_DOLLAR___/g, '$');
        
        // Minor inline bolding check for simplicity
        if (restoredText.includes('**')) {
           const boldParts = restoredText.split('**');
           return (
             <span key={i}>
               {boldParts.map((bp, bIdx) => 
                 bIdx % 2 === 1 ? <strong key={bIdx} className="font-bold text-slate-900">{bp}</strong> : bp
               )}
             </span>
           );
        }

        return <span key={i}>{restoredText}</span>;
      })}
    </>
  );
};
