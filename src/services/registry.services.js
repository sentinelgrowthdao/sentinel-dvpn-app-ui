import Axios from "./Axios";

const registryServices = {
  setKey: (data) =>
    Axios.post("/registry", data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error(error);
      }),
  getKey: (key) =>
    Axios.get(`/registry?key=${key}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error(error);
      }),
  getUserVersion: () =>
    Axios.get("/registry/version")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error(error);
      }),
  getLogs: () =>
    Axios.get("/registry/logs")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error(error);
      }),
  getClipboard: () =>
    Axios.get("/registry/clipboard")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw new Error(error);
      }),
};

export default registryServices;
