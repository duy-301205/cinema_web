import React, { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Star,
  ThumbsUp,
  ThumbsDown,
  MoreHorizontal,
  ChevronDown,
  PenLine,
  BadgeCheck,
  ChevronLeft,
} from "lucide-react";

import { MOVIES_DATA } from "../data/movie";
import { REVIEWS_DATA } from "../data/reviewsData";

const StarRating = ({ rating, max = 5, size = 18 }) => {
  return (
    <div className="flex gap-0.5">
      {[...Array(max)].map((_, i) => (
        <Star
          key={i}
          size={size}
          className={`${i < Math.round(rating) ? "text-blue-500 fill-blue-500" : "text-slate-600 fill-transparent"}`}
        />
      ))}
    </div>
  );
};

// 2. Component Dashboard Thống kê
const RatingDashboard = ({ reviews }) => {
  const totalReviews = reviews.length;

  const averageRating =
    totalReviews > 0
      ? (
          reviews.reduce((acc, curr) => acc + curr.rating, 0) / totalReviews
        ).toFixed(1)
      : "0.0";

  const distribution = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => Math.round(r.rating) === star).length;
    const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
    return { star, percentage };
  });

  return (
    <div className="bg-slate-800/50 backdrop-blur-md border border-white/10 rounded-xl p-8 flex flex-col md:flex-row items-center gap-12 mb-8">
      <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left min-w-[160px]">
        <p className="text-white text-7xl font-black leading-none tracking-tighter">
          {averageRating}
        </p>
        <div className="py-2">
          <StarRating rating={Number(averageRating)} size={24} />
        </div>
        <p className="text-slate-400 text-sm font-medium uppercase tracking-widest">
          {totalReviews} Total Reviews
        </p>
      </div>

      <div className="grid w-full grid-cols-[30px_1fr_45px] items-center gap-y-3 gap-x-4">
        {distribution.map((item) => (
          <React.Fragment key={item.star}>
            <p className="text-slate-300 text-sm font-bold text-right">
              {item.star}
            </p>
            <div className="flex h-2.5 flex-1 overflow-hidden rounded-full bg-slate-900 shadow-inner">
              <div
                className="rounded-full bg-blue-600 transition-all duration-1000 ease-out"
                style={{ width: `${item.percentage}%` }}
              ></div>
            </div>
            <p className="text-slate-400 text-xs font-semibold">
              {Math.round(item.percentage)}%
            </p>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

// 3. Component Thẻ Review
const ReviewCard = ({ review }) => {
  return (
    <div className="bg-slate-800/40 hover:bg-slate-800/60 backdrop-blur-md border border-white/5 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1">
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12 border-2 border-blue-500/20"
              style={{
                backgroundImage: `url("${review.avatar || "https://ui-avatars.com/api/?name=" + review.user}")`,
              }}
            ></div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <p className="text-white text-base font-bold">{review.user}</p>
                {review.verified && (
                  <span className="flex items-center gap-1 bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase px-2 py-0.5 rounded-full border border-blue-500/20">
                    <BadgeCheck size={12} />
                    Verified
                  </span>
                )}
              </div>
              <p className="text-slate-400 text-xs font-medium">
                Reviewed {review.date}
              </p>
            </div>
          </div>
          <div className="bg-slate-900/50 p-2 rounded-lg border border-white/5">
            <StarRating rating={review.rating} size={16} />
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-white text-lg font-bold">{review.title}</h4>
          <p className="text-slate-300 text-base leading-relaxed">
            {review.comment}
          </p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-2">
          <div className="flex gap-6">
            <button className="flex items-center gap-2 text-slate-400 hover:text-blue-400 transition-colors group">
              <ThumbsUp size={18} className="group-hover:stroke-blue-400" />
              <p className="text-sm font-bold group-hover:text-white">
                {review.likes}
              </p>
            </button>
            <button className="flex items-center gap-2 text-slate-400 hover:text-red-400 transition-colors group">
              <ThumbsDown size={18} className="group-hover:stroke-red-400" />
              <p className="text-sm font-bold group-hover:text-white">
                {review.dislikes}
              </p>
            </button>
          </div>
          <button className="text-slate-500 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10">
            <MoreHorizontal size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default function ReviewMovie() {
  const { id } = useParams();

  // 1. Tìm thông tin phim
  const movie = MOVIES_DATA.find((m) => m.id === parseInt(id));

  // 2. Tìm danh sách review
  const movieReviewsObj = REVIEWS_DATA.find(
    (item) => item.movieId === parseInt(id),
  );
  const reviews = movieReviewsObj ? movieReviewsObj.reviews : [];

  if (!movie) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <h2>Movie not found</h2>
        <Link to="/home" className="text-blue-500 ml-2">
          Go Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 font-sans text-slate-100 antialiased min-h-screen flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-slate-400 text-sm mb-4">
          <Link
            to={`/movie/${id}`}
            className="hover:text-blue-500 flex items-center gap-1 transition-colors"
          >
            <ChevronLeft size={16} /> Back to Movie
          </Link>
          <span className="text-slate-600">/</span>
          <span className="text-white font-medium">{movie.title} Reviews</span>
        </div>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 px-1">
          <div className="space-y-1">
            <h2 className="text-3xl font-extrabold tracking-tight text-white">
              Audience Reviews
            </h2>
            <p className="text-slate-400 text-sm">
              Real feedback from verified moviegoers for{" "}
              <span className="text-blue-400 font-bold">{movie.title}</span>
            </p>
          </div>
          <div className="flex justify-start">
            <Link
              to={`/movie/${id}/rate`}
              className="flex min-w-[140px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-6 bg-blue-600 hover:bg-blue-500 transition-all text-white gap-2 text-sm font-bold shadow-lg shadow-blue-600/20 active:scale-95"
            >
              <PenLine size={18} />
              <span className="truncate">Write a Review</span>
            </Link>
          </div>
        </div>

        {/* Rating Summary Dashboard */}
        {reviews.length > 0 ? (
          <RatingDashboard reviews={reviews} />
        ) : (
          <div className="bg-slate-800/50 border border-white/10 rounded-xl p-8 text-center text-slate-400">
            No reviews yet. Be the first to review!
          </div>
        )}

        {/* Filters & Sort */}
        <div className="flex items-center justify-between px-1">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {["Most Recent", "Highest Rated", "Most Helpful"].map(
              (filter, index) => (
                <button
                  key={filter}
                  className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg px-4 transition-colors text-sm font-medium border
                ${index === 0 ? "bg-slate-800 border-blue-500/50 text-white" : "bg-transparent border-slate-700 text-slate-400 hover:bg-slate-800 hover:text-white"}`}
                >
                  <p>{filter}</p>
                  <ChevronDown size={16} />
                </button>
              ),
            )}
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          {reviews.length > 0 &&
            reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
        </div>

        {/* Pagination */}
        {reviews.length > 0 && (
          <div className="flex justify-center py-8">
            <button className="flex items-center justify-center gap-2 px-8 py-3 rounded-xl border border-white/10 text-white font-bold hover:bg-white/5 transition-all active:scale-95">
              <span>Load more reviews</span>
              <ChevronDown size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
