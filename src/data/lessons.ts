import { LessonContent } from '../types';
import { compounding } from './lessons/compounding';
import { rateSelection } from './lessons/rateSelection';
import { stockBridge } from './lessons/stockBridge';
import { flatValuation } from './lessons/flatValuation';
import { valuation } from './lessons/valuation';
import { newsBridge } from './lessons/newsBridge';
import { unit5R } from './lessons/unit5R';
import { stochastic } from './lessons/stochastic';
import { portfolio } from './lessons/portfolio';
import { behavioral } from './lessons/behavioral';
import { options } from './lessons/options';
import { amortization } from './lessons/amortization';
import { mortgage } from './lessons/mortgage';
import { glossary } from './lessons/glossary';
import { comprehensiveQuiz } from './lessons/comprehensiveQuiz';

export const LESSONS: Record<string, LessonContent> = {
  compounding,
  rateSelection,
  stockBridge,
  flatValuation,
  valuation,
  newsBridge,
  unit5R,
  stochastic,
  portfolio,
  behavioral,
  options,
  amortization,
  mortgage,
  glossary,
  comprehensiveQuiz,
};
