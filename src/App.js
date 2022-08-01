import { useState, Fragment, useCallback } from "react";
import { Snackbar, Alert } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import Header from "./components/header";
import UrlForm from "./components/url-form";
import Footer from "./components/footer";
import Progress from "./components/progress";
import Results from "./components/results";
import { isValidUrl, callApi } from "./utils/http";
import "./App.css";

const separators = /[\s,\n\t;]+/;

const defaultRequests = 5;

const App = () => {
  const [value, setValue] = useState("");
  const [validResults, setValidResults] = useState([]);
  const [invalidResults, setInvalidResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [checkedUrls, setCheckedUrls] = useState(0);
  const [totalUrls, setTotalUrls] = useState(0);
  const [snackbarErrorMsg, setSnackbarErrorMsg] = useState("");
  const [invalidUrls, setInvalidUrls] = useState([]);
  const [maxRequests, setMaxRequests] = useState(defaultRequests);

  const updateListData = useCallback((data, url) => {
    setCheckedUrls((prevCount) => prevCount + 1); //increment the count of checked urls
    if (data?.valid) {
      //append valid url to the valid results list
      setValidResults((prevUrls) => [...prevUrls, { name: url, id: uuidv4() }]);
    } else {
      //append invalid url to the inavlid results list
      setInvalidResults((prevUrls) => [
        ...prevUrls,
        { name: url, id: uuidv4() },
      ]);
    }
  }, []);

  const handleValidate = useCallback(async () => {
    if (value.trim().length === 0) return;

    const urlParts = value
      .split(separators)
      .filter((url) => url.trim().length !== 0);

    const urls = [],
      invalidArr = [];

    urlParts.forEach((url) => {
      if (isValidUrl(url)) {
        urls.push(url);
      } else if (url.trim().length !== 0) {
        invalidArr.push({ name: url, id: uuidv4() });
      }
    });

    setInvalidUrls(invalidArr);

    //return early if there are no valid urls
    if (urls.length === 0) return;

    // reset the states before calling api
    setLoading(true);
    setValidResults([]);
    setInvalidResults([]);
    setCheckedUrls(0);
    setTotalUrls(urls.length);
    setSnackbarErrorMsg("");

    // windowing is added to limit the number of requests sent to the backend
    // large number of concurrent requests may crash the server
    for (let index = 0; index < urls.length; index += maxRequests) {
      try {
        const promiseArr = urls
          .slice(index, index + maxRequests)
          .map((url) => callApi(url, updateListData));

        // call the validate api concurrently for a window
        await Promise.all(promiseArr);
      } catch (error) {
        // set error message to show in snackbar
        setSnackbarErrorMsg(
          "Something went wrong. Please check your network or try again"
        );
      }
    }

    setLoading(false);
  }, [value, updateListData, maxRequests]);

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
        invalidUrls={invalidUrls}
        maxRequests={maxRequests}
        setMaxRequests={setMaxRequests}
      />

      {/* URL CHECK PROGRESS */}
      <Progress totalUrls={totalUrls} checkedUrls={checkedUrls} />

      {/* RESULTS SECTION */}
      <Results validResults={validResults} invalidResults={invalidResults} />

      {/* FOOTER */}
      <Footer>
        {/* SNACKBAR */}
        <Snackbar
          open={!!snackbarErrorMsg}
          onClose={() => setSnackbarErrorMsg("")}
          key={"URL Error"}
          autoHideDuration={6000}
        >
          <Alert severity="error">{snackbarErrorMsg}</Alert>
        </Snackbar>
      </Footer>
    </Fragment>
  );
};

export default App;
