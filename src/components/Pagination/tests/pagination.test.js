import { mount } from 'enzyme';
import React from 'react';

import Pagination from '..';
import { TablePagination } from '@material-ui/core';

const get = (props) => mount(<Pagination {...props} />);

const find = (cmp, attr) => cmp.find(attr);

const props = {
  rows: 5,
  page: 0,
  rowsPerPage: 5,
  onChangePage: jest.fn(),
  onChangeRowsPerPage: jest.fn(),
};

describe('Table Pagination: ', () => {
  let cmp;
  beforeEach(() => {
    cmp = get(props);
  });

  test('should render properly', () => {
    expect(find(cmp, TablePagination).length).toBeGreaterThanOrEqual(1);
  });

  test('should call the handleChangePage on changePage', () => {
    const tp = find(cmp, TablePagination);
    tp.at(0).prop('onChangePage')(1);
    expect(cmp.props().onChangePage).toHaveBeenCalledWith(1);
  });

  test('should call the handleChangeRowsPerPage on onChangeRowsPerPage', () => {
    const tp = find(cmp, TablePagination);
    tp.at(0).prop('onChangeRowsPerPage')({ target: { value: 1 } });
    expect(cmp.props().onChangeRowsPerPage).toHaveBeenCalledWith(1);
  });
});
