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
      
      const hasMarginY = className.includes('my-') || className.includes('py-');
      const blockMargin = block ? (hasMarginY ? "" : "my-4") : "";

      return (
        <span
          className={`${block ? `block text-center overflow-x-auto ${blockMargin}` : "inline-block align-middle mx-1"} ${className}`}
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
 * Converts markdown bolding (*text* or **text**) in standard text into HTML spans.
 */
const parseMarkdownFormatting = (text: string, keyPrefix: string | number): React.ReactNode => {
  if (!text) return null;

  // Match **bold** or *bold* where group 1 is ** or * and group 2 is content
  const regex = /(\*\*|\*)([^*]+)\1/g;
  const elements: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      elements.push(text.substring(lastIndex, match.index));
    }
    
    const content = match[2];
    elements.push(
      <span key={`${keyPrefix}-${match.index}`} className="font-bold text-slate-900">
        {content}
      </span>
    );

    lastIndex = regex.lastIndex;
  }

  if (lastIndex === 0) {
    return text;
  }

  if (lastIndex < text.length) {
    elements.push(text.substring(lastIndex));
  }

  return <React.Fragment key={keyPrefix}>{elements}</React.Fragment>;
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
        
        return parseMarkdownFormatting(restoredText, i);
      })}
    </>
  );
};
