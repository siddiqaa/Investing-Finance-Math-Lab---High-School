import { LessonContent } from '../../types';

export const mortgage: LessonContent = {
  id: 'mortgage',
  title: 'Mortgages & Total Cost of Homeownership',
  subtitle: 'Mortgage loan algebra, LTV ratios, PMI, equity accumulation, and total PITI monthly housing expenses',
  mathTopic: 'Mortgage Amortization, LTV & PMI Math, Home Equity & PITI Cost Functions',
  equations: [
    'PMT = P \\times \\frac{r(1+r)^n}{(1+r)^n - 1}',
    'LTV = \\frac{\\text{Loan Principal (P)}}{\\text{Home Purchase Price}} \\times 100\\%',
    'Equity_t = \\text{Home Value}_t - \\text{Remaining Principal Balance}_t',
    'PITI = PMT + \\frac{\\text{Annual Taxes}}{12} + \\frac{\\text{Annual Insurance}}{12} + PMI + HOA'
  ],
  description: 'Master the financial math behind home mortgages. Calculate 15-year and 30-year amortization schedules, Loan-to-Value (LTV) ratios, Private Mortgage Insurance (PMI), home equity growth, and total PITI monthly housing expenses.',
  introduction: `For most individuals and families, purchasing a home is the single largest financial investment and debt commitment of their lifetime. Unlike an auto loan, which typically spans 4 to 6 years, a home mortgage spans 15 to 30 years (180 to 360 monthly payments).

Because of the vast time horizon, exponential compounding plays a dramatic role. Over a 30-year mortgage, total interest paid can easily match or even exceed the original purchase price of the home! Furthermore, homeownership involves critical concepts unique to real estate: Loan-to-Value (LTV) ratios, equity building, Private Mortgage Insurance (PMI), property taxes, and homeowners insurance.

In this lesson, we will apply amortization algebra to real estate. You will learn how monthly payments ($PMT$) are structured, how your ownership share (Equity) grows month by month, and how to calculate the true total monthly housing budget using the PITI framework (Principal, Interest, Taxes, and Insurance).`,
  fullText: [
    '<span className="text-indigo-600 font-bold">The Hook: The $400,000 House that Costs $863,000</span>\nSuppose a family buys a home for \\$400,000 with a 10% down payment (\\$40,000) and finances the remaining \\$360,000 with a 30-year fixed mortgage at 6.5% interest. Their base monthly loan payment comes out to \\$2,275.44. However, because their down payment was under 20%, they must pay \\$180/month in Private Mortgage Insurance (PMI). Adding \\$450/month for property taxes and \\$150/month for homeowners insurance brings their actual monthly payment to <span className="font-bold text-slate-800">\\$3,055.44 per month</span> (PITI). Over 30 years, they will pay over <span className="font-bold text-slate-800">\\$819,000 in total loan payments</span> plus over \\$216,000 in taxes and insurance! Understanding mortgage algebra is essential to home financial planning.',
    
    '1. <span className="text-indigo-600 font-bold">Loan-to-Value (LTV) Ratio & Private Mortgage Insurance (PMI)</span>\nBefore approving a mortgage, banks evaluate risk using the Loan-to-Value (LTV) Ratio:\n$LTV = \\frac{\\text{Loan Principal } (P)}{\\text{Home Purchase Price}} \\times 100\\%$',

    '• <span className="font-bold text-slate-800">20% Down Payment Benchmark ($LTV \\le 80\\%$):</span> If a home buyer puts down 20% or more of the purchase price, $LTV \\le 80\\%$. The bank considers the loan low-risk.\n• <span className="font-bold text-slate-800">PMI Trigger ($LTV > 80\\%$):</span> If the down payment is less than 20%, $LTV > 80\\%$. Banks require the buyer to purchase Private Mortgage Insurance (PMI) to protect the lender against default. PMI typically costs 0.5% to 1.5% of the loan amount annually until the remaining loan principal drops to 80% of the home\'s value.',

    '2. <span className="text-indigo-600 font-bold">Mortgage Amortization Algebra ($PMT$)</span>\nLike auto loans, home mortgages follow the fixed amortization equation for $n$ monthly periods at monthly interest rate $r = \\frac{APR}{12}$:\n$PMT = P \\times \\frac{r(1 + r)^n}{(1 + r)^n - 1}$',

    'For a 30-year fixed loan, $n = 30 \\times 12 = 360$ months. For a 15-year fixed loan, $n = 15 \\times 12 = 180$ months.',

    '<span className="font-bold text-slate-800">Worked Example — 15-Year vs. 30-Year Mortgage Comparison:</span>\nSuppose you borrow $P = \\$300{,}000$ at an annual interest rate of $6\\%$ ($r = \\frac{0.06}{12} = 0.005$).\n• <span className="font-bold text-slate-800">30-Year Loan ($n = 360$):</span>\n  $PMT_{30} = 300{,}000 \\times \\frac{0.005(1.005)^{360}}{(1.005)^{360} - 1} = \\mathbf{\\$1{,}798.65/month}$\n  Total Paid = $\\$1{,}798.65 \\times 360 = \\$647{,}514$.\n  Total Interest Paid = $\\$647{,}514 - \\$300{,}000 = \\mathbf{\\$347{,}514}$ (more than the original loan principal!).\n• <span className="font-bold text-slate-800">15-Year Loan ($n = 180$):</span>\n  $PMT_{15} = 300{,}000 \\times \\frac{0.005(1.005)^{180}}{(1.005)^{180} - 1} = \\mathbf{\\$2{,}531.57/month}$\n  Total Paid = $\\$2{,}531.57 \\times 180 = \\$455{,}683$.\n  Total Interest Paid = $\\$455{,}683 - \\$300{,}000 = \\mathbf{\\$155{,}683}$.',

    '<span className="font-bold text-indigo-600">Key Takeaway:</span> Switching from a 30-year to a 15-year loan increases the monthly payment by \\$732.92/month (+40%), but saves <span className="font-bold text-indigo-600">\\$191,831 in interest</span> and builds 100% equity in half the time!',

    '3. <span className="text-indigo-600 font-bold">Home Equity & Wealth Accumulation</span>\nHome Equity represents the net dollar value of the home that you truly own free and clear of debt:\n$Equity_t = \\text{Current Market Value}_t - \\text{Remaining Mortgage Principal Balance}_t$',

    'Unlike a car, which depreciates over time, real estate historically appreciates or holds value. As you make monthly payments, two forces build your wealth simultaneously:\n1. <span className="font-bold text-slate-800">Principal Amortization Paydown:</span> Each month, a portion of $PMT$ reduces the loan balance $P$.\n2. <span className="font-bold text-slate-800">Property Appreciation:</span> If home value increases at rate $g_{\\text{home}}$, Market Value grows to $V_0(1 + g_{\\text{home}})^t$.',

    '4. <span className="text-indigo-600 font-bold">Total Monthly Housing Cost: The PITI Formula</span>\nIn real estate, your base loan payment $PMT$ is only part of the story. Financial planners evaluate total housing affordability using the PITI framework:\n$PITI = \\underbrace{PMT}_{P + I} + \\underbrace{\\frac{\\text{Annual Property Taxes}}{12}}_{T} + \\underbrace{\\frac{\\text{Annual Insurance}}{12}}_{I} + PMI + HOA$',

    '• <span className="font-bold text-slate-800">Property Taxes ($T$):</span> Local municipal taxes based on assessed property value (typically 1.0% to 2.5% per year).\n• <span className="font-bold text-slate-800">Homeowners Insurance ($I$):</span> Hazard and liability protection for the property structure.\n• <span className="font-bold text-slate-800">HOA Fees:</span> Homeowners Association fees for common area maintenance in condos or planned communities.'
  ],
  quizzes: [
    {
      id: 'mortgage_q1',
      question: 'A buyer purchases a home for $350,000 and makes a down payment of $35,000. What is their Loan-to-Value (LTV) ratio, and will they be required to pay Private Mortgage Insurance (PMI)?',
      options: [
        'LTV = 90%; Yes, PMI is required because LTV > 80%.',
        'LTV = 10%; No, PMI is not required because down payment is low.',
        'LTV = 80%; No, PMI is not required because LTV <= 80%.',
        'LTV = 100%; Yes, PMI is required on all home loans.'
      ],
      correctIndex: 0,
      explanation: 'Loan Amount P = $350,000 - $35,000 = $315,000. LTV = ($315,000 / $350,000) x 100% = 90%. Because LTV > 80% (down payment < 20%), banks require PMI.',
      hint: 'Calculate Loan Amount = Purchase Price - Down Payment, then divide by Purchase Price.'
    },
    {
      id: 'mortgage_q2',
      question: 'In the PITI housing expense model, what do the letters P, I, T, and I represent?',
      options: [
        'Principal, Interest, Taxes, and Insurance',
        'Payment, Interest, Term, and Income',
        'Principal, Inflation, Taxes, and Investment',
        'Price, Interest, Total, and Insurance'
      ],
      correctIndex: 0,
      explanation: 'PITI stands for Principal, Interest, Taxes (property taxes), and Insurance (homeowners insurance + PMI if applicable).',
      hint: 'Think of the four components of a complete monthly housing bill.'
    },
    {
      id: 'mortgage_q3',
      question: 'A homeowner has a remaining mortgage balance of $240,000 on a house currently appraised at $400,000. What is the homeowner\'s current Home Equity?',
      options: [
        '$160,000',
        '$240,000',
        '$400,000',
        '$640,000'
      ],
      correctIndex: 0,
      explanation: 'Home Equity = Current Market Value - Remaining Loan Balance = $400,000 - $240,000 = $160,000.',
      hint: 'Equity is the market value of the property minus what you still owe the bank.'
    },
    {
      id: 'mortgage_q4',
      question: 'Comparing a 30-year fixed mortgage to a 15-year fixed mortgage of the same loan amount and interest rate, which statement is mathematically correct?',
      options: [
        'The 15-year mortgage has a higher monthly payment, but results in dramatically lower total interest paid over the life of the loan.',
        'The 30-year mortgage has a higher monthly payment and higher total interest paid.',
        'Both loans result in the exact same total interest paid.',
        'The 15-year mortgage has a lower monthly payment because the principal is paid off twice as fast.'
      ],
      correctIndex: 0,
      explanation: 'A 15-year loan requires paying down principal in half the time, so monthly payments are higher ($PMT_{15} > PMT_{30}$). However, because interest compounds over fewer years, total interest paid is drastically lower.',
      hint: 'Consider how loan duration n affects monthly payment size vs. accumulated interest.'
    }
  ]
};
