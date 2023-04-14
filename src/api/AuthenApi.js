import { useAxios } from "src/composable/useAxios";
export const AuthenApi = () => {
  const { callApi } = useAxios();
  const loginProcess = async (req = {}) => {
    return await callApi({
      method: "POST",
      url: "/signin",
      body: req,
    });
  };
  const userLogout = async () => {
    return await callApi({
      method: "POST",
      url: "/userLogout",
    });
  };
  const getUserDataByAuth = async () => {
    return await callApi({
      method: "GET",
      url: "/userCheckAuth",
    });
  };

  return {
    loginProcess,
    getUserDataByAuth,
    userLogout,
  };
};
