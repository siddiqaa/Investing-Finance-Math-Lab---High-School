import React, { useState, useEffect } from 'react';
import { QuizQuestion } from '../types';
import { CheckCircle, AlertCircle, HelpCircle, RefreshCw, Award, Sparkles } from 'lucide-react';
import { processMathText } from '../lib/math';
import { useMastery } from '../context/MasteryContext';

interface QuizSectionProps {
  quizzes: QuizQuestion[];
  moduleName: string;
  unitId?: string;
}

export const QuizSection: React.FC<QuizSectionProps> = ({ quizzes, moduleName, unitId }) => {
  const { progress, masteredUnits, submitAnswer, resetQuestion } = useMastery();
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submittedAnswers, setSubmittedAnswers] = useState<Record<string, boolean>>({});
  const [showHints, setShowHints] = useState<Record<string, boolean>>({});

  // Sync saved state from context progress on mount or when progress changes
  useEffect(() => {
    const selMap: Record<string, number> = {};
    const subMap: Record<string, boolean> = {};

    quizzes.forEach(q => {
      if (progress[q.id]) {
        selMap[q.id] = progress[q.id].userIndex;
        subMap[q.id] = true;
      }
    });

    setSelectedAnswers(selMap);
    setSubmittedAnswers(subMap);
  }, [quizzes, progress]);

  const isMastered = unitId 
    ? !!masteredUnits[unitId] 
    : (quizzes.length > 0 && quizzes.every(q => progress[q.id]?.isCorrect === true));

  const handleOptionSelect = (quizId: string, idx: number) => {
    if (submittedAnswers[quizId]) return; // locked after checking
    setSelectedAnswers(prev => ({ ...prev, [quizId]: idx }));
  };

  const handleCheckAnswer = (quizId: string) => {
    const userSelIdx = selectedAnswers[quizId];
    if (userSelIdx === undefined) return;

    const quiz = quizzes.find(q => q.id === quizId);
    if (!quiz) return;

    setSubmittedAnswers(prev => ({ ...prev, [quizId]: true }));
    submitAnswer(quizId, userSelIdx, quiz.correctIndex, unitId);
  };

  const handleResetQuiz = (quizId: string) => {
    resetQuestion(quizId, unitId);

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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <h4 className="font-sans font-bold text-slate-800 text-base">
              {quizzes.length > 0 ? `${moduleName} — Mathematical Challenges` : `${moduleName} — Unit Review`}
            </h4>
            {isMastered && (
              <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                <Award className="w-3.5 h-3.5 text-emerald-600" />
                <span>🏆 Unit Mastered</span>
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 font-sans">
            {quizzes.length > 0 
              ? 'Solve all exercises correctly to mark this unit as Mastered in your curriculum profile.'
              : 'Unit exercises and review problem set.'}
          </p>
        </div>

        <p className="text-xs text-slate-500 font-mono">
          {quizzes.length > 0 ? `${quizzes.length} Exercises available` : 'Not applicable'}
        </p>
      </div>

      {/* Unit Mastered Banner */}
      {isMastered && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 text-white border border-emerald-500/40 shadow-sm flex items-center justify-between gap-4 animate-fadeIn">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-400">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-wider font-extrabold block">
                Local Storage Achievement Unlocked
              </span>
              <h5 className="font-sans font-bold text-sm text-white">
                Unit Mastery Complete! 🏆
              </h5>
              <p className="font-sans text-xs text-emerald-200/80">
                You have answered all exercises in this unit correctly. This unit is saved as Mastered in your browser!
              </p>
            </div>
          </div>
          <Sparkles className="w-5 h-5 text-amber-300 hidden sm:block flex-shrink-0" />
        </div>
      )}

      {quizzes.length > 0 ? (
        <div className="space-y-6">
          {quizzes.map((quiz, qIdx) => {
            const isSelected = selectedAnswers[quiz.id] !== undefined;
            const isSubmitted = submittedAnswers[quiz.id] === true;
            const userSelIdx = selectedAnswers[quiz.id];
            const isCorrectResponse = userSelIdx === quiz.correctIndex;
            const hasHint = !!quiz.hint;
            const showHint = showHints[quiz.id];

            return (
              <div
                key={quiz.id}
                className={`p-5 rounded-2xl border transition-all ${
                  isSubmitted
                    ? isCorrectResponse
                      ? 'bg-emerald-50/40 border-emerald-200 shadow-sm'
                      : 'bg-red-50/40 border-red-200 shadow-sm'
                    : 'bg-white border-slate-200 shadow-sm'
                }`}
              >
                {/* Question Header */}
                <div className="flex items-start justify-between gap-4">
                  <span className="font-mono text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                    Problem #{qIdx + 1}
                  </span>

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

                <p className="font-sans font-semibold text-slate-800 text-sm mt-3.5 leading-relaxed">
                  {processMathText(quiz.question)}
                </p>

                {/* Show Hint area */}
                {showHint && !isSubmitted && (
                  <div className="mt-3 p-3 bg-amber-50 border border-amber-200/50 rounded-xl text-xs text-amber-900 font-sans leading-relaxed animate-fadeIn">
                    <span className="font-semibold block mb-0.5">Pedagogical Hint:</span>
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
                        className={`w-full p-3 text-left border rounded-xl text-xs sm:text-sm transition-all focus:outline-none flex items-center justify-between ${optStyle} ${
                          !isSubmitted ? 'cursor-pointer' : 'cursor-default'
                        }`}
                      >
                        <span>{processMathText(opt)}</span>
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

                {/* Action and Explanations */}
                <div className="mt-5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pt-4 border-t border-slate-100">
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
                        Submit Analytical Answer
                      </button>
                    ) : (
                      <button
                        onClick={() => handleResetQuiz(quiz.id)}
                        className="px-4 py-2 border border-slate-300 text-slate-600 hover:text-slate-800 text-xs font-bold rounded-lg font-mono transition-all flex items-center space-x-1 hover:bg-slate-50 cursor-pointer"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>Re-Solve Problem</span>
                      </button>
                    )}
                  </div>

                  {isSubmitted && (
                    <div className={`text-xs font-sans font-medium ${isCorrectResponse ? 'text-emerald-700' : 'text-red-700'}`}>
                      {isCorrectResponse ? '✓ Mathematical derivation correct!' : '✗ Answer mismatch. Review derivation below.'}
                    </div>
                  )}
                </div>

                {/* Analytical Proof Box */}
                {isSubmitted && (
                  <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 font-sans leading-relaxed animate-fadeIn">
                    <span className="font-bold text-slate-800 text-xs block uppercase tracking-wider mb-2">Step-by-Step Analytical Proof</span>
                    <div className="text-xs text-slate-600 space-y-2">
                      <p className="font-sans font-medium text-slate-700 block whitespace-pre-line">
                        {processMathText(quiz.explanation)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 text-center text-slate-500 font-sans text-sm italic">
          Not applicable for this unit
        </div>
      )}
    </div>
  );
};
