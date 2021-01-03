import { shallow } from 'enzyme';

import TeamsTable from '../index';

const get = (props = {}) => shallow(<TeamsTable {...props} />);

const find = (cmp, attr) => cmp.find(`[test="${attr}"]`);

describe('Teams Table: ', () => {
  let cmp;

  beforeEach(() => {
    cmp = get();
  });

  test('should ', () => {
    expect(1).toBe(1);
  });
});
