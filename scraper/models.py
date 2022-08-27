from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String

Base = declarative_base()

class VehiclePosition(Base):
    __tablename__ = 'vehicle_positions'
    stop_id = Column(String, primary_key=True)
    trip_id = Column(String, primary_key=True)
    route_id = Column(String, primary_key=True)
    time = Column(Integer)
    delay = Column(Integer)

    def __repr__(self):
        return "<VehiclePosition(stop_id='{}', trip_id='{}', route_id={}, time={}, delay={})>"\
                .format(self.stop_id, self.trip_id, self.route_id, self.time, self.delay)
