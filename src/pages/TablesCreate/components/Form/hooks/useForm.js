import { useState, useEffect } from 'react';
import { CHAIRS_COUNT } from '../../../../../constants';

const useForm = (callback, validate) => {
  const [values, setValues] = useState({
    table_number: '',
    chairs_count: CHAIRS_COUNT,
    team_id: '',
  });
  const [errors, setErrors] = useState({});
  const [submited, setSubmited] = useState(false);
  const [isValidateSeparately, setIsValidateSeparately] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const vals = {
      ...values,
      [name]: value,
    };

    setValues(vals);

    if (submited) {
      const errs = validate(vals);

      setErrors(errs);

      if (Object.keys(errs).length === 0) {
        setIsValidateSeparately(false);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors(validate(values));
    setSubmited(true);
    setIsValidateSeparately(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && submited && isValidateSeparately) {
      callback(values);
      setSubmited(false);
    }
  }, [errors, values, callback, submited, isValidateSeparately]);

  return { handleChange, handleSubmit, values, errors };
};

export default useForm;
