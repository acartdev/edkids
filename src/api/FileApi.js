import { useAxios } from "src/composable/useAxios";
export const FileApi = () => {
  const { callApi } = useAxios();
  const uploadImageApi = async (file) => {
    const postData = new FormData();
    postData.append("fileName", file);
    return await callApi({
      method: "POST",
      url: "/uploadImageApi",
      contentType: "multipart/form-data",
      body: postData,
    });
  };

  return {
    uploadImageApi,
  };
};
