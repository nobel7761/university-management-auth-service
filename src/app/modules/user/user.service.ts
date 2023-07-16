import { IStudent } from './../student/student.interface';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import { User } from './user.model';
import {
  generateAdminId,
  generateFacultyId,
  generateStudentId,
} from './user.utils';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import mongoose from 'mongoose';
import { Student } from '../student/student.model';
import httpStatus from 'http-status';
import { Faculty } from '../faculty/faculty.model';
import { IFaculty } from '../faculty/faculty.interface';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { Admin } from '../admin/admin.model';
import { IAdmin } from '../admin/admin.interface';

const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  /*   //!auto generated incremental id
  const id = await generateFacultyId();
  user.id = id; //we have to set the id into the user object */

  //!default password. because, once the id was generated from the admin for a student there will be a default password!
  if (!user.password) {
    user.password = config.default_student_pass as string; //we have to set the password into the user object
  }

  //!set role
  user.role = ENUM_USER_ROLE.STUDENT;

  const academicSemester = await AcademicSemester.findById(
    student.academicSemester
  );

  let newUserAllData = null;
  const session = await mongoose.startSession();

  try {
    //!start session
    session.startTransaction();

    //!database opeartion

    //generate student id
    const id = await generateStudentId(academicSemester);
    user.id = id;
    student.id = id;

    //create new student
    const newStudent = await Student.create([student], { session }); //we used [] because of transaction, so newStudent will also an array
    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }

    //create user
    //set _id(student) into user.student
    user.student = newStudent[0]._id;
    const newUser = await User.create([user], { session });
    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    newUserAllData = newUser[0];
    //!Commit session
    await session.commitTransaction();
    //!end session
    await session.endSession();
  } catch (error) {
    //!abort transaction
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }

  //user --> student --> {academicSemester, academicDepartment, academicFaculty}
  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }

  return newUserAllData;
};

const createFaculty = async (
  faculty: IFaculty,
  user: IUser
): Promise<IUser | null> => {
  //!default password. because, once the id was generated from the admin for a student there will be a default password!
  if (!user.password) {
    user.password = config.default_faculty_pass as string; //we have to set the password into the user object
  }

  //!set role
  user.role = ENUM_USER_ROLE.FACULTY;

  let newUserAllData = null;
  const session = await mongoose.startSession();

  try {
    //!start session
    session.startTransaction();

    //!database opeartion

    //generate faculty id
    const id = await generateFacultyId();
    user.id = id;
    faculty.id = id;

    //create new Faculty
    const newFaculty = await Faculty.create([faculty], { session }); //we used [] because of transaction, so newStudent will also an array
    if (!newFaculty.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    }

    //create user
    //set _id(faculty) into user.faculty
    user.faculty = newFaculty[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    newUserAllData = newUser[0];

    //!Commit session
    await session.commitTransaction();

    //!end session
    await session.endSession();
  } catch (error) {
    //!abort transaction
    await session.abortTransaction();

    await session.endSession();

    throw error;
  }

  //user --> faculty --> {academicDepartment, academicFaculty}
  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'faculty',
      populate: [
        {
          path: 'academicDepartment',
        },
        {
          path: 'academicFaculty',
        },
      ],
    });
  }

  return newUserAllData;
};

const createAdmin = async (
  admin: IAdmin,
  user: IUser
): Promise<IUser | null> => {
  //!default password. because, once the id was generated from the admin for a student there will be a default password!
  if (!user.password) {
    user.password = config.default_admin_pass as string; //we have to set the password into the user object
  }

  //!set role
  user.role = ENUM_USER_ROLE.ADMIN;

  let newUserAllData = null;
  const session = await mongoose.startSession();

  try {
    //!start session
    session.startTransaction();

    //!database opeartion

    //generate admin id
    const id = await generateAdminId();
    user.id = id;
    admin.id = id;

    //create new admin
    const newAdmin = await Admin.create([admin], { session }); //we used [] because of transaction, so newStudent will also an array
    if (!newAdmin.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    }

    //create user
    //set _id(admin) into user.admin
    user.admin = newAdmin[0]._id;

    const newUser = await User.create([user], { session });

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    newUserAllData = newUser[0];

    //!Commit session
    await session.commitTransaction();

    //!end session
    await session.endSession();
  } catch (error) {
    //!abort transaction
    await session.abortTransaction();

    await session.endSession();

    throw error;
  }

  //user --> admin --> {academicDepartment}
  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'admin',
      populate: [
        {
          path: 'managementDepartment',
        },
      ],
    });
  }

  return newUserAllData;
};

export const UserService = {
  createStudent,
  createFaculty,
  createAdmin,
};
