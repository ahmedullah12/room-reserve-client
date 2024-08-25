import MyForm from "@/components/form/MyForm";
import MyInput from "@/components/form/MyInput";
import { Button } from "@/components/ui/button";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";

const Register = () => {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <div className="h-screen flex justify-center items-center bg-accent">
      <div className="w-full md:w-[500px] px-4">
        <div className="bg-white shadow-lg rounded-lg px-10 py-8">
          <h1 className="mb-6 font-semibold text-2xl text-primary">Create Account</h1>

          <MyForm onSubmit={onSubmit}>
            <MyInput name="name" type="text" label="Name" />
            <MyInput name="email" type="text" label="Email" />
            <MyInput name="phone" type="text" label="Phone Number" />
            <MyInput name="address" type="text" label="Address" />
            <MyInput name="password" type="password" label="Password" />
            <Button className="w-full mt-4 bg-primary hover:bg-primary-dark">Register</Button>
          </MyForm>

          <p className="text-center mt-6 text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
