export interface MediaData {
  type: string // source, media
}

export interface SourceMediaData extends MediaData {
  type: string // source, media
  src: string
}

export interface FileMediaData extends MediaData {
  type: string // source, media
  objectId: string
  fileId: string
}

export function mediaToSource(media: MediaData): string {
  if (media && media.type === 'source' ) {
    return (media as SourceMediaData).src
  } else if (media && media.type === 'media' ) {
    const fileMedia = media as FileMediaData
    return `/api/annette/v1/cms/file/${fileMedia.objectId}/media/${fileMedia.fileId}`

  } else return ''
}
