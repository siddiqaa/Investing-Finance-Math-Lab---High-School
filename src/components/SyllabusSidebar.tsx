import { LESSONS } from '../data/lessons';
import { 
  BookOpen, 
  PieChart, 
  ChevronsRight, 
  GraduationCap, 
  Clock, 
  LineChart, 
  Activity, 
  Users, 
  TrendingUp, 
  Sigma, 
  Landmark, 
  Briefcase, 
  Zap,
  Car
} from 'lucide-react';

interface SyllabusSidebarProps {
  activeModule: string;
  setActiveModule: (module: string) => void;
}

export function SyllabusSidebar({ activeModule, setActiveModule }: SyllabusSidebarProps) {
  return (
    <aside className="lg:col-span-3 space-y-4 mb-6 lg:mb-0">
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-3.5">
        <h2 className="font-sans font-bold text-xs uppercase text-slate-400 tracking-wider pl-1">
          Study Syllabus Hub
        </h2>

        <nav className="space-y-1">
          <button
            onClick={() => setActiveModule('syllabus')}
            className={`w-full text-left px-3 py-2.5 rounded-xl transition-all font-sans text-xs sm:text-sm font-semibold flex items-center justify-between group ${
              activeModule === 'syllabus'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
            }`}
            id="sidebar-nav-syllabus"
          >
            <span className="flex items-center space-x-2.5">
              <BookOpen className="w-4 h-4 flex-shrink-0" />
              <span>Syllabus Home</span>
            </span>
            <ChevronsRight className={`w-3.5 h-3.5 transition-transform ${activeModule === 'syllabus' ? 'translate-x-0.5' : 'opacity-0 group-hover:opacity-100'}`} />
          </button>

          <div className="h-px bg-slate-100 my-2" />

          {/* Module Items */}
          {Object.values(LESSONS).map((les) => {
            const isSelected = activeModule === les.id;
            let stepIcon = <Clock className="w-4 h-4 flex-shrink-0" />;
            let unitNumber = 'Unknown';
            let unitTitle = 'Unknown Unit';

            if (les.id === 'compounding') {
              unitNumber = '1';
              unitTitle = 'Compound & NPV';
              stepIcon = <GraduationCap className="w-4 h-4 flex-shrink-0" />;
            } else if (les.id === 'rateSelection') {
              unitNumber = '1.5';
              unitTitle = 'Selecting the Rate (r)';
              stepIcon = <Landmark className="w-4 h-4 flex-shrink-0" />;
            } else if (les.id === 'stockBridge') {
              unitNumber = '1.75';
              unitTitle = 'Bridging to Stocks';
              stepIcon = <Briefcase className="w-4 h-4 flex-shrink-0" />;
            } else if (les.id === 'valuation') {
              unitNumber = '2';
              unitTitle = 'Stock Price Valuation';
              stepIcon = <TrendingUp className="w-4 h-4 flex-shrink-0" />;
            } else if (les.id === 'newsBridge') {
              unitNumber = '2.5';
              unitTitle = 'Catalysts & News';
              stepIcon = <Zap className="w-4 h-4 flex-shrink-0" />;
            } else if (les.id === 'stochastic') {
              unitNumber = '3';
              unitTitle = 'Stock Prices & Randomness';
              stepIcon = <Activity className="w-4 h-4 flex-shrink-0" />;
            } else if (les.id === 'portfolio') {
              unitNumber = '4';
              unitTitle = 'Portfolio Diversification';
              stepIcon = <PieChart className="w-4 h-4 flex-shrink-0" />;
            } else if (les.id === 'options') {
              unitNumber = '5';
              unitTitle = 'Options & Payoffs';
              stepIcon = <LineChart className="w-4 h-4 flex-shrink-0" />;
            } else if (les.id === 'behavioral') {
              unitNumber = '6';
              unitTitle = 'Behavioral Market Math';
              stepIcon = <Users className="w-4 h-4 flex-shrink-0" />;
            } else if (les.id === 'amortization') {
              unitNumber = 'Bonus';
              unitTitle = 'Auto Loans & TCO';
              stepIcon = <Car className="w-4 h-4 flex-shrink-0" />;
            }

            return (
              <button
                key={les.id}
                onClick={() => setActiveModule(les.id)}
                className={`w-full text-left px-3 py-2.5 rounded-xl transition-all font-sans text-xs sm:text-sm font-semibold flex items-center justify-between group ${
                  isSelected
                    ? 'bg-slate-950 text-white border-transparent'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
                }`}
                id={`sidebar-nav-${les.id}`}
              >
                <span className="flex items-center space-x-2.5 min-w-0">
                  <span className={isSelected ? 'text-indigo-400' : 'text-slate-400'}>{stepIcon}</span>
                  <span className="truncate font-sans font-bold">{les.id === 'amortization' ? 'Bonus Unit' : `Unit ${unitNumber}`}: <span className="font-semibold text-slate-500 group-hover:text-slate-800 transition-colors">{unitTitle}</span></span>
                </span>
                <ChevronsRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'translate-x-0.5' : 'opacity-0 group-hover:opacity-100'}`} />
              </button>
            );
          })}
        </nav>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-3">
        <h2 className="font-sans font-bold text-xs uppercase text-slate-400 tracking-wider pl-1">
          Advanced Math Quests
        </h2>
        <nav className="space-y-1">
          <button
            onClick={() => setActiveModule('side_quest_sigma')}
            className={`w-full text-left px-3 py-2.5 rounded-xl transition-all font-sans text-xs sm:text-sm font-semibold flex items-center justify-between group ${
              activeModule === 'side_quest_sigma'
                ? 'bg-indigo-600 text-white shadow shadow-indigo-100'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
            }`}
            id="sidebar-nav-side-quest-sigma"
          >
            <span className="flex items-center space-x-2.5 min-w-0">
              <Sigma className={`w-4 h-4 flex-shrink-0 ${activeModule === 'side_quest_sigma' ? 'text-white' : 'text-indigo-600'}`} />
              <span className="truncate">Quest 1: Sigma Sums</span>
            </span>
            <ChevronsRight className={`w-3.5 h-3.5 transition-transform ${activeModule === 'side_quest_sigma' ? 'translate-x-0.5' : 'opacity-0 group-hover:opacity-100'}`} />
          </button>

          <button
            onClick={() => setActiveModule('side_quest_gordon')}
            className={`w-full text-left px-3 py-2.5 rounded-xl transition-all font-sans text-xs sm:text-sm font-semibold flex items-center justify-between group ${
              activeModule === 'side_quest_gordon'
                ? 'bg-indigo-600 text-white shadow shadow-indigo-100'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
            }`}
            id="sidebar-nav-side-quest-gordon"
          >
            <span className="flex items-center space-x-2.5 min-w-0">
              <TrendingUp className={`w-4 h-4 flex-shrink-0 ${activeModule === 'side_quest_gordon' ? 'text-white' : 'text-indigo-600'}`} />
              <span className="truncate">Quest 2: Gordon Growth</span>
            </span>
            <ChevronsRight className={`w-3.5 h-3.5 transition-transform ${activeModule === 'side_quest_gordon' ? 'translate-x-0.5' : 'opacity-0 group-hover:opacity-100'}`} />
          </button>
        </nav>
      </div>
    </aside>
  );
}
