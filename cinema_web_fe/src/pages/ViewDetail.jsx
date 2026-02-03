import React from "react";
import {
  Star,
  ChevronRight,
  Ticket,
  PlayCircle,
  Clock,
  Calendar,
  MessageSquare,
  PenLine,
} from "lucide-react";
import { useParams, Link } from "react-router-dom";
import { MOVIES_DATA } from "../data/movie";
import Footer from "../components/Footer";

export default function ViewDetail() {
  const { id } = useParams();

  // Tìm phim tương ứng với ID
  const movie = MOVIES_DATA.find((m) => m.id === parseInt(id));

  // Trường hợp không tìm thấy phim
  if (!movie) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#0a0a0a] text-white">
        <h2 className="text-2xl font-bold mb-4">Phim không tồn tại!</h2>
        <Link
          to="/home"
          className="px-6 py-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition-all"
        >
          Quay lại trang chủ
        </Link>
      </div>
    );
  }

  return (
    <>
      <main className="pt-0 bg-[#0a0a0a] min-h-screen text-slate-200 font-sans">
        {/* HERO SECTION */}
        <div className="relative w-full h-[70vh] min-h-[550px] overflow-hidden">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center scale-105 blur-[2px] opacity-40"
            style={{ backgroundImage: `url(${movie.heroBg || movie.image})` }}
          ></div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent"></div>

          <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-end pb-12">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 mb-6 text-sm font-medium text-slate-400">
              <Link
                className="hover:text-blue-500 transition-colors"
                to="/home"
              >
                Home
              </Link>
              <ChevronRight size={14} />
              <span className="text-white">{movie.title}</span>
            </nav>

            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                {/* Badge trạng thái */}
                <span
                  className={`text-xs font-black px-3 py-1 rounded uppercase tracking-wider ${
                    movie.type === "now"
                      ? "bg-blue-600 text-white"
                      : "bg-yellow-500 text-black"
                  }`}
                >
                  {movie.type === "now" ? "Đang chiếu" : "Sắp ra mắt"}
                </span>

                <div className="flex items-center gap-1 text-yellow-400">
                  <Star size={18} fill="currentColor" />
                  <span className="text-white font-bold">
                    {movie.rating || "N/A"}
                  </span>
                  <span className="text-slate-400 font-normal text-sm ml-1">
                    ({movie.reviews || "0"} Reviews)
                  </span>
                </div>

                <div className="h-4 w-[1px] bg-white/20 mx-1"></div>

                <Link
                  to={`/movie/${movie.id}/reviews`}
                  className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-md transition-all cursor-pointer group active:scale-95"
                >
                  <PenLine
                    size={14}
                    className="text-blue-400 group-hover:text-white transition-colors"
                  />
                  <span className="text-xs font-bold text-blue-100 group-hover:text-white uppercase tracking-wide">
                    Rate Movie
                  </span>
                </Link>
              </div>

              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter uppercase italic leading-tight">
                {movie.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-slate-300 text-lg font-medium">
                <span className="flex items-center gap-1">
                  <Calendar size={18} className="text-blue-500" /> {movie.year}
                </span>
                <span className="size-1 bg-slate-600 rounded-full"></span>
                <span>{movie.genres?.join(" • ")}</span>
                <span className="size-1 bg-slate-600 rounded-full"></span>
                <span className="flex items-center gap-1">
                  <Clock size={18} className="text-blue-500" /> {movie.duration}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT SECTION */}
        <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-10 pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* LEFT COLUMN: DETAILS */}
            <div className="lg:col-span-8 space-y-12">
              {/* Synopsis */}
              <section className="bg-white/5 p-8 rounded-3xl border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3 italic uppercase tracking-tighter">
                  <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
                  Synopsis
                </h3>
                <p className="text-lg text-slate-400 leading-relaxed font-medium">
                  {movie.synopsis || "Thông tin đang được cập nhật..."}
                </p>
              </section>

              {/* Director */}
              {movie.director && (
                <section>
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 italic uppercase tracking-tighter">
                    <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
                    Director
                  </h3>
                  <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 w-fit group hover:bg-white/10 transition-all cursor-pointer">
                    <div className="size-16 rounded-full overflow-hidden border-2 border-blue-500/50 group-hover:border-blue-500">
                      <img
                        className="w-full h-full object-cover"
                        src={movie.director.image}
                        alt={movie.director.name}
                      />
                    </div>
                    <div>
                      <p className="text-white font-bold text-lg leading-none mb-1">
                        {movie.director.name}
                      </p>
                      <p className="text-slate-500 text-sm font-medium">
                        {movie.director.role}
                      </p>
                    </div>
                  </div>
                </section>
              )}

              {/* Cast */}
              <section>
                <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3 italic uppercase tracking-tighter">
                  <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
                  Top Cast
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                  {movie.cast?.map((person, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center text-center group"
                    >
                      <div className="size-24 rounded-full overflow-hidden mb-4 border-2 border-transparent group-hover:border-blue-500 transition-all duration-500">
                        <img
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          src={person.img}
                          alt={person.name}
                        />
                      </div>
                      <p className="text-white font-bold text-sm mb-0.5">
                        {person.name}
                      </p>
                      <p className="text-slate-500 text-xs font-medium uppercase tracking-tighter">
                        {person.role}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* RIGHT COLUMN: POSTER & CONDITIONAL ACTIONS */}
            <div className="lg:col-span-4">
              <div className="bg-[#161616] border border-white/10 rounded-[2rem] p-4 shadow-2xl sticky top-24">
                <div className="relative rounded-2xl overflow-hidden aspect-[2/3] mb-6 shadow-lg">
                  <img
                    className="w-full h-full object-cover"
                    src={movie.image}
                    alt={movie.title}
                  />
                </div>

                <div className="px-2 space-y-6 pb-4">
                  {/* Movie Info Grid */}
                  <div className="grid grid-cols-2 gap-y-6 gap-x-4 border-b border-white/5 pb-6">
                    <div>
                      <p className="text-slate-500 text-[10px] uppercase font-black tracking-widest mb-1">
                        Language
                      </p>
                      <p className="text-white text-sm font-bold">
                        {movie.info?.language || "English"}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-500 text-[10px] uppercase font-black tracking-widest mb-1">
                        Release
                      </p>
                      <p className="text-white text-sm font-bold">
                        {movie.info?.releaseDate || "2024"}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-500 text-[10px] uppercase font-black tracking-widest mb-1">
                        Studio
                      </p>
                      <p className="text-white text-sm font-bold truncate">
                        {movie.info?.studio || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-500 text-[10px] uppercase font-black tracking-widest mb-1">
                        Budget
                      </p>
                      <p className="text-white text-sm font-bold">
                        {movie.info?.budget || "N/A"}
                      </p>
                    </div>
                  </div>

                  {/* ACTION BUTTONS: DYNAMIC BASED ON TYPE */}
                  <div className="flex flex-col gap-3">
                    {movie.type !== "soon" ? (
                      /* HIỂN THỊ KHI PHIM ĐANG CHIẾU */
                      <>
                        <Link
                          to={`/booking/${movie.id}`}
                          className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-blue-500 transition-all shadow-xl shadow-blue-600/20 active:scale-95"
                        >
                          <Ticket size={20} fill="currentColor" /> Book Tickets
                          Now
                        </Link>
                        <button className="w-full bg-white/5 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-white/10 border border-white/10 transition-all active:scale-95 cursor-pointer">
                          <PlayCircle size={20} /> Watch Trailer
                        </button>
                      </>
                    ) : (
                      /* HIỂN THỊ KHI PHIM SẮP CHIẾU (CHỈ HIỆN TRAILER) */
                      <button className="w-full bg-white/5 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-white/10 border border-white/10 transition-all active:scale-95 cursor-pointer">
                        <PlayCircle size={20} /> Watch Trailer
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
