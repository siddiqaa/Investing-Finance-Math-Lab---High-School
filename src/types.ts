export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint?: string;
}

export interface LessonContent {
  id: string;
  title: string;
  subtitle: string;
  mathTopic: string;
  equations: string[];
  description: string;
  fullText: string[];
  quizzes: QuizQuestion[];
}

export type ActiveModule = 'compounding' | 'stochastic' | 'portfolio' | 'options' | 'sandbox';
