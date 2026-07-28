import { ALL_COLLATED_QUIZZES } from '../data/comprehensiveQuizData';

const PROGRESS_KEY = 'investing_math_quiz_progress';
const MASTERED_KEY = 'investing_math_mastered_units';

export interface QuizProgressMap {
  [quizId: string]: {
    userIndex: number;
    isCorrect: boolean;
  };
}

export interface MasteredUnitsMap {
  [unitId: string]: boolean;
}

/**
 * Get all saved quiz answers from localStorage
 */
export function getSavedQuizProgress(): QuizProgressMap {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    console.error('Error reading quiz progress from localStorage:', e);
    return {};
  }
}

/**
 * Get map of mastered unit IDs from localStorage
 */
export function getMasteredUnits(): MasteredUnitsMap {
  try {
    const raw = localStorage.getItem(MASTERED_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    console.error('Error reading mastered units from localStorage:', e);
    return {};
  }
}

/**
 * Record a user's quiz answer for a question, persist to localStorage,
 * and automatically check if all questions for that unit are correctly solved.
 */
export function recordQuizAnswer(
  quizId: string, 
  userIndex: number, 
  correctIndex: number, 
  unitId?: string
): { progress: QuizProgressMap; mastered: MasteredUnitsMap } {
  const progress = getSavedQuizProgress();
  const isCorrect = userIndex === correctIndex;
  
  progress[quizId] = { userIndex, isCorrect };
  
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Error saving quiz progress to localStorage:', e);
  }

  // Find target unitId
  const targetUnitId = unitId || ALL_COLLATED_QUIZZES.find(q => q.id === quizId)?.unitId;
  const mastered = getMasteredUnits();

  if (targetUnitId) {
    const unitQuestions = ALL_COLLATED_QUIZZES.filter(q => q.unitId === targetUnitId);
    if (unitQuestions.length > 0) {
      const allCorrect = unitQuestions.every(q => progress[q.id]?.isCorrect === true);
      mastered[targetUnitId] = allCorrect;
      try {
        localStorage.setItem(MASTERED_KEY, JSON.stringify(mastered));
      } catch (e) {
        console.error('Error saving mastered units to localStorage:', e);
      }
    }
  }

  return { progress, mastered };
}

/**
 * Check and recalculate unit mastery for all units based on saved progress.
 */
export function recalculateAllMastery(): MasteredUnitsMap {
  const progress = getSavedQuizProgress();
  const mastered: MasteredUnitsMap = {};

  const unitIds = Array.from(new Set(ALL_COLLATED_QUIZZES.map(q => q.unitId)));

  unitIds.forEach(unitId => {
    const questions = ALL_COLLATED_QUIZZES.filter(q => q.unitId === unitId);
    if (questions.length > 0) {
      mastered[unitId] = questions.every(q => progress[q.id]?.isCorrect === true);
    }
  });

  try {
    localStorage.setItem(MASTERED_KEY, JSON.stringify(mastered));
  } catch (e) {
    console.error('Error saving recalculated mastered units:', e);
  }

  return mastered;
}

/**
 * Remove progress for a single question, a whole unit, or clear all.
 */
export function resetQuizProgress(quizId?: string, unitId?: string): { progress: QuizProgressMap; mastered: MasteredUnitsMap } {
  let progress = getSavedQuizProgress();
  let mastered = getMasteredUnits();

  if (quizId) {
    delete progress[quizId];
    // Recalculate unit mastery for affected unit
    const q = ALL_COLLATED_QUIZZES.find(item => item.id === quizId);
    if (q) {
      mastered[q.unitId] = false;
    }
  } else if (unitId) {
    ALL_COLLATED_QUIZZES.filter(q => q.unitId === unitId).forEach(q => {
      delete progress[q.id];
    });
    mastered[unitId] = false;
  } else {
    progress = {};
    mastered = {};
    try {
      localStorage.removeItem(PROGRESS_KEY);
      localStorage.removeItem(MASTERED_KEY);
    } catch (e) {
      console.error('Error clearing localStorage:', e);
    }
    return { progress, mastered };
  }

  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
    localStorage.setItem(MASTERED_KEY, JSON.stringify(mastered));
  } catch (e) {
    console.error('Error saving reset state:', e);
  }

  return { progress, mastered };
}
