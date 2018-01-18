import Route from '@ember/routing/route';
import {getOwner} from '@ember/application';
import {inject as service} from '@ember/service';
import {get, set} from '@ember/object';
import DS from 'ember-data';

export default Route.extend({
  ajax: service(),
  tableColumns: service(),

  beforeModel() {
    const appInstance = getOwner(this);
    const tableColumns = get(this, 'tableColumns');
    set(tableColumns, 'factoryNames', []);
    const applicationAdapter = appInstance.lookup('adapter:application');
    const host = get(applicationAdapter, 'host');
    const namespace = get(applicationAdapter, 'namespace');
    const url = `${host}/${namespace}/meta`;
    return get(this, 'ajax').request(url).then(lairDevInfo => {
      Object.keys(lairDevInfo).forEach(modelName => {
        const attrs = {};
        get(tableColumns, 'factoryNames').pushObject(modelName);
        set(tableColumns, modelName, [{propertyName: 'id'}]);
        const meta = lairDevInfo[modelName].meta;
        Object.keys(meta).forEach(attrName => {
          if (attrName !== 'id') {
            attrs[attrName] = DS.attr();
            get(tableColumns, modelName).pushObject({propertyName: attrName});
          }
        });

        appInstance.register(`model:${modelName}`, DS.Model.extend(attrs));
      });
    });
  }
});
