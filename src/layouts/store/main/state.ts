import {PersonProfile, ServiceGroup} from 'layouts/store/model'

export interface MainState {
  isAuthenticated: boolean,
  profile: PersonProfile | null,
  serviceGroups: ServiceGroup[],
  // eslint-disable-next-line @typescript-eslint/ban-types
  openGroups: object,
}

function state(): MainState {
  return {
    isAuthenticated: false,
    profile: null,
    serviceGroups: [],
    openGroups: {}
  }
};

export default state;
