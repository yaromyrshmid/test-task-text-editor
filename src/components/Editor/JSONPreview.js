import React from "react";

const JSONPreview = ({ content }) => {
  return (
    <>
      <h2 className="title">JSON preview</h2>
      <div className="json-preview">
        <pre>{JSON.stringify(content, null, 2)}</pre>
      </div>
    </>
  );
};

export default JSONPreview;
