import { TableContainer } from '@material-ui/core';
import { shallow } from 'enzyme';
import Pagination from '../../../../../components/Pagination';

import TeamsTable from '../index';

const get = (props = {}) => shallow(<TeamsTable {...props} />);

const find = (cmp, attr) => cmp.find(attr);

describe('Teams Table: ', () => {
  let cmp;

  beforeEach(() => {
    cmp = get();
  });

  test('should render properly', () => {
    expect(find(cmp, TableContainer).length).toEqual(1);
  });

  test('should have a pagination', () => {
    expect(find(cmp, Pagination).length).toEqual(1);
  });

  //TODO: track if the state changes correctly
});
