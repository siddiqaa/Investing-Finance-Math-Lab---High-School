import React, { memo } from 'react';

/**
 * Global interface for KaTeX from CDN
 */
declare global {
  interface Window {
    katex: any;
  }
}

/**
 * KaTeX rendering String Cache to avoid expensive re-parsing during re-renders
 */
const katexCache = new Map<string, string>();

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
 * Safely renders LaTeX using KaTeX CDN with memoization.
 */
export const MathSpan: React.FC<{ tex: string; block?: boolean; className?: string }> = memo(({ 
  tex, 
  block = false, 
  className = "" 
}) => {
  const isKatexLoaded = typeof window !== 'undefined' && !!window.katex;
  
  if (isKatexLoaded) {
    try {
      const cacheKey = `${block ? 'block' : 'inline'}:${tex}`;
      let html = katexCache.get(cacheKey);

      if (!html) {
        html = window.katex.renderToString(cleanLaTeX(tex), {
          displayMode: block,
          throwOnError: false,
          trust: true,
          strict: false
        });

        // Limit cache size to 1500 compiled LaTeX string entries
        if (katexCache.size > 1500) {
          const firstKey = katexCache.keys().next().value;
          if (firstKey) katexCache.delete(firstKey);
        }
        katexCache.set(cacheKey, html);
      }
      
      const hasMarginY = className.includes('my-') || className.includes('py-');
      const blockMargin = block ? (hasMarginY ? "" : "my-4") : "";

      return (
        <span
          className={`${block ? `block text-center overflow-x-auto ${blockMargin}` : "inline-block align-baseline px-0.5"} ${className}`}
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
});

MathSpan.displayName = 'MathSpan';

/**
 * Single-pass AST tokenizer for parsing mixed text, LaTeX math, currency amounts, and HTML spans.
 * Completely avoids fragile regex replacements and catastrophic regex backtracking.
 */
function parseMathStringToAST(text: string, keyPrefix: string = 'root'): React.ReactNode {
  if (!text) return null;

  const nodes: React.ReactNode[] = [];
  let currentText = '';
  let i = 0;
  const len = text.length;

  const flushText = () => {
    if (currentText) {
      nodes.push(currentText);
      currentText = '';
    }
  };

  while (i < len) {
    // 1. Escaped Dollar (\$ or \\$)
    if (text[i] === '\\' && i + 1 < len && text[i + 1] === '$') {
      currentText += '$';
      i += 2;
      continue;
    }

    // 2. HTML <span className="...">...</span>
    if (text.startsWith('<span className="', i)) {
      const quoteStart = i + 17; // length of '<span className="'
      const quoteEnd = text.indexOf('"', quoteStart);
      if (quoteEnd !== -1) {
        const className = text.substring(quoteStart, quoteEnd);
        const tagClose = text.indexOf('>', quoteEnd);
        if (tagClose !== -1) {
          const closingSpan = text.indexOf('</span>', tagClose);
          if (closingSpan !== -1) {
            flushText();
            const innerText = text.substring(tagClose + 1, closingSpan);
            const key = `${keyPrefix}-span-${i}`;
            nodes.push(
              <span key={key} className={className}>
                {parseMathStringToAST(innerText, key)}
              </span>
            );
            i = closingSpan + 7; // length of '</span>'
            continue;
          }
        }
      }
    }

    // 3. Block Math $$...$$
    if (text.startsWith('$$', i)) {
      const closingPos = text.indexOf('$$', i + 2);
      if (closingPos !== -1) {
        flushText();
        const tex = text.substring(i + 2, closingPos).trim();
        const key = `${keyPrefix}-block-${i}`;
        nodes.push(<MathSpan key={key} tex={tex} block={true} />);
        i = closingPos + 2;
        continue;
      }
    }

    // 4. Inline Math $...$ or Currency ($100, $2.50)
    if (text[i] === '$') {
      const nextChar = text[i + 1] || '';
      // Currency check: if followed immediately by digit (e.g. $10, $2.50) -> treat as literal dollar
      const isDigit = nextChar >= '0' && nextChar <= '9';

      if (isDigit) {
        currentText += '$';
        i++;
        continue;
      }

      // Math check: look for matching unescaped closing $
      let closingPos = -1;
      for (let j = i + 1; j < len; j++) {
        if (text[j] === '$' && text[j - 1] !== '\\') {
          closingPos = j;
          break;
        }
      }

      if (closingPos !== -1 && closingPos > i + 1) {
        flushText();
        const tex = text.substring(i + 1, closingPos).trim();
        const key = `${keyPrefix}-inline-${i}`;
        nodes.push(<MathSpan key={key} tex={tex} block={false} />);
        i = closingPos + 1;
        continue;
      } else {
        // No closing $ found -> literal dollar
        currentText += '$';
        i++;
        continue;
      }
    }

    // 5. Default character
    currentText += text[i];
    i++;
  }

  flushText();

  if (nodes.length === 0) return null;
  if (nodes.length === 1 && typeof nodes[0] === 'string') return nodes[0];
  return <React.Fragment key={keyPrefix}>{nodes}</React.Fragment>;
}

/**
 * React Component for parsing and rendering string blocks containing inline KaTeX formulas.
 */
export const MathText: React.FC<{ text: string; className?: string }> = memo(({ text, className = '' }) => {
  if (!text) return null;
  const parsed = parseMathStringToAST(text);
  if (className) {
    return <span className={className}>{parsed}</span>;
  }
  return <>{parsed}</>;
});

MathText.displayName = 'MathText';

/**
 * Helper function for parsing text strings for $math$ delimiters and returning React nodes.
 */
export const processMathText = (text: string): React.ReactNode => {
  if (!text) return null;

  const trimmed = text.trim();

  // Check for standalone block math ($$ ... $$ or standalone $ ... $)
  if (
    (trimmed.startsWith('$$') && trimmed.endsWith('$$') && trimmed.length >= 4) ||
    (trimmed.startsWith('$') && trimmed.endsWith('$') && trimmed.length > 2 && trimmed.indexOf('$', 1) === trimmed.length - 1)
  ) {
    const rawTex = trimmed.startsWith('$$') ? trimmed.slice(2, -2) : trimmed.slice(1, -1);
    const cleanTex = rawTex.trim();
    return <MathSpan tex={cleanTex} block={true} />;
  }

  return parseMathStringToAST(text);
};
