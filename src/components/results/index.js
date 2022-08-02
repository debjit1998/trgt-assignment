import { memo } from "react";
import PropTypes from "prop-types";
import "./index.css";

const renderList = ({ name, id }) => (
  <li className="results__listitem" key={id}>
    {name}
  </li>
);

const Results = ({ validResults, invalidResults }) => {
  if (!validResults.length && !invalidResults.length) return null;

  return (
    <div className="results">
      {/* VALID URLS */}
      <div className="results__valid">
        <h3>
          Valid URLs{" "}
          {!!validResults.length && <span>({validResults.length})</span>}
        </h3>
        <ul>{validResults.map(renderList)}</ul>
      </div>

      {/* INVALID URLS */}
      <div className="results__invalid">
        <h3>
          Invalid URLs{" "}
          {!!invalidResults.length && <span>({invalidResults.length})</span>}
        </h3>
        <ul>{invalidResults.map(renderList)}</ul>
      </div>
    </div>
  );
};

Results.propTypes = {
  validResults: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.string,
    })
  ).isRequired,

  invalidResults: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.string,
    })
  ).isRequired,
};

export default memo(Results);
