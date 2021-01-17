import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import mockstore from '../../../__mocks__/index';
import { Grid, TablePagination } from '@material-ui/core';
import Users from '../index';
import UsersTable from '../components/UsersTable';
import Pagination from '../../../components/Pagination';

const get = (Cmp, props) =>
  mount(
    <Provider store={mockstore}>
      <Cmp {...props} />
    </Provider>
  );

const find = (cmp, attr) => cmp.find(attr);

const propsUsers = {};
const propsTable = {
  rows: {
    usersList: [
      {
        _id: '5ffed7798655a133f07d1a78',
        accepted: false,
        is_admin: false,
        push_subscriptions: [],
        email: 'mock@gmail.com',
        team_id: '5ff1e9fa757f0d03b08bac5a',
        position_id: '5fe23d54a710eb52a9fe0835',
        first_name: 'Mock',
        last_name: 'Mock',
        phone: null,
        createdAt: '2021-01-13T11:20:25.075Z',
        updatedAt: '2021-01-13T23:56:53.679Z',
        __v: 0,
      },
    ],
  },
  page: 1,
  rowsPerPage: 5,
  onChangePage: jest.fn(),
  onChangeRowsPerPage: jest.fn(),
};
const propsPagination = propsTable;

describe('Users: ', () => {
  let users;
  let pagination;
  let userstable;

  beforeEach(() => {
    users = get(Users, propsUsers);
    userstable = get(UsersTable, propsTable);
    pagination = get(Pagination, userstable.props().children.props);
    pagination.handleChangePage = jest.fn(() => console.log('test'));
  });

  test('should render properly', () => {
    expect(find(users, Grid).length).toBeGreaterThanOrEqual(1);
    expect(find(users, UsersTable).length).toBeGreaterThanOrEqual(1);
  });

  // test('should test', () => {
  //   const tablePagination = find(pagination, TablePagination);
  //   tablePagination.simulate('change');
  //   expect(pagination.handleChangePage).toHaveBeenCalledTimes(1);
  // });
});
