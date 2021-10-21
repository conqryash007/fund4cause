import React, { Component } from "react";
import Layouts from "./../../components/Layouts";
import style from "./../../styles.module.css";
export default class show extends Component {
  render() {
    return (
      <div className={style.body}>
        <Layouts></Layouts>
      </div>
    );
  }
}
