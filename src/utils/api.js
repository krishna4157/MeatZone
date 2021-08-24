import axios from 'axios';
import JSOG from 'jsog';
import _ from 'lodash';


const axiosConfig = axios.create({
  baseURL: 'http://pegasusinc.in/public',
  headers: { 'Access-Control-Allow-Origin': '*' },

  crossdomain: true, 
  transformResponse: [].concat(
    axios.defaults.transformResponse,
    data => JSOG.decode(data),
  ),
});



axiosConfig.interceptors.request.use(
  config => getConfig(config),
  error => {
    Promise.reject(error);
  },
);

const getConfig = async (config) => {
  return config;
}
export default axiosConfig;
