const Input = ({ value, onChange, type, placeholder, error, className }) => {
  return (
    <input
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      className={className}
    />
  );
};

export default Input;
