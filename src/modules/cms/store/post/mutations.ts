import {MutationTree} from 'vuex';
import {
  Action,
  emptyPostFilter, InitPostEditorPayload,
  POST_DEFAULT_PAGE_SIZE,
  PostState
} from './state';
import {
  DeleteFilePayload,
  FileDescriptor,
  Files,
  Post,
  PostFilter
} from 'src/modules/cms';
import {uid} from 'quasar';
import {AnnettePrincipal, buildMutations} from 'src/shared';

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


export const mutations: MutationTree<PostState> = {
  ...buildMutations<Post, PostFilter>(
    POST_DEFAULT_PAGE_SIZE,
    emptyPostFilter
  ),

  initPostEditor: (state: PostState, payload: InitPostEditorPayload) => {
    state.editor.id = payload.id
    state.editor.action = payload.action
    state.editor.files = {
      media: [],
      docs: []
    }
    state.editor.blogName = undefined
    if (payload.action === Action.Create) {
      state.editor.post = emptyEntity(uid(), payload.blogId as string, payload.personId as string)
    }
  },

  updateEditorPost: (state: PostState, post: Post) => {
    state.editor.post = post
  },

  updateEditorBlogName: (state: PostState, blogName: string) => {
    state.editor.blogName = blogName
  },

  updateEditorId: (state: PostState, data: string) => {
    if (state.editor.post && state.editor.action === Action.Create) {
      state.editor.post.id = data
      state.editor.id = data
    }
  },

  updateEditorTitle: (state: PostState, data: string) => {
    if (state.editor.post) {
      state.editor.post.title = data
    }
  },

  updateEditorAuthor: (state: PostState, data: AnnettePrincipal) => {
    if (state.editor.post) {
      state.editor.post.authorId = data
    }
  },

  updateEditorFeatured: (state: PostState, data: boolean) => {
    if (state.editor.post) {
      state.editor.post.featured = data
    }
  },

  updateEditorPublicationStatus: (state: PostState, data: boolean) => {
    if (state.editor.post) {
      state.editor.post.publicationStatus = data ? 'published' : 'draft'
    }
  },

  updateEditorPublicationTimestamp: (state: PostState, data: Date) => {
    if (state.editor.post) {
      state.editor.post.publicationTimestamp = data
    }
  },

  assignEditorTargetPrincipal: (state: PostState, data: AnnettePrincipal) => {
    if (state.editor.post) {
      // @ts-ignore
      state.editor.post.targets = [...state.editor.post.targets, data]
    }
  },

  unassignEditorTargetPrincipal: (state: PostState, data: AnnettePrincipal) => {
    if (state.editor.post) {
      // @ts-ignore
      state.editor.post.targets = state.editor.post.targets.filter(p => p !== data)
    }
  },


  // ******************** Files ********************

  updateEditorFiles: (state: PostState, files: Files) => {
    state.editor.files = files
  },

  editorFileUploaded: (state: PostState, file: FileDescriptor) => {
    if (file.fileType === 'doc') {
      const files = [...state.editor.files.docs, file]
      state.editor.files.docs = files.sort((a, b) => a.filename.toLowerCase() < b.filename.toLowerCase() ? -1 : 1)
    } else {
      const files = [...state.editor.files.media, file]
      state.editor.files.media = files.sort((a, b) => a.filename.toLowerCase() < b.filename.toLowerCase() ? -1 : 1)
    }
  },

  deleteEditorFile: (state: PostState, payload: DeleteFilePayload) => {
    if (payload.file.fileType === 'doc') {
      state.editor.files.docs = state.editor.files.docs.filter(fd => fd.fileId !== payload.file.fileId)
    } else {
      state.editor.files.media = state.editor.files.media.filter(fd => fd.fileId !== payload.file.fileId)
    }
  },


}
