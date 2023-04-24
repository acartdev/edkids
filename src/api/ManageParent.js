import { useAxios } from "src/composable/useAxios";
export const ManageApi = () => {
  const { callApi } = useAxios();
  const getStudentList = async (
    req = {
      page: 1,
      perPage: 10,
    }
  ) => {
    return await callApi({
      method: "GET",
      url: `/students?page=${req.page}&perPage=${req.perPage}`,
    });
  };
  const getListParent = async (id) => {
    return await callApi({
      method: "GET",
      url: `/readParent?_id=${id}`,
    });
  };
  const addManage = async (req = {}) => {
    return await callApi({
      method: "POST",
      url: "/manageParent",
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
  return {
    addManage,
    getListParent,
  };
};
