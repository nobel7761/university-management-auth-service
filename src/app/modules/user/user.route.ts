import express from 'express';
import { UserController } from './user.controller';
import { userValidation } from './user.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

// create student
router.post(
  '/create-student',
  validateRequest(userValidation.createStudentZodSchema),
  UserController.createStudent
);

// create faculty
router.post(
  '/create-faculty',
  validateRequest(userValidation.createFacultyZodSchema),
  UserController.createFaculty
);

// create admin
router.post(
  '/create-admin',
  validateRequest(userValidation.createAdminZodSchema),
  UserController.createAdmin
);

export const UserRoutes = router;
