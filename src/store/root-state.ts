export interface RouteState {
  path: string,
  params: object,
  query: object
}

export interface RootState {
  version: string,
  route?: RouteState
}
