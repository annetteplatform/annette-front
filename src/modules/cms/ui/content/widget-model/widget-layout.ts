export interface WidgetLayout {
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
