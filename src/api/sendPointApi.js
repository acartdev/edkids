import { useAxios } from "src/composable/useAxios";
export const sendPointApi = () => {
  const { callApi } = useAxios();
  const sendPoint = async (req = {}) => {
    return await callApi({
      method: "POST",
      url: "/point",
      body: req,
    });
  };
  return { sendPoint };
};
