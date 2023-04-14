import { useAxios } from "src/composable/useAxios";
export const ParentApi = () => {
  const { callApi } = useAxios();
  const getParentList = async (id) => {
    return await callApi({
      method: "GET",
      url: `/parentsReadSingle?_id=${id}`,
    });
  };
  const deleteParent = async (id) => {
    return await callApi({
      method: "DELETE",
      url: `/parents?_ids=${id}`,
    });
  };
  const createParent = async (req = {}) => {
    return await callApi({
      method: "POST",
      url: "/parents",
      body: req,
    });
  };

  const updateParent = async (req = {}) => {
    return await callApi({
      method: "PUT",
      url: "/studentsUpdate",
      body: req,
    });
  };
  return {
    getParentList,
    createParent,
  };
};
