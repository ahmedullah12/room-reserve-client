import Advertisement from "./Advertisement";
import Banner from "./Banner";
import Rooms from "./Rooms";
import WhyChooseUs from "./WhyChooseUs";

const Home = () => {
  return (
    <div className="bg-[#FFFDF9]">
      <Banner />
      <Advertisement />
      <Rooms />
      <WhyChooseUs />
    </div>
  );
};

export default Home;
