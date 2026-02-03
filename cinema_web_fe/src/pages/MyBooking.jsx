import {
  PlusCircle,
  Ticket,
  Star,
  MapPin,
  Calendar,
  Clock,
  MonitorPlay,
  QrCode,
  Utensils,
  MoreVertical,
  ChevronDown,
  Timer,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom"; // Import thêm useNavigate và Link
import { stats, upcomingBookings, pastBookings } from "../data/bookingData";
import Footer from "../components/Footer";

// Đưa hàm helper ra ngoài để tránh khởi tạo lại mỗi lần render
const getIcon = (iconName, className) => {
  const icons = {
    Ticket: <Ticket className={className} />,
    Star: <Star className={className} />,
    MapPin: <MapPin className={className} />,
  };
  return icons[iconName] || null;
};

export default function MyBooking() {
  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
        <main className="max-w-[1200px] mx-auto px-4 md:px-10 lg:px-40 py-10">
          {/* Page Heading */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="flex flex-col gap-2">
              <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em]">
                My Bookings
              </h1>
              <p className="text-white/60 text-lg font-normal">
                Manage your upcoming and past movie experiences
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* SỬA: Dùng Link để chuyển hướng về Home */}
              <Link
                to="/home"
                className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-600/20 cursor-pointer"
              >
                <PlusCircle size={20} />
                Book New Movie
              </Link>
            </div>
          </div>

          {/* Stats Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`bg-[#192233]/60 backdrop-blur-sm flex flex-col gap-2 rounded-xl p-6 border-l-4 ${stat.borderColor}`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-white/70 text-sm font-medium">
                    {stat.label}
                  </p>
                  {getIcon(stat.icon, `w-6 h-6 ${stat.color}`)}
                </div>
                <p className="text-white tracking-tight text-3xl font-bold">
                  {stat.value}
                  {stat.unit && (
                    <span className="text-sm font-normal text-white/40 ml-1">
                      {stat.unit}
                    </span>
                  )}
                </p>
              </div>
            ))}
          </div>

          {/* Upcoming Section */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6 px-2">
              <h2 className="text-white text-2xl font-bold tracking-tight">
                Upcoming This Weekend
              </h2>
              <div className="h-px flex-grow mx-6 bg-white/10"></div>
            </div>

            <div className="space-y-4">
              {upcomingBookings.map((booking) => (
                <div
                  key={booking.bookingId}
                  className="group bg-[#192233]/40 border border-[#324467]/30 hover:border-[#324467] hover:bg-[#192233] transition-all flex flex-col md:flex-row items-center gap-6 p-5 rounded-2xl relative overflow-hidden"
                >
                  {/* Poster Image */}
                  <div className="w-full md:w-48 h-48 md:h-36 rounded-xl overflow-hidden flex-shrink-0 relative shadow-lg">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src={booking.movie.image}
                      alt={booking.movie.title}
                      // SỬA: Thêm ảnh fallback nếu link ảnh lỗi
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/300x450?text=No+Image";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent md:hidden" />
                  </div>

                  {/* Content */}
                  <div className="flex-grow w-full">
                    <div className="flex flex-col md:flex-row md:items-start justify-between mb-3 gap-2">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${booking.statusColor}`}
                          >
                            {booking.status}
                          </span>
                          <span className="text-white/40 text-xs font-medium tracking-wide">
                            ID: {booking.bookingId}
                          </span>
                        </div>
                        <h3 className="text-2xl md:text-xl font-bold text-white mb-1 md:mb-0">
                          {booking.movie.title}
                        </h3>
                        <p className="text-white/40 text-xs md:hidden">
                          {booking.movie.genres.join(", ")}
                        </p>
                      </div>

                      {/* Seats Info Desktop */}
                      <div className="hidden md:block text-right">
                        <p className="text-white/50 text-xs font-medium uppercase">
                          Seats
                        </p>
                        <p className="text-white font-bold text-lg text-blue-100">
                          {booking.seats}
                        </p>
                      </div>
                    </div>

                    {/* Details Grid */}
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-white/70 text-sm mt-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="text-blue-500 w-4 h-4" />
                        <span>{booking.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="text-blue-500 w-4 h-4" />
                        <span>{booking.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Timer className="text-blue-500 w-4 h-4" />
                        <span>{booking.movie.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MonitorPlay className="text-blue-500 w-4 h-4" />
                        <span>{booking.hall}</span>
                      </div>

                      {/* Seats Mobile View */}
                      <div className="md:hidden flex items-center gap-2 w-full pt-2 border-t border-white/5 mt-1">
                        <span className="text-white/50 text-xs uppercase">
                          Seats:
                        </span>
                        <span className="text-white font-bold">
                          {booking.seats}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex md:flex-col gap-3 w-full md:w-auto mt-2 md:mt-0">
                    {/* SỬA: Link tới trang QR Code */}
                    <Link
                      to={`/ticket/${booking.movie.id}`}
                      className="flex-1 md:flex-none bg-blue-600 hover:bg-blue-500 text-white py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 font-bold text-sm shadow-lg shadow-blue-600/20 transition-all"
                    >
                      <QrCode size={18} />
                      <span>Ticket</span>
                    </Link>

                    <button className="flex-1 md:flex-none bg-[#232f48] hover:bg-[#2d3b5a] text-white py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 font-bold text-sm transition-all border border-[#324467]">
                      <Utensils size={18} />
                      <span className="hidden lg:inline">Foods</span>
                      <span className="lg:hidden">Foods</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Past Bookings Section */}
          <div>
            <div className="flex items-center justify-between mb-6 px-2">
              <h2 className="text-white/60 text-xl font-bold tracking-tight">
                Recent History
              </h2>
              <div className="h-px flex-grow mx-6 bg-white/5"></div>
            </div>

            <div className="space-y-3">
              {pastBookings.map((booking) => (
                <div
                  key={booking.bookingId}
                  className="group bg-[#192233]/20 hover:bg-[#192233] border border-transparent hover:border-[#324467] transition-all duration-300 flex flex-col md:flex-row items-center gap-4 p-4 rounded-xl cursor-pointer"
                >
                  <div className="w-16 h-24 md:h-16 md:w-16 rounded-lg overflow-hidden flex-shrink-0 border border-white/10">
                    <img
                      className="w-full h-full object-cover"
                      src={booking.movie.image}
                      alt={booking.movie.title}
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/150x150?text=No+Image";
                      }}
                    />
                  </div>

                  <div className="flex-grow text-center md:text-left w-full md:w-auto">
                    <h4 className="text-white font-bold text-lg md:text-base group-hover:text-blue-400 transition-colors">
                      {booking.movie.title}
                    </h4>
                    <div className="flex items-center justify-center md:justify-start gap-2 text-white/40 text-xs mt-1">
                      <span>{booking.watchedDate}</span>
                      <span>•</span>
                      <span>{booking.theater}</span>
                    </div>
                    {/* Genre tags mobile */}
                    <div className="flex items-center justify-center md:justify-start gap-2 mt-1 md:hidden">
                      {booking.movie.genres.slice(0, 2).map((g, i) => (
                        <span
                          key={i}
                          className="bg-white/5 px-2 py-0.5 rounded text-[10px] text-white/60"
                        >
                          {g}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="w-full md:w-auto px-4 md:border-x border-white/5 py-2 md:py-0 flex flex-col items-center md:items-start">
                    <p className="text-white/50 text-[10px] uppercase font-bold mb-1">
                      Your Rating
                    </p>
                    <div className="flex gap-1 text-amber-500">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          fill={
                            i < booking.userRating ? "currentColor" : "none"
                          }
                          className={
                            i < booking.userRating
                              ? "text-amber-500"
                              : "text-white/20"
                          }
                        />
                      ))}
                    </div>
                  </div>

                  <button className="hidden md:block text-white/30 hover:text-white transition-colors p-2">
                    <MoreVertical size={20} />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-8 flex justify-center">
              <button className="text-blue-400 hover:text-white text-sm font-bold flex items-center gap-2 transition-colors py-2 px-4 rounded-lg hover:bg-white/5">
                Load Older Bookings
                <ChevronDown size={16} />
              </button>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
