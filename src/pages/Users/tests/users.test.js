import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import mockstore from '../../../__mocks__/index';
import Users from '../index';
import UsersTable from '../components/UsersTable';
import Filter from '../../../components/Filter/index';

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
    expect(find(users, UsersTable).length).toBeGreaterThanOrEqual(1);
  });

  test('should change the dynamic value during input', () => {
    const search = find(users, Filter);
    search.props().onChange('val');
    expect(setState).toHaveBeenCalledWith('val');
  });
});
