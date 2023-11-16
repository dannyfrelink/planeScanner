const Select = ({ formData, handleChange }) => {
  return (
    <div>
      <label htmlFor="model">Aircraft Model*</label>
      <select
        className="w-fit"
        id="aircraftModel"
        name="aircraftModel"
        value={formData.aircraftModel}
        onChange={handleChange}
        required
      >
        <option value="A319">A319</option>
        <option value="A320">A320</option>
        <option value="A321">A321</option>
        <option value="A332">A332</option>
        <option value="A333">A333</option>
        <option value="B77W">B77W</option>
        <option value="B737">B737</option>
        <option value="B738">B738</option>
      </select>
    </div>
  );
};

export default Select;
