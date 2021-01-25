import { mount } from 'enzyme';
import React from 'react';
import SelectDropdown from '..';
import Autocomplete from '@material-ui/lab/Autocomplete';

const get = (props) => mount(<SelectDropdown {...props} />);

const find = (cmp, attr) => cmp.find(attr);

const props = {
  label: '',
  options: [{ title: 'test', id: '1' }],
  onChange: jest.fn(),
  defaultValue: null,
};

const useState = React.useState;

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

describe('Select Dropdown: ', () => {
  let cmp;
  let setState = jest.fn();
  beforeEach(() => {
    useState.mockImplementation((init) => [init, setState]);
    cmp = get(props);
  });

  test('should render properly', () => {
    expect(find(cmp, Autocomplete).length).toBeGreaterThanOrEqual(1);
  });
});
