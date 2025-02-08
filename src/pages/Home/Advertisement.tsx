import {
  FaClock,
  FaCheckCircle,
  FaCalendarAlt,
  FaHeadset,
} from "react-icons/fa";
import { motion } from "framer-motion";

const services = [
  {
    title: "Real-Time Availability",
    desc: "Book rooms instantly with real-time availability updates.",
    icon: <FaClock className="text-primary text-3xl mb-4" />,
  },
  {
    title: "Instant Booking Confirmation",
    desc: "Get instant confirmation on your bookings with zero delays.",
    icon: <FaCheckCircle className="text-primary text-3xl mb-4" />,
  },
  {
    title: "Flexible Scheduling",
    desc: "Easily schedule and reschedule your bookings as per your needs.",
    icon: <FaCalendarAlt className="text-primary text-3xl mb-4" />,
  },
  {
    title: "24/7 Support",
    desc: "Our support team is available round the clock to assist you.",
    icon: <FaHeadset className="text-primary text-3xl mb-4" />,
  },
];

const Advertisement = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ bounce: 0.5, duration: 1 }}
      viewport={{ once: true }}
      className=" py-20"
    >
      <div className="lg:container mx-auto px-6 md:px-12">
        <h2 className="text-[28px] md:text-[36px] text- font-medium text-center mb-2">
          Our Services
        </h2>
        <p className="text-xl text-center mb-12">
          Discover how we enhance your booking experience
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-accent p-6 rounded-xl shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 flex flex-col h-full"
            >
              <div className="bg-secondary bg-opacity-20 rounded-full p-4 w-16 h-16 flex items-center justify-center mb-6">
                {service.icon}
              </div>
              <h3 className=" font-semibold mb-3 text-primary">
                {service.title}
              </h3>

              <p className="text-sm text-gray-600 flex-grow ">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Advertisement;
