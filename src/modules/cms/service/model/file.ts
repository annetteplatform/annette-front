import {AnnettePrincipal} from 'src/shared';

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
