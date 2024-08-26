import Footer from "@/components/layout/Footer";
import Advertisement from "./Advertisement";
import Banner from "./Banner";
import HowItWorks from "./HowItWorks";
import Rooms from "./Rooms";
import Testimonial from "./Testimonial";
import WhyChooseUs from "./WhyChooseUs";

const Home = () => {
  return (
    <div className="">
      <Banner />
      <Advertisement />
      <Rooms />
      <WhyChooseUs />
      <HowItWorks />
      <Testimonial />
      <Footer />
    </div>
  );
};

export default Home;
