export interface AppState {
  isAuthenticated: boolean,
  profile: PersonProfile | null,
  groups: string[],
  serviceGroups: ServiceGroup[],
  groupOpen: object,
}

export interface PersonProfile {
  id: string,
  lastname: string,
  firstname: string,
  middlename?: string,
  phone?: string,
  email?: string,
}

export interface ServiceGroup {
  id: string,
  order: number,
  icon: string,
  title: string,
  subtitle?: string,
  services: Service[]
}

export interface Service {
  id: string,
  order: number,
  icon: string,
  title: string,
  subtitle?: string,
  action?: string | object,
  actionName?: string,
}
