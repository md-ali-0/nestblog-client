import axios from "axios";
import { useNavigate } from "react-router-dom";

const axiosSecure = axios.create({
  baseURL: "http://localhost:8080",
});

const useAxios = () => {
  const navigate = useNavigate()
  axiosSecure.interceptors.request.use(
    (config) => {
      config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
      return config
    },
    (error) => {
      return Promise.reject(error)
    })

  // intercepts 401 and 403 status
  axiosSecure.interceptors.response.use(function (response) {
    return response;
  }, async (error) => {
    const status = error.response.status;
    if (status === 401 || status === 403) {
      return navigate('/login');
    }
    return Promise.reject(error);
  })

  return axiosSecure;
};

export default useAxios;
