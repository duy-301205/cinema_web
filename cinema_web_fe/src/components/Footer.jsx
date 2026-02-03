import React from "react";
import { Clapperboard, Share2, Globe, Send } from "lucide-react";

export default function Footer() {
  const links = {
    explore: ["Movies", "Cinemas", "Gift Cards", "Corporate Events"],
    support: ["Help Center", "Contact Us", "Refund Policy", "FAQs"],
  };
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/10 px-4 md:px-10 lg:px-20 py-10 mt-10">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Cột 1: Thông tin thương hiệu */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-blue-500">
              <Clapperboard size={32} strokeWidth={2} />
              <h2 className="text-white text-xl font-bold tracking-tight">
                CinemaMax
              </h2>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              Bringing the world's best cinematic experiences to you. Premium
              theaters, stunning visuals, and unforgettable stories since 1998.
            </p>

            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors text-white group"
              >
                <Share2
                  size={20}
                  className="group-hover:text-blue-500 transition-colors"
                />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors text-white group"
              >
                <Globe
                  size={20}
                  className="group-hover:text-blue-500 transition-colors"
                />
              </a>
            </div>
          </div>
          {/* Cột 2: Explore */}
          <div>
            <h4 className="text-white text-lg font-bold mb-6">Explore</h4>
            <ul className="space-y-4 text-sm text-white/40">
              {links.explore.map((link) => (
                <li key={link}>
                  <a
                    href={`#${link}`}
                    className="hover:text-blue-500 transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Cột 3: Support */}
          <div>
            <h4 className="text-white text-lg font-bold mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-white/40">
              {links.support.map((link) => (
                <li key={link}>
                  <a
                    href={`#${link}`}
                    className="hover:text-blue-500 transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Cột 4: Đăng ký nhận tin */}
          <div>
            <h4 className="text-white text-lg font-bold mb-6">Newsletter</h4>
            <p className="text-white/40 text-sm mb-4">
              Stay updated with the latest movie releases and exclusive offers.
            </p>
            <div className="flex flex-col gap-3">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:ring-1 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
              <button className="flex items-center justify-center gap-2 bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition-all active:scale-95 cursor-pointer">
                <Send size={16} />
                Subscribe
              </button>
            </div>
          </div>
        </div>
        {/* Phần Bottom Bar */}
        <div className="mt-16 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between gap-4 text-xs text-white/20">
          <p>© 2026 CinemaMax Theaters. All rights reserved.</p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Settings"].map(
              (item) => (
                <a
                  key={item}
                  href="#"
                  className="hover:text-white transition-colors"
                >
                  {item}
                </a>
              ),
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
