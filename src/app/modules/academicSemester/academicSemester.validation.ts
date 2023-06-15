import { z } from 'zod';
import {
  academicSemesterCodes,
  academicSemesterMonths,
  academicSemesterTitles,
} from './academicSemester.constant';
//req-validation
//body --> object
//data --> object

const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    //! in zod enum works in a different way! we have to provide minimum 1 enum in a specific way!
    // const print = [...params] as [number, ...number]
    title: z.enum([...academicSemesterTitles] as [string, ...string[]], {
      required_error: 'Title is required.',
    }),
    year: z.number({
      required_error: 'Year is required.',
    }),
    code: z.enum([...academicSemesterCodes] as [string, ...string[]], {
      required_error: 'Code is required.',
    }),
    startMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
      required_error: 'Start Month is required',
    }),
    endMonth: z.enum([...academicSemesterMonths] as [string, ...string[]], {
      required_error: 'End Month is required',
    }),
  }),
});

export const AcademicSemesterValidation = { createAcademicSemesterZodSchema };
