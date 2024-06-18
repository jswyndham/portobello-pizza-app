import { Link } from "react-router-dom";
import logo from "/images/portobello-no-background-small-2.png";
import SocialMediaLinks from "./SocialMediaLinks";

const Footer = () => {
  return (
    <>
      <footer className="w-screen h-fit flex justify-center bg-primary border-t-2 border-t-forth p-3 ">
        <div className="flex flex-col justify-center items-center">
          {/* Social Media */}
          <div className="my-4">
            <SocialMediaLinks />
          </div>

          {/* Contact Info */}
          <div className="flex flex-col pb-3 justify-center items-center">
            <div className="my-4">
              <Link to="/">
                <img
                  src={logo}
                  alt="Portobello, Koh Tao logo"
                  className="h-16"
                />
              </Link>
            </div>
            <div className="flex flex-col py-2 justify-center items-center">
              <h3 className="font-robotoSlab text-red-500 font-bold text-lg">
                Visit Us
              </h3>
              <p className="text-md lg:text-lg py-1">
                Open 7 days a week | 6pm - 10pm
              </p>
              <p className="text-md lg:text-lg py-1">
                Sai Ree Road, Ban Ko Tao, Thailand, Surat Thani
              </p>
              <p className="text-md lg:text-lg py-1">Tel: +66 77 457 029</p>
            </div>
          </div>

          <div className="text-white text-sm md:text-md">
            <p>©2024 | All Rights Reserved | Powered by JSW Web Dev</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
