import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { Separator } from "../ui/separator";

const links = [
  {
    name: "Rooms",
    link: "/meeting-rooms",
  },
  {
    name: "About us",
    link: "/about",
  },
  {
    name: "Contact Us",
    link: "/contact",
  },
  {
    name: "Privacy Policy",
    link: "/",
  },
  {
    name: "Terms of Service",
    link: "/",
  },
];
const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="">
          <div className="mb-8 flex flex-col lg:flex-row ">
            <div className="lg:w-[50%]  mb-6 lg:mb-0">
              <h2 className="text-2xl font-bold mb-2">Room Reserve</h2>
              <p>Email: ahmed@ullah.com</p>
              <p>Phone: +8801912121212</p>
              <p>Address: Shewrapara, Mirpur 10, Dhaka</p>
            </div>

            <div className="lg:w-[50%] flex flex-col gap-y-2">
              {links.map((link, i) => (
                <Link key={i} className="hover:underline" to={link.link}>
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <Separator />
          <div className="flex justify-center space-x-6 mt-4 mb-6 lg:mb-0">
            <a href="https://facebook.com" aria-label="Facebook">
              <FaFacebookF
                className="text-white hover:text-secondary"
                size={20}
              />
            </a>
            <a href="https://twitter.com" aria-label="Twitter">
              <FaTwitter
                className="text-white hover:text-secondary"
                size={20}
              />
            </a>
            <a href="https://instagram.com" aria-label="Instagram">
              <FaInstagram
                className="text-white hover:text-secondary"
                size={20}
              />
            </a>
            <a href="https://linkedin.com" aria-label="LinkedIn">
              <FaLinkedinIn
                className="text-white hover:text-secondary"
                size={20}
              />
            </a>
          </div>
        </div>

        <div className="mt-10 pb-4 text-center text-sm">
          <p>&copy; 2024 Room Reserve. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
