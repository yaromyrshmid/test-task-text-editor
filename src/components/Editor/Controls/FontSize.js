import React from "react";

const fontSizes = [
  { name: 10, value: 1 },
  { name: 13, value: 2 },
  { name: 16, value: 3 },
  { name: 18, value: 4 },
  { name: 24, value: 5 },
  { name: 32, value: 6 },
  { name: 48, value: 7 },
];

const FontSize = ({ value, onChange }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <select name="fontSize" id="fontSize" onChange={handleChange} value={value}>
      <option value="">-- Select size --</option>
      {fontSizes.map(({ name, value }) => (
        <option value={value} key={value}>
          {name}
        </option>
      ))}
    </select>
  );
};

export default FontSize;
