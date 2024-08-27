import { Link } from "react-router-dom";
import image from "../../assets/404.png";
import { useAppSelector } from "@/redux/hook";
import { useCurrentUser } from "@/redux/features/auth/authApi";

const ErrorPage = () => {
  const user = useAppSelector(useCurrentUser);
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="w-full md:w-[60%] flex flex-col md:flex-row justify-center items-center gap-20">
        <div>
          <img width="300px" src={image} alt="" />
        </div>
        <div className="w-full md:w-1/2 text-center ">
          <h3 className="text-[40px] md:text-[50px] text-primary font-bold">
            404
          </h3>
          <p className="text-xl md:text-2xl">
            {" "}
            Oops! The page you are looking for doesn't exist.
          </p>
          <div className="mt-6 space-x-4">
            <Link className="px-3 py-2 bg-primary text-white rounded-lg" to="/">
              Back to Home
            </Link>
            {!user && (
              <Link
                className="px-3 py-2 bg-primary text-white rounded-lg"
                to="/login"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
