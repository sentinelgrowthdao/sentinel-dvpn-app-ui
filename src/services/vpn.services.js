import Axios from "./Axios";

const vpnServices = {
  getStatus: () =>
    Axios.get("/status")
      .then((response) => response.data)
      .catch(() => {
        return null;
      }),
  postConnect: (data) =>
    Axios.post("/connect", data)
      .then((response) => response.data)
      .catch((e) => {
        throw e;
      }),
  postDisconnect: () =>
    Axios.post("/disconnect")
      .then((response) => response.data)
      .catch((e) => {
        throw e;
      }),
};

export default vpnServices;
