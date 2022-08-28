# TeamDubathon

Translink historical data aggregator  + face spinner

## How to launch webapp

1. `cd` into /webapp
2. `npm install`
3. `npm start`


## How to Launch Webserver

1. `cd` into /appbackend
2. `npm install` install your dependencies
3. `npx prisma db pull` pull down GTFS schema
4. `npx prisma generate` generate the prisma client files
5. `npm start:dev` start on localhost:3000 or `npx nodemon` on mac