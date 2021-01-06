import { Container, IconButton, Box } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
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
    createRes('approved'),
    createRes('pending'),
    createRes('rejected'),
    createRes('pending'),
    createRes('approved'),
  ];

  const history = [
    createRes('rejected'),
    createRes('approved'),
    createRes('rejected'),
    createRes('approved'),
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
