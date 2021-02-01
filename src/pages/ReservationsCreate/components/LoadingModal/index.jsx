import { memo } from 'react';
import { Modal, Container, Box } from '@material-ui/core';
import CircularProgressBar from '../CircularProgressBar';
import useStyles from './style';

const LoadingModal = ({ isLoading, numOfReservations, limit }) => {
  const styles = useStyles();

  return (
    <Modal open={isLoading} aria-labelledby="a box that shows te progress">
      <Container className={styles.modalCont}>
        <Box className={styles.joke}>
          Wait a bit while we call HR and talk everything out ...
        </Box>
        <CircularProgressBar value={numOfReservations} limit={limit} />
        <Box className={styles.warning}>
          if you will close this page then reservations won't complete
        </Box>
      </Container>
    </Modal>
  );
};

export default memo(LoadingModal);
