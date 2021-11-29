
export * from './markdown'
export * from './html'
export * from './parallax'
export * from './template'

import {WidgetTemplate} from './template';
import {markdownWidgets} from './markdown';
import {htmlWidgets} from './html';
import {parallaxWidgets} from './parallax';
import {videoWidgets} from './video';
import {youtubeVideoWidgets} from './youtube-video';


export function widgetTemplates(): WidgetTemplate<any>[] {
  return [
    ...markdownWidgets(),
    ...htmlWidgets(),
    ...parallaxWidgets(),
    ...videoWidgets(),
    ...youtubeVideoWidgets()
  ]
}
