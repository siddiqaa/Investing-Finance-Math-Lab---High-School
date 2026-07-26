import { BrainCircuit } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-slate-900 text-white border-b border-slate-950 py-3 px-6 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-600 p-1.5 rounded-lg">
            <BrainCircuit className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-sans font-bold text-base tracking-tight leading-tight uppercase">
              Investing & Finance Math Lab
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
}

