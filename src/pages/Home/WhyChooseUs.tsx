import { FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const features = [
  {
    title: "Seamless Booking Experience",
    points: [
      "Easy-to-use booking interface",
      "Real-time availability updates",
      "Instant booking confirmation",
      "Flexible rescheduling options",
    ],
  },
  {
    title: "Secure Transactions",
    points: [
      "Encrypted payment processing",
      "Multiple payment options",
      "No hidden fees",
      "Data protection and privacy",
    ],
  },
];

const WhyChooseUs = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ bounce: 0.5, duration: 1 }}
      viewport={{ once: true }}
      className="py-20"
    >
      <div className="lg:container mx-auto px-6 md:px-12">
        <h2 className="text-[28px] md:text-[36px] font-medium text-center  mb-4">
          Why Choose Us?
        </h2>
        <p className="text-xl text-center mb-8">
          Discover the advantages that make us the best choice for your room
          bookings.
        </p>
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="w-full md:w-1/2 bg-accent p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-[24px] font-semibold text-primary mb-4">
                {feature.title}
              </h3>
              <ul className="space-y-4 text-gray-600">
                {feature.points.map((point, i) => (
                  <li key={i} className="flex items-center text-lg">
                    <FaCheckCircle className="text-secondary mr-3 text-xl" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default WhyChooseUs;
