// import process from 'process';

export const APPLICATION_ID = /*process.env.APPLICATION_ID ||*/ 'annette-console'

export interface PersonProfile {
  id: string,
  lastname: string,
  firstname: string,
  middlename?: string,
  fullname?: string,
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
  // eslint-disable-next-line @typescript-eslint/ban-types
  action?: string | object,
  actionName?: string,
}
