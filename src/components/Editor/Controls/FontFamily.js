import React from "react";

const safeFonts = [
  { name: "Georgia", value: "Georgia, serif" },
  {
    name: "Palatino Linotype",
    value: "'Palatino Linotype', 'Book Antiqua', Palatino, serif",
  },
  { name: "Times New Roman", value: "'Times New Roman', Times, serif" },
  { name: "Arial", value: "Arial, Helvetica, sans-serif" },
  { name: "Comic Sans MS", value: "'Comic Sans MS', cursive, sans-serif" },
  { name: "Impact", value: "Impact, Charcoal, sans-serif" },
  {
    name: "Lucida Sans Unicode",
    value: "'Lucida Sans Unicode', 'Lucida Grande', sans-serif",
  },
  { name: "Tahoma", value: "Tahoma, Geneva, sans-serif" },
  { name: "Trebuchet MS", value: "'Trebuchet MS', Helvetica, sans-serif" },
  { name: "Courier New", value: "'Courier New', Courier, monospace" },
];

const sortFonts = ({ name: nameA }, { name: nameB }) => {
  if (nameA > nameB) return 1;
  if (nameA < nameB) return -1;
  return 0;
};

const FontFamily = ({ value, onChange }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <select
      name="fontFamily"
      id="fontFamily"
      onChange={handleChange}
      value={value}
    >
      <option value="">-- Select font --</option>
      {safeFonts.sort(sortFonts).map(({ name, value }) => (
        <option value={value} key={value}>
          {name}
        </option>
      ))}
    </select>
  );
};

export default FontFamily;
