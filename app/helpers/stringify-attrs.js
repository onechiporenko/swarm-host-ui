import { helper } from '@ember/component/helper';

export function stringifyAttrs([record]/*, hash*/) {
  return JSON.stringify(record.serialize({skipRelationships: true, includeId: true}));
}

export default helper(stringifyAttrs);
