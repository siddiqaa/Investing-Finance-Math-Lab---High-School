import { processMathText } from './math';

export type ContentBlockType =
  | 'paragraph'
  | 'header'
  | 'title'
  | 'side_quest'
  | 'knowledge_check_tvm'
  | 'knowledge_check_discount'
  | 'knowledge_check_npv'
  | 'knowledge_check_valuation'
  | 'knowledge_check_news'
  | 'table'
  | 'warning'
  | 'experiment'
  | 'search'
  | 'example'
  | 'diagram'
  | 'bullet_list';

export interface ContentBlock {
  type: ContentBlockType;
  content?: string;
  level?: number;
  questId?: string;
  questTitle?: string;
  headers?: string[];
  rows?: string[][];
  items?: string[];
}

export function isListItemLine(line: string): boolean {
  const trimmed = line.trim();
  if (trimmed.startsWith('• ') || trimmed.startsWith('- ') || trimmed.startsWith('•') || trimmed.startsWith('- Option')) {
    return true;
  }
  if (/^(<span[^>]*>)?\s*[•\-]/i.test(trimmed)) {
    return true;
  }
  if (/^(\d+)[\.\)]\s+/.test(trimmed) || /^(<span[^>]*>)?\s*(\d+)[\.\)]\s+/i.test(trimmed)) {
    return true;
  }
  return false;
}

export function cleanListItemLine(line: string): string {
  let cleaned = line.trim();
  if (cleaned.startsWith('- Option')) {
    cleaned = cleaned.replace(/^- Option\s*/, 'Option ');
  }
  cleaned = cleaned
    .replace(/^[•\-]\s*/, '')
    .replace(/^(\d+)[\.\)]\s*/, '')
    .replace(/^(<span[^>]*>)\s*([•\-]|(\d+)[\.\)])\s*/i, '$1');

  return cleaned;
}

export function parseTextAndLists(text: string, blocks: ContentBlock[]): void {
  const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
  if (lines.length === 0) return;

  let currentParagraphLines: string[] = [];
  let currentListItems: string[] = [];
  let currentListItem = '';

  const flushParagraph = () => {
    if (currentParagraphLines.length > 0) {
      blocks.push({ type: 'paragraph', content: currentParagraphLines.join('\n') });
      currentParagraphLines = [];
    }
  };

  const flushList = () => {
    if (currentListItem) {
      currentListItems.push(currentListItem);
      currentListItem = '';
    }
    if (currentListItems.length > 0) {
      blocks.push({ type: 'bullet_list', items: [...currentListItems] });
      currentListItems = [];
    }
  };

  for (const line of lines) {
    if (isListItemLine(line)) {
      flushParagraph();
      if (currentListItem) {
        currentListItems.push(currentListItem);
      }
      currentListItem = cleanListItemLine(line);
    } else {
      if (currentListItem || currentListItems.length > 0) {
        if (currentListItem) {
          currentListItem += '\n' + line;
        } else {
          currentListItem = line;
        }
      } else {
        currentParagraphLines.push(line);
      }
    }
  }

  flushParagraph();
  flushList();
}

export function parseLessonBlocks(fullText: string[]): ContentBlock[] {
  const blocks: ContentBlock[] = [];
  
  fullText.forEach(p => {
    const trimmed = p.trim();
    if (!trimmed) return;
    
    // Side Quest
    if (trimmed.startsWith('SIDE_QUEST_CALLOUT|')) {
      const parts = trimmed.split('|');
      blocks.push({
        type: 'side_quest',
        questId: parts[1],
        questTitle: parts[2] || 'Math Side Quest'
      });
      return;
    }
    
    // Knowledge Checks
    if (trimmed.startsWith('KNOWLEDGE_CHECK_TVM')) {
      blocks.push({ type: 'knowledge_check_tvm' });
      return;
    }
    if (trimmed.startsWith('KNOWLEDGE_CHECK_DISCOUNT')) {
      blocks.push({ type: 'knowledge_check_discount' });
      return;
    }
    if (trimmed.startsWith('KNOWLEDGE_CHECK_NPV')) {
      blocks.push({ type: 'knowledge_check_npv' });
      return;
    }
    if (trimmed.startsWith('KNOWLEDGE_CHECK_VALUATION')) {
      blocks.push({ type: 'knowledge_check_valuation' });
      return;
    }
    if (trimmed.startsWith('KNOWLEDGE_CHECK_NEWS_BRIDGE')) {
      blocks.push({ type: 'knowledge_check_news' });
      return;
    }
    
    // Diagram
    if (trimmed.startsWith('DIAGRAM|')) {
      blocks.push({ type: 'diagram', content: trimmed.substring(8) });
      return;
    }
    
    // Table
    if (trimmed.includes('|') && !trimmed.startsWith('⚠️') && !trimmed.startsWith('🧪') && !trimmed.startsWith('🔍')) {
      const tableContent = trimmed.replace(/^[A-Z0-9_]+_TABLE\|/, '');
      const lines = tableContent.split('\n').map(l => l.trim()).filter(l => l.length > 0);
      if (lines.length > 0 && lines[0].includes('|')) {
        const headers = lines[0].split('|').map(h => h.trim());
        const rows = lines.slice(1).map(line => line.split('|').map(cell => cell.trim()));
        blocks.push({ type: 'table', headers, rows });
        return;
      }
    }
    
    // Callouts
    if (trimmed.startsWith('⚠️')) {
      blocks.push({ type: 'warning', content: trimmed });
      return;
    }
    if (trimmed.startsWith('🧪')) {
      blocks.push({ type: 'experiment', content: trimmed });
      return;
    }
    if (trimmed.startsWith('🔍')) {
      blocks.push({ type: 'search', content: trimmed });
      return;
    }
    
    // Examples
    if (trimmed.startsWith('**Worked Example') || trimmed.startsWith('**Real-World Problem')) {
      blocks.push({ type: 'example', content: trimmed });
      return;
    }
    
    // Title
    if (trimmed.startsWith('**') && trimmed.endsWith('**') && !trimmed.includes('\n')) {
      blocks.push({ type: 'title', content: trimmed.slice(2, -2) });
      return;
    }

    // Header check
    const headerMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
    const rawLines = trimmed.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    const isNumberedList = rawLines.length > 1 && rawLines.some((l, idx) => idx > 0 && isListItemLine(l));
    
    if (headerMatch && !isNumberedList) {
      let headerContent = rawLines[0].replace(/^(\d+)\.\s+/, '').trim();
      if (headerContent.startsWith('**') && headerContent.endsWith('**')) {
        headerContent = headerContent.slice(2, -2).trim();
      }
      blocks.push({
        type: 'header',
        level: parseInt(headerMatch[1], 10),
        content: headerContent
      });
      
      const remaining = rawLines.slice(1).join('\n').trim();
      if (remaining) {
        parseTextAndLists(remaining, blocks);
      }
      return;
    }
    
    // Parse text & lists for standard paragraphs / list blocks
    parseTextAndLists(trimmed, blocks);
  });
  
  return blocks;
}
