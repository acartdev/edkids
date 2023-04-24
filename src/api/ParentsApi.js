import { useAxios } from "src/composable/useAxios";
export const ParentsApi = () => {
  const { callApi } = useAxios();
  const getParents = async (id) => {
    return await callApi({
      method: "GET",
      url: `/parentsSearch?std_id=${id}`,
    });
  };
  const getParentsStudentInfo = async (id) => {
    return await callApi({
      method: "GET",
      url: `/parentsReadSingle?_id=${id}`,
    });
  };
  return {
    getParents,
    getParentsStudentInfo,
  };
};
