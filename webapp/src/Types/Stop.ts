type Stop = {
    feed_id: string,
    stop_id: string,
    parent_station_id: string,
    location_type: number,
    stop_name: string,
    stop_lat: number,
    stop_lon: number,
    wheelchair_boarding: number,
    stop_code: string,
    stop_desc: string | null,
    zone_id: string,
    stop_url: string,
    stop_timezone: null | string
}

export default Stop