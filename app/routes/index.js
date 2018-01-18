import Route from '@ember/routing/route';
import {get, set} from '@ember/object';
import {getOwner} from '@ember/application';

export default Route.extend({
  queryParams: {
    factory: {
      refreshModel: true
    }
  },

  beforeModel() {
    let factory = this.paramsFor('index').factory;
    if (!factory) {
      factory = get(getOwner(this).lookup('route:application'), 'moveTo');
      return this.transitionTo({queryParams: {factory}});
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
