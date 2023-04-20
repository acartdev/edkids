import { useAxios } from "src/composable/useAxios";
export const PointApi = () => {
  const { callApi } = useAxios();
  const PointResult = async () => {
    return await callApi({
      method: "GET",
      url: "/studentsAllActive",
    });
  };
  return {
    PointResult,
  };
};
