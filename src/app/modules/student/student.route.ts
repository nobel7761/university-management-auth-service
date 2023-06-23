import express from 'express';
import { StudentController } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { StudentValidation } from './student.validation';

const router = express.Router();

router.get('/:id', StudentController.getStudentById);
router.get('/', StudentController.getAllStudents);
router.delete('/:id', StudentController.deleteStudentById);

router.patch(
  '/:id',
  validateRequest(StudentValidation.updateStudentZodSchema),
  StudentController.updateStudentById
);

export const StudentRoutes = router;
