import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Box, Button } from '@material-ui/core';
import useStylesMain from '../../hooks/useStylesMain';
import ResTable from './components/CustomTable';
import useStylesLocal from './style';

const Reservations = () => {
  const classesMain = useStylesMain();
  const styles = useStylesLocal();

  const history = useHistory();

  const createRes = (status) => {
    const date = new Date();

    return {
      date: `${date.getDay()} ${date.getMonth() + 1} ${date.getFullYear()}`,
      place: '0/0',
      status,
      id: Math.floor(Math.random() * 10000),
    };
  };

  const [activeRes, setActiveRes] = useState([
    createRes('pending'),
    createRes('approved'),
    createRes('pending'),
    createRes('pending'),
    createRes('pending'),
    createRes('pending'),
    createRes('pending'),
  ]);

  const historyRes = [
    createRes('rejected'),
    createRes('approved'),
    createRes('rejected'),
    createRes('approved'),
    createRes('rejected'),
  ];

  const edit = () => {
    history.push('/Reservations/edit');
  };

  const cancel = () => {
    setActiveRes([]);
  };

  const onAddReservationClick = () => {
    history.push('/reservations/create');
  };

  return (
    <>
      <Container>
        <Box
          display="flex"
          justifyContent="space-around"
          className={styles.boxHeader}
        >
          <Box> Active reservations </Box>
          <Button
            onClick={onAddReservationClick}
            color="primary"
            variant="contained"
            className={classesMain.commonButton}
          >
            Add Reservation
          </Button>
        </Box>
        <ResTable
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
        <ResTable
          data={historyRes}
          isHistory={true}
          edit={edit}
          cancel={cancel}
        />
      </Container>
    </>
  );
};

export default Reservations;
