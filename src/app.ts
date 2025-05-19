import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import os from 'os';
import router from './app/routes';
import cookieParser from 'cookie-parser';
import globalErrorHandler from './app/utilities/globalErrorHandler';
import notFound from './app/utilities/notFound';

const app: Application = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  const currentDateTime = new Date().toISOString();
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const serverHostname = os.hostname();
  const serverPlatform = os.platform();
  const serverUptime = os.uptime();
  res.send({
    success: true,
    message: 'Welcome to Portfolio Server',
    version: '1.0.0',
    clientDetails: {
      ipAddress: clientIp,
      accessedAt: currentDateTime,
    },
    serverDetails: {
      hostname: serverHostname,
      platform: serverPlatform,
      uptime: `${Math.floor(serverUptime / 60 / 60)} hours ${Math.floor(
        (serverUptime / 60) % 60
      )} minutes`,
    },
    developerContact: {
      email: 
        'rajib5570@gmail.com'
    },
  });
});

// all routes
app.use('/', router);

// global error handler
app.use(globalErrorHandler);

// not found route handler
app.use(notFound);

export default app;
