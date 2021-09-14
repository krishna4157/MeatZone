import axios from 'axios';
import JSOG from 'jsog';
import _ from 'lodash';


const axiosConfig = axios.create({
  baseURL: 'http://meatzone.seomantras.in/api/customer',
  headers: { 
    'Access-Control-Allow-Origin': '*',
    // "Authorization": `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMTNmMDg4NzkzZTJjNDgwOGY2MDVhNGRkMjZlYzIwY2NhN2FhNjQwYjI2MzA2YmMxNzYxNDMyYzgxNjFlMzNjOTY0ZWVmOGQ0NjQ1NDY0YTMiLCJpYXQiOjE2MzA0ODg5MDkuMDAxNjk3LCJuYmYiOjE2MzA0ODg5MDkuMDAxNzAxLCJleHAiOjE2NjIwMjQ5MDguOTk1NjA1LCJzdWIiOiIxIiwic2NvcGVzIjpbXX0.AsX2tT4eTH7nvbkeDjGRq1oJTeZnUD8xMFAnc7XZ3BpyUfTibxcZckEx6anigUx3SAMi7tT-UjeSijYYhj3UZOwbqQhjGFZW-ugkmSxxmI3SKIrex5032a0XzpvRU6mT8zfT-ztYuWAG3EBSfiZwN1Bn-Dv973WUib-f6EmCDtJwxGsomTaaVYwZN0ChPAOwGn0EMzXwZPzG6mM_hHJbHEH5WPe9r0ITtRJB0J3bKzV534CYLMKh9DboLYeSz-J7rFGoxWYPpgsnqx_2ZyxO4i0VL1KXGVzScI-3Et5icmOEvd1BVuN4WYlcET_U1ic2ffZgtDpyif91GdwaMCMqINcd6vPxgYUUzgC2Q4JSLyb3hlbiIHTvDeBSbzVXWGoFxIyBR0Ma9jQUzdpfpgcmXYmrh8QUSzT4w24M5UwvvWeNqC8Xq1KM2sFASuUCFhq9kinC1M0FyYnMssWYzEag-HzYRg0euWinkiH6TLPV1RfG3FADDopyAX5qw7wnU2s0_EldIwxfshE1cVBlF1WBByVpLWHbO3WrFkGC6JZapZWDeHyMIYd1WvqJZWS44gzpHfk9Y-sRKvhYdnJCkWaiU_pEPfAWgSjJdTieZCmf44XhZprpPYcSs2-cLxf0O994zi2XwCW-_lYKvKrCwfZ_riLk-rBxWLo5BFctdqRQOn0`,
  },
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
