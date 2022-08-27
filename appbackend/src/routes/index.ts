import { Router } from 'express';
import BusRouter from './Bus'
import StatsRouter from './RouteStatistics'

// Export the base-router
const baseRouter = Router();

// Setup routers
baseRouter.use('/bus', BusRouter);
baseRouter.use('/stats', StatsRouter);
// Export default.
export default baseRouter;
