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
  const likePost = async (req = {}) => {
    return await callApi({
      method: "POST",
      url: `/likePost`,
      body: req,
    });
  };
  const likeGet = async (id) => {
    return await callApi({
      method: "GET",
      url: `/likePostReadSingle?_id=${id}`,
    });
  };
  return {
    getPost,
    getImagePost,
    likePost,
    likeGet,
  };
};
