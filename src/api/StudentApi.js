import { useAxios } from "src/composable/useAxios";
export const StudentApi = () => {
  const { callApi } = useAxios();
  const getStudentList = async (
    req = {
      id: 0,
      page: 1,
      perPage: 10,
    }
  ) => {
    return await callApi({
      method: "GET",
      url: `/students?_id=${req.id}&page=${req.page}&perPage=${req.perPage}`,
    });
  };
  const deleteStudent = async (id) => {
    return await callApi({
      method: "DELETE",
      url: `/students?_ids=${id}`,
    });
  };
  const createStudent = async (req = {}) => {
    return await callApi({
      method: "POST",
      url: "/students",
      body: req,
    });
  };
  const listYears = async () => {
    return await callApi({
      method: "GET",
      url: "/findStudentByYear",
    });
  };
  const listPoint = async () => {
    return await callApi({
      method: "GET",
      url: "/findStudentByPoint",
    });
  };

  const updateStudent = async (req = {}) => {
    return await callApi({
      method: "PUT",
      url: "/studentsUpdate",
      body: req,
    });
  };

  const getOne = async (id) => {
    return await callApi({
      method: "GET",
      url: `/studentsReadSingle?_id=${id}`,
    });
  };
  return {
    getStudentList,
    deleteStudent,
    createStudent,
    listYears,
    listPoint,
    updateStudent,
    getOne,
  };
};
