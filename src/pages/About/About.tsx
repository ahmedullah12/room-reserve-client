import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="">
      {/* Our Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.h2
            className="mb-4 text-[32px] md:text-[40px] font-bold text-center text-primary"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Our Story
          </motion.h2>
          <motion.p
            className="text-lg leading-8 text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Our journey began with a simple idea: to bring innovative solutions
            to everyday challenges. Over the years, we’ve grown from a small
            team of enthusiasts to a full-fledged company that is making a real
            impact. Our story is one of passion, perseverance, and a relentless
            drive to make the world a better place.
          </motion.p>
        </div>
      </section>

      {/* Our Mission Section */}
      <div className="py-16 bg-accent ">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.h2
            className="mb-4 text-[32px] md:text-[40px] font-bold text-center text-primary"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Our Mission
          </motion.h2>
          <motion.p
            className="text-lg leading-8 text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            Our mission is to innovate, inspire, and make a positive impact. We
            are committed to providing top-quality products and services that
            not only meet the needs of our customers but also exceed their
            expectations. We strive to create solutions that are both effective
            and sustainable, ensuring a brighter future for all.
          </motion.p>
        </div>
      </div>

      {/* Meet the Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.h2
            className="mb-4 text-[32px] md:text-[40px] font-bold text-center text-primary"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Meet the Team
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {["Alice", "Bob", "Charlie"].map((name, index) => (
              <motion.div
                key={index}
                className="text-center p-6 rounded-lg shadow-lg bg-white dark:bg-slate-900 hover:scale-105 transition-transform"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.3 }}
              >
                <div className="h-32 w-32 mx-auto rounded-full bg-slate-300 dark:bg-slate-700 mb-4"></div>
                <h3 className="text-xl font-semibold">{name}</h3>
                <p className="text-slate-600 dark:text-slate-400">Role</p>
                <p className="text-slate-500 dark:text-slate-300 mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  non risus.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Ending Section */}
      <div className="py-16 bg-accent">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.h2
            className="mb-4 text-[32px] md:text-[40px] font-bold text-center text-primary"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Join Us on Our Journey
          </motion.h2>
          <motion.p
            className="text-lg leading-8 text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            We’re always looking for talented and passionate individuals to join
            our team. If you’re interested in being a part of a dynamic and
            innovative company, we’d love to hear from you. Together, we can
            achieve great things.
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default About;
