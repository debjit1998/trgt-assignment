import { useState, Fragment } from "react";
import axios from "axios";
import { Snackbar, Alert } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import Header from "./components/header";
import UrlForm from "./components/url-form";
import Footer from "./components/footer";
import Progress from "./components/progress";
import Results from "./components/results";
import "./App.css";

const App = () => {
  const [value, setValue] = useState("");
  const [validResults, setValidResults] = useState([]);
  const [invalidResults, setInvalidResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checkedUrls, setCheckedUrls] = useState(0);
  const [totalUrls, setTotalUrls] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");

  const handleValidate = async () => {
    if (value.trim().length === 0) return;

    const urls = value.split("\n").filter((url) => url.trim() !== "");

    //return early if there are no valid urls
    if (urls.length === 0) return;

    // reset the states before calling api
    setLoading(true);
    setValidResults([]);
    setInvalidResults([]);
    setCheckedUrls(0);
    setTotalUrls(urls.length);
    setErrorMsg("");

    for (const url of urls) {
      try {
        // call the validate api
        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/validate`,
          {
            url,
          }
        );

        if (response.data?.valid) {
          //append valid url to the valid results list
          setValidResults((prevUrls) => [
            ...prevUrls,
            { name: url, id: uuidv4() },
          ]);
        } else {
          //append invalid url to the inavlid results list
          setInvalidResults((prevUrls) => [
            ...prevUrls,
            { name: url, id: uuidv4() },
          ]);
        }
      } catch (error) {
        // set error message to show in snackbar
        setErrorMsg(
          "Something went wrong. Please check your network or try again"
        );
        break;
      }

      setCheckedUrls((prevCount) => prevCount + 1); //increment the count of checked urls
    }
    setLoading(false);
  };

  return (
    <Fragment>
      {/* HEADER */}
      <Header />

      {/* URL FORM */}
      <UrlForm
        value={value}
        setValue={setValue}
        handleValidate={handleValidate}
        loading={loading}
      />

      {/* URL CHECK PROGRESS */}
      <Progress totalUrls={totalUrls} checkedUrls={checkedUrls} />

      {/* RESULTS SECTION */}
      <Results validResults={validResults} invalidResults={invalidResults} />

      {/* FOOTER */}
      <Footer>
        {/* SNACKBAR */}
        <Snackbar
          open={!!errorMsg}
          onClose={() => setErrorMsg("")}
          key={"URL Error"}
          autoHideDuration={6000}
        >
          <Alert severity="error">{errorMsg}</Alert>
        </Snackbar>
      </Footer>
    </Fragment>
  );
};

export default App;
