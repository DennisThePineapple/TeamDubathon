from unicodedata import name
import gtfs_realtime_pb2
import urllib.request
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String

DATABASE_URI = "postgresql://postgres:password@dubathon.cjilpjpquw6h.ap-southeast-2.rds.amazonaws.com:5432/dubathon?schema=public"

Base = declarative_base()

class VehiclePositions(Base):
    __tablename__ = 'vehicle_positions'
    stop_id = Column(String)
    trip_id = Column(String)
    route_id = Column(String)
    time = Column(Integer)
    delay = Column(Integer)

if __name__ == "__main__":
    tripUpdates = "https://gtfsrt.api.translink.com.au/api/realtime/SEQ/TripUpdates"
    vehiclePositions = "https://gtfsrt.api.translink.com.au/api/realtime/SEQ/VehiclePositions"
    alerts = "https://gtfsrt.api.translink.com.au/api/realtime/SEQ/alerts"

    feed = gtfs_realtime_pb2.FeedMessage()
    response = urllib.request.urlopen(vehiclePositions)
    feed.ParseFromString(response.read())
    for entity in feed.entity:
        print(entity)
        break