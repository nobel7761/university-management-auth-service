import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';
import { ILoginUser, ILoginUserResponse } from './auth.interface';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';

const loginUser = async (
  payload: ILoginUser
): Promise<ILoginUserResponse | null> => {
  const { id, password } = payload;

  const isUserExist = await User.isUserExist(id);

  if (!isUserExist)
    throw new ApiError(httpStatus.NOT_FOUND, 'User Does Not Exists');

  if (
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist?.password))
  )
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password Does Not Match');

  // if user exists and password match then JWT will generate a token witch will be sent from server side to client side. client side will store this token in the browser(localstorage/cookies) so that when user try to login for the next(hit the url) time then user does not need to give id, password again(if the token does not expired) to login. Then we'll send this token with every single request and server will check the token. if the token is authorized then user can make request and then server will give the access through route(so we need to handle this from route level). otherwise user will get failed.

  // create access token & refresh token
  const { id: userId, role, needsPasswordChange } = isUserExist;

  const accessToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  };
};

export const AuthService = {
  loginUser,
};
