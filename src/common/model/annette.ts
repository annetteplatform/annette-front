export interface SortBy {
  field: string,
  ascending: boolean
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params: any
}

export interface SimpleFilter {
  filter?: string
  sortBy?: SortBy
}


