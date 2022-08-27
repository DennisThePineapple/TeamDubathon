import axiosInstance from './APIService';
import Stop from "../Types/Stop";
import VehiclePosition from "../Types/VehiclePosition";
import Route from "../Types/Route";
import vehiclePosition from "../Types/VehiclePosition";

const getStopsForBusCode = async (busCode: string) => {
    const response = await axiosInstance.get<Stop[]>(`/bus/stops/${busCode}`);
    return response.data;
}

const getRouteForBusCode = async (busCode: string) => {
    const response = await axiosInstance.get<Route>(`/bus/route/${busCode}`);
    return response.data;
}

const getVehiclePositionsForRoute = async (routeId: string) => {
    const response = await axiosInstance.get<VehiclePosition[]>(`stats/route/${routeId}`);
    return response.data;
}

const getVehiclePositionsForRouteStop = async (routeId: string, stopId: string) => {
    const response = await axiosInstance.post<VehiclePosition[]>('/stats/route/stop', {
        data: {
            "routeId": routeId,
            "stopId": stopId
        }
    });
    return response.data;
}

const scaleDelay = (vehiclePositions: VehiclePosition[]): VehiclePosition[] => {
    return vehiclePositions.map(vehiclePosition => {
        if (vehiclePosition.delay > 80000) {
            vehiclePosition.delay -= 86400;
        }
        if (vehiclePosition.delay < -80000) {
            vehiclePosition.delay += 86400;
        }
        return vehiclePosition;
    })
}

const API = {
    getStopsForBusCode: getStopsForBusCode,
    getRouteForBusCode: getRouteForBusCode,
    getVehiclePositionsForRoute: getVehiclePositionsForRoute,
    getVehiclePositionsForRouteStop: getVehiclePositionsForRouteStop,
};
export default API;