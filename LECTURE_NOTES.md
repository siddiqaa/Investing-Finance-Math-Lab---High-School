# Investing & Finance Math Lab: Complete Lecture Notes
*An Algebra-Based Quantitative Finance Syllabus for High School Students & Families*

---

## Module 1: Time Value of Money & Compound Growth

### Core Concept Overview
* **Focus Topic:** Exponents, compound growth, backwards present value, company valuation, and растущие dividends.
* **Syllabus Subtitle:** Exponents, compound growth, backwards present value, and company valuation.
* **Math Prerequisite Mastery:** Exponents, Percentages, Present Value, Net Present Value, and the Gordon Growth Model.

### Course Syllabus Description
Understand the power of exponents and percentages through compound growth. Discover why a dollar today is worth more than a dollar tomorrow, and learn how to work backwards to find present value and value growing dividends.

### Lecture Content
1. **The Time Value of Money:** The most important starting idea in finance is that a dollar today is worth more than a dollar tomorrow. Why? Because you can invest a dollar today to earn interest. If you invest a Present Value $PV$ at a yearly growth rate $r$, in $n$ years your money grows to a Future Value:
   $$FV = PV \times (1 + r)^n$$

2. **Discounting & Backward Valuation:** We can turn this formula around using algebra to work backwards! If someone promises to pay you a Future Value $FV$ in the future, how much is that worth to you today? We find the Present Value:
   $$PV = \frac{FV}{(1 + r)^n}$$
   This process is called discounting.

3. **Net Present Value (NPV):** We can use this to find the value of an entire business or asset. By adding up the Present Value of all future cash payments the business will generate, we calculate its Net Present Value ($NPV$):
   $$PV = \sum_{t=1}^{\infty} \frac{CF_t}{(1 + r)^t}$$

4. **Gordon Growth Model:** If some investment pays dividends (like a steady share of stock profits) that grow at a constant rate $g$, we can use the Gordon Growth Model:
   $$P_0 = \frac{D_0 (1 + g)}{r - g} \quad (r > g)$$
   This allows us to easily value a stock using high-school algebra!

---

## Module 2: Stock Prices & Randomness

### Core Concept Overview
* **Focus Topic:** Percentage changes, random walks, and volatility drag.
* **Syllabus Subtitle:** Percentage changes, random walks, and volatility drag.
* **Math Prerequisite Mastery:** Percentages, Multiplicative Returns, Random Walks, and Volatility Drift.

### Course Syllabus Description
Stock prices change unpredictably from day to day because of new, unexpected information. Learn how we model stock trends as random walks, how to compute rates of return, and how wild swings can create a drag on wealth.

### Lecture Content
1. **Calculating Percentage Returns:** In any given day, a stock price moves up or down based on new information. We measure these daily movements as percentage returns:
   $$\text{Return} = \frac{\text{New Price} - \text{Old Price}}{\text{Old Price}}$$

2. **Multiplicative Compounding:** A key feature of stock returns is that they compound multiplicatively rather than additively. For example, if a stock starting at $100 goes up 10% on Monday (to $110) then down 10% on Tuesday, it goes down to $99 (not back to $100). This basic behavior means stock prices expand and contract exponentially.
   $$S_t = S_{t-1} \times (1 + r_t)$$

3. **Model of Random Walks:** We can model stock price charts as a random walk. A random walk assumes that each day's stock price move is like a coin flip: unpredictable and independent of yesterday's move.

4. **Volatility Drag:** Because of the multiplicative nature of stock prices, high volatility (having large, wild swings in return) creates a math drag on your wealth. For any given average percentage return, a steadier path will compound to a much higher final dollar value than a wildly swinging path!

---

## Module 3: Portfolio Diversification & Risk

### Core Concept Overview
* **Focus Topic:** The algebra of expected return and spreading risk.
* **Syllabus Subtitle:** The algebra of expected return and spreading risk.
* **Math Prerequisite Mastery:** Weighted Averages, Correlation, Efficient Frontier, Sharpe Ratio, and Beta.

### Course Syllabus Description
Can you get more return with less risk? Yes! Learn how combining different investments together uses weighted averages and correlation to cancel out specific risk and build efficient portfolios.

### Lecture Content
1. **Portfolio Expected Return:** An investment portfolio is a mix of different assets. The expected return of a portfolio is simply the weighted average of the returns of the individual assets:
   $$E[R_p] = w_1 R_1 + w_2 R_2 + w_3 R_3$$
   where the weights $w$ add up to 100%.

2. **Risk Dynamics & Correlation:** However, the risk of a portfolio is not just the weighted average of individual risks! It depends on how the assets move in relation to each other. This relationship is measured by correlation.

