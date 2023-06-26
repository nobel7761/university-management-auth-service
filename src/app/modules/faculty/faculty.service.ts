/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { IFaculty, IFacultyFilters } from './faculty.interface';
import { facultyFilterableFields } from './faculty.constant';
import { Faculty } from './faculty.model';

const getAllFaculties = async (
  filters: IFacultyFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IFaculty[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: facultyFilterableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  //making an object by which sorting will be retrieved!
  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Faculty.find(whereConditions)
    .populate('academicDepartment')
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Faculty.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getFacultyById = async (id: string): Promise<IFaculty | null> => {
  const result = await Faculty.findOne({ id: id })
    .populate('academicDepartment')
    .populate('academicFaculty');
  return result;
};

const updateFacultyById = async (
  id: string,
  payload: Partial<IFaculty>
): Promise<IFaculty | null> => {
  const isExist = await Faculty.findOne({ id });

  if (!isExist) throw new ApiError(httpStatus.NOT_FOUND, 'Faculty Not Found');

  const { name, ...facultyData } = payload;
  const updatedStudentData: Partial<IFaculty> = { ...facultyData };

  /* 
  const name = {
    firstName: "Rokaiah",
    lastName: "Sumaiah"
  }
  */

  //dynamically handling
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`; // `name.firstName || name.lastName`
      (updatedStudentData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await Faculty.findOneAndUpdate(
    { id: id },
    updatedStudentData,
    {
      new: true,
    }
  )
    .populate('academicDepartment')
    .populate('academicFaculty');
  return result;
};

const deleteFacultyById = async (id: string): Promise<IFaculty | null> => {
  const isExist = await Faculty.findOne({ id: id });

  if (!isExist) throw new ApiError(httpStatus.NOT_FOUND, 'Faculty Not Found');

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // delete faculty from faculty collection
    const faculty = await Faculty.findOneAndDelete(
      { id: id },
      {
        session,
      }
    )
      .populate('academicDepartment')
      .populate('academicFaculty');

    if (!faculty) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Failed to delete faculty');
    }

    //delete user from faculty collection
    await User.findOneAndDelete(
      { id: id },
      {
        session,
      }
    );

    await session.commitTransaction();
    await session.endSession();

    return faculty;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

export const FacultyService = {
  getAllFaculties,
  getFacultyById,
  updateFacultyById,
  deleteFacultyById,
};
