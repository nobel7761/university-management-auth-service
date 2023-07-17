import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { AuthService } from './auth.service';
import { ILoginUserResponse } from './auth.interface';
import config from '../../../config';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthService.loginUser(loginData);

  const { refreshToken, ...others } = result as ILoginUserResponse;

  // set refresh token into cookie
  const cookieOptions = {
    secure: config.env === 'production' ? true : false,
    httpOnly: true, // to make sure that this cookie won't be accessible from client side
  };
  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Logged In Successfully!',
    data: others,
  });
});

export const AuthController = {
  loginUser,
};
