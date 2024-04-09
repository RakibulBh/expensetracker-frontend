const Input = ({
  value,
  onChange,
  type,
  placeholder,
  className,
  autocomplete,
}) => {
  return (
    <input
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      className={className}
      autoComplete={autocomplete}
    />
  );
};

export default Input;
