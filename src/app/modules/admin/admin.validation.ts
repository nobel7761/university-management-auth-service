import { z } from 'zod';
import { gender } from '../student/student.constant';
//req-validation
//body --> object
//data --> object

const updateAdminZodSchema = z.object({
  body: z.object({
    name: z
      .object({
        firstName: z.string().optional(),
        middleName: z.string().optional(),
        lastName: z.string().optional(),
      })
      .optional(),
    gender: z.enum([...gender] as [string, ...string[]]).optional(),
    dateOfBirth: z.string().optional(),
    email: z.string().optional(),
    contactNo: z.string().optional(),
    emergencyContactNo: z.string().optional(),
    designation: z.string().optional(),
    profileImage: z.string().optional(),
    managementDepartment: z.string().optional(),
  }),
});

export const AdminValidation = { updateAdminZodSchema };
