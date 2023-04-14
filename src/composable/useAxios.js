import { api } from "src/boot/axios";

const token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOjEsImtleSI6IjY4MmNjMmVmNDEyMjE2YjYyMTZmMDZkZTJhZDYzNDUwMWU5ODc1YWYwZDg2ZjA5MGM3MWUxOTQ5NDU1ZmMyM2NjZjVkNzczMmNiNDc4Njk2YzFjM2Q0ZTZlMmM0NGE5ZTY3MmYzMTdkYmUyZDEwMjgyY2Q2YTRkYjZjOWQwOThmIiwiaWF0IjoxNjgxMTc3ODI2LCJleHAiOjE3MTI4MDAyMjZ9.cItGQdts5JNnVF4Ny5WG5AacW9nF9AXOYVWIDK71Wko";
export const useAxios = () => {
  const callApi = (
    req = {
      method: undefined,
      url: undefined,
      body: undefined,
      baseUrl: undefined,
      contentType: "application/json",
    }
  ) => {
    return new Promise((resolve, reject) => {
      console.log(`api ${api.defaults.baseURL}${req.url}`);

      api.defaults.headers["apiClient"] = "default";
      api.defaults.headers["X-locale"] = null;
      api.defaults.headers.Authorization = `Bearer ${token}`;
      if (req.baseUrl) {
        api.defaults.baseURL = req.baseUrl;
      }
      if (req.contentType) {
        api.defaults.headers["Content-Type"] = req.contentType;
      } else {
        api.defaults.headers["Content-Type"] = "application/json";
      }
      api({
        method: req.method,
        url: req.url,
        data: req.body ? req.body : undefined,
      })
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error.message);
        });
    });
  };
  return {
    callApi,
  };
};
