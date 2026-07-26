import { describe, it, expect } from 'vitest';
import { parseLessonBlocks } from './contentParser';

describe('parseLessonBlocks', () => {
  it('parses numbered section headers and subsequent paragraph', () => {
    const input = ['1. **The Core Concept**\nThis is the body text of the section.'];
    const blocks = parseLessonBlocks(input);
    expect(blocks.length).toBe(2);
    expect(blocks[0]).toEqual({
      type: 'header',
      level: 1,
      content: 'The Core Concept',
    });
    expect(blocks[1]).toEqual({
      type: 'paragraph',
      content: 'This is the body text of the section.',
    });
  });

  it('parses standalone titles in double asterisks', () => {
    const input = ['**The Hook: The $20,000 Car**'];
    const blocks = parseLessonBlocks(input);
    expect(blocks).toEqual([
      { type: 'title', content: 'The Hook: The $20,000 Car' },
    ]);
  });

  it('parses custom markdown table blocks', () => {
    const input = [
      'AMORTIZATION_TABLE|Month | Payment | Interest | Principal\nMonth 1 | $386.66 | $100.00 | $286.66\nMonth 60 | $386.66 | $1.92 | $384.74',
    ];
    const blocks = parseLessonBlocks(input);
    expect(blocks.length).toBe(1);
    expect(blocks[0].type).toBe('table');
    expect(blocks[0].headers).toEqual(['Month', 'Payment', 'Interest', 'Principal']);
    expect(blocks[0].rows).toEqual([
      ['Month 1', '$386.66', '$100.00', '$286.66'],
      ['Month 60', '$386.66', '$1.92', '$384.74'],
    ]);
  });

  it('parses callout blocks (warnings, experiments, searches)', () => {
    const input = [
      '⚠️ **Common Mistake:** Avoid long loans.',
      '🧪 **Real-World Experiment:** Try different rates.',
      '🔍 **Key Insight:** Look beyond the sticker price.',
    ];
    const blocks = parseLessonBlocks(input);
    expect(blocks.length).toBe(3);
    expect(blocks[0].type).toBe('warning');
    expect(blocks[1].type).toBe('experiment');
    expect(blocks[2].type).toBe('search');
  });

  it('parses bullet lists accurately', () => {
    const input = [
      '• Item one with $r = 0.05$\n• Item two with $n = 12$',
    ];
    const blocks = parseLessonBlocks(input);
    expect(blocks.length).toBe(1);
    expect(blocks[0].type).toBe('bullet_list');
    expect(blocks[0].items).toEqual(['Item one with $r = 0.05$', 'Item two with $n = 12$']);
  });

  it('parses knowledge check triggers', () => {
    const input = ['KNOWLEDGE_CHECK_TVM', 'KNOWLEDGE_CHECK_DISCOUNT'];
    const blocks = parseLessonBlocks(input);
    expect(blocks.length).toBe(2);
    expect(blocks[0].type).toBe('knowledge_check_tvm');
    expect(blocks[1].type).toBe('knowledge_check_discount');
  });
});
