import React from "react";
import { Star } from "lucide-react";
import { Link } from "react-router-dom"; // Import Link để điều hướng

const MovieCard = ({ movie }) => {
  return (
    <div className="group">
      {/* Image Container */}
      <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-white/5 mb-3">
        <img
          src={movie.image}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Overlay khi hover */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
          {/* Chuyển button thành Link */}
          <Link
            to={`/movie/${movie.id}`}
            className={`py-2 rounded-lg font-bold text-sm text-center transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 ${
              movie.type === "now"
                ? "bg-cyan-500 text-slate-900 hover:bg-cyan-400"
                : "bg-white/20 text-white backdrop-blur-md hover:bg-white/30"
            }`}
          >
            {movie.type === "now" ? "Booking Now" : "View Details"}
          </Link>
        </div>

        {/* Rating tag */}
        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md flex items-center gap-1">
          <Star size={12} className="text-yellow-400 fill-yellow-400" />
          <span className="text-xs font-bold text-white">
            {movie.rating > 0 ? movie.rating : "N/A"}
          </span>
        </div>
      </div>

      {/* Info */}
      <Link to={`/movie/${movie.id}`}>
        <h3 className="font-bold text-white truncate group-hover:text-cyan-400 transition-colors cursor-pointer">
          {movie.title}
        </h3>
      </Link>
      <p className="text-sm text-white/40">{movie.genres.join(" • ")}</p>
    </div>
  );
};

export default MovieCard;
