import React, { useState, useMemo, useEffect } from 'react';
import { ALL_COLLATED_QUIZZES, CollatedQuizQuestion } from '../data/comprehensiveQuizData';
import { 
  CheckCircle, 
  AlertCircle, 
  HelpCircle, 
  RefreshCw, 
  Zap, 
  BookOpen, 
  Award, 
  Filter, 
  Sparkles,
  Search,
  ExternalLink,
  RotateCcw,
  Eye,
  EyeOff,
  CheckCircle2
} from 'lucide-react';
import { processMathText } from '../lib/math';
import { useMastery } from '../context/MasteryContext';

interface ComprehensiveQuizLabProps {
  setActiveModule: (module: string) => void;
}

export const ComprehensiveQuizLab: React.FC<ComprehensiveQuizLabProps> = ({ setActiveModule }) => {
  const { progress, masteredUnits, submitAnswer, resetQuestion, resetAll } = useMastery();
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submittedAnswers, setSubmittedAnswers] = useState<Record<string, boolean>>({});
  const [showHints, setShowHints] = useState<Record<string, boolean>>({});
  const [unitFilter, setUnitFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'unattempted' | 'correct' | 'incorrect'>('all');
  const [masteryFilter, setMasteryFilter] = useState<'all' | 'unmastered' | 'mastered'>('all');
  const [hideMastered, setHideMastered] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isDailyRefresh, setIsDailyRefresh] = useState<boolean>(false);
  const [dailyRefreshSeed, setDailyRefreshSeed] = useState<number>(1);

  // Sync saved state from context progress
  useEffect(() => {
    const selMap: Record<string, number> = {};
    const subMap: Record<string, boolean> = {};

    ALL_COLLATED_QUIZZES.forEach(q => {
      if (progress[q.id]) {
        selMap[q.id] = progress[q.id].userIndex;
        subMap[q.id] = true;
      }
    });

    setSelectedAnswers(selMap);
    setSubmittedAnswers(subMap);
  }, [progress]);

  // Unit categories definition
  const unitCategories = [
    { id: 'all', label: 'All Units', count: ALL_COLLATED_QUIZZES.length },
    { id: 'compounding', label: 'Unit 1: Compounding & NPV', count: ALL_COLLATED_QUIZZES.filter(q => q.unitId === 'compounding').length },
    { id: 'rateSelection', label: 'Unit 2: Discount Rates (r)', count: ALL_COLLATED_QUIZZES.filter(q => q.unitId === 'rateSelection').length },
    { id: 'stockBridge', label: 'Unit 3: Stock Ownership', count: ALL_COLLATED_QUIZZES.filter(q => q.unitId === 'stockBridge').length },
    { id: 'flatValuation', label: 'Unit 3.5: Zero-Growth Valuation', count: ALL_COLLATED_QUIZZES.filter(q => q.unitId === 'flatValuation').length },
    { id: 'valuation', label: 'Unit 4: Gordon Growth', count: ALL_COLLATED_QUIZZES.filter(q => q.unitId === 'valuation').length },
    { id: 'newsBridge', label: 'Unit 5: News Shocks', count: ALL_COLLATED_QUIZZES.filter(q => q.unitId === 'newsBridge').length },
    { id: 'stochastic', label: 'Unit 6: Stochastic Math', count: ALL_COLLATED_QUIZZES.filter(q => q.unitId === 'stochastic').length },
    { id: 'portfolio', label: 'Unit 7: Portfolio Theory', count: ALL_COLLATED_QUIZZES.filter(q => q.unitId === 'portfolio').length },
    { id: 'behavioral', label: 'Unit 8: Behavioral Finance', count: ALL_COLLATED_QUIZZES.filter(q => q.unitId === 'behavioral').length },
    { id: 'options', label: 'Bonus Unit A: Options & Payoffs', count: ALL_COLLATED_QUIZZES.filter(q => q.unitId === 'options').length },
    { id: 'amortization', label: 'Bonus Unit B: Auto Loans', count: ALL_COLLATED_QUIZZES.filter(q => q.unitId === 'amortization').length },
    { id: 'mortgage', label: 'Bonus Unit C: Mortgages & Equity', count: ALL_COLLATED_QUIZZES.filter(q => q.unitId === 'mortgage').length },
    { id: 'side_quest_sigma', label: 'Quest 1: Sigma Notation', count: ALL_COLLATED_QUIZZES.filter(q => q.unitId === 'side_quest_sigma').length },
    { id: 'side_quest_geometric', label: 'Quest 2: Geometric Series', count: ALL_COLLATED_QUIZZES.filter(q => q.unitId === 'side_quest_geometric').length },
    { id: 'side_quest_gordon', label: 'Quest 3: Gordon Derivation', count: ALL_COLLATED_QUIZZES.filter(q => q.unitId === 'side_quest_gordon').length }
  ];

  // List of all 14 unit IDs
  const allUnitIds = useMemo(() => {
    return unitCategories.filter(c => c.id !== 'all').map(c => c.id);
  }, []);

  const masteredCount = useMemo(() => {
    return allUnitIds.filter(id => masteredUnits[id] === true).length;
  }, [allUnitIds, masteredUnits]);

  // Daily Refresh Questions generator (8 randomly sampled questions across distinct units)
  const dailyRefreshQuestions = useMemo(() => {
    if (!isDailyRefresh) return ALL_COLLATED_QUIZZES;
    
    // Pseudo-random deterministic sampling based on seed
    const shuffled = [...ALL_COLLATED_QUIZZES].sort((a, b) => {
      const hashA = (a.id.length * 31 + a.question.length * 17 + dailyRefreshSeed * 13) % 100;
      const hashB = (b.id.length * 31 + b.question.length * 17 + dailyRefreshSeed * 13) % 100;
      return hashA - hashB;
    });

    return shuffled.slice(0, 8);
  }, [isDailyRefresh, dailyRefreshSeed]);

  // Filter questions based on selections
  const filteredQuestions = useMemo(() => {
    return dailyRefreshQuestions.filter(q => {
      // Hide Mastered Units or Mastered Filter logic
      const isUnitMastered = masteredUnits[q.unitId] === true;

      if (hideMastered && isUnitMastered) {
        return false;
      }

      if (masteryFilter === 'unmastered' && isUnitMastered) {
        return false;
      }

      if (masteryFilter === 'mastered' && !isUnitMastered) {
        return false;
      }

      // Unit filter
      if (unitFilter !== 'all' && q.unitId !== unitFilter) {
        return false;
      }

      // Search filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const inQuestion = q.question.toLowerCase().includes(query);
        const inUnit = q.unitName.toLowerCase().includes(query);
        const inOptions = q.options.some(opt => opt.toLowerCase().includes(query));
        if (!inQuestion && !inUnit && !inOptions) return false;
      }

      // Status filter
      const isSubmitted = submittedAnswers[q.id] === true;
      const userSelIdx = selectedAnswers[q.id];
      const isCorrect = isSubmitted && userSelIdx === q.correctIndex;

      if (statusFilter === 'unattempted' && isSubmitted) return false;
      if (statusFilter === 'correct' && (!isSubmitted || !isCorrect)) return false;
      if (statusFilter === 'incorrect' && (!isSubmitted || isCorrect)) return false;

      return true;
    });
  }, [dailyRefreshQuestions, unitFilter, statusFilter, masteryFilter, hideMastered, searchQuery, submittedAnswers, selectedAnswers, masteredUnits]);

  // Calculate score statistics
  const totalQuestionsCount = ALL_COLLATED_QUIZZES.length;
  const submittedIds = Object.keys(submittedAnswers);
  const totalSubmitted = submittedIds.length;
  const correctCount = submittedIds.filter(id => {
    const q = ALL_COLLATED_QUIZZES.find(item => item.id === id);
    return q && selectedAnswers[id] === q.correctIndex;
  }).length;
  
  const accuracyPercentage = totalSubmitted > 0 ? Math.round((correctCount / totalSubmitted) * 100) : 0;
  const masteryPercentage = Math.round((correctCount / totalQuestionsCount) * 100);

  const handleOptionSelect = (quizId: string, idx: number) => {
    if (submittedAnswers[quizId]) return;
    setSelectedAnswers(prev => ({ ...prev, [quizId]: idx }));
  };

  const handleCheckAnswer = (quizId: string) => {
    const userSelIdx = selectedAnswers[quizId];
    if (userSelIdx === undefined) return;

    const quiz = ALL_COLLATED_QUIZZES.find(q => q.id === quizId);
    if (!quiz) return;

    setSubmittedAnswers(prev => ({ ...prev, [quizId]: true }));
    submitAnswer(quizId, userSelIdx, quiz.correctIndex, quiz.unitId);
  };

  const handleResetQuestion = (quizId: string) => {
    const quiz = ALL_COLLATED_QUIZZES.find(q => q.id === quizId);
    resetQuestion(quizId, quiz?.unitId);

    setSelectedAnswers(prev => {
      const copy = { ...prev };
      delete copy[quizId];
      return copy;
    });
    setSubmittedAnswers(prev => {
      const copy = { ...prev };
      delete copy[quizId];
      return copy;
    });
    setShowHints(prev => {
      const copy = { ...prev };
      delete copy[quizId];
      return copy;
    });
  };

  const handleResetAllProgress = () => {
    if (window.confirm('Are you sure you want to reset your score progress and unit mastery across all questions?')) {
      resetAll();
      setSelectedAnswers({});
      setSubmittedAnswers({});
      setShowHints({});
    }
  };

  const handleTriggerDailyRefresh = () => {
    setIsDailyRefresh(true);
    setDailyRefreshSeed(prev => prev + 1);
    setUnitFilter('all');
    setStatusFilter('all');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner & Mastery Dashboard */}
      <div className="p-6 sm:p-8 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 text-white rounded-3xl shadow-sm border border-indigo-950 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-indigo-900/60 pb-5">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2 font-mono text-xs text-indigo-400 uppercase tracking-wider font-bold">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Full Curriculum Mastery Hub</span>
              <span>•</span>
              <span>38 Exercises</span>
              <span>•</span>
              <span className="text-emerald-400">{masteredCount} / 14 Units Mastered</span>
            </div>
            <h2 className="font-sans font-extrabold text-2xl sm:text-3xl tracking-tight text-white">
              Comprehensive Review Quiz
            </h2>
            <p className="font-sans text-xs sm:text-sm text-indigo-200/80 max-w-2xl">
              Collates all problem sets across Units 1–9, Bonus Unit, and Math Quests into a single daily retrieval practice engine. Refresh your memory every morning before study sessions.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleTriggerDailyRefresh}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold font-mono transition-all flex items-center space-x-1.5 cursor-pointer shadow-sm ${
                isDailyRefresh
                  ? 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>{isDailyRefresh ? 'Refresh Daily 8 Set ⚡' : 'Daily Refresh Warm-Up ⚡'}</span>
            </button>

            {isDailyRefresh && (
              <button
                onClick={() => setIsDailyRefresh(false)}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold font-mono rounded-xl transition-all border border-slate-700 cursor-pointer"
              >
                View All (38)
              </button>
            )}

            <button
              onClick={handleResetAllProgress}
              className="px-3 py-2 bg-slate-800/80 hover:bg-rose-950 hover:text-rose-200 text-slate-300 text-xs font-bold font-mono rounded-xl transition-all border border-slate-700/80 flex items-center space-x-1 cursor-pointer"
              title="Reset all answer tracking"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Real-time Mastery Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5 pt-1">
          <div className="bg-slate-900/80 border border-indigo-900/50 p-3.5 rounded-2xl">
            <span className="text-[10px] font-mono text-indigo-300 uppercase tracking-wider block font-semibold">
              Units Mastered
            </span>
            <div className="text-xl sm:text-2xl font-extrabold font-sans text-amber-300 mt-1 flex items-center gap-1.5">
              <span>{masteredCount}</span>
              <span className="text-xs text-slate-400 font-normal">/ 14 Units</span>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-indigo-900/50 p-3.5 rounded-2xl">
            <span className="text-[10px] font-mono text-indigo-300 uppercase tracking-wider block font-semibold">
              Correct Exercises
            </span>
            <div className="text-xl sm:text-2xl font-extrabold font-sans text-emerald-400 mt-1">
              {correctCount} <span className="text-xs text-slate-400 font-normal">/ {totalQuestionsCount}</span>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-indigo-900/50 p-3.5 rounded-2xl">
            <span className="text-[10px] font-mono text-indigo-300 uppercase tracking-wider block font-semibold">
              Attempted Rate
            </span>
            <div className="text-xl sm:text-2xl font-extrabold font-sans text-white mt-1">
              {totalSubmitted} <span className="text-xs text-slate-400 font-normal">/ {totalQuestionsCount}</span>
            </div>
          </div>

          <div className="bg-slate-900/80 border border-indigo-900/50 p-3.5 rounded-2xl">
            <span className="text-[10px] font-mono text-indigo-300 uppercase tracking-wider block font-semibold">
              Accuracy Rate
            </span>
            <div className="text-xl sm:text-2xl font-extrabold font-sans text-indigo-300 mt-1">
              {accuracyPercentage}%
            </div>
          </div>

          <div className="bg-slate-900/80 border border-indigo-900/50 p-3.5 rounded-2xl col-span-2 sm:col-span-1">
            <span className="text-[10px] font-mono text-indigo-300 uppercase tracking-wider block font-semibold">
              Question Progress
            </span>
            <div className="text-xl sm:text-2xl font-extrabold font-sans text-amber-300 mt-1">
              {masteryPercentage}%
            </div>
          </div>
        </div>

        {/* Visual Progress Bar */}
        <div className="space-y-1.5 pt-1">
          <div className="flex justify-between items-center text-xs font-mono text-indigo-300">
            <span>Curriculum Progress ({masteredCount} of 14 Units Mastered)</span>
            <span>{correctCount} Solved Correctly</span>
          </div>
          <div className="w-full bg-slate-800/90 h-2.5 rounded-full overflow-hidden border border-indigo-900/40">
            <div 
              className="bg-gradient-to-r from-indigo-500 via-emerald-400 to-amber-400 h-full transition-all duration-500 rounded-full" 
              style={{ width: `${Math.max(2, (correctCount / totalQuestionsCount) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Control Panel: Filters & Unit Tabs */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm space-y-4">
        {/* Search Bar & Status Filter Pill Row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search problem keywords, formulas, or concepts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm font-sans text-slate-800 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all"
            />
          </div>

          {/* Status Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1 rounded-xl font-mono text-xs">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-2.5 py-1.5 rounded-lg transition-all font-semibold whitespace-nowrap cursor-pointer ${
                statusFilter === 'all'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({ALL_COLLATED_QUIZZES.length})
            </button>
            <button
              onClick={() => setStatusFilter('unattempted')}
              className={`px-2.5 py-1.5 rounded-lg transition-all font-semibold whitespace-nowrap cursor-pointer ${
                statusFilter === 'unattempted'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Unattempted ({ALL_COLLATED_QUIZZES.length - totalSubmitted})
            </button>
            <button
              onClick={() => setStatusFilter('correct')}
              className={`px-2.5 py-1.5 rounded-lg transition-all font-semibold whitespace-nowrap cursor-pointer ${
                statusFilter === 'correct'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-emerald-700 hover:text-emerald-900'
              }`}
            >
              Correct ✓ ({correctCount})
            </button>
            <button
              onClick={() => setStatusFilter('incorrect')}
              className={`px-2.5 py-1.5 rounded-lg transition-all font-semibold whitespace-nowrap cursor-pointer ${
                statusFilter === 'incorrect'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-rose-700 hover:text-rose-900'
              }`}
            >
              Needs Review ({totalSubmitted - correctCount})
            </button>
          </div>
        </div>

        {/* Unit Mastery Filter Toggle Bar */}
        <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider flex items-center space-x-1.5">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span>Unit Mastery Filter:</span>
            </span>
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-sans">
              <button
                onClick={() => setMasteryFilter('all')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                  masteryFilter === 'all'
                    ? 'bg-white text-slate-900 shadow-xs font-bold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Exercises
              </button>
              <button
                onClick={() => setMasteryFilter('unmastered')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                  masteryFilter === 'unmastered'
                    ? 'bg-indigo-600 text-white shadow-xs font-bold'
                    : 'text-indigo-700 hover:text-indigo-900'
                }`}
              >
                🎯 Unmastered Units Only
              </button>
              <button
                onClick={() => setMasteryFilter('mastered')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
                  masteryFilter === 'mastered'
                    ? 'bg-emerald-600 text-white shadow-xs font-bold'
                    : 'text-emerald-700 hover:text-emerald-900'
                }`}
              >
                🏆 Mastered Units Only ({masteredCount})
              </button>
            </div>
          </div>

          <button
            onClick={() => setHideMastered(!hideMastered)}
            className={`px-3 py-1.5 rounded-xl text-xs font-sans font-bold transition-all border flex items-center space-x-1.5 cursor-pointer ${
              hideMastered
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300 shadow-xs'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
            }`}
          >
            {hideMastered ? <EyeOff className="w-3.5 h-3.5 text-emerald-600" /> : <Eye className="w-3.5 h-3.5 text-slate-500" />}
            <span>{hideMastered ? `Filter Out Mastered Units (${masteredCount} Hidden)` : 'Filter Out Mastered Units'}</span>
          </button>
        </div>

        {/* Unit Selector Tabs */}
        <div className="pt-2 border-t border-slate-100">
          <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
            <Filter className="w-3.5 h-3.5 text-indigo-600" />
            <span>Filter Exercises by Academic Unit</span>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 pt-1">
            {unitCategories.map(cat => {
              const isCatSelected = unitFilter === cat.id;
              const isUnitMastered = cat.id !== 'all' && masteredUnits[cat.id] === true;

              return (
                <button
                  key={cat.id}
                  onClick={() => setUnitFilter(cat.id)}
                  className={`px-3 py-1.5 rounded-xl font-sans text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center space-x-1.5 border ${
                    isCatSelected
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                      : isUnitMastered
                        ? 'bg-emerald-50 text-emerald-900 border-emerald-200 hover:bg-emerald-100'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {isUnitMastered && <span className="text-xs">🏆</span>}
                  <span>{cat.label}</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                    isCatSelected 
                      ? 'bg-indigo-500 text-white' 
                      : isUnitMastered 
                        ? 'bg-emerald-200 text-emerald-900' 
                        : 'bg-slate-200 text-slate-700'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-1">
          <h4 className="font-sans font-bold text-slate-800 text-sm flex items-center space-x-2">
            <BookOpen className="w-4 h-4 text-indigo-600" />
            <span>
              {isDailyRefresh ? '⚡ Daily Warm-Up Refresh Set' : 'Curriculum Question Bank'}
            </span>
          </h4>
          <span className="font-mono text-xs text-slate-500">
            Showing {filteredQuestions.length} of {ALL_COLLATED_QUIZZES.length} exercises
          </span>
        </div>

        {filteredQuestions.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-3">
            <AlertCircle className="w-10 h-10 text-slate-300 mx-auto" />
            <h5 className="font-sans font-bold text-slate-700 text-base">
              No matching exercises found
            </h5>
            <p className="font-sans text-xs text-slate-500 max-w-md mx-auto">
              {hideMastered || masteryFilter === 'unmastered'
                ? 'All exercises in the selected filter belong to Mastered units! Switch your filter or uncheck "Filter Out Mastered Units" to view completed units.'
                : 'Try selecting a different unit filter or clearing your search term to view exercises.'}
            </p>
            <button
              onClick={() => {
                setUnitFilter('all');
                setStatusFilter('all');
                setMasteryFilter('all');
                setHideMastered(false);
                setSearchQuery('');
                setIsDailyRefresh(false);
              }}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold font-mono rounded-xl transition-all cursor-pointer"
            >
              Reset Filters & Show All
            </button>
          </div>
        ) : (
          filteredQuestions.map((quiz, qIdx) => {
            const isSelected = selectedAnswers[quiz.id] !== undefined;
            const isSubmitted = submittedAnswers[quiz.id] === true;
            const userSelIdx = selectedAnswers[quiz.id];
            const isCorrectResponse = userSelIdx === quiz.correctIndex;
            const hasHint = !!quiz.hint;
            const showHint = showHints[quiz.id];
            const isQuestionUnitMastered = masteredUnits[quiz.unitId] === true;

            return (
              <div
                key={quiz.id}
                className={`p-5 sm:p-6 rounded-2xl border transition-all ${
                  isSubmitted
                    ? isCorrectResponse
                      ? 'bg-emerald-50/40 border-emerald-200 shadow-sm'
                      : 'bg-red-50/40 border-red-200 shadow-sm'
                    : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                {/* Header Tag Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 border border-indigo-100 px-2.5 py-1 rounded-lg">
                      Problem #{qIdx + 1}
                    </span>
                    <span className="font-sans text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                      {quiz.unitName}
                    </span>
                    {isQuestionUnitMastered && (
                      <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                        <Award className="w-3 h-3 text-emerald-600" />
                        <span>🏆 Unit Mastered</span>
                      </span>
                    )}
                  </div>

                  <div className="flex items-center space-x-3">
                    {/* Link directly to lesson unit */}
                    {quiz.unitId && !quiz.unitId.startsWith('side_quest') && (
                      <button
                        onClick={() => setActiveModule(quiz.unitId)}
                        className="flex items-center space-x-1 text-xs font-mono font-bold text-indigo-600 hover:text-indigo-800 bg-indigo-50/50 hover:bg-indigo-100 px-2 py-1 rounded-md transition-colors cursor-pointer"
                        title="Open full lesson narrative and lab for this unit"
                      >
                        <span>Study Lesson</span>
                        <ExternalLink className="w-3 h-3" />
                      </button>
                    )}

                    {hasHint && !isSubmitted && (
                      <button
                        onClick={() => setShowHints(p => ({ ...p, [quiz.id]: !showHint }))}
                        className="flex items-center space-x-1 text-slate-500 hover:text-indigo-600 font-medium text-xs font-sans transition-colors cursor-pointer"
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>{showHint ? 'Hide Hint' : 'Show Hint'}</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Question Statement */}
                <p className="font-sans font-semibold text-slate-800 text-sm sm:text-base mt-4 leading-relaxed">
                  {processMathText(quiz.question)}
                </p>

                {/* Pedagogical Hint Box */}
                {showHint && !isSubmitted && (
                  <div className="mt-3 p-3 bg-amber-50 border border-amber-200/60 rounded-xl text-xs text-amber-900 font-sans leading-relaxed animate-fadeIn">
                    <span className="font-semibold block mb-0.5 text-amber-950">Pedagogical Hint:</span>
                    {processMathText(quiz.hint || '')}
                  </div>
                )}

                {/* Choice Alternatives */}
                <div className="mt-4 space-y-2.5">
                  {quiz.options.map((opt, oIdx) => {
                    const isOptSelected = userSelIdx === oIdx;

                    let optStyle = 'border-slate-200 hover:bg-slate-50 text-slate-700';

                    if (isSubmitted) {
                      if (oIdx === quiz.correctIndex) {
                        optStyle = 'border-emerald-400 bg-emerald-50 text-emerald-950 font-medium';
                      } else if (isOptSelected && !isCorrectResponse) {
                        optStyle = 'border-red-400 bg-red-100/50 text-red-950 font-medium';
                      } else {
                        optStyle = 'border-slate-200 opacity-60 text-slate-500';
                      }
                    } else if (isOptSelected) {
                      optStyle = 'border-indigo-600 bg-indigo-50 text-indigo-950';
                    }

                    return (
                      <button
                        key={oIdx}
                        onClick={() => handleOptionSelect(quiz.id, oIdx)}
                        disabled={isSubmitted}
                        className={`w-full p-3.5 text-left border rounded-xl text-xs sm:text-sm transition-all focus:outline-none flex items-center justify-between ${optStyle} ${
                          !isSubmitted ? 'cursor-pointer' : 'cursor-default'
                        }`}
                      >
                        <span className="font-sans">{processMathText(opt)}</span>
                        {isSubmitted && oIdx === quiz.correctIndex && (
                          <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 ml-2" />
                        )}
                        {isSubmitted && isOptSelected && !isCorrectResponse && (
                          <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 ml-2" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Action Controls & Result Status */}
                <div className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-4 border-t border-slate-100">
                  <div>
                    {!isSubmitted ? (
                      <button
                        onClick={() => handleCheckAnswer(quiz.id)}
                        disabled={!isSelected}
                        className={`px-4 py-2 text-xs font-bold rounded-lg font-mono transition-colors shadow-sm ${
                          isSelected
                            ? 'bg-slate-900 hover:bg-slate-800 text-white cursor-pointer'
                            : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        Submit Answer
                      </button>
                    ) : (
                      <button
                        onClick={() => handleResetQuestion(quiz.id)}
                        className="px-4 py-2 border border-slate-300 text-slate-600 hover:text-slate-800 text-xs font-bold rounded-lg font-mono transition-all flex items-center space-x-1 hover:bg-slate-50 cursor-pointer"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>Re-Solve Problem</span>
                      </button>
                    )}
                  </div>

                  {isSubmitted && (
                    <div className={`text-xs font-sans font-medium flex items-center space-x-1.5 ${isCorrectResponse ? 'text-emerald-700' : 'text-red-700'}`}>
                      {isCorrectResponse ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-emerald-600" />
                          <span>Mathematical derivation correct!</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-4 h-4 text-red-500" />
                          <span>Answer mismatch. Review derivation proof below.</span>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* Analytical Proof Box */}
                {isSubmitted && (
                  <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 font-sans leading-relaxed animate-fadeIn">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-slate-800 text-xs block uppercase tracking-wider">
                        Step-by-Step Analytical Proof
                      </span>
                      {quiz.unitId && !quiz.unitId.startsWith('side_quest') && (
                        <button
                          onClick={() => setActiveModule(quiz.unitId)}
                          className="text-[10px] font-mono font-bold text-indigo-600 hover:underline flex items-center space-x-1 cursor-pointer"
                        >
                          <span>Review {quiz.unitName}</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </button>
                      )}
                    </div>
                    <div className="text-xs text-slate-600 space-y-2">
                      <p className="font-sans font-medium text-slate-700 block whitespace-pre-line">
                        {processMathText(quiz.explanation)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ComprehensiveQuizLab;
