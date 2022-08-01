import { memo } from "react";
import { createPortal } from "react-dom";

const Header = () => {
  return createPortal(
    <h1>URL Validator</h1>,
    document.querySelector("#header-root")
  );
};

export default memo(Header);
