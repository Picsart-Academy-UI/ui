import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import Profile from '../index';
import mockstore from '../../../__mocks__/index';
import { Avatar, Grid, FormControl, Typography } from '@material-ui/core';

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
    state: {
      _id: '1',
      is_admin: true,
      created_at: '2021-01-09T13:01:13.313Z',
      updated_at: '2021-01-09T13:01:13.313Z',
      email: 'mock@picsart.com',
      team_id: '1',
      first_name: 'Mock',
      last_name: 'Mock',
      __v: 0,
      accepted: true,
      profile_picture: null,
      updatedAt: '2021-01-09T15:06:58.831Z',
      birthday: '1996-03-10T00:00:00.000Z',
    },
  },
};

describe('Profile: ', () => {
  let cmp;
  beforeEach(() => {
    cmp = get(props);
  });

  test('should render properly', () => {
    expect(find(cmp, Grid).length).toBeGreaterThanOrEqual(1);
  });

  test('should have an avatar', () => {
    expect(find(cmp, Avatar).length).toBeGreaterThanOrEqual(1);
  });

  test('should have a name surname typography', () => {
    expect(find(cmp, Typography).length).toBeGreaterThanOrEqual(2);
  });

  test('should have an dropdown to select team', () => {
    expect(find(cmp, FormControl).length).toBeGreaterThanOrEqual(1);
  });
});
