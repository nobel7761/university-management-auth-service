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

router.get('/:id', AcademicFacultyController.getFacultyById);

router.patch(
  '/:id',
  validateRequest(AcademicSemesterFaculty.updateAcademicFacultyZodSchema),
  AcademicFacultyController.updateFacultyById
);

router.get('/', AcademicFacultyController.getAllFaculty);

export const AcademicFacultyRoutes = router;
