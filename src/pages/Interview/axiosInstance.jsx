import axios from 'axios';
import Cookies from 'js-cookie';

const ERROR_CODE = {
    UNAUTHORIZED: 401
};

const axiosInstance = axios.create({
    baseURL: 'http:localhost:8080/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
        console.log("여기");
        const token = Cookies.get('accessToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        config.headers['Authorization'] = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyIiwiYXV0aCI6IlJPTEVfVVNFUiIsImV4cCI6MTcwMTg3NDg3Mn0.ezDOczPeRqwn45s00ttVQvpPuvAhW5AnevZvLXlL8MI2UjcTsUq4UrodtUhaZqTKdyHnSLc4lBnaM50V6BiPJA';
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// axiosInstance.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     async (error) => {
//         const originalRequest = error.config;

//         if (error.response?.status === ERROR_CODE.UNAUTHORIZED) {
//             return { data: null };
//         }

//         if (
//             error.response?.status === ERROR_CODE.UNAUTHORIZED &&
//             !originalRequest._retry &&
//             originalRequest.url !== '/auth/reissue'
//         ) {
//             originalRequest._retry = true;
//             try {
//                 const response = await axiosInstance.post('/auth/refresh');
//                 const accessToken = response.data.accessToken;

//                 Cookies.set('accessToken', accessToken);

//                 axiosInstance.defaults.headers.common[
//                     'Authorization'
//                 ] = `Bearer ${accessToken}`;

//                 return axiosInstance(originalRequest);
//             } catch (error) {
//                 Cookies.remove('accessToken');
//             }
//         }
//         return Promise.reject(error);
//     }
// );

export default axiosInstance;