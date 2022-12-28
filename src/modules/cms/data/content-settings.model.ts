
export type ContentSettings  = any

export interface PageSettings {
  showBlog?: boolean,
  showTitle: boolean,
  showAuthor: boolean,
  showStatusLine: boolean,
  showFeatured?: boolean,
  showBorder?: boolean,
  showReadMore?: boolean,
  pageLayout: string,
  headerLayout: string
}

export type ContentLayoutMap = { [key: string]: ContentLayout }

export interface ContentLayout {
  padding: Margin
  margin: Margin,
  backgroundColor?: string,
  horizontal?: HorizontalLayout
}

export interface HorizontalLayout {
  justify: string, // start center end
  maxWidth: string
}

export interface Margin {
  top?: string,
  right?: string,
  bottom?: string,
  left?: string
}

