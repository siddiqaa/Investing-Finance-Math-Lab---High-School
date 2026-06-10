# Investing & Finance Math Lab

An interactive, engaging investing and financial markets learning laboratory designed specifically for high school students and families. This application breaks down financial theory into intuitive concepts using fundamental high school algebra, exponents, percentages, and basic probability. 

The lab is fully self-contained and offers real-time visualization engines, interactive simulation parameter tuning, and friendly quiz-based verification utilities.

---

## 🌌 Architecture & Key Laboratories

The laboratory is structured into multiple core simulation modules, each targeting a key pillar of quantitative and empirical finance:

### 1. 📈 Discounted Cash Flows & Continuous Compounding (DCF Lab)
Explore the mathematical foundation of time value under discrete and continuous intervals.
* **Core Concepts:** Continuous discounting, Net Present Value ($NPV$), multi-period yield curves, compounding frequency effects ($\lim_{m \to \infty} P(1 + \frac{r}{m})^{mt} = Pe^{rt}$), and bond pricing.
* **Interactive Tooling:** Dynamic yield curve builders and continuous cash flow present-value modelers with visual compounding comparisons.

### 2. 🎲 Stochastic Calculus & Asset Paths (Stochastic Lab)
Simulate the continuous random walks of equity prices under the Arbitrage Pricing theory.
* **Core Concepts:** Geometric Brownian Motion ($GBM$), Wiener processes ($dW_t$), drift ($\mu$), diffusion volatility ($\sigma$), and Ito's Lemma verification:
  $$dS_t = \mu S_t dt + \sigma S_t dW_t$$
* **Interactive Tooling:** Real-time multi-path Monte Carlo simulations, distribution histograms, and Hurst exponent estimators ($H$) to analyze sub-diffusive or super-diffusive behavior.

### 3. 🎯 Modern Portfolio Theory (Portfolio Lab)
Construct optimal risk-adjusted asset allocations over multiple risky assets.
* **Core Concepts:** Markowitz Mean-Variance Optimization, the Efficient Frontier, the Sharpe Ratio, and Covariance matrices ($\Sigma$).
* **Interactive Tooling:** Interactive three-asset covariance weights simulator illustrating the "Markowitz Bullet," tangent Capital Allocation Lines (CAL), and utility curve intersections.

### 4. 📊 Black-Scholes-Merton Option Pricing (Options Lab)
Model derivatives contracts pricing and structural volatility spaces.
* **Core Concepts:** Black-Scholes closed-form solutions for European options, the Greek derivatives ($\Delta, \Gamma, \Theta, Vega$), and Implied Volatility ($IV$).
  $$d_1 = \frac{\ln(S/K) + (r + \sigma^2/2)t}{\sigma \sqrt{t}}$$
* **Interactive Tooling:** Dynamic Option Greek visualizers, 3D/2D parameter surfaces, and implied volatility solvers using the Newton-Raphson method.

### 5. 🧠 Behavioral Finance & Market Crowds (Behavioral Lab)
Witness the psychological and architectural feedback loops that cause actual prices to pull away from the theoretical mathematical anchors.
* **Core Concepts:** Momentum anomalies, information cascades (rational herding), loss aversion and the disposition effect, self-feeding asset bubbles, and commodity short squeezes.
* **Interactive Tooling:** Custom positive-feedback simulation engine modeling speculative bubble expansion, capital margin constraints, and systemic arbitrage liquidations when the crowd forces price deviation over physical reality.

---

## 🛠️ Technology Stack
* **Framework:** React with Vite
* **Language:** TypeScript (Strictly typed schemas)
* **Styling:** Tailwind CSS (Modern, desktop-first responsive aesthetic)
* **Animations:** Framer Motion (`motion` for buttery smooth state crossovers)
* **Icons:** Lucide React
* **Math Rendering:** Fully automated inline LaTeX formatting and mathematical identity cards

---

## 🚀 Getting Started

To run the "Investing & Finance Math Lab" locally:

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed (v18 or higher recommended).

### 2. Installation
Install the project dependencies via `npm`:
```bash
npm install
```

### 3. Development Mode
Boot the ultra-fast Vite dev server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to interact with the laboratory.

### 4. Production Build
To bundle the application into an optimized static distribution:
```bash
npm run build
```
The asset bundle will be generated under the `dist/` workspace directory.

---

## 📚 Study Companion

Each interactive laboratory pane is structurally linked with its corresponding chapter in the **Syllabus Hub**. This structural pairing allows you to read theoretical derivations and instantly test the assumptions under real-time interactive parameters on the side panel.

*Happy mathematical modeling!*
