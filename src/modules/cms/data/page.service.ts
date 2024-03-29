import axios from 'axios'
import {FindResult} from 'src/shared/model'
import {
  AssignPageTargetPrincipalPayloadDto,
  CreatePagePayloadDto,
  Page,
  PageFilter, UnassignPageTargetPrincipalPayloadDto,
  UpdatePageAuthorPayloadDto,
  UpdatePagePublicationTimestampPayloadDto,
  UpdatePageTitlePayloadDto,
} from './page.model';
import {
  ChangeWidgetOrderPayloadDto, DeleteWidgetPayloadDto,
  UpdateContentSettingsPayloadDto,
  UpdateWidgetPayloadDto
} from './content.model';
import {
   FileDescriptor, Files,
} from './file.model';
import {Updated} from './update.model';

export const cmsPageService = {

  async createPage(payload: CreatePagePayloadDto) {
    return await axios.post<Page>('/api/annette/v1/cms/createPage', payload)
      .then(result => convertPage(result.data))
  },

  async updatePageTitle(payload: UpdatePageTitlePayloadDto) {
    return await axios.post<Updated>('/api/annette/v1/cms/updatePageTitle', payload)
      .then(result => convertUpdated(result.data))
  },

  async updatePageAuthor(payload: UpdatePageAuthorPayloadDto) {
    return await axios.post<Updated>('/api/annette/v1/cms/updatePageAuthor', payload)
      .then(result => convertUpdated(result.data))
  },

  async updatePageContentSettings(payload: UpdateContentSettingsPayloadDto) {
    return await axios.post<Updated>('/api/annette/v1/cms/updatePageContentSettings', payload)
      .then(result => convertUpdated(result.data))
  },

  async updatePageWidget(payload: UpdateWidgetPayloadDto) {
    return await axios.post<Updated>('/api/annette/v1/cms/updatePageWidget', payload)
      .then(result => convertUpdated(result.data))
  },

  async changePageWidgetOrder(payload: ChangeWidgetOrderPayloadDto) {
    return await axios.post<Updated>('/api/annette/v1/cms/changePageWidgetOrder', payload)
      .then(result => convertUpdated(result.data))
  },

  async deletePageWidget(payload: DeleteWidgetPayloadDto) {
    return await axios.post<Updated>('/api/annette/v1/cms/deletePageWidget', payload)
      .then(result => convertUpdated(result.data))
  },

  async updatePagePublicationTimestamp(payload: UpdatePagePublicationTimestampPayloadDto) {
    return await axios.post<Updated>('/api/annette/v1/cms/updatePagePublicationTimestamp', payload)
      .then(result => convertUpdated(result.data))
  },

  async assignPageTargetPrincipal(payload: AssignPageTargetPrincipalPayloadDto) {
    return await axios.post<Updated>('/api/annette/v1/cms/assignPageTargetPrincipal', payload)
      .then(result => convertUpdated(result.data))
  },

  async unassignPageTargetPrincipal(payload: UnassignPageTargetPrincipalPayloadDto) {
    return await axios.post<Updated>('/api/annette/v1/cms/unassignPageTargetPrincipal', payload)
      .then(result => convertUpdated(result.data))
  },

  async publishPage(id: string) {
    return await axios.post<Updated>(`/api/annette/v1/cms/publishPage/${id}`)
      .then(result => convertUpdated(result.data))
  },

  async unpublishPage(id: string) {
    return await axios.post<Updated>(`/api/annette/v1/cms/unpublishPage/${id}`)
      .then(result => convertUpdated(result.data))
  },

  async deletePage(id: string) {
    return await axios.post<Updated>('/api/annette/v1/cms/deletePage', {id})
      .then(result => convertUpdated(result.data))
  },

  async getPageAnnotation(id: string, readSide = true) {
    const params = {
      source: readSide ? undefined : 'origin',
    }
    return await axios.get<Page>(`/api/annette/v1/cms/getPage/${id}`, {params})
      .then(result => convertPage(result.data))
  },

  async getPage(id: string,
                    readSide = true,
                    withContent: boolean,
                    withTargets: boolean,
  ) {
    const params = {
      source: readSide ? undefined : 'origin',
      withContent,
      withTargets
    }
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.get<Page>(`/api/annette/v1/cms/getPage/${id}`, {params})
      .then(result => convertPage(result.data))
  },

  async getPagesAnnotation(ids: string[], readSide = true) {
    const params = {
      source: readSide ? undefined : 'origin',
    }
    return await axios.post<Page[]>('/api/annette/v1/cms/getPages', ids, {params})
      .then(result => result.data.map(convertPage))
  },

  async getPages(ids: string[], readSide = true) {
    const params = {
      source: readSide ? undefined : 'origin',
      withContent:true,
      withTargets:true
    }
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.post<Page[]>('/api/annette/v1/cms/getPages', ids, {params})
      .then(result => result.data.map(convertPage))
  },

  async findPages(filter: PageFilter, offset: number, size: number) {
    const query = {
      offset,
      size,
      ...filter
    }
    if (query.spaces && query.spaces.length === 0) {
      query.spaces = undefined
    }
    return await axios.post<FindResult>('/api/annette/v1/cms/findPages', query)
      .then(result => result.data)
  },

  async getPageFiles(id: string) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.get<FileDescriptor[]>(`/api/annette/v1/cms/getPageFiles/${id}`)
      .then(result => {
        const files: Files = {
          docs: result.data
            .filter(d => d.fileType === 'doc')
            .map(convertFileDescriptor)
            .sort((a, b) => a.filename.toLowerCase() < b.filename.toLowerCase() ? -1 : 1),
          media: result.data
            .filter(d => d.fileType === 'media')
            .map(convertFileDescriptor)
            .sort((a, b) => a.filename.toLowerCase() < b.filename.toLowerCase() ? -1 : 1),
        }
        return files
      })
  },

  async removePageFile(pageId: string,
                       fileType: string,
                       fileId: string,) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return await axios.post(`/api/annette/v1/cms/removePageFile/${pageId}/${fileType}/${fileId}`)
      .then(() => true)
  },
}


function convertFileDescriptor(rawFD: FileDescriptor): FileDescriptor {
  const fd: FileDescriptor = {...rawFD}
  if (rawFD.updatedAt) {
    fd.updatedAt = new Date(rawFD.updatedAt)
  }
  return fd
}


function convertPage(rawPage: Page): Page {
  const page: Page = {...rawPage}
  if (rawPage.updatedAt) {
    page.updatedAt = new Date(rawPage.updatedAt)
  }
  return page
}

function convertUpdated(updated: Updated): Updated {
  if (updated.updatedAt) {
    updated.updatedAt = new Date(updated.updatedAt)
  }
  return updated
}
