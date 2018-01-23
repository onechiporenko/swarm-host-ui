import {helper} from '@ember/component/helper';

export function trunc([str, size]/*, hash*/) {
  const _str = str || '';
  return _str.length > size ? _str.substr(0, size) + '...' : _str;
}

export default helper(trunc);
