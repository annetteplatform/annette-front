import {InternalLink, useMainStore, UserService, UserServiceItem} from 'src/main';
import {computed} from 'vue';

const mainStore = useMainStore()

export const useMenuList = (props: Readonly<{ itemIds: string[]; applicationId: string }>) => {

  const getRoute = (item: UserServiceItem) => {
    const service = (item as UserService)
    const url = service.link.url
    const openInNew = service.link.openInNew
    const route = {
      path: '/navigate',
      query: {
        url: url,
        openInNew: openInNew
      }
    }
    if (service.link.type == 'internal') {
      const internalLink = service.link as InternalLink
      if (internalLink.applicationId == props.applicationId && !internalLink.openInNew) {
        return {path: url}
      } else if (internalLink.applicationId == props.applicationId && internalLink.openInNew) {
        route.query.url = window.location.origin + '/' + url
      } else if (mainStore.applicationServices && mainStore.applicationServices.applicationUrls[internalLink.applicationId]) {
        route.query.url = mainStore.applicationServices.applicationUrls[internalLink.applicationId] + internalLink.url
      }
    }
    return route
  }


  const itemsByRow = computed(() => {
    const rows: UserServiceItem[][] = []
    let currentRow: UserServiceItem[] = []
    props.itemIds.forEach(id => {
      if (mainStore.applicationServices && mainStore.applicationServices.serviceMap && mainStore.applicationServices.serviceMap[id]) {
        const serviceItem = mainStore.applicationServices.serviceMap[id]
        if (serviceItem.type == 'service') currentRow.push(serviceItem)
        else {
          if (currentRow.length != 0) {
            rows.push(currentRow)
          }
          rows.push([serviceItem])
          currentRow = []
        }
      }
    })
    if (currentRow.length != 0) {
      rows.push(currentRow)
    }
    return rows
  })

  return {
    getRoute,
    itemsByRow
  }

}
