import { mount, shallow } from 'enzyme';
import React from 'react';
import PaginationActions from '..';
import { IconButton } from '@material-ui/core';

const get = (props) => mount(<PaginationActions {...props} />);

const find = (cmp, attr) => cmp.find(attr);

const page = 5;
const count = 100;
const rowsPerPage = 5;
const props = {
  count,
  page,
  rowsPerPage,
  onChangePage: jest.fn(),
};

describe('Pagination actions: ', () => {
  let cmp;
  beforeEach(() => {
    cmp = get(props);
  });

  test('should render properly', () => {
    expect(find(cmp, 'div').length).toBeGreaterThanOrEqual(1);
  });

  test('should handle first page button click', () => {
    const btn = find(cmp, IconButton).at(0);
    btn.simulate('click');
    expect(cmp.props().onChangePage).toHaveBeenCalledWith(0);
  });

  test('should handle back page button click', () => {
    const btn = find(cmp, IconButton).at(1);
    btn.simulate('click');
    expect(cmp.props().onChangePage).toHaveBeenCalledWith(page - 1);
  });

  test('should handle next page button click', () => {
    const btn = find(cmp, IconButton).at(2);
    btn.simulate('click');
    expect(cmp.props().onChangePage).toHaveBeenCalledWith(page + 1);
  });

  test('should handle last page button click', () => {
    const btn = find(cmp, IconButton).at(3);
    btn.simulate('click');
    expect(cmp.props().onChangePage).toHaveBeenCalledWith(
      Math.max(0, Math.ceil(count / rowsPerPage) - 1)
    );
  });
});
