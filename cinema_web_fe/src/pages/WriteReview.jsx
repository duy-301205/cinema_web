import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { X, Star, Award } from "lucide-react";
import { MOVIES_DATA } from "../data/movie";

// Danh sách các tag có sẵn
const AVAILABLE_TAGS = [
  "Amazing Visuals",
  "Great Sound",
  "Strong Acting",
  "Gripping Plot",
  "Family Friendly",
  "Slow Burn",
  "Masterpiece",
];
const RATING_TEXT = {
  1: "Terrible",
  2: "Bad",
  3: "Okay",
  4: "Good",
  5: "Masterpiece",
};
export default function WriteReview() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Lấy thông tin phim
  const movie = MOVIES_DATA.find((m) => m.id === parseInt(id));

  // --- STATE QUẢN LÝ FORM ---
  const [rating, setRating] = useState(0); // Điểm đã chọn
  const [hoverRating, setHoverRating] = useState(0); // Điểm khi hover chuột
  const [selectedTags, setSelectedTags] = useState([]); // Các tag đang chọn
  const [reviewText, setReviewText] = useState(""); // Nội dung review

  // --- HANDLERS ---

  // Xử lý chọn tag
  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags((prev) => prev.filter((t) => t !== tag));
    } else {
      setSelectedTags((prev) => [...prev, tag]);
    }
  };

  // Xử lý submit
  const handleSubmit = () => {
    const newReview = {
      movieId: movie.id,
      rating,
      tags: selectedTags,
      content: reviewText,
      date: new Date().toISOString(),
    };

    console.log("Submitting Review:", newReview);
    // Tại đây bạn sẽ gọi API để lưu review

    alert("Review posted successfully!");
    navigate(`/movie/${id}`); // Quay lại trang chi tiết
  };

  // Nếu không tìm thấy phim
  if (!movie)
    return <div className="text-white text-center pt-20">Movie not found</div>;

  return (
    <div className="bg-slate-950 min-h-screen flex items-center justify-center p-4 font-sans">
      {/* Modal Container */}
      <div className="relative w-full max-w-[600px] bg-[#111722] rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10 animate-in fade-in zoom-in duration-300">
        {/* Header Image Section */}
        <div
          className="relative h-64 w-full bg-cover bg-center flex flex-col justify-end group"
          style={{
            backgroundImage: `linear-gradient(to top, #111722 0%, rgba(17, 23, 34, 0.4) 50%, rgba(17, 23, 34, 0) 100%), url(${movie.heroBg || movie.image})`,
          }}
        >
          {/* Close Button Overlay */}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white hover:bg-black/60 transition-colors cursor-pointer z-10"
          >
            <X size={20} />
          </button>

          <div className="p-6 relative z-10">
            <p className="text-white/70 text-xs font-bold uppercase tracking-widest mb-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              Now Reviewing
            </p>
            <h2 className="text-white text-3xl font-bold leading-tight text-shadow-lg">
              {movie.title}
            </h2>
          </div>
        </div>

        {/* Review Form Content */}
        <div className="p-6 space-y-8">
          {/* Headline and Rating */}
          <div className="text-center">
            <h3 className="text-white text-xl font-bold mb-4">
              How was the movie?
            </h3>
            <div className="flex flex-col items-center gap-3">
              <div
                className="flex gap-2"
                onMouseLeave={() => setHoverRating(0)}
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    className="focus:outline-none transition-transform active:scale-90 hover:scale-110"
                    onMouseEnter={() => setHoverRating(star)}
                    onClick={() => setRating(star)}
                  >
                    <Star
                      size={36}
                      className={`transition-colors duration-200 ${
                        star <= (hoverRating || rating)
                          ? "fill-blue-500 text-blue-500 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                          : "fill-transparent text-[#324467]"
                      }`}
                    />
                  </button>
                ))}
              </div>
              <p
                className={`text-lg font-bold transition-all duration-300 ${rating > 0 ? "text-blue-400" : "text-slate-500"}`}
              >
                {RATING_TEXT[hoverRating || rating] || "Select a rating"}
              </p>
            </div>
          </div>

          {/* Quick Tags Section */}
          <div className="space-y-3">
            <p className="text-slate-400 text-sm font-medium px-1">
              Highlight the best parts:
            </p>
            <div className="flex flex-wrap gap-2">
              {AVAILABLE_TAGS.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`flex h-9 items-center justify-center px-4 rounded-full text-sm font-medium border transition-all duration-200 active:scale-95 ${
                      isSelected
                        ? "bg-blue-600 text-white border-blue-500 shadow-[0_0_10px_rgba(37,99,235,0.3)]"
                        : "bg-[#192233] text-slate-300 border-[#324467] hover:bg-[#232f48] hover:border-slate-500"
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Text Feedback */}
          <div className="flex flex-col gap-2">
            <label className="text-slate-400 text-sm font-medium px-1">
              Your Review
            </label>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="w-full bg-[#192233] border border-[#324467] rounded-xl p-4 text-white text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none min-h-[120px] transition-all placeholder:text-slate-600 resize-none"
              placeholder="Share your thoughts about the cinematography, music, or plot (optional)..."
            ></textarea>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 pt-2">
            <button
              onClick={handleSubmit}
              disabled={rating === 0}
              className={`w-full font-bold py-4 rounded-xl text-lg transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-2
                ${
                  rating > 0
                    ? "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/20"
                    : "bg-slate-700 text-slate-400 cursor-not-allowed"
                }`}
            >
              Post Review
            </button>
            <button
              onClick={() => navigate(-1)}
              className="w-full text-slate-500 hover:text-white text-sm font-medium py-2 transition-colors"
            >
              Maybe Later
            </button>
          </div>
        </div>

        {/* Rating Summary Bar (Bottom Subtle) */}
        <div className="bg-[#192233]/50 border-t border-[#324467] p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award size={16} className="text-blue-500" />
            <p className="text-slate-400 text-xs font-medium uppercase tracking-tight">
              Community Rating:{" "}
              <span className="text-white font-bold">{movie.rating}/10</span>
            </p>
          </div>
          <div className="flex items-center gap-1">
            <div className="flex h-1.5 w-24 overflow-hidden rounded-full bg-[#324467]">
              <div
                className="rounded-full bg-blue-600"
                style={{ width: `${(movie.rating / 10) * 100}%` }}
              ></div>
            </div>
            <p className="text-blue-400 text-[10px] font-bold ml-1">
              TOP RATED
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
