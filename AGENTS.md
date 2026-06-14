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
- **Formula Syntax:** Mathematical equations inside study chapters and components use standard math expressions or custom inline LaTeX identifiers. Keep mathematical formulas correct and visually prominent.
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
The laboratory is structured into multiple core simulation modules, each targeting a key pillar of quantitative and empirical finance:

### 1. 📈 Discounted Cash Flows & Continuous Compounding (DCF Lab)
* **Core Concepts:** Continuous discounting, Net Present Value ($NPV$), multi-period yield curves, compounding frequency effects ($\lim_{m \to \infty} P(1 + \frac{r}{m})^{mt} = Pe^{rt}$), and bond pricing.

### 2. 🎲 Stochastic Calculus & Asset Paths (Stochastic Lab)
* **Core Concepts:** Geometric Brownian Motion ($GBM$), Wiener processes ($dW_t$), drift ($\mu$), diffusion volatility ($\sigma$), and Ito's Lemma verification: $dS_t = \mu S_t dt + \sigma S_t dW_t$

### 3. 🎯 Modern Portfolio Theory (Portfolio Lab)
* **Core Concepts:** Markowitz Mean-Variance Optimization, the Efficient Frontier, the Sharpe Ratio, and Covariance matrices ($\Sigma$).

### 4. 📊 Black-Scholes-Merton Option Pricing (Options Lab)
* **Core Concepts:** Black-Scholes closed-form solutions for European options, the Greek derivatives ($\Delta, \Gamma, \Theta, Vega$), and Implied Volatility ($IV$).

### 5. 🧠 Behavioral Finance & Market Crowds (Behavioral Lab)
* **Core Concepts:** Momentum anomalies, information cascades (rational herding), loss aversion and the disposition effect, self-feeding asset bubbles, and commodity short squeezes.
