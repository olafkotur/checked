import express from 'express';
import bodyParser from 'body-parser';
import { MongoService } from './services/mongo';
import { LiveHandler } from './handlers/live';
import { MiscHandler } from './handlers/misc';

const PORT = process.env.PORT || 8080;
const app: express.Application = express();

async function main() {
  await MongoService.connect();

  app.use(bodyParser.urlencoded({
    extended: true
  }));

  // Live handlers
  app.post('/api/live/upload', LiveHandler.uploadLiveData);
  app.get('/api/live/:type', LiveHandler.getLiveData);

  // Misc handlers
  app.get('/api/ping', MiscHandler.getPingResponse);
  app.get('/api/docs', MiscHandler.getDocumentation);

  app.listen(PORT, () => console.log(`API listening on port ${PORT}`));

} main();