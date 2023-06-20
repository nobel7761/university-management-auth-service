import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

export const findLastStudentId = async () => {
  const lastUser = await User.findOne({}, { id: 1, _id: 0 }) //by default mongoDB return default mongoDB ID(_id). we are just enabling false to make sure that mongoDB will not return its own _id
    .sort({ createdAt: -1 })
    .lean(); //using lean just to return object instead of database document. It also increase the performance.

  return lastUser?.id;
};

export const generateStudentId = async (
  academicSemester: IAcademicSemester
) => {
  const currentId =
    (await findLastStudentId()) || (0).toString().padStart(5, '0'); //for the first user of application, (0).toString().padStart(5, '0') will be executed and for others (await findLastUSerId()) will be executed => 00000

  //increment by 1
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');

  incrementedId = `${academicSemester.year.substring(2)}${
    academicSemester.code
  }${incrementedId}`;

  return incrementedId;
};
