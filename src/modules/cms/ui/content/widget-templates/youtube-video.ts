import {YoutubeVideoData} from '../widget-model';
import {WidgetTemplate} from './template';
import {defaultLayout} from './layout';

export function youtubeVideoWidgets(): WidgetTemplate<YoutubeVideoData>[] {
  return [
    {
      id: 'YouTube-01',
      name: 'YouTube Video',
      widget: {
        id: '',
        widgetType: 'youtube',
        data: {
          anchor: '',
          src: 'http://youtube.com/embed/D9y2Ex3NN34',
          ratio: '1.777777',
          height: '400px',
          layout: defaultLayout()
        },
        indexData: ''
      }
    }
  ]
}
