import { LuClapperboard, LuSearch } from "react-icons/lu";
import { Bell } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  const navLinks = [
    { name: "Movies", path: "/home" },
    { name: "My Booking", path: "/myBooking" },
    { name: "Offers", path: "/offers" },
    { name: "Memberships", path: "/memberships" },
  ];
  return (
    <header className="sticky top-0 z-50 bg-[#0a0a0a] backdrop-blur-xl backdrop-saturate-150 border-b border-white/10 px-4 md:px-10 lg:px-20 py-3">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-8">
        {/* LEFT: Logo + Nav */}
        <div className="flex items-center gap-10">
          {/* Logo*/}
          <Link to="/home" className="flex items-center gap-2 group">
            <div className="p-2 group-hover:scale-110 transition-transform">
              <LuClapperboard className="text-3xl text-blue-500" />
            </div>
            <h2 className="text-white text-xl font-bold tracking-tight">
              Cinema<span className="text-blue-500">Max</span>
            </h2>
          </Link>

          {/* Nav*/}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/home"}
                className={({ isActive }) => `
            text-lg font-black transition-all duration-300 relative pb-1
            ${
              isActive
                ? "text-white after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-blue-300 after:rounded-full" // Màu khi đang ở trang này (Active)
                : "text-white/70 hover:text-white " // Màu mặc định và khi hover
            }
          `}
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* RIGHT: Search + User */}
        <div className="flex flex-1 justify-end items-center gap-6">
          {/* Search*/}
          <div className="hidden lg:flex relative w-full max-w-xs group">
            <LuSearch
              className="absolute left-3 top-1/2 -translate-y-1/2 
                     text-white/40 text-xl group-focus-within:text-blue-300 
                     transition-colors"
            />
            <input
              type="text"
              placeholder="Search movies, actors..."
              className="w-full bg-[#1a1a1a] border border-white/5
                     rounded-lg pl-10 pr-4 py-2 text-sm text-white
                     placeholder:text-white/30 outline-none
                     focus:border-blue-300/50 focus:ring-1 focus:ring-blue-300/50
                     transition-all"
            />
          </div>

          {/* 👤 User Actions */}
          <div className="flex items-center gap-4">
            {/* User button - Dùng để mở Menu hoặc thông báo */}
            <button
              className="relative flex items-center justify-center p-2.5
         rounded-lg bg-[#1a1a1a] border border-white/5
         text-white/80 hover:text-white hover:bg-white/10 
         transition-all cursor-pointer"
            >
              <Bell className="w-5 h-5" />

              {/* Notification dot */}
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
            </button>

            {/* Avatar - Link tới Profile */}
            <Link to="/profile" className="relative group cursor-pointer">
              <div
                className="w-10 h-10 rounded-full border-2 border-white/10
                       group-hover:border-blue-500 transition-all overflow-hidden"
              >
                <img
                  src="https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff"
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Chấm xanh trạng thái online (tùy chọn) */}
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#0a0a0a] rounded-full"></span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
