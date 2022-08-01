import { memo } from "react";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";
import "./index.css";

const UrlForm = ({ value, setValue, handleValidate, loading }) => {
  return (
    <div className="url-form">
      <TextField
        style={{
          width: "100%",
          background: "white",
          marginTop: "32px",
        }}
        multiline
        rows={10}
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />

      {/* VALIDATE BUTTON */}
      <div className="validate">
        <button
          className="validate__btn"
          disabled={value.trim().length === 0 || loading}
          onClick={handleValidate}
        >
          VALIDATE
        </button>
      </div>
    </div>
  );
};

UrlForm.propTypes = {
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  handleValidate: PropTypes.func.isRequired,
};

export default memo(UrlForm);
