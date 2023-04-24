import { useAxios } from "src/composable/useAxios";
export const PostApi = () => {
  const { callApi } = useAxios();
  const getPost = async (id) => {
    return await callApi({
      method: "GET",
      url: `/social?_id=${id}`,
    });
  };
  const getImagePost = async (id) => {
    return await callApi({
      method: "GET",
      url: `/postImgReadSingle?_id=${id}`,
    });
  };
  return {
    getPost,
    getImagePost,
  };
};
