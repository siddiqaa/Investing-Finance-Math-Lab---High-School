import { LessonContent } from '../types';
import { compounding } from './lessons/compounding';
import { stochastic } from './lessons/stochastic';
import { portfolio } from './lessons/portfolio';
import { options } from './lessons/options';
import { behavioral } from './lessons/behavioral';

export const LESSONS: Record<string, LessonContent> = {
  compounding,
  stochastic,
  portfolio,
  options,
  behavioral,
};
