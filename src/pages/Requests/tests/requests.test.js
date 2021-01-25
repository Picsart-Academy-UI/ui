import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import RequestsTable from '../RequestsTable/index';
import mockstore from '../../../__mocks__/index';
import { Box, TableContainer } from '@material-ui/core';

const get = () =>
  mount(
    <Provider store={mockstore}>
      <RequestsTable />
    </Provider>
  );

const find = (cmp, attr) => cmp.at(0).find(attr);

describe('Requests/RequestsTable: ', () => {
  let cmp;
  beforeEach(() => {
    cmp = get();
  });

  test('should render properly', () => {
    expect(find(cmp, TableContainer).length).toBeGreaterThanOrEqual(1);
  });
});
