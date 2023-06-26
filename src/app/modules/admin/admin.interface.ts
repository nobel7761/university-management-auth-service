import { Model, Types } from 'mongoose';
import { IAcademicDepartment } from '../academicDepartment/academicDepartment.interface';

export type UserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type IAdmin = {
  id: string;
  name: UserName; // embedded object
  gender: 'male' | 'female';
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  designation: string;
  profileImage?: string;
  academicDepartment: Types.ObjectId | IAcademicDepartment; // reference _id
};
export type AdminModel = Model<IAdmin, Record<string, unknown>>;

export type IAdminFilters = {
  searchTerm?: string;
  id?: string;
  gender?: string;
  email?: string;
  contactNo?: string;
  academicDepartment?: string;
  emergencyContactNo?: string;
};
