import { z } from 'zod';
import { bloodGroup, gender } from '../student/student.constant';
//req-validation
//body --> object
//data --> object

const createUserZodSchema = z.object({
  body: z.object({
    password: z.string().optional(),
    student: z.object({
      name: z.object({
        firstName: z.string({ required_error: 'First Name is required' }),
        middleName: z.string().optional(),
        lastName: z.string({ required_error: 'Last Name is required' }),
      }),
      dateOfBirth: z.string({ required_error: 'Date of Birth is required' }),
      // gender: z.string({ required_error: 'Gender is required' }),
      gender: z.enum([...gender] as [string, ...string[]], {
        required_error: 'Gender is required',
      }),
      bloodGroup: z
        .enum([...bloodGroup] as [string, ...string[]], {
          required_error: 'Blood Group is required',
        })
        .optional(),
      email: z.string({ required_error: 'Email is required' }),
      contactNo: z.string({ required_error: 'Contact Number is required' }),
      emergencyContactNo: z.string({
        required_error: 'Emergency Contact Number is required',
      }),
      presentAddress: z.string({
        required_error: 'Present Address is required',
      }),
      permanentAddress: z.string({
        required_error: 'Permanent Address is required',
      }),
      guardian: z.object({
        fatherName: z.string({ required_error: 'Father Name is required' }),
        fatherOccupation: z.string({
          required_error: 'Father Occupation is required',
        }),
        fatherContactNo: z.string({
          required_error: 'Father Contact Number is required',
        }),
        motherName: z.string({ required_error: 'Mother Name is required' }),
        motherOccupation: z.string({
          required_error: 'Mother Occupation is required',
        }),
        motherContactNo: z.string({
          required_error: 'Mother Contact Number is required',
        }),
        address: z.string({ required_error: 'Address is required' }),
      }),
      localGuardian: z.object({
        name: z.string({ required_error: 'Local Guardian Name is required' }),
        occupation: z.string({
          required_error: 'Local Guardian Occupation is required',
        }),
        contactNo: z.string({
          required_error: 'Local Guardian Contact Number is required',
        }),
        address: z.string({
          required_error: 'Local Guardian Address is required',
        }),
      }),
      profileImage: z.string().optional(),
      academicFaculty: z.string({
        required_error: 'Academic Faculty is required',
      }),
      academicDepartment: z.string({
        required_error: 'Academic Department is required',
      }),
      academicSemester: z.string({
        required_error: 'Academic Semester is required',
      }),
    }),
  }),
});

export const userValidation = { createUserZodSchema };
