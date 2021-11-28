import {WidgetLayout} from './widget-layout';

export interface HtmlData {
  html: string
  layout: WidgetLayout
}

export function htmlToIndex(content: string): string  {
  return content.replace(/<[^>]*>?/gm, ' ')
}
