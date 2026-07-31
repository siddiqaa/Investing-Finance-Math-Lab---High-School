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

export function parseLessonBlocks(fullText: string[]): ContentBlock[] {
  const blocks: ContentBlock[] = [];
  
  fullText.forEach(p => {
    const trimmed = p.trim();
    
    // Header
    const headerMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
    if (headerMatch && !trimmed.startsWith('SIDE_QUEST') && !trimmed.startsWith('DIAGRAM') && !trimmed.startsWith('KNOWLEDGE_CHECK')) {
      const parts = trimmed.split('\n');
      let headerContent = parts[0].replace(/^(\d+)\.\s+/, '').trim();
      if (headerContent.startsWith('**') && headerContent.endsWith('**')) {
        headerContent = headerContent.slice(2, -2).trim();
      }
      blocks.push({
        type: 'header',
        level: parseInt(headerMatch[1], 10),
        content: headerContent
      });
      
      const remaining = parts.slice(1).join('\n').trim();
      if (remaining) {
        blocks.push({ type: 'paragraph', content: remaining });
      }
      return;
    }
    
    // Title
    if (trimmed.startsWith('**') && trimmed.endsWith('**') && !trimmed.includes('\n')) {
      blocks.push({ type: 'title', content: trimmed.slice(2, -2) });
      return;
    }
    
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
      if (lines.length > 0) {
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
    
    // Bullet Lists
    if (trimmed.startsWith('• ') || trimmed.startsWith('- ') || (trimmed.includes('\n') && (trimmed.includes('• ') || trimmed.includes('- Option') || trimmed.includes('- ') || trimmed.includes('•')))) {
      const rawLines = trimmed.split('\n').map(l => l.trim()).filter(l => l.length > 0);
      const items: string[] = [];
      let currentItem = '';

      for (const line of rawLines) {
        if (line.startsWith('• ') || line.startsWith('- ') || line.startsWith('- Option') || line.startsWith('•') || /^<span[^>]*>[•\-]/i.test(line)) {
          if (currentItem) {
            items.push(currentItem);
          }
          currentItem = line.replace(/^[•\-]\s*/, '').replace(/^- Option\s*/, 'Option ').replace(/^(<span[^>]*>)\s*[•\-]\s*/i, '$1');
        } else {
          if (currentItem) {
            currentItem += '\n' + line;
          } else {
            currentItem = line;
          }
        }
      }
      if (currentItem) {
        items.push(currentItem);
      }

      if (items.length > 0) {
        blocks.push({ type: 'bullet_list', items });
        return;
      }
    }
    
    // Paragraph
    blocks.push({ type: 'paragraph', content: p });
  });
  
  return blocks;
}
