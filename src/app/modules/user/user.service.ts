import { IStudent } from './../student/student.interface';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import mongoose from 'mongoose';
import { Student } from '../student/student.model';
import httpStatus from 'http-status';

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
  user.role = 'student';

  const academicSemester = await AcademicSemester.findById(
    student.academicSemester
  );

  const session = await mongoose.startSession();
  let newUserAllData = null;

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

export const UserService = {
  createStudent,
};
