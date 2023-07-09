export type AnnettePrincipal = string

export function newPrincipal(principalType: string, principalId: string) {
  return `${principalType}~${principalId}`
}

export function extractPrincipalType (p: string): string {
  return  p.split('~')[0]
}

export function extractPrincipalId (p: string): string {
  return  p.split('~')[1]
}


export const AUTHENTICATED_PRINCIPAL = newPrincipal( 'authenticated','user')
export const ANONYMOUS_PRINCIPAL = newPrincipal( 'person','ANONYMOUS')

export const PRINCIPAL_TYPES = [
  'person',
  'org-position',
  'unit-chief',
  'direct-unit',
  'descendant-unit',
  'org-role',
  'tech'
]

export const PrincipalTypeNames: {[id: string]: string} = {
  'org-position': 'Position',
  'unit-chief': 'Unit chief',
  'direct-unit': 'Direct unit',
  'descendant-unit': 'Descendant unit'
}











