import { BrainCircuit } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-slate-900 text-white border-b border-slate-950 py-3 px-6 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-600 p-1.5 rounded-lg">
            <BrainCircuit className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-sans font-bold text-base tracking-tight leading-tight uppercase">
              Investing & Finance Math Lab
            </h1>
            <p className="font-mono text-[9px] text-indigo-300 tracking-wider">
              FOR MATHEMATICS AND STOCHASTIC CALCULUS STUDY
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <span className="font-mono text-[10px] bg-slate-800 text-slate-300 px-2.5 py-1 rounded border border-slate-700/50 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
            Real-time Simulation Engine Activated
          </span>
        </div>
      </div>
    </header>
  );
}
