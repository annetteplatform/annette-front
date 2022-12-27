import {MediaData} from './media-data';
import {WidgetLayout} from './widget-layout';

export interface  ParallaxData {
  anchor: string
  media: MediaData
  height: string
  speed: string
  title?: TitleData
  layout: WidgetLayout
}

export interface  TitleData {
  text: string,
  color: string,
  textStyle: string
  textWeight: string
}
