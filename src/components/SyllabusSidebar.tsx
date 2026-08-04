import React from 'react';
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
  Car,
  Home,
  Coins,
  Sparkles,
  BookMarked
} from 'lucide-react';
import { useMastery } from '../context/MasteryContext';

interface SyllabusSidebarProps {
  activeModule: string;
  setActiveModule: (module: string) => void;
}

export function SyllabusSidebar({ activeModule, setActiveModule }: SyllabusSidebarProps) {
  const { masteredUnits } = useMastery();

  const syllabusLessons = Object.values(LESSONS).filter(
    (les) => les.id !== 'glossary' && les.id !== 'comprehensiveQuiz'
  );

  return (
    <aside className="lg:col-span-3 space-y-4 mb-6 lg:mb-0">
      {/* Panel 1: Study Syllabus Hub */}
      <div className="bg-white border border-purple-200 rounded-2xl p-4 shadow-sm space-y-3.5">
        <h2 className="font-sans font-bold text-xs uppercase text-purple-700 tracking-wider pl-1">
          Study Syllabus Hub
        </h2>

        <nav className="space-y-1">
          <button
            onClick={() => setActiveModule('syllabus')}
            className={`w-full text-left px-3 py-2.5 rounded-xl transition-all font-sans text-xs sm:text-sm font-semibold flex items-center justify-between group ${
              activeModule === 'syllabus'
                ? 'bg-indigo-600 text-white'
                : 'text-slate-700 hover:bg-purple-50/80 hover:text-purple-950 border border-transparent'
            }`}
            id="sidebar-nav-syllabus"
          >
            <span className="flex items-center space-x-2.5">
              <BookOpen className="w-4 h-4 flex-shrink-0 text-purple-600" />
              <span>Syllabus Home</span>
            </span>
            <ChevronsRight className={`w-3.5 h-3.5 transition-transform ${activeModule === 'syllabus' ? 'translate-x-0.5' : 'opacity-0 group-hover:opacity-100'}`} />
          </button>

          <div className="h-px bg-purple-200/80 my-2" />

          {/* Module Items */}
          {syllabusLessons.map((les) => {
            const isSelected = activeModule === les.id;
            let stepIcon = <Clock className="w-4 h-4 flex-shrink-0" />;
            let unitNumber = 'Unknown';
            let unitTitle = 'Unknown Unit';

            if (les.id === 'compounding') {
              unitNumber = '1';
              unitTitle = 'Compound & NPV';
              stepIcon = <GraduationCap className="w-4 h-4 flex-shrink-0" />;
            } else if (les.id === 'rateSelection') {
              unitNumber = '2';
              unitTitle = 'Selecting the Rate (r)';
              stepIcon = <Landmark className="w-4 h-4 flex-shrink-0" />;
            } else if (les.id === 'stockBridge') {
              unitNumber = '3';
              unitTitle = 'Bridging to Stocks';
              stepIcon = <Briefcase className="w-4 h-4 flex-shrink-0" />;
            } else if (les.id === 'flatValuation') {
              unitNumber = '3.5';
              unitTitle = 'Zero-Growth Valuation';
              stepIcon = <Coins className="w-4 h-4 flex-shrink-0" />;
            } else if (les.id === 'valuation') {
              unitNumber = '4';
              unitTitle = 'Stock Price Valuation';
              stepIcon = <TrendingUp className="w-4 h-4 flex-shrink-0" />;
            } else if (les.id === 'newsBridge') {
              unitNumber = '5';
              unitTitle = 'Catalysts & News';
              stepIcon = <Zap className="w-4 h-4 flex-shrink-0" />;
            } else if (les.id === 'unit5R') {
              unitNumber = '5R';
              unitTitle = 'Units 1–5 Topic Review';
              stepIcon = <GraduationCap className="w-4 h-4 flex-shrink-0 text-indigo-500" />;
            } else if (les.id === 'stochastic') {
              unitNumber = '6';
              unitTitle = 'Stock Prices & Random Walks';
              stepIcon = <Activity className="w-4 h-4 flex-shrink-0" />;
            } else if (les.id === 'portfolio') {
              unitNumber = '7';
              unitTitle = 'Portfolio Diversification';
              stepIcon = <PieChart className="w-4 h-4 flex-shrink-0" />;
            } else if (les.id === 'behavioral') {
              unitNumber = '8';
              unitTitle = 'Behavioral Market Math';
              stepIcon = <Users className="w-4 h-4 flex-shrink-0" />;
            } else if (les.id === 'options') {
              unitNumber = 'A';
              unitTitle = 'Options & Payoffs';
              stepIcon = <LineChart className="w-4 h-4 flex-shrink-0" />;
            } else if (les.id === 'amortization') {
              unitNumber = 'B';
              unitTitle = 'Auto Loans & TCO';
              stepIcon = <Car className="w-4 h-4 flex-shrink-0" />;
            } else if (les.id === 'mortgage') {
              unitNumber = 'C';
              unitTitle = 'Mortgages & Homeownership';
              stepIcon = <Home className="w-4 h-4 flex-shrink-0" />;
            }

            const isUnitMastered = masteredUnits[les.id] === true;

            return (
              <button
                key={les.id}
                onClick={() => setActiveModule(les.id)}
                className={`w-full text-left px-3 py-2.5 rounded-xl transition-all font-sans text-xs sm:text-sm font-semibold flex items-center justify-between group ${
                  isSelected
                    ? 'bg-purple-950 text-white border-transparent shadow-xs'
                    : isUnitMastered
                    ? 'bg-emerald-50/80 text-emerald-950 border border-emerald-300/80 hover:bg-emerald-100/80'
                    : 'text-slate-700 hover:bg-purple-50/80 hover:text-purple-950 border border-transparent'
                }`}
                id={`sidebar-nav-${les.id}`}
              >
                <span className="flex items-center space-x-2.5 min-w-0">
                  <span className={isSelected ? 'text-purple-300' : 'text-purple-600'}>{stepIcon}</span>
                  <span className="truncate font-sans font-bold">
                    {les.id === 'options' || les.id === 'amortization' || les.id === 'mortgage'
                      ? `Bonus Unit ${unitNumber}`
                      : `Unit ${unitNumber}`}
                    : <span className={`font-semibold transition-colors ${isSelected ? 'text-purple-200' : 'text-slate-600 group-hover:text-purple-900'}`}>{unitTitle}</span>
                  </span>
                </span>
                {isUnitMastered ? (
                  <span className="text-xs" title="Unit Mastered">🏆</span>
                ) : (
                  <ChevronsRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'translate-x-0.5' : 'opacity-0 group-hover:opacity-100'}`} />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Panel 2: Reference and Review */}
      <div className="bg-white border border-purple-200 rounded-2xl p-4 shadow-sm space-y-3">
        <h2 className="font-sans font-bold text-xs uppercase text-purple-700 tracking-wider pl-1">
          Reference and Review
        </h2>
        <nav className="space-y-1">
          <button
            onClick={() => setActiveModule('glossary')}
            className={`w-full text-left px-3 py-2.5 rounded-xl transition-all font-sans text-xs sm:text-sm font-semibold flex items-center justify-between group ${
              activeModule === 'glossary'
                ? 'bg-purple-950 text-white border-transparent shadow-xs'
                : 'text-slate-700 hover:bg-purple-50/80 hover:text-purple-950 border border-transparent'
            }`}
            id="sidebar-nav-glossary"
          >
            <span className="flex items-center space-x-2.5 min-w-0">
              <BookMarked className={`w-4 h-4 flex-shrink-0 ${activeModule === 'glossary' ? 'text-purple-300' : 'text-purple-600'}`} />
              <span className="truncate font-sans font-bold">Glossary</span>
            </span>
            <ChevronsRight className={`w-3.5 h-3.5 transition-transform ${activeModule === 'glossary' ? 'translate-x-0.5' : 'opacity-0 group-hover:opacity-100'}`} />
          </button>

          <button
            onClick={() => setActiveModule('comprehensiveQuiz')}
            className={`w-full text-left px-3 py-2.5 rounded-xl transition-all font-sans text-xs sm:text-sm font-semibold flex items-center justify-between group ${
              activeModule === 'comprehensiveQuiz'
                ? 'bg-amber-500 text-slate-950 shadow-xs font-bold'
                : 'bg-amber-50/80 text-amber-950 border border-amber-300/80 hover:bg-amber-100/90'
            }`}
            id="sidebar-nav-comprehensiveQuiz"
          >
            <span className="flex items-center space-x-2.5 min-w-0">
              <Sparkles className={`w-4 h-4 flex-shrink-0 ${activeModule === 'comprehensiveQuiz' ? 'text-slate-950' : 'text-amber-600'}`} />
              <span className="truncate font-sans font-bold">Daily Review</span>
            </span>
            <ChevronsRight className={`w-3.5 h-3.5 transition-transform ${activeModule === 'comprehensiveQuiz' ? 'translate-x-0.5' : 'opacity-0 group-hover:opacity-100'}`} />
          </button>
        </nav>
      </div>

      {/* Panel 3: Advanced Math Quests */}
      <div className="bg-white border border-purple-200 rounded-2xl p-4 shadow-sm space-y-3">
        <h2 className="font-sans font-bold text-xs uppercase text-purple-700 tracking-wider pl-1">
          Advanced Math Quests
        </h2>
        <nav className="space-y-1">
          <button
            onClick={() => setActiveModule('side_quest_sigma')}
            className={`w-full text-left px-3 py-2.5 rounded-xl transition-all font-sans text-xs sm:text-sm font-semibold flex items-center justify-between group ${
              activeModule === 'side_quest_sigma'
                ? 'bg-purple-950 text-white shadow-xs'
                : masteredUnits['side_quest_sigma']
                ? 'bg-emerald-50/80 text-emerald-950 border border-emerald-300/80 hover:bg-emerald-100/80'
                : 'text-slate-700 hover:bg-purple-50/80 hover:text-purple-950 border border-transparent'
            }`}
            id="sidebar-nav-side-quest-sigma"
          >
            <span className="flex items-center space-x-2.5 min-w-0">
              <Sigma className={`w-4 h-4 flex-shrink-0 ${activeModule === 'side_quest_sigma' ? 'text-purple-300' : 'text-purple-600'}`} />
              <span className="truncate">Quest 1: Sigma Sums</span>
            </span>
            {masteredUnits['side_quest_sigma'] ? (
              <span className="text-xs" title="Quest Mastered">🏆</span>
            ) : (
              <ChevronsRight className={`w-3.5 h-3.5 transition-transform ${activeModule === 'side_quest_sigma' ? 'translate-x-0.5' : 'opacity-0 group-hover:opacity-100'}`} />
            )}
          </button>

          <button
            onClick={() => setActiveModule('side_quest_geometric')}
            className={`w-full text-left px-3 py-2.5 rounded-xl transition-all font-sans text-xs sm:text-sm font-semibold flex items-center justify-between group ${
              activeModule === 'side_quest_geometric'
                ? 'bg-purple-950 text-white shadow-xs'
                : masteredUnits['side_quest_geometric']
                ? 'bg-emerald-50/80 text-emerald-950 border border-emerald-300/80 hover:bg-emerald-100/80'
                : 'text-slate-700 hover:bg-purple-50/80 hover:text-purple-950 border border-transparent'
            }`}
            id="sidebar-nav-side-quest-geometric"
          >
            <span className="flex items-center space-x-2.5 min-w-0">
              <TrendingUp className={`w-4 h-4 flex-shrink-0 ${activeModule === 'side_quest_geometric' ? 'text-purple-300' : 'text-purple-600'}`} />
              <span className="truncate">Quest 2: Geometric Series</span>
            </span>
            {masteredUnits['side_quest_geometric'] ? (
              <span className="text-xs" title="Quest Mastered">🏆</span>
            ) : (
              <ChevronsRight className={`w-3.5 h-3.5 transition-transform ${activeModule === 'side_quest_geometric' ? 'translate-x-0.5' : 'opacity-0 group-hover:opacity-100'}`} />
            )}
          </button>

          <button
            onClick={() => setActiveModule('side_quest_gordon')}
            className={`w-full text-left px-3 py-2.5 rounded-xl transition-all font-sans text-xs sm:text-sm font-semibold flex items-center justify-between group ${
              activeModule === 'side_quest_gordon'
                ? 'bg-purple-950 text-white shadow-xs'
                : masteredUnits['side_quest_gordon']
                ? 'bg-emerald-50/80 text-emerald-950 border border-emerald-300/80 hover:bg-emerald-100/80'
                : 'text-slate-700 hover:bg-purple-50/80 hover:text-purple-950 border border-transparent'
            }`}
            id="sidebar-nav-side-quest-gordon"
          >
            <span className="flex items-center space-x-2.5 min-w-0">
              <TrendingUp className={`w-4 h-4 flex-shrink-0 ${activeModule === 'side_quest_gordon' ? 'text-purple-300' : 'text-purple-600'}`} />
              <span className="truncate">Quest 3: Gordon Growth</span>
            </span>
            {masteredUnits['side_quest_gordon'] ? (
              <span className="text-xs" title="Quest Mastered">🏆</span>
            ) : (
              <ChevronsRight className={`w-3.5 h-3.5 transition-transform ${activeModule === 'side_quest_gordon' ? 'translate-x-0.5' : 'opacity-0 group-hover:opacity-100'}`} />
            )}
          </button>

          <button
            onClick={() => setActiveModule('side_quest_pi')}
            className={`w-full text-left px-3 py-2.5 rounded-xl transition-all font-sans text-xs sm:text-sm font-semibold flex items-center justify-between group ${
              activeModule === 'side_quest_pi'
                ? 'bg-purple-950 text-white shadow-xs'
                : masteredUnits['side_quest_pi']
                ? 'bg-emerald-50/80 text-emerald-950 border border-emerald-300/80 hover:bg-emerald-100/80'
                : 'text-slate-700 hover:bg-purple-50/80 hover:text-purple-950 border border-transparent'
            }`}
            id="sidebar-nav-side-quest-pi"
          >
            <span className="flex items-center space-x-2.5 min-w-0">
              <span className={`w-4 h-4 flex-shrink-0 font-mono font-bold text-xs flex items-center justify-center ${activeModule === 'side_quest_pi' ? 'text-purple-300' : 'text-purple-600'}`}>∏</span>
              <span className="truncate">Quest 3.5: Capital Pi (∏)</span>
            </span>
            {masteredUnits['side_quest_pi'] ? (
              <span className="text-xs" title="Quest Mastered">🏆</span>
            ) : (
              <ChevronsRight className={`w-3.5 h-3.5 transition-transform ${activeModule === 'side_quest_pi' ? 'translate-x-0.5' : 'opacity-0 group-hover:opacity-100'}`} />
            )}
          </button>

          <button
            onClick={() => setActiveModule('side_quest_variance')}
            className={`w-full text-left px-3 py-2.5 rounded-xl transition-all font-sans text-xs sm:text-sm font-semibold flex items-center justify-between group ${
              activeModule === 'side_quest_variance'
                ? 'bg-purple-950 text-white shadow-xs'
                : masteredUnits['side_quest_variance']
                ? 'bg-emerald-50/80 text-emerald-950 border border-emerald-300/80 hover:bg-emerald-100/80'
                : 'text-slate-700 hover:bg-purple-50/80 hover:text-purple-950 border border-transparent'
            }`}
            id="sidebar-nav-side-quest-variance"
          >
            <span className="flex items-center space-x-2.5 min-w-0">
              <Activity className={`w-4 h-4 flex-shrink-0 ${activeModule === 'side_quest_variance' ? 'text-purple-300' : 'text-purple-600'}`} />
              <span className="truncate">Quest 4: Variance & Covariance</span>
            </span>
            {masteredUnits['side_quest_variance'] ? (
              <span className="text-xs" title="Quest Mastered">🏆</span>
            ) : (
              <ChevronsRight className={`w-3.5 h-3.5 transition-transform ${activeModule === 'side_quest_variance' ? 'translate-x-0.5' : 'opacity-0 group-hover:opacity-100'}`} />
            )}
          </button>
        </nav>
      </div>
    </aside>
  );
}
