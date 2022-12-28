import {WidgetLayout} from './widget-layout';

export interface HeaderData {
  anchor: string
  title: string
  textColor: string
  backgroundColor: string
  actions: HeaderAction[]
  layout: WidgetLayout
}

export interface HeaderAction {
  caption: string
  type: string // login, logout, url
}

export interface UrlHeaderAction extends HeaderAction {
  url: string
  newWindow: boolean
}

