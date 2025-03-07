import axios from 'axios';

// set up axios client
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout:10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  xsrfCookieName: 'XSRF-TOKEN',
  withCsrfToken:true
});

// requests middleware
axiosClient.interceptors.request.use( async (config) => {

  if (config.data instanceof FormData) {
    config.headers['Content-Type'] = "multipart/form-data";
  }else {
    config.headers['Content-Type'] = "application/json";
    //config.headers['X-XSRF-TOKEN'] = getCookie('XSRF-TOKEN');

  }

  if (/^\/auth\/\w+$/.test(config.url)) {
    let { csrf } = await axios.get("http://127.0.0.1:8000/sanctum/csrf-cookie", {
    withCredentials: true
});

    if (csrf?.error) {
      throw new Error(csrf?.error?.message);
      return null;
    }
  }

  const xsrfToken = document.cookie
   .split('; ')
   .find(row => row.startsWith('XSRF-TOKEN='))
   ?.split('=')[1];
 if (xsrfToken) {
   config.headers['X-XSRF-TOKEN'] = decodeURIComponent(xsrfToken);
 }

  return config;
}, (error) => Promise.reject(error));


// responses middleware
axiosClient.interceptors.response.use(function (response) {

    return response;

  }, function (error) {

    if (error.status === 401) {
      window.location.replace('/login');
    };
    if (error.status === 409) {
      window.location.replace('/verify-email');
    };

    return Promise.reject(error);
  });


export default axiosClient;
