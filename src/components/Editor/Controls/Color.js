import React from "react";

const colors = ["black", "red", "blue", "maroon", "green", "pink"];

const Color = ({ value, onChange }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <select name="color" id="color" onChange={handleChange} value={value}>
      <option value="">-- Select font color --</option>
      {colors.map((value) => (
        <option value={value} key={value} style={{ color: value }}>
          {value}
        </option>
      ))}
    </select>
  );
};

export default Color;
