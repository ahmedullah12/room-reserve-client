import MyForm from "@/components/form/MyForm";
import MyInput from "@/components/form/MyInput";
import { Button } from "@/components/ui/button";
import { useCurrentUser, useLoginUserMutation } from "@/redux/features/auth/authApi";
import { setUser, TUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { TError } from "@/types/global";
import verifyJwt from "@/utils/verifyJwt";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Login = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  const user = useAppSelector(useCurrentUser);
  const [login, { error, isLoading },] = useLoginUserMutation();
  const dispatch = useAppDispatch();


  const navigate = useNavigate();
  const location = useLocation();

  const from = location?.state?.from?.pathname || "/";

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      const res = await login(data).unwrap();
      console.log(res);

      if(res.success === true){
        const userData = verifyJwt(res.data.accessToken) as TUser;
        dispatch(setUser({ user: userData, token: res.data.accessToken }));
        toast.success(res.message);
        navigate(from, { replace: true });
        setIsSuccess(true)
      }
     
    } catch (err: any) {
      console.log(err);
    }
  };

  useEffect(() => {
    if(user){
      navigate("/")
    }
  }, [user, navigate])

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
    <div className="h-screen flex justify-center items-center bg-white  relative">
      <div className="absolute top-2 left-4">
        <Link to="/" className="flex items-center gap-2">
          <MdOutlineKeyboardBackspace color="#674188" className="mt-[2px]" size={30}/>
          <span className="text-xl text-primary font-semibold ">Back to Home</span>
        </Link>
      </div>
      <div className="w-full md:w-[500px] px-4">
        <div className="bg-[#F9F4F4] rounded-lg px-10 py-5 shadow-lg">
          <h1 className="mb-6 font-semibold text-2xl">Login</h1>

          <MyForm onSubmit={onSubmit} isSuccess={isSuccess}>
            <MyInput
              width="max-w-[300px]"
              name="email"
              type="text"
              label="Email"
            />
            <MyInput
              width="max-w-[300px]"
              name="password"
              type="password"
              label="Password"
            />
            <Button disabled={isLoading} type="submit" className="bg-primary">
              {
                isLoading ? "Loading..." : "Login"
              }
            </Button>
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
