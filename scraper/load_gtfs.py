from gtfslib.dao import Dao

DB_STRING = "postgresql://postgres:password@dubathon.cjilpjpquw6h.ap-southeast-2.rds.amazonaws.com:5432/dubathon"

dao = Dao(DB_STRING, sql_logging=True)
dao.load_gtfs("C:/Users/Dennis/WebstormProjects/TeamDubathon/scraper/SEQ_GTFS.zip")
