import DS from 'ember-data';
import {getOwner} from '@ember/application';
import {get} from '@ember/object';

export default DS.JSONAPIAdapter.extend({
  host: 'http://localhost:54321',
  namespace: 'lair',
  pathForType(modelName) {
    return `factories/${modelName}`;
  }
});
