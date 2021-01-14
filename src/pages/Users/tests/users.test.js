import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import mockstore from '../../../__mocks__/index';
import {
  Avatar,
  Button,
  Card,
  FormControl,
  Grid,
  Typography,
} from '@material-ui/core';
import Users from '../index';
import UsersTable from '../components/UsersTable';

const get = (props) =>
  mount(
    <Provider store={mockstore}>
      <Users {...props} />
    </Provider>
  );

const find = (cmp, attr) => cmp.find(attr);

const props = {};

describe('Users: ', () => {
  let cmp;
  beforeEach(() => {
    cmp = get(props);
  });

  test('should render properly', () => {
    expect(find(cmp, Grid).length).toBeGreaterThanOrEqual(1);
    expect(find(cmp, UsersTable).length).toBeGreaterThanOrEqual(1);
  });
});
