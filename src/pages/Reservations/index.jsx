import React from 'react';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Box from '@material-ui/core/Box';

import CustomTable from './components/CustomTable';
import useStylesLocal from './style';

const Reservations = () => {
  const styles = useStylesLocal();

  // needs to be used before the api is ready
  const createRes = (status) => {
    const date = new Date();

    return {
      date: `${date.getDay()} ${date.getMonth() + 1} ${date.getFullYear()}`,
      place: '0/0',
      status,
    };
  };

  const activeRes = [
    createRes('pending'),
    createRes('pending'),
    createRes('pending'),
    createRes('pending'),
    createRes('pending'),
    createRes('pending'),
  ];

  const history = [
    createRes('rejected'),
    createRes('rejected'),
    createRes('rejected'),
    createRes('rejected'),
    createRes('rejected'),
  ];

  const edit = () => {};

  const cancel = () => {};

  const add = () => {};

  return (
    <>
      <Container>
        <Box
          display="flex"
          justifyContent="space-around"
          className={styles.boxHeader}
        >
          <Box> Active reservations </Box>
          <IconButton onClick={add}>
            {' '}
            <AddCircleIcon className={styles.icon} />{' '}
          </IconButton>
        </Box>
        <CustomTable
          data={activeRes}
          isHistory={false}
          edit={edit}
          cancel={cancel}
        />
      </Container>

      <Container>
        <Box
          display="flex"
          justifyContent="space-around"
          className={styles.boxHeader}
        >
          <Box> History </Box>
        </Box>
        <CustomTable
          data={history}
          isHistory={true}
          edit={edit}
          cancel={cancel}
        />
      </Container>
    </>
  );
};

export default Reservations;
