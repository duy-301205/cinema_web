import AuthModal from "../components/AuthModal";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault(); // Chặn load lại trang mặc định của form

    console.log("Đăng nhập thành công!");

    // Chuyển hướng sang home
    navigate("/home");
  };
  return (
    <AuthModal>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="text-sm text-white">Email</label>
          <input
            type="email"
            placeholder="name@example.com"
            className="w-full h-12 mt-1 px-4 rounded-lg bg-[#111a22]
                       border border-[#324d67] text-white
                       focus:ring-1 focus:ring-primary focus:border-primary outline-none"
          />
        </div>

        <div>
          <label className="text-sm text-white">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full h-12 mt-1 px-4 rounded-lg bg-[#111a22]
                       border border-[#324d67] text-white
                       focus:ring-1 focus:ring-primary focus:border-primary outline-none"
          />
        </div>

        <div className="flex justify-end mt-2">
          <button
            type="button"
            className="text-sm text-blue-500 hover:underline cursor-pointer"
          >
            {" "}
            Forgot Password?
          </button>
        </div>

        <div className="pt-2">
          <button
            className="w-full bg-blue-600 hover:bg-blue-700
                       text-white font-semibold py-4
                       rounded-xl transition cursor-pointer"
          >
            Sign In
          </button>
        </div>

        {/* 🔹 OR CONTINUE WITH */}
        <div className="flex items-center gap-4 my-3">
          <div className="flex-1 h-px bg-slate-700" />
          <span className="text-sm text-slate-400 tracking-wider">
            OR CONTINUE WITH
          </span>
          <div className="flex-1 h-px bg-slate-700" />
        </div>

        {/* 🔹 SOCIAL LOGIN */}
        <div className="grid grid-cols-3 gap-4">
          {/* Google */}
          <button
            type="button"
            className="flex items-center justify-center
               py-3 rounded-xl
               bg-slate-900 border border-slate-700
               hover:bg-slate-800 transition
               cursor-pointer"
          >
            <FcGoogle className="w-6 h-6" />
          </button>

          {/* Apple */}
          <button
            type="button"
            className="flex items-center justify-center
               py-3 rounded-xl
               bg-slate-900 border border-slate-700
               hover:bg-slate-800 transition
               cursor-pointer"
          >
            <FaApple className="w-6 h-6 text-white" />
          </button>

          {/* Facebook */}
          <button
            type="button"
            className="flex items-center justify-center
               py-3 rounded-xl
               bg-slate-900 border border-slate-700
               hover:bg-slate-800 transition
               cursor-pointer"
          >
            <FaFacebook className="w-6 h-6 text-[#1877F2]" />
          </button>
        </div>
      </form>
    </AuthModal>
  );
}
