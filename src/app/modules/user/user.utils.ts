import { IAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

export const findLastStudentId = async (): Promise<string | undefined> => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    { id: 1, _id: 0 }
  ) //by default mongoDB return default mongoDB ID(_id). we are just enabling false to make sure that mongoDB will not return its own _id
    .sort({ createdAt: -1 })
    .lean(); //using lean just to return object instead of database document. It also increase the performance.

  return lastStudent?.id ? lastStudent?.id.substring(4) : undefined; //because I dont need 2501 from 25010001. this 2501 will be append in the next function
};

export const generateStudentId = async (
  academicSemester: IAcademicSemester | null
): Promise<string> => {
  const currentId =
    (await findLastStudentId()) || (0).toString().padStart(5, '0'); //for the first user of application, (0).toString().padStart(5, '0') will be executed and for others (await findLastUSerId()) will be executed => 00000

  //increment by 1
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');

  if (academicSemester) {
    incrementedId = `${academicSemester.year.substring(2)}${
      academicSemester.code
    }${incrementedId}`;
  }

  return incrementedId;
};

export const findLastFacultyId = async (): Promise<string | undefined> => {
  const lastFaculty = await User.findOne(
    {
      role: 'faculty',
    },
    { id: 1, _id: 0 }
  )
    .sort({ createdAt: -1 })
    .lean();

  return lastFaculty?.id ? lastFaculty?.id.substring(2) : undefined;
};

export const generateFacultyId = async (): Promise<string> => {
  const currentId =
    (await findLastFacultyId()) || (0).toString().padStart(5, '0');
  let incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  incrementedId = `F-${incrementedId}`;
  return incrementedId;
};
