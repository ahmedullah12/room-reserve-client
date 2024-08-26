import { Button } from "@/components/ui/button";
import { BiRightArrowAlt } from "react-icons/bi";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="bg-accent">
      <div className="w-full lg:w-[90%] lg:mx-auto px-6 pt-[64px] pb-10 md:px-12 md:py-[100px]  lg:py-[150px]">
        <div className="w-[320px] md:w-[680px] mx-auto">
          <div>
            <h2 className="text-[32px] md:text-[50px] text-primary font-bold text-center leading-10 md:leading-[60px]">
              Book Your Ideal Meeting Room with Ease.
            </h2>
          </div>
          <div>
            <p className="text-lg text-gray-600 text-center my-6">
              Efficient, hassle-free room booking for all your meeting needs.
            </p>
          </div>
          <div className="w-full flex flex-col md:flex-row justify-center gap-3">
            <Button  className="bg-primary  hover:bg-secondary">
            <Link to="/meeting-rooms" className="flex items-center gap-1">
              Book Now{" "}
              <span className="mt-[2px]">
                <BiRightArrowAlt size={24} />
              </span>{" "}
            </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
