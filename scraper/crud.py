from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from config import DB_STRING, VEHICLE_POSITIONS_URL
from models import Base, VehiclePosition
import gtfs_realtime_pb2
import urllib.request
import datetime
import calendar
import math

QUERY_1 = "SELECT stop_times.arrival_time FROM stop_times WHERE stop_times.stop_id = '{}' AND stop_times.trip_id = '{}'"

def getStoppedVehiclePosition():
    feed = gtfs_realtime_pb2.FeedMessage()
    response = urllib.request.urlopen(VEHICLE_POSITIONS_URL)
    feed.ParseFromString(response.read())
    for entity in feed.entity:
        if entity.vehicle.current_status == 1:
            print(entity)
            return entity.vehicle.stop_id,\
                entity.vehicle.trip.trip_id,\
                entity.vehicle.trip.route_id,\
                entity.vehicle.timestamp

def getExpectedArrivalTime(stopId, tripId, engine):
    with engine.connect() as con:
        rs = con.execute(QUERY_1.format(stopId, tripId))
        for r in rs:
            return r[0]

def secondsToEpoch(sec):
    hours = math.floor((sec / 3600))
    minutes = math.floor((sec % 3600) / 60)
    seconds = math.floor(((sec % 3600) % 60))
    dt = datetime.strptime("{}:{}:{}".format(hours,minutes,seconds), "%H:%M:%S")
    dt_now = datetime.now()
    dt = dt.replace(year=dt_now.year, month=dt_now.month, day=dt_now.day)
    return calendar.timegm(dt.utctimetuple())

# def insertRow(actualTime, expectedTime):
#     delay = actualTime - expectedTime
#     vehiclePosition = VehiclePosition(stop_id, trip_id, route_id, time, delay_time)
#     s.add(vehiclePosition)
#     s.commit()


if __name__ == "__main__":
    Base = automap_base()
    engine = create_engine(DB_STRING)
    Base.prepare(autoload_with=engine)

    StopTimes = Base.classes.stop_times
    session = Session(engine)

    stopId, tripId, routeId, actualArrival = getStoppedVehiclePosition()
    expectedArrival = getExpectedArrivalTime(stopId, tripId, engine)   
    print(actualArrival)
    print(expectedArrival)
    print(type(datetime.timedelta(seconds=expectedArrival)))
    print()

    # print(datetime.utcfromtimestamp(expectedArrival).strftime('%H:%M:%S'))
    # print(datetime.utcfromtimestamp(actualArrival).strftime('%H:%M:%S'))
    