import {HeaderData} from '../widget-model';
import {WidgetTemplate} from './template';
import {defaultLayout} from './layout';

export function headerWidgets(): WidgetTemplate<HeaderData>[] {

  return [
    {
      id: 'header-01',
      name: 'Header',
      widget: {
        id: '',
        widgetType: 'header',
        data: {
          anchor: '',
          title: 'Title',
          textColor: '#ffffff',
          backgroundColor: '#0000ff',
          actions: [
            {
              caption: 'Action 1',
              type: 'url',
              // @ts-ignore
              url: '#action1',
              newWindow: false
            },
            {
              caption: 'Action 2',
              type: 'url',
              // @ts-ignore
              url: '/',
              newWindow: true
            },
            {
              caption: 'Logout',
              type: 'logout',
            }
          ],
          layout: defaultLayout()
        },
        indexData: ''
      }
    }
  ]
}
