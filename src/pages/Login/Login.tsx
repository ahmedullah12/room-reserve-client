import MyForm from "@/components/form/MyForm";
import MyInput from "@/components/form/MyInput";
import { Button } from "@/components/ui/button";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";

const Login = () => {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };
  return (
    <div className="h-screen flex justify-center items-center bg-accent">
      <div className="w-full md:w-[500px] px-4">
        <div className="bg-white rounded-lg px-10 py-5">
        <h1 className="mb-6 font-semibold text-2xl text-primary">Login</h1>

          <MyForm onSubmit={onSubmit}>
            <MyInput name="email" type="text" label="Email" />
            <MyInput name="password" type="password" label="Password" />
            <Button className="bg-primary">Login</Button>
          </MyForm>

          <p className="text-center mt-6 text-sm text-gray-500">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
