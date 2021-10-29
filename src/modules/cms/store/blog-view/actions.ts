import {ActionTree} from 'vuex';
import {StateInterface} from 'src/store';
import {
  BlogView,
  BlogViewFilter, UpdateSubscriptionPayload,
} from 'src/modules/cms';
import {buildActions} from 'src/shared';
import {cmsBlogViewService} from '../../service/cms-blog-view.service';
import {BlogViewState} from 'src/modules/cms/store/blog-view/state';

export const actions: ActionTree<BlogViewState, StateInterface> = {
  ...buildActions<BlogView, BlogViewFilter, StateInterface>(
    // eslint-disable-next-line @typescript-eslint/unbound-method
    cmsBlogViewService.findBlogViews,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    cmsBlogViewService.getBlogViewById,
    // eslint-disable-next-line @typescript-eslint/unbound-method
    cmsBlogViewService.getBlogViewsById,
  ),

  async subscribeToBlog ({ commit }, id: string) {
    const subscriptions = await cmsBlogViewService.subscribeToBlog(id)
    const payload: UpdateSubscriptionPayload = {
      id,
      subscriptions
    }
    commit('updateSubscriptions', payload)
    return subscriptions
  },

  async unsubscribeFromBlog ({ commit }, id: string) {
    const subscriptions = await cmsBlogViewService.unsubscribeFromBlog(id)
    const payload: UpdateSubscriptionPayload = {
      id,
      subscriptions
    }
    commit('updateSubscriptions', payload)
    return subscriptions
  },

}





