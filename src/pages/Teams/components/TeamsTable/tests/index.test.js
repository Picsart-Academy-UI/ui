import { TableBody, TableContainer } from '@material-ui/core';
import { shallow } from 'enzyme';

import TeamsTable from '../index';

const get = (props = {}) => shallow(<TeamsTable {...props} />);

const find = (cmp, attr) => cmp.find(attr);

const props = {
  teams: [
    {
      _id: '1',
      name: 'team1',
      createdAt: '2020-12-29T18:18:56.188Z',
      updatedAt: '2021-01-14T12:49:19.231Z',
      __v: 0,
      team_name: 'Videoo',
      members_count: 0,
      tables: [
        {
          chairs_count: 6,
          _id: '1',
          table_name: 'A',
          team_id: '5feb7310339b0d33d18b7285',
          createdAt: '2021-01-13T14:22:21.655Z',
          updatedAt: '2021-01-13T14:22:21.655Z',
          __v: 0,
        },
      ],
      id: '1',
    },
  ],
};

describe('Teams Table: ', () => {
  let cmp;

  beforeEach(() => {
    cmp = get(props);
  });

  test('should render properly', () => {
    expect(find(cmp, TableContainer).length).toEqual(1);
  });

  test('should have a table body', () => {
    expect(find(cmp, TableBody).length).toEqual(1);
  });

  //TODO: track if the state changes correctly
});
