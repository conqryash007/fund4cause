import React from "react";
import Header from "./header";

export default (props) => {
  return (
    <div>
      <Header></Header>
      {props.children}
      <h1>footer</h1>
    </div>
  );
};
