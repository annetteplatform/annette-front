import {WidgetLayout} from './widget-layout';
import {MediaData} from './media-data';

export interface VideoData {
  anchor: string
  media: MediaData
  type: string
  layout: WidgetLayout
}
