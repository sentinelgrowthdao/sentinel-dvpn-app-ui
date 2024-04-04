export const createRecentServerToStore = (server) => {
  return {
    address: server.address,
    city: server.city,
    code: server.code,
    country: server.country,
    id: server.id,
    name: server.name,
    protocol: server.protocol,
  };
};

export const getAddressesFromServers = (servers) => {
  if (servers && servers.length > 0) {
    const addresses = servers.map((server) => server.address);
    return addresses;
  }
  return [];
};

export const parseExistingServers = (
  existing = [],
  newServers = [],
  addresses = []
) => {
  const recents = [];
  const servers = newServers.map((ns) => {
    const e = existing.find((s) => s.address === ns.address);
    return { ...e, ...ns };
  });

  for (const addr of addresses) {
    const index = servers.findIndex((obj) => obj.address === addr);
    if (index !== -1) {
      recents.push(servers[index]);
      servers.splice(index, 1);
    }
  }
  if (recents && recents.length === addresses.length) {
    return recents;
  }
  return [];
};
