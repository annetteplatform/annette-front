export * from './markdown'
export * from './html'
export * from './parallax'
export * from './template'

import {WidgetTemplate} from './template';
import {markdownWidgets} from './markdown';
import {htmlWidgets} from './html';
import {parallaxWidgets} from './parallax';


export function widgetTemplates(): WidgetTemplate<any>[] {
  return [
    ...markdownWidgets(),
    ...htmlWidgets(),
    ...parallaxWidgets(),
    {
      id: 'Video-01',
      name: 'Video',
      widget: {
        id: '',
        widgetType: 'video',
        data: {
          src: 'http://www.peach.themazzone.com/durian/movies/sintel-2048-surround.mp4',
          ratio: '1.777777',
          height: '400'
        },
        indexData: ''
      }
    },
    {
      id: 'YouTube-01',
      name: 'YouTube Video',
      widget: {
        id: '',
        widgetType: 'youtube',
        data: {
          src: 'http://youtube.com/embed/D9y2Ex3NN34',
          ratio: '1.777777',
          height: '400'
        },
        indexData: ''
      }
    }
  ]
}
