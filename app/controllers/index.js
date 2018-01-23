import Controller from '@ember/controller';
import {inject as service} from '@ember/service';
import {computed, get} from '@ember/object';

export default Controller.extend({
  tableColumns: service(),
  queryParams: ['factory'],
  factory: null,
  columns: computed('factory', function () {
    const tableColumns = get(this, 'tableColumns');
    const columns = get(tableColumns, get(this, 'factory')).slice();
    columns.push({
      title: 'Edit',
      component: 'editRow',
      editable: false
    });
    return columns;
  }),

  actions: {
    onSaveRow({record}) {
      return record.save();
    },

    onCancelRow({record}) {
      record.rollback();
      return true;
    }
  }
});
