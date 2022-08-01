import { Fragment } from "react";
import { createPortal } from "react-dom";

const Footer = ({ children }) => {
  return createPortal(
    <Fragment>{children}</Fragment>,
    document.querySelector("#footer-root")
  );
};

export default Footer;
