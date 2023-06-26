import { Model, Types } from 'mongoose';
import { IManagementDepartment } from '../managementDepartment/managementDepartment.interface';

export type UserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type IAdmin = {
  id: string;
  name: UserName; // embedded object
  dateOfBirth: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  gender: 'male' | 'female';
  permanentAddress: string;
  presentAddress: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B' | 'O+' | 'O-' | 'AB+' | 'AB-';
  managementDepartment: Types.ObjectId | IManagementDepartment;
  designation: string;
  profileImage?: string;
};
export type AdminModel = Model<IAdmin, Record<string, unknown>>;

export type IAdminFilters = {
  searchTerm?: string;
  id?: string;
  gender?: string;
  email?: string;
  contactNo?: string;
  managementDepartment?: string;
  emergencyContactNo?: string;
};
