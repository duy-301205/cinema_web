import React, { useState } from "react";
import {
  Clapperboard,
  User,
  Shield,
  Bell,
  CreditCard,
  Clock,
  LogOut,
  Camera,
  Mail,
  BellRing,
  Megaphone,
  Pencil,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Profile() {
  // 1. Dữ liệu form
  const initialData = {
    fullName: "Alex Thompson",
    email: "alex.thompson@example.com",
    phone: "+1 (555) 000-0000",
    location: "Los Angeles, CA",
    bio: "Cinema enthusiast and occasional popcorn critic.",
  };

  const [formData, setFormData] = useState(initialData);
  const [originalData, setOriginalData] = useState(initialData);
  const [isEditing, setIsEditing] = useState(false);

  // 2. Dữ liệu Notification
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    marketing: false,
  });

  // --- HANDLERS ---
  const handleStartEditing = () => {
    setOriginalData(formData);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData(originalData);
    setIsEditing(false);
  };

  const handleSave = () => {
    // Call API update info...
    setOriginalData(formData);
    setIsEditing(false);
    alert("Personal information updated!");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleNotification = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex font-sans selection:bg-blue-500 selection:text-white">
      {/* --- SIDEBAR --- */}
      <aside className="w-72 bg-[#0b0c15] border-r border-white/5 flex flex-col h-screen sticky top-0 shrink-0">
        <div className="p-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Clapperboard className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              CineReserve
            </span>
          </div>

          <div className="flex items-center gap-4 mb-8 p-1">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12 ring-2 ring-blue-500/30"
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop")',
              }}
            ></div>
            <div className="flex flex-col">
              <h1 className="text-white text-base font-semibold leading-none">
                {formData.fullName}
              </h1>
              <p className="text-slate-400 text-xs font-normal mt-1">
                Premium Member
              </p>
            </div>
          </div>

          <nav className="flex flex-col gap-2">
            <SidebarLink
              icon={<User size={20} />}
              label="Personal Info"
              active
            />
            <SidebarLink icon={<Shield size={20} />} label="Security" />
            <SidebarLink icon={<Bell size={20} />} label="Notifications" />
            <SidebarLink
              icon={<CreditCard size={20} />}
              label="Payment Methods"
            />
            <div className="my-4 border-t border-white/5"></div>
            <SidebarLink icon={<Clock size={20} />} label="Booking History" />
          </nav>
        </div>
        <div className="mt-auto p-8">
          <Link
            to="/login"
            className="flex items-center gap-3 text-red-400/80 hover:text-red-400 text-sm font-medium transition-colors w-full"
          >
            <LogOut size={20} />
            Sign Out
          </Link>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 max-w-5xl mx-auto px-12 py-12 overflow-y-auto">
        <header className="mb-10 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              Account Settings
            </h1>
            <p className="text-slate-400">
              Manage your profile information and cinema preferences.
            </p>
          </div>
        </header>

        {/* SECTION 1: Personal Information */}
        <section className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold">Personal Information</h2>
            <span className="text-xs font-semibold px-3 py-1 bg-white/5 border border-white/10 rounded-full text-slate-400">
              Step 1 of 4
            </span>
          </div>

          {/* Avatar */}
          <div className="flex items-center gap-8 mb-10 pb-8 border-b border-white/5">
            <div className="relative group cursor-pointer">
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-32 ring-4 ring-blue-500/20"
                style={{
                  backgroundImage:
                    'url("https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop")',
                }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="text-white w-8 h-8" />
              </div>
            </div>
            <div>
              <p className="text-white text-lg font-semibold mb-1">
                Profile Photo
              </p>
              <p className="text-slate-400 text-sm mb-4">
                Upload a high-quality JPG, PNG, or GIF. Max 5MB.
              </p>
              <div className="flex gap-3">
                <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-lg text-white text-sm font-semibold transition-all shadow-lg shadow-blue-500/20">
                  Change Photo
                </button>
                <button className="px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white text-sm font-semibold transition-all">
                  Remove
                </button>
              </div>
            </div>
          </div>

          {/* Form Inputs */}
          <form className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <InputField
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
            <InputField
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
            <InputField
              label="Phone Number"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
            <InputField
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              disabled={!isEditing}
            />
            <div className="col-span-1 md:col-span-2 flex flex-col gap-2 mt-2">
              <label className="text-sm font-medium text-slate-400 px-1">
                Bio
              </label>
              <textarea
                name="bio"
                className={`w-full rounded-xl px-4 py-3.5 text-white outline-none transition-all resize-none 
                  ${
                    isEditing
                      ? "bg-[#192233] border border-[#324467] focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500"
                      : "bg-transparent border border-transparent text-slate-300 cursor-not-allowed pl-0"
                  }`}
                rows="3"
                value={formData.bio}
                onChange={handleInputChange}
                disabled={!isEditing}
              ></textarea>
            </div>
          </form>

          {/* --- NÚT EDIT/SAVE ĐƯỢC CHUYỂN VÀO ĐÂY --- */}
          <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-white/5">
            {!isEditing ? (
              <button
                onClick={handleStartEditing}
                className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all transform hover:scale-105 active:scale-95"
              >
                <Pencil size={16} />
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  onClick={handleCancel}
                  className="px-6 py-3 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-xl font-semibold transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all transform active:scale-[0.98]"
                >
                  Save Changes
                </button>
              </>
            )}
          </div>
        </section>

        {/* SECTION 2: Notification Preferences */}
        <section className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 mb-8">
          <h2 className="text-xl font-bold mb-6">Notification Preferences</h2>
          <div className="flex flex-col gap-5">
            <NotificationItem
              icon={<Mail size={20} />}
              title="Email Notifications"
              description="Get booking confirmations and ticket updates via email."
              checked={notifications.email}
              onChange={() => toggleNotification("email")}
            />
            <NotificationItem
              icon={<BellRing size={20} />}
              title="Push Notifications"
              description="Instant alerts about new movie releases and offers."
              checked={notifications.push}
              onChange={() => toggleNotification("push")}
            />
            <NotificationItem
              icon={<Megaphone size={20} />}
              title="Marketing Offers"
              description="Occasional newsletters and seasonal cinema discounts."
              checked={notifications.marketing}
              onChange={() => toggleNotification("marketing")}
            />
          </div>
        </section>

        {/* SECTION 3: Bottom Actions (Chỉ còn Deactivate) */}
        <div className="flex flex-col pb-12">
          <div className="pt-8 border-t border-white/5 flex items-center justify-between">
            <div>
              <h3 className="text-red-400 font-semibold mb-1">
                Deactivate Account
              </h3>
              <p className="text-slate-400 text-sm">
                Once you deactivate, your cinema rewards and history will be
                lost.
              </p>
            </div>
            <button className="px-6 py-2.5 border border-red-400/30 text-red-400 hover:bg-red-400/10 rounded-lg text-sm font-semibold transition-all">
              Deactivate
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

// --- Helper Components ---

const SidebarLink = ({ icon, label, active = false, href = "#" }) => (
  <a
    href={href}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
      active
        ? "bg-blue-500/10 text-blue-500 border border-blue-500/20"
        : "text-slate-400 hover:bg-white/5 hover:text-white"
    }`}
  >
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </a>
);

const InputField = ({ label, type = "text", disabled, ...props }) => (
  <div className="flex flex-col gap-2">
    <label className="text-sm font-medium text-slate-400 px-1">{label}</label>
    <input
      type={type}
      disabled={disabled}
      className={`w-full rounded-xl px-4 py-3.5 text-white outline-none transition-all 
        ${
          disabled
            ? "bg-white/5 border border-transparent text-slate-400 cursor-not-allowed"
            : "bg-[#192233] border border-[#324467] focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 placeholder:text-[#4e648f]"
        }`}
      {...props}
    />
  </div>
);

const NotificationItem = ({ icon, title, description, checked, onChange }) => (
  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
    <div className="flex gap-4">
      <div className="text-blue-500 bg-blue-500/10 p-2 rounded-lg h-fit">
        {icon}
      </div>
      <div>
        <p className="font-semibold text-white">{title}</p>
        <p className="text-xs text-slate-400">{description}</p>
      </div>
    </div>
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={onChange}
      />
      <div className="w-11 h-6 bg-[#324467] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
    </label>
  </div>
);
