import React from "react";

export const Button = ({ id, value, onClick }) => {
  return (
    <button id={id} onClick={onClick}>
      {value}
    </button>
  );
};
