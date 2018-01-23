import Controller from '@ember/controller';
import {inject as service} from '@ember/service';
import {computed, get} from '@ember/object';
import {resolve} from 'rsvp';
import {next} from '@ember/runloop';
import $ from 'jquery';

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
    columns.push({
      title: 'Delete',
      component: 'deleteRow',
      editable: false
    });
    return columns;
  }),

  actions: {
    onAddRow() {
      get(this, 'store').createRecord(get(this, 'factory'));
      next(() => {
        $('.table-nav .btn-group a:eq(3)').click(); // go to last page
        $('table tbody tr:last-child td:eq(-2) button').click(); // click "Edit"
        $('html, body').animate({ // scroll to row with a new record
          scrollTop: $('table tbody tr:last-child').offset().top
        }, 300);
      });
    },
    onSaveRow({record}) {
      return record.save();
    },

    onCancelRow({record}) {
      get(record, 'isNew') ? record.rollbackAttributes() : record.rollback();
      return true;
    },
    onDeleteRow(record) {
      if(confirm('Are you sure?')) { // old school, bro
        return get(record, 'isNew') ? record.rollbackAttributes() : record.destroyRecord();
      }
      return resolve();
    }
  }
});
