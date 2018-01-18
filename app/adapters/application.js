import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  host: 'http://localhost:54321',
  namespace: 'lair',
  pathForType(modelName) {
    return `factories/${modelName}`;
  }
});
