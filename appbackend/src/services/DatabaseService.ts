import {routes, PrismaClient} from '@prisma/client'

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
}

export async function getAllBusCodes() {
    const busCodes: routes[] = await prisma.routes.findMany();
    return busCodes.map(busCode => {
        let route_id = busCode.route_id;
        route_id = route_id.substring(0, route_id.indexOf('-'));
        return route_id;
    })
}