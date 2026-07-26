import { LessonContent } from '../../types';

export const amortization: LessonContent = {
  id: 'amortization',
  title: 'Auto Loans & Total Cost of Ownership',
  subtitle: 'Amortization algebra, monthly payment schedules, and ICE vs. EV total operational expenses',
  mathTopic: 'Amortization Math, Multi-Variable Cost Functions, Total Cost of Ownership (TCO)',
  equations: [
    'PMT = P \\times \\frac{r(1+r)^n}{(1+r)^n - 1}',
    'I_{\\text{total}} = (PMT \\times n) - P',
    'TCO = \\text{Loan Payments} + \\text{Insurance} + \\text{Fuel/Electricity} + \\text{Maintenance}',
    'Cost_{\\text{fuel}} = \\frac{\\text{Miles}}{MPG} \\times \\text{Price/gal}'
  ],
  description: 'Master the algebra behind car loans and discover why the sticker price is only half the story. Calculate monthly amortization payments, compare principal vs. interest, and build a complete Total Cost of Ownership model comparing Gas (ICE) and Electric (EV) vehicles.',
  introduction: `For many high school students and young adults, buying a first car is the single biggest financial transaction of their lives. You browse car listings, see a price tag like $18,000, and check your bank account or imagine getting your first job. But in the real world, almost nobody buys a car with a bag of cash. They take out an Auto Loan.

When you take out a loan, you aren't just paying back the sticker price; you are renting money from a bank. That rental fee—Interest—is calculated using a mathematical process called Amortization. Each monthly payment you make is split into two distinct parts: paying off the interest you owe for that month, and reducing the principal balance. Because of how exponents work in amortization algebra, early payments consist mostly of interest, while later payments consist mostly of principal.

However, the loan payment is only the beginning. A car is an active machine that consumes resources every single day. To drive legally and safely, you must pay for auto insurance (which is especially high for young drivers), fuel or electricity, routine maintenance (like oil changes, tires, and brake pads), and unexpected repairs. 

When you add all these ongoing operational expenses to your monthly loan payment, you arrive at the Total Cost of Ownership (TCO). In this lesson, we will use multi-variable algebra to analyze how different car choices—such as a gas-powered car with high MPG versus an electric vehicle with low maintenance—behave over time. By mastering this math, you will avoid the "sticker price trap" and learn to make smart, mathematically sound car buying decisions.`,
  fullText: [
    '**The Hook: The $20,000 Car that Costs $38,000**\nImagine finding a great used car listed for \\$20,000. You put down \\$2,000 and finance the remaining \\$18,000 with a 5-year auto loan at 7.5% interest. Your monthly loan payment comes out to \\$360.72. That sounds manageable! But after adding \\$220/month for insurance (common for young drivers), \\$160/month for fuel, and \\$70/month for routine maintenance and tires, your actual out-of-pocket cost is **\\$810.72 per month**. Over 5 years, you will spend **\\$48,643** total to own and operate that \\$20,000 car! This is why understanding Total Cost of Ownership (TCO) is essential.',
    
    '1. **The Algebra of Loan Amortization ($PMT$)**\nAn auto loan is an amortized loan: you make equal monthly payments ($PMT$) for $n$ months, and by the final month, your remaining balance drops to zero. To calculate the exact monthly payment $PMT$ required to pay off a loan principal $P$ at a monthly interest rate $r$ over $n$ months, we use the Amortization Formula:\n$PMT = P \\times \\frac{r(1 + r)^n}{(1 + r)^n - 1}$',
    
    'Here, $r = \\frac{\\text{Annual Interest Rate (APR)}}{12}$ and $n = \\text{Loan Term in Years} \\times 12$.',

    '**Worked Example — Calculating a Monthly Car Payment:**\nSuppose you borrow $P = \\$20{,}000$ at an annual interest rate of $6\\%$ (so $r = \\frac{0.06}{12} = 0.005$) for $n = 60$ months (5 years). Let\'s calculate $PMT$ step by step:\n- Step 1: Calculate $(1 + r)^n = (1.005)^{60} \\approx 1.34885$\n- Step 2: Numerator $r(1+r)^n = 0.005 \\times 1.34885 \\approx 0.006744$\n- Step 3: Denominator $(1+r)^n - 1 = 1.34885 - 1 = 0.34885$\n- Step 4: Divide: $\\frac{0.006744}{0.34885} \\approx 0.019333$\n- Step 5: Multiply by Principal: $PMT = 20{,}000 \\times 0.019333 \\approx \\mathbf{\\$386.66/month}$',

    'Total paid over 60 months = $386.66 \\times 60 = \\$23{,}199.60$.\nTotal Interest Paid = $\\$23{,}199.60 - \\$20{,}000 = \\mathbf{\\$3{,}199.60}$.',

    'AMORTIZATION_TABLE|Month | Payment | Interest Portion ($I = \\text{Bal} \\times 0.005$) | Principal Portion ($P_k = PMT - I$) | Remaining Balance\nMonth 1 | \\$386.66 | \\$100.00 | \\$286.66 | \\$19,713.34\nMonth 12 | \\$386.66 | \\$84.51 | \\$302.15 | \\$16,599.85\nMonth 36 | \\$386.66 | \\$50.92 | \\$335.74 | \\$9,848.26\nMonth 60 | \\$386.66 | \\$1.92 | \\$384.74 | \\$0.00',

    'Notice how the interest portion shrinks over time as the remaining principal balance decreases! Early on, a large chunk of your payment goes straight to interest.',

    '⚠️ **Common Mistake:** Students often think stretching a loan from 60 months to 84 months (7 years) saves money because the monthly payment drops. In reality, stretching the loan increases the total interest paid drastically and leaves you "underwater" (owing more on the loan than the car is worth on the market).',

    '2. **Total Cost of Ownership (TCO) Multi-Variable Formula**\nThe monthly loan payment is only one component of vehicle ownership. The complete monthly cost function $C_{\\text{monthly}}$ is:\n$C_{\\text{monthly}} = PMT + C_{\\text{insurance}} + C_{\\text{fuel}} + C_{\\text{maintenance}}$',

    'Let me break down how operational costs are modeled mathematically:',
    '• **Fuel Cost (Gasoline ICE):** $C_{\\text{fuel}} = \\left(\\frac{\\text{Monthly Miles}}{MPG}\\right) \\times \\text{Gas Price (\\$/gal)}$\n• **Energy Cost (Electric EV):** $C_{\\text{electric}} = \\left(\\frac{\\text{Monthly Miles}}{100}\\right) \\times \\text{kWh per 100 mi} \\times \\text{Electricity Price (\\$/kWh)}$\n• **Insurance ($C_{\\text{insurance}}$):** High school and teen drivers average \\$200–\\$350/month due to risk tiering. EV insurance can sometimes be 10-15% higher due to costly battery replacement parts.\n• **Maintenance & Reliability ($C_{\\text{maintenance}}$):** ICE cars require regular oil changes, spark plugs, timing belts, and brake servicing (\\$60–\\$120/mo average). EVs have no engine oil or spark plugs and use regenerative braking to preserve pads, leading to lower routine service costs (\\$30–\\$60/mo average), though battery degradation and tire wear must be monitored.',

    '3. **Head-to-Head Comparison: Gas (ICE) vs. Electric (EV)**\nLet\'s compare two real-world choices for a student driving 1,000 miles per month over a 5-year (60-month) ownership window:',

    'TCO_COMPARE_TABLE|Cost Factor | Used Efficient Gas Car (ICE) | Used Electric Vehicle (EV)\nVehicle Price | \\$18,000 | \\$22,000\nDown Payment | \\$2,000 | \\$2,000\nLoan Principal | \\$16,000 (6% APR) | \\$20,000 (6% APR)\nMonthly Loan Payment | \\$309.33 | \\$386.66\nMonthly Fuel / Energy | \\$133.33 (30 MPG @ \\$4.00/gal) | \\$42.00 (30 kWh/100mi @ \\$0.14/kWh)\nMonthly Insurance | \\$210.00 | \\$235.00\nMonthly Maintenance | \\$85.00 | \\$40.00\nTotal Monthly Expense | **\\$737.66 / mo** | **\\$703.66 / mo**\n5-Year Total Cost (TCO) | **\\$46,259.60** | **\\$44,219.60**',

    '🔍 **Key Insight:** Even though the EV had a **\\$4,000 higher sticker price** and a higher loan payment (\\$386.66 vs \\$309.33), its lower fuel and maintenance costs saved **\\$91.33/month** in operations! Over 5 years, the EV actually cost **\\$2,040 LESS total** than the cheaper gas car. Math allows you to see beyond the sticker price.',

    '🧪 **Real-World Experiment:** What happens if gas prices drop to \\$2.80/gallon or if you drive only 500 miles/month? The gas car becomes cheaper! TCO isn\'t fixed; it is a dynamic function of your driving habits and local energy rates.'
  ],
  quizzes: [
    {
      id: 'amortization_q1',
      question: 'In a standard 60-month amortized car loan, how does the monthly payment split change from Month 1 to Month 60?',
      options: [
        'Month 1 is mostly interest; Month 60 is almost entirely principal reduction.',
        'Month 1 is mostly principal; Month 60 is almost entirely interest.',
        'Every monthly payment has the exact same dollar split of principal and interest.',
        'Interest is paid entirely upfront in Month 1, and principal is paid thereafter.'
      ],
      correctIndex: 0,
      explanation: 'Because interest is calculated on the remaining loan balance ($I = \\text{Balance} \\times r$), early payments have high interest charges. As the principal drops, interest decreases, leaving more of the $PMT$ to reduce principal.',
      hint: 'Think about how the loan balance changes over time.'
    },
    {
      id: 'amortization_q2',
      question: 'A student borrows $15,000 at a monthly interest rate of r = 0.005 (6% APR) for 48 months. If their calculated monthly payment is $352.28, how much interest is charged in the very first month?',
      options: [
        '$75.00',
        '$150.00',
        '$352.28',
        '$0.00'
      ],
      correctIndex: 0,
      explanation: 'In Month 1, Interest = Principal x monthly rate = $15,000 x 0.005 = $75.00. The remaining $277.28 ($352.28 - $75.00) goes to reducing principal.',
      hint: 'Multiply the full starting balance by the monthly interest rate r.'
    },
    {
      id: 'amortization_q3',
      question: 'Why can extending an auto loan from 60 months to 84 months be mathematically risky for a car buyer?',
      options: [
        'It increases total interest dramatically and increases the time you owe more than the car is worth (being "underwater").',
        'It causes the car\'s gas mileage (MPG) to decrease exponentially over time.',
        'It automatically doubles your monthly car insurance premium.',
        'It reduces the total interest paid to the bank.'
      ],
      correctIndex: 0,
      explanation: 'Shorter loan terms pay less total interest. With an 84-month loan, the car depreciates faster than you pay down principal, causing you to owe more than the car is worth for years.',
      hint: 'Consider total interest paid over 7 years vs. vehicle depreciation.'
    },
    {
      id: 'amortization_q4',
      question: 'Car A costs $200/mo in fuel and $100/mo in maintenance. Car B costs $50/mo in electricity and $40/mo in maintenance. Over 5 years (60 months), how much does Car B save in operational costs compared to Car A?',
      options: [
        '$12,600',
        '$210',
        '$2,520',
        '$8,400'
      ],
      correctIndex: 0,
      explanation: 'Car A operations = $200 + $100 = $300/mo. Car B operations = $50 + $40 = $90/mo. Monthly savings = $300 - $90 = $210/mo. Over 60 months, $210 x 60 = $12,600 saved!',
      hint: 'Calculate monthly operational savings first, then multiply by 60 months.'
    }
  ]
};
