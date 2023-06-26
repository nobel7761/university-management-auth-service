/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose, { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { IAdmin, IAdminFilters } from './admin.interface';
import { adminFilterableFields } from './admin.constant';
import { Admin } from './admin.model';

const getAllAdmins = async (
  filters: IAdminFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAdmin[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      $or: adminFilterableFields.map(field => ({
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

  const result = await Admin.find(whereConditions)
    .populate('academicDepartment')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Admin.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getAdminById = async (id: string): Promise<IAdmin | null> => {
  const result = await Admin.findOne({ id: id }).populate('academicDepartment');
  return result;
};

const updateAdminById = async (
  id: string,
  payload: Partial<IAdmin>
): Promise<IAdmin | null> => {
  const isExist = await Admin.findOne({ id });

  if (!isExist) throw new ApiError(httpStatus.NOT_FOUND, 'Admin Not Found');

  const { name, ...adminData } = payload;
  const updatedAdminData: Partial<IAdmin> = { ...adminData };

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
      (updatedAdminData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await Admin.findOneAndUpdate({ id: id }, updatedAdminData, {
    new: true,
  }).populate('academicDepartment');
  return result;
};

const deleteAdminById = async (id: string): Promise<IAdmin | null> => {
  const isExist = await Admin.findOne({ id: id });

  if (!isExist) throw new ApiError(httpStatus.NOT_FOUND, 'Admin Not Found');

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // delete admin from admin collection
    const admin = await Admin.findOneAndDelete(
      { id: id },
      {
        session,
      }
    ).populate('academicDepartment');

    if (!admin) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Failed to delete admin');
    }

    //delete user from admin collection
    await User.findOneAndDelete(
      { id: id },
      {
        session,
      }
    );

    await session.commitTransaction();
    await session.endSession();

    return admin;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
};

export const AdminService = {
  getAllAdmins,
  getAdminById,
  updateAdminById,
  deleteAdminById,
};
