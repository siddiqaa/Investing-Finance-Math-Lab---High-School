import { motion } from 'motion/react';
import { 
  BookOpen, 
  HeartHandshake, 
  Sparkles, 
  Sigma, 
  ChevronsRight 
} from 'lucide-react';
import { LessonContent } from '../types';
import { MathSpan, processMathText } from '../lib/math';

import { ContentRenderer } from './ContentRenderer';

// Import Labs
import { LemonadeStandLab } from './LemonadeStandLab';
import { AutoLoanLab } from './AutoLoanLab';
import { BankLab } from './BankLab';
import { StockBridgeLab } from './StockBridgeLab';
import { FlatValuationLab } from './FlatValuationLab';
import { ValuationLab } from './ValuationLab';
import { NewsBridgeLab } from './NewsBridgeLab';
import { StochasticLab } from './StochasticLab';
import { PortfolioLab } from './PortfolioLab';
import { OptionsLab } from './OptionsLab';
import { BehavioralLab } from './BehavioralLab';

// Quiz Section
import { QuizSection } from './QuizSection';

interface LessonViewerProps {
  currentLesson: LessonContent;
  setActiveModule: (module: string) => void;
}

export function LessonViewer({ currentLesson, setActiveModule }: LessonViewerProps) {
  const renderLabWidget = (moduleId: string) => {
    switch (moduleId) {
      case 'compounding':
        return <LemonadeStandLab />;
      case 'amortization':
        return <AutoLoanLab />;
      case 'rateSelection':
        return <BankLab />;
      case 'stockBridge':
        return <StockBridgeLab />;
      case 'flatValuation':
        return <FlatValuationLab />;
      case 'valuation':
        return <ValuationLab />;
      case 'newsBridge':
        return <NewsBridgeLab />;
      case 'stochastic':
        return <StochasticLab />;
      case 'portfolio':
        return <PortfolioLab />;
      case 'options':
        return <OptionsLab />;
      case 'behavioral':
        return <BehavioralLab />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      key={currentLesson.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.2 }}
      className="space-y-8"
    >
      {/* Lesson Heading Banner */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-xs font-mono font-medium uppercase text-slate-400">
          <span className="text-indigo-600 font-bold">Academic Unit</span>
          <span>•</span>
          <span>{currentLesson.mathTopic}</span>
        </div>
        <h2 className="font-sans font-extrabold text-2xl sm:text-3xl text-slate-800 tracking-tight leading-tight" id="lesson-module-title">
          {currentLesson.title}
        </h2>
        <p className="font-serif italic text-sm text-slate-500">
          {currentLesson.subtitle}
        </p>
      </div>

      {/* Narrative Introduction Panel */}
      {currentLesson.introduction && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white border-l-4 border-l-indigo-600 border-y border-r border-slate-200 rounded-r-3xl rounded-l-lg p-8 sm:p-10 shadow-sm space-y-6 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
            <BookOpen className="w-32 h-32 text-indigo-900" />
          </div>
          <div className="relative z-10">
            <h3 className="font-sans font-bold text-slate-900 text-lg sm:text-xl flex items-center gap-2 mb-4">
              <HeartHandshake className="w-5 h-5 text-indigo-600" />
              The Big Picture
            </h3>
            <div className="font-serif text-slate-700 text-base sm:text-lg leading-relaxed space-y-4 max-w-4xl prose prose-slate prose-indigo">
              {currentLesson.introduction.split('\n\n').map((paragraph, pIdx) => (
                <p key={pIdx}>{processMathText(paragraph)}</p>
              ))}
            </div>
            <div className="pt-6 border-t border-slate-100 flex items-center gap-3">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">End of Narrative Hook — Transitioning to Mathematical Models</span>
              <div className="flex-1 h-px bg-slate-100" />
            </div>
          </div>
        </motion.div>
      )}

      {/* Math Derivation Text section */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-sm space-y-6">
        <h3 className="font-sans font-bold text-slate-800 text-sm uppercase tracking-wider border-b border-slate-100 pb-2">
          {currentLesson.id === 'behavioral' ? 'Core Concept Overview' : 'Mathematical Background & Formula Derivation'}
        </h3>

        {/* Core Formula Reference block - Full container width above explanation text */}
        {currentLesson.equations && currentLesson.equations.length > 0 && (
          <div className="w-full p-3.5 sm:p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
            <span className="text-slate-500 font-mono text-[10px] sm:text-xs block uppercase tracking-wider font-semibold">
              Core Formula Reference
            </span>
            <div className="space-y-1.5 divide-y divide-slate-200/60 pt-0.5">
              {currentLesson.equations.map((eq, eqIdx) => (
                <div key={eqIdx} className="pt-1.5 first:pt-0 overflow-x-auto">
                  <MathSpan tex={eq} block className="my-0.5 [&_.katex-display]:my-0" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Single column layout for explanation text */}
        <div className="space-y-4 text-slate-600 font-serif text-sm sm:text-base leading-relaxed">
          <ContentRenderer fullText={currentLesson.fullText} setActiveModule={setActiveModule} isPdfExport={false} />
        </div>
      </div>

      {/* Interactive Simulation Lab container */}
      <div className="space-y-3">
        <div className="pl-1">
          <h3 className="font-sans font-extrabold text-slate-800 text-lg">
            Interactive Numerical Sandbox
          </h3>
          <p className="text-xs text-slate-500 font-sans">
            Slide inputs and investigate numerical limits in real time. Compare simulation variations against math expectation limits.
          </p>
        </div>

        {renderLabWidget(currentLesson.id)}
      </div>

      {/* Multiple-Choice Derivation Quiz segment */}
      <QuizSection quizzes={currentLesson.quizzes} moduleName={currentLesson.title} />
    </motion.div>
  );
}
