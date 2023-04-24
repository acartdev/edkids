import { useAxios } from "src/composable/useAxios";
export const teacherApi = () => {
  const { callApi } = useAxios();
  const getTeacher = async (id) => {
    return await callApi({
      method: "GET",
      url: `/teacherReadSingle?_id=${id}`,
    });
  };
  const getOneTeacher = async (id) => {
    return await callApi({
      method: "GET",
      url: `/teacherReadSingle?_id=${id}`,
    });
  };
  return { getTeacher, getOneTeacher };
};
