import React from "react";
import Header from "./header";
import { Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

const Layout = (props) => {
  return (
    <div>
      <Header></Header>
      <Container>{props.children}</Container>
    </div>
  );
};
export default Layout;
