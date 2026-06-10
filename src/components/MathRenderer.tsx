import React from 'react';

interface MathRendererProps {
  equation: string;
  block?: boolean;
}

/**
 * A beautiful, highly custom mathematical formula renderer.
 * Instead of relying on heavy third-party NPM LaTeX packages which can have major peer-dependency issues in React 19,
 * this component parses standard quantitative financial equations and renders them in high-fidelity mathematical typography
 * using elegant HTML, subscripts, fractions, and symbols.
 */
export const MathRenderer: React.FC<MathRendererProps> = ({ equation, block = false }) => {
  // Map our high-priority financial mathematics equations to pristine, custom-crafted visual markup.
  const renderFormula = (eq: string) => {
    const trimmed = eq.trim();

    switch (trimmed) {
      // Module 1
      case 'FV = PV \\times (1 + r)^n':
        return (
          <span className="font-serif italic text-lg tracking-wide text-slate-800">
            FV = PV × (1 + r)<sup>n</sup>
          </span>
        );
      case 'FV = PV \\times e^{r t} \\quad \\text{as } m \\to \\infty':
        return (
          <span className="font-serif italic text-lg tracking-wide text-slate-800">
            FV = PV × e<sup>r t</sup> &nbsp;&nbsp;&nbsp;&nbsp;
            <span className="font-sans text-sm not-italic font-normal text-slate-500">
              as m → ∞
            </span>
          </span>
        );
      case 'PV = \\sum_{t=1}^{\\infty} \\frac{CF_t}{(1 + r)^t}':
        return (
          <div className="flex items-center space-x-1 font-serif text-lg text-slate-800">
            <span>PV =</span>
            <div className="flex flex-col items-center justify-center px-1">
              <span className="text-sm not-italic h-4 leading-none font-sans font-medium">∞</span>
              <span className="text-2xl leading-none -my-1">∑</span>
              <span className="text-xs not-italic h-4 leading-none font-sans">t=1</span>
            </div>
            <div className="flex flex-col items-center px-1">
              <span className="border-b border-slate-700 pb-0.5 px-1">CF<sub>t</sub></span>
              <span className="pt-0.5 px-1">(1 + r)<sup>t</sup></span>
            </div>
          </div>
        );
      case 'P_0 = \\frac{D_0 (1 + g)}{r - g} \\quad (r > g)':
        return (
          <div className="flex items-center space-x-2 font-serif text-lg text-slate-800">
            <span>P<sub>0</sub> =</span>
            <div className="flex flex-col items-center px-1">
              <span className="border-b border-slate-700 pb-0.5 px-1">D<sub>0</sub>(1 + g)</span>
              <span className="pt-0.5 px-1">r - g</span>
            </div>
            <span className="font-sans text-sm not-italic font-normal text-slate-500 ml-4">
              (for r &gt; g)
            </span>
          </div>
        );

      // Module 2
      case '\\text{Return} = \\frac{\\text{New Price} - \\text{Old Price}}{\\text{Old Price}}':
        return (
          <div className="flex items-center space-x-1 font-serif text-lg text-slate-800">
            <span className="font-sans text-sm not-italic font-medium text-slate-600 mr-1">Return</span>
            <span>=</span>
            <div className="flex flex-col items-center px-1">
              <span className="border-b border-slate-700 pb-0.5 px-2">New Price - Old Price</span>
              <span className="pt-0.5 px-2">Old Price</span>
            </div>
          </div>
        );
      case 'S_t = S_{t-1} \\times (1 + r_t)':
        return (
          <span className="font-serif italic text-lg tracking-wide text-slate-800">
            S<sub>t</sub> = S<sub>t-1</sub> × (1 + r<sub>t</sub>)
          </span>
        );
      case 'dS_t = \\mu S_t dt + \sigma S_t dW_t':
      case 'dS_t = \\mu S_t dt + \\sigma S_t dW_t':
        return (
          <span className="font-serif italic text-lg tracking-wide text-slate-800">
            dS<sub>t</sub> = μ S<sub>t</sub> dt + σ S<sub>t</sub> dW<sub>t</sub>
          </span>
        );
      case 'S_t = S_0 \\exp\\left(\\left(\\mu - \\frac{\\sigma^2}{2}\\right)t + \\sigma W_t\\right)':
        return (
          <span className="font-serif italic text-lg tracking-wide text-slate-800 flex items-center flex-wrap">
            <span>S<sub>t</sub> = S<sub>0</sub> exp</span>
            <span className="font-sans text-2xl font-light mx-0.5">(</span>
            <span className="flex items-center">
              <span>(μ - </span>
              <span className="flex flex-col items-center px-1 text-xs -mt-1">
                <span className="border-b border-slate-700 pb-0.5 px-1">σ<sup>2</sup></span>
                <span className="pt-0.5 px-1">2</span>
              </span>
              <span>)t + σ W<sub>t</sub></span>
            </span>
            <span className="font-sans text-2xl font-light mx-0.5">)</span>
          </span>
        );
      case '\\ln(S_t) \\sim \\mathcal{N}\\left(\\ln(S_0) + \\left(\\mu - \\frac{\\sigma^2}{2}\\right)t, \\,\\sigma^2 t\\right)':
        return (
          <span className="font-serif italic text-lg tracking-wide text-slate-800 flex items-center flex-wrap">
            <span>ln(S<sub>t</sub>) ~ <span className="font-sans font-semibold">N</span></span>
            <span className="font-sans text-2xl font-light mx-0.5">(</span>
            <span className="flex items-center">
              <span>ln(S<sub>0</sub>) + (μ - </span>
              <span className="flex flex-col items-center px-1 text-xs -mt-1">
                <span className="border-b border-slate-700 pb-0.5 px-1">σ<sup>2</sup></span>
                <span className="pt-0.5 px-1">2</span>
              </span>
              <span>)t, σ<sup>2</sup>t</span>
            </span>
            <span className="font-sans text-2xl font-light mx-0.5">)</span>
          </span>
        );

      // Module 3
      case 'E[R_p] = w_1 R_1 + w_2 R_2 + w_3 R_3':
        return (
          <span className="font-serif italic text-lg tracking-wide text-slate-800">
            E[R<sub>p</sub>] = w<sub>1</sub>R<sub>1</sub> + w<sub>2</sub>R<sub>2</sub> + w<sub>3</sub>R<sub>3</sub>
          </span>
        );
      case 'R_p = \\mathbf{w}^T \\mathbf{R}':
        return (
          <span className="font-serif italic text-lg tracking-wide text-slate-800">
            R<sub>p</sub> = <strong className="font-sans">w</strong><sup>T</sup><strong className="font-sans">R</strong>
          </span>
        );
      case '\\sigma_p^2 = \\mathbf{w}^T \\mathbf{\\Sigma} \\mathbf{w}':
        return (
          <span className="font-serif italic text-lg tracking-wide text-slate-800">
            σ<sub>p</sub><sup>2</sup> = <strong className="font-sans">w</strong><sup>T</sup><strong>Σ</strong><strong className="font-sans">w</strong>
          </span>
        );
      case '\\text{Sharpe Ratio} = \\frac{E[R_p] - R_f}{\\sigma_p}':
        return (
          <div className="flex items-center space-x-1 font-serif text-lg text-slate-800">
            <span className="font-sans text-sm not-italic font-medium text-slate-600 mr-1">Sharpe Ratio</span>
            <span>=</span>
            <div className="flex flex-col items-center px-1">
              <span className="border-b border-slate-700 pb-0.5 px-1">E[R<sub>p</sub>] - R<sub>f</sub></span>
              <span className="pt-0.5 px-1">σ<sub>p</sub></span>
            </div>
          </div>
        );
      case 'E[R_i] = R_f + \\beta_i (E[R_m] - R_f)':
        return (
          <span className="font-serif italic text-lg tracking-wide text-slate-800">
            E[R<sub>i</sub>] = R<sub>f</sub> + β<sub>i</sub>(E[R<sub>m</sub>] - R<sub>f</sub>)
          </span>
        );

      // Module 4
      case '\\text{Call Payoff} = \\max(S_T - K, 0)':
        return (
          <span className="font-serif italic text-lg tracking-wide text-slate-800">
            Call Payoff = max(S<sub>T</sub> - K, 0)
          </span>
        );
      case 'C(S, t) = S_t N(d_1) - K e^{-r(T-t)} N(d_2)':
        return (
          <span className="font-serif italic text-lg tracking-wide text-slate-800">
            C(S, t) = S<sub>t</sub> N(d<sub>1</sub>) - K e<sup>-r(T-t)</sup> N(d<sub>2</sub>)
          </span>
        );
      case 'd_1 = \\frac{\\ln(S_t/K) + (r + \\sigma^2/2)(T-t)}{\\sigma \\sqrt{T-t}}':
        return (
          <div className="flex items-center space-x-1 font-serif text-lg text-slate-800">
            <span>d<sub>1</sub> =</span>
            <div className="flex flex-col items-center px-1">
              <span className="border-b border-slate-700 pb-0.5 px-1 flex items-center">
                <span>ln(S<sub>t</sub> / K) + (r + </span>
                <span className="flex flex-col items-center px-1 text-xs">
                  <span className="border-b border-slate-700 pb-0.2 px-0.5">σ<sup>2</sup></span>
                  <span className="pt-0.2 px-0.5">2</span>
                </span>
                <span>)(T - t)</span>
              </span>
              <span className="pt-0.5 px-1">σ √<span className="border-t border-slate-700 pt-0.5">T - t</span></span>
            </div>
          </div>
        );
      case 'd_2 = d_1 - \\sigma \\sqrt{T-t}':
        return (
          <span className="font-serif italic text-lg tracking-wide text-slate-800">
            d<sub>2</sub> = d<sub>1</sub> - σ √<span className="border-t border-slate-800 pt-0.5">T - t</span>
          </span>
        );
      case '\\frac{\\partial V}{\\partial t} + r S \\frac{\\partial V}{\\partial S} + \\frac{1}{2} \\sigma^2 S^2 \\frac{\\partial^2 V}{\\partial S^2} - r V = 0':
        return (
          <div className="flex items-center space-x-1 font-serif text-lg text-slate-800 flex-wrap py-2">
            <div className="flex flex-col items-center px-0.5">
              <span className="border-b border-slate-700 pb-0.5">∂V</span>
              <span className="pt-0.5">∂t</span>
            </div>
            <span className="px-1">+ rS</span>
            <div className="flex flex-col items-center px-0.5">
              <span className="border-b border-slate-700 pb-0.5">∂V</span>
              <span className="pt-0.5">∂S</span>
            </div>
            <span className="px-1">+</span>
            <div className="flex flex-col items-center px-0.5">
              <span className="border-b border-slate-700 pb-0.5">1</span>
              <span className="pt-0.5">2</span>
            </div>
            <span className="px-1">σ<sup>2</sup> S<sup>2</sup></span>
            <div className="flex flex-col items-center px-0.5">
              <span className="border-b border-slate-700 pb-0.5">∂<sup>2</sup>V</span>
              <span className="pt-0.5">∂S<sup>2</sup></span>
            </div>
            <span className="px-1">- rV = 0</span>
          </div>
        );

      // Module 5 - Behavioral Economics
      case '\\mathbb{E}[r_{t+1} \\mid r_t, r_{t-1}, \\dots] = \\mu':
        return (
          <span className="font-serif italic text-lg tracking-wide text-slate-800">
            E[r<sub>t+1</sub> | r<sub>t</sub>, r<sub>t-1</sub>, ...] = μ
          </span>
        );
      case '\\rho(k) = \\frac{\\text{Cov}(r_t, r_{t-k})}{\\text{Var}(r_t)}':
        return (
          <div className="flex items-center space-x-1 font-serif text-lg text-slate-800">
            <span>ρ(k) =</span>
            <div className="flex flex-col items-center px-1">
              <span className="border-b border-slate-700 pb-0.5 px-1.5 text-xs">Cov(r<sub>t</sub>, r<sub>t-k</sub>)</span>
              <span className="pt-0.5 px-1.5 text-xs">Var(r<sub>t</sub>)</span>
            </div>
          </div>
        );
      case '\\text{StdError} = \\pm \\frac{2}{\\sqrt{N}}':
        return (
          <div className="flex items-center space-x-1 font-serif text-lg text-slate-800">
            <span className="font-sans text-sm not-italic font-medium text-slate-600 mr-1">StdError</span>
            <span>= ±</span>
            <div className="flex flex-col items-center px-1">
              <span className="border-b border-slate-700 pb-0.5 px-1.5 text-xs">2</span>
              <span className="pt-0.5 px-1.5 text-xs">√N</span>
            </div>
          </div>
        );
      case 'P(\\text{wrong}) = \\frac{(1-p)^2}{2(p^2 - p + 1)}':
      case 'P(\\text{wrong cascade}) = \\frac{(1 - p)^2}{2(p^2 - p + 1)}':
        return (
          <div className="flex items-center space-x-1 font-serif text-lg text-slate-800">
            <span>P(wrong cascade) =</span>
            <div className="flex flex-col items-center px-1">
              <span className="border-b border-slate-700 pb-0.5 px-1.5 text-xs">(1 - p)<sup>2</sup></span>
              <span className="pt-0.5 px-1.5 text-xs">2(p<sup>2</sup> - p + 1)</span>
            </div>
          </div>
        );
      case 'v(x) = \\begin{cases} x^{\\alpha} & x \\ge 0 \\\\ -\\lambda (-x)^{\\beta} & x < 0 \\end{cases}':
      case 'v(x) = \\begin{cases} x^{\\alpha} & x \\ge 0 \\\\ -\\lambda(-x)^{\\beta} & x < 0 \\end{cases}':
        return (
          <div className="flex items-center space-x-2 font-serif text-lg text-slate-800">
            <span>v(x) =</span>
            <span className="text-3xl font-light font-sans -mr-1">{"{"}</span>
            <div className="flex flex-col text-sm space-y-1 justify-center">
              <div className="flex items-center space-x-2">
                <span>x<sup>α</sup></span>
                <span className="text-[11px] font-sans text-slate-500">for x ≥ 0</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>-λ(-x)<sup>β</sup></span>
                <span className="text-[11px] font-sans text-slate-500">for x &lt; 0</span>
              </div>
            </div>
          </div>
        );
      case 'dS_t = [\\mu + \\kappa (r_{\\text{recent}})] S_t dt + \\sigma S_t dW_t':
      case 'dS = [\\mu + \\kappa \\cdot (r_{\\text{recent}})] S dt + \\sigma S dW_t':
        return (
          <span className="font-serif italic text-lg tracking-wide text-slate-800">
            dS = [μ + κ · r<sub>recent</sub>] S dt + σ S dW<sub>t</sub>
          </span>
        );
      case '\\text{Margin Liquidated if } S_t > S_0 \\left(1 + \\frac{C_0}{L}\\right)':
        return (
          <div className="flex items-center space-x-1.5 font-serif text-lg text-slate-800 flex-wrap">
            <span className="font-sans text-xs not-italic font-medium text-slate-600 bg-red-50 text-red-700 px-2 py-0.5 rounded">Margin Liquidated if</span>
            <span>S<sub>t</sub> &gt; S<sub>0</sub></span>
            <span className="font-sans text-xl font-light">(</span>
            <span>1 +</span>
            <div className="flex flex-col items-center px-1 text-sm">
              <span className="border-b border-slate-700 pb-0.2 px-1">C<sub>0</sub></span>
              <span className="pt-0.2 px-1">L</span>
            </div>
            <span className="font-sans text-xl font-light">)</span>
          </div>
        );
      case 'F_t = S_t e^{(r + u - y)T}':
      case 'F = S \\cdot e^{(r + u - y)T}':
        return (
          <span className="font-serif italic text-lg tracking-wide text-slate-800">
            F = S · e<sup>(r + u - y)T</sup>
          </span>
        );
      case 'E[R_i] = R_f + \\beta_{i} (R_m - R_f) + s_i \\cdot SML_{momentum}':
        return (
          <span className="font-serif italic text-lg tracking-wide text-slate-800">
            E[R<sub>i</sub>] = R<sub>f</sub> + β<sub>i</sub>(R<sub>m</sub> - R<sub>f</sub>) + s<sub>i</sub> · SML<sub>momentum</sub>
          </span>
        );

      default:
        // Simple fallback formatter for smaller inline blocks
        return <code className="font-mono bg-slate-100 text-slate-800 px-1.5 py-0.5 rounded text-sm break-all">{eq}</code>;
    }
  };

  if (block) {
    return (
      <div className="my-4 p-4 bg-slate-50/70 border border-slate-200/50 rounded-xl flex justify-center items-center select-all overflow-x-auto min-h-[4.5rem]">
        {renderFormula(equation)}
      </div>
    );
  }

  return <span className="inline-flex mx-1 align-middle">{renderFormula(equation)}</span>;
};

/**
 * Parses LaTeX commands into standard formatted HTML layout string.
 */
export const renderInlineMath = (eq: string): string => {
  let html = eq.trim();

  // 1. Core LaTeX symbols & Greek letter expansions
  html = html
    .replace(/\\mathbb\{E\}/g, 'E')
    .replace(/\\mathbb\{R\}/g, 'ℝ')
    .replace(/\\mathcal\{N\}/g, '<span class="font-sans font-semibold">N</span>')
    .replace(/\\mathrm\{([^\}]+)\}/g, '$1')
    .replace(/\\text\{([^\}]+)\}/g, '<span class="font-sans not-italic font-normal text-slate-500">$1</span>')
    .replace(/\\mathbf\{([^\}]+)\}/g, '<strong class="font-sans font-bold">$1</strong>')
    .replace(/\\partial/g, '∂')
    .replace(/\\times/g, ' × ')
    .replace(/\\quad/g, '&nbsp;&nbsp;')
    .replace(/\\approx/g, ' ≈ ')
    .replace(/\\ge/g, ' ≥ ')
    .replace(/\\le/g, ' ≤ ')
    .replace(/\\pm/g, ' ± ')
    .replace(/\\to/g, ' → ')
    .replace(/\\lim/g, 'lim')
    .replace(/\\exp/g, 'exp')
    .replace(/\\max/g, 'max')
    .replace(/\\ln/g, 'ln')
    .replace(/\\cdot/g, ' · ')
    .replace(/\\Delta/g, 'Δ')
    .replace(/\\Sigma/g, 'Σ')
    .replace(/\\infty/g, '∞')
    .replace(/\\sum/g, '∑')
    .replace(/\\mid/g, '|')
    .replace(/\\dots/g, '...')
    // Greek letters
    .replace(/\\mu/g, 'μ')
    .replace(/\\sigma/g, 'σ')
    .replace(/\\rho/g, 'ρ')
    .replace(/\\alpha/g, 'α')
    .replace(/\\beta/g, 'β')
    .replace(/\\lambda/g, 'λ')
    .replace(/\\epsilon/g, 'ε')
    .replace(/\\varphi/g, 'φ')
    .replace(/\\kappa/g, 'κ')
    .replace(/\\gamma/g, 'γ')
    .replace(/\\theta/g, 'θ')
    .replace(/\\Theta/g, 'Θ');

  // 2. Fractions: \frac{num}{den} -> vertical layout or inline layout depending on density
  html = html.replace(/\\frac\{([^\}]+)\}\{([^\}]+)\}/g, (_, num, den) => {
    // If the denominator or numerator is very long, format it cleanly
    return `<span class="inline-flex flex-col items-center align-middle text-[10px] leading-none px-0.5 mx-0.5"><span class="border-b border-slate-400 pb-0.5">${num}</span><span class="pt-0.5">${den}</span></span>`;
  });

  // 3. Superscripts: ^{value} or ^value
  html = html
    .replace(/\^\{([^\}]+)\}/g, '<sup>$1</sup>')
    .replace(/\^([a-zA-Z0-9])/g, '<sup>$1</sup>');

  // 4. Subscripts: _{value} or _value
  html = html
    .replace(/_\{([^\}]+)\}/g, '<sub>$1</sub>')
    .replace(/_([a-zA-Z0-9])/g, '<sub>$1</sub>');

  // 5. Parentheses cleanup
  html = html
    .replace(/\\left\(/g, '(')
    .replace(/\\right\)/g, ')')
    .replace(/\\\\/g, ' ');

  return html;
};

/**
 * Splits text by '$' and parses all inline math equations wrapped in '$'
 */
export const renderParagraphWithMath = (text: string): React.ReactNode => {
  const parts = text.split('$');
  return (
    <>
      {parts.map((part, index) => {
        if (index % 2 === 1) {
          const rawFormatted = renderInlineMath(part);
          return (
            <span
              key={index}
              className="inline-block px-1 font-serif text-slate-800 bg-indigo-50/50 border border-indigo-100 rounded text-xs sm:text-sm mx-0.5"
              dangerouslySetInnerHTML={{ __html: rawFormatted }}
            />
          );
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
};
