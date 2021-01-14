import { Typography } from '@material-ui/core';
import { shallow } from 'enzyme';

import NotFound from '../index';

const get = (props = {}) => shallow(<NotFound {...props} />);

const find = (cmp, attr) => cmp.find(attr);

describe('NotFound: ', () => {
  let cmp;

  beforeEach(() => {
    cmp = get();
  });

  test('should have an f-o-f message', () => {
    expect(find(cmp, Typography).length).toBeGreaterThanOrEqual(1);
  });
});
