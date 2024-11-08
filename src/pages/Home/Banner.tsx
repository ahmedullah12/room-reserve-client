import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRightLong } from "react-icons/fa6";


const Banner = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2
      }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <div className="bg-accent">
      <div className="w-full lg:w-[90%] lg:mx-auto px-6 pt-[64px] pb-20 md:px-12 md:py-[100px] lg:py-[150px]">
        <motion.div 
          className="w-[320px] md:w-[680px] mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-[32px] md:text-[50px] text-primary font-bold text-center leading-10 md:leading-[60px]">
              Book Your Ideal Meeting Room with Ease.
            </h2>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <p className="text-lg text-gray-600 text-center my-6">
              Efficient, hassle-free room booking for all your meeting needs.
            </p>
          </motion.div>
          
          <motion.div 
            className="w-full flex flex-col md:flex-row justify-center gap-3"
            variants={itemVariants}
          >
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              className="flex justify-center"
            >
              <Button className="bg-primary hover:bg-secondary">
                <Link to="/meeting-rooms" className="flex items-center gap-1">
                  Book Now{" "}
                  <motion.span 
                    className="mt-[2px]"
                    animate={{ x: [0, 4, 0] }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <FaArrowRightLong />
                  </motion.span>
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;