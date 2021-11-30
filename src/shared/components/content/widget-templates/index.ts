
export * from './content'
export * from './header'
export * from './html'
export * from './markdown'
export * from './parallax'
export * from './template'
export * from './video'
export * from './youtube-video'

import {WidgetTemplate} from './template';
import {markdownWidgets} from './markdown';
import {headerWidgets} from 'src/shared/components/content';
import {htmlWidgets} from './html';
import {parallaxWidgets} from './parallax';
import {contentWidgets} from './content';
import {videoWidgets} from './video';
import {youtubeVideoWidgets} from './youtube-video';


export function widgetTemplates(): WidgetTemplate<any>[] {
  return [
    ...markdownWidgets(),
    ...htmlWidgets(),
    ...parallaxWidgets(),
    ...headerWidgets(),
    ...contentWidgets(),
    ...videoWidgets(),
    ...youtubeVideoWidgets()
  ]
}
