export interface SortBy {
  field: string,
  descending?: boolean
}

export interface FindResult {
  total: number
  hits: HitResult[]
}

export interface HitResult {
  id: string
  score: number
  updatedAt: string
}

export interface AnnettePrincipal {
  principalType: string,
  principalId: string
}


export enum MessageType {
  Info = 'I',
  Warning = 'W',
  Error = 'E'
}

export interface Message {
  code: string
  messageType: MessageType
  params: any
}

export interface AnnetteError {
  code: string
  errorCode?: number
  messageType?: MessageType
  params: any
  originError?: any
}

export interface SimpleFilter {
  filter?: string
  sortBy?: SortBy
}




