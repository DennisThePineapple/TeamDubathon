import app from '@server';
import logger from 'jet-logger';


// Start the server
const port = Number(process.env.PORT || 8081);
app.listen(port, () => {
    logger.info('Express server started on port: ' + port);
});
