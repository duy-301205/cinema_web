import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Clapperboard,
  Armchair,
  Popcorn,
  PlayCircle,
  ArrowRight,
} from "lucide-react";

export default function Guide() {
  const navigate = useNavigate();

  // Dữ liệu các bước (Steps)
  const steps = [
    {
      id: 1,
      number: "01",
      title: "Pick Your Movie",
      description:
        "Browse our curated selection of the latest blockbusters and indie gems.",
      icon: <Clapperboard className="w-10 h-10 text-blue-500" />,
    },
    {
      id: 2,
      number: "02",
      title: "Choose Your Seat",
      description:
        "Select your preferred spot in the theater with our interactive seating map.",
      icon: <Armchair className="w-10 h-10 text-blue-500" />,
    },
    {
      id: 3,
      number: "03",
      title: "Grab Your Snacks",
      description:
        "Pre-order popcorn, drinks, and treats to skip the queue at the counter.",
      icon: <Popcorn className="w-10 h-10 text-blue-500" />,
    },
    {
      id: 4,
      number: "04",
      title: "Enjoy the Show",
      description:
        "Sit back, relax, and immerse yourself in the ultimate cinematic experience.",
      icon: <PlayCircle className="w-10 h-10 text-blue-500" />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0b0c15] text-white font-sans flex flex-col selection:bg-blue-500 selection:text-white">
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-[1200px] w-full">
          {/* Header Section */}
          <div className="flex flex-col items-center text-center mb-16">
            <span className="bg-blue-500/20 text-blue-400 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 border border-blue-500/20">
              Onboarding Guide
            </span>
            <h1 className="text-white tracking-tight text-4xl md:text-5xl font-bold leading-tight pb-4">
              Learn More
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl font-normal leading-relaxed">
              Experience the future of cinema booking. Follow these simple steps
              to start your next cinematic adventure with us.
            </p>
          </div>

          {/* Steps Grid */}
          <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className="group relative flex flex-col items-center text-center"
              >
                {/* Icon Container */}
                <div className="relative z-10 flex h-24 w-24 items-center justify-center rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 mb-6 transition-transform group-hover:-translate-y-2 duration-300 shadow-xl shadow-black/20">
                  {step.icon}

                  {/* Notification Badge (Number) */}
                  <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-bold h-7 w-7 flex items-center justify-center rounded-full border-4 border-[#0b0c15]">
                    {step.number}
                  </div>
                </div>

                {/* Text Content */}
                <h3 className="text-white text-xl font-bold mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed px-2">
                  {step.description}
                </p>

                {/* Connector Line (Hiển thị cho tất cả trừ phần tử cuối cùng) */}
                {index !== steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-full h-[1px] bg-gradient-to-r from-blue-500/30 to-transparent -z-0"></div>
                )}
              </div>
            ))}
          </div>

          {/* Final CTA */}
          <div className="flex flex-col items-center mt-20">
            {/* Decorative Divider */}
            <div className="h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent w-full max-w-md mb-12"></div>

            <div className="flex px-4 py-3 justify-center">
              <button
                onClick={() => navigate("/login")}
                className="group flex min-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-8 bg-blue-600 hover:bg-blue-500 text-white text-lg font-bold leading-normal tracking-[0.015em] shadow-lg shadow-blue-500/25 hover:scale-105 transition-all duration-300"
              >
                <span className="truncate">Explore Now</span>
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
            <p className="text-white/40 text-xs mt-4">
              No subscription required to browse.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 md:px-40 py-10 border-t border-white/5 bg-[#0b0c15]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-sm">
            © 2024 CinemaPlatform. All cinematic rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              className="text-white/30 hover:text-white text-sm transition-colors"
              href="#"
            >
              Privacy Policy
            </a>
            <a
              className="text-white/30 hover:text-white text-sm transition-colors"
              href="#"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
