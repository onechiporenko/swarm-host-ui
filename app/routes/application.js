import Route from '@ember/routing/route';
import {getOwner} from '@ember/application';
import {inject as service} from '@ember/service';
import {get, set} from '@ember/object';
import DS from 'ember-data';
import {all} from 'rsvp';

export default Route.extend({
  ajax: service(),
  tableColumns: service(),
  router: service(),

  moveTo: '',

  beforeModel() {
    const appInstance = getOwner(this);
    const tableColumns = get(this, 'tableColumns');
    set(tableColumns, 'factoryNames', []);
    const applicationAdapter = appInstance.lookup('adapter:application');
    const host = get(applicationAdapter, 'host');
    const namespace = get(applicationAdapter, 'namespace');
    const url = `${host}/${namespace}/meta`;
    return get(this, 'ajax').request(url).then(lairDevInfo => {
      let moveTo = '';
      Object.keys(lairDevInfo).forEach((modelName, index) => {
        if (!index) {
          set(this, 'moveTo', modelName);
        }
        const attrs = {
          init() {
            this._super(...arguments);
            this.startTrack();
          }
        };
        get(tableColumns, 'factoryNames').pushObject(modelName);
        set(tableColumns, modelName, [{propertyName: 'id', title: 'id', editable: false}]);
        const meta = lairDevInfo[modelName].meta;
        Object.keys(meta).forEach(attrName => {
          const attrMeta = meta[attrName];
          const column = {title: attrName, propertyName: attrName, component: 'table-cell'};
          if (attrName !== 'id') {
            if (attrMeta.type !== 2 && attrMeta.type !== 3) { // not belongsTo and not hasMany
              const type = attrMeta.preferredType || 'string';
              const attrArgs = [];
              if(['string', 'boolean', 'number', 'array', 'object'].includes(type)) {
                attrArgs.push(type);
                if (attrMeta.defaultValue) {
                  attrArgs.push({defaultValue: attrMeta.defaultValue});
                }
              }
              attrs[attrName] = DS.attr(...attrArgs);
              column.componentForEdit = 'attr-cell-edit';
            }
            if (attrMeta.type === 2) {
              attrs[attrName] = DS.belongsTo(attrMeta.factoryName, {inverse: attrMeta.invertedAttrName});
              column.componentForEdit = 'belongs-to-cell-edit';
              column.disableFiltering = true;
              column.disableSorting = true;
            }
            if (attrMeta.type === 3) {
              attrs[attrName] = DS.hasMany(attrMeta.factoryName, {inverse: attrMeta.invertedAttrName});
              column.componentForEdit = 'has-many-cell-edit';
              column.disableFiltering = true;
              column.disableSorting = true;
            }
          }
          column.attrMeta = attrMeta;
          get(tableColumns, modelName).pushObject(column);
        });
        appInstance.register(`model:${modelName}`, DS.Model.extend(attrs));
      });
    });
  },

  model() {
    const store = get(this, 'store');
    return all(get(this, 'tableColumns.factoryNames').map(factoryName => store.findAll(factoryName)));
  }
});
