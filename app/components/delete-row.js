import Component from '@ember/component';
import {get} from '@ember/object';

export default Component.extend({
  tagName: 'button',
  classNames: ['btn btn-default'],
  click() {
    get(this, 'deleteRowAction')(get(this, 'record'));
  }
});
