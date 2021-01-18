import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import mockstore from '../../../__mocks__/index';
import { Grid } from '@material-ui/core';
import Users from '../index';
import UsersTable from '../components/UsersTable';

const get = (Cmp, props) =>
  mount(
    <Provider store={mockstore}>
      <Cmp {...props} />
    </Provider>
  );

const find = (cmp, attr) => cmp.find(attr);

const propsUsers = {};

const useState = React.useState;

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

describe('Users: ', () => {
  let users;

  const setState = jest.fn();
  beforeEach(() => {
    useState.mockImplementation((init) => [init, setState]);
    users = get(Users, propsUsers);
  });

  test('should render properly', () => {
    expect(find(users, Grid).length).toBeGreaterThanOrEqual(1);
    expect(find(users, UsersTable).length).toBeGreaterThanOrEqual(1);
  });

  test('should change the dynamic value during input', () => {
    const grid = find(users, Grid);
    grid.at(1).props().children.props.onChange('val');
    grid.at(1).props().children.props.onPageChange(101);
    expect(setState).toHaveBeenCalledWith('val');
    expect(setState).toHaveBeenCalledWith(101);
  });

  test('should correctly manipulate the pagination', () => {
    const userstable = find(users, UsersTable);
    userstable.props().onChangePage('val');
    userstable.props().onChangeRowsPerPage(101);
    expect(setState).toHaveBeenCalledWith('val');
    expect(setState).toHaveBeenCalledWith(101);
  });
});
