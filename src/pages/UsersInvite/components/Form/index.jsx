import { useState } from 'react';
import {
  Button,
  Container,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import Input from '../Input';
import InputDate from '../InputDate';
import SelectTeam from '../SelectTeam';
import validate from './helpers/validateInfo';
import useForm from './helpers/useForm';
import useStylesLocal from './style';

const Form = ({ submitForm }) => {
  const classesLocal = useStylesLocal();

  const [dateType, setDateType] = useState('text');

  const { handleChange, handleSubmit, values, errors } = useForm(
    submitForm,
    validate
  );

  return (
    <Container component="main">
      <form onSubmit={handleSubmit}>
        <div className={classesLocal.inputsWrapper}>
          <Input
            id="email"
            label="Email Address"
            name="email"
            value={values.email}
            onChange={handleChange}
            error={Boolean(errors.email)}
            helperText={errors.email}
            autoFocus
          />
          <Input
            id="first_name"
            label="Name"
            name="first_name"
            value={values.name}
            onChange={handleChange}
            error={Boolean(errors.first_name)}
            helperText={errors.first_name}
          />
          <Input
            id="last_name"
            label="Surname"
            name="last_name"
            value={values.surName}
            onChange={handleChange}
            error={Boolean(errors.last_name)}
            helperText={errors.last_name}
          />
          <InputDate
            type={dateType}
            name="birthdate"
            value={values.birthdate}
            onChange={handleChange}
            error={Boolean(errors.birthdate)}
            helperText={errors.birthdate}
            setDateType={setDateType}
          />
          <SelectTeam
            id="team_id"
            team_id="team_id"
            value={values.team_id}
            onChange={handleChange}
            error={Boolean(errors.team_id)}
            helperText={errors.team_id}
          />
          <Input
            id="position_id"
            label="Position"
            name="position_id"
            value={values.position}
            onChange={handleChange}
            error={Boolean(errors.position)}
            helperText={errors.position}
          />
          <Input
            id="phonenumber"
            label="Phone Number"
            name="phonenumber"
            value={values.phonenumber}
            onChange={handleChange}
            error={Boolean(errors.phonenumber)}
            helperText={errors.phonenumber}
          />
          <FormControlLabel
            control={
              <Checkbox
                id="is_admin"
                name="is_admin"
                value={values.is_admin}
                onChange={handleChange}
                color="primary"
              />
            }
            label="Admin"
          />
          <Button
            type="submit"
            variant="contained"
            className={classesLocal.sbmtButton}
          >
            Invite
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default Form;
