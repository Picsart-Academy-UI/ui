import { Box, Button } from '@material-ui/core';
import { shallow } from 'enzyme';

import AddUser from '../index';

const get = (props = {}) => shallow(<AddUser {...props} />);

const find = (cmp, attr) => cmp.find(attr);

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('Add User Button: ', () => {
  let cmp;

  beforeEach(() => {
    cmp = get();
  });

  test('should render properly', () => {
    expect(find(cmp, Box).length).toBeGreaterThanOrEqual(1);
  });

  test('should have an add button', () => {
    expect(find(cmp, Button).length).toEqual(1);
  });

  test('should redirect to teams/create', () => {
    const addBtn = find(cmp, Button);
    addBtn.simulate('click');
    expect(mockHistoryPush).toHaveBeenCalledWith('/users/invite');
  });
});
