import Advertisement from "./Advertisement";
import Banner from "./Banner";
import HowItWorks from "./HowItWorks";
import Rooms from "./Rooms";
import Testimonial from "./Testimonial";
import WhyChooseUs from "./WhyChooseUs";

const Home = () => {
  return (
    <div className="bg-[#FFFDF9]">
      <Banner />
      <Advertisement />
      <Rooms />
      <WhyChooseUs />
      <HowItWorks />
      <Testimonial />
    </div>
  );
};

export default Home;
