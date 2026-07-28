import React, { memo } from 'react';
import { processMathText } from '../../lib/math';

interface MathTextProps {
  text: string;
  className?: string;
}

export const MathText = memo<MathTextProps>(({ text, className = '' }) => {
  if (!text) return null;
  return (
    <span className={className}>
      {processMathText(text)}
    </span>
  );
});

MathText.displayName = 'MathText';
