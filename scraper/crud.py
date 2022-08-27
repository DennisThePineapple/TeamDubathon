from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, MetaData
from config import DB_STRING, VEHICLE_POSITIONS_URL
import gtfs_realtime_pb2
import urllib.request
import datetime
from tqdm import tqdm

QUERY_1 = "SELECT stop_times.arrival_time FROM stop_times WHERE stop_times.stop_id = '{}' AND stop_times.trip_id = '{}'"

def getStoppedVehiclePosition():
    feed = gtfs_realtime_pb2.FeedMessage()
    response = urllib.request.urlopen(VEHICLE_POSITIONS_URL)
    feed.ParseFromString(response.read())
    for entity in feed.entity:
        if entity.vehicle.current_status == 1:
            return entity.vehicle.stop_id,\
                entity.vehicle.trip.trip_id,\
                entity.vehicle.trip.route_id,\
                entity.vehicle.timestamp

def getExpectedArrivalTime(stopId, tripId, engine):
    with engine.connect() as con:
        rs = con.execute(QUERY_1.format(stopId, tripId))
        for r in rs:
            return r[0]

def extractHmsFromEpoch(epochTime):
    hmsString = datetime.datetime.fromtimestamp(epochTime).strftime('%H:%M:%S')
    h, m, s = hmsString.split(':')
    return int(h) * 3600 + int(m) * 60 + int(s)

if __name__ == "__main__":
    Base = automap_base()
    engine = create_engine(DB_STRING)
    Base.prepare(autoload_with=engine)

    StopTimes = Base.classes.stop_times
    VehiclePositions = Base.classes.vehicle_positions
    session = Session(engine)

    stopIdPrev, tripIdPrev, routeIdPrev = None, None, None

    count = 0
    for _ in tqdm(range(100)):
        stopId, tripId, routeId, actualArrival = getStoppedVehiclePosition()
        delayTime = extractHmsFromEpoch(actualArrival) - getExpectedArrivalTime(stopId, tripId, engine)

        if stopIdPrev == stopId and tripIdPrev == tripId and routeIdPrev == routeId:
            continue
        else:
            count += 1
            stopIdPrev, tripIdPrev, routeIdPrev = stopId, tripId, routeId

            session.add(VehiclePositions(stop_id=stopId, trip_id=tripId, route_id=routeId, time=actualArrival, delay=delayTime))
            session.commit()
            print(count)
