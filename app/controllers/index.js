import Controller from '@ember/controller';
import {inject as service} from '@ember/service';
import {computed, get} from '@ember/object';

export default Controller.extend({
  tableColumns: service(),
  queryParams: ['factory'],
  factory: null,
  columns: computed('factory', function () {
    const tableColumns = get(this, 'tableColumns');
    return get(tableColumns, get(this, 'factory'))
  }),
});
