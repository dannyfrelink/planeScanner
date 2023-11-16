const InputText = ({ label, value, handleChange }) => {
  return (
    <div>
      <label htmlFor={label.toLowerCase()}>{label}:</label>
      <input
        className="w-3/4"
        type="text"
        id={label.toLowerCase()}
        name={label.toLowerCase()}
        value={value}
        onChange={handleChange}
        required
      />
    </div>
  );
};

export default InputText;
