export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-slate-900 text-white border-b-2 border-purple-600/80 py-3 px-6 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img 
            src="/favicon.svg" 
            alt="Investing & Finance Math Lab Logo" 
            className="w-8 h-8 rounded-lg shadow-sm border border-slate-700/50 object-contain"
          />
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

