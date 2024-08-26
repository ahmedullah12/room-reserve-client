import MyForm from "@/components/form/MyForm";
import MyInput from "@/components/form/MyInput";
import { Button } from "@/components/ui/button";
import { useLoginUserMutation } from "@/redux/features/auth/authApi";
import { setUser, TUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hook";
import { TError } from "@/types/global";
import verifyJwt from "@/utils/verifyJwt";
import { useEffect } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  

  const [login, { error }] = useLoginUserMutation();
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const from = location?.state?.from?.pathname || "/";

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await login(data).unwrap();

      const userData = verifyJwt(res.data.accessToken) as TUser;
      dispatch(setUser({ user: userData, token: res.data.accessToken }));
      toast.success(res.message);
      navigate(from, { replace: true });

    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (error) {
      const err = error as TError;
      if (err.data) {
        toast.error(err.data.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  }, [error]);
  return (
    <div className="h-screen flex justify-center items-center bg-accent">
      <div className="w-full md:w-[500px] px-4">
        <div className="bg-white rounded-lg px-10 py-5">
          <h1 className="mb-6 font-semibold text-2xl text-primary">Login</h1>

          <MyForm onSubmit={onSubmit}>
            <MyInput name="email" type="text" label="Email" />
            <MyInput name="password" type="password" label="Password" />
            <Button type="submit" className="bg-primary">Login</Button>
          </MyForm>

          <p className="text-center mt-6 text-sm text-gray-500">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary font-medium underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
