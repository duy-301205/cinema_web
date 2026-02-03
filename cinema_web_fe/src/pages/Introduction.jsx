import React from "react";
import {
  ChevronDown,
  ArrowRight,
  Ticket,
  Speaker,
  Crown,
  Clapperboard,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Introduction() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/login");
  };
  return (
    <div className="bg-slate-950 min-h-screen font-sans text-slate-200 selection:bg-cyan-500 selection:text-white overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Overlay & Image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/60 to-slate-950 z-10"></div>
          <div
            className="w-full h-full bg-cover bg-center transition-transform duration-1000 hover:scale-105"
            style={{
              backgroundImage:
                'url("https://veja.abril.com.br/wp-content/uploads/2018/04/sala-de-cinema-uci.jpg")',
            }}
            aria-label="Cinematic wide shot of a luxury modern movie theater"
          ></div>
        </div>

        <div className="relative z-20 container mx-auto px-4 flex flex-col items-center text-center gap-8">
          <div className="flex flex-col gap-4 max-w-4xl">
            <h1 className="text-white text-5xl md:text-7xl font-black leading-[1.1] tracking-[-0.04em] drop-shadow-[0_0_25px_rgba(6,182,212,0.5)]">
              The Future of Cinema, Reimagined
            </h1>
            <p className="text-white/70 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
              Experience storytelling like never before with the world's most
              advanced web cinema platform. Unmatched quality, anytime,
              anywhere.
            </p>
          </div>

          <div className="flex flex-col items-center gap-6">
            <button
              onClick={handleGetStarted}
              className="flex min-w-[200px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-8 bg-cyan-500 text-white text-lg font-bold transition-all hover:scale-105 hover:bg-cyan-400 active:scale-95 shadow-2xl shadow-cyan-500/30"
            >
              <span className="truncate">Discover More</span>
            </button>

            <div className="flex flex-col items-center gap-2 animate-bounce mt-10 opacity-50">
              <span className="text-xs uppercase tracking-widest font-bold">
                Scroll Down
              </span>
              {/* Thay thế: expand_more -> ChevronDown */}
              <ChevronDown className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        {/* Bottom Accent */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-950 to-transparent z-10"></div>
      </section>

      {/* Mission Section */}
      <section className="relative py-24 bg-slate-950 overflow-hidden">
        {/* Glow Accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>

        <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
          <h4 className="text-cyan-500 text-sm font-bold uppercase tracking-[0.3em] mb-6">
            Our Mission
          </h4>
          <h2 className="text-white text-3xl md:text-4xl font-bold leading-tight mb-8">
            To bridge the gap between technology and the silver screen,
            providing the ultimate movie-going experience through innovation,
            comfort, and cinematic excellence.
          </h2>
          <div className="w-24 h-1 bg-cyan-500/40 mx-auto rounded-full"></div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="bg-slate-950 py-20 px-4 md:px-10 lg:px-40">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <div className="flex flex-col gap-4 max-w-xl">
              <h2 className="text-white text-4xl md:text-5xl font-black leading-tight tracking-[-0.03em]">
                Redefining the Silver Screen
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                We combine cutting-edge technology with the magic of movies to
                create an unparalleled viewing experience.
              </p>
            </div>
            <button className="group flex items-center gap-2 text-cyan-500 font-bold text-lg hover:text-white transition-colors">
              View Technical Specs
              {/* Thay thế: arrow_forward -> ArrowRight */}
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl flex flex-col gap-6 hover:border-cyan-500/50 transition-all group hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/10">
              <div
                className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl overflow-hidden relative"
                style={{
                  backgroundImage:
                    'url("https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1000&auto=format&fit=crop")',
                }}
              >
                <div className="absolute inset-0 bg-cyan-500/10 group-hover:bg-transparent transition-colors duration-300"></div>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-3">
                  {/* Thay thế: confirmation_number -> Ticket */}
                  <Ticket className="w-7 h-7 text-cyan-500" />
                  <h3 className="text-white text-xl font-bold leading-normal">
                    Seamless Booking
                  </h3>
                </div>
                <p className="text-slate-400 text-base font-normal leading-relaxed">
                  One-tap seat selection and instant digital tickets with
                  contactless entry across all our premium locations worldwide.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl flex flex-col gap-6 hover:border-cyan-500/50 transition-all group hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/10">
              <div
                className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl overflow-hidden relative"
                style={{
                  backgroundImage:
                    'url("https://m.media-amazon.com/images/I/81M9g3GdjFL._AC_.jpg")',
                }}
              >
                <div className="absolute inset-0 bg-cyan-500/10 group-hover:bg-transparent transition-colors duration-300"></div>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-3">
                  {/* Thay thế: surround_sound -> Speaker */}
                  <Speaker className="w-7 h-7 text-cyan-500" />
                  <h3 className="text-white text-xl font-bold leading-normal">
                    Premium Sound & Vision
                  </h3>
                </div>
                <p className="text-slate-400 text-base font-normal leading-relaxed">
                  Immerse yourself in IMAX, 4DX, and Dolby Atmos with crystal
                  clear audio and visuals that transport you directly into the
                  film.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl flex flex-col gap-6 hover:border-cyan-500/50 transition-all group hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-500/10">
              <div
                className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl overflow-hidden relative"
                style={{
                  backgroundImage:
                    'url("https://uk.moyens.net/wp-content/uploads/2025/11/1762890007_November-2025-Roblox-Archived-Codes-Unlock-Exclusive-Rewards.jpg")',
                }}
              >
                <div className="absolute inset-0 bg-cyan-500/10 group-hover:bg-transparent transition-colors duration-300"></div>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-3">
                  {/* Thay thế: hotel_class -> Crown (cho cảm giác VIP/Premium) */}
                  <Crown className="w-7 h-7 text-cyan-500" />
                  <h3 className="text-white text-xl font-bold leading-normal">
                    Exclusive Rewards
                  </h3>
                </div>
                <p className="text-slate-400 text-base font-normal leading-relaxed">
                  Access member-only premieres, luxury lounges, and personalized
                  perks that make every visit a red-carpet experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer-like CTA Section */}
      <section className="bg-slate-950 py-20 px-4 md:px-10 lg:px-40 relative">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-cyan-500/20 to-transparent pointer-events-none"></div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 md:p-20 text-center flex flex-col items-center gap-8 relative overflow-hidden">
          {/* Decorative Glow Orbs */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-500/20 blur-[100px] rounded-full"></div>
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-500/20 blur-[100px] rounded-full"></div>

          <h2 className="text-white text-4xl md:text-5xl font-black max-w-3xl leading-tight relative z-10">
            Ready to step into the future of cinematic storytelling?
          </h2>
          <div className="flex flex-wrap justify-center gap-4 relative z-10">
            <button
              onClick={handleGetStarted}
              className="bg-cyan-500 hover:bg-cyan-400 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-xl shadow-cyan-500/30 transition-all hover:scale-105 cursor-pointer"
            >
              Get Started
            </button>
            <button
              onClick={() => navigate("/guide")}
              className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-10 py-4 rounded-xl font-bold text-lg backdrop-blur-md transition-all hover:scale-105 cursor-pointer"
            >
              Learn More
            </button>
          </div>
        </div>

        <footer className="mt-20 pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
          <div className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity cursor-default">
            {/* Thay thế: movie -> Clapperboard */}
            <Clapperboard className="w-6 h-6 text-cyan-500" />
            <span className="font-bold tracking-tight text-white">
              Web Cinema.
            </span>
            <span className="text-xs text-slate-400">
              © 2024 All Rights Reserved.
            </span>
          </div>
          <div className="flex gap-8 text-sm opacity-50 font-medium text-slate-300">
            <a className="hover:text-cyan-500 transition-colors" href="#">
              Privacy Policy
            </a>
            <a className="hover:text-cyan-500 transition-colors" href="#">
              Terms of Service
            </a>
            <a className="hover:text-cyan-500 transition-colors" href="#">
              Contact Us
            </a>
          </div>
        </footer>
      </section>
    </div>
  );
}
