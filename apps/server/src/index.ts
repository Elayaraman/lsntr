import express from 'express';
import http from 'http';
import corsMiddleware from './middleware/cors';
import uploadRouter from './routes/upload';
import { initSocket } from './socket/index';

const app = express();
const server = http.createServer(app);

app.use(corsMiddleware);
app.use(express.json());

app.use('/api', uploadRouter);

app.get('/api/ping', (req, res) => {
  res.json({ status: 'ok' });
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});

initSocket(server);