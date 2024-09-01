import { useCurrentToken } from '@/redux/features/auth/authApi';
import { logOut, TUser } from '@/redux/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import verifyJwt from '@/utils/verifyJwt';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

type TProtectedRoute = {
  children: ReactNode;
  role: string | undefined;
}
const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const token = useAppSelector(useCurrentToken);


  let user;
  if(token){
    user = verifyJwt(token) as TUser;
  }


  const dispatch = useAppDispatch();

  if(role !== undefined && role !== user?.role){
    dispatch(logOut());
    return <Navigate to="/login" replace={true} />;
  }

  if (!token) {
    return <Navigate to="/login" replace={true} />;
  }

  return children;
};

export default ProtectedRoute;