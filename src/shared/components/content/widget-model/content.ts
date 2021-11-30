import {MediaData} from './media-data';
import {WidgetLayout} from './widget-layout';

export interface ContentData {
  anchor: string
  container: ContentContainerData
  items: ContentItemData[]
  layout: WidgetLayout
}

export interface ContentContainerData {
  wrap: string
  justify: string
  align: string
}

export const CONTENT_WRAPS = [
  'wrap', 'no-wrap', 'reverse-wrap'
]

export function contentWrapToClass(wrap: string): string {
  if (wrap && CONTENT_WRAPS.includes(wrap) ) {
    return wrap
  } else return ''
}

export const CONTENT_JUSTIFIES = [
  'start', 'end', 'center', 'between', 'around', 'evenly'
]

export function contentJustifyToClass(justify: string): string {
  if (justify && CONTENT_JUSTIFIES.includes(justify) ) {
    return `justify-${justify}`
  } else return ''
}

export const CONTENT_ALIGNMENT = [
  'start', 'end', 'center', 'stretch', 'baseline'
]

export function contentAlignToClass(align: string): string {
  if (align && CONTENT_ALIGNMENT.includes(align) ) {
    return `items-${align}`
  } else return ''
}

export interface ContentItemData {
  maxWidth: string
  media?: MediaData
  header?: ContentTextElement
  subheader?: ContentTextElement
  text?: ContentTextElement
  action?: ContentAction
}

export interface ContentTextElement {
  text: string
  style: string //
  weight: string
  justify: string
}

export const CONTENT_TEXT_STYLES = [
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'subtitle1', 'subtitle2', 'body1', 'body2', 'caption', 'overline'
]

export function contentTextStyleToClass(style: string): string {
  if (style && CONTENT_TEXT_STYLES.includes(style) ) {
    return `text-${style}`
  } else return ''
}

export const CONTENT_TEXT_WEIGHTS = [
  'thin', 'light', 'regular', 'medium', 'bold', 'bolder'
]
export function contentTextWeightToClass(weight: string): string {
  if (weight && CONTENT_TEXT_WEIGHTS.includes(weight) ) {
    return `text-weight-${weight}`
  } else return ''
}

export const CONTENT_TEXT_JUSTIFIES = [
  'right', 'left', 'center', 'justify'
]
export function contentTextJustifyToClass(justify: string): string {
  if (justify && CONTENT_TEXT_JUSTIFIES.includes(justify) ) {
    return `text-${justify}`
  } else return ''
}

export interface ContentAction {
  caption: string
  type: string // default, flat, outline
  action: string // login, logout, url
  justify: string
  url?: string
  newWindow?: boolean
}
export const CONTENT_ACTION_TYPES = [
  'default', 'flat', 'outline'
]

export const CONTENT_ACTIONS = [
  'login', 'logout', 'url'
]




