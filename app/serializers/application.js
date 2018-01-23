import DS from 'ember-data';
import {get, getProperties} from '@ember/object';
import {isArray} from '@ember/array';

export default DS.JSONAPISerializer.extend({
  keyForAttribute(key) {
    return key;
  },
  keyForRelationship(key) {
    return key;
  },
  getRelationships(primaryModelClass) {
    const r = [];
    primaryModelClass.eachRelationship((key, descriptor) => r.push(descriptor));
    return r;
  },

  getAttributes(primaryModelClass) {
    const r = [];
    primaryModelClass.eachAttribute((key, descriptor) => r.push(descriptor));
    return r;
  },

  normalizeArrayResponse(store, primaryModelClass, payload, id, requestType) {
    const rel = this.getRelationships(primaryModelClass);
    const relsMap = {};
    rel.map(r => relsMap[r.key] = r.type);
    const attrs = this.getAttributes(primaryModelClass);
    const relationshipNames = rel.mapBy('key');
    const attributeNames = attrs.mapBy('name');
    const newPayload = {
      data: payload.map(item => {
        const attributes = getProperties(item, attributeNames);
        const relationships = {};
        Object.keys(item).forEach(name => {
          if (relationshipNames.includes(name)) {
            const d = item[name];
            if (d) {
              relationships[name] = {
                data: isArray(d) ? d.map(_d => ({
                  type: relsMap[name],
                  id: _d
                })) : {type: relsMap[name], id: d}
              };
            }
          }
        });
        return {
          id: item.id,
          type: primaryModelClass.modelName,
          attributes,
          relationships
        }
      })
    };
    return this._super(store, primaryModelClass, newPayload, id, requestType);
  },

  normalizeSingleResponse(store, primaryModelClass, payload, id, requestType) {
    const rel = this.getRelationships(primaryModelClass);
    const relsMap = {};
    rel.map(r => relsMap[r.key] = r.type);
    const attrs = this.getAttributes(primaryModelClass);
    const relationshipNames = rel.mapBy('key');
    const attributeNames = attrs.mapBy('name');
    const attributes = getProperties(payload, attributeNames);
    const relationships = {};
    Object.keys(payload).forEach(name => {
      if (relationshipNames.includes(name)) {
        const d = payload[name];
        if (d) {
          relationships[name] = {
            data: isArray(d) ? d.map(_d => ({
              type: relsMap[name],
              id: _d
            })) : {type: relsMap[name], id: d}
          };
        }
      }
    });
    const newPayload = {
      data: {
        id: payload.id,
        type: primaryModelClass.modelName,
        attributes,
        relationships
      }
    };
    return this._super(store, primaryModelClass, newPayload, id, requestType);
  },

  serialize(snapshot, options) {
    const json = {};
    if (options.includeId) {
      json.id = snapshot.id;
    }
    snapshot.eachAttribute((name, attribute) => {
      const type = attribute.type;
      let value = snapshot.attr(name);
      if (type) {
        let transform = this.transformFor(type);
        value = transform.serialize(value, attribute.options);
      }
      json[name] = value;
    });
    if (!options.skipRelationships) {
      snapshot.eachRelationship((name, descriptor) => {
        if (descriptor.kind === 'hasMany') {
          json[name] = get(snapshot.record, name).mapBy('id');
        }
        if (descriptor.kind === 'belongsTo') {
          json[name] = get(snapshot.record, `${name}.id`);
        }
      });
    }
    return json;
  }
});
