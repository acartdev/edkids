import { useAxios } from "src/composable/useAxios";
export const TeacherApi = () => {
  const { callApi } = useAxios();
  const getOneTeacher = async (id) => {
    return await callApi({
      method: "GET",
      url: `/teacherReadSingle?_id=${id}`,
    });
  };
  return {
    getOneTeacher,
  };
};
