import { useState, useEffect, Suspense, lazy } from 'react';
import { LESSONS } from './data/lessons';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from './components/Header';
import { SyllabusSidebar } from './components/SyllabusSidebar';
import { SyllabusHome } from './components/SyllabusHome';
import { LessonViewer } from './components/LessonViewer';
import { MasteryProvider } from './context/MasteryContext';
import { LabSkeletonLoader } from './components/ui/LabSkeletonLoader';

const SigmaSideQuest = lazy(() => import('./components/SigmaSideQuest').then(m => ({ default: m.SigmaSideQuest })));
const GordonGrowthQuest = lazy(() => import('./components/GordonGrowthQuest').then(m => ({ default: m.GordonGrowthQuest })));
const GeometricSeriesQuest = lazy(() => import('./components/GeometricSeriesQuest').then(m => ({ default: m.GeometricSeriesQuest })));
const VarianceCovarianceQuest = lazy(() => import('./components/VarianceCovarianceQuest').then(m => ({ default: m.VarianceCovarianceQuest })));

export default function App() {
  const [activeModule, setActiveModule] = useState<string>('syllabus');

  // Scroll to the top of the window when switching modules (e.g. going to a side quest)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeModule]);

  const currentLesson = activeModule !== 'syllabus' && activeModule !== 'side_quest_sigma' && activeModule !== 'side_quest_gordon' && activeModule !== 'side_quest_geometric' && activeModule !== 'side_quest_variance' ? LESSONS[activeModule] : null;

  return (
    <MasteryProvider>
      <div className="min-h-screen bg-slate-50 flex flex-col antialiased selection:bg-indigo-500 selection:text-white">
        {/* Upper Navigation Banner */}
        <Header />

        {/* Main Workspace Layout */}
        <div className="flex-1 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-6 p-4 sm:p-6">
          {/* Navigation Sidebar */}
          <SyllabusSidebar activeModule={activeModule} setActiveModule={setActiveModule} />

          {/* Dynamic Main Workspace Content */}
          <main className="lg:col-span-9 space-y-6">
            <AnimatePresence mode="wait">
              {activeModule === 'syllabus' ? (
                <SyllabusHome setActiveModule={setActiveModule} />
              ) : activeModule === 'side_quest_sigma' ? (
                <motion.div
                  key="side-quest-sigma"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.2 }}
                >
                  <Suspense fallback={<LabSkeletonLoader label="Loading Quest 1..." />}>
                    <SigmaSideQuest
                      onBackToSyllabus={() => setActiveModule('syllabus')}
                      onLinkToUnit1={() => setActiveModule('compounding')}
                    />
                  </Suspense>
                </motion.div>
              ) : activeModule === 'side_quest_gordon' ? (
                <motion.div
                  key="side-quest-gordon"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.2 }}
                >
                  <Suspense fallback={<LabSkeletonLoader label="Loading Quest 3..." />}>
                    <GordonGrowthQuest
                      onBackToSyllabus={() => setActiveModule('syllabus')}
                      onLinkToUnit2={() => setActiveModule('valuation')}
                    />
                  </Suspense>
                </motion.div>
              ) : activeModule === 'side_quest_geometric' ? (
                <motion.div
                  key="side-quest-geometric"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.2 }}
                >
                  <Suspense fallback={<LabSkeletonLoader label="Loading Quest 2..." />}>
                    <GeometricSeriesQuest
                      onBackToSyllabus={() => setActiveModule('syllabus')}
                      onLinkToUnit3_5={() => setActiveModule('flatValuation')}
                    />
                  </Suspense>
                </motion.div>
              ) : activeModule === 'side_quest_variance' ? (
                <motion.div
                  key="side-quest-variance"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.2 }}
                >
                  <Suspense fallback={<LabSkeletonLoader label="Loading Quest 4..." />}>
                    <VarianceCovarianceQuest
                      onBackToSyllabus={() => setActiveModule('syllabus')}
                      onLinkToPortfolio={() => setActiveModule('portfolio')}
                    />
                  </Suspense>
                </motion.div>
              ) : (
                currentLesson && (
                  <LessonViewer currentLesson={currentLesson} setActiveModule={setActiveModule} />
                )
              )}
            </AnimatePresence>
          </main>
        </div>

        {/* Quantitative Footer */}
        <footer className="bg-slate-900 border-t-2 border-purple-600/80 text-slate-400 py-6 px-6 mt-12 text-center text-xs font-mono">
          <div className="max-w-7xl mx-auto space-y-2">
            <p>© 2026 Investing & Finance Math Lab. Created for families studying high-level economics together.</p>
            <p className="text-[10px] text-slate-600">
              No real currency is processed. Calculations are based on Black-Scholes formulas and Brownian simulations.
            </p>
          </div>
        </footer>
      </div>
    </MasteryProvider>
  );
}
