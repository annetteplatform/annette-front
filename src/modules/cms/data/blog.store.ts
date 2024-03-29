import {defineStore} from 'pinia';
import {useEntityStore} from 'src/shared/store';
import {cmsBlogService} from './blog.service';
import {
  AssignBlogPrincipalPayloadDto,
  Blog,
  BlogFilter,
  CreateBlogPayloadDto,
  emptyBlogFilter, UnassignBlogPrincipalPayloadDto, UpdateBlogCategoryPayloadDto,
  UpdateBlogDescriptionPayloadDto,
  UpdateBlogNamePayloadDto
} from './blog.model';

const DEFAULT_PAGE_SIZE = 10

export const useBlogStore = defineStore('cmsBlog', () => {

  const entityStore = useEntityStore<Blog, BlogFilter>({
    defaultPageSize: DEFAULT_PAGE_SIZE,
    defaultFilter: emptyBlogFilter,
    find: cmsBlogService.findBlogs,
    getEntity: cmsBlogService.getBlog,
    getEntities: cmsBlogService.getBlogs,
  })

  const createEntity = async (entity: CreateBlogPayloadDto) => {
    const newEntity = await cmsBlogService.createBlog(entity)
    entityStore.storeEntity(newEntity)
    return newEntity
  }

  const updateEntityName = async (entity: UpdateBlogNamePayloadDto) => {
    const newEntity = await cmsBlogService.updateBlogName(entity)
    entityStore.storeEntity(newEntity)
    return newEntity
  }

  const updateEntityDescription = async (entity: UpdateBlogDescriptionPayloadDto) => {
    const newEntity = await cmsBlogService.updateBlogDescription(entity)
    entityStore.storeEntity(newEntity)
    return newEntity
  }

  const updateEntityCategoryId = async (entity: UpdateBlogCategoryPayloadDto) => {
    const newEntity = await cmsBlogService.updateBlogCategoryId(entity)
    entityStore.storeEntity(newEntity)
    return newEntity
  }

  const assignEntityAuthorPrincipal = async (entity: AssignBlogPrincipalPayloadDto) => {
    const newEntity = await cmsBlogService.assignBlogAuthorPrincipal(entity)
    entityStore.storeEntity(newEntity)
    return newEntity
  }

  const unassignEntityAuthorPrincipal = async (entity: UnassignBlogPrincipalPayloadDto) => {
    const newEntity = await cmsBlogService.unassignBlogAuthorPrincipal(entity)
    entityStore.storeEntity(newEntity)
    return newEntity
  }

  const assignEntityTargetPrincipal = async (entity: AssignBlogPrincipalPayloadDto) => {
    const newEntity = await cmsBlogService.assignBlogTargetPrincipal(entity)
    entityStore.storeEntity(newEntity)
    return newEntity
  }

  const unassignEntityTargetPrincipal = async (entity: UnassignBlogPrincipalPayloadDto) => {
    const newEntity = await cmsBlogService.unassignBlogTargetPrincipal(entity)
    entityStore.storeEntity(newEntity)
    return newEntity
  }
  const activateEntity = async (id: string) => {
    const newEntity = await cmsBlogService.activateBlog(id)
    entityStore.storeEntity(newEntity)
    return newEntity
  }
  const deactivateEntity = async (id: string) => {
    const newEntity = await cmsBlogService.deactivateBlog(id)
    entityStore.storeEntity(newEntity)
    return newEntity
  }


  const deleteEntity = async (id: string) => {
    await cmsBlogService.deleteBlog(id)
    entityStore.removeEntity(id)
  }


  return {
    ...entityStore,
    createEntity,
    updateEntityName,
    updateEntityDescription,
    updateEntityCategoryId,
    assignEntityAuthorPrincipal,
    unassignEntityAuthorPrincipal,
    assignEntityTargetPrincipal,
    unassignEntityTargetPrincipal,
    activateEntity,
    deactivateEntity,
    deleteEntity
  }

})
