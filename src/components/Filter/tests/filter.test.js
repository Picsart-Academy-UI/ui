import { mount } from 'enzyme';
import React from 'react';
import Filter from '..';
import { TextField } from '@material-ui/core';

const get = (props) => mount(<Filter {...props} />);

const find = (cmp, attr) => cmp.find(attr);

const props = {
  label: '',
  placeholder: '',
  onChange: jest.fn(),
  className: '',
};

const useState = React.useState;

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

describe('Filter: ', () => {
  let cmp;
  let setState = jest.fn();
  beforeEach(() => {
    useState.mockImplementation((init) => [init, setState]);
    cmp = get(props);
  });

  test('should render properly', () => {
    expect(find(cmp, TextField).length).toBeGreaterThanOrEqual(1);
  });

  test('should change the local value on input change', () => {
    const tf = find(cmp, TextField);
    tf.at(0).prop('onChange')({ target: { value: 1 } });
    expect(setState).toHaveBeenCalledWith(1);
  });
});
