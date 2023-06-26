import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AdminController } from './admin.controller';
import { AdminValidation } from './admin.validation';

const router = express.Router();

router.get('/:id', AdminController.getAdminById);
router.get('/', AdminController.getAllAdmins);
router.delete('/:id', AdminController.deleteAdminById);

router.patch(
  '/:id',
  validateRequest(AdminValidation.updateAdminZodSchema),
  AdminController.updateAdminById
);

export const AdminRoutes = router;
