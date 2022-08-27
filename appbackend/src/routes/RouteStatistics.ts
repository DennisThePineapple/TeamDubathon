import { Request, Response, Router } from 'express';
import {getRouteData, getRouteStopData, getStopsForBus} from "@services/DatabaseService";


const router = Router();


router.post('/route/stop', (req: Request, res: Response) => {
    const {routeId, stopId} = req.body.data;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    getRouteStopData(routeId, stopId).then(routeData => res.send(routeData));
});

router.get('/route/:routeId', (req: Request, res: Response) => {
    getRouteData(req.params.routeId).then(routeData => res.send(routeData));
});



export default router;
