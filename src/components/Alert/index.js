import React from "react";

export const Alert = ({settings, children}) => {
  return (
    <div className={`alert alert-${type}`}>
      {children}
    </div>
  );
}