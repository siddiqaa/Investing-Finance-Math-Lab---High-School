import { LessonContent } from '../types';
import { compounding } from './lessons/compounding';
import { amortization } from './lessons/amortization';
import { rateSelection } from './lessons/rateSelection';
import { stockBridge } from './lessons/stockBridge';
import { valuation } from './lessons/valuation';
import { newsBridge } from './lessons/newsBridge';
import { stochastic } from './lessons/stochastic';
import { portfolio } from './lessons/portfolio';
import { options } from './lessons/options';
import { behavioral } from './lessons/behavioral';

export const LESSONS: Record<string, LessonContent> = {
  compounding,
  rateSelection,
  stockBridge,
  valuation,
  newsBridge,
  stochastic,
  portfolio,
  options,
  behavioral,
  amortization,
};
