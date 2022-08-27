import axiosInstance from './APIService';
import Stop from "../Types/Stop";

const getStopsForBusCode = async (id: string) => {
    const response = await axiosInstance.get<Stop[]>(`/bus/stops/${id}`);
    return response.data;
}

const API = { getStopsForBusCode: getStopsForBusCode};
export default API;