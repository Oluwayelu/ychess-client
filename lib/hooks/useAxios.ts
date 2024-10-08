import axios from "axios";

const API_URL = process.env.NEXT_APP_API_URL || "http://localhost:8000/v1";

console.log("APIURL: ", process.env.NEXT_APP_API_URL);

const useAxios = () => {
  const axiosInstance = axios.create({
    baseURL: API_URL,
  });

  return axiosInstance;
};

export default useAxios;

