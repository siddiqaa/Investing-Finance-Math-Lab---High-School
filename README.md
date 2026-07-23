# Investing & Finance Math Lab

🌍 **Live Deployments:**
- **Primary (Vercel):** [https://investing-finance-math-lab-high-sch.vercel.app/](https://investing-finance-math-lab-high-sch.vercel.app/)
- **Secondary (Cloudflare Workers):** [https://investingfinancelab.adnans.workers.dev/](https://investingfinancelab.adnans.workers.dev/)

An interactive, engaging investing and financial markets learning laboratory designed specifically for high school students and families. This application breaks down complex mathematical models and quantitative financial theory into intuitive concepts using fundamental high school algebra, exponents, percentages, and basic probability.

The lab is fully self-contained and offers real-time visualization engines, interactive simulation parameter tuning, and friendly quiz-based verification utilities.

---

## 📚 Course Curriculum & Academic Units

The platform is structured into 9 comprehensive units, guiding students from fundamental exponents to advanced stochastic calculus and option pricing.

### 1. 📈 Unit 1: Time Value of Money & Compound Growth (`compounding`)
* **Math Focus:** Exponents, interest rates, and compounding frequencies.
* **Core Formula:** $A = P(1 + r)^n$ and the limit as compounding approaches infinity: $\lim_{m \to \infty} P(1 + \frac{r}{m})^{mt} = Pe^{rt}$.
* **Interactive Sandbox (DCF Lab):** Dynamic yield curve builder, continuous discount modeller, and cash flow stream NPV comparisons.
* **Knowledge Check:** `TvmKnowledgeCheck` for immediate calculation verification.

### 2. 🏦 Unit 1.5: Selecting the Rate ($r$) in Practice (`rateSelection`)
* **Math Focus:** Opportunity cost and compounding periods.
* **Interactive Sandbox (Bank Lab):** Visualizing bank savings, high-yield accounts, and locked Certificate of Deposit (CD) strategies side-by-side with compound curves.
* **Knowledge Check:** `DiscountKnowledgeCheck` for opportunity-cost math validation.

### 3. 🌉 Unit 1.75: Corporate Growth & The Stock Market Bridge (`stockBridge`)
* **Math Focus:** Discounted cash flows applied to dividend growth modelers.
* **Interactive Sandbox (Stock Bridge Lab):** Interactive dividend growth modelers where students see how earnings per share map to stock valuations.
* **Knowledge Check:** `NpvKnowledgeCheck` for Net Present Value validations.

### 4. 🏢 Unit 2: Valuation of Enterprises & Multiples (`valuation`)
* **Math Focus:** Geometric series summation and constant ratio multiples.
* **Interactive Sandbox (Valuation Lab):** Comparative valuation multiplier matrices, Enterprise Value ($EV$) to EBITDA, and discounted growth forecasts.
* **Knowledge Check:** `ValuationKnowledgeCheck` for enterprise valuation concepts.

### 5. 📰 Unit 2.5: News Events, Earnings, & Information Channels (`newsBridge`)
* **Math Focus:** Instantaneous valuation adjustments and discounting news updates.
* **Interactive Sandbox (News Bridge Lab):** Live-streamed news events matching market sentiment modifiers, letting students witness real-time stock valuation repricings.
* **Knowledge Check:** `NewsBridgeKnowledgeCheck` for event-driven pricing mechanisms.

### 6. 🎲 Unit 3: Stochastic Calculus & Asset Paths (`stochastic`)
* **Math Focus:** Geometric Brownian Motion ($GBM$), Wiener processes ($dW_t$), drift ($\mu$), diffusion volatility ($\sigma$), and Ito's Lemma.
* **Core Formula:** $dS_t = \mu S_t dt + \sigma S_t dW_t$
* **Interactive Sandbox (Stochastic Lab):** Real-time multi-path Monte Carlo asset generators with normal distribution histograms.

### 7. 🎯 Unit 4: Modern Portfolio Theory (`portfolio`)
* **Math Focus:** Covariance matrices ($\Sigma$), weighted averages, standard deviation, and variance.
* **Interactive Sandbox (Portfolio Lab):** A three-asset weight optimizer generating the Markowitz Efficient Frontier (the "Markowitz Bullet") and identifying the maximum Sharpe Ratio portfolio.

### 8. 📊 Unit 5: Black-Scholes-Merton Option Pricing (`options`)
* **Math Focus:** Cumulative normal distributions, continuous rates, and partial derivatives (The Option Greeks: $\Delta, \Gamma, \Theta, Vega$).
* **Interactive Sandbox (Options Lab):** Interactive Option Greek visualizer graphs and a real-time iterative Implied Volatility ($IV$) solver.

### 9. 🧠 Unit 6: Behavioral Finance & Market Crowds (`behavioral`)
* **Math Focus:** Non-linear feedback loops and information cascades.
* **Interactive Sandbox (Behavioral Lab):** Multi-agent crowd behavior models tracking speculative bubble expansions, commodity short squeezes, and irrational panics.

---

## 🗺️ Interactive Side Quests & Quizzes

To provide immersive mathematical validation, the application includes two dedicated math quests:

* **🔢 Sigma Notation Quest (`side_quest_sigma`):** An interactive puzzle sandbox introducing students to summation notation ($\sum$), variable ranges, and structural algebra indexing.
* **📈 Gordon Growth Quest (`side_quest_gordon`):** An algebraic derivation puzzle illustrating how infinite geometric series sum to form the Gordon constant dividend growth model ($P = \frac{D_1}{r - g}$).
* **✍️ Chapter-End Derivation Quizzes:** At the end of every unit, an interactive multiple-choice quiz evaluates conceptual and calculation comprehension.

---

## 🛠️ Advanced Platform Capabilities

- **🖨️ PDF Study Guide Export:** Students and parents can export a beautifully formatted, comprehensive mathematical study guide summarizing every unit, core equation, and finance rule for offline revision.
- **🔢 KaTeX-powered LaTeX Renderer:** The system integrates a robust mathematical parsing helper (`src/lib/math.tsx`) to render textbook-quality inline and block equations beautifully on any browser.
- **🎭 Buttery-Smooth Framer Motion Transitions:** Navigation, modal popups, sandbox alterations, and side quests are animated cleanly using `motion` from `motion/react` for an incredibly polished feel.

---

## 💻 Tech Stack

* **Framework:** React 18+ with Vite
* **Language:** TypeScript (strictly-typed schemas and mathematical models)
* **Styling:** Tailwind CSS (Minimalist, slate/indigo high-contrast look)
* **Animations:** Framer Motion (`motion` from `motion/react`)
* **Icons:** Lucide React
* **Math Formatting:** Fully dynamic custom inline and block LaTeX processing engine

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
