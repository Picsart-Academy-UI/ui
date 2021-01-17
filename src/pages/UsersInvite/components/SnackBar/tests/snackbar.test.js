import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import React from 'react';

import mockstore from '../../../../../__mocks__/index';
import { Snackbar } from '@material-ui/core';
import PositionedSnackbar from '..';

const get = (props) =>
  mount(
    <Provider store={mockstore}>
      <PositionedSnackbar {...props} />
    </Provider>
  );

const find = (cmp, attr) => cmp.find(attr);

const props = {
  message: '',
  isSumbitted: false,
  setIsSubmitted: jest.fn(),
  setMessage: jest.fn(),
};

const useState = React.useState;

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

describe('Snackbar: ', () => {
  let cmp;
  let setState = jest.fn();
  beforeEach(() => {
    useState.mockImplementation((init) => [init, setState]);
    cmp = get(props);
  });

  test('should render properly', () => {
    expect(find(cmp, Snackbar).length).toBeGreaterThanOrEqual(1);
  });

  test('should close the snackbar on close event', () => {
    const sb = find(cmp, Snackbar);
    sb.prop('onClose')();
    expect(setState).toHaveBeenNthCalledWith(3, false);
  });
});
