import axios from "axios";

const Axios = axios.create({
  baseURL: "/api",
  headers: {
    "Content-type": "application/json",
    "x-key": "SnLnkORrZuzYsEPb",
  },
  timeout: 30000,
});

Axios.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV === "development") {
      console.log(
        `${new Date().toISOString()}: `,
        `[${String(response.config.method).toUpperCase()}] ${
          response.request.responseURL
        }`,
        {
          STATUS: response.status,
          DATA: response.data,
        }
      );
    }
    return response;
  },
  (error) => {
    const name = error.code || "Error";
    const message = error.message || "";
    const resp = error?.response || {};
    const req = error?.request || {};
    const url = error.request.responseURL || "";
    console.error(`${new Date().toISOString()}: ${url}: ${name}: ${message}`, {
      REQ: req,
      RESP: resp,
    });
    return error;
  }
);

export default Axios;
