import { useNavigate, useLocation } from "react-router-dom";

export default function AuthModal({ children }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isLogin = pathname === "/login";

  return (
    <div
      className="fixed inset-0 z-50
                 glass-overlay
                 overflow-y-auto"
    >
      <div className="min-h-screen flex items-center justify-center p-4">
        <div
          className="modal-bg w-full max-w-[480px]
                     rounded-xl shadow-2xl
                     border border-white/10
                     relative"
        >
          {/* Close */}
          <button
            onClick={() => navigate("/")}
            className="absolute top-6 right-6 text-[#92adc9] hover:text-white transition"
          >
            ✕
          </button>

          {/* Tabs */}
          <div className="px-8 pt-8 pb-2">
            <div className="flex border-b border-[#324d67]">
              <button
                onClick={() => navigate("/login")}
                className={`flex-1 py-4 text-sm font-bold transition cursor-pointer
                  ${
                    isLogin
                      ? "text-white border-b-[3px] border-primary "
                      : "text-[#92adc9] hover:text-white"
                  }`}
              >
                Sign In
              </button>

              <button
                onClick={() => navigate("/register")}
                className={`flex-1 py-4 text-sm font-bold transition cursor-pointer
                  ${
                    !isLogin
                      ? "text-white border-b-[3px] border-primary"
                      : "text-[#92adc9] hover:text-white"
                  }`}
              >
                Sign Up
              </button>
            </div>
          </div>

          {/* CONTENT */}
          <div className="px-8 py-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
