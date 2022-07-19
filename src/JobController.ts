import { Get, Route } from 'tsoa';
import { Service } from 'typedi';
import * as uuid from 'uuid';
import winston from 'winston';

@Service()
@Route('getjobdetails')
export default class JobController {
  private readonly _logger = winston.createLogger({
    transports: [new winston.transports.Console()]
  })

  @Get('/:id')
  public async getResourceIdByJobId(id: string) {
    let logMessage: string;
    try {
      if (!id) {
        this._logger.warn('Receving invalid value for job id');
        return null
      }

      this._logger.info(`Processing job request with Id '${id}'`);
      const secondDelay = Math.floor(Math.random() * 10) + 1;
      this._logger.info(`Waiting ${secondDelay} seconds to process request`)
      await new Promise((resolve) => {
        setTimeout(resolve, secondDelay * 1000);
      });

      return { jobId: uuid.v4() };
    }
    catch (error: any) {
      logMessage = `An error occured while processing the job detail request. \n${error}`;
      this._logger.error(logMessage);
      return null;
    }
  }
}