import {AnnettePrincipal} from 'src/shared/model';

export interface FileDescriptor {
  objectId: string,
  fileType: string,
  fileId: string,
  filename: string,
  contentType: string,
  updatedAt?: Date,
  updatedBy?: AnnettePrincipal
}

export interface Files {
  media: FileDescriptor[]
  docs: FileDescriptor[]
}


export interface RemoveFilePayload {
  id: string,
  file: FileDescriptor
}

