import { gender } from '../student/student.constant';
import { Schema, model } from 'mongoose';
import { AdminModel, IAdmin } from './admin.interface';

export const AdminSchema = new Schema<IAdmin, AdminModel>(
  {
    id: { type: String, required: true, unique: true },
    name: {
      required: true,
      type: {
        firstName: { type: String, required: true },
        middleName: { type: String },
        lastName: { type: String, required: true },
      },
    },
    dateOfBirth: { type: String },
    email: { type: String, unique: true, required: true },
    contactNo: { type: String, unique: true, required: true },
    emergencyContactNo: { type: String, required: true },
    gender: { type: String, enum: gender },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    bloodGroup: { type: String },
    managementDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'ManagementDepartment',
      required: true,
    },
    designation: { type: String, required: true },
    profileImage: { type: String /* required: true */ },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Admin = model<IAdmin, AdminModel>('Admin', AdminSchema);
