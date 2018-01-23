import DS from 'ember-data';

export default DS.Transform.extend({
  deserialize(serialized) {
    return JSON.stringify(serialized, null, 2);
  },

  serialize(deserialized) {
    return JSON.parse(deserialized);
  }
});
