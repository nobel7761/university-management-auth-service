import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterFacultyValidation } from './academicFaculty.validation';

const router = express.Router();

router.post(
  '/create-faculty',
  validateRequest(
    AcademicSemesterFacultyValidation.createAcademicFacultyZodSchema
  ),
  AcademicFacultyController.createFaculty
);

router.get('/:id', AcademicFacultyController.getFacultyById);

router.patch(
  '/:id',
  validateRequest(
    AcademicSemesterFacultyValidation.updateAcademicFacultyZodSchema
  ),
  AcademicFacultyController.updateFacultyById
);

router.delete('/:id', AcademicFacultyController.deleteFacultyById);

router.get('/', AcademicFacultyController.getAllFaculty);

export const AcademicFacultyRoutes = router;
