# Investing & Finance Math Lab

🌍 **Live Deployments:**
- **Primary (Vercel):** [https://investing-finance-math-lab-high-sch.vercel.app/](https://investing-finance-math-lab-high-sch.vercel.app/)
- **Secondary (Cloudflare Workers):** [https://investingfinancelab.adnans.workers.dev/](https://investingfinancelab.adnans.workers.dev/)

An interactive, engaging investing and financial markets learning laboratory designed specifically for high school students and families. This application breaks down complex mathematical models and quantitative financial theory into intuitive concepts using fundamental high school algebra, exponents, percentages, and basic probability.

The lab is fully self-contained and offers real-time visualization engines, interactive simulation parameter tuning, and friendly quiz-based verification utilities.

---

## 📚 Course Curriculum & Academic Units

The platform is structured into sequential core units, review modules, bonus real-world finance units, and advanced math side quests:

### 1. 🍋 Unit 1: Time Value of Money & Compound Growth (`compounding`)
* **Math Focus:** Exponents, interest rates, compounding frequencies, Present Value ($PV$), and Net Present Value ($NPV$).
* **Core Formula:** $A = P(1 + r)^n$ and continuous compounding $\lim_{m \to \infty} P(1 + \frac{r}{m})^{mt} = Pe^{rt}$.
* **Interactive Sandbox (Lemonade Stand Lab / NPV Lab):** An intuitive business simulation where students "buy" a stand and calculate $NPV$ based on projected cash flows and opportunity costs.

### 2. 🏛️ Unit 2: Selecting the Rate ($r$) in Practice (`rateSelection`)
* **Math Focus:** Risk-free baseline rates ($r_{rf}$), High-Yield Savings, CDs, inflation drag, hurdle rates, and opportunity cost of capital.
* **Interactive Sandbox (Bank Lab):** Visualizing bank savings, high-yield accounts, and locked Certificates of Deposit (CDs) side-by-side with compound curves.

### 3. 💼 Unit 3: Bridging to Stocks: Why Own Businesses? (`stockBridge`)
* **Math Focus:** Fractional equity ownership, growth spread ($r_{\text{stock}} - r_{\text{bank}}$), equity risk premium, and earnings per share.
* **Interactive Sandbox (Stock Bridge Lab):** Interactive dividend growth modelers where students see how earnings per share map to stock valuations.

### 4. 🪙 Unit 3.5: Stock Valuation Without Growth (`flatValuation`)
* **Math Focus:** Zero-Growth Dividend Discount Model ($P_0 = \frac{D}{r}$), preferred stock valuation, discount rate inversion, and constant cash flow perpetuities.
* **Interactive Sandbox (Flat Valuation Lab):** Adjust dividend payouts and required rates to observe constant cash flow stock pricing.

### 5. 📈 Unit 4: Stock Price Valuation & Infinite Growth (`valuation`)
* **Math Focus:** Dividend Discount Model ($DDM$), Gordon Growth Formula ($P_0 = \frac{D_1}{r - g}$), infinite geometric series convergence, and sensitivity analysis.
* **Interactive Sandbox (Gordon Growth DDM Lab):** Sensitivity charts mapping stock prices against growth rates ($g$) and discount rates ($r$).

### 6. ⚡ Unit 5: The News Catalyst: Why Stock Prices Wiggle (`newsBridge`)
* **Math Focus:** Efficient market hypothesis, unexpected news shocks ($\Delta g, \Delta r$), price discovery, and transition to stochastic paths.
* **Interactive Sandbox (News Bridge Lab):** Live-streamed news events matching market sentiment modifiers, letting students witness real-time stock valuation repricings.

### 7. 📘 Unit 5R: Gordon Growth Model Foundation Review (`unit5R`)
* **Focus:** Comprehensive study guide and test prep summary covering the progression from basic TVM (Units 1–5).

### 8. 🎲 Unit 6: Stock Prices & Random Walks (`stochastic`)
* **Math Focus:** Monthly/daily multiplicative compounding ($S_t = S_{t-1}(1+r_t)$), percentage loss asymmetry ($(1+x)(1-x) = 1-x^2$), drift ($\mu$), volatility ($\sigma$), and volatility drag.
* **Interactive Sandbox (Stochastic Lab):** Real-time 25-path Monte Carlo random walk simulation over 1–60 months with $S_0 = \$100$ baseline, dual vertical axes, and profit/loss color pathways.

### 9. 🎯 Unit 7: Portfolio Diversification & Risk (`portfolio`)
* **Math Focus:** Covariance, weighted averages, correlation coefficient ($\rho$), Markowitz Mean-Variance Optimization, the Efficient Frontier, Sharpe Ratio, and Beta.
* **Interactive Sandbox (Portfolio Lab):** A multi-asset weight optimizer generating the Markowitz Efficient Frontier and identifying the maximum Sharpe Ratio portfolio.

### 10. 🧠 Unit 8: Behavioral Finance & Market Crowds (`behavioral`)
* **Math Focus:** Non-linear feedback loops, momentum anomalies, information cascades (rational herding), loss aversion, disposition effect, and commodity short squeezes.
* **Interactive Sandbox (Behavioral Lab):** Multi-agent crowd behavior models tracking speculative bubble expansions and market panics.

---

## 🚗 Bonus Units: Real-World Finance & Applied Math

### 🏎️ Bonus Unit A: Options & The Price of a Guarantee (`options`)
* **Math Focus:** Call and Put options, payoff inequalities at expiration, Black-Scholes pricing inputs, no-arbitrage reasoning, and the Option Greeks ($\Delta, \Gamma, \Theta, Vega$).
* **Interactive Sandbox (Options Lab):** Interactive Option Greek visualizer graphs and a real-time iterative Implied Volatility ($IV$) solver.

### 🚘 Bonus Unit B: Auto Loans & Total Cost of Ownership (`amortization`)
* **Math Focus:** Loan Amortization ($PMT = P \cdot \frac{r(1+r)^n}{(1+r)^n - 1}$), interest vs. principal decay schedule, and Total Cost of Ownership (TCO) comparing Internal Combustion Engine (ICE) gas vehicles vs. Electric Vehicles (EV).
* **Interactive Sandbox (Amortization Lab):** Interactive loan schedule calculator and 5-year TCO gas vs. EV comparator.

### 🏡 Bonus Unit C: Mortgages & Total Cost of Homeownership (`mortgage`)
* **Math Focus:** 15-year and 30-year home mortgages, Loan-to-Value (LTV) ratios, Private Mortgage Insurance (PMI), equity accumulation over time, property taxes, home insurance, and total PITI monthly housing expenses.
* **Interactive Sandbox (Mortgage Lab):** Amortization schedules, down payment equity sliders, and total PITI breakdown visualizer.

---

## 📖 Reference & Practice Tools

* **📖 Financial Math Glossary & Formula Compendium (`glossary`):** Searchable dictionary of financial variables, equations, real-world analogies, and interactive micro-calculators across all curriculum units.
* **⚡ Comprehensive Review Quiz Unit (`comprehensiveQuiz`):** Collated 38+ review exercises across Units 1–8, Bonus Units, and Side Quests for daily retrieval practice with randomized warm-up sets.

---

## 🗺️ Interactive Math Side Quests

To provide immersive mathematical derivations, the application includes three dedicated math side quests:

* **🔢 Math Quest 1: Summation Notation (Sigma) (`side_quest_sigma`):** An interactive puzzle sandbox introducing students to summation notation ($\sum$), variable ranges, Carl Friedrich Gauss's arithmetic series derivation, and structural algebra indexing.
* **📈 Math Quest 2: Geometric Series & Convergence (`side_quest_geometric`):** An algebraic derivation puzzle illustrating how infinite geometric series sum to form a bounded finite value.
* **📊 Math Quest 3: Gordon Growth Formula Derivation (`side_quest_gordon`):** Algebraic proof connecting zero-growth perpetuities ($g = 0$) to constant dividend expansion ($P = \frac{D_1}{r - g}$).

---

## 🛠️ Advanced Platform Capabilities

- **🖨️ PDF Study Guide Export:** Students and parents can export a beautifully formatted, comprehensive mathematical study guide summarizing every unit, core equation, and finance rule for offline revision.
- **🔢 KaTeX-powered LaTeX Renderer:** The system integrates a robust mathematical parsing helper (`src/lib/math.tsx`) backed by string memoization (`katexCache`) to render textbook-quality inline and block equations on any browser.
- **🎭 Buttery-Smooth Framer Motion Transitions:** Navigation, modal popups, sandbox alterations, and side quests are animated cleanly using `motion` from `motion/react` for an exceptionally polished experience.
- **🏆 Centralized Mastery Engine:** Real-time state tracking (`MasteryContext.tsx`) persists student progress, quiz completion, and mastery badges seamlessly across sessions.

---

## 💻 Tech Stack

* **Framework:** React 18+ with Vite
* **Language:** TypeScript (strictly-typed schemas and mathematical models)
* **Styling:** Tailwind CSS (Minimalist, slate/indigo high-contrast look)
* **Animations:** Framer Motion (`motion` from `motion/react`)
* **Icons:** Lucide React
* **Math Formatting:** KaTeX with deterministic single-pass state-machine parser (`src/lib/math.tsx`)

---

## 🚀 Getting Started

To run the **Investing & Finance Math Lab** locally:

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) (v18 or higher recommended) and a package manager installed.

### 2. Installation
Install the project dependencies using your preferred package manager (this project uses **Bun** or **npm**):
```bash
npm install
# OR
bun install
```

### 3. Development Server
Start the development server:
```bash
npm run dev
# OR
bun run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to interact with the laboratory.

### 4. Build for Production
To bundle the application into an optimized static distribution:
```bash
npm run build
# OR
bun run build
```
The static files will be output into the `dist/` directory, ready to be deployed to static hosting solutions like Vercel, Netlify, or Cloudflare Pages/Workers.
