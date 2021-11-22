import axios from 'axios'
import { FindResult} from 'src/shared'
import { PageMetric, PageView, PageViewFilter } from './model';

export const cmsPageViewService = {

  async findPageViews(filter: PageViewFilter, offset: number, size: number) {
    const query = {
      offset,
      size,
      ...filter
    }
    if (query.spaces && query.spaces.length === 0) {
      query.spaces = undefined
    }
    return await axios.post<FindResult>('/api/annette/v1/cms/findPageViews', query)
      .then(result => result.data)
  },

  async getPageViewAnnotationsById(ids: string[]) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.post<PageView[]>('/api/annette/v1/cms/getPageViewAnnotationsById', ids)
      .then(result => result.data.map(convertPageView))
  },

  async getPageViewsById(ids: string[]) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.post<PageView[]>('/api/annette/v1/cms/getPageViewsById', ids)
      .then(result => result.data.map(convertPageView))
  },

  async getPageViewById(id: string) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.get<PageView>(`/api/annette/v1/cms/getPageViewById/${id}`)
      .then(result => result.data)
  },

  async viewPage(id: string) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.post<PageMetric>(`/api/annette/v1/cms/viewPage/${id}`)
      .then(result => result.data)
  },

  async likePage(id: string) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.post<PageMetric>(`/api/annette/v1/cms/likePage/${id}`)
      .then(result => result.data)
  },

  async unlikePage(id: string) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.post<PageMetric>(`/api/annette/v1/cms/unlikePage/${id}`)
      .then(result => result.data)
  },
}

function convertPageView(rawPageView: PageView): PageView {
  const pageView: PageView = {...rawPageView}
  if (rawPageView.updatedAt) {
    pageView.updatedAt = new Date(rawPageView.updatedAt)
  }
  return pageView
}
