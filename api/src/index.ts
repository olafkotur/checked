import express from 'express'
// import { MongoService } from './services/mongo';
import { PingHandler } from './handlers/ping';

const PORT = process.env.PORT || 8080;
const app: express.Application = express();

async function main() {
  // await MongoService.connect();

  // Misc handlers
  app.get('/api/ping', PingHandler.getPingResponse);

  app.listen(PORT, () => console.log(`API listening on port ${PORT}`));

} main();