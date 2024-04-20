import Axios from "./Axios";

const dnsServices = {
  getAvailableDNS: () =>
    Axios.get("/dns/list")
      .then((response) => response.data)
      .catch((e) => {
        throw e;
      }),

  getCurrentDNS: () =>
    Axios.get("/dns/current")
      .then((response) => response.data)
      .catch((e) => {
        throw e;
      }),

  putDNS: (data) =>
    Axios.put("/dns", data)
      .then((response) => response)
      .catch((e) => {
        throw e;
      }),
};

export default dnsServices;
