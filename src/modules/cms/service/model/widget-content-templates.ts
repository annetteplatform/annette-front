import {WidgetContent} from './post';

export interface WidgetContentTemplate {
  id: string,
  name: string,
  widgetContent: WidgetContent
}

export function widgetContentTemplates(): WidgetContentTemplate[] {
  return [
    {
      id: 'markdown-01',
      name: 'Markdown: Empty',
      widgetContent: {
        id: '',
        widgetType: 'markdown',
        data: '',
        indexData: ''
      }
    },

    {
      id: 'markdown-02',
      name: 'Markdown: Hello World',
      widgetContent: {
        id: '',
        widgetType: 'markdown',
        data: '# Hello world!',
        indexData: ''
      }
    },

    {
      id: 'html-01',
      name: 'HTML: Empty',
      widgetContent: {
        id: '',
        widgetType: 'html',
        data: '',
        indexData: ''
      }
    },
    {
      id: 'html-02',
      name: 'HTML: Hello world',
      widgetContent: {
        id: '',
        widgetType: 'html',
        data: '<h2>Hello world!</h2>',
        indexData: ''
      }
    }
  ]
}
