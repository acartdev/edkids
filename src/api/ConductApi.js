import { useAxios } from "src/composable/useAxios";
export const ConductApi = () => {
  const { callApi } = useAxios();
  const getConductList = async (id) => {
    return await callApi({
      method: "GET",
      url: `/pointReadSingle?_id=${id}`,
    });
  };
  const getConductAverage = async (id) => {
    return await callApi({
      method: "GET",
      url: `/getPoint?_id=${id}`,
    });
  };
  return {
    getConductList,
    getConductAverage,
  };
};
