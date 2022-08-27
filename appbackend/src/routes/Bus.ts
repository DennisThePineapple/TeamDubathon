import { Request, Response, Router } from 'express';
import {getStopsForBus} from "@services/DatabaseService";


const router = Router();


router.get('/stops/:bus',(req: Request, res: Response) => {
    getStopsForBus(req.params.bus).then(busStops => res.send(busStops));
});

export default router;
