import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { MathSpan } from '../lib/math';
import { 
  Home, 
  DollarSign, 
  ShieldAlert, 
  Calculator, 
  BarChart3, 
  ArrowRightLeft, 
  Sparkles,
  PiggyBank,
  Percent,
  Building
} from 'lucide-react';

export function MortgageLab() {
  // Home & Loan state
  const [homePrice, setHomePrice] = useState<number>(400000);
  const [downPaymentPct, setDownPaymentPct] = useState<number>(10); // 0% to 30%
  const [apr, setApr] = useState<number>(6.5); // %
  const [loanTermYears, setLoanTermYears] = useState<number>(30); // 15 or 30
  
  // Tax, Insurance & PMI parameters
  const [propertyTaxRate, setPropertyTaxRate] = useState<number>(1.2); // % annual of home value
  const [annualInsurance, setAnnualInsurance] = useState<number>(1800); // $/yr
  const [pmiRate, setPmiRate] = useState<number>(0.8); // % annual of loan amount if LTV > 80%
  const [monthlyHoa, setMonthlyHoa] = useState<number>(150); // $/mo

  // View mode
  const [compareMode, setCompareMode] = useState<'piti' | 'compare15vs30'>('piti');

  // Math Calculations for Mortgage
  const downPayment = (homePrice * downPaymentPct) / 100;
  const loanPrincipal = Math.max(0, homePrice - downPayment);
  const ltvRatio = homePrice > 0 ? (loanPrincipal / homePrice) * 100 : 0;
  const isPmiRequired = ltvRatio > 80;

  const loanTermMonths = loanTermYears * 12;
  const monthlyRate = (apr / 100) / 12;

  // PMT Formula: P * (r * (1+r)^n) / ((1+r)^n - 1)
  const calculatePMT = (principal: number, r: number, n: number) => {
    if (principal <= 0) return 0;
    if (r === 0) return principal / n;
    const factor = Math.pow(1 + r, n);
    return principal * ((r * factor) / (factor - 1));
  };

  const monthlyLoanPayment = useMemo(() => {
    return calculatePMT(loanPrincipal, monthlyRate, loanTermMonths);
  }, [loanPrincipal, monthlyRate, loanTermMonths]);

  // Taxes & Insurance monthly breakdown
  const monthlyTaxes = (homePrice * (propertyTaxRate / 100)) / 12;
  const monthlyInsurance = annualInsurance / 12;
  const monthlyPmi = isPmiRequired ? (loanPrincipal * (pmiRate / 100)) / 12 : 0;

  // Total PITI
  const totalMonthlyPiti = monthlyLoanPayment + monthlyTaxes + monthlyInsurance + monthlyPmi + monthlyHoa;

  // 15-Year vs 30-Year comparison calculations
  const pmt30 = calculatePMT(loanPrincipal, monthlyRate, 360);
  const totalPaid30 = (pmt30 * 360) + downPayment;
  const totalInterest30 = Math.max(0, (pmt30 * 360) - loanPrincipal);

  const pmt15 = calculatePMT(loanPrincipal, monthlyRate, 180);
  const totalPaid15 = (pmt15 * 180) + downPayment;
  const totalInterest15 = Math.max(0, (pmt15 * 180) - loanPrincipal);

  // Amortization & Equity schedule preview
  const amortizationSchedule = useMemo(() => {
    let balance = loanPrincipal;
    const schedule = [];
    let accumInterest = 0;

    for (let month = 1; month <= loanTermMonths; month++) {
      const interestForMonth = balance * monthlyRate;
      const principalForMonth = Math.min(balance, monthlyLoanPayment - interestForMonth);
      balance = Math.max(0, balance - principalForMonth);
      accumInterest += interestForMonth;

      const year = Math.ceil(month / 12);
      if (month === 1 || month === 12 || month === 60 || month === 120 || month === 180 || month === 240 || month === 300 || month === 360 || month === loanTermMonths) {
        const homeEquity = homePrice - balance;
        schedule.push({
          month,
          year,
          payment: monthlyLoanPayment,
          interest: interestForMonth,
          principal: principalForMonth,
          remainingBalance: balance,
          equity: homeEquity,
          totalInterestSoFar: accumInterest
        });
      }
    }
    return schedule;
  }, [loanPrincipal, monthlyRate, loanTermMonths, monthlyLoanPayment, homePrice]);

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
              <Home className="w-5 h-5" />
            </span>
            <h3 className="font-sans font-extrabold text-slate-900 text-lg sm:text-xl">
              Mortgage & Housing Amortization Lab
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Simulate 15-year vs. 30-year home mortgages, Loan-to-Value (LTV) ratios, PMI, property taxes, equity paydown, and total PITI monthly housing expenses.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl self-start sm:self-auto text-xs font-sans font-bold">
          <button
            onClick={() => setCompareMode('piti')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              compareMode === 'piti' ? 'bg-white text-indigo-600 shadow-3xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>PITI Housing Expense</span>
          </button>
          <button
            onClick={() => setCompareMode('compare15vs30')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              compareMode === 'compare15vs30' ? 'bg-white text-indigo-600 shadow-3xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>15-Yr vs 30-Yr Loan</span>
          </button>
        </div>
      </div>

      {/* Primary Input Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
        {/* Home Price Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-sans">
            <span className="text-slate-500 font-semibold">Home Purchase Price</span>
            <span className="font-extrabold text-slate-800">${homePrice.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min={150000}
            max={1000000}
            step={10000}
            value={homePrice}
            onChange={(e) => setHomePrice(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
        </div>

        {/* Down Payment % Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-sans">
            <span className="text-slate-500 font-semibold">Down Payment ({downPaymentPct}%)</span>
            <span className="font-extrabold text-emerald-600">${downPayment.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min={0}
            max={35}
            step={1}
            value={downPaymentPct}
            onChange={(e) => setDownPaymentPct(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
        </div>

        {/* APR Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-sans">
            <span className="text-slate-500 font-semibold">Interest Rate (APR)</span>
            <span className="font-extrabold text-indigo-600">{apr.toFixed(2)}%</span>
          </div>
          <input
            type="range"
            min={3.0}
            max={10.0}
            step={0.125}
            value={apr}
            onChange={(e) => setApr(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
        </div>

        {/* Loan Term Selection */}
        <div className="space-y-1.5">
          <span className="text-slate-500 font-semibold text-xs block">Mortgage Term</span>
          <div className="grid grid-cols-2 gap-1.5">
            {[15, 30].map((term) => (
              <button
                key={term}
                onClick={() => setLoanTermYears(term)}
                className={`py-1.5 text-xs font-sans font-bold rounded-lg transition-all ${
                  loanTermYears === term
                    ? 'bg-indigo-600 text-white shadow-3xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {term} Years ({term * 12}m)
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Taxes, Insurance & HOA Sliders */}
      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-3">
        <div className="flex items-center justify-between text-xs font-sans font-bold text-slate-700">
          <span className="flex items-center gap-1.5">
            <Building className="w-4 h-4 text-indigo-600" />
            Taxes, Insurance & HOA Parameters (PITI)
          </span>
          <span className="text-slate-500 font-mono">
            LTV Ratio: <strong className={ltvRatio > 80 ? 'text-rose-600' : 'text-emerald-600'}>{ltvRatio.toFixed(1)}%</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-sans text-slate-500">
              <span>Property Tax Rate</span>
              <span className="font-bold text-slate-800">{propertyTaxRate.toFixed(1)}%/yr</span>
            </div>
            <input
              type="range"
              min={0.4}
              max={3.0}
              step={0.1}
              value={propertyTaxRate}
              onChange={(e) => setPropertyTaxRate(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs font-sans text-slate-500">
              <span>Homeowners Insurance</span>
              <span className="font-bold text-slate-800">${annualInsurance}/yr</span>
            </div>
            <input
              type="range"
              min={600}
              max={4800}
              step={100}
              value={annualInsurance}
              onChange={(e) => setAnnualInsurance(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs font-sans text-slate-500">
              <span>HOA Monthly Dues</span>
              <span className="font-bold text-slate-800">${monthlyHoa}/mo</span>
            </div>
            <input
              type="range"
              min={0}
              max={600}
              step={25}
              value={monthlyHoa}
              onChange={(e) => setMonthlyHoa(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs font-sans text-slate-500">
              <span>PMI Rate (if LTV &gt; 80%)</span>
              <span className="font-bold text-slate-800">{pmiRate.toFixed(2)}%/yr</span>
            </div>
            <input
              type="range"
              min={0.3}
              max={1.5}
              step={0.05}
              value={pmiRate}
              onChange={(e) => setPmiRate(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>
        </div>
      </div>

      {/* Outcome Cards */}
      {compareMode === 'piti' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Base Loan PMT & LTV Card */}
          <div className="border border-slate-200 rounded-2xl p-5 bg-white space-y-4 shadow-3xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="font-sans font-bold text-slate-800 text-sm flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-indigo-600" />
                Principal & Interest (P + I)
              </span>
              <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200/60">
                {loanTermYears} Years
              </span>
            </div>

            <div className="space-y-2">
              <span className="text-xs text-slate-500 block">Monthly Loan Payment (PMT):</span>
              <div className="text-3xl font-extrabold text-slate-900 font-sans">
                ${monthlyLoanPayment.toFixed(2)} <span className="text-xs text-slate-400 font-normal">/ mo</span>
              </div>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100 text-xs font-sans">
              <div className="flex justify-between">
                <span className="text-slate-500">Loan Principal:</span>
                <span className="font-bold text-slate-800">${loanPrincipal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">LTV Ratio:</span>
                <span className={`font-extrabold ${ltvRatio > 80 ? 'text-amber-700' : 'text-emerald-700'}`}>
                  {ltvRatio.toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Total Interest over {loanTermYears}y:</span>
                <span className="font-bold text-amber-700">
                  ${((monthlyLoanPayment * loanTermMonths) - loanPrincipal).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </span>
              </div>
            </div>
          </div>

          {/* Taxes, Insurance & PMI Breakdown Card */}
          <div className="border border-slate-200 rounded-2xl p-5 bg-white space-y-4 shadow-3xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <span className="font-sans font-bold text-slate-800 text-sm flex items-center gap-1.5">
                <Building className="w-4 h-4 text-emerald-600" />
                Escrow: Taxes, Ins & PMI (T + I)
              </span>
              <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded ${isPmiRequired ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>
                {isPmiRequired ? 'PMI Active' : 'No PMI'}
              </span>
            </div>

            <div className="space-y-2 font-sans text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Property Taxes ({propertyTaxRate}%):</span>
                <span className="font-bold text-slate-800">+${monthlyTaxes.toFixed(2)}/mo</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Homeowners Insurance:</span>
                <span className="font-bold text-slate-800">+${monthlyInsurance.toFixed(2)}/mo</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Private Mortgage Ins. (PMI):</span>
                <span className={`font-bold ${isPmiRequired ? 'text-rose-600' : 'text-slate-400'}`}>
                  {isPmiRequired ? `+$${monthlyPmi.toFixed(2)}/mo` : '$0.00'}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">HOA Dues:</span>
                <span className="font-bold text-slate-800">+${monthlyHoa.toFixed(2)}/mo</span>
              </div>
            </div>
          </div>

          {/* Total PITI Card */}
          <div className="border border-indigo-200 rounded-2xl p-5 bg-gradient-to-br from-indigo-900 to-slate-900 text-white space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-indigo-800/80 pb-3">
              <span className="font-sans font-bold text-indigo-200 text-sm flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                Total Monthly Housing (PITI)
              </span>
              <span className="text-xs font-mono text-indigo-300">All Expenses</span>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-indigo-300 block">Total Out-of-Pocket Housing Bill:</span>
              <div className="text-3xl font-extrabold text-white font-sans">
                ${totalMonthlyPiti.toFixed(2)} <span className="text-xs text-indigo-300 font-normal">/ mo</span>
              </div>
            </div>

            <div className="space-y-1.5 pt-2 border-t border-indigo-800/80 text-xs text-indigo-100/80">
              <div className="flex justify-between">
                <span>Principal & Interest:</span>
                <span className="font-mono font-bold text-white">${monthlyLoanPayment.toFixed(0)} ({((monthlyLoanPayment / totalMonthlyPiti) * 100).toFixed(0)}%)</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes & Insurance:</span>
                <span className="font-mono font-bold text-indigo-200">${(monthlyTaxes + monthlyInsurance).toFixed(0)} ({(((monthlyTaxes + monthlyInsurance) / totalMonthlyPiti) * 100).toFixed(0)}%)</span>
              </div>
              {isPmiRequired && (
                <div className="flex justify-between text-rose-300">
                  <span>PMI Fee:</span>
                  <span className="font-mono font-bold">${monthlyPmi.toFixed(0)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* 15-Year vs 30-Year Comparison Layout */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 30-Year Loan Card */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-slate-200 rounded-2xl p-5 bg-white space-y-4 shadow-3xs"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="font-sans font-extrabold text-slate-900 text-base">30-Year Fixed Mortgage</h4>
              <span className="text-xs font-mono font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full">360 Payments</span>
            </div>

            <div className="space-y-2 font-sans text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Monthly Base Payment (PMT)</span>
                <span className="font-extrabold text-slate-800">${pmt30.toFixed(2)} / mo</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Total Payments (360 months)</span>
                <span className="font-bold text-slate-800">${(pmt30 * 360).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Total Interest Paid to Bank</span>
                <span className="font-extrabold text-amber-700">${totalInterest30.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
              <div className="flex justify-between py-1 pt-2 font-extrabold text-sm text-slate-900">
                <span>Total Out-of-Pocket (with Down Payment)</span>
                <span className="text-indigo-600">${totalPaid30.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
            </div>
          </motion.div>

          {/* 15-Year Loan Card */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-indigo-200 rounded-2xl p-5 bg-gradient-to-br from-white to-indigo-50/40 space-y-4 shadow-3xs"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="font-sans font-extrabold text-slate-900 text-base">15-Year Fixed Mortgage</h4>
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">180 Payments</span>
            </div>

            <div className="space-y-2 font-sans text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Monthly Base Payment (PMT)</span>
                <span className="font-extrabold text-indigo-700">${pmt15.toFixed(2)} / mo</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Total Payments (180 months)</span>
                <span className="font-bold text-slate-800">${(pmt15 * 180).toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Total Interest Paid to Bank</span>
                <span className="font-extrabold text-emerald-700">${totalInterest15.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
              <div className="flex justify-between py-1 pt-2 font-extrabold text-sm text-slate-900">
                <span>Total Out-of-Pocket (with Down Payment)</span>
                <span className="text-emerald-600">${totalPaid15.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Comparison Callout Insight Banner */}
      {compareMode === 'compare15vs30' && (
        <div className="bg-indigo-50/70 border border-indigo-200 rounded-2xl p-4 flex items-start gap-3 text-xs sm:text-sm font-sans text-indigo-950">
          <Sparkles className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h5 className="font-bold text-indigo-900">
              15-Year Mortgage Saves ${(totalInterest30 - totalInterest15).toLocaleString(undefined, { maximumFractionDigits: 0 })} in Interest!
            </h5>
            <p className="text-indigo-800 text-xs leading-relaxed">
              Choosing a 15-year mortgage increases the monthly payment by ${(pmt15 - pmt30).toFixed(2)}/month (+{(((pmt15 - pmt30) / pmt30) * 100).toFixed(0)}%), but pays off the home in half the time and saves over ${(totalInterest30 - totalInterest15).toLocaleString(undefined, { maximumFractionDigits: 0 })} in total bank interest fees!
            </p>
          </div>
        </div>
      )}

      {/* Amortization & Home Equity Schedule Table Preview */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h4 className="font-sans font-bold text-slate-800 text-sm flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-indigo-600" />
            Mortgage Amortization & Home Equity Growth
          </h4>
          <span className="text-xs text-slate-400 font-mono">Principal vs. Equity Paydown</span>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-2xl overflow-hidden">
          <table className="min-w-full divide-y divide-slate-200 text-left text-xs font-sans">
            <thead className="bg-slate-50 font-bold text-slate-700">
              <tr>
                <th className="px-4 py-2.5">Timeline</th>
                <th className="px-4 py-2.5">Monthly Payment</th>
                <th className="px-4 py-2.5 text-amber-700 font-sans">
                  <span>Interest Portion</span> (<MathSpan tex="I" />)
                </th>
                <th className="px-4 py-2.5 text-indigo-700 font-sans">
                  <span>Principal Portion</span> (<MathSpan tex="P_k" />)
                </th>
                <th className="px-4 py-2.5">Remaining Principal</th>
                <th className="px-4 py-2.5 text-emerald-700 font-sans">Accumulated Equity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white font-mono text-slate-600">
              {amortizationSchedule.map((row) => (
                <tr key={row.month} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-2 font-bold text-slate-800">Year {row.year} (M{row.month})</td>
                  <td className="px-4 py-2">${row.payment.toFixed(2)}</td>
                  <td className="px-4 py-2 text-amber-600 font-semibold">${row.interest.toFixed(2)}</td>
                  <td className="px-4 py-2 text-indigo-600 font-semibold">${row.principal.toFixed(2)}</td>
                  <td className="px-4 py-2 font-bold text-slate-900">${row.remainingBalance.toFixed(2)}</td>
                  <td className="px-4 py-2 font-bold text-emerald-600">${row.equity.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
