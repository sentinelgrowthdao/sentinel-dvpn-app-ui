export const parseWalletAddress = (str, start = 10, end = -6) => {
  if (str && str.length > 0)
    return str.slice(0, start) + "..." + str.slice(end, str.length);
  return "";
};
