export interface Icon {
  type: string
}

export interface FileIcon extends Icon {
  url: string
}

export interface FrameworkIcon extends Icon {
  icon: string
}

export interface ServiceLink {
  url: string
  openInNew?: boolean
  type: string
}

export interface InternalLink extends ServiceLink {
  applicationId: string,
}

export interface UserServiceItem {
  id: string,
  type: string,
  icon: Icon,
  label: string,
  labelDescription: string,
  score?: number,
}

export interface UserService extends UserServiceItem {
  link: ServiceLink,
}

export interface UserService extends UserServiceItem {
  children: string[],
}

export interface ScopeServicesResult {
  root: string[],
  serviceItems: UserServiceItem[],
  applicationUrls: { [key: string]: string }
}

export type ServiceMap = { [key: string]: UserServiceItem }
export type ApplicationUrls = { [key: string]: string }

export interface ScopeServices {
  root: string[],
  serviceMap: ServiceMap,
  applicationUrls: ApplicationUrls
}
