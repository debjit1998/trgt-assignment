import axios from "axios";

export const getApiUrl = (endpoint) =>
  `${process.env.REACT_APP_API_BASE_URL}/${endpoint}`;

const urlRegex = new RegExp(
  "^(https?:\\/?\\/?)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
    "(\\#[-a-z\\d_]*)?$",
  "i"
);

export const isValidUrl = (url) => urlRegex.test(url);

export const callApi = (url, callback) =>
  axios
    .post(getApiUrl("validate"), {
      url,
    })
    .then((response) => {
      if (typeof callback === "function") callback(response.data, url);
      return response.data;
    })
    .catch((err) => {
      if (err.message !== "Network Error" && typeof callback === "function") {
        callback({ valid: false }, url);
        return err;
      } else throw err;
    });
