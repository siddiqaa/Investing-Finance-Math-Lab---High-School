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
});

MathSpan.displayName = 'MathSpan';

/**
 * Parses text strings for $math$ delimiters and returns React nodes.
 * Handles currency escaping (using \$ to differentiate from math delimiters).
 * Uses a left-to-right tokenizer to correctly handle math inside markdown and vice versa.
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
    const cleanTex = rawTex.trim().replace(/\\\\\$/g, '\\$').replace(/\\\$/g, '\\$');
    return <MathSpan tex={cleanTex} block={true} />;
  }

  // Pre-process escaped dollars
  const escapedText = text.replace(/\\\\\$/g, '___ESC_DOLLAR___').replace(/\\\$/g, '___ESC_DOLLAR___');

  return parseTokens(escapedText, 'root');
};

const parseTokens = (text: string, keyPrefix: string): React.ReactNode => {
  if (!text) return null;

  // 1: Block Math, 2: Inline Math, 3: HTML span
  const lexerRegex = /(\$\$[\s\S]+?\$\$)|(\$[^\$]+\$)|(<span className="[^"]+">.*?<\/span>)/g;
  
  const elements: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = lexerRegex.exec(text)) !== null) {
    // Push preceding normal text
    if (match.index > lastIndex) {
      elements.push(text.substring(lastIndex, match.index).replace(/___ESC_DOLLAR___/g, '$'));
    }

    const token = match[0];
    const matchKey = `${keyPrefix}-${match.index}`;

    if (match[1]) {
      // Block Math
      const tex = token.slice(2, -2).replace(/___ESC_DOLLAR___/g, '\\$');
      elements.push(<MathSpan key={matchKey} tex={tex} block={true} />);
    } else if (match[2]) {
      // Inline Math
      const tex = token.slice(1, -1).replace(/___ESC_DOLLAR___/g, '\\$');
      elements.push(<MathSpan key={matchKey} tex={tex} block={false} />);
    } else if (match[3]) {
      // HTML span
      const classMatch = token.match(/className="([^"]+)"/);
      const className = classMatch ? classMatch[1] : '';
      const content = token.replace(/<span[^>]*>/, '').replace(/<\/span>/, '');
      elements.push(
        <span key={matchKey} className={className}>
          {parseTokens(content, matchKey)}
        </span>
      );
    }

    lastIndex = lexerRegex.lastIndex;
  }

  // Push remaining normal text
  if (lastIndex < text.length) {
    elements.push(text.substring(lastIndex).replace(/___ESC_DOLLAR___/g, '$'));
  }

  return <React.Fragment key={keyPrefix}>{elements}</React.Fragment>;
};
