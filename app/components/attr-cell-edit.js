import Component from '@ember/component';
import {computed, get} from '@ember/object';
import {alias, equal, notEmpty} from '@ember/object/computed';

export default Component.extend({

  attrMeta: alias('column.originalDefinition.attrMeta'),

  useCheckbox: equal('attrMeta.preferredType', 'boolean'),

  useDropdown: notEmpty('attrMeta.allowedValues'),

  useTextarea: computed('attrMeta.preferredType', function () {
    return ['object', 'array'].includes(get(this, 'attrMeta.preferredType'));
  })
});
