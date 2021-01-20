import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import * as redux from 'react-redux';
import * as useRequest from '../../../../../hooks/useFetch';
import mockstore from '../../../../../__mocks__/index';
import Delete from '..';
import { Button } from '@material-ui/core';

const get = (props) =>
  mount(
    <Provider store={mockstore}>
      <Delete {...props} />
    </Provider>
  );

const find = (cmp, attr) => cmp.find(attr);

describe('Delete User Button: ', () => {
  let cmp;
  let mockDispatch;

  const mockMakeRequest = () => ({
    message: 'User has been successfully deleted',
  });

  beforeEach(() => {
    const useRSpy = jest.spyOn(useRequest, 'default');
    useRSpy.mockReturnValue(mockMakeRequest);
    mockDispatch = jest.fn();
    const useDSpy = jest.spyOn(redux, 'useDispatch');
    useDSpy.mockImplementation(() => mockDispatch);
    cmp = get();
  });

  test('should render properly', () => {
    expect(find(cmp, Button).length).toBeGreaterThanOrEqual(1);
  });

  test('should handle user deletion on button click', async () => {
    const delBtn = find(cmp, Button);
    await delBtn.props().onClick();
    expect(mockDispatch).toHaveBeenCalledTimes(1);
  });
});
