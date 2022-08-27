import axios from 'axios';
import Config from "../Const/Config";

const axiosInstance = axios.create({
    baseURL: Config.SERVER_URL,
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json',
    },
});


export default axiosInstance;