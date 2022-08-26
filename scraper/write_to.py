from gtfslib.dao import Dao

DB_STRING = "postgresql://postgres:password@dubathon.cjilpjpquw6h.ap-southeast-2.rds.amazonaws.com:5432/gtfs"

dao = Dao(DB_STRING, sql_logging=True)
dao.load_gtfs("SEQ_GTFS.zip")