import { shallow } from 'enzyme';

import NotFound from '../index';

const get = (props = {}) => shallow(<NotFound {...props} />);

const find = (cmp, attr) => cmp.find(`[test="${attr}"]`);

describe('NotFound: ', () => {
  let cmp;

  beforeEach(() => {
    cmp = get();
  });

  test('should render properly', () => {
    expect(find(cmp, 'grid-wrapper').length).toEqual(1);
  });

  test('should have a f-o-f message', () => {
    expect(find(cmp, 'fof-msg').length).toEqual(1);
  });

  test('should have an explanation message', () => {
    expect(find(cmp, 'expl-msg').length).toEqual(1);
  });
});
