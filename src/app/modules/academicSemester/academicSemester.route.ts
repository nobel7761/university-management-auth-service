import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';
import { AcademicSemesterController } from './academicSemester.controller';

const router = express.Router();

router.post(
  '/create-semester',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicSemesterController.createSemester
);

router.get('/', AcademicSemesterController.getAllSemesters);
router.get('/:id', AcademicSemesterController.getSingleSemester);

// Ensure 1: Route Level: Update -> give me title and code both, neither
// Ensure 2: Service Level: Update -> Mapping title: code
router.patch(
  '/:id',
  validateRequest(AcademicSemesterValidation.updateAcademicSemesterZodSchema),
  AcademicSemesterController.updateSemester
);

export const AcademicSemesterRoutes = router;
