import { bloodGroup, gender } from '../student/student.constant';
import { FacultyModel, IFaculty } from './faculty.interface';
import { Schema, model } from 'mongoose';

export const FacultySchema = new Schema<IFaculty, FacultyModel>(
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
    gender: { type: String, enum: gender },
    dateOfBirth: { type: String },
    email: { type: String, unique: true, required: true },
    contactNo: { type: String, unique: true, required: true },
    emergencyContactNo: { type: String, required: true },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    bloodGroup: { type: String, enum: bloodGroup },
    designation: { type: String, required: true },
    profileImage: { type: String /* required: true */ },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
      required: true,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Faculty = model<IFaculty, FacultyModel>('Faculty', FacultySchema);
