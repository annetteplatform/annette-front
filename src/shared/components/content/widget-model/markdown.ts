import {WidgetLayout} from './widget-layout';


export interface MarkdownData {
  markdown: string
  layout: WidgetLayout
}

export function markdownToIndex(content: string): string  {
  return content.replace(/<[^>]*>?/gm, ' ')
}

