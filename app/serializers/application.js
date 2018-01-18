import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  keyForAttribute(key) {
    return key;
  },
  normalizeArrayResponse(store, primaryModelClass, payload, id, requestType) {
    const newPayload = {
      data: payload.map(item => {
        return {
          id: item.id,
          type: primaryModelClass.modelName,
          attributes: item
        }
      })
    };
    return this._super(store, primaryModelClass, newPayload, id, requestType);
  }
});
