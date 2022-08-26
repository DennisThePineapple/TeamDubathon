/*
  Warnings:

  - You are about to drop the `Bus` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Bus";

-- CreateTable
CREATE TABLE "Route" (
    "id" VARCHAR(255) NOT NULL,
    "route_short_name" VARCHAR(255) NOT NULL,
    "route_desc" VARCHAR(255) NOT NULL,
    "route_long_name" VARCHAR(255) NOT NULL,
    "route_type" VARCHAR(255) NOT NULL,
    "route_url" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Route_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Stop" (
    "id" VARCHAR(255) NOT NULL,
    "stop_code" VARCHAR(255) NOT NULL,
    "stop_name" VARCHAR(255) NOT NULL,
    "stop_desc" VARCHAR(255) NOT NULL,
    "stop_lat" VARCHAR(255) NOT NULL,
    "stop_lon" VARCHAR(255) NOT NULL,
    "zone_id" VARCHAR(255) NOT NULL,
    "stop_url" VARCHAR(255) NOT NULL,
    "location_type" VARCHAR(255) NOT NULL,
    "parent_station" VARCHAR(255) NOT NULL,
    "platform_code" VARCHAR(255) NOT NULL,

    CONSTRAINT "Stop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trip" (
    "id" VARCHAR(255) NOT NULL,
    "service_id" VARCHAR(255) NOT NULL,
    "trip_headsign" VARCHAR(255) NOT NULL,
    "direction_id" VARCHAR(255) NOT NULL,
    "route_id" VARCHAR(255) NOT NULL,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StopTime" (
    "id" SERIAL NOT NULL,
    "arrival_time" VARCHAR(255) NOT NULL,
    "departure_time" VARCHAR(255) NOT NULL,
    "direction_id" VARCHAR(255) NOT NULL,
    "stop_sequence" VARCHAR(255) NOT NULL,
    "pickup_type" VARCHAR(255) NOT NULL,
    "drop_off_type" VARCHAR(255) NOT NULL,
    "stop_id" VARCHAR(255) NOT NULL,
    "trip_id" VARCHAR(255) NOT NULL,

    CONSTRAINT "StopTime_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_route_id_fkey" FOREIGN KEY ("route_id") REFERENCES "Route"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StopTime" ADD CONSTRAINT "StopTime_stop_id_fkey" FOREIGN KEY ("stop_id") REFERENCES "Stop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StopTime" ADD CONSTRAINT "StopTime_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "Trip"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
