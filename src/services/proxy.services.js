import Axios from "./Axios";

const proxyServices = {
  getIpAddress: () =>
    Axios.get("/proxy/ip")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      }),
  getOnlineVersion: () =>
    Axios.get("/proxy/version")
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      }),
  getCountriesList: async (protocols = []) => {
    const promises = [];
    protocols.forEach((protocol) => {
      promises.push(
        Axios.get("/proxy/countries", {
          params: {
            protocol,
          },
        })
      );
    });
    const responses = [];
    let isAuthorised = true;
    for (const promise of promises) {
      try {
        const resp = await promise;
        responses.push(resp.data.data);
      } catch (error) {
        if (error.response.status === 401) {
          isAuthorised = false;
        } else {
          responses.push([]);
        }
      }
    }
    if (isAuthorised) {
      return responses.flat(1);
    }
    return { error: "unauthorizedDevice" };
  },
  getCitiesList: async (countryId, protocols = []) => {
    const promises = [];
    protocols.forEach((protocol) => {
      promises.push(
        Axios.get(`/proxy/countries/${countryId}/cities`, {
          params: {
            protocol,
          },
        })
      );
    });
    const responses = [];
    let isAuthorised = true;

    for (const promise of promises) {
      try {
        const resp = await promise;
        responses.push(resp.data.data);
      } catch (error) {
        if (error.response.status === 401) {
          isAuthorised = false;
        } else {
          responses.push([]);
        }
      }
    }
    if (isAuthorised) {
      return responses.flat(1);
    }
    return { error: "unauthorizedDevice" };
  },
  getServersList: async (countryId, cityId, protocols = []) => {
    const promises = [];
    protocols.forEach((protocol) => {
      promises.push(
        Axios.get(`/proxy/countries/${countryId}/cities/${cityId}/servers`, {
          params: {
            protocol,
          },
        })
      );
    });
    const responses = [];
    let isAuthorised = true;

    for (const promise of promises) {
      try {
        const resp = await promise;
        responses.push(resp.data.data);
      } catch (error) {
        if (error.response.status === 401) {
          isAuthorised = false;
        } else {
          responses.push([]);
        }
      }
    }
    if (isAuthorised) {
      return responses.flat(1);
    }
    return { error: "unauthorizedDevice" };
  },
  postWindowOpen: (data) =>
    Axios.post("/proxy/browser", data)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      }),
  postRecentServersList: (data) =>
    Axios.post(`/proxy/servers`, data)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      }),
  postFeeGrantWallet: (address) =>
    Axios.post(`/proxy/wallet`, { address })
      .then((response) => response)
      .catch((error) => {
        throw error;
      }),
};
export default proxyServices;
