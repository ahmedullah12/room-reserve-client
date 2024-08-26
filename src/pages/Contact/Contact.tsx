import MyForm from "@/components/form/MyForm";
import MyInput from "@/components/form/MyInput";
import MyTextarea from "@/components/form/MyTextarea";
import { motion } from "framer-motion";
import { FieldValues, SubmitHandler } from "react-hook-form";

const Contact = () => {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <div>
      {/* Contact Information Section */}
      <div className="py-16 ">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.h2
            className="mb-4 text-[32px] md:text-[40px] font-bold text-center text-primary"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Contact Us
          </motion.h2>
          <motion.div
            className="flex flex-col md:flex-row justify-between items-center mb-12"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="px-6 py-3 text-center md:text-left shadow-md ">
              <h3 className="text-xl md:text-2xl text-primary font-semibold mb-4">Get In Touch</h3>
              <p className="text-lg mb-2">Email: ahmed@ullah.com</p>
              <p className="text-lg mb-2">Phone: +8801912121212</p>
              <p className="text-lg">Address: Shewrapara, Mirpur 10, Dhaka</p>
            </div>
            <motion.div
              className="mt-8 md:mt-0 md:ml-12 h-64 w-full md:w-1/2 bg-slate-300 dark:bg-slate-700 rounded-lg overflow-hidden"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              
              <iframe
                className="h-full w-full border-0"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.749863256777!2d90.37461237516494!3d23.79192007864207!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c73458f06137%3A0x50dcc5d69e174edc!2sShewrapara%20Rd%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1724693098070!5m2!1sen!2sbd"
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Contact Form Section */}
      <section className="py-16 bg-accent">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.h2
            className="mb-6 text-[32px] md:text-[40px] font-bold text-center text-primary"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Send Us a Message
          </motion.h2>
          <motion.div
            className="max-w-xl mx-auto bg-white dark:bg-slate-900 p-8 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <MyForm onSubmit={onSubmit}>
              <motion.div
                className="mb-6"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <MyInput width="w-full" name="name" label="Name" type="text" />
              </motion.div>
              <motion.div
                className="mb-6"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <MyInput
                  width="w-full"
                  name="email"
                  label="Email"
                  type="email"
                />
              </motion.div>
              <motion.div
                className="mb-6"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <MyInput
                  width="w-full"
                  name="subject"
                  label="Subject"
                  type="text"
                />
              </motion.div>
              <motion.div
                className="mb-6"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <MyTextarea
                  width="w-full"
                  name="message"
                  label="Message"
                  rows={5}
                />
              </motion.div>
              <motion.button
                type="submit"
                className="w-full p-3 bg-primary text-white rounded-lg "
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Send Message
              </motion.button>
            </MyForm>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
