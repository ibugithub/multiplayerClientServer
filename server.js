import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import { PORT, CLIENT_BASE_URL} from './config/env.js';
import cors from 'cors';
import { setHeaders } from './middlewares/headers.js';
import {socketController} from './controllers/socketController.js'

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: CLIENT_BASE_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to parse JSON bodies
app.use(express.json());

// Configure CORS to allow requests from http://localhost:3000
app.use(cors({
  origin: CLIENT_BASE_URL,
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true,
}));

// Middleware to set Cross-Origin Headers
app.use(setHeaders);

// Serve the game folder as static files
app.get('/', (req, res) => {
  res.send('Hello');
});



socketController(io)

app.use((req, res, next) => {
  req.io = io;
  next();
});

server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
