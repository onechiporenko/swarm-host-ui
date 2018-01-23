import Component from '@ember/component';
import {inject as service} from '@ember/service';
import {computed, get} from '@ember/object';

export default Component.extend({

  store: service(),

  options: computed('column.originalDefinition.attrMeta.factoryName', function () {
    const modelName = get(this, 'column.originalDefinition.attrMeta.factoryName');
    return get(this, 'store').peekAll(modelName);
  })

});
