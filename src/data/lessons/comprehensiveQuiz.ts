import { LessonContent } from '../../types';
import { ALL_COLLATED_QUIZZES } from '../comprehensiveQuizData';

export const comprehensiveQuiz: LessonContent = {
  id: 'comprehensiveQuiz',
  title: 'Comprehensive Review Quiz',
  subtitle: 'Daily Morning Refresh & Full Curriculum Exercise Bank',
  mathTopic: 'Collated Financial Math & Algebra Review',
  equations: [
    'PV = \\frac{FV}{(1 + r)^n}',
    'P_0 = \\frac{D_1}{r - g}',
    'dS_t = \\mu S_t dt + \\sigma S_t dW_t',
    'C_0 = S_0 N(d_1) - K e^{-rT} N(d_2)'
  ],
  description: 'A collated exercise repository assembling all 38 end-of-unit problems across the entire curriculum. Designed for daily morning review to strengthen mathematical recall and financial intuition.',
  introduction: `Welcome to the Comprehensive Review Hub! As a financial math student, consistent daily retrieval practice is the single most effective method to solidify algebraic formulas, discounting logic, and risk concepts into long-term mental models.

This unit collates and organizes all 38 mathematical exercises from every single unit and side quest across the curriculum. Use this hub at the beginning of each study session to test your baseline memory, track overall topic mastery, and immediately jump back to specific unit lessons whenever you need to review derivations.`,
  fullText: [
    '1. <span className="text-indigo-600 font-bold">Why Daily Retrieval Practice Matters</span>\nIn quantitative finance and economic modeling, speed and accuracy come from automaticity. When you instantly recognize that $P_0 = \\frac{D}{r}$ is a zero-growth perpetuity, or that $1 - \\frac{1}{1+r}$ simplifies to $\\frac{r}{1+r}$, your mind is free to focus on higher-level market dynamics.',
    '2. <span className="text-indigo-600 font-bold">How to Use This Review Unit</span>\n- <span className="font-bold text-slate-800">Daily Refresh Mode:</span> Click the ⚡ Daily Refresh button to pull a randomized 6-question set from across all units for a quick morning warm-up.\n- <span className="font-bold text-slate-800">Unit Filter:</span> Filter by any specific unit to target areas where you need extra derivation practice.\n- <span className="font-bold text-slate-800">Jump to Lesson:</span> For any question, click "Study Unit Lesson" to immediately open the full narrative and simulation lab for that concept.'
  ],
  quizzes: ALL_COLLATED_QUIZZES.map(q => ({
    id: q.id,
    question: q.question,
    options: q.options,
    correctIndex: q.correctIndex,
    explanation: q.explanation,
    hint: q.hint
  }))
};
