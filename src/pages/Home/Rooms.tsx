import RoomCard from "@/components/RoomCard";
import { Button } from "@/components/ui/button";
import { BiRightArrowAlt } from "react-icons/bi";
import { Link } from "react-router-dom";


const rooms = [
  {
    name: 'Conference Room A',
    capacity: 10,
    price: 50,
    image: '/images/conference-room-a.jpg',
  },
  {
    name: 'Meeting Room B',
    capacity: 8,
    price: 40,
    image: '/images/meeting-room-b.jpg',
  },
  {
    name: 'Seminar Room C',
    capacity: 15,
    price: 75,
    image: '/images/seminar-room-c.jpg',
  },
  {
    name: 'Workshop Room D',
    capacity: 20,
    price: 100,
    image: '/images/workshop-room-d.jpg',
  },
];

const Rooms = () => {
  return (
    <section className=" py-20">
      <div className="lg:container mx-auto px-6 md:px-12">
        <h1 className="text-[32px] md:text-[40px] font-bold text-center text-primary mb-8">
          Featured Rooms
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {rooms.map((room, index) => (
            <RoomCard key={index} room={room} />
          ))}
        </div>
        <div className="flex justify-center mt-12">
          <Link to="/meeting-rooms">
          <Button className="bg-primary flex items-center gap-2 hover:bg-secondary">
            See More <BiRightArrowAlt size={22}/>
          </Button></Link>
        </div>
      </div>
    </section>
  );
};

export default Rooms;
