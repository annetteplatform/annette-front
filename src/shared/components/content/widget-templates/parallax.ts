import {ParallaxData} from '../widget-model';
import {WidgetTemplate} from './template';
import {defaultLayout} from './layout';

export function parallaxWidgets(): WidgetTemplate<ParallaxData>[] {
  return [
    {
      id: 'parallax-01',
      name: 'Parallax: empty',
      widget: {
        id: '',
        widgetType: 'parallax',
        data: {
          media: {
            type: 'source',
            // @ts-ignore
            src: 'https://cdn.quasar.dev/img/parallax1.jpg'
          },
          height: '200',
          speed: '0.25',
          layout: defaultLayout()
        },
        indexData: 'Lorem ipsum'
      }
    },
    {
      id: 'parallax-02',
      name: 'Parallax: lorem ipsum',
      widget: {
        id: '',
        widgetType: 'parallax',
        data: {
          media: {
            type: 'source',
            // @ts-ignore
            src: 'https://cdn.quasar.dev/img/parallax1.jpg'
          },
          height: '200',
          speed: '0.25',
          title: {
            text: 'Lorem ipsum',
            color: '#ffffff',
            textStyle: 'h1',
            textWeight: 'regular'
          },
          layout: defaultLayout()
        },
        indexData: 'Lorem ipsum'
      }
    },

  ]
}
