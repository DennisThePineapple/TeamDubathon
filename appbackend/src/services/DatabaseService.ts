import {PrismaClient, routes, stops} from '@prisma/client'

const prisma = new PrismaClient();

export async function getRoute(id: string) {
    const route = await prisma.routes.findFirst({
        where: {
            route_id: id
        }
    });
}

export async function getStop(id: string) {
    const stop = await prisma.stops.findFirst({
        where: {
            stop_id: id
        }
    });
}

export async function getTrip(id: string) {
    const trip = await prisma.trips.findFirst({
        where: {
            trip_id: id
        }
    });
}

export async function getStopsForBus(bus: string) {
    const route = await prisma.routes.findFirst({
        where: {
            route_id: {
                startsWith: bus
            }
        }
    })

    const trip = await prisma.trips.findFirst({
        where: {
            route_id: route?.route_id
        }
    })

    const stopTimes = await prisma.stop_times.findMany(
        {
            where: {
                trip_id: trip?.trip_id
            }
        }
    )

    const sortedStopTimes = stopTimes.sort(
        (a,b) =>
            (a.arrival_time && b.arrival_time) ? (a.arrival_time-b.arrival_time) : 0
    ).map(stopTime => stopTime.stop_id);


    const stops = await prisma.stops.findMany({
        where: {
            stop_id: {
                in: stopTimes.map(stopTime => stopTime.stop_id)
            }
        }
    });
    const sortedStops: stops[] = [];
    sortedStopTimes.forEach(id => {
        const stop = stops.find(stop => stop.stop_id == id);
        if (stop) {
            sortedStops.push(stop);
        }
    })

    return sortedStops
}

export async function getAllBusCodes() {
    const busCodes: routes[] = await prisma.routes.findMany();
    return busCodes.map(busCode => {
        let route_id = busCode.route_id;
        route_id = route_id.substring(0, route_id.indexOf('-'));
        return route_id;
    })
}