import {typeOf} from '@ember/utils';
import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize(serialized) {
    return typeOf(serialized) === 'undefined' ? serialized : JSON.stringify(serialized, null, 2);
  },

  serialize(deserialized) {
    return typeOf(deserialized) === 'undefined' ? deserialized : JSON.parse(deserialized);
  }
});
