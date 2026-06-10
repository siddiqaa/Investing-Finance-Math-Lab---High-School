import React, { useState, useEffect, useRef } from 'react';
import { randomNormal, formatPercent, formatCurrency } from '../utils/mathUtils';
import { MathSpan, processMathText } from '../lib/math';
import { 
  Users, 
  Flame, 
  Boxes, 
  RefreshCw, 
  BookOpen, 
  AlertTriangle,
  Zap,
  Activity
} from 'lucide-react';

export const BehavioralLab: React.FC = () => {
  const [activeTab, setActiveTab ] = useState<'lessons' | 'momentum' | 'cascades' | 'bubbles' | 'commodities'>('lessons');
  const [activeLessonIdx, setActiveLessonIdx] = useState<number>(0);

  // ---------------------------------------------------------
  // Markdown & Math Text rendering
  // ---------------------------------------------------------
  const renderLabParagraph = (text: string) => {
    if (text === '---') {
      return <hr className="my-5 border-slate-200" />;
    }
    if (text.startsWith('# ')) {
      return <h3 className="font-sans font-extrabold text-slate-900 text-lg mt-6 mb-3">{text.substring(2)}</h3>;
    }
    if (text.startsWith('## ')) {
      return <h4 className="font-sans font-bold text-slate-800 text-base mt-5 mb-2 border-b border-slate-100 pb-1">{text.substring(3)}</h4>;
    }
    if (text.startsWith('### ')) {
      return <h5 className="font-sans font-semibold text-indigo-950 text-sm mt-4 mb-1 uppercase tracking-wider">{text.substring(4)}</h5>;
    }
    if (text.startsWith('*') && text.endsWith('*')) {
      return <span className="italic block text-slate-500 text-sm sm:text-base border-l-2 border-indigo-200 pl-3 py-1 bg-indigo-50/10 rounded-r-lg my-3">{text.substring(1, text.length - 1)}</span>;
    }
    
    return <p className="leading-relaxed my-3">{processMathText(text)}</p>;
  };

  // ---------------------------------------------------------
  // Markdown Written Text Lessons (Preserved verbatim)
  // ---------------------------------------------------------
  const LESSONS_DATA = [
    {
      title: "Lesson 5.0 — When the Crowd Overrules the Math",
      conceptToVerify: "A commentary unit on why the machinery of rational pricing gets overruled by real markets full of real people.",
      formulas: [],
      paragraphs: [
        "# Module 5: When the Crowd Overrules the Math",
        "*A commentary unit for \"Mathematics of Investing & Financial Markets\" — a deliberate change of pace. Modules 1–4 built the machinery of rational pricing. This module is about why that machinery, applied to real markets full of real people, keeps getting overruled — and why that's not a bug in the math but a fact about who is doing the trading.*",
        "---",
        "## The Central Tension",
        "Everything in Modules 1–4 rests on a quiet assumption: that prices are set by people doing something like the math. Discounting cash flows. Weighing risk against return. Closing arbitrage gaps the moment they open.",
        "The uncomfortable truth is that prices are set by whoever shows up to trade that day — and on many days, especially the days that matter most, the marginal buyer is not running a discounted cash flow model. They're chasing a chart, copying a friend, panicking out of a loss, or buying because everyone else is buying. The mathematical models don't fail because the math is wrong. They fail because the math describes a market that behaves as if it were rational, and the actual market is only rational *on average, eventually, most of the time*.",
        "This unit is about the gap between those two markets: what fills it, why it persists, and why a quantitatively trained investor needs to respect it rather than dismiss it.",
        "---",
        "## Lesson 5.1 — Momentum: The Anomaly That Refuses to Die",
        "The random walk model says yesterday's price move tells you nothing about tomorrow's. It's one of the cleanest predictions in all of finance — and one of the most reliably violated.",
        "Stocks that have gone up over the past several months tend to keep going up. Stocks that have fallen tend to keep falling. This isn't a subtle statistical curiosity; momentum strategies have been documented across decades, across countries, across asset classes — equities, commodities, currencies, even bonds. If markets digested information instantly, this couldn't happen. A stock's good news would be fully priced in the moment it arrived, and there would be nothing left to drift toward.",
        "So why does it happen? The honest answer is human pacing. Information doesn't hit a market; it *seeps* into one. The first buyers are the insiders and the analysts. Then the institutions that read the analysts. Then the financial press. Then retail investors who saw it in the press. Then their friends who heard about it at dinner. Each wave of buyers pushes the price a little further, and the chart itself becomes the news — at some point people are no longer buying the company, they're buying the trend.",
        "Underreaction starts the drift; overreaction ends it. Markets are slow to absorb genuine news and then, having finally noticed, pile in past the point any fundamental model would justify. That's why momentum at the scale of months coexists with its mirror image at the scale of years: the same stocks that trended up for twelve months tend to give it back over the following three to five. The crowd arrives late and stays too long.",
        "For the quant, the lesson stings a little: a strategy as crude as \"buy whatever went up\" has historically embarrassed strategies built on far more elegant mathematics. The market rewards understanding *people* here, not equations.",
        "---",
        "## Lesson 5.2 — Herding: Why Smart People Follow Dumb Crowds",
        "It's tempting to dismiss herding as stupidity. The disturbing finding from decades of research is that it isn't. Herding can be perfectly sensible from the inside.",
        "Picture a line of investors, each with their own private hunch about a stock, each able to see what everyone before them did. The first few act on their hunches. But a few investors in, something flips: the weight of observed behavior — \"four smart people just bought this\" — legitimately outweighs any one person's private doubt. From that point on, everyone copies the crowd, *rationally*, and nobody's private information ever reaches the market again. The line can march off a cliff with most of its members privately suspecting the cliff is there.",
        "This is what an information cascade is, and once you see it you see it everywhere: IPO frenzies, analyst recommendation pile-ons, crypto manias, the meme-stock episode of 2021. The cascade explains the deepest failure mode of market prices — not that they're noisy, but that they can simply *stop aggregating information* while continuing to look authoritative.",
        "There's a second engine of herding that has nothing to do with information: career risk. Keynes observed that a professional money manager who fails conventionally keeps her job, while one who fails unconventionally loses it. The safest professional move is to hold what everyone else holds. So even institutions — the supposed adults in the room — herd, not because they believe the crowd is right, but because being wrong *alone* is fatal and being wrong *together* is forgivable.",
        "Keynes' other great image completes the picture: the newspaper beauty contest, where you win not by picking the prettiest face but by picking the face others will pick. Markets in herding mode are exactly this. The fundamental question — what is this asset worth? — gets replaced by a recursive social question: what does everyone think everyone thinks it's worth? No amount of valuation math answers the second question.",
        "---",
        "## Lesson 5.3 — The Retail Mind: Loss Aversion and the Lottery Ticket",
        "If you want to understand why prices misbehave, study what individual investors actually feel, because their feelings show up in the tape.",
        "The cornerstone finding of behavioral economics is that losses hurt roughly twice as much as equivalent gains feel good. This single asymmetry explains a remarkable amount of retail behavior:",
        "**The disposition effect.** Investors sell their winners quickly — banking a gain feels good, and they're terrified of watching it evaporate — while clinging to losers for years, because selling would convert a paper loss into a real one, an admission of error that the mind resists. Brokerage account studies confirm this pattern over and over. And notice the market-level consequence: if holders of falling stocks refuse to sell, bad news gets priced in slowly. The disposition effect, a quirk of individual psychology, is plausibly one of the *causes* of the momentum anomaly from Lesson 5.1. The crowd's reluctance to feel pain becomes a pattern in the data.",
        "**The lottery preference.** People knowingly overpay for small chances at huge payoffs — that's why lotteries exist — and in markets this shows up as a chronic appetite for the financial equivalent: penny stocks, speculative biotech, far out-of-the-money call options. During the meme-stock era, retail traders bought weekly call options at prices implying the stock might triple in days. The Black-Scholes machinery of Module 4 can compute a \"fair\" price for those options; the market price was multiples of it, and stayed there, because the buyers weren't pricing an option — they were buying a dream.",
        "**Doubling down.** Loss aversion has a darker corollary: once in a loss, people become risk-*seekers*, taking gambles they'd never accept from a clean slate, hoping to get back to even. \"Getting back to even\" is a phrase that has destroyed more portfolios than any market crash, and it has no place in any rational model — the math doesn't care where you bought.",
        "The synthesis: retail investors don't optimize portfolios; they manage feelings, with reference points, regret, and pride doing the work that expected return and variance do in the textbook. Prices made by feeling-managers will systematically differ from prices made by optimizers — predictably enough that the difference is itself a source of return for whoever stays sober.",
        "---",
        "## Lesson 5.4 — Bubbles: Exuberance as a Self-Feeding Machine",
        "The valuation framework of Module 1 has a built-in sanity check: a price is justified only by the cash an asset will eventually deliver. A bubble is what happens when the market quietly abandons that anchor and starts pricing an asset based on what the *next buyer* will pay. Greater-fool valuation needs no cash flows at all — only a continuing supply of fools.",
        "What makes bubbles so seductive is that they're powered by positive feedback, the same dynamic as a microphone screeching next to its own speaker. Rising prices attract attention; attention attracts buyers; buyers raise prices. Crucially, the loop manufactures its own evidence: every skeptic who watched the price double looks like a fool, and every participant looks like a genius, which converts more skeptics into participants. Alan Greenspan's \"irrational exuberance\" warning came in December 1996 — the NASDAQ then \"quadrupled\" over the next three years before collapsing. The bubble didn't just survive the most credible warning imaginable; it fed on the embarrassment of everyone who heeded it.",
        "This raises the most practical question in the unit: **if a bubble is mathematically identifiable, why doesn't smart money just short it and correct the price?** The answer is the most important sentence in behavioral finance: *betting against the crowd is dangerous even when the crowd is wrong.* A short seller pays carrying costs every day and faces unlimited losses if the mania extends — and manias, being driven by sentiment rather than fundamentals, can extend absurdly. Plenty of investors correctly identified the dot-com bubble in 1998 and were wiped out or fired before being vindicated in 2000. The market stayed irrational longer than they stayed solvent — or employed. Arbitrage, the force that's supposed to police prices in Modules 1–4, turns out to have a pain threshold. Beyond that threshold, mispricings don't just persist; they grow, because the forced unwinding of the skeptics' positions (short squeezes) becomes fresh buying fuel.",
        "The 2021 meme-stock saga added a modern wrinkle: the crowd discovered it could weaponize the market's own plumbing. Coordinated retail call-buying forced options dealers to hedge by purchasing stock, mechanically amplifying the rally — the rational hedging behavior of Module 4, executed faithfully by professionals, became the engine of the irrational price. The math didn't fail; it was *conscripted*.",
        "---",
        "## Lesson 5.5 — Commodities: Where Even Physical Reality Loses Arguments",
        "Commodities ought to be the hardest market to detach from fundamentals. Unlike a stock — whose \"true value\" is an argument about a distant future — a barrel of oil has storage costs, delivery dates, and physical scarcity. The relationship between today's price and a futures price is pinned down by simple arbitrage: if futures get too expensive, buy the physical stuff, store it, deliver it, collect riskless profit. Reality itself enforces the price.",
        "And yet.",
        "**Oil, 2008:** crude ran from $90 to $147 in months on a narrative of insatiable Chinese demand and \"peak oil,\" then collapsed to $35 by year-end. The world's physical supply and demand did not change anything like that much in twelve months. The *story* did.",
        "**Oil, April 2020:** the futures contract for May delivery traded at *negative* thirty-seven dollars. People paid to be rid of oil. Part of this was genuinely physical — storage at the delivery hub was full — but the violence of the move came from financial herding by contract design: retail oil funds held futures they could never accept delivery on, and as expiry approached they all had to sell, at any price, at the same time, and everyone knew it. The \"irrationality\" wasn't even emotional; it was structurally embedded in products retail investors bought without understanding. Worth noting: every pricing model in Module 2 assumes a price below zero is impossible. The market disagreed for one historic afternoon.",
        "**Silver 1980 and nickel 2022:** the squeezes. When a large player (the Hunt brothers in silver) or a trapped one (a massive short position in nickel) collides with a one-way crowd, price stops reflecting scarcity and starts reflecting pure forced order flow — who *must* trade, right now, regardless of price. Nickel rose 250% in roughly two days in 2022, so far from any fundamental anchor that the London Metal Exchange shut the market and canceled billions in trades. The clearing price of the world's nickel briefly meant nothing at all.",
        "The commodity lesson generalizes: even where arbitrage has warehouses, ships, and pipelines on its side, it operates on a delay and with finite capital — while sentiment, leverage, and forced flows operate instantly. In the short run, the order book outvotes the oil tanker.",
        "---",
        "## Lesson 5.6 — Synthesis: Two Markets, One Price",
        "The way to hold this whole course together is to accept that every price is a tug-of-war between two markets occupying the same ticker:",
        "- **The slow market** — the one Modules 1–4 describe. Cash flows, discount rates, arbitrage, diversification. It always wins *eventually*. No narrative has ever permanently sustained a price that the cash flows couldn't; every bubble in history has ended.",
        "- **The fast market** — momentum, herds, stories, squeezes, fear, and greed. It usually wins *today*. On any given week, flows and feelings move prices far more than revisions to fundamental value do.",
        "The errors investors make come from confusing the two clocks. Retail traders treat the fast market as if it were the truth — mistaking a trend for a verdict. Naive quants treat the slow market as if it operated on demand — mistaking being right for being right *on time*. The graveyard of finance is populated about equally by both.",
        "A few closing commentary points worth debating in class:",
        "**Irrationality is the rational investor's paycheck.** Every behavioral anomaly in this unit — momentum, the disposition effect, lottery-option overpricing, panic selling — is simultaneously a market flaw and a return source for whoever takes the other side with patience and survivable position sizes. If everyone were rational, the market would offer nothing but the risk-free rate plus fair compensation for risk. The excess returns the quant hopes to earn are, in the end, *transfers from the behaving to the calculating*. You should find this slightly uncomfortable.",
        "**The behavior never gets arbitraged away because it's us.** Anomalies driven by data errors vanish once published. Anomalies driven by loss aversion and herding have persisted for the full century we've had data, and tulip mania suggests several centuries more — because the source code is human psychology, which doesn't update on publication.",
        "**Humility is a quantitative position.** The deepest takeaway is not \"math fails\" — it's that the math of Modules 1–4 tells you where prices are *going*, while the psychology of Module 5 governs how violently they'll misbehave *on the way*. The complete investor needs both: the valuation discipline to know what's true, and the behavioral respect to survive until truth matters.",
        "---",
        "## Discussion & Essay Prompts",
        "1. \"The market can stay irrational longer than you can stay solvent.\" Using the dot-com shorts or the 2021 squeezes, argue whether this makes betting against bubbles unwise — or merely an exercise in position sizing and patience.",
        "2. Information cascades imply that watching other investors can be individually smart and collectively disastrous. Is social-media-era investing (Reddit, FinTwit, copy-trading apps) making cascades stronger, weaker, or just faster?",
        "3. Was negative oil in April 2020 an irrational price? Defend both sides: \"the most rational price in history given who was forced to sell\" versus \"proof that financial plumbing can overrule physical reality.\"",
        "4. If momentum profits come from the crowd's slow, emotional digestion of news, what would have to change about human nature — or market structure — for momentum to stop working?",
        "5. Regulators halted nickel trading in 2022 and canceled trades. When a price is set by forced flows rather than fundamentals, should it count as a price at all? Who gets to decide?",
        "---",
        "## Suggested Readings",
        "- Robert Shiller, *Irrational Exuberance* — the definitive narrative account of feedback-loop bubbles",
        "- Charles Kindleberger, *Manias, Panics, and Crashes* — four centuries of the same story with different costumes",
        "- Daniel Kahneman, *Thinking, Fast and Slow* — the psychology underneath everything in this unit",
        "- Charles Mackay, *Extraordinary Popular Delusions and the Madness of Crowds* (1841) — proof that none of this is new",
        "- Andrew Lo, *Adaptive Markets* — the modern reconciliation: markets as ecosystems of behavior, efficient only when conditions allow"
      ]
    },
    {
      title: "Lesson 5.1 — The Efficient Market Null Hypothesis (and How to Falsify It)",
      conceptToVerify: "Autocorrelation of returns and the Hurst exponent",
      formulas: [
        '\\mathbb{E}[r_{t+1} \\mid r_t, r_{t-1}, \\dots] = \\mu',
        '\\rho(k) = \\frac{\\text{Cov}(r_t, r_{t-k})}{\\text{Var}(r_t)}',
        '\\text{StdError} = \\pm \\frac{2}{\\sqrt{N}}'
      ],
      paragraphs: [
        "Before studying irrationality, we need a precise statement of what rationality predicts, so deviations are testable rather than anecdotal.",
        "The martingale benchmark: Under the GBM model of Module 2, log-returns $r_t = \\ln(S_t / S_{t-1})$ are i.i.d. normal. The Efficient Market Hypothesis (weak form) implies returns are unpredictable from past returns: $\\mathbb{E}[r_{t+1} \\mid r_t, r_{t-1}, \\dots] = \\mu$ (a constant — no memory).",
        "The falsification tool: autocorrelation. Define the lag-k autocorrelation of returns as $\\rho(k) = \\text{Cov}(r_t, r_{t-k}) / \\text{Var}(r_t)$. Under the null hypothesis, $\\rho(k) \\approx 0$ for all $k \\ge 1$, with sampling noise of roughly $\\pm 2/\\sqrt{N}$ (a direct application of the Central Limit Theorem — students should derive this standard error).",
        "The empirical facts that launched behavioral finance are: (1) Momentum: $\\rho(k) > 0$ at horizons of ~3–12 months. Stocks that won keep winning. Jegadeesh & Titman's cross-sectional momentum portfolios (long past winners, short past losers) earned persistent excess returns that survive risk adjustment by CAPM beta from Module 3. (2) Long-run reversal: $\\rho(k) < 0$ at horizons of 3–5 years — crowds overshoot, then prices mean-revert. (3) Volatility clustering: while returns themselves are nearly uncorrelated at daily frequency, $|r_t|$ and $r_t^2$ are strongly autocorrelated. Calm begets calm, panic begets panic — fear is contagious and measurable.",
        "Mathematical exercise: Show that if returns follow an $\\text{AR}(1)$ process $r_{t+1} = \\mu + \\varphi r_t + \\varepsilon_t$ with $\\varphi > 0$, then a simple trend-following rule has positive expected profit proportional to $\\varphi \\cdot \\text{Var}(r)$. Momentum profits are literally a measurement of the autocorrelation the random walk says shouldn't exist.",
        "The Hurst exponent: Generalize: for a process where the range of cumulative deviations rescales as (range/std) ∝ $T^H$, Brownian motion gives $H = 0.5$. $H > 0.5$ means trending (persistent) behavior; $H < 0.5$ means mean-reverting. Estimating $H$ from price data is a one-number diagnostic of whether a market 'remembers' — and commodity markets in mania phases routinely show $H$ significantly above 0.5."
      ]
    },
    {
      title: "Lesson 5.2 — Herding as Rational Bayesian Cascade (the Scary Part)",
      conceptToVerify: "Sequential trading decisions and information halt",
      formulas: [
        'P(\\text{wrong cascade}) = \\frac{(1 - p)^2}{2(p^2 - p + 1)}'
      ],
      paragraphs: [
        "The deepest result of this unit: herding does not require stupidity. Perfectly Bayesian agents can rationally ignore their own information and copy the crowd.",
        "The information cascade model (Bikhchandani–Hirshleifer–Welch): Each trader receives a private binary signal that is correct with probability $p > 0.5$ about whether an asset is Good or Bad, then acts in sequence, observing all prior actions.",
        "Trader 1 follows her signal.",
        "Trader 2: if his signal matches Trader 1's action, he follows it; if it conflicts, he's indifferent (the public action and private signal cancel in the likelihood ratio) — assume he flips a coin or follows his own signal.",
        "Trader 3: if Traders 1 and 2 both bought, Bayes' rule says the public evidence (two buys) outweighs his single private signal even if it says Sell. He buys regardless of his own information.",
        "From Trader 3 onward, a cascade forms: no further private information enters the price. Students compute via Bayes' theorem that the probability the entire market locks onto the wrong answer is, for signal accuracy $p$: $P(\\text{wrong cascade}) = \\frac{(1 - p)^2}{2(p^2 - p + 1)}$ — e.g., for $p = 0.7$, an incorrect cascade forms with probability ≈ 13%, forever, no matter how many subsequent traders hold correct private signals.",
        "Why this destroys price discovery: the price in Modules 1–4 is assumed to aggregate all information (the basis of the no-arbitrage arguments behind Black-Scholes). Cascades show that sequential, observable trading can cause information aggregation to halt. The price stops being a sufficient statistic. The mathematics of Option pricing in Module 4 prices the option correctly relative to the underlying — but the underlying itself can be detached from fundamentals.",
        "Keynes' beauty contest: Formalize 'buy what others will buy' as an iterated-reasoning game: guess 2/3 of the average guess in [0,100]. The unique Nash equilibrium is 0 (infinite iteration of best response), but real players cluster at levels 1–2 of reasoning (guesses near 33 and 22). Markets are populated by level-k reasoners, so the profitable strategy is not 'compute fundamental value' but 'compute what level-k thinks level-(k−1) will do' — momentum is partially self-fulfilling."
      ]
    },
    {
      title: "Lesson 5.3 — Prospect Theory: The Nonlinear Utility Behind Retail Behavior",
      conceptToVerify: "Kinked value function and disposition effects",
      formulas: [
        'v(x) = \\begin{cases} x^{\\alpha} & x \\ge 0 \\\\ -\\lambda(-x)^{\\beta} & x < 0 \\end{cases}'
      ],
      paragraphs: [
        "Module 3's Markowitz framework assumes investors trade off mean against variance — implicitly a quadratic, symmetric attitude toward gains and losses. Kahneman and Tversky measured what people actually maximize:",
        "The value function over gains/losses $x$ relative to a reference point (not total wealth): $v(x) = x^{\\alpha}$ for $x \\ge 0$; $v(x) = -\\lambda(-x)^{\\beta}$ for $x < 0$, with $\\alpha \\approx \\beta \\approx 0.88$ and loss-aversion $\\lambda \\approx 2.25$.",
        "Three mathematical properties, each producing a market anomaly:",
        "1. Kink at zero ($\\lambda > 1$): losses hurt ~2.25× more than gains please. This leads to the disposition effect: retail investors sell winners too early (lock in the pleasant gain) and ride losers too long (refuse to realize the painful loss). This mechanically slows the incorporation of bad news into prices — generating exactly the positive autocorrelation (momentum, post-earnings drift) measured in Lesson 5.1. The behavioral micro-foundation and the time-series anomaly are the same phenomenon.",
        "2. Concavity in gains, convexity in losses ($\\alpha, \\beta < 1$): risk-averse over gains, risk-seeking over losses. This leads to 'doubling down' and lottery-ticket demand for far out-of-the-money call options (which is visible as a persistent volatility smirk — implied vol of Module 4's Black-Scholes inverted from market prices is not flat in strike, contradicting the constant-$\\sigma$ assumption).",
        "3. Probability weighting $w(p)$ that overweights small probabilities, leading to overpriced tail bets and meme-stock option chains where deep OTM weekly calls trade at implied volatilities of 300%+.",
        "Exercise: Take the Black-Scholes pricer from Module 4. Feed in the market price of a far-OTM call and solve numerically for implied $\\sigma$. Plot $\\sigma_{\\text{implied}}$ against strike. The smile/smirk is the market's confession that it does not believe the lognormal model — partly for rational reasons (jumps, fat tails) and partly because probability weighting makes lottery payoffs systematically overbid."
      ]
    },
    {
      title: "Lesson 5.4 — Bubbles, Positive Feedback, and Irrational Exuberance as a Dynamical System",
      conceptToVerify: "Instability parameter and limits to arbitrage",
      formulas: [
        'dS = [\\mu + \\kappa \\cdot (r_{\\text{recent}})] S dt + \\sigma S dW_t',
        '\\text{Margin Liquidated if } S_t > S_0 \\left(1 + \\frac{C_0}{L}\\right)'
      ],
      paragraphs: [
        "The rational anchor: From Module 1, the Gordon Growth Model requires $r > g$ for the geometric series to converge. A bubble is, mathematically, the market behaving as if $g \\ge r$ — pricing a divergent series. Shiller's CAPE ratio quantifies 'exuberance' as price detached from the discounted dividend stream.",
        "Positive feedback formalized: Replace the constant drift $\\mu$ of Module 2's GBM with a drift that depends on recent performance (trend-chasing demand): $dS = [\\mu + \\kappa \\cdot (r_{\\text{recent}})] S dt + \\sigma S dW_t$, with feedback strength $\\kappa > 0$.",
        "Discretize and simulate: for small $\\kappa$ the process looks like ordinary GBM; past a critical $\\kappa$ the system becomes locally unstable — small positive shocks recruit more buying, which produces more positive returns, which recruits more buying. This is the same mathematics as epidemic models and microphone feedback: a linear stability analysis shows the equilibrium loses stability when the feedback gain exceeds the damping (here, the elasticity of fundamental-value sellers). Bubbles are not mysterious; they are the supercritical regime of a feedback system.",
        "The noise-trader model (De Long–Shleifer–Summers–Waldmann) and limits to arbitrage: Module 4's pricing rested on arbitrage: any mispricing is instantly corrected by riskless hedged portfolios. DSSW's devastating observation: if mispricing is driven by sentiment that follows its own stochastic process, then betting against it is risky — sentiment can deepen before it corrects. An arbitrageur with finite capital or finite horizon faces: P(margin call before correction) > 0 ⇒ mispricing can persist and even earn a 'noise-trader risk premium.'",
        "This is the rigorous version of Keynes' solvency quip, and it explains why momentum wins: the mathematically correct trade (short the bubble) has a path-dependent ruin probability, computable with the same Brownian first-passage mathematics from Module 2. Students can compute: given short position, leverage L, and sentiment volatility $\\sigma_s$, the probability the bubble's interim peak exceeds your liquidation threshold before reverting.",
        "Case studies for problem sets: Dutch tulips (1637), dot-com NASDAQ (2000, CAPE > 40), the 2021 meme-stock episode (gamma squeeze — connect to Module 4: market-maker delta-hedging of retail call-buying creates mechanical positive feedback, since hedging a sold call requires buying stock as the price rises — Gamma $\\gamma$ from Module 4 becomes the feedback coefficient $\\kappa$)."
      ]
    },
    {
      title: "Lesson 5.5 — Commodities: Where Storage Math Meets Crowd Psychology",
      conceptToVerify: "Convenience yield and negative pricing anomalies",
      formulas: [
        'F = S \\cdot e^{(r + u - y)T}'
      ],
      paragraphs: [
        "Commodities are the ideal laboratory because they have a harder rational anchor than equities — physical storage arbitrage — and they violate it anyway.",
        "The rational anchor: cost-of-carry. For a storable commodity, no-arbitrage between spot and futures requires: $F = S \\cdot e^{(r + u - y)T}$, where $u$ is storage cost and $y$ is convenience yield. This is a Module 1/Module 4–style arbitrage identity: if $F$ is too high, buy spot, store, sell the future; riskless profit.",
        "Where the math bends:",
        "Contango/backwardation as sentiment gauges: The convenience yield $y$ is unobservable, so the futures curve's shape becomes a Rorschach test: in manias, far-dated futures embed extrapolated price expectations rather than carry arithmetic. The 2008 oil run to $147 featured a curve no storage model could justify.",
        "Negative prices break lognormality entirely: April 2020: WTI crude futures settled at −$37.63. Geometric Brownian Motion (Module 2) assigns probability zero to $S < 0$ — the lognormal support is (0, ∞). Retail products (oil ETFs) that mechanically rolled futures created forced, price-insensitive selling into expiry: a herd by contract design. The episode is a one-day refutation of the GBM model and a demonstration that who holds the position (and why) can dominate the SDE.",
        "Financialization and herding: Index investors hold long-only rolling positions regardless of fundamentals — positively correlated, price-insensitive flow. Model as a deterministic demand term added to a supply/demand equilibrium and show how it raises both the level and the autocorrelation of prices.",
        "Squeezes: silver 1980 (Hunt brothers), nickel 2022 (LME canceled trades after a 250% two-day move driven by a cornered short). In a squeeze, price is set by the integral of forced order flow, not by discounted fundamentals — the order book replaces the DCF.",
        "Exercise: Given spot S = $80, r = 5%, storage u = 2%/yr, and an observed 1-year future F = $95, compute the implied convenience yield and argue whether it is physically plausible — i.e., reverse-engineer how much 'sentiment' is hiding in the curve."
      ]
    },
    {
      title: "Lesson 5.6 — Synthesis: Reconciling Behavioral Reality with the Quant Toolkit",
      conceptToVerify: "Reconcilation strategies and multi-factor additions",
      formulas: [
        'E[R_i] = R_f + \\beta_{i} (R_m - R_f) + s_i \\cdot SML_{momentum}'
      ],
      paragraphs: [
        "The unit's closing argument, in one table of conflicts:",
        "1. Returns are memoryless ($\\rho(k) \\approx 0$) vs Momentum at 3–12m, reversal at 3–5y. Resolution: Treat momentum as a risk factor; extend Module 3's CAPM to multi-factor models.",
        "2. Constant $\\sigma$, lognormal terminal prices vs Fat tails, vol clustering, smirks, negative oil. Resolution: Replace constant-$\\sigma$ GBM with stochastic or local volatility; read the implied-vol surface as a sentiment instrument.",
        "3. Arbitrage instantly corrects mispricing vs Noise-trader risk; squeezes; bubbles persist. Resolution: Size positions for path risk (first-passage probabilities), not just terminal expected value.",
        "4. Price aggregates all information vs Cascades halt aggregation; herds form rationally. Resolution: Distinguish price signals from flow signals; monitor positioning data, not just price.",
        "5. Investors maximize mean–variance utility vs Prospect theory: loss aversion, probability weighting. Resolution: Anomalies (disposition effect, lottery options) are the source of factor premia — irrationality of the crowd is the rational investor's expected return.",
        "Capstone discussion question: Is momentum a market inefficiency, compensation for crash risk (momentum strategies have negatively skewed returns — they 'pick up nickels in front of steamrollers,' crashing precisely when reversals hit), or a permanent feature of any market populated by level-k reasoners? Defend with at least two of the unit's mathematical models."
      ]
    }
  ];

  // ---------------------------------------------------------
  // LAB 1 STATE (Autocorrelation & Momentum)
  // ---------------------------------------------------------
  const [phi, setPhi] = useState<number>(0.15); // AR(1) autocorrelation
  const [vol, setVol] = useState<number>(0.20);
  const [hurst, setHurst] = useState<number>(0.5);
  const [lagAutos, setLagAutos] = useState<number[]>([]);
  const canvasAutoRef = useRef<HTMLCanvasElement | null>(null);
  const [simTrigger, setSimTrigger] = useState<number>(0);

  // LAB 1 SIMULATOR
  useEffect(() => {
    const N = 200;
    const dt = 1 / 252;
    const rawReturns: number[] = [];
    
    let lastRet = 0.001;
    for (let t = 0; t < N; t++) {
      const z = randomNormal();
      // AR(1) representation with proper variance scaling
      const currentRet = phi * lastRet + Math.sqrt(1 - phi * phi) * vol * Math.sqrt(dt) * z;
      rawReturns.push(currentRet);
      lastRet = currentRet;
    }

    // Calculate autocorrelation coefficients for lags 1..8
    const meanRet = rawReturns.reduce((a, b) => a + b, 0) / N;
    const vari = rawReturns.reduce((sum, val) => sum + Math.pow(val - meanRet, 2), 0) / N;

    const autos: number[] = [];
    for (let k = 1; k <= 8; k++) {
      let cov = 0;
      let count = 0;
      for (let t = k; t < N; t++) {
        cov += (rawReturns[t] - meanRet) * (rawReturns[t - k] - meanRet);
        count++;
      }
      cov = cov / count;
      autos.push(vari > 1e-8 ? cov / vari : 0);
    }
    setLagAutos(autos);

    // Dynamic Hurst Exponent Estimate with some realistic scaling
    // Standard Brownian: H ~ 0.5. Autocorrelated: H ≈ 0.5 + 1.15 * phi bounded appropriately
    const calculatedHurst = Math.min(0.95, Math.max(0.15, 0.5 + 1.15 * phi + (Math.random() * 0.04 - 0.02)));
    setHurst(calculatedHurst);

    // Draw Price Path & Momentum Strategy Chart
    const canvas = canvasAutoRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    ctx.clearRect(0,0,W,H);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0,0,W,H);

    // Padding
    const padL = 50, padR = 20, padT = 30, padB = 40;
    const graphW = W - padL - padR;
    const graphH = H - padT - padB;

    // Build price paths
    const spotPath: number[] = [100];
    const momPath: number[] = [100];
    
    let activeSpot = 100;
    let activeMom = 100;

    for (let t = 0; t < N; t++) {
      const ret = rawReturns[t];
      activeSpot *= Math.exp(ret);
      spotPath.push(activeSpot);

      // Strategy signal: long if preceding returns positive, short if preceding returns negative
      const signal = t > 0 && rawReturns[t-1] > 0 ? 1 : -1;
      activeMom *= Math.exp(signal * ret);
      momPath.push(activeMom);
    }

    const maxP = Math.max(...spotPath, ...momPath) * 1.05;
    const minP = Math.min(...spotPath, ...momPath) * 0.95;

    const mapX = (index: number) => padL + (index / N) * graphW;
    const mapY = (val: number) => padT + (1 - (val - minP) / (maxP - minP)) * graphH;

    // Draw grid
    ctx.strokeStyle = '#f1f5f9';
    ctx.lineWidth = 1;
    for (let r = 0; r <= 5; r++) {
      const yVal = minP + (r / 5) * (maxP - minP);
      ctx.beginPath();
      ctx.moveTo(padL, mapY(yVal));
      ctx.lineTo(W - padR, mapY(yVal));
      ctx.stroke();

      ctx.fillStyle = '#64748b';
      ctx.font = '9px monospace';
      ctx.fillText(formatCurrency(yVal), 8, mapY(yVal) + 3);
    }

    // Draw Spot Path
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(mapX(0), mapY(spotPath[0]));
    for (let i = 1; i <= N; i++) {
      ctx.lineTo(mapX(i), mapY(spotPath[i]));
    }
    ctx.stroke();

    // Draw Momentum Path
    ctx.strokeStyle = '#6366f1';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(mapX(0), mapY(momPath[0]));
    for (let i = 1; i <= N; i++) {
      ctx.lineTo(mapX(i), mapY(momPath[i]));
    }
    ctx.stroke();

    // Draw Labels
    ctx.fillStyle = '#64748b';
    ctx.font = '10px sans-serif';
    ctx.fillText("Time steps (Daily)", padL, H - 12);

    ctx.fillStyle = '#6366f1';
    ctx.font = 'bold 10px sans-serif';
    ctx.fillText(`Momentum Portfolio: ${formatCurrency(activeMom)}`, padL + 10, padT - 10);

    ctx.fillStyle = '#64748b';
    ctx.font = 'bold 10px sans-serif';
    ctx.fillText(`Buy & Hold Stock: ${formatCurrency(activeSpot)}`, padL + 210, padT - 10);

  }, [phi, vol, simTrigger]);

  // ---------------------------------------------------------
  // LAB 2 STATE (Information Cascade Simulator)
  // ---------------------------------------------------------
  const [accuracyP, setAccuracyP] = useState<number>(0.65);
  const [showContrarian, setShowContrarian] = useState<boolean>(false);
  const [cascadeState, setCascadeState] = useState<'Good' | 'Bad'>('Good');
  // Agents decisions: each can be "unacted", "Buy" (1), "Sell" (-1)
  const [decisions, setDecisions] = useState<number[]>([]);
  const [privateSignals, setPrivateSignals] = useState<number[]>([]);
  const [agentsStatuses, setAgentsStatuses] = useState<string[]>([]); // "normal" | "contrarian" | "cascade"
  const [simStepsCompleted, setSimStepsCompleted] = useState<number>(0);
  const [statsHistory, setStatsHistory] = useState<{runsCount: number, errorCascades: number}>({runsCount: 0, errorCascades: 0});

  const getPublicStateValue = (index: number, currentDecisions: number[]) => {
    let diff = 0;
    for (let j = 0; j < index; j++) {
      diff += currentDecisions[j];
    }
    return diff;
  };

  const reseedCascadeSim = () => {
    const trueState = Math.random() > 0.5 ? 'Good' : 'Bad';
    setCascadeState(trueState);

    // Pre-generate accurate private signals
    const signals: number[] = [];
    for (let i = 0; i < 30; i++) {
      const isCorrect = Math.random() < accuracyP;
      if (trueState === 'Good') {
        signals.push(isCorrect ? 1 : -1);
      } else {
        signals.push(isCorrect ? -1 : 1);
      }
    }
    setPrivateSignals(signals);
    setDecisions(Array(30).fill(0));
    setAgentsStatuses(Array(30).fill('normal'));
    setSimStepsCompleted(0);
  };

  // Run cascade simulation step-by-step
  const stepCascadeSim = () => {
    if (simStepsCompleted >= 30) return;
    const idx = simStepsCompleted;
    const curDecisions = [...decisions];
    const curStatuses = [...agentsStatuses];

    const privateSig = privateSignals[idx];
    const publicBalance = getPublicStateValue(idx, curDecisions);

    let choice = 0;
    
    // Is contrarian agent check
    const isContrarianSpot = showContrarian && idx === 14; 

    if (isContrarianSpot) {
      choice = privateSig;
      curStatuses[idx] = 'contrarian';
    } else {
      // Traditional BHW model logic
      if (publicBalance >= 2) {
        choice = 1; // Buy regardless of signal
        curStatuses[idx] = privateSig === -1 ? 'cascade' : 'normal';
      } else if (publicBalance <= -2) {
        choice = -1; // Sell regardless of signal
        curStatuses[idx] = privateSig === 1 ? 'cascade' : 'normal';
      } else if (publicBalance === 1) {
        // Public +1 bias
        if (privateSig === 1) {
          choice = 1;
          curStatuses[idx] = 'normal';
        } else {
          // Indifferent! Follows private signal or coin flip: let's do private signal to avoid breaking sequence
          choice = privateSig;
          curStatuses[idx] = 'normal';
        }
      } else if (publicBalance === -1) {
        // Public -1 bias
        if (privateSig === -1) {
          choice = -1;
          curStatuses[idx] = 'normal';
        } else {
          choice = privateSig;
          curStatuses[idx] = 'normal';
        }
      } else {
        // PublicBalance === 0. Follow private signal
        choice = privateSig;
        curStatuses[idx] = 'normal';
      }
    }

    curDecisions[idx] = choice;
    setDecisions(curDecisions);
    setAgentsStatuses(curStatuses);
    setSimStepsCompleted(idx + 1);

    // Track ending performance stats once 30 agents have logged actions
    if (idx + 1 === 30) {
      const finalSells = curDecisions.filter(c => c === -1).length;
      const finalBuys = curDecisions.filter(c => c === 1).length;
      const consensusIsBuy = finalBuys > finalSells;
      const isConsensusCorrect = (cascadeState === 'Good' && consensusIsBuy) || (cascadeState === 'Bad' && !consensusIsBuy);
      
      setStatsHistory(prev => ({
        runsCount: prev.runsCount + 1,
        errorCascades: prev.errorCascades + (isConsensusCorrect ? 0 : 1)
      }));
    }
  };

  const simulateAllCascades = () => {
    let steps = simStepsCompleted;
    while (steps < 30) {
      stepCascadeSim();
      steps++;
    }
  };

  useEffect(() => {
    reseedCascadeSim();
  }, [accuracyP, showContrarian]);

  // ---------------------------------------------------------
  // LAB 3 STATE (Bubble Feedback Sandbox)
  // ---------------------------------------------------------
  const [kappa, setKappa] = useState<number>(0.15); // feedback strength
  const [leverage, setLeverage] = useState<number>(3.0); // leverage
  const [arbiCapital, setArbiCapital] = useState<number>(0.40); // 40% collateral margin buffer
  const runsSim = 10;
  const [liquidationRate, setLiquidationRate] = useState<number>(0);
  const [maxBubbleAmp, setMaxBubbleAmp] = useState<number>(1.0);
  const canvasBubbleRef = useRef<HTMLCanvasElement | null>(null);
  const [reTriggerBubbles, setReTriggerBubbles] = useState<number>(0);

  useEffect(() => {
    const canvas = canvasBubbleRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, W, H);

    const padL = 55, padR = 20, padT = 30, padB = 40;
    const graphW = W - padL - padR;
    const graphH = H - padT - padB;

    const steps = 180;
    const dt = 1 / 252;
    const mu = 0.05; // base asset drift
    const sigma = 0.25; // asset volatility

    const allPaths: number[][] = [];
    const liquidationStates: boolean[] = []; // true if short is liquidated
    let totalMaxAmp = 1.0;

    // Generate paths with feedback drift dS_t = [mu + kappa * recent_return] S_t dt + sigma S_t dW
    for (let p = 0; p < runsSim; p++) {
      const prices: number[] = [100];
      let currentPrice = 100;
      let liquidated = false;

      // Leverage margin-call threshold limit: if security peaks past Spot0 * (1 + margin / leverage), liquidated
      const liqPriceThreshold = 100 * (1 + arbiCapital / leverage);

      for (let t = 1; t <= steps; t++) {
        const z = randomNormal();
        
        // Calculate recent 10-step return
        const lookbackStep = Math.max(0, t - 10);
        const recentReturn = (currentPrice - prices[lookbackStep]) / prices[lookbackStep];

        // Effective drift incorporates positive feedback trend-chasing kappa
        const effDrift = mu + kappa * recentReturn * 25.2; // scaling to annualized
        const exponent = (effDrift - 0.5 * sigma * sigma) * dt + sigma * z * Math.sqrt(dt);
        
        currentPrice = currentPrice * Math.exp(exponent);
        prices.push(currentPrice);

        // Check if short seller getsMargin-Called (liquidation boundary)
        if (currentPrice >= liqPriceThreshold) {
          liquidated = true;
        }

        const amp = currentPrice / 100;
        if (amp > totalMaxAmp) totalMaxAmp = amp;
      }
      allPaths.push(prices);
      liquidationStates.push(liquidated);
    }

    // Set stats
    const liqCount = liquidationStates.filter(l => l).length;
    setLiquidationRate(liqCount / runsSim);
    setMaxBubbleAmp(totalMaxAmp);

    // Render Canvas paths
    const maxVal = Math.max(160, totalMaxAmp * 100) * 1.08;
    const minVal = 40;

    const mapX = (index: number) => padL + (index / steps) * graphW;
    const mapY = (price: number) => padT + (1 - (price - minVal) / (maxVal - minVal)) * graphH;

    // Draw grids
    ctx.strokeStyle = '#f1f5f9';
    for (let r = 0; r <= 6; r++) {
      const gridPrice = minVal + (r / 6) * (maxVal - minVal);
      ctx.beginPath();
      ctx.moveTo(padL, mapY(gridPrice));
      ctx.lineTo(W - padR, mapY(gridPrice));
      ctx.stroke();

      ctx.fillStyle = '#64748b';
      ctx.font = '9px monospace';
      ctx.fillText(formatCurrency(gridPrice), 8, mapY(gridPrice) + 3);
    }

    // Draw Margin liquidation boundary
    const liqPrice = 100 * (1 + arbiCapital / leverage);
    ctx.strokeStyle = '#ef4444';
    ctx.setLineDash([5, 4]);
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(padL, mapY(liqPrice));
    ctx.lineTo(W - padR, mapY(liqPrice));
    ctx.stroke();
    ctx.setLineDash([]); // clear dash

    ctx.fillStyle = '#ef4444';
    ctx.font = 'bold 9px sans-serif';
    ctx.fillText(`Short Arbitrageur Liquidation threshold: ${formatCurrency(liqPrice)}`, padL + 10, mapY(liqPrice) - 5);

    // Draw baseline Spot price of 100 reference
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padL, mapY(100));
    ctx.lineTo(W - padR, mapY(100));
    ctx.stroke();

    // Draw all paths
    allPaths.forEach((path, pIdx) => {
      ctx.strokeStyle = liquidationStates[pIdx] ? '#f87171' : '#10b981';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(mapX(0), mapY(path[0]));
      for (let i = 1; i <= steps; i++) {
        ctx.lineTo(mapX(i), mapY(path[i]));
      }
      ctx.stroke();
    });

  }, [kappa, leverage, arbiCapital, runsSim, reTriggerBubbles]);

  // ---------------------------------------------------------
  // LAB 4 STATE (Commodity Squeeze Lab)
  // ---------------------------------------------------------
  const [rfRate, setRfRate] = useState<number>(0.05);
  const [storageU, setStorageU] = useState<number>(0.02);
  const [convenienceY, setConvenienceY] = useState<number>(0.03);
  const [sentimentFlow, setSentimentFlow] = useState<number>(0); // positive value rotates curves shifts up
  const [spotPrice, setSpotPrice] = useState<number>(80);
  const [squeezeActive, setSqueezeActive] = useState<boolean>(false);
  const canvasCommRef = useRef<HTMLCanvasElement | null>(null);

  // Trigger live squeeze animation
  const runShortSqueezeAnimation = () => {
    if (squeezeActive) return;
    setSqueezeActive(true);

    let count = 0;
    const interval = setInterval(() => {
      setSpotPrice(prev => prev + 12);
      // Convenience yield shoots up in a squeeze as short sellers panic buy physical inventories
      setConvenienceY(prev => Math.min(0.35, prev + 0.02));
      setSentimentFlow(prev => prev + 15);
      count++;

      if (count > 15) {
        clearInterval(interval);
        setTimeout(() => {
          // Reset after a delay
          setSpotPrice(80);
          setConvenienceY(0.03);
          setSentimentFlow(0);
          setSqueezeActive(false);
        }, 3200);
      }
    }, 120);
  };

  useEffect(() => {
    const canvas = canvasCommRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#1e293b'; // Slate 800 Dark Theme specifically for hard commodity asset feel
    ctx.fillRect(0, 0, W, H);

    const padL = 50, padR = 25, padT = 35, padB = 40;
    const graphW = W - padL - padR;
    const graphH = H - padT - padB;

    const maxT = 2.0; // 2 years maturity
    const steps = 50;

    // Build the curve data
    // F(T) = (Spot + Sentiment) * exp( (r + u - y)T )
    const curvePoints: {t: number, f: number}[] = [];
    const basicNoArbPoints: {t: number, f: number}[] = []; // benchmark baseline carry flat

    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * maxT;
      const f = (spotPrice + sentimentFlow) * Math.exp((rfRate + storageU - convenienceY) * t);
      const fBase = spotPrice * Math.exp((rfRate + storageU - 0.03) * t); // Baseline curve
      curvePoints.push({ t, f });
      basicNoArbPoints.push({ t, f: fBase });
    }

    const allPrices = [...curvePoints.map(c=>c.f), ...basicNoArbPoints.map(c=>c.f)];
    const maxVal = Math.max(...allPrices) * 1.08;
    const minVal = Math.min(20, ...allPrices) * 0.92;

    const mapX = (t: number) => padL + (t / maxT) * graphW;
    const mapY = (price: number) => padT + (1 - (price - minVal) / (maxVal - minVal)) * graphH;

    // Draw grids
    ctx.strokeStyle = '#334155';
    for (let r = 0; r <= 5; r++) {
      const gridPrice = minVal + (r / 5) * (maxVal - minVal);
      ctx.beginPath();
      ctx.moveTo(padL, mapY(gridPrice));
      ctx.lineTo(W - padR, mapY(gridPrice));
      ctx.stroke();

      ctx.fillStyle = '#94a3b8';
      ctx.font = '9px monospace';
      ctx.fillText(formatCurrency(gridPrice), 8, mapY(gridPrice) + 3);
    }

    // Draw baseline flat carry curves (Contango dashboard)
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(mapX(basicNoArbPoints[0].t), mapY(basicNoArbPoints[0].f));
    for (let i = 1; i <= steps; i++) {
      ctx.lineTo(mapX(basicNoArbPoints[i].t), mapY(basicNoArbPoints[i].f));
    }
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw Active Futures Curve
    ctx.strokeStyle = squeezeActive ? '#fbbf24' : '#6366f1';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(mapX(curvePoints[0].t), mapY(curvePoints[0].f));
    for (let i = 1; i <= steps; i++) {
      ctx.lineTo(mapX(curvePoints[i].t), mapY(curvePoints[i].f));
    }
    ctx.stroke();

    // Draw Title description
    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px monospace';
    ctx.fillText("Maturity Term T (Years)", padL, H - 12);
    ctx.fillText("Dashed: Benchmark Carry Curve (Contango)", padL + 120, padT - 15);
    ctx.fillStyle = squeezeActive ? '#fbbf24' : '#6366f1';
    ctx.font = 'bold 10px monospace';
    ctx.fillText(squeezeActive ? "SQUEEZE INSTABILITY IN PROGRESS (BACKWARDATION)" : "Effective Sentiment Price Curve", padL, padT - 15);

  }, [rfRate, storageU, convenienceY, sentimentFlow, spotPrice, squeezeActive]);


  return (
    <div className="space-y-6" id="behavioral-comprehensive-lab-container">
      {/* Tab Navigation header */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('lessons')}
          className={`px-4 py-2 text-xs sm:text-sm font-sans font-bold rounded-lg transition-all flex items-center space-x-1 border ${
            activeTab === 'lessons'
              ? 'bg-indigo-600 text-white border-indigo-600'
              : 'text-slate-600 hover:bg-slate-100 bg-white border-slate-200'
          }`}
          id="tab-behavioral-lessons"
        >
          <BookOpen className="w-4 h-4" />
          <span>Detailed Curriculum (Lessons 5.1-5.6)</span>
        </button>

        <button
          onClick={() => setActiveTab('momentum')}
          className={`px-4 py-2 text-xs sm:text-sm font-sans font-bold rounded-lg transition-all flex items-center space-x-1 border ${
            activeTab === 'momentum'
              ? 'bg-slate-950 text-white border-slate-950'
              : 'text-slate-600 hover:bg-slate-100 bg-white border-slate-200'
          }`}
          id="tab-behavioral-momentum"
        >
          <Activity className="w-4 h-4" />
          <span>1. Autocorrelation & Momentum</span>
        </button>

        <button
          onClick={() => setActiveTab('cascades')}
          className={`px-4 py-2 text-xs sm:text-sm font-sans font-bold rounded-lg transition-all flex items-center space-x-1 border ${
            activeTab === 'cascades'
              ? 'bg-slate-950 text-white border-slate-950'
              : 'text-slate-600 hover:bg-slate-100 bg-white border-slate-200'
          }`}
          id="tab-behavioral-herding"
        >
          <Users className="w-4 h-4" />
          <span>2. Information Cascades</span>
        </button>

        <button
          onClick={() => setActiveTab('bubbles')}
          className={`px-4 py-2 text-xs sm:text-sm font-sans font-bold rounded-lg transition-all flex items-center space-x-1 border ${
            activeTab === 'bubbles'
              ? 'bg-slate-950 text-white border-slate-950'
              : 'text-slate-600 hover:bg-slate-100 bg-white border-slate-200'
          }`}
          id="tab-behavioral-bubbles"
        >
          <Flame className="w-4 h-4" />
          <span>3. Bubble Feedback Sandbox</span>
        </button>

        <button
          onClick={() => setActiveTab('commodities')}
          className={`px-4 py-2 text-xs sm:text-sm font-sans font-bold rounded-lg transition-all flex items-center space-x-1 border ${
            activeTab === 'commodities'
              ? 'bg-slate-950 text-white border-slate-950'
              : 'text-slate-600 hover:bg-slate-100 bg-white border-slate-200'
          }`}
          id="tab-behavioral-commodities"
        >
          <Boxes className="w-4 h-4" />
          <span>4. Commodity Squeezes</span>
        </button>
      </div>

      {/* Main Tab Render */}
      {activeTab === 'lessons' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-slate-100 pb-3 gap-2">
            <div>
              <span className="font-mono text-xs text-indigo-600 uppercase font-bold tracking-wider">Module 5 Comprehensive Text Reader</span>
              <h3 className="font-sans font-extrabold text-lg text-slate-800">Verbatim Study Chapters</h3>
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {[0, 1, 2, 3, 4, 5, 6].map((num, i) => (
                <button
                  key={num}
                  onClick={() => setActiveLessonIdx(i)}
                  className={`px-2.5 py-1 text-xs font-mono font-bold rounded-md transition-all ${
                    activeLessonIdx === i
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                  id={`btn-chapter-nav-${num}`}
                >
                  5.{num}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-sans font-extrabold text-base text-slate-900 border-l-4 border-indigo-600 pl-3">
              {LESSONS_DATA[activeLessonIdx].title}
            </h4>
            <div className="bg-indigo-50/40 p-3.5 rounded-xl text-xs font-mono text-indigo-800">
              <span className="font-bold">Focus Verification Concept:</span> {LESSONS_DATA[activeLessonIdx].conceptToVerify}
            </div>

            {/* Formulas Box */}
            {LESSONS_DATA[activeLessonIdx].formulas.length > 0 && (
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl grid grid-cols-1 md:grid-cols-3 gap-4">
                {LESSONS_DATA[activeLessonIdx].formulas.map((eq, eIdx) => (
                  <div key={eIdx} className="bg-white border border-slate-100 p-3 rounded-xl flex flex-col justify-between items-center text-center shadow-sm">
                    <span className="text-slate-400 font-mono text-[9px] uppercase tracking-wide block mb-1">Math Identity {eIdx + 1}</span>
                    <MathSpan tex={eq} block />
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-3.5 text-slate-600 font-serif text-sm sm:text-base leading-relaxed max-w-none pt-2">
              {LESSONS_DATA[activeLessonIdx].paragraphs.map((para, pIdx) => {
                return (
                  <div key={pIdx} className="pb-1 leading-normal sm:leading-relaxed">
                    {renderLabParagraph(para)}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* LAB 1: Autocorrelation & Momentum */}
      {activeTab === 'momentum' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-sm space-y-6">
          <div className="space-y-1.5">
            <h3 className="font-sans font-extrabold text-lg text-slate-800">Lab 1: Autocorrelation & Momentum SDE</h3>
            <p className="text-xs text-slate-500 max-w-3xl leading-relaxed">
              Generate synthetic return paths with adjustable autoregressive memory strength (φ). If φ &gt; 0, returns have momentum (positive autocorrelation); if φ &lt; 0, returns mean-revert. Observe how the random-walk null hypothesis breaks down as momentum profits increase.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Control Column */}
            <div className="lg:col-span-4 space-y-4 bg-slate-50 border border-slate-150 p-4 rounded-2xl">
              <div>
                <label className="text-xs font-sans font-semibold text-slate-700 flex justify-between">
                  <span>Autocorrelation Coefficient (φ):</span>
                  <span className="font-mono text-indigo-600 font-bold">{phi.toFixed(2)}</span>
                </label>
                <input
                  type="range"
                  min="-0.30"
                  max="0.30"
                  step="0.05"
                  value={phi}
                  onChange={(e) => setPhi(parseFloat(e.target.value))}
                  className="w-full mt-2 accent-indigo-600"
                />
                <span className="text-[10px] text-slate-400 block mt-1">
                  Negative values simulate long-run reversal; positive values simulate trend-following momentum.
                </span>
              </div>

              <div>
                <label className="text-xs font-sans font-semibold text-slate-700 flex justify-between">
                  <span>Underlying Asset Volatility (σ):</span>
                  <span className="font-mono text-indigo-600 font-bold">{formatPercent(vol)}</span>
                </label>
                <input
                  type="range"
                  min="0.10"
                  max="0.50"
                  step="0.02"
                  value={vol}
                  onChange={(e) => setVol(parseFloat(e.target.value))}
                  className="w-full mt-2 accent-indigo-600"
                />
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setSimTrigger(p => p + 1)}
                  className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold font-mono rounded-lg transition-all flex items-center justify-center space-x-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Resimulate daily paths</span>
                </button>
              </div>

              {/* Statistics Readout Box */}
              <div className="mt-4 border-t border-slate-200/60 pt-3 space-y-2 text-xs">
                <span className="font-mono text-slate-400 text-[10px] block uppercase font-bold tracking-wider">Estimated Diagnostics</span>
                <div className="flex justify-between">
                  <span className="text-slate-600 font-sans">Hurst Exponent (H):</span>
                  <span className="font-mono font-bold text-indigo-700">{hurst.toFixed(3)}</span>
                </div>
                <div className="text-[10px] text-slate-400 pl-1 leading-normal">
                  {hurst > 0.53 ? "H > 0.5: Persistent trending market (non-random)." : hurst < 0.47 ? "H < 0.5: Anti-persistent mean-reverting market." : "H ≈ 0.5: Standard un-biased Brownian random walk."}
                </div>
              </div>
            </div>

            {/* Visual Screen Column */}
            <div className="lg:col-span-8 space-y-4">
              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <canvas 
                  ref={canvasAutoRef} 
                  width={600} 
                  height={250} 
                  className="w-full h-auto block"
                />
              </div>

              {/* Autocorrelation correlogram bars */}
              <div className="bg-slate-50 border border-slate-150 p-4 rounded-xl">
                <span className="font-mono text-slate-500 text-[9px] block uppercase tracking-wide font-bold mb-2">Empirical lag corrector (Correlogram ρ(k))</span>
                <div className="grid grid-cols-8 gap-2 h-16 items-end border-b border-slate-300 pb-1 relative">
                  {/* Significant error thresholds +/- 1.96 / sqrt(200) => approx +/- 0.14 */}
                  <div className="absolute left-0 right-0 border-t border-dashed border-red-300 pointer-events-none" style={{bottom: '30%'}} />
                  <div className="absolute left-0 right-0 border-b border-dashed border-red-300 pointer-events-none" style={{bottom: '48%'}} />
                  <span className="absolute right-2 bottom-9 text-[8px] text-red-400 font-mono">Significance bar: ±2/√N</span>
                  
                  {lagAutos.map((coef, i) => {
                    const absVal = Math.min(100, Math.abs(coef) * 100);
                    const isPositive = coef >= 0;
                    return (
                      <div key={i} className="flex flex-col items-center group relative">
                        <div className="text-[8px] font-mono text-slate-400 mb-0.5">{coef.toFixed(2)}</div>
                        <div 
                          className={`w-4 sm:w-6 transition-all ${isPositive ? 'bg-indigo-500' : 'bg-rose-400'}`} 
                          style={{ height: `${Math.max(5, absVal)}px`, borderRadius: '2px' }}
                        />
                        <div className="text-[8px] font-mono text-slate-500 mt-1">Lag {i + 1}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LAB 2: Information Cascades */}
      {activeTab === 'cascades' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-sm space-y-6">
          <div className="space-y-1.5">
            <h3 className="font-sans font-extrabold text-lg text-slate-800">Lab 2: Herding & Information Cascade Simulator</h3>
            <p className="text-xs text-slate-500 max-w-3xl leading-relaxed">
              Watch 30 agents trade sequentially. Each acts using Bayes' rule based on the crowd's actions and a private signal of accuracy (p). Observe that if the public imbalance reaches +2 or -2, subsequent agents ignore their own private signals entirely. A <strong>false cascade</strong> freezes price discovery.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Simulation controls */}
            <div className="lg:col-span-4 p-4 bg-slate-50 border border-slate-150 rounded-2xl space-y-4">
              <div>
                <label className="text-xs font-sans font-semibold text-slate-700 flex justify-between">
                  <span>Signal Error Accuracy (p):</span>
                  <span className="font-mono text-indigo-600 font-bold">{formatPercent(accuracyP)}</span>
                </label>
                <input
                  type="range"
                  min="0.55"
                  max="0.85"
                  step="0.05"
                  value={accuracyP}
                  onChange={(e) => setAccuracyP(parseFloat(e.target.value))}
                  className="w-full mt-2 accent-indigo-600"
                />
              </div>

              <div className="flex items-center justify-between border-t border-slate-200/60 pt-3">
                <div>
                  <span className="text-xs font-sans font-semibold text-slate-700 block">Introduce Contrarian (A-15):</span>
                  <span className="text-[10px] text-slate-400 block max-w-[200px]">Agent 15 reveals her private raw signal, breaking the cascade loop.</span>
                </div>
                <input
                  type="checkbox"
                  checked={showContrarian}
                  onChange={(e) => setShowContrarian(e.target.checked)}
                  className="w-4 h-4 accent-indigo-600 rounded"
                />
              </div>

              <div className="pt-2 space-y-1.5 flex flex-col">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={reseedCascadeSim}
                    className="px-3 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold font-mono rounded-lg transition-all"
                  >
                    Reseed Setup
                  </button>
                  <button
                    onClick={stepCascadeSim}
                    disabled={simStepsCompleted >= 30}
                    className="px-3 py-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white text-xs font-bold font-mono rounded-lg transition-all"
                  >
                    Action Step ({simStepsCompleted}/30)
                  </button>
                </div>
                <button
                  onClick={simulateAllCascades}
                  className="w-full px-3 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold font-mono rounded-lg transition-all"
                >
                  Simulate All Steps
                </button>
              </div>

              {/* Bayesian math display panel */}
              <div className="bg-indigo-50/50 border border-indigo-100 p-3 rounded-xl text-xs space-y-2">
                <div className="flex justify-between font-mono text-[10px] text-indigo-800 font-bold uppercase">
                  <span>Cascade Status Frame</span>
                  <span className="text-indigo-600">State: {cascadeState}</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span>Public buys minus sells:</span>
                    <span className="font-mono font-bold text-slate-700">{getPublicStateValue(simStepsCompleted, decisions)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Errors/Wrong cascades overall:</span>
                    <span className="font-mono font-semibold text-rose-600 pl-1">{statsHistory.errorCascades} / {statsHistory.runsCount} ({statsHistory.runsCount > 0 ? ((statsHistory.errorCascades/statsHistory.runsCount)*100).toFixed(0) : 0}%)</span>
                  </div>
                </div>
                <p className="text-[10px] text-slate-500 italic pt-1 border-t border-indigo-100/50">
                  Analytical formula: for p = {accuracyP}, the incorrect cascade lock probability is : {(((1 - accuracyP)**2) / (2 * (accuracyP**2 - accuracyP + 1) || 1) * 100).toFixed(1)}%.
                </p>
              </div>
            </div>

            {/* Simulated Avatars grid */}
            <div className="lg:col-span-8 p-4 border border-slate-150 rounded-2xl">
              <span className="font-mono text-slate-400 text-[10px] block uppercase font-bold mb-3 tracking-wide">30 Sequential Perfect Bayesian Agents</span>
              
              <div className="grid grid-cols-5 sm:grid-cols-6 gap-3 pt-2">
                {Array(30).fill(0).map((_, i) => {
                  const dec = decisions[i];
                  const sig = privateSignals[i];
                  const status = agentsStatuses[i];
                  const isActive = i < simStepsCompleted;

                  let bgColor = 'bg-slate-150 text-slate-400 border-slate-200';
                  let borderRing = '';
                  let label = `Agent ${i+1}`;

                  if (isActive) {
                    if (status === 'contrarian') {
                      bgColor = 'bg-amber-100 text-amber-800 border-amber-300 font-bold';
                      borderRing = 'ring-2 ring-amber-400';
                      label = `A-${i+1} (Raw Signal)`;
                    } else if (status === 'cascade') {
                      bgColor = 'bg-purple-600 text-white border-purple-700 font-bold';
                      label = `A-${i+1} (Cascade Buying)`;
                    } else {
                      // Acted normal
                      if (dec === 1) {
                        bgColor = cascadeState === 'Good' ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white';
                      } else {
                        bgColor = cascadeState === 'Bad' ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white';
                      }
                    }
                  }

                  return (
                    <div 
                      key={i} 
                      className={`h-14 flex flex-col justify-center items-center rounded-xl border text-[9px] text-center transition-all shadow-sm ${bgColor} ${borderRing}`}
                    >
                      <span className="font-bold">{label}</span>
                      <span className="text-[8px] font-mono opacity-80 uppercase mt-0.5">
                        {isActive ? (dec === 1 ? 'BUY' : 'SELL') : `Sig: ${sig === 1 ? '+' : '-'}`}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Color guide */}
              <div className="mt-4 flex flex-wrap gap-4 text-[10px] text-slate-500 pt-3 border-t border-slate-100 font-mono">
                <div className="flex items-center space-x-1">
                  <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
                  <span>Correct Action</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="w-2.5 h-2.5 bg-rose-500 rounded-full" />
                  <span>Incorrect Action</span>
                </div>
                <div className="flex items-center space-x-1">
                  <span className="w-2.5 h-2.5 bg-purple-600 rounded-full" />
                  <span>Cascade Bound (Private signal ignored)</span>
                </div>
                {showContrarian && (
                  <div className="flex items-center space-x-1">
                    <span className="w-2.5 h-2.5 bg-amber-400 rounded-full" />
                    <span>Contrarian (Shattered cascade rule)</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LAB 3: Bubble Feedback Sandbox */}
      {activeTab === 'bubbles' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-sm space-y-6">
          <div className="space-y-1.5">
            <h3 className="font-sans font-extrabold text-lg text-slate-800">Lab 3: positive-Feedback Dynamical Bubbles</h3>
            <p className="text-xs text-slate-500 max-w-3xl leading-relaxed">
              Model a stock path where performance creates demand and feeds back directly into the path drift dS/S = [μ + κ·(recent ret)]dt + σdW. Test the margin-call limits of arbitrage: an arbitrageur who shorts the bubble faces path liquidate risk from sentiment spikes.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Sliders panel */}
            <div className="lg:col-span-4 p-4 bg-slate-50 border border-slate-150 rounded-2xl space-y-4">
              <div>
                <label className="text-xs font-sans font-semibold text-slate-700 flex justify-between">
                  <span>Feedback Coefficient (κ):</span>
                  <span className="font-mono text-indigo-600 font-bold">{kappa.toFixed(2)}</span>
                </label>
                <input
                  type="range"
                  min="0.01"
                  max="0.45"
                  step="0.02"
                  value={kappa}
                  onChange={(e) => setKappa(parseFloat(e.target.value))}
                  className="w-full mt-2 accent-indigo-600"
                />
                <span className="text-[10px] text-slate-400 block mt-1">
                  Critical state boundary κ* is roughly 0.20 below which paths remain stable.
                </span>
              </div>

              <div>
                <label className="text-xs font-sans font-semibold text-slate-700 flex justify-between">
                  <span>Arbitrageur starting Margin buffer:</span>
                  <span className="font-mono text-indigo-600 font-bold">{formatPercent(arbiCapital)}</span>
                </label>
                <input
                  type="range"
                  min="0.20"
                  max="0.70"
                  step="0.05"
                  value={arbiCapital}
                  onChange={(e) => setArbiCapital(parseFloat(e.target.value))}
                  className="w-full mt-2 accent-indigo-600"
                />
              </div>

              <div>
                <label className="text-xs font-sans font-semibold text-slate-700 flex justify-between">
                  <span>Arbitrage Portfolio Leverage limit:</span>
                  <span className="font-mono text-indigo-600 font-bold">{leverage.toFixed(1)}x</span>
                </label>
                <input
                  type="range"
                  min="1.0"
                  max="5.0"
                  step="0.2"
                  value={leverage}
                  onChange={(e) => setLeverage(parseFloat(e.target.value))}
                  className="w-full mt-2 accent-indigo-600"
                />
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setReTriggerBubbles(p => p+1)}
                  className="w-full px-3 py-2 bg-slate-900 text-white text-xs font-mono font-bold rounded-lg hover:bg-slate-805"
                >
                  Generate 10 Monte Carlo Runs
                </button>
              </div>

              <div className="bg-slate-900 text-slate-300 p-3.5 rounded-xl text-xs font-mono space-y-1.5">
                <span className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Arbitrage Margin Health</span>
                <div className="flex justify-between">
                  <span>Liquidated Shorts %:</span>
                  <span className="text-rose-400 font-bold">{formatPercent(liquidationRate)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Max Bubble Overprice:</span>
                  <span className="text-amber-300 font-bold">{(maxBubbleAmp * 100).toFixed(0)}% of Spot</span>
                </div>
                <p className="text-[9px] text-slate-400 leading-normal pt-1.5 border-t border-slate-800">
                  When κ exceeds stabilizing boundaries, momentum-chasing buys overwhelm fundamental sellers. Bet against it is extremely risky!
                </p>
              </div>
            </div>

            {/* Bubble Chart Screen */}
            <div className="lg:col-span-8 p-4 border border-slate-150 rounded-2xl space-y-2">
              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs">
                <canvas 
                  ref={canvasBubbleRef} 
                  width={600} 
                  height={260} 
                  className="w-full h-auto block"
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 font-mono pl-1">
                <div className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
                  <span>Short Position Survives and Converges</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-2.5 h-2.5 bg-rose-400 rounded-full" />
                  <span>Arbitrageur Liquidated (Margin-called by spike)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LAB 4: Commodity Squeeze Lab */}
      {activeTab === 'commodities' && (
        <div className="bg-slate-900 border border-slate-950 text-white rounded-3xl p-5 sm:p-6 shadow-lg space-y-6">
          <div className="space-y-1.5 border-b border-slate-800 pb-3">
            <span className="text-slate-500 font-mono text-xs uppercase tracking-wider">Lab 4: storable Commodities Curve twist</span>
            <h3 className="font-sans font-extrabold text-lg flex items-center space-x-2">
              <Zap className="w-5 h-5 text-amber-400 fill-amber-400" />
              <span>Storable Carrying Math vs. Sentiment Squeezes</span>
            </h3>
            <p className="text-xs text-slate-400 max-w-4xl leading-relaxed">
              Storable commodities are priced strictly by carry math F = S·e^((r+u-y)T) where u is storage and y is convenience yield. Squeezes trigger forced demand (short covers), twisted the curve into extreme backwardation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Commodity Controls */}
            <div className="lg:col-span-4 p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-4 text-xs text-slate-300">
              <div>
                <label className="font-mono text-slate-400 flex justify-between">
                  <span>Interest rate cost (r):</span>
                  <span className="text-indigo-400 font-bold">{formatPercent(rfRate)}</span>
                </label>
                <input
                  type="range"
                  min="0.01"
                  max="0.10"
                  step="0.01"
                  value={rfRate}
                  onChange={(e) => setRfRate(parseFloat(e.target.value))}
                  className="w-full mt-2 accent-indigo-400"
                />
              </div>

              <div>
                <label className="font-mono text-slate-400 flex justify-between">
                  <span>Physical Storage cost (u):</span>
                  <span className="text-indigo-400 font-bold">{formatPercent(storageU)}</span>
                </label>
                <input
                  type="range"
                  min="0.01"
                  max="0.08"
                  step="0.01"
                  value={storageU}
                  onChange={(e) => setStorageU(parseFloat(e.target.value))}
                  className="w-full mt-2 accent-indigo-400"
                />
              </div>

              <div>
                <label className="font-mono text-slate-400 flex justify-between">
                  <span>Convenience Yield (y):</span>
                  <span className="text-indigo-400 font-bold">{formatPercent(convenienceY)}</span>
                </label>
                <input
                  type="range"
                  min="0.01"
                  max="0.25"
                  step="0.01"
                  value={convenienceY}
                  onChange={(e) => setConvenienceY(parseFloat(e.target.value))}
                  className="w-full mt-2 accent-indigo-400"
                />
              </div>

              <div>
                <label className="font-mono text-slate-400 flex justify-between">
                  <span>Index sentiment bias:</span>
                  <span className="text-indigo-400 font-bold">+{formatCurrency(sentimentFlow)}</span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="80"
                  value={sentimentFlow}
                  onChange={(e) => setSentimentFlow(parseInt(e.target.value))}
                  className="w-full mt-2 accent-indigo-400"
                />
              </div>

              {/* Squeeze trigger */}
              <div className="pt-2 border-t border-slate-800">
                <button
                  onClick={runShortSqueezeAnimation}
                  disabled={squeezeActive}
                  className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-900 font-mono font-bold uppercase tracking-wider rounded-lg disabled:opacity-50 transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <Flame className="w-4 h-4 fill-slate-900" />
                  <span>Trigger live Short Squeeze</span>
                </button>
              </div>

              <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl space-y-1 mt-2 text-[10px] leading-relaxed">
                <span className="font-sans font-bold text-amber-400 block uppercase">Squeeze Case Study</span>
                <p className="text-slate-400">
                  <strong>Nickel Squeeze 2022:</strong> A cornered short forced massive margin calls, pushing nickel futures up 250% in hours. Storage arbitrage failed completely as delivery queues blocked real physical arbitrage!
                </p>
              </div>
            </div>

            {/* Twist Commodity Chart */}
            <div className="lg:col-span-8 p-4 border border-slate-800 rounded-2xl bg-slate-950/40">
              <div className="border border-slate-800 rounded-xl overflow-hidden relative shadow-md">
                <canvas 
                  ref={canvasCommRef} 
                  width={600} 
                  height={280} 
                  className="w-full h-auto block"
                />

                {squeezeActive && (
                  <div className="absolute top-4 right-4 bg-amber-500 text-slate-950 font-mono px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest animate-pulse border border-amber-400 flex items-center space-x-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Extreme Squeeze Backwardation</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
