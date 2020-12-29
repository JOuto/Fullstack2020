import React from "react";

const Names = ({ names, deleteName }) => {
  return (
    <div>
      {names.name} {names.number}
      <button onClick={deleteName}>delete</button>
    </div>
  );
};
export default Names;
