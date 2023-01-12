import axios from 'axios'
import {AnnettePrincipal, FindResult} from 'src/shared/model'
import {SpaceView, SpaceViewFilter} from './space-view.model';

export const cmsSpaceViewService = {

  async findSpaceViews(filter: SpaceViewFilter, offset: number, size: number) {
    const query = {
      offset,
      size,
      ...filter
    }
    return await axios.post<FindResult>('/api/annette/v1/cms/findSpaceViews', query)
      .then(result => result.data)
  },

  async getSpaceView(id: string, readSide = true) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.get<SpaceView>(`/api/annette/v1/cms/getSpaceView/${id}/${readSide}`)
      .then(result => convertSpaceView(result.data))
  },

  async getSpaceViews(ids: string[]) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.post<SpaceView[]>('/api/annette/v1/cms/getSpaceViews', ids)
      .then(result => result.data.map(convertSpaceView))
  },

  async subscribeToSpace(id: string) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.post<AnnettePrincipal[]>(`/api/annette/v1/cms/subscribeToSpace/${id}`)
      .then(result => result.data)
  },
  async unsubscribeFromSpace(id: string) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.post<AnnettePrincipal[]>(`/api/annette/v1/cms/unsubscribeFromSpace/${id}`)
      .then(result => result.data)
  },
}

function convertSpaceView(rawSpaceView: SpaceView): SpaceView {
  const spaceView: SpaceView = {...rawSpaceView}
  if (rawSpaceView.updatedAt) {
    spaceView.updatedAt = new Date(rawSpaceView.updatedAt)
  }
  return spaceView
}
