import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { AuthService } from './auth.service';
// import config from '../../../config';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthService.loginUser(loginData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Logged In Successfully!',
    data: result,
  });
});

// const refreshToken = catchAsync(async (req: Request, res: Response) => {
//   const { refreshToken } = req.cookies;
//   const result = await AuthService.refreshToken(refreshToken);

//   const cookieOptions = {
//     secure: config.env === 'production',
//     httpOnly: true,
//   };

//   res.cookie('refreshToken', refreshToken, cookieOptions);

//   sendResponse<ILoginUserResponse>(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'User Logged In Successfully!',
//     data: result,
//   });
// });

export const AuthController = {
  loginUser,
  // refreshToken,
};
