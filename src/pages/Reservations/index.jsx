import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Box from '@material-ui/core/Box';
import CustomTable from './components/CustomTable';
import useStylesLocal from './style';

const Reservations = () => {
  const styles = useStylesLocal();

  const history = useHistory();

  // needs to be used before the api is ready
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
    createRes('rejected'),
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

  const add = () => {
    history.push('/Reservations/create');
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
