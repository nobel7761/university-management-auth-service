import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyValidation } from './faculty.validation';
import { FacultyController } from './faculty.controller';

const router = express.Router();

router.get('/:id', FacultyController.getFacultyById);
router.get('/', FacultyController.getAllFaculties);
router.delete('/:id', FacultyController.deleteFacultyById);

router.patch(
  '/:id',
  validateRequest(FacultyValidation.updateFacultyZodSchema),
  FacultyController.updateFacultyById
);

export const FacultyRoutes = router;
