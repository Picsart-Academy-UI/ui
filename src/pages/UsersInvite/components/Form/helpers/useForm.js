import { useState, useEffect } from 'react';

const useForm = (callback, validate) => {
  const [values, setValues] = useState({
    email: '',
    first_name: '',
    last_name: '',
    birthdate: '',
    team_id: '',
    position_id: '',
    phonenumber: '',
    is_admin: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'is_admin') {
      const { checked } = e.target;
      setValues({
        ...values,
        [name]: checked,
      });
    }
    if (name === 'phonenumber') {
      // eslint-disable-next-line
      if (!isNaN(value)) {
        setValues({
          ...values,
          [name]: value,
        });
      }
    } else {
      setValues({
        ...values,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrors(validate(values));
    setIsSubmitting(true);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback(values);
      setIsSubmitting(false);
    }
  }, [errors, values, callback, isSubmitting]);

  return { handleChange, handleSubmit, values, errors };
};

export default useForm;
