# Project Instructions & AI Assistant Guidelines

This repository contains the **Investing & Finance Math Lab**, an interactive, engaging learning platform designed to teach high school students and families the essential algebra behind investing and financial markets.

Please follow these guidelines strictly during any future development, refactoring, or feature expansion:

---

## 🎨 Visual Identity & Styling
- **Theme:** Minimalist, crisp, math-first palette using high-contrast slate and indigo accents (`theme` defines sans as "Inter" and mono as "JetBrains Mono").
- **Animations:** Use `motion` from `motion/react` for buttery-smooth state transitions (tab switching, modal toggles, simulation updates). Avoid heavy animations or visual noise unless requested.
- **Responsive Web Design:** Desktop-first precision with mobile-first code using Tailwind prefixes (`sm:`, `md:`, `lg:`). Maintain readable bounds (`max-w-7xl mx-auto`) for wide viewports.
- **Icons:** All icons MUST come from `lucide-react`. Never code raw SVG elements directly.

---

## ⚠️ React Architecture & Rendering Constraints
- **Avoid Hydration / Nested Element Errors:** Always ensure that block-level HTML tags (`<div>`, `<hr>`, `<h3>`, `<h4>`, `<h5>`, `<ul>`, etc.) are never rendered inside a paragraph `<p>` element. Check mapping logic like `renderParagraphWithMath` to ensure that standard text paragraphs output inside `<p>` tags, whereas markdown block headers, horizontal dividers, or formulas output inside `<div>` containers.
- **Strict Linting Standards:** Keep the codebase perfectly clean by avoiding unused variables and unused imports. Always run `npm run lint` (`tsc --noEmit`) to verify that no TS6133 or TS6138 errors block compilation.
- **State Updates & Infinite Loops:** Never perform state updates directly in the body of a component; isolate side-effects within standard React hooks, taking care to avoid placing volatile objects or function pointers in dependency arrays.

---

## 📊 Math & Interactive Labs Structure
- **Formula Syntax & KaTeX Processing:** 
  - Standard React JSX text nodes (e.g., `<p>`, `<div>`, `<li>`) containing `$...$` math delimiters **do not** render as LaTeX by default.
  - You **MUST** wrap any paragraph, heading, or list item containing inline formulas in the `{processMathText('My formula is $r = 0.05$.')}` helper from `src/lib/math.tsx`.
  - For standalone block equations or custom inline nodes, use the `<MathSpan tex="..." block={true/false} />` component.
  - **Double Escaping in JS/TS Strings:** Inside JavaScript/TypeScript strings (including lessons in `.ts` files), backslashes MUST be double-escaped. Write `\\sum`, `\\frac`, `\\dots`, `\\infty`, `\\approx`, `\\sum_{i=1}^{n}`, `\\%` for percentage signs, and `\\text{...}` for text formatting. Single backslashes like `\sum` will be treated as escape sequences and will fail to render or compile.
  - **Syllabus and Lessons Mapping:** Lesson `fullText` and `introduction` blocks contain text with `$...$` math. Ensure they are mapped using `processMathText(paragraph)` inside `App.tsx` or your custom renderers.
  - **No Markdown Bolding in Arrays:** Never use standard Markdown bolding (e.g., `**word**`) inside the `.ts` lesson strings (like `fullText` or `introduction`). The custom string parser does not convert Markdown `**` tags to HTML. You **MUST** use literal HTML spans instead: `<span className="text-indigo-600 font-bold">word</span>` (or `text-slate-800` depending on context).
  - **Bullet List Elements:** For bullet lists with bold terms and math, use clean separate nodes (e.g., `<li><strong className="text-slate-800">Term (<MathSpan tex="x" />):</strong> details</li>`) instead of passing complex nested HTML strings to parsing functions.
- **Modular Layout:** Keep laboratories structurally independent (e.g., `DcfLab`, `StochasticLab`, `PortfolioLab`, `OptionsLab`, `BehavioralLab`).
  - Coordinate these laboratories within `src/App.tsx`.
  - Maintain the interactive, dual-panel layout of "Theoretical Syllabus" side-by-side with "Visual Simulation parameters."

