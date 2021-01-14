import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import Profile from '../index';
import mockstore from '../../../__mocks__/index';
import {
  Avatar,
  Button,
  Card,
  FormControl,
  Typography,
} from '@material-ui/core';

const get = (props) =>
  mount(
    <Provider store={mockstore}>
      <Profile {...props} />
    </Provider>
  );

const find = (cmp, attr) => cmp.find(attr);

const props = {
  match: {
    params: {
      id: 1,
    },
  },
  location: {
    user: {
      _id: '5ff9abbad15b18a330bb578a',
      is_admin: true,
      created_at: '2021-01-09T13:01:13.313Z',
      updated_at: '2021-01-09T13:01:13.313Z',
      email: 'roman.balayan@picsart.com',
      team_id: '5fe23d54a710eb52a9fe0835',
      first_name: 'Roma',
      last_name: 'Balayan',
      __v: 0,
      accepted: true,
      profile_picture: null,
      updatedAt: '2021-01-09T15:06:58.831Z',
    },
  },
};

describe('Profile: ', () => {
  let cmp;
  beforeEach(() => {
    cmp = get(props);
  });

  test('should render properly', () => {
    expect(find(cmp, Card).length).toBeGreaterThanOrEqual(1);
  });

  test('should have an avatar', () => {
    expect(find(cmp, Avatar).length).toBeGreaterThanOrEqual(1);
  });

  test('should have a name surname typography', () => {
    expect(find(cmp, Typography).length).toBeGreaterThanOrEqual(1);
  });

  test('should have an dropdown to select team', () => {
    expect(find(cmp, FormControl).length).toBeGreaterThanOrEqual(1);
  });

  test('should have a submit button', () => {
    expect(find(cmp, Button).length).toBeGreaterThanOrEqual(1);
  });
});
