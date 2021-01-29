import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import validateRule from './controller/validate-rule';
import resolveValidations from './middlewares/resolveValidations';
import validations from './middlewares/validations';
const createServer = (): Application => {
  const app = express();

  // ======= Middlewares ======= //
  app.use(morgan('dev'));
  app.use(helmet());
  app.use(cors());
  app.use((req, res, next) => {
    return bodyParser.json()(req, res, (err) => {
      if (err) {
        return res.status(400).send({
          message: 'Invalid JSON payload passed.',
          status: 'error',
          data: null,
        });
      }
      return next();
    });
  });
  app.use(bodyParser.urlencoded({ extended: false }));

  // ======= Routes Inits ======= //
  app.get('/', (_, res) => {
    res.status(200).send({
      message: 'My Rule-Validation API',
      status: 'success',
      data: {
        name: 'Ikechukwu Orji',
        github: '@jojitoon',
        email: 'jojitoon@gmail.com',
        mobile: '09069787848',
        twitter: '@jojitoon1',
      },
    });
  });

  app.post('/validate-rule', validations, resolveValidations, validateRule);

  app.use('*', (req, res) =>
    res.status(404).send({
      message: 'route not found',
      status: 'error',
      data: null,
    })
  );
  return app;
};

export default createServer;
