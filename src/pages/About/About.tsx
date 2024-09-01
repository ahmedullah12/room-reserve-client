import { motion } from "framer-motion";

const About = () => {
  const teamMembers = [
    {
      name: "Alice",
      role: "CEO",
      image: "https://i.ibb.co/4SQZynR/1.jpg",
    },
    {
      name: "Bob",
      role: "CTO",
      image: "https://i.ibb.co/Swt8pLG/2.jpg",
    },
    {
      name: "Charlie",
      role: "COO",
      image: "https://i.ibb.co/6H4wQkt/4.jpg",
    },
  ];

  return (
    <div className="">
      <div className="py-16">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.h2
            className="mb-4 text-[32px] md:text-[40px] font-bold text-center text-primary"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ bounce: 0.5, duration: 1 }}
            viewport={{ once: true }}
          >
            Our Story
          </motion.h2>
          <motion.p
            className="text-lg leading-8 text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ bounce: 0.5, duration: 1 }}
            viewport={{ once: true }}
          >
            Our journey began with a simple idea: to bring innovative solutions
            to everyday challenges. Over the years, we’ve grown from a small
            team of enthusiasts to a full-fledged company that is making a real
            impact. Our story is one of passion, perseverance, and a relentless
            drive to make the world a better place.
          </motion.p>
        </div>
      </div>

      <div className="py-16 bg-accent ">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.h2
            className="mb-4 text-[32px] md:text-[40px] font-bold text-center text-primary"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ bounce: 0.5, duration: 1 }}
            viewport={{ once: true }}
          >
            Our Mission
          </motion.h2>
          <motion.p
            className="text-lg leading-8 text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ bounce: 0.5, duration: 1 }}
            viewport={{ once: true }}
          >
            Our mission is to innovate, inspire, and make a positive impact. We
            are committed to providing top-quality products and services that
            not only meet the needs of our customers but also exceed their
            expectations. We strive to create solutions that are both effective
            and sustainable, ensuring a brighter future for all.
          </motion.p>
        </div>
      </div>

      <div className="py-16">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.h2
            className="mb-4 text-[32px] md:text-[40px] font-bold text-center text-primary"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ bounce: 0.5, duration: 1 }}
            viewport={{ once: true }}
          >
            Meet the Team
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="text-center p-6 rounded-lg shadow-lg bg-white dark:bg-slate-900 hover:scale-105 transition-transform"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ bounce: 0.5, duration: 1 }}
                viewport={{ once: true }}
              >
                <div className="h-32 w-32 mx-auto rounded-full overflow-hidden mb-4">
                  <img
                    src={member.image}
                    alt={`${member.name}'s profile`}
                    className="object-cover h-full w-full"
                  />
                </div>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {member.role}
                </p>
                <p className="text-slate-500 dark:text-slate-300 mt-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  non risus.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-16 bg-accent">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.h2
            className="mb-4 text-[32px] md:text-[40px] font-bold text-center text-primary"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ bounce: 0.5, duration: 1 }}
            viewport={{ once: true }}
          >
            Join Us on Our Journey
          </motion.h2>
          <motion.p
            className="text-lg leading-8 text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ bounce: 0.5, duration: 1 }}
            viewport={{ once: true }}
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
