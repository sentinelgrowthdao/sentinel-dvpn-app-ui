import Axios from "./Axios";

const registryServices = {
  setKey: (data) =>
    Axios.post("/registry", data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      }),
  getKey: (key) =>
    Axios.get(`/registry?key=${key}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      }),
  getUserVersion: () =>
    Axios.get("/registry/version")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      }),
  getLogs: () =>
    Axios.get("/registry/logs")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      }),
  getClipboard: () =>
    Axios.get("/registry/clipboard")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      }),
};

export default registryServices;
