import {Caption} from './multi-language'

export interface AttributeMetadata {
  type:string
  subtype?:string
  allowedValues?: string[],
  name: string
  caption: Caption
  index?: string
  readSidePersistence: boolean
}

export type EntityAttributesMetadata = { [attribute: string]: AttributeMetadata}
export type AttributeValues = { [attribute: string]: string }
export type EntitiesAttributeValues = { [id: string]: AttributeValues }

export interface UpdateAttributesPayload {
  id: string,
  attributes: AttributeValues
}
