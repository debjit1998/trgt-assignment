import { memo, Fragment } from "react";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";

const Header = ({ loading }) => {
  return createPortal(
    <Fragment>
      <h1>URL Validator</h1>
      {loading && (
        <div className="loader">Please wait while we validate...</div>
      )}
    </Fragment>,

    document.querySelector("#header-root")
  );
};

Header.propTypes = {
  loading: PropTypes.bool.isRequired,
};

export default memo(Header);
