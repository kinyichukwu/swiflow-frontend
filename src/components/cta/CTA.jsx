import { FaTelegramPlane } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export const CTA = ({
  text = `Swiflow. ${new Date().getFullYear()}. All rights reserved`,
}) => {
  return (
    <div className="text-[#ffffff51] border-t border-t-[#ffffff51] flex gap-5 items-center justify-center py-4 mx-8">
      <p className="text-xs sm:text-sm">{text}</p>
      <a href="https://twitter.com/swiflow" target="_blank" rel="noopener noreferrer">
        <FaXTwitter className="hover:text-white transition-colors cursor-pointer" />
      </a>
      <a href="https://t.me/swiflow" target="_blank" rel="noopener noreferrer">
        <FaTelegramPlane className="text-base hover:text-white transition-colors cursor-pointer" />
      </a>
    </div>
  );
};
