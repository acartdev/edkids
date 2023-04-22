import { useAxios } from "src/composable/useAxios";
export const teacherApi = () => {
  const { callApi } = useAxios();
  const getTeacher = async (id) => {
    return await callApi({
      method: "GET",
      url: `/teacherReadSingle?_id=${id}`,
    });
  };
  const updateTeacher = async (req = {}) => {
    return await callApi({
      method: "PUT",
      url: "/teacher",
      body: req,
    });
  };
  return { getTeacher, updateTeacher };
};
