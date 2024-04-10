export const parseWalletAddress = (str, start = 10, end = -6) => {
  if (str && str.length > 0)
    return str.slice(0, start) + "..." + str.slice(end, str.length);
  return "";
};

export const getMobileOS = () => {
  const ua = navigator.userAgent;
  if (/android/i.test(ua.toLowerCase())) {
    return "android";
  } else if (
    /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  ) {
    return "ios";
  }
  return null;
};

export const isVersionGreater = (userVersion, onlineVersion) => {
  const online = onlineVersion.split(".");
  const user = userVersion.split(".");

  for (let i = 0; i < Math.max(online.length, user.length); i++) {
    const numOnline = parseInt(online[i]) || 0;
    const numUser = parseInt(user[i]) || 0;
    if (numOnline === numUser) {
      continue;
    }
    if (numUser < numOnline) {
      return true;
    }
    return false;
  }
};
