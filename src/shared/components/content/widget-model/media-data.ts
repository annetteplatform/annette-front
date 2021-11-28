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
