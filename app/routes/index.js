import Route from '@ember/routing/route';
import {get, set} from '@ember/object';

export default Route.extend({
  queryParams: {
    factory: {
      refreshModel: true
    }
  },
  model ({factory}) {
    return get(this, 'store').findAll(factory, {reload: true});
  },

  setupController(controller) {
    this._super(...arguments);
    set(controller, 'isLoading', false);
  },

  actions: {
    willTransition() {
      set(this, 'controller.isLoading', true);
    }
  }
});
