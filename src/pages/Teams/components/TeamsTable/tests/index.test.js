import { shallow } from 'enzyme';

import TeamsTable from '../index';

const get = (props = {}) => shallow(<TeamsTable {...props} />);

const find = (cmp, attr) => cmp.find(`[test="${attr}"]`);

describe('Teams Table: ', () => {
  let cmp;

  beforeEach(() => {
    cmp = get();
  });

  test('should render properly', () => {
    expect(find(cmp, 'table-cntnr').length).toEqual(1);
  });

  test('should have a pagination', () => {
    expect(find(cmp, 'pgn').length).toEqual(1);
  });

  //TODO: track if the state changes correctly
});
