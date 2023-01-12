import axios from 'axios'
import {FindResult} from 'src/shared/model'
import {AssignHomePagePayloadDto, HomePage,
  HomePageFilter, UnassignHomePagePayloadDto,} from './home-page.model';
import {PageView} from './page-view.model';

export const cmsHomePageService = {

  async assignHomePage(payload: AssignHomePagePayloadDto) {
    return await axios.post<HomePage>('/api/annette/v1/cms/assignHomePage', payload)
      .then(result => convertHomePage(result.data))
  },

  async unassignHomePage(id: string) {
    const payload: UnassignHomePagePayloadDto = {id}
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await axios.post('/api/annette/v1/cms/unassignHomePage', payload)
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      .then(result => result.data)
  },

  async getHomePage(id: string, readSide = true,) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.get<HomePage>(`/api/annette/v1/cms/getHomePage/${id}/${readSide}`)
      .then(result => convertHomePage(result.data))
  },

  async getHomePages(ids: string[], readSide = true) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.post<HomePage[]>(`/api/annette/v1/cms/getHomePages/${readSide}`, ids)
      .then(result => result.data.map(convertHomePage))
  },

  async findHomePages(filter: HomePageFilter, offset: number, size: number) {
    const query = {
      offset,
      size,
      ...filter
    }
    return await axios.post<FindResult>('/api/annette/v1/cms/findHomePages', query)
      .then(result => result.data)
  },

  async getMyHomePage(applicationId: string) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.get<PageView>(`/api/annette/v1/cms/getMyHomePage/${applicationId}`)
      .then(result => result.data)
  },
}

function convertHomePage(rawPage: HomePage): HomePage {
  const page: HomePage = {...rawPage}
  if (rawPage.updatedAt) {
    page.updatedAt = new Date(rawPage.updatedAt)
  }
  return page
}
