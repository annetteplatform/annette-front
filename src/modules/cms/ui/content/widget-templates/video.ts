import {VideoData} from '../widget-model';
import {WidgetTemplate} from './template';
import {defaultLayout} from './layout';

export function videoWidgets(): WidgetTemplate<VideoData>[] {
  return [
    {
      id: 'Video-01',
      name: 'Video',
      widget: {
        id: '',
        widgetType: 'video',
        data: {
          anchor: '',
          media: {
            type: 'source',
            // @ts-ignore
            src: 'http://www.peach.themazzone.com/durian/movies/sintel-2048-surround.mp4'
          },
          type: 'video/mp4',
          layout: defaultLayout()
        },
        indexData: ''
      }
    }
  ]
}