3. **Risk Reduction Strategy:** Correlation is a value between -1.0 and +1.0. A correlation of +1.0 means assets move in perfect harmony, while negative correlation means they move in opposite directions. Spreading resources across assets with low correlation offsets individual shocks, lowering overall portfolio risk.

4. **Efficient Frontier & Sharpe Ratio:** By plotting risk versus expected return, we find the "Efficient Frontier" — the set of portfolios that give the highest possible returns for a given level of risk. The Sharpe Ratio measures the return earned per unit of risk:
   $$\text{Sharpe Ratio} = \frac{E[R_p] - R_f}{\sigma_p}$$
   Asset beta measures sensitivity to overall market trends.

---

## Module 4: Options & The Price of a Guarantee

### Core Concept Overview
* **Focus Topic:** Payoff tables, intrinsic values, and plain-English risk sensitivities.
* **Syllabus Subtitle:** Payoff tables, intrinsic values, and plain-English risk sensitivities.
* **Math Prerequisite Mastery:** Inequalities, Option Payoffs, Inputs, and Plain-English Greeks.

### Course Syllabus Description
An option is a contract that gives you the right to buy or sell a stock at a set price, like a financial insurance policy. Master option expiration payoffs and plain-English premium pricing factors.

### Lecture Content
1. **Call Option Payoffs:** An option is a financial contract offering the option buyer a choice. A Call Option gives you the right, but not the obligation, to buy a stock at a set strike price $K$ at maturity. The payoff at expiration is:
   $$\text{Call Payoff} = \max(S_T - K, 0)$$

2. **Put Option Payoffs:** A Put Option gives you the right to sell a stock at strike price $K$. Its payoff is:
   $$\text{Put Payoff} = \max(K - S_T, 0)$$
   These inequalities mean option buying has finite losses (limited to what you paid) but potential upside.

3. **Intrinsic Value vs. Time Value:** An option's value consists of two parts: Intrinsic Value and Time Value. Intrinsic value is what the option would be worth if it expired today. Time value exists because as long as time remains, volatile prices could move further in your favor.

4. **Option Pricing Factors & The Greeks:** The price of an option is shaped by five main inputs: current stock price, strike price, time to expiration, interest rate, and volatility. Sensitivities are known as the Greeks:
   * **Delta ($\Delta$):** How much the option price moves per dollar stock move.
   * **Vega:** Volatility sensitivity.
   * **Theta:** The value lost as time passes.

---

## Module 5: Behavioral Finance & Limits of Math Signals

### Core Concept Overview
* **Focus Topic:** Autocorrelations, cascades, prospect utility, and feedback dynamics.
* **Syllabus Subtitle:** Autocorrelations, cascades, prospect utility, and feedback dynamics.
* **Math Topic:** Autocorrelation Functions, Bayesian Cascades, prospect value functions, feedback SDEs, and cost of carry curves.

### Course Syllabus Description
Investigate the limits of classical mathematical equilibrium models. Discover how positive feedback, information cascades, prospect theory utility and costs of carry explain bubbles, momentum, and crashes.

### Lecture Content
1. **Market Anomalies and Variance:** In Modules 1–4, we built mathematical models assuming perfect rationality, efficient market aggregation, continuous lognormal paths, and risk-less arbitrage replication. Yet, empirical evidence documents systematic deviations. Autocorrelation functions of past returns are non-zero: markets exhibit momentum and long-term reversals. Fear clustering produces volatility contagion, and prices violate the independent increment assumptions of the random walk.
   $$\rho(k) = \frac{\text{Cov}(r_t, r_{t-k})}{\text{Var}(r_t)}$$

2. **Information Cascades:** Perfect Bayesian agents can trigger information cascades where public, sequential observations cause subsequent traders to disregard their private information entirely, locking onto incorrect pricing cascades. This halts the information aggregation fundamental to market efficiency:
   $$P(\text{wrong}) = \frac{(1-p)^2}{2(p^2 - p + 1)}$$

3. **Prospect Theory & Unstable Dynamics:** Prospect Theory replaces traditional symmetric utility with a kinked value function that overweights losses by roughly 2.25 times over gains. This creates the disposition effect (locking winners, riding losers) which slows news incorporation and drives momentum. Finally, trend-following behavior alters the drift of asset paths, establishing unstable positive-feedback dynamical systems. Combined with margin-call limits to arbitrage, bubbles can stay irrational far longer than models forecast.
   $$v(x) = \begin{cases} x^{\\alpha} & x \ge 0 \\\\ -\\lambda (-x)^{\\beta} & x < 0 \end{cases}$$
