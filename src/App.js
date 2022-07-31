import { useState } from "react";
import axios from "axios";
import { TextField, LinearProgress, Snackbar, Alert } from "@mui/material";
import "./App.css";

function App() {
  const [value, setValue] = useState("");
  const [valid, setValid] = useState([]);
  const [invalid, setInvalid] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState("");

  const handleValidate = async () => {
    if (value.trim().length === 0) return;

    const urls = value.split("\n").filter((url) => url.trim() !== "");

    if (urls.length === 0) return;

    setLoading(true);
    setValid([]);
    setInvalid([]);
    setCount(0);
    setTotal(urls.length);
    setError("");

    for (let url of urls) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/validate`,
          {
            url,
          }
        );
        if (response.data?.valid) setValid((prev) => [...prev, url]);
        else setInvalid((prev) => [...prev, url]);
      } catch (error) {
        setError(
          "Something went wrong. Please check your network or try again"
        );
        break;
      }

      setCount((prev) => prev + 1);
    }
    setLoading(false);
  };

  return (
    <>
      <Snackbar
        open={!!error}
        onClose={() => setError("")}
        key={"URL Error"}
        autoHideDuration={6000}
      >
        <Alert severity="error">{error}</Alert>
      </Snackbar>
      <div className="main-content">
        <h1>URL Validator</h1>
        <TextField
          style={{
            width: "100%",
            background: "white",
            marginTop: "2rem",
          }}
          multiline
          rows={10}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div style={{ marginTop: "15px" }}>
          <button
            className="validate-btn"
            disabled={value.trim().length === 0 || loading}
            onClick={handleValidate}
          >
            VALIDATE
          </button>
        </div>
      </div>

      {!!total && (
        <div className="progress">
          <LinearProgress
            style={{ marginTop: "1rem" }}
            sx={{
              "& .MuiLinearProgress-bar": {
                transitionDuration: "100ms",
              },
              "& .MuiLinearProgress-barColorPrimary": {
                backgroundColor: "#ff4820",
              },
            }}
            variant="determinate"
            value={Math.round((count * 100) / total)}
          />
          <h4 className="progress-info">
            ({count}/{total}) URLs checked
          </h4>
        </div>
      )}

      {(!!valid.length || !!invalid.length) && (
        <div className="results">
          <div className="valid">
            <h3>Valid URLs</h3>
            <ul>
              {valid.map((url, index) => (
                <li className="item" key={index}>
                  {url}
                </li>
              ))}
            </ul>
          </div>
          <div className="invalid">
            <h3>Invalid URLs</h3>
            <ul>
              {invalid.map((url, index) => (
                <li className="item" key={index}>
                  {url}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
