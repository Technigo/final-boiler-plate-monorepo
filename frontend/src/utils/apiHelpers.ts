export const findToken = () => {
  const accessToken = localStorage.getItem("accessToken");
  return accessToken;
};
