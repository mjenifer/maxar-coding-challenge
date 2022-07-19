import 'reflect-metadata';
import express, { Application } from 'express';
import * as http from 'http';
import morgan from 'morgan';
import { jobRoutes } from './JobRoutes';
import winston from 'winston';

const serviceName = 'Job Request Processor';
const _logger = winston.createLogger({
  transports: [ new winston.transports.Console()]
})
export class ProgramEntryPoint {
  public async main(): Promise<void> {
    try {
      _logger.info(`Attempting to start ${serviceName}`)
      return this.run();
    } catch (error: any) {
      _logger.info(`An error occured while starting ${serviceName}\n${JSON.stringify(error)}`);
      return this.shutdown();
    }
  }

  private run(): Promise<void> {
    try {
      const app: Application = express();

      app.use(express.json());
      app.use(morgan('tiny'));
      app.use(express.static('public'));

      const httpPort = 5000;
      app.use(jobRoutes);

      app.disable('etag');
      http.createServer(app).listen(httpPort, () => console.log(`HTTP server is running on port: ${httpPort}`));

      return Promise.resolve();
    } catch (error: any) {
      _logger.error(error);
      return Promise.reject();
    }
  }

  public async shutdown(): Promise<void> {
    process.exit(1);
  }
}

new ProgramEntryPoint().main().catch(error => {
  console.error(error);
  process.exit(0);
});
