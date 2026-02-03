import React, { useState, useMemo } from "react";
import {
  Ticket,
  PlayCircle,
  ChevronDown,
  ArrowRight,
  Clock,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";
import { MOVIES_DATA } from "../data/movie";
import MovieCard from "../components/MovieCard";
import Footer from "../components/Footer";

export default function Home() {
  const [activeTab, setActiveTab] = useState("now");
  const [selectedGenre, setSelectedGenre] = useState("All Genres");
  const comingSoonMovies = useMemo(
    () => MOVIES_DATA.filter((m) => m.type === "soon"),
    [],
  );

  // 1. Tính toán count động cho Tabs
  const counts = useMemo(
    () => ({
      now: MOVIES_DATA.filter((m) => m.type === "now").length,
      soon: MOVIES_DATA.filter((m) => m.type === "soon").length,
    }),
    [],
  );

  // 2. Logic Filter kết hợp cả Tab và Genre
  const filteredMovies = useMemo(() => {
    return MOVIES_DATA.filter((movie) => {
      const matchTab = movie.type === activeTab;
      const matchGenre =
        selectedGenre === "All Genres" || movie.genres.includes(selectedGenre);
      return matchTab && matchGenre;
    });
  }, [activeTab, selectedGenre]);

  const tabs = [
    { id: "now", label: "Now Showing", count: counts.now },
    { id: "soon", label: "Coming Soon", count: counts.soon },
  ];

  const genres = [
    "All Genres",
    "Action",
    "Sci-Fi",
    "Drama",
    "Comedy",
    "Horror",
    "Animation",
  ];

  return (
    <>
      <main className="max-w-[1440px] mx-auto pb-20 bg-[#0a0a0a] text-white">
        {/* Hero Section - Giữ nguyên vì bạn làm UI phần này rất đẹp */}
        <section className="px-4 md:px-10 lg:px-20 pt-6">
          <div
            className="relative min-h-[560px] flex flex-col justify-end overflow-hidden rounded-3xl bg-cover bg-center p-8 md:p-16 border border-white/5"
            style={{
              backgroundImage: `linear-gradient(to top, rgba(10, 10, 10, 1), rgba(10, 10, 10, 0.3)), url("https://image.tmdb.org/t/p/w1280/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg")`,
            }}
          >
            <div className="max-w-2xl space-y-6 relative z-10">
              <div className="flex items-center gap-3">
                <span className="bg-cyan-500 text-[10px] text-black font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full">
                  Now in Theaters
                </span>
                <span className="bg-white/10 backdrop-blur-md border border-white/10 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  IMAX Experience
                </span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black leading-none tracking-tighter">
                Dune: Part Two
              </h1>
              <p className="text-lg text-white/60 leading-relaxed font-medium">
                Experience the epic journey of Paul Atreides as he unites with
                Chani and the Fremen while on a warpath of revenge.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  to="/movie/1"
                  className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-black px-8 py-4 rounded-2xl font-bold transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] cursor-pointer"
                >
                  <Ticket size={20} /> Book Ticket
                </Link>
                <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 text-white px-8 py-4 rounded-2xl font-bold transition-all hover:scale-105 cursor-pointer">
                  <PlayCircle size={20} /> Play Trailer
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Discovery Section */}
        <section className="px-4 md:px-10 lg:px-20 mt-20">
          <div className="flex flex-col sm:flex-row items-end sm:items-center justify-between border-b border-white/5 mb-10 gap-6">
            <div className="flex gap-10">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSelectedGenre("All Genres");
                  }}
                  className={`pb-5 font-bold text-xl flex items-center gap-3 transition-all relative cursor-pointer ${
                    activeTab === tab.id
                      ? "text-white"
                      : "text-white/30 hover:text-white/60"
                  }`}
                >
                  {tab.label}
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full ${activeTab === tab.id ? "bg-cyan-500 text-black" : "bg-white/5 text-white/40"}`}
                  >
                    {tab.count}
                  </span>
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-cyan-500 rounded-full" />
                  )}
                </button>
              ))}
            </div>

            <div className="relative mb-4 group">
              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="appearance-none bg-white/5 border border-white/10 rounded-xl text-sm font-bold text-white/70 py-2.5 pl-5 pr-12 focus:ring-2 focus:ring-cyan-500/50 outline-none cursor-pointer hover:bg-white/10 transition-all shadow-inner"
              >
                {genres.map((g) => (
                  <option key={g} value={g} className="bg-zinc-900 text-white">
                    {g}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none group-hover:text-cyan-500 transition-colors"
              />
            </div>
          </div>

          {/* Grid Phim - Đã tối ưu logic lọc */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          {filteredMovies.length === 0 && (
            <div className="text-center py-32 bg-white/[0.02] rounded-3xl border border-dashed border-white/10">
              <p className="text-white/20 font-medium">
                No movies found in this category.
              </p>
            </div>
          )}
        </section>

        {/* Membership Banner */}
        <section className="px-4 md:px-10 lg:px-20 mt-24">
          <div className="bg-gradient-to-br from-cyan-600/20 via-transparent to-blue-600/5 rounded-3xl border border-white/5 p-10 flex flex-col md:flex-row items-center justify-between gap-10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[100px] -z-10 group-hover:bg-cyan-500/20 transition-all" />
            <div className="flex items-center gap-8">
              <div className="w-20 h-20 bg-cyan-500 rounded-2xl flex items-center justify-center shrink-0 rotate-3 group-hover:rotate-0 transition-transform shadow-[0_10px_40px_rgba(6,182,212,0.3)]">
                <Ticket className="text-black w-10 h-10" />
              </div>
              <div>
                <h3 className="text-3xl font-black text-white mb-2">
                  CinemaMax Premium
                </h3>
                <p className="text-white/50 font-medium max-w-md">
                  Get exclusive discounts, priority booking, and free popcorn on
                  your birthday. Join 1M+ members today.
                </p>
              </div>
            </div>
            <button className="whitespace-nowrap bg-white text-black font-black py-4 px-10 rounded-2xl hover:bg-cyan-400 transition-all active:scale-95 cursor-pointer shadow-xl">
              Sign Up Now
            </button>
          </div>
        </section>

        {/* 2. Coming Soon Section */}
        <section className="px-4 md:px-10 lg:px-20 mt-24">
          <div className="flex items-center justify-between mb-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-white tracking-tight uppercase italic">
                Stay Tuned
              </h2>
              <div className="h-1.5 w-16 bg-cyan-500 rounded-full" />
            </div>
            <a
              className="text-cyan-500 text-sm font-bold flex items-center gap-2 hover:text-cyan-400 transition-all group"
              href="#"
            >
              View Full Calendar{" "}
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {comingSoonMovies.map((movie) => (
              <Link
                key={movie.id}
                to={`/movie/${movie.id}`}
                className="group cursor-pointer"
              >
                <div className="aspect-[2/3] rounded-2xl overflow-hidden bg-white/5 relative grayscale group-hover:grayscale-0 transition-all duration-700 border border-white/5 group-hover:border-cyan-500/50 shadow-2xl">
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-black text-white border border-white/10 uppercase tracking-tighter">
                    Coming Soon
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="font-bold text-white group-hover:text-cyan-500 transition-colors line-clamp-1">
                    {movie.title}
                  </h4>
                  <p className="text-[11px] text-white/30 uppercase font-bold mt-1 tracking-widest">
                    {movie.genres[0]}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
