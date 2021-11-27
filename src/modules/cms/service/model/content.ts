import {ContentSettings} from './content-settings';

export type WidgetMap = { [key: string]: Widget<any> }

export interface Content{
  settings: ContentSettings,
  widgetOrder: string[],
  widgets: WidgetMap
}

export interface Widget<T> {
  id: string,
  widgetType: string,
  data: T,
  indexData?: string
}

export interface UpdateContentSettingsPayloadDto {
  id: string
  contentType?: string
  settings: ContentSettings
}


export interface UpdateWidgetPayloadDto {
  id: string,
  contentType?: string,
  widget: Widget<any>,
  order?: number
}

export interface ChangeWidgetOrderPayloadDto {
  id: string,
  contentType?: string,
  widgetId: string,
  order: number
}

export interface DeleteWidgetPayloadDto {
  id: string,
  contentType?: string,
  widgetId: string,
}
