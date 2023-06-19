import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterFaculty } from './academicFaculty.validation';

const router = express.Router();

router.post(
  '/create-faculty',
  validateRequest(AcademicSemesterFaculty.createAcademicFacultyZodSchema),
  AcademicFacultyController.createFaculty
);

export const AcademicFacultyRoutes = router;
