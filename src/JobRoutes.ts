import 'reflect-metadata';
import express, { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Container from 'typedi';
import JobController from './JobController';
import winston from 'winston';

const jobController = Container.get(JobController);
export const jobRoutes = express();
jobRoutes.use(express.urlencoded({ extended: true }));

const _logger = winston.createLogger({
  transports: [ new winston.transports.Console()]
})

jobRoutes.get('/getjobdetails/:id/', async (req: Request, res: Response) => {
  if (!req?.params?.id) {
    const message = 'Received invalid value for job details Id.';
    _logger.warn(message);
    res.status(StatusCodes.BAD_REQUEST).send(message);
    return;
  }

  try {
    const id = req.params.id;
    const results = await jobController.getResourceIdByJobId(id);

    if (!results) {
      const message = `Something went wrong retrieving resource id for job id ${id}. Check servier logs for more details`;
      _logger.warn(message);
      res.status(StatusCodes.NOT_FOUND).send(message);
      return;
    }

    res.status(StatusCodes.OK).send(results);
  } catch (error: any) {
    const message = `Something went wrong retrieving resourceId \n ${error}`;
    _logger.error(message);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
  }
});