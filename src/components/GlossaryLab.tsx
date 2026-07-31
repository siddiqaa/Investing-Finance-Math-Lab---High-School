import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  BookMarked, 
  Sparkles, 
  ArrowRight, 
  Tag, 
  HelpCircle,
  Lightbulb,
  CheckCircle2,
  Star,
  Copy,
  Check,
  LayoutGrid,
  List,
  Table as TableIcon,
  BookmarkCheck
} from 'lucide-react';
import { MathSpan } from '../lib/math';

export interface GlossaryTerm {
  id: string;
  term: string;
  symbol?: string;
  category: 'Banking & Credit' | 'Markets & Trading' | 'TVM & Rates' | 'Equities' | 'Portfolios & Risk' | 'Loans & Real Estate' | 'Derivatives & Behavior';
  formula?: string;
  definition: string;
  analogy: string;
  example: string;
  unitId: string;
  unitName: string;
}

export const GLOSSARY_TERMS: GlossaryTerm[] = [
  {
    id: 'amortization',
    term: 'Amortization',
    symbol: 'PMT',
    category: 'Loans & Real Estate',
    formula: 'PMT = P \\times \\frac{r(1+r)^n}{(1+r)^n - 1}',
    definition: 'The process of spreading a debt loan into a series of equal periodic payments over time, where each payment is split between interest expense and principal reduction.',
    analogy: 'Eating a giant 30-slice pizza by eating exactly one slice every day for a month until the box is completely empty.',
    example: 'A $20,000 auto loan at 6% interest over 60 months requires equal monthly amortized payments of $386.66.',
    unitId: 'amortization',
    unitName: 'Bonus Unit B: Auto Loans & TCO'
  },
  {
    id: 'amortization_schedule',
    term: 'Amortization Schedule',
    category: 'Loans & Real Estate',
    definition: 'A complete line-by-line schedule showing every periodic loan payment, detailing the exact allocation toward principal reduction versus interest expense over the loan lifetime.',
    analogy: 'A step-by-step trail map showing every campsite on a mountain hike until you reach the summit (zero balance).',
    example: 'An amortization schedule illustrates how early payments are heavily weighted toward interest, while later payments accelerate principal paydown.',
    unitId: 'amortization',
    unitName: 'Bonus Unit B: Auto Loans & TCO'
  },
  {
    id: 'arbitrage',
    term: 'Arbitrage',
    category: 'Markets & Trading',
    formula: '\\text{Profit} = P_{\\text{Exchange B}} - P_{\\text{Exchange A}} > 0',
    definition: 'The simultaneous purchase and sale of an asset in different markets to exploit minute price differentials and lock in a risk-free profit.',
    analogy: 'Buying a concert ticket for $50 outside the left stadium gate and immediately selling it to someone at the right gate for $70.',
    example: 'High-frequency algorithmic trading firms exploit 0.01-cent price differences for gold between London and New York exchanges.',
    unitId: 'newsBridge',
    unitName: 'Unit 5: News Shocks & Catalysts'
  },
  {
    id: 'asset_allocation',
    term: 'Asset Allocation',
    category: 'Portfolios & Risk',
    definition: 'The strategic division of an investment portfolio among broad asset categories (stocks, bonds, cash, real estate) tailored to risk tolerance and time horizon.',
    analogy: 'Designing a sports team starting lineup—balancing aggressive strikers (stocks) with steady defense players (bonds).',
    example: 'A 20-year-old investor might hold an 80% stock / 20% bond allocation, whereas a retiree might prefer a 30% stock / 70% bond allocation.',
    unitId: 'portfolio',
    unitName: 'Unit 7: Portfolio Theory'
  },
  {
    id: 'asset_diversification',
    term: 'Asset Diversification',
    category: 'Portfolios & Risk',
    definition: 'The risk-management practice of allocating capital across diverse uncorrelated industries, asset classes, and geographies to reduce single-company risk.',
    analogy: 'Don\'t put all your eggs in one basket—if the basket drops, all your eggs break; if you split them across ten baskets, one drop won\'t ruin breakfast.',
    example: 'Holding an S&P 500 index fund gives instant fractional ownership across 500 major companies, mitigating individual stock bankruptcy risk.',
    unitId: 'portfolio',
    unitName: 'Unit 7: Portfolio Theory'
  },
  {
    id: 'liquidity',
    term: 'Asset Liquidity',
    category: 'Banking & Credit',
    definition: 'The speed and ease with which an asset can be converted into spendable cash without suffering a significant loss in market value.',
    analogy: 'Cash in your wallet is liquid water; real estate is like ice frozen inside a glacier that takes months to melt into cash.',
    example: 'Checking accounts offer 100% immediate liquidity, whereas real estate or physical collectibles require weeks or months to liquidate.',
    unitId: 'rateSelection',
    unitName: 'Unit 2: Cost of Capital & Rates'
  },
  {
    id: 'bull_bear',
    term: 'Bear Market vs. Bull Market',
    category: 'Markets & Trading',
    definition: 'A Bull Market refers to an extended period of rising asset prices (+20% or more) driven by optimism, while a Bear Market is a sustained decline (-20% or more) driven by pessimism.',
    analogy: 'A bull thrusts its horns upward when attacking; a bear swipes its paws downward in defense.',
    example: 'The 2009–2020 economic expansion was the longest bull market in modern history, followed by a sudden pandemic bear market in early 2020.',
    unitId: 'stochastic',
    unitName: 'Unit 6: Stochastic Math'
  },
  {
    id: 'beta',
    term: 'Beta Sensitivity (\\beta)',
    symbol: '\\beta',
    category: 'Portfolios & Risk',
    formula: '\\beta_i = \\frac{\\text{Cov}(R_i, R_m)}{\\text{Var}(R_m)}',
    definition: 'A measure of an asset\'s systematic market volatility relative to a baseline market index (\\beta_{market} = 1.0).',
    analogy: 'A speedboat reacting to sea waves: \\beta = 1.5 rises and drops 50% higher than the ocean swell.',
    example: 'A high-tech stock with \\beta = 1.4 is expected to gain 14% when the S&P 500 rises 10%.',
    unitId: 'portfolio',
    unitName: 'Unit 7: Portfolio Theory'
  },
  {
    id: 'black_scholes',
    term: 'Black-Scholes Model',
    symbol: 'C, d_1, d_2',
    category: 'Derivatives & Behavior',
    formula: 'C = S_0 N(d_1) - K e^{-r T} N(d_2)',
    definition: 'The Nobel Prize-winning closed-form differential model for pricing European option derivatives based on volatility, strike price, time to expiration, and interest rate.',
    analogy: 'An actuarial mathematical table calculating exact auto insurance premiums based on driver age and vehicle speed.',
    example: 'Inputs S=100, K=100, r=5%, T=1yr, \\sigma=20% compute exact theoretical option price.',
    unitId: 'options',
    unitName: 'Bonus Unit A: Options & Payoffs'
  },
  {
    id: 'call_option',
    term: 'Call Option Contract',
    symbol: 'C, K',
    category: 'Derivatives & Behavior',
    formula: '\\text{Payoff} = \\max(S_T - K, 0)',
    definition: 'A financial contract giving the buyer the right (not obligation) to buy a stock at strike price K before expiration T.',
    analogy: 'Paying $5 for a coupon that locks in the right to buy a concert ticket for $50 next month.',
    example: 'If stock S_T = $65 and strike K = $50, the call payoff at expiration is $15.00.',
    unitId: 'options',
    unitName: 'Bonus Unit A: Options & Payoffs'
  },
  {
    id: 'capital_gain',
    term: 'Capital Gain & Loss',
    category: 'Equities',
    formula: '\\text{Capital Gain} = P_{\\text{sale}} - P_{\\text{purchase}}',
    definition: 'The profit realized when selling an asset (stock, bond, real estate) at a price higher than its original purchase cost basis.',
    analogy: 'Buying a rare collectible card for $10 and selling it a year later to a collector for $35.',
    example: 'Purchasing 10 shares at $50 ($500 total) and selling at $80 ($800 total) yields a $300 capital gain.',
    unitId: 'stockBridge',
    unitName: 'Unit 3: Stock Ownership Bridge'
  },
  {
    id: 'cd',
    term: 'Certificate of Deposit (CD)',
    category: 'Banking & Credit',
    definition: 'A fixed-term, FDIC-insured bank savings product that pays a guaranteed interest rate in exchange for locking up funds until a maturity date.',
    analogy: 'Putting money in a time-capsule safe—you can\'t touch it for 12 months, but the bank rewards you with a guaranteed bonus payout at the end.',
    example: 'A 12-month CD paying 5.0% APY guarantees $500 interest on a $10,000 principal deposit.',
    unitId: 'rateSelection',
    unitName: 'Unit 2: Cost of Capital & Rates'
  },
  {
    id: 'compound_interest',
    term: 'Compound Interest',
    symbol: 'FV',
    category: 'TVM & Rates',
    formula: 'A = P \\left(1 + \\frac{r}{n}\\right)^{nt}',
    definition: 'Interest calculated on both the initial principal deposit and all accumulated interest earned from previous periods—interest earning interest.',
    analogy: 'A snowball rolling down a snowy mountain: as it gathers snow, its larger surface area collects even more snow with every revolution.',
    example: '$1,000 earning 10% compound interest becomes $1,100 in Year 1, $1,210 in Year 2, and $1,331 in Year 3.',
    unitId: 'compounding',
    unitName: 'Unit 1: Compounding & NPV'
  },
  {
    id: 'perpetuity',
    term: 'Constant Perpetuity Valuation',
    symbol: 'P_0',
    category: 'Equities',
    formula: 'P_0 = \\frac{D}{r}',
    definition: 'The present value of an infinite stream of identical, ungrowing annual cash flows or preferred stock dividends.',
    analogy: 'Buying a magic piggy bank that pays $5 every year forever.',
    example: 'A preferred stock paying $6.00 annual dividend at r = 8% is worth P_0 = $6.00 / 0.08 = $75.00.',
    unitId: 'flatValuation',
    unitName: 'Unit 3.5: Flat Valuation Lab'
  },
  {
    id: 'credit_score',
    term: 'Credit Score & FICO',
    symbol: 'FICO',
    category: 'Banking & Credit',
    definition: 'A standardized 300–850 numerical score representing a borrower\'s creditworthiness based on payment history, debt utilization, and credit age.',
    analogy: 'A GPA for your financial promises—a higher score proves to lenders that you consistently turn in your loan payments on time.',
    example: 'Borrowers with a 760+ credit score qualify for the lowest benchmark interest rates on mortgages and auto loans.',
    unitId: 'amortization',
    unitName: 'Bonus Unit B: Auto Loans & TCO'
  },
  {
    id: 'dti',
    term: 'Debt-to-Income Ratio (DTI)',
    symbol: 'DTI',
    category: 'Loans & Real Estate',
    formula: 'DTI = \\frac{\\text{Total Monthly Debt Payments}}{\\text{Gross Monthly Income}} \\times 100\\%',
    definition: 'The percentage of a borrower\'s gross monthly income dedicated to paying recurring debt obligations (rent/mortgage, auto loan, credit cards, student loans).',
    analogy: 'How much of your monthly allowance is already promised to friends before you can buy lunch.',
    example: 'If monthly debt bills total $2,000 on a $5,000 gross monthly salary, the borrower\'s DTI ratio is 40%.',
    unitId: 'mortgage',
    unitName: 'Bonus Unit C: Mortgages & Equity'
  },
  {
    id: 'discount_rate',
    term: 'Discount Rate / Hurdle Rate',
    symbol: 'r',
    category: 'TVM & Rates',
    formula: 'r = r_{rf} + \\text{Risk Premium}',
    definition: 'The annual interest rate used to discount future cash flows, reflecting risk-free yields plus an equity risk premium.',
    analogy: 'The minimum test score a student demands before agreeing to study extra hours.',
    example: 'If Treasury bills pay 4% and stock risk adds 4.5%, your hurdle rate r is 8.5%.',
    unitId: 'rateSelection',
    unitName: 'Unit 2: Cost of Capital & Rates'
  },
  {
    id: 'ddm',
    term: 'Dividend Discount Model (DDM)',
    symbol: 'P_0',
    category: 'Equities',
    formula: 'P_0 = \\sum_{t=1}^\\infty \\frac{D_t}{(1+r)^t}',
    definition: 'A fundamental valuation model stating that a share of stock is worth the present value of all its future dividend payouts.',
    analogy: 'Valuing a fruit tree by adding up the discounted value of every apple it will produce over its lifetime.',
    example: 'Summing expected future dividends discounted at rate r yields the fair intrinsic stock price.',
    unitId: 'valuation',
    unitName: 'Unit 4: Gordon Growth Model'
  },
  {
    id: 'dividend_yield',
    term: 'Dividend Yield',
    symbol: 'Yield',
    category: 'Equities',
    formula: '\\text{Dividend Yield} = \\frac{\\text{Annual Dividend per Share } (D)}{\\text{Current Stock Price } (P_0)} \\times 100\\%',
    definition: 'The financial ratio measuring the annual dividend cash flow paid by a company relative to its current share price.',
    analogy: 'The cash cash-back interest percentage you earn on a rental property based on its market value.',
    example: 'A stock paying $3.00 in annual dividends trading at $60.00 per share offers a 5% dividend yield.',
    unitId: 'valuation',
    unitName: 'Unit 4: Gordon Growth Model'
  },
  {
    id: 'efficient_frontier',
    term: 'Efficient Frontier',
    symbol: 'E[R_p], \\sigma_p',
    category: 'Portfolios & Risk',
    formula: '\\max_{\\mathbf{w}} \\left( \\frac{E[R_p] - r_f}{\\sigma_p} \\right)',
    definition: 'The set of optimal portfolios that offer the highest expected return for a defined level of variance or risk.',
    analogy: 'Selecting a balanced diet menu that gives maximum energy with minimum sugar spikes.',
    example: 'Combining stocks and bonds in precise weights w to achieve maximum Sharpe ratio.',
    unitId: 'portfolio',
    unitName: 'Unit 7: Portfolio Theory'
  },
  {
    id: 'erp',
    term: 'Equity Risk Premium (ERP)',
    symbol: 'ERP',
    category: 'Equities',
    formula: 'ERP = r_{\\text{stock}} - r_{rf}',
    definition: 'The excess percentage return that investors demand for choosing risky stocks over safe government bonds.',
    analogy: 'Demanding extra dessert for agreeing to eat your vegetables.',
    example: 'If stocks return 9.5% and Treasury bonds yield 4.0%, the Equity Risk Premium is 5.5%.',
    unitId: 'stockBridge',
    unitName: 'Unit 3: Stock Ownership Bridge'
  },
  {
    id: 'escrow',
    term: 'Escrow Account',
    category: 'Loans & Real Estate',
    definition: 'A neutral holding account managed by a mortgage servicer to collect monthly installments for annual property taxes and homeowners insurance.',
    analogy: 'A trusted class treasurer holding everyone\'s field trip money so nobody forgets to pay when the admission deadline arrives.',
    example: 'Your monthly mortgage bill includes an escrow portion so your property taxes and insurance are paid automatically when due.',
    unitId: 'mortgage',
    unitName: 'Bonus Unit C: Mortgages & Equity'
  },
  {
    id: 'fed',
    term: 'Federal Reserve (The Fed)',
    symbol: 'Fed',
    category: 'Banking & Credit',
    definition: 'The central bank of the United States responsible for guiding monetary policy, controlling inflation, setting reserve requirements, and influencing benchmark interest rates.',
    analogy: 'The chief thermostat operator for the national economy, raising rates to cool down inflation or lowering rates to warm up job growth.',
    example: 'When the Fed hikes the federal funds rate, borrowing costs for credit cards, auto loans, and mortgages rise nationwide.',
    unitId: 'rateSelection',
    unitName: 'Unit 2: Cost of Capital & Rates'
  },
  {
    id: 'fv',
    term: 'Future Value (FV)',
    symbol: 'FV',
    category: 'TVM & Rates',
    formula: 'FV = PV \\times (1+r)^n',
    definition: 'The total accumulated dollar balance of an investment after compounding at interest rate r over n periods.',
    analogy: 'A snowball rolling down a snowy hill, getting exponentially larger with every turn.',
    example: '$10,000 invested at 7% per year grows to $76,123 after 30 years.',
    unitId: 'compounding',
    unitName: 'Unit 1: Compounding & NPV'
  },
  {
    id: 'gbm',
    term: 'Geometric Brownian Motion (GBM)',
    symbol: 'S_t, \\mu, \\sigma',
    category: 'Portfolios & Risk',
    formula: 'dS_t = \\mu S_t dt + \\sigma S_t dW_t',
    definition: 'The standard stochastic differential equation modeling asset prices with deterministic drift (\\mu) and random volatility diffusion (\\sigma).',
    analogy: 'A person walking an energetic dog on a leash uphill: the leash pulls steadily upward (drift), but the dog bounces unpredictably left and right (volatility).',
    example: 'Used by Wall Street quantitative models to simulate daily stock price paths.',
    unitId: 'stochastic',
    unitName: 'Unit 6: Stochastic Math'
  },
  {
    id: 'gordon_growth',
    term: 'Gordon Growth Model',
    symbol: 'P_0, g',
    category: 'Equities',
    formula: 'P_0 = \\frac{D_1}{r - g}',
    definition: 'The constant growth Dividend Discount formula for valuing equities with dividend payout growing perpetually at rate g (where r > g).',
    analogy: 'A snowball that compounds larger while sliding down an endless snowy slope.',
    example: 'With D_1 = $2.00, r = 8%, and g = 3%, stock price P_0 = $2.00 / (0.08 - 0.03) = $40.00.',
    unitId: 'valuation',
    unitName: 'Unit 4: Gordon Growth Model'
  },
  {
    id: 'hysa',
    term: 'High-Yield Savings Account (HYSA)',
    symbol: 'HYSA',
    category: 'Banking & Credit',
    definition: 'An FDIC-insured bank savings account paying an annual yield significantly higher than standard traditional checking or savings accounts.',
    analogy: 'A standard bank account is a stagnant puddle; an HYSA is a steady stream keeping your emergency funds growing above inflation.',
    example: 'Depositing $10,000 in a 4.5% HYSA generates $450/year in passive compound interest.',
    unitId: 'rateSelection',
    unitName: 'Unit 2: Cost of Capital & Rates'
  },
  {
    id: 'home_equity',
    term: 'Home Equity',
    symbol: 'Equity_t',
    category: 'Loans & Real Estate',
    formula: 'Equity_t = \\text{Market Value}_t - \\text{Remaining Loan Balance}_t',
    definition: 'The net dollar ownership share of real estate that you own free and clear of mortgage debt.',
    analogy: 'The portion of a shared prize boat that belongs purely to you after paying off your loan partner.',
    example: 'On a $450,000 home with $280,000 remaining loan balance, Home Equity is $170,000.',
    unitId: 'mortgage',
    unitName: 'Bonus Unit C: Mortgages & Equity'
  },
  {
    id: 'inflation_drag',
    term: 'Inflation Drag & Real Return',
    symbol: '\\pi, r_{real}',
    category: 'TVM & Rates',
    formula: 'r_{real} = r_{nominal} - \\pi',
    definition: 'The erosion of purchasing power caused by general price inflation, reducing nominal asset gains to real returns.',
    analogy: 'Running up an down-escalator: if you walk up at 5 mph while it moves down at 3 mph, your real speed is 2 mph.',
    example: 'A savings account paying 3% nominal interest in a 2.5% inflation environment yields a real return of 0.5%.',
    unitId: 'rateSelection',
    unitName: 'Unit 2: Cost of Capital & Rates'
  },
  {
    id: 'apr',
    term: 'Interest Rate & APR',
    symbol: 'r, APR',
    category: 'Banking & Credit',
    formula: '\\text{APR} = r_{\\text{period}} \\times n',
    definition: 'The annual percentage charged for borrowing money or earned on deposited funds, excluding compounding periods (unlike APY).',
    analogy: 'The rental fee for using someone else\'s lawnmower for a weekend.',
    example: 'A 6% nominal APR charged on a monthly auto loan equals 0.5% periodic interest per month.',
    unitId: 'compounding',
    unitName: 'Unit 1: Compounding & NPV'
  },
  {
    id: 'market_vs_limit',
    term: 'Limit Order vs. Market Order',
    category: 'Markets & Trading',
    definition: 'A Market Order executes instantly at the best current price, whereas a Limit Order sets a specific price threshold that must be reached before executing.',
    analogy: 'A market order is buying a concert ticket at the box office right now regardless of price; a limit order is saying "I will buy a ticket only if the price drops to $40."',
    example: 'Traders use limit orders to prevent unexpected price slippage during high-volatility news events.',
    unitId: 'newsBridge',
    unitName: 'Unit 5: News Shocks & Catalysts'
  },
  {
    id: 'ltv',
    term: 'Loan-to-Value Ratio (LTV)',
    symbol: 'LTV',
    category: 'Loans & Real Estate',
    formula: 'LTV = \\frac{\\text{Loan Principal (P)}}{\\text{Home Purchase Price}} \\times 100\\%',
    definition: 'The financial risk ratio expressing loan debt as a percentage of property purchase value.',
    analogy: 'How much of your lunch expense was borrowed from a friend versus paid from your own pocket.',
    example: 'Borrowing $320,000 to buy a $400,000 home gives LTV = 80% (20% down payment).',
    unitId: 'mortgage',
    unitName: 'Bonus Unit C: Mortgages & Equity'
  },
  {
    id: 'loss_aversion',
    term: 'Loss Aversion & Disposition Effect',
    symbol: 'U(x)',
    category: 'Derivatives & Behavior',
    formula: '|U(-x)| \\approx 2.25 \\times U(+x)',
    definition: 'The psychological tendency where the pain of losing $100 is felt twice as intensely as the joy of winning $100.',
    analogy: 'Fretting for days over a lost $20 bill while barely noticing a $20 bill found in your jacket pocket.',
    example: 'Investors holding onto losing stocks too long to avoid admitting a loss.',
    unitId: 'behavioral',
    unitName: 'Unit 8: Behavioral Math'
  },
  {
    id: 'market_cap',
    term: 'Market Capitalization',
    symbol: '\\text{MarketCap}',
    category: 'Equities',
    formula: '\\text{MarketCap} = P_0 \\times \\text{Total Shares Outstanding}',
    definition: 'The total market value of a publicly traded company\'s outstanding equity shares.',
    analogy: 'Multiplying the price of one brick by the total number of bricks in a stadium to find the stadium\'s worth.',
    example: 'A company with 10 million shares trading at $50 per share has a Market Cap of $500 million.',
    unitId: 'stockBridge',
    unitName: 'Unit 3: Stock Ownership Bridge'
  },
  {
    id: 'npv',
    term: 'Net Present Value (NPV)',
    symbol: 'NPV',
    category: 'TVM & Rates',
    formula: 'NPV = \\sum_{t=1}^n \\frac{CF_t}{(1+r)^t} - C_0',
    definition: 'The total present value of all projected cash inflows minus the initial upfront investment cost C_0.',
    analogy: 'Checking whether a lemonade stand\'s future profit stream is worth more than the $50 spent buying wood and lemons today.',
    example: 'An upfront investment of $1,000 generating $1,200 in PV yields an NPV of +$200.',
    unitId: 'compounding',
    unitName: 'Unit 1: Compounding & NPV'
  },
  {
    id: 'news_shocks',
    term: 'News Shocks & Price Discovery',
    symbol: '\\Delta r, \\Delta g',
    category: 'Equities',
    formula: '\\Delta P \\approx P_0 \\left( \\frac{\\Delta g - \\Delta r}{r - g} \\right)',
    definition: 'Immediate market price adjustments caused by unexpected updates to growth expectations (\\Delta g) or discount rates (\\Delta r).',
    analogy: 'A weather report instantly changing the price of umbrellas before the first raindrop falls.',
    example: 'An unexpected Fed interest rate hike (+\\Delta r) widens the valuation denominator, causing stock prices to drop.',
    unitId: 'newsBridge',
    unitName: 'Unit 5: News Shocks & Catalysts'
  },
  {
    id: 'opportunity_cost',
    term: 'Opportunity Cost',
    category: 'TVM & Rates',
    definition: 'The potential gain or return forgone from the best alternative choice when making a financial decision.',
    analogy: 'Spending Friday night at the movies means sacrificing the wages you could have earned working an evening job shift.',
    example: 'Keeping $10,000 in uninvested cash under a mattress costs you the 5% risk-free interest you could have earned in a High-Yield Savings Account.',
    unitId: 'rateSelection',
    unitName: 'Unit 2: Cost of Capital & Rates'
  },
  {
    id: 'greeks',
    term: 'Option Greeks (Delta, Gamma, Theta, Vega)',
    symbol: '\\Delta, \\Gamma, \\Theta, \\nu',
    category: 'Derivatives & Behavior',
    formula: '\\Delta = \\frac{\\partial C}{\\partial S}, \\quad \\Theta = \\frac{\\partial C}{\\partial T}',
    definition: 'Derivatives measuring option price sensitivity to stock price changes (\\Delta), volatility (Vega), and time decay (\\Theta).',
    analogy: 'Dashboard indicators showing car speed, acceleration, engine temperature, and remaining fuel.',
    example: '\\Delta = 0.60 means option price increases by $0.60 for every $1.00 rise in stock price.',
    unitId: 'options',
    unitName: 'Bonus Unit A: Options & Payoffs'
  },
  {
    id: 'piti',
    term: 'PITI Housing Cost Framework',
    symbol: 'PITI',
    category: 'Loans & Real Estate',
    formula: 'PITI = PMT + \\frac{\\text{Taxes}}{12} + \\frac{\\text{Insurance}}{12} + PMI + HOA',
    definition: 'The true total monthly housing expense combining Principal, Interest, Property Taxes, Insurance, PMI, and HOA fees.',
    analogy: 'The complete monthly bill for a smartphone plan including phone payment, data service, taxes, and protection plan.',
    example: 'A $2,000 loan payment + $400 taxes + $150 insurance + $100 HOA = $2,650 total monthly PITI cost.',
    unitId: 'mortgage',
    unitName: 'Bonus Unit C: Mortgages & Equity'
  },
  {
    id: 'pv',
    term: 'Present Value (PV)',
    symbol: 'PV',
    category: 'TVM & Rates',
    formula: 'PV = \\frac{CF_t}{(1+r)^t}',
    definition: 'The current dollar value of a future stream of cash flows discounted at the appropriate interest or hurdle rate.',
    analogy: 'Translating a future price tag back into today\'s actual purchasing power.',
    example: 'A $1,000 cash flow due in 5 years at 8% interest is worth $680.58 today.',
    unitId: 'compounding',
    unitName: 'Unit 1: Compounding & NPV'
  },
  {
    id: 'principal_vs_interest',
    term: 'Principal vs. Interest',
    symbol: 'P, Int',
    category: 'Loans & Real Estate',
    definition: 'Principal is the original borrowed sum of money that must be repaid, while Interest is the fee charged by the lender for granting access to that capital over time.',
    analogy: 'Principal is borrowing a friend\'s car; interest is buying them gas and a smoothie as a thank-you fee for letting you borrow it.',
    example: 'In month 1 of a 30-year mortgage, $1,500 of your payment pays interest fees, and only $300 reduces the principal debt.',
    unitId: 'amortization',
    unitName: 'Bonus Unit B: Auto Loans & TCO'
  },
  {
    id: 'pmi',
    term: 'Private Mortgage Insurance (PMI)',
    symbol: 'PMI',
    category: 'Loans & Real Estate',
    formula: 'PMI \\approx 0.5\\% - 1.5\\% \\times P \\quad (\\text{if } LTV > 80\\%)',
    definition: 'Mandatory lender insurance paid monthly by home buyers who put down less than 20% down payment (LTV > 80%).',
    analogy: 'Security deposit required when renting valuable equipment without a full down payment.',
    example: 'On a $360,000 loan with 10% down, PMI adds ~$180/month until loan balance drops to 80% LTV.',
    unitId: 'mortgage',
    unitName: 'Bonus Unit C: Mortgages & Equity'
  },
  {
    id: 'put_option',
    term: 'Put Option Contract',
    symbol: 'P, K',
    category: 'Derivatives & Behavior',
    formula: '\\text{Payoff} = \\max(K - S_T, 0)',
    definition: 'A financial contract giving the buyer the right (not obligation) to sell a stock at strike price K before expiration T.',
    analogy: 'Buying home fire insurance—if your house suffers damage (stock drops), the insurance policy pays out to make you whole.',
    example: 'A put option with strike K = $100 when stock falls to S_T = $75 yields a $25.00 payout.',
    unitId: 'options',
    unitName: 'Bonus Unit A: Options & Payoffs'
  },
  {
    id: 'herding',
    term: 'Rational Herding & Information Cascades',
    symbol: 'Cascade',
    category: 'Derivatives & Behavior',
    formula: 'P(\\text{Action} \\mid \\text{Crowd}) > P(\\text{Action} \\mid \\text{Signal})',
    definition: 'A behavioral market phenomenon where individuals follow crowd actions rather than their own private data, creating feedback bubbles.',
    analogy: 'Choosing a crowded restaurant over an empty one next door, assuming the crowd knows best.',
    example: 'Panic buying or selling during market hype spikes driven by social media trends.',
    unitId: 'behavioral',
    unitName: 'Unit 8: Behavioral Math'
  },
  {
    id: 'risk_free_rate',
    term: 'Risk-Free Rate',
    symbol: 'r_{rf}',
    category: 'TVM & Rates',
    formula: 'r_{rf} \\approx \\text{U.S. Treasury Yield}',
    definition: 'The baseline theoretical return on an investment with zero default risk, backed by sovereign government guarantees.',
    analogy: 'The baseline height requirement before anyone can enter an amusement park ride.',
    example: '10-Year U.S. Treasury bonds yielding 4.2% set the benchmark r_rf for all financial markets.',
    unitId: 'rateSelection',
    unitName: 'Unit 2: Cost of Capital & Rates'
  },
  {
    id: 'sharpe_ratio',
    term: 'Sharpe Ratio',
    symbol: 'Sharpe',
    category: 'Portfolios & Risk',
    formula: '\\text{Sharpe} = \\frac{E[R_p] - r_f}{\\sigma_p}',
    definition: 'The metric evaluating an investment\'s excess return above the risk-free rate per unit of portfolio volatility.',
    analogy: 'Miles per gallon rating for a sports car: measuring how much speed you get for every gallon of fuel burned.',
    example: 'A portfolio with 10% return, 4% risk-free rate, and 8% volatility has a Sharpe ratio of (10-4)/8 = 0.75.',
    unitId: 'portfolio',
    unitName: 'Unit 7: Portfolio Theory'
  },
  {
    id: 'short_squeeze',
    term: 'Short Squeeze',
    category: 'Markets & Trading',
    definition: 'A sudden market phenomenon where rising stock prices force short-sellers (who borrowed shares expecting a price drop) to rapidly buy back shares to cover losses, driving prices higher.',
    analogy: 'A crowded theater where everyone tries to rush out through a single exit door at the exact same second.',
    example: 'Retail buying surges in meme stocks forced short-selling funds to buy millions of shares at sky-high prices.',
    unitId: 'behavioral',
    unitName: 'Unit 8: Behavioral Math'
  },
  {
    id: 'tvm',
    term: 'Time Value of Money (TVM)',
    symbol: 'PV, FV',
    category: 'TVM & Rates',
    formula: 'PV = \\frac{FV}{(1+r)^n}',
    definition: 'The foundational principle that a dollar received today is worth more than a dollar received in the future due to its earning capacity and opportunity cost.',
    analogy: 'Having $100 today lets you buy seeds to grow apples this season; waiting a year means missing a full apple harvest.',
    example: 'Receiving $100 in 1 year discounted at r = 5% has a Present Value of $95.24 today.',
    unitId: 'compounding',
    unitName: 'Unit 1: Compounding & NPV'
  },
  {
    id: 'tco',
    term: 'Total Cost of Ownership (TCO)',
    symbol: 'TCO',
    category: 'Loans & Real Estate',
    formula: '\\text{TCO} = P_{\\text{purchase}} + \\sum (\\text{Fuel/Power} + \\text{Insurance} + \\text{Maintenance}) - \\text{Resale Value}',
    definition: 'The comprehensive financial assessment incorporating purchase price, operating costs, fuel/energy, maintenance, insurance, and depreciation over an asset\'s full lifetime.',
    analogy: 'Counting not just the cost of adopting a puppy, but adding up dog food, vet visits, toys, and grooming for 10 years.',
    example: 'Comparing an ICE gas vehicle vs. EV over 5 years reveals how lower EV maintenance offsets a higher sticker price.',
    unitId: 'amortization',
    unitName: 'Bonus Unit B: Auto Loans & TCO'
  },
  {
    id: 'volatility',
    term: 'Volatility (\\sigma)',
    symbol: '\\sigma',
    category: 'Portfolios & Risk',
    formula: '\\sigma = \\sqrt{\\frac{1}{N} \\sum_{i=1}^N (R_i - \\bar{R})^2}',
    definition: 'The statistical dispersion of returns for a given security or market index, measured by standard deviation \\sigma.',
    analogy: 'How high and low a roller coaster dips and climbs compared to a flat train ride.',
    example: 'An asset with 25% annual volatility experiences far wider price swings than one with 8% volatility.',
    unitId: 'stochastic',
    unitName: 'Unit 6: Stochastic Math'
  },
  {
    id: 'wiener',
    term: 'Wiener Process / Brownian Motion',
    symbol: 'dW_t',
    category: 'Portfolios & Risk',
    formula: 'dW_t \\sim \\mathcal{N}(0, dt)',
    definition: 'A continuous-time stochastic process with independent, normally distributed random increments with mean 0 and variance dt.',
    analogy: 'The microscopic random jiggling of pollen grains suspended in a glass of water.',
    example: 'Provides the mathematical engine for daily random market shocks in asset modeling.',
    unitId: 'stochastic',
    unitName: 'Unit 6: Stochastic Math'
  },
  {
    id: 'yield_curve',
    term: 'Yield Curve',
    symbol: 'YTM_t',
    category: 'Banking & Credit',
    definition: 'A line graph plotting interest rates of government bonds having equal credit quality but differing maturity dates (e.g., 3-month to 30-year Treasuries).',
    analogy: 'A height growth chart showing how tall kids grow as they get older.',
    example: 'A normal upward-sloping yield curve pays higher yields for longer term commitments; an inverted curve warns of economic recession.',
    unitId: 'rateSelection',
    unitName: 'Unit 2: Cost of Capital & Rates'
  },
  {
    id: 'zero_coupon',
    term: 'Zero-Coupon Bond',
    symbol: 'P_0',
    category: 'TVM & Rates',
    formula: 'P_0 = \\frac{F}{(1+r)^n}',
    definition: 'A debt security that pays no periodic coupon interest, traded at a deep discount to face value F and paying full face value at maturity.',
    analogy: 'Buying a $100 gift certificate for $70 today, knowing it unlocks $100 in purchasing power when you graduate next year.',
    example: 'A 10-year zero-coupon bond with $1,000 face value discounted at 5% trades for $613.91 today.',
    unitId: 'compounding',
    unitName: 'Unit 1: Compounding & NPV'
  }
];

const CATEGORIES = [
  'All Terms',
  'Banking & Credit',
  'Markets & Trading',
  'TVM & Rates',
  'Equities',
  'Portfolios & Risk',
  'Loans & Real Estate',
  'Derivatives & Behavior'
] as const;

interface GlossaryLabProps {
  onNavigateToUnit?: (unitId: string) => void;
}

export const GlossaryLab: React.FC<GlossaryLabProps> = ({ onNavigateToUnit }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Terms');
  const [selectedSymbolFilter, setSelectedSymbolFilter] = useState<string | null>(null);
  const [expandedTermId, setExpandedTermId] = useState<string | null>('gordon_growth');
  const [starredTermIds, setStarredTermIds] = useState<Set<string>>(new Set(['gordon_growth', 'compounding', 'npv']));
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // View modes: 'alpha' (A-Z Dictionary), 'category' (Domain directory), 'matrix' (Formula Cheat-Sheet), 'starred' (Bookmarks)
  const [viewMode, setViewMode] = useState<'alpha' | 'category' | 'matrix' | 'starred'>('alpha');

  const toggleStar = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setStarredTermIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const copyToClipboard = (e: React.MouseEvent, id: string, text: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Ensure terms are strictly sorted alphabetically A-Z by term name
  const sortedMasterTerms = useMemo(() => {
    return [...GLOSSARY_TERMS].sort((a, b) => a.term.localeCompare(b.term));
  }, []);

  const filteredTerms = useMemo(() => {
    return sortedMasterTerms.filter(term => {
      // View Mode Starred Filter
      if (viewMode === 'starred' && !starredTermIds.has(term.id)) {
        return false;
      }
      // Category filter
      if (selectedCategory !== 'All Terms' && term.category !== selectedCategory) {
        return false;
      }
      // Symbol tag filter
      if (selectedSymbolFilter && !term.symbol?.toLowerCase().includes(selectedSymbolFilter.toLowerCase())) {
        return false;
      }
      // Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const matchesTerm = term.term.toLowerCase().includes(q);
        const matchesSymbol = term.symbol?.toLowerCase().includes(q);
        const matchesDef = term.definition.toLowerCase().includes(q);
        const matchesAnalogy = term.analogy.toLowerCase().includes(q);
        const matchesUnit = term.unitName.toLowerCase().includes(q);
        return matchesTerm || matchesSymbol || matchesDef || matchesAnalogy || matchesUnit;
      }
      return true;
    });
  }, [sortedMasterTerms, viewMode, starredTermIds, selectedCategory, selectedSymbolFilter, searchQuery]);

  // Alphabetical Grouping for A-Z Index View
  const alphaGroupedTerms = useMemo(() => {
    const groups: { [letter: string]: GlossaryTerm[] } = {};
    filteredTerms.forEach(term => {
      const firstLetter = term.term.charAt(0).toUpperCase();
      const key = /[A-Z]/.test(firstLetter) ? firstLetter : '#';
      if (!groups[key]) groups[key] = [];
      groups[key].push(term);
    });
    return Object.keys(groups).sort().map(letter => ({
      letter,
      terms: groups[letter]
    }));
  }, [filteredTerms]);

  // All available initial letters for the A-Z Jump Bar
  const availableLetters = useMemo(() => {
    const letters = new Set<string>();
    sortedMasterTerms.forEach(t => {
      const l = t.term.charAt(0).toUpperCase();
      if (/[A-Z]/.test(l)) letters.add(l);
    });
    return Array.from(letters).sort();
  }, [sortedMasterTerms]);

  const scrollToLetter = (letter: string) => {
    setViewMode('alpha');
    const elem = document.getElementById(`letter-section-${letter}`);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="space-y-8 font-sans pb-12">
      {/* Top Banner & Hero Dictionary Header */}
      <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden border border-indigo-800/80">
        <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
          <BookMarked className="w-72 h-72 text-white" />
        </div>

        <div className="relative z-10 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 text-xs font-mono font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-300" />
              Financial Math & Market Vocabulary Dictionary
            </span>

            {/* Quick Stats Summary Badges */}
            <div className="flex flex-wrap gap-2 text-xs font-mono font-semibold">
              <span className="bg-white/10 text-indigo-100 border border-white/15 px-3 py-1 rounded-xl flex items-center gap-1.5">
                <BookMarked className="w-3.5 h-3.5 text-indigo-300" />
                {GLOSSARY_TERMS.length} Terms A–Z
              </span>
              <span className="bg-white/10 text-indigo-100 border border-white/15 px-3 py-1 rounded-xl flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-indigo-300" />
                {CATEGORIES.length - 1} Domains
              </span>
              <button 
                onClick={() => setViewMode('starred')}
                className={`px-3 py-1 rounded-xl border flex items-center gap-1.5 transition-all cursor-pointer ${
                  viewMode === 'starred' ? 'bg-amber-400 text-slate-950 font-bold border-amber-300' : 'bg-white/10 text-amber-200 border-white/15 hover:bg-white/20'
                }`}
              >
                <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
                {starredTermIds.size} Starred
              </button>
            </div>
          </div>

          <div className="max-w-3xl space-y-2">
            <h2 className="font-serif font-black text-2xl sm:text-4xl tracking-tight text-white">
              Financial Dictionary & Formula Reference
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Explore key terms, mathematical formulas, real-world analogies, and interactive equations arranged A-Z across banking, investments, loan algebra, and market dynamics.
            </p>
          </div>

          {/* Search Input Bar */}
          <div className="pt-2 max-w-2xl">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text"
                placeholder="Search A–Z terms, symbols (P₀, LTV, PMT, Sharpe), or definitions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-10 py-3.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:bg-white/20 transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-white text-xs bg-white/10 rounded-full px-2 py-0.5 cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Standalone A-Z Jump Bar & View Mode Control Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 space-y-4 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          {/* View Mode Tabs */}
          <div className="flex flex-wrap gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setViewMode('alpha')}
              className={`text-xs font-bold px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'alpha' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              Alphabetical A–Z Index
            </button>
            <button
              onClick={() => setViewMode('category')}
              className={`text-xs font-bold px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'category' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              Domain Directory
            </button>
            <button
              onClick={() => setViewMode('matrix')}
              className={`text-xs font-bold px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'matrix' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              Formula Cheat-Sheet Matrix
            </button>
            <button
              onClick={() => setViewMode('starred')}
              className={`text-xs font-bold px-3 py-2 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'starred' ? 'bg-amber-500 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookmarkCheck className="w-3.5 h-3.5" />
              Bookmarks ({starredTermIds.size})
            </button>
          </div>
        </div>

        {/* A-Z Alphabetical Quick Jump Rail */}
        <div className="space-y-2">
          <span className="text-[11px] font-mono font-bold uppercase text-slate-400 flex items-center gap-1.5">
            <Tag className="w-3 h-3 text-indigo-600" />
            Quick Jump to Letter:
          </span>
          <div className="flex flex-wrap gap-1 sm:gap-1.5">
            {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'].map(letter => {
              const hasTerms = availableLetters.includes(letter);
              return (
                <button
                  key={letter}
                  disabled={!hasTerms}
                  onClick={() => scrollToLetter(letter)}
                  className={`w-7 h-7 text-xs font-mono font-black rounded-lg transition-all flex items-center justify-center cursor-pointer ${
                    hasTerms
                      ? 'bg-slate-100 text-slate-800 border border-slate-200 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 shadow-2xs'
                      : 'bg-slate-50 text-slate-300 border border-slate-100 opacity-40 cursor-not-allowed'
                  }`}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        </div>

        {/* Variable Symbol Filter Tags */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-1.5 text-xs">
          <span className="font-mono text-[11px] text-slate-500 font-bold uppercase mr-1">Variable Symbols:</span>
          {['PV', 'FV', 'r', 'g', 'P_0', 'PMT', 'LTV', 'PMI', 'PITI', 'mu', 'sigma', 'beta', 'Sharpe', 'Delta'].map((sym) => {
            const isSelected = selectedSymbolFilter === sym;
            return (
              <button
                key={sym}
                onClick={() => setSelectedSymbolFilter(isSelected ? null : sym)}
                className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-md transition-all cursor-pointer border ${
                  isSelected 
                    ? 'bg-indigo-600 text-white border-indigo-600' 
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                ${sym}$
              </button>
            );
          })}
          {selectedSymbolFilter && (
            <button
              onClick={() => setSelectedSymbolFilter(null)}
              className="text-[11px] text-indigo-600 font-bold underline ml-2 cursor-pointer"
            >
              Reset Symbol
            </button>
          )}
        </div>
      </div>

      {/* Domain Category Filter Tabs (when in category or alpha mode) */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs font-bold px-3.5 py-2 rounded-xl transition-all cursor-pointer ${
                isActive 
                  ? 'bg-slate-900 text-white shadow-2xs' 
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* MAIN VIEW CONTENT RENDERING */}
      {filteredTerms.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-3">
          <HelpCircle className="w-10 h-10 text-slate-300 mx-auto" />
          <h4 className="font-serif font-bold text-slate-700 text-lg">No matching financial terms found</h4>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Try clearing your search term, adjusting category tags, or switching back to "All Terms".
          </p>
          <button 
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All Terms');
              setSelectedSymbolFilter(null);
              setViewMode('alpha');
            }}
            className="text-xs font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 border border-indigo-200 px-4 py-2 rounded-xl cursor-pointer"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <>
          {/* VIEW MODE 1: ALPHABETICAL A-Z DICTIONARY INDEX */}
          {viewMode === 'alpha' && (
            <div className="space-y-10">
              {alphaGroupedTerms.map(group => (
                <div key={group.letter} id={`letter-section-${group.letter}`} className="space-y-4 scroll-mt-6">
                  {/* Letter Header Anchor */}
                  <div className="flex items-baseline space-x-3 border-b-2 border-slate-200 pb-2">
                    <span className="font-serif font-black text-3xl sm:text-4xl text-indigo-600">
                      {group.letter}
                    </span>
                    <span className="font-mono text-xs font-bold text-slate-400">
                      ({group.terms.length} {group.terms.length === 1 ? 'term' : 'terms'})
                    </span>
                  </div>

                  {/* Letter Terms Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {group.terms.map(t => {
                      const isExpanded = expandedTermId === t.id;
                      const isStarred = starredTermIds.has(t.id);
                      return (
                        <div
                          key={t.id}
                          onClick={() => setExpandedTermId(isExpanded ? null : t.id)}
                          className={`bg-white border rounded-2xl p-5 transition-all cursor-pointer space-y-3.5 flex flex-col justify-between ${
                            isExpanded 
                              ? 'border-indigo-500 ring-2 ring-indigo-500/10 shadow-md md:col-span-2' 
                              : 'border-slate-200 hover:border-indigo-300 hover:shadow-2xs'
                          }`}
                        >
                          <div className="space-y-3">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-mono font-black text-sm flex-shrink-0">
                                  {t.symbol ? <MathSpan tex={t.symbol} /> : t.term.charAt(0)}
                                </div>
                                <div>
                                  <h4 className="font-serif font-black text-slate-900 text-base sm:text-lg tracking-tight">
                                    {t.term}
                                  </h4>
                                  <span className="text-[11px] font-mono font-semibold text-indigo-600">
                                    {t.category}
                                  </span>
                                </div>
                              </div>

                              <button
                                onClick={(e) => toggleStar(e, t.id)}
                                title={isStarred ? 'Unstar term' : 'Star term'}
                                className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                                  isStarred 
                                    ? 'bg-amber-50 border-amber-200 text-amber-500' 
                                    : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-amber-500'
                                }`}
                              >
                                <Star className={`w-4 h-4 ${isStarred ? 'fill-amber-400' : ''}`} />
                              </button>
                            </div>

                            {/* Formula Callout if available */}
                            {t.formula && (
                              <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 flex items-center justify-between">
                                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">Formula:</span>
                                <div className="overflow-x-auto text-xs font-mono">
                                  <MathSpan tex={t.formula} block className="my-0" />
                                </div>
                              </div>
                            )}

                            {/* Definition text */}
                            <p className="text-slate-600 text-sm leading-relaxed font-serif">
                              {t.definition}
                            </p>
                          </div>

                          {/* Expanded Analogy & Example */}
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="pt-3 border-t border-slate-100 space-y-3 text-xs text-slate-700"
                              >
                                <div className="bg-amber-50/70 border border-amber-200/60 rounded-xl p-3.5 space-y-1">
                                  <span className="font-sans font-bold text-amber-900 flex items-center gap-1.5 text-xs">
                                    <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                                    Real-World Intuition:
                                  </span>
                                  <p className="font-serif italic text-amber-950 text-xs sm:text-sm">
                                    "{t.analogy}"
                                  </p>
                                </div>

                                <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-3.5 space-y-1">
                                  <span className="font-sans font-bold text-indigo-950 flex items-center gap-1.5 text-xs">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                                    Mathematical Example:
                                  </span>
                                  <p className="font-sans text-indigo-900 text-xs sm:text-sm">
                                    {t.example}
                                  </p>
                                </div>

                                <div className="pt-1 flex items-center justify-between">
                                  <button
                                    onClick={(e) => copyToClipboard(e, t.id, `${t.term}: ${t.definition} ${t.formula ? `Formula: ${t.formula}` : ''}`)}
                                    className="text-[11px] font-mono text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
                                  >
                                    {copiedId === t.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                                    <span>{copiedId === t.id ? 'Copied!' : 'Copy Definition'}</span>
                                  </button>

                                  {onNavigateToUnit && (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        onNavigateToUnit(t.unitId);
                                      }}
                                      className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5 bg-indigo-50 border border-indigo-200 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors cursor-pointer"
                                    >
                                      <span>Open {t.unitName}</span>
                                      <ArrowRight className="w-3.5 h-3.5" />
                                    </button>
                                  )}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* VIEW MODE 2 & 4: CATEGORY / STARRED CARDS LIST */}
          {(viewMode === 'category' || viewMode === 'starred') && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTerms.map(t => {
                const isExpanded = expandedTermId === t.id;
                const isStarred = starredTermIds.has(t.id);
                return (
                  <div
                    key={t.id}
                    onClick={() => setExpandedTermId(isExpanded ? null : t.id)}
                    className={`bg-white border rounded-2xl p-5 transition-all cursor-pointer space-y-3 flex flex-col justify-between ${
                      isExpanded 
                        ? 'border-indigo-500 ring-2 ring-indigo-500/10 shadow-md md:col-span-2' 
                        : 'border-slate-200 hover:border-indigo-300 hover:shadow-2xs'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 font-mono font-black text-sm flex-shrink-0">
                            {t.symbol ? <MathSpan tex={t.symbol} /> : t.term.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-serif font-black text-slate-900 text-base sm:text-lg">
                              {t.term}
                            </h4>
                            <span className="text-[11px] font-mono font-semibold text-slate-400">
                              {t.category}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={(e) => toggleStar(e, t.id)}
                          className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                            isStarred ? 'bg-amber-50 border-amber-200 text-amber-500' : 'bg-slate-50 border-slate-200 text-slate-400'
                          }`}
                        >
                          <Star className={`w-4 h-4 ${isStarred ? 'fill-amber-400' : ''}`} />
                        </button>
                      </div>

                      {t.formula && (
                        <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3 flex items-center justify-between">
                          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">Formula:</span>
                          <div className="overflow-x-auto text-xs font-mono">
                            <MathSpan tex={t.formula} block className="my-0" />
                          </div>
                        </div>
                      )}

                      <p className="text-slate-600 text-sm leading-relaxed font-serif">
                        {t.definition}
                      </p>
                    </div>

                    {isExpanded && (
                      <div className="pt-3 border-t border-slate-100 space-y-3 text-xs text-slate-700">
                        <div className="bg-amber-50/70 border border-amber-200/60 rounded-xl p-3.5 space-y-1">
                          <span className="font-sans font-bold text-amber-900 flex items-center gap-1.5 text-xs">
                            <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                            Real-World Analogy:
                          </span>
                          <p className="font-serif italic text-amber-950 text-xs sm:text-sm">
                            "{t.analogy}"
                          </p>
                        </div>

                        <div className="bg-indigo-50/50 border border-indigo-100 rounded-xl p-3.5 space-y-1">
                          <span className="font-sans font-bold text-indigo-950 flex items-center gap-1.5 text-xs">
                            <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                            Numerical Context:
                          </span>
                          <p className="font-sans text-indigo-900 text-xs sm:text-sm">
                            {t.example}
                          </p>
                        </div>

                        {onNavigateToUnit && (
                          <div className="pt-1 flex justify-end">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onNavigateToUnit(t.unitId);
                              }}
                              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1.5 bg-indigo-50 border border-indigo-200 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors cursor-pointer"
                            >
                              <span>Open {t.unitName}</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* VIEW MODE 3: FORMULA CHEAT-SHEET MATRIX TABLE */}
          {viewMode === 'matrix' && (
            <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-900 text-white font-mono text-xs uppercase tracking-wider">
                      <th className="p-4 font-bold">Financial Term</th>
                      <th className="p-4 font-bold">Symbol</th>
                      <th className="p-4 font-bold">Category</th>
                      <th className="p-4 font-bold">Key Formula Equation</th>
                      <th className="p-4 font-bold text-right">Interactive Unit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-xs font-sans">
                    {filteredTerms.map((t, idx) => (
                      <tr 
                        key={t.id} 
                        className={`hover:bg-indigo-50/40 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}
                      >
                        <td className="p-4 font-serif font-bold text-slate-900 text-sm">
                          {t.term}
                        </td>
                        <td className="p-4 font-mono font-bold text-indigo-600">
                          {t.symbol ? <MathSpan tex={t.symbol} /> : '—'}
                        </td>
                        <td className="p-4 text-slate-500 font-mono">
                          {t.category}
                        </td>
                        <td className="p-4 font-mono">
                          {t.formula ? (
                            <MathSpan tex={t.formula} />
                          ) : (
                            <span className="text-slate-400 italic">Conceptual (Non-equation)</span>
                          )}
                        </td>
                        <td className="p-4 text-right">
                          {onNavigateToUnit && (
                            <button
                              onClick={() => onNavigateToUnit(t.unitId)}
                              className="text-[11px] font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50 border border-indigo-200 px-2.5 py-1 rounded-lg hover:bg-indigo-100 transition-colors inline-flex items-center gap-1 cursor-pointer"
                            >
                              <span>{t.unitName}</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default GlossaryLab;
