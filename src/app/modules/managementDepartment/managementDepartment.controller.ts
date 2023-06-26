import httpStatus from 'http-status';
import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { IManagementDepartment } from './managementDepartment.interface';
import { managementDepartmentFilterableFields } from './managementDepartment.constant';
import { ManagementDepartmentService } from './managementDepartment.service';

const createManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { ...managementDepartmentData } = req.body;
    const result = await ManagementDepartmentService.createManagementDepartment(
      managementDepartmentData
    );

    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management Department created successfully',
      data: result,
    });
  }
);

const getAllManagementDepartments = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, managementDepartmentFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result =
      await ManagementDepartmentService.getAllManagementDepartments(
        filters,
        paginationOptions
      );

    sendResponse<IManagementDepartment[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management Department List Retrieved Successfully',
      meta: result.meta,
      data: result.data,
    });
  }
);

const getManagementDepartmentById = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result =
      await ManagementDepartmentService.getManagementDepartmentById(id);

    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management Department Retrieved successfully',
      data: result,
    });
  }
);

const updateManagementDepartmentById = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedData = req.body;
    const result =
      await ManagementDepartmentService.updateManagementDepartmentById(
        id,
        updatedData
      );

    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management Department updated successfully',
      data: result,
    });
  }
);

const deleteManagementDepartmentById = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result =
      await ManagementDepartmentService.deleteManagementDepartmentById(id);

    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management Department deleted successfully',
      data: result,
    });
  }
);

export const ManagementDepartmentController = {
  createManagementDepartment,
  getAllManagementDepartments,
  getManagementDepartmentById,
  updateManagementDepartmentById,
  deleteManagementDepartmentById,
};
