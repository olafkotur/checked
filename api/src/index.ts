import express from 'express'
import { MongoService } from './services/mongo';
import { MiscHandler } from './handlers/misc';

const PORT = process.env.PORT || 8080;
const app: express.Application = express();

async function main() {
  await MongoService.connect();

  // Misc handlers
  app.get('/api/ping', MiscHandler.getPingResponse);
  app.get('/api/docs', MiscHandler.getDocumentation);

  app.listen(PORT, () => console.log(`API listening on port ${PORT}`));

} main();