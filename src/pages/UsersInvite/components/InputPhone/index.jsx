import PhoneTextField from 'mui-phone-textfield';

const InputPhone = ({ country, value, onChange, error, helperText }) => (
  <PhoneTextField
    id="phone"
    name="phone"
    variant="outlined"
    label="Phone number"
    error={error}
    helperText={helperText}
    value={value}
    country={country}
    onCountrySelect={onChange}
    onChange={onChange}
  />
);

export default InputPhone;
