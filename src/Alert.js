

import style from "./style.module.css";
import css from "classnames";
import { useState } from "react";
import React from "react";

export default function Alert(props) {
  const [isShow, setIsShow] = useState(true);

  const renderElAlert = function () {
    return React.cloneElement(props.children);
  };

  const handleClose = (e) => {
    e.preventDefault();
    setIsShow(false);
  };

  return (
    <button className={css(style.alert, style[props.type], !isShow && style.hide)}>
      <span className={style.closebtn} onClick={handleClose}>
        &times;
      </span>
      {props.children ? renderElAlert() : props.message}
    </button>
  );
}