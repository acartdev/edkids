import { useAxios } from "src/composable/useAxios";
export const PostImageApi = () => {
  const { callApi } = useAxios();
  const PostImage = async (req = {}) => {
    return await callApi({
      method: "POST",
      url: "/postImg",
      body: req,
    });
  };

  const PostMsg = async (req = {}) => {
    return await callApi({
      method: "POST",
      url: "/social",
      body: req,
    });
  };
  const ListPost = async () => {
    return await callApi({
      method: "GET",
      url: "/postList",
    });
  };
  const updatePost = async (req = {}) => {
    return await callApi({
      method: "PUT",
      url: "/social",
      body: req,
    });
  };
  const ListPostImg = async (id) => {
    return await callApi({
      method: "GET",
      url: `/postImgReadSingle?_id=${id}`,
    });
  };
  const deletePost = async (id) => {
    return await callApi({
      method: "DELETE",
      url: `/socialMsg?_ids=${id}`,
    });
  };
  const deleteImgPost = async (id) => {
    return await callApi({
      method: "DELETE",
      url: `/deletePost?_ids=${id}`,
    });
  };

  return {
    PostImage,
    PostMsg,
    ListPost,
    ListPostImg,
    deleteImgPost,
    deletePost,
    updatePost,
  };
};
