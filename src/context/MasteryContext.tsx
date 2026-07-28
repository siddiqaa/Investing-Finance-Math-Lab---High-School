import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  getSavedQuizProgress, 
  getMasteredUnits, 
  recordQuizAnswer, 
  resetQuizProgress,
  QuizProgressMap, 
  MasteredUnitsMap 
} from '../utils/masteryStorage';

interface MasteryContextType {
  progress: QuizProgressMap;
  masteredUnits: MasteredUnitsMap;
  submitAnswer: (quizId: string, userIndex: number, correctIndex: number, unitId?: string) => void;
  resetQuestion: (quizId: string, unitId?: string) => void;
  resetAll: () => void;
}

const MasteryContext = createContext<MasteryContextType | undefined>(undefined);

export const MasteryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [progress, setProgress] = useState<QuizProgressMap>({});
  const [masteredUnits, setMasteredUnits] = useState<MasteredUnitsMap>({});

  useEffect(() => {
    setProgress(getSavedQuizProgress());
    setMasteredUnits(getMasteredUnits());
  }, []);

  const submitAnswer = useCallback((quizId: string, userIndex: number, correctIndex: number, unitId?: string) => {
    const { progress: newProg, mastered: newMastered } = recordQuizAnswer(quizId, userIndex, correctIndex, unitId);
    setProgress({ ...newProg });
    setMasteredUnits({ ...newMastered });
  }, []);

  const resetQuestion = useCallback((quizId: string, unitId?: string) => {
    const { progress: newProg, mastered: newMastered } = resetQuizProgress(quizId, unitId);
    setProgress({ ...newProg });
    setMasteredUnits({ ...newMastered });
  }, []);

  const resetAll = useCallback(() => {
    const { progress: newProg, mastered: newMastered } = resetQuizProgress();
    setProgress({ ...newProg });
    setMasteredUnits({ ...newMastered });
  }, []);

  return (
    <MasteryContext.Provider value={{ progress, masteredUnits, submitAnswer, resetQuestion, resetAll }}>
      {children}
    </MasteryContext.Provider>
  );
};

export const useMastery = () => {
  const ctx = useContext(MasteryContext);
  if (!ctx) {
    throw new Error('useMastery must be used within a MasteryProvider');
  }
  return ctx;
};
