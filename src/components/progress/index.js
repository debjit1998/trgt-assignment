import { memo } from "react";
import PropTypes from "prop-types";
import { LinearProgress } from "@mui/material";
import "./index.css";

const style = { marginTop: "1rem" };
const sxStyle = {
  "& .MuiLinearProgress-bar": {
    transitionDuration: "var(--progress-bar-duration)",
  },
  "& .MuiLinearProgress-barColorPrimary": {
    backgroundColor: "var(--color-highlight)",
  },
};

const Progress = ({ totalUrls, checkedUrls }) => {
  if (!totalUrls) return null;

  return (
    <div className="progress">
      <LinearProgress
        style={style}
        sx={sxStyle}
        variant="determinate"
        value={Math.round((checkedUrls * 100) / totalUrls)}
      />
      <h4 className="progress__info">
        ({checkedUrls}/{totalUrls}) URLs checked
      </h4>
    </div>
  );
};

Progress.propTypes = {
  totalUrls: PropTypes.number.isRequired,
  checkedUrls: PropTypes.number.isRequired,
};

export default memo(Progress);
