import { memo } from "react";
import PropTypes from "prop-types";
import { TextField, Slider } from "@mui/material";
import "./index.css";

const renderList = ({ name, id }) => (
  <li className="url-form__listitem" key={id}>
    {name}
  </li>
);

const textareaStyle = {
  width: "100%",
  background: "white",
  marginTop: "32px",
};

const sxSliderStyle = {
  "& .MuiSlider-rail": {
    backgroundColor: "var(--color-white)",
  },
  "& .MuiSlider-track": {
    backgroundColor: "var(--color-highlight)",
    borderColor: "var(--color-highlight)",
  },
  "& .MuiSlider-thumb": {
    backgroundColor: "var(--color-highlight)",
  },
};

const UrlForm = ({
  value,
  setValue,
  handleValidate,
  loading,
  invalidUrls,
  maxRequests,
  setMaxRequests,
}) => {
  return (
    <div className="url-form">
      <TextField
        style={textareaStyle}
        multiline
        rows={10}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        error={!!invalidUrls.length}
      />

      {/*INVALID INPUT */}
      {!!invalidUrls.length && (
        <div className="url-form__invalid">
          The following input(s) are invalid:
          <ul>{invalidUrls.map(renderList)}</ul>
        </div>
      )}

      <div className="validate">
        {/* VALIDATE BUTTON */}
        <button
          className="validate__btn"
          disabled={value.trim().length === 0 || loading}
          onClick={handleValidate}
        >
          VALIDATE
        </button>

        {/* CONCURRENT REQUESTS SLIDER */}
        <div className="validate__slider">
          <div>No of simultaneous checks:</div>
          <Slider
            value={maxRequests}
            min={1}
            max={15}
            step={1}
            valueLabelDisplay="auto"
            onChange={(_, newValue) => setMaxRequests(newValue)}
            sx={sxSliderStyle}
            disabled={loading}
          />
        </div>
      </div>
    </div>
  );
};

UrlForm.propTypes = {
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  handleValidate: PropTypes.func.isRequired,
  invalidUrls: PropTypes.array.isRequired,
  maxRequests: PropTypes.number.isRequired,
  setMaxRequests: PropTypes.func.isRequired,
};

export default memo(UrlForm);
