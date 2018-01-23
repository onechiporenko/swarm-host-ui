import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  host: 'http://localhost:54321',
  namespace: 'lair',
  headers: {
    'Content-Type': 'application/json'
  },
  pathForType(modelName) {
    return `factories/${modelName}`;
  }
});
