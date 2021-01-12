import { useState, useEffect } from 'react';

const useForm = (callback, validate) => {
  const [values, setValues] = useState({
    email: '',
    first_name: '',
    last_name: '',
    birthdate: '',
    phone: '',
    team_id: '',
    position_id: '',
    is_admin: false,
  });
  const [errors, setErrors] = useState({});
  const [submited, setSubmited] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const vals = {
      ...values,
      [name]: name !== 'is_admin' ? value : e.target.checked,
    };

    setValues(vals);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors(validate(values));
    setSubmited(true);
  };

  const resetValues = () =>
    setValues({
      email: '',
      first_name: '',
      last_name: '',
      birthdate: '',
      phone: '',
      team_id: '',
      position_id: '',
      is_admin: false,
    });

  useEffect(() => {
    // console.log(errors)
    if (Object.keys(errors).length === 0 && submited) {
      callback(values, resetValues);
      setSubmited(false);
    }
  }, [errors, values, callback, submited]);

  return { handleChange, handleSubmit, resetValues, values, errors };
};

export default useForm;
