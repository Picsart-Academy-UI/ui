import Input from './Input';

const InputDate = ({ setDateType, ...props }) => {
  const onDateTypeFocus = () => setDateType('date');

  const onDateTypeBlur = () => setDateType('text');

  return (
    <Input
      required={false}
      id="birthday"
      label="Birthday"
      onFocus={onDateTypeFocus}
      onBlur={onDateTypeBlur}
      {...props}
    />
  );
};

export default InputDate;
