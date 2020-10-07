// Platform specific declarations
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
