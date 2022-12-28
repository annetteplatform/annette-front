import {ContentData, } from '../widget-model';
import {WidgetTemplate} from './template';
import {defaultLayout} from './layout';

export function contentWidgets(): WidgetTemplate<ContentData>[] {
  return [
    {
      id: 'content-01',
      name: 'Content: Annette Login',
      widget: {
        id: '',
        widgetType: 'content',
        data: {
          anchor: '',
          container: {
            wrap: 'wrap',
            justify: 'center',
            align: 'center'
          },
          items: [
            {
              maxWidth: '500px',
              text: {
                text: 'In Annette Admin Console you can perform the following tasks:\n' +
                  '          <ul>\n' +
                  '            <li>Maintain person catalog</li>\n' +
                  '            <li>Maintain organizational structures and roles</li>\n' +
                  '            <li>Maintain roles and assign permissions</li>\n' +
                  '            <li>Maintain languages, translations and applications</li>\n' +
                  '          </ul>',
                style: '',
                weight: '',
                justify: ''
              }
            },
            {
              maxWidth: '350px',
              header:{
                text: 'Login to console',
                style: 'h6',
                weight: '',
                justify: 'center'
              },
              text:{
                text: 'Please login to get access to Annette Admin Console\'s services',
                style: '',
                weight: '',
                justify: ''
              },
              action: {
                caption: 'Login',
                type: 'default',
                action: 'login',
                justify: 'start'
              }
            }
          ],
          layout: defaultLayout()
        },
        indexData: ''
      }
    }

  ]
}
