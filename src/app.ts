import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import routes from './app/routes';
import httpStatus from 'http-status';
import { generateStudentId } from './app/modules/user/user.utils';

const app: Application = express();

app.use(cors());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//application routes
app.use('/api/v1', routes);

//global error handler
app.use(globalErrorHandler);

//handle not found route
app.use((req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
});

const academicSemester = {
  year: '2025',
  code: '01',
};

const testID = async () => {
  const id = await generateStudentId(academicSemester);
  console.log(id);
};

testID();

export default app;
