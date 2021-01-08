import TablePagination from '@material-ui/core/TablePagination';
import TablePaginationActions from '../TablePaginationActions';

const Pagination = (props) => {
  const { rows, page, rowsPerPage, onChangePage, onChangeRowsPerPage } = props;

  const handleChangePage = (newPage) => {
    onChangePage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    onChangeRowsPerPage(+event.target.value);
  };

  return (
    <TablePagination
      rowsPerPageOptions={[5, 10, 25, 50]}
      component="div"
      colSpan={3}
      count={rows.length}
      page={page}
      rowsPerPage={rowsPerPage}
      SelectProps={{
        inputProps: { 'aria-label': 'rows per page' },
        native: true,
      }}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={(e) => handleChangeRowsPerPage(e)}
      ActionsComponent={TablePaginationActions}
    />
  );
};

export default Pagination;