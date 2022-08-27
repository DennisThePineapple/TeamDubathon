import { Request, Response, Router } from 'express';
import {getRouteFromBus, getStopsForBus} from "@services/DatabaseService";


const router = Router();

router.get('/route/:bus',(req: Request, res: Response) => {
    getRouteFromBus(req.params.bus).then(route => res.send(route));
});

router.get('/stops/:bus',(req: Request, res: Response) => {
    getStopsForBus(req.params.bus).then(busStops => res.send(busStops));
});

export default router;
