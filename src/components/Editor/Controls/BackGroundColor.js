import React from "react";

const colors = ["black", "red", "blue", "maroon", "green", "pink"];

const BackGroundColor = ({ value, onChange }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <select
      name="backgroundColor"
      id="backgroundColor"
      onChange={handleChange}
      value={value}
    >
      <option value="">-- Select background color --</option>
      {colors.map((value) => (
        <option value={value} key={value} style={{ backgroundColor: value }}>
          {value}
        </option>
      ))}
    </select>
  );
};

export default BackGroundColor;
