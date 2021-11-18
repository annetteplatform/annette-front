import {MutationTree} from 'vuex';
import {Action, DeleteFilePayload, InitPayload, PostEditState} from './state';
import {FileDescriptor, Files, Post} from 'src/modules/cms';
import {uid} from 'quasar';
import {AnnettePrincipal} from 'src/shared';

function emptyEntity(id: string, blogId: string, personId: string) {
  return {
    id: id,
    blogId: blogId,
    featured: false,
    authorId: {
      principalType: 'person',
      principalId: personId
    },
    title: '',
    introContent: [],
    content: [],
    publicationStatus: 'draft',
  } as Post
}


export const mutations: MutationTree<PostEditState> = {
  init: (state: PostEditState, payload: InitPayload) => {
    state.id = payload.id
    state.action = payload.action
    state.files = {
      media: [],
      docs: []
    }
    state.blogName = undefined
    if (payload.action === Action.Create) {
      state.post = emptyEntity(uid(), payload.blogId as string, payload.personId as string)
    }
  },


  updatePost: (state: PostEditState, post: Post) => {
    state.post = post
  },

  updateId: (state: PostEditState, data: string) => {
    if (state.post && state.action === Action.Create) {
      state.post.id = data
      state.id = data
    }
  },

  updateTitle: (state: PostEditState, data: string) => {
    if (state.post) {
      state.post.title = data
    }
  },

  updateAuthor: (state: PostEditState, data: AnnettePrincipal) => {
    if (state.post) {
      state.post.authorId = data
    }
  },

  updateFeatured: (state: PostEditState, data: boolean) => {
    if (state.post) {
      state.post.featured = data
    }
  },

  updatePublicationStatus: (state: PostEditState, data: boolean) => {
    if (state.post) {
      state.post.publicationStatus = data ? 'published' : 'draft'
    }
  },

  updatePublicationTimestamp: (state: PostEditState, data: Date) => {
    if (state.post) {
      state.post.publicationTimestamp = data
    }
  },

  assignTargetPrincipal: (state: PostEditState, data: AnnettePrincipal) => {
    if (state.post) {
      // @ts-ignore
      state.post.targets = [...state.post.targets, data]
    }
  },

  unassignTargetPrincipal: (state: PostEditState, data: AnnettePrincipal) => {
    if (state.post) {
      // @ts-ignore
      state.post.targets = state.post.targets.filter(p => p !== data)
    }
  },


  // ******************** Files ********************

  updateFiles: (state: PostEditState, files: Files) => {
    state.files = files
  },

  fileUploaded: (state: PostEditState, file: FileDescriptor) => {
    if (file.fileType === 'doc') {
      const files = [...state.files.docs, file]
      state.files.docs = files.sort((a, b) => a.filename.toLowerCase() < b.filename.toLowerCase() ? -1 : 1)
    } else {
      const files = [...state.files.media, file]
      state.files.media = files.sort((a, b) => a.filename.toLowerCase() < b.filename.toLowerCase() ? -1 : 1)
    }
  },

  deleteFile: (state: PostEditState, payload: DeleteFilePayload) => {
    if (payload.file.fileType === 'doc') {
      state.files.docs = state.files.docs.filter(fd => fd.fileId !== payload.file.fileId)
    } else {
      state.files.media = state.files.media.filter(fd => fd.fileId !== payload.file.fileId)
    }
  },

  updateBlogName: (state: PostEditState, blogName: string) => {
    state.blogName = blogName
  },

}
