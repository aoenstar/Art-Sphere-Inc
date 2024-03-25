import express from 'express';
import routers from './src/routes/routers';

const app = express();
app.use(express.json());
// Inits routers listed in routers.ts file
routers.forEach((entry) => app.use(entry.prefix, entry.router));

export default app;
