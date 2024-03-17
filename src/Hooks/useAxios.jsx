import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

const instance = axios.create({
    // baseURL: 'http://localhost:8080',
    baseURL: 'https://kotha-server.vercel.app',
    withCredentials: true,
});

const useAxios = () => {
    const { logOutUser } = useContext(AuthContext);
    
    instance.interceptors.response.use(
        (response)=>{
            return response;
        },
        (error)=>{
            if (error.code.response.status === 401 || error.code.response.status === 403) {
                logOutUser();
                axios.post('/logout')
            }
        }
    );

    return instance;
};

export default useAxios;
