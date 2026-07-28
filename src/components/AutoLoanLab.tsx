import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { MathSpan } from '../lib/math';
import { 
  Car, 
  Zap, 
  DollarSign, 
  ShieldAlert, 
  Wrench, 
  Fuel, 
  Calculator, 
  BarChart3, 
  ArrowRightLeft, 
  Sparkles,
  Info
} from 'lucide-react';

export function AutoLoanLab() {
  // Vehicle & Loan state
  const [carPrice, setCarPrice] = useState<number>(22000);
  const [downPayment, setDownPayment] = useState<number>(3000);
  const [apr, setApr] = useState<number>(6.5); // %
  const [loanTermMonths, setLoanTermMonths] = useState<number>(60); // 36, 48, 60, 72
  const [monthlyMiles, setMonthlyMiles] = useState<number>(1000);

  // Operational Params - ICE
  const [gasPrice, setGasPrice] = useState<number>(3.80); // $/gal
  const [mpg, setMpg] = useState<number>(28);
  const [iceInsurance, setIceInsurance] = useState<number>(220); // $/mo
  const [iceMaintenance, setIceMaintenance] = useState<number>(80); // $/mo

  // Operational Params - EV
  const [elecPrice, setElecPrice] = useState<number>(0.15); // $/kWh
  const [kwhPer100mi, setKwhPer100mi] = useState<number>(30);
  const [evInsurance, setEvInsurance] = useState<number>(235); // $/mo
  const [evMaintenance, setEvMaintenance] = useState<number>(40); // $/mo

  // Comparison toggle mode
  const [compareMode, setCompareMode] = useState<'single' | 'compare'>('compare');
  const [selectedDriveType, setSelectedDriveType] = useState<'ice' | 'ev'>('ice');

  // Math Calculations for Loan
  const loanPrincipal = Math.max(0, carPrice - downPayment);
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

  const totalLoanPaid = monthlyLoanPayment * loanTermMonths + downPayment;
  const totalLoanInterest = Math.max(0, (monthlyLoanPayment * loanTermMonths) - loanPrincipal);

  // Operational Costs - ICE
  const monthlyGasCost = (monthlyMiles / Math.max(1, mpg)) * gasPrice;
  const monthlyIceOps = monthlyGasCost + iceInsurance + iceMaintenance;
  const monthlyIceTotal = monthlyLoanPayment + monthlyIceOps;
  const termIceTco = (monthlyIceTotal * loanTermMonths) + downPayment;

  // Operational Costs - EV (assume same loan for comparison or +$3,000 for EV premium)
  const evCarPrice = carPrice + 3000; // Realistic EV premium
  const evPrincipal = Math.max(0, evCarPrice - downPayment);
  const evMonthlyLoanPayment = calculatePMT(evPrincipal, monthlyRate, loanTermMonths);

  const monthlyElecCost = (monthlyMiles / 100) * kwhPer100mi * elecPrice;
  const monthlyEvOps = monthlyElecCost + evInsurance + evMaintenance;
  const monthlyEvTotal = evMonthlyLoanPayment + monthlyEvOps;
  const termEvTco = (monthlyEvTotal * loanTermMonths) + downPayment;

  // Amortization Schedule preview for current loan
  const amortizationSchedule = useMemo(() => {
    let balance = loanPrincipal;
    const schedule = [];
    let accumInterest = 0;

    for (let month = 1; month <= loanTermMonths; month++) {
      const interestForMonth = balance * monthlyRate;
      const principalForMonth = Math.min(balance, monthlyLoanPayment - interestForMonth);
      balance = Math.max(0, balance - principalForMonth);
      accumInterest += interestForMonth;

      if (month === 1 || month === 12 || month === 24 || month === 36 || month === 48 || month === 60 || month === 72 || month === loanTermMonths) {
        schedule.push({
          month,
          payment: monthlyLoanPayment,
          interest: interestForMonth,
          principal: principalForMonth,
          remainingBalance: balance,
          totalInterestSoFar: accumInterest
        });
      }
    }
    return schedule;
  }, [loanPrincipal, monthlyRate, loanTermMonths, monthlyLoanPayment]);

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
              <Car className="w-5 h-5" />
            </span>
            <h3 className="font-sans font-extrabold text-slate-900 text-lg sm:text-xl">
              Auto Loan & Total Cost of Ownership Simulator
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Adjust loan parameters and operational costs to discover the true monthly and multi-year cost of owning a vehicle.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl self-start sm:self-auto text-xs font-sans font-bold">
          <button
            onClick={() => setCompareMode('compare')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              compareMode === 'compare' ? 'bg-white text-indigo-600 shadow-3xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span>Gas vs EV Comparison</span>
          </button>
          <button
            onClick={() => setCompareMode('single')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              compareMode === 'single' ? 'bg-white text-indigo-600 shadow-3xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>Single Vehicle Loan</span>
          </button>
        </div>
      </div>

      {/* Primary Input Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
        {/* Price Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-sans">
            <span className="text-slate-500 font-semibold">Vehicle Sticker Price</span>
            <span className="font-extrabold text-slate-800">${carPrice.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min={10000}
            max={50000}
            step={500}
            value={carPrice}
            onChange={(e) => setCarPrice(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
        </div>

        {/* Down Payment Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-sans">
            <span className="text-slate-500 font-semibold">Down Payment</span>
            <span className="font-extrabold text-emerald-600">${downPayment.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min={0}
            max={Math.min(15000, carPrice - 1000)}
            step={250}
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
        </div>

        {/* APR Slider */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-sans">
            <span className="text-slate-500 font-semibold">Interest Rate (APR)</span>
            <span className="font-extrabold text-indigo-600">{apr.toFixed(1)}%</span>
          </div>
          <input
            type="range"
            min={2.0}
            max={16.0}
            step={0.25}
            value={apr}
            onChange={(e) => setApr(Number(e.target.value))}
            className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
        </div>

        {/* Loan Term Selection */}
        <div className="space-y-1.5">
          <span className="text-slate-500 font-semibold text-xs block">Loan Term</span>
          <div className="grid grid-cols-4 gap-1">
            {[36, 48, 60, 72].map((term) => (
              <button
                key={term}
                onClick={() => setLoanTermMonths(term)}
                className={`py-1 text-xs font-sans font-bold rounded-lg transition-all ${
                  loanTermMonths === term
                    ? 'bg-indigo-600 text-white shadow-3xs'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {term}m
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Operational Input Sliders Banner */}
      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-3">
        <div className="flex items-center justify-between text-xs font-sans font-bold text-slate-700">
          <span className="flex items-center gap-1.5">
            <Fuel className="w-4 h-4 text-indigo-600" />
            Driving & Operational Parameters
          </span>
          <span className="text-slate-500 font-mono">Monthly Distance: <strong className="text-slate-800">{monthlyMiles.toLocaleString()} miles</strong></span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-sans text-slate-500">
              <span>Miles Driven / Month</span>
              <span className="font-bold text-slate-800">{monthlyMiles} mi</span>
            </div>
            <input
              type="range"
              min={300}
              max={2500}
              step={50}
              value={monthlyMiles}
              onChange={(e) => setMonthlyMiles(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs font-sans text-slate-500">
              <span>Gas Price ($/gal)</span>
              <span className="font-bold text-slate-800">${gasPrice.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min={2.50}
              max={6.00}
              step={0.10}
              value={gasPrice}
              onChange={(e) => setGasPrice(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          <div className="space-y-1">
            <div className="flex justify-between text-xs font-sans text-slate-500">
              <span>Electricity Rate ($/kWh)</span>
              <span className="font-bold text-slate-800">${elecPrice.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min={0.08}
              max={0.45}
              step={0.01}
              value={elecPrice}
              onChange={(e) => setElecPrice(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>
        </div>
      </div>

      {/* Outcome Cards */}
      {compareMode === 'compare' ? (
        /* Head-to-Head Side-by-Side Comparison Layout */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* ICE Gasoline Card */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-slate-200 rounded-2xl p-5 bg-gradient-to-br from-white to-slate-50/50 space-y-4 shadow-3xs"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-amber-100 text-amber-700 rounded-lg">
                  <Fuel className="w-4 h-4" />
                </span>
                <div>
                  <h4 className="font-sans font-extrabold text-slate-900 text-base">Gasoline Car (ICE)</h4>
                  <p className="text-[11px] text-slate-500">Sticker Price: ${carPrice.toLocaleString()} • 28 MPG</p>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/60">
                Gasoline
              </span>
            </div>

            {/* Cost Breakdown List */}
            <div className="space-y-2 font-sans text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Monthly Loan Payment (PMT)</span>
                <span className="font-extrabold text-slate-800">${monthlyLoanPayment.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Monthly Fuel ({mpg} MPG @ ${gasPrice.toFixed(2)}/gal)</span>
                <span className="font-bold text-amber-700">+${monthlyGasCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Monthly Insurance</span>
                <span className="font-bold text-slate-700">+${iceInsurance.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Monthly Maintenance & Repairs</span>
                <span className="font-bold text-slate-700">+${iceMaintenance.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 pt-3 font-extrabold text-sm text-slate-900">
                <span>Total Monthly Out-of-Pocket</span>
                <span className="text-indigo-600">${monthlyIceTotal.toFixed(2)} / mo</span>
              </div>
            </div>

            {/* 5-Year / Loan Term TCO Summary */}
            <div className="bg-slate-900 text-white rounded-xl p-3.5 space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">{loanTermMonths}-Month Total Cost of Ownership:</span>
                <span className="text-amber-400 font-extrabold text-sm">${termIceTco.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
              <p className="text-[10px] text-slate-400">Includes Down Payment + Loan Payments + Fuel + Insurance + Service.</p>
            </div>
          </motion.div>

          {/* EV Electric Card */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-slate-200 rounded-2xl p-5 bg-gradient-to-br from-white to-indigo-50/30 space-y-4 shadow-3xs"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-emerald-100 text-emerald-700 rounded-lg">
                  <Zap className="w-4 h-4" />
                </span>
                <div>
                  <h4 className="font-sans font-extrabold text-slate-900 text-base">Electric Vehicle (EV)</h4>
                  <p className="text-[11px] text-slate-500">Sticker Price: ${evCarPrice.toLocaleString()} (+$3k) • 30 kWh/100mi</p>
                </div>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
                Electric
              </span>
            </div>

            {/* Cost Breakdown List */}
            <div className="space-y-2 font-sans text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Monthly Loan Payment (PMT)</span>
                <span className="font-extrabold text-slate-800">${evMonthlyLoanPayment.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Monthly Electricity (${elecPrice.toFixed(2)}/kWh)</span>
                <span className="font-bold text-emerald-700">+${monthlyElecCost.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Monthly Insurance</span>
                <span className="font-bold text-slate-700">+${evInsurance.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-500">Monthly Maintenance & Repairs</span>
                <span className="font-bold text-emerald-700">+${evMaintenance.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2 pt-3 font-extrabold text-sm text-slate-900">
                <span>Total Monthly Out-of-Pocket</span>
                <span className="text-emerald-600">${monthlyEvTotal.toFixed(2)} / mo</span>
              </div>
            </div>

            {/* 5-Year / Loan Term TCO Summary */}
            <div className="bg-slate-900 text-white rounded-xl p-3.5 space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">{loanTermMonths}-Month Total Cost of Ownership:</span>
                <span className="text-emerald-400 font-extrabold text-sm">${termEvTco.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
              <p className="text-[10px] text-slate-400">Includes Down Payment + Loan Payments + Electricity + Insurance + Service.</p>
            </div>
          </motion.div>
        </div>
      ) : (
        /* Single Vehicle Amortization Mode */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-1">
            <span className="text-xs font-sans text-slate-500 font-semibold flex items-center gap-1">
              <span>Monthly Loan Payment</span>
              <span>(<MathSpan tex="\text{PMT}" />)</span>
            </span>
            <span className="text-2xl font-extrabold text-indigo-600 font-sans">${monthlyLoanPayment.toFixed(2)}</span>
            <p className="text-[11px] text-slate-500 pt-1">Principal: ${loanPrincipal.toLocaleString()} @ {apr}% APR for {loanTermMonths} months</p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-1">
            <span className="text-xs font-sans text-slate-500 font-semibold block">Total Loan Interest Paid</span>
            <span className="text-2xl font-extrabold text-amber-600 font-sans">${totalLoanInterest.toFixed(2)}</span>
            <p className="text-[11px] text-slate-500 pt-1">Interest is {((totalLoanInterest / loanPrincipal) * 100).toFixed(1)}% of original loan amount</p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-1">
            <span className="text-xs font-sans text-slate-500 font-semibold block">Total Loan Cost</span>
            <span className="text-2xl font-extrabold text-slate-900 font-sans">${totalLoanPaid.toFixed(2)}</span>
            <p className="text-[11px] text-slate-500 pt-1">Down Payment (${downPayment.toLocaleString()}) + All Monthly Payments</p>
          </div>
        </div>
      )}

      {/* Comparison Callout Insight Banner */}
      {compareMode === 'compare' && (
        <div className="bg-indigo-50/70 border border-indigo-200 rounded-2xl p-4 flex items-start gap-3 text-xs sm:text-sm font-sans text-indigo-950">
          <Sparkles className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h5 className="font-bold text-indigo-900">
              {termEvTco < termIceTco 
                ? `EV Saves $${(termIceTco - termEvTco).toLocaleString(undefined, { maximumFractionDigits: 0 })} Total over ${loanTermMonths} Months!`
                : `Gasoline Car Saves $${(termEvTco - termIceTco).toLocaleString(undefined, { maximumFractionDigits: 0 })} Total over ${loanTermMonths} Months!`}
            </h5>
            <p className="text-indigo-800 text-xs leading-relaxed">
              {termEvTco < termIceTco
                ? `Even with a $3,000 higher sticker price, lower fuel ($${monthlyElecCost.toFixed(0)}/mo vs $${monthlyGasCost.toFixed(0)}/mo) and lower maintenance ($${evMaintenance}/mo vs $${iceMaintenance}/mo) make the EV cheaper overall!`
                : `Higher insurance and the $3,000 EV sticker price premium offset the fuel savings under current driving parameters.`}
            </p>
          </div>
        </div>
      )}

      {/* Amortization Schedule Table Preview */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h4 className="font-sans font-bold text-slate-800 text-sm flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-indigo-600" />
            Amortization Schedule Progression
          </h4>
          <span className="text-xs text-slate-400 font-mono">Interest vs. Principal decay</span>
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
                <th className="px-4 py-2.5">Remaining Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white font-mono text-slate-600">
              {amortizationSchedule.map((row) => (
                <tr key={row.month} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-2 font-bold text-slate-800">Month {row.month}</td>
                  <td className="px-4 py-2">${row.payment.toFixed(2)}</td>
                  <td className="px-4 py-2 text-amber-600 font-semibold">${row.interest.toFixed(2)}</td>
                  <td className="px-4 py-2 text-indigo-600 font-semibold">${row.principal.toFixed(2)}</td>
                  <td className="px-4 py-2 font-bold text-slate-900">${row.remainingBalance.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
