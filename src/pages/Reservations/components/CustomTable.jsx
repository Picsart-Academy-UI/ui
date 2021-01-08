// @flow
import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import useStyles from '../style';

type Props = {
  data: Array<{ date: String, place: String, status: String, id: number }>,
  isHistory: boolean,
  edit: Function,
  cancel: Function,
};

const CustomTable = (props: Props): React.Node => {
  const styles = useStyles();
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="center">Place</TableCell>
            <TableCell align="right">Status</TableCell>
            {props.isHistory ? null : (
              <TableCell align="right">Actions</TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.date}</TableCell>
              <TableCell align="center">{item.place}</TableCell>
              <TableCell align="right" className={styles[item.status]}>
                {item.status}
              </TableCell>
              {props.isHistory ? null : (
                <TableCell align="right">
                  <IconButton onClick={props.edit}>
                    {' '}
                    <EditIcon className={styles.edit} />{' '}
                  </IconButton>
                  <IconButton onClick={props.cancel}>
                    {' '}
                    <CancelIcon className={styles.cancel} />{' '}
                  </IconButton>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