---

## 🛠️ Technology Stack
* **Framework:** React with Vite
* **Language:** TypeScript (Strictly typed schemas)
* **Styling:** Tailwind CSS (Modern, desktop-first responsive aesthetic)
* **Animations:** Framer Motion (`motion` for buttery smooth state crossovers)
* **Icons:** Lucide React
* **Math Rendering:** Fully automated inline LaTeX formatting and mathematical identity cards

---

## 🌌 Architecture & Key Laboratories
The laboratory is structured into 9 core sequential units plus a bonus practical finance module:

### Unit 1. 🍋 Compounding, Discounting & Net Present Value (NPV Lab)
* **Core Concepts:** Present Value ($PV$), Net Present Value ($NPV$), opportunity cost, cash flow discounting, and Time Value of Money ($TVM$).

### Unit 2. 🏛️ Selecting the Discount Rate (r) & Cost of Capital (Bank Lab)
* **Core Concepts:** Risk-free rate benchmarks ($r_{rf}$), High-Yield Savings, CDs, inflation drag, hurdle rates, and opportunity cost of capital.

### Unit 3. 💼 Bridging from Bank Accounts to Stock Ownership (Stock Bridge Lab)
* **Core Concepts:** Fractional equity ownership, growth spread ($r_{\text{stock}} - r_{\text{bank}}$), equity risk premium, and wealth accumulation algebra.

### Unit 3.5. 🪙 Zero-Growth Stock Valuation (Flat Valuation Lab)
* **Core Concepts:** Zero-Growth Dividend Discount Model ($P_0 = \frac{D}{r}$), preferred stock valuation, discount rate inversion, and constant cash flow perpetuities.

### Unit 4. 📈 Stock Price Valuation (Dividend Discount & Gordon Growth Model)
* **Core Concepts:** Dividend Discount Model ($DDM$), Gordon Growth Formula ($P_0 = \frac{D_1}{r - g}$), perpetuities, and fair value sensitivity.

### Unit 5. ⚡ Catalysts & News Shocks (News Bridge Lab)
* **Core Concepts:** Efficient market hypothesis, unexpected news shocks ($\Delta g, \Delta r$), price discovery, and transition to stochastic paths.

### Unit 6. 🎲 Stochastic Calculus & Asset Paths (Stochastic Lab)
* **Core Concepts:** Geometric Brownian Motion ($GBM$), Wiener processes ($dW_t$), drift ($\mu$), diffusion volatility ($\sigma$), and Ito's Lemma verification: $dS_t = \mu S_t dt + \sigma S_t dW_t$.

### Unit 7. 🎯 Modern Portfolio Theory (Portfolio Lab)
* **Core Concepts:** Markowitz Mean-Variance Optimization, the Efficient Frontier, the Sharpe Ratio, and Covariance matrices ($\Sigma$).

### Unit 8. 📊 Black-Scholes-Merton Option Pricing (Options Lab)
* **Core Concepts:** Black-Scholes closed-form solutions for European options, the Greek derivatives ($\Delta, \Gamma, \Theta, Vega$), and Implied Volatility ($IV$).

### Unit 9. 🧠 Behavioral Finance & Market Crowds (Behavioral Lab)
* **Core Concepts:** Momentum anomalies, information cascades (rational herding), loss aversion and the disposition effect, self-feeding asset bubbles, and commodity short squeezes.

### Bonus Unit. 🚗 Auto Loans & Total Cost of Ownership (Amortization Lab)
* **Core Concepts:** Loan Amortization ($PMT = P \cdot \frac{r(1+r)^n}{(1+r)^n - 1}$), interest vs. principal decay schedule, and Total Cost of Ownership (TCO) comparing Internal Combustion Engine (ICE) gas vehicles vs. Electric Vehicles (EV) considering fuel/electricity rates, insurance, and maintenance.
