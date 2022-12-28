export interface Caption {
  type: string
}
export interface TextCaption extends Caption {
  text: string
}

export interface TranslationCaption extends Caption {
  translationId: string
}

export type MultiLanguageText = { [id: string]: string }
