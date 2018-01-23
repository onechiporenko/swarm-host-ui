import {helper} from '@ember/component/helper';
import {typeOf} from '@ember/utils';
import {isArray} from '@ember/array';
import {get} from '@ember/object';

export function cellValue([value]) {
  const type = typeOf(value);
  if (type === 'instance') {
    return isArray(value) ? value.mapBy('id') : get(value, 'id');
  }
  return value;
}

export default helper(cellValue);
