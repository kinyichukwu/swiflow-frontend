import { FaTelegramPlane } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";

export const CTA = ({
  text = `SwiFlow. ${new Date().getFullYear()}. All rights reserved`,
}) => {
  return (
    <footer className="bg-sui-bg border-t border-white/30 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img
                src="/suiflow-logo.svg"
                alt="SwiFlow"
                className="h-8 w-auto"
              />
              <div className="text-2xl font-bold">
                <span className="text-sui-blue">Swi</span>
                <span className="text-white">Flow</span>
              </div>
            </div>
            <p className="text-white/60 text-sm">
              Visualize Sui blockchain transactions with interactive graph analytics.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3">
            <h3 className="text-white font-semibold mb-2">Quick Links</h3>
            <a href="/" className="text-white/60 hover:text-sui-blue transition-colors text-sm">
              Home
            </a>
            <a href="/graph/demo" className="text-white/60 hover:text-sui-blue transition-colors text-sm">
              Demo
            </a>
            <a href="https://docs.sui.io" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-sui-blue transition-colors text-sm">
              Documentation
            </a>
          </div>

          {/* Social */}
          <div className="flex flex-col gap-3">
            <h3 className="text-white font-semibold mb-2">Connect</h3>
            <div className="flex gap-4">
              <a
                href="https://twitter.com/suiflow"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-sui-blue transition-colors"
              >
                <FaXTwitter className="text-xl" />
              </a>
              <a
                href="https://t.me/suiflow"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-sui-blue transition-colors"
              >
                <FaTelegramPlane className="text-xl" />
              </a>
              <a
                href="https://github.com/suiflow"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-sui-blue transition-colors"
              >
                <FaGithub className="text-xl" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/30 pt-6">
          <p className="text-white/40 text-xs sm:text-sm text-center">{text}</p>
        </div>
      </div>
    </footer>
  );
};
