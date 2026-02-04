import React, { useState, useMemo } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom"; // Thêm hook để nhận/chuyển dữ liệu
import { Plus, ArrowRight, ShoppingBasket, X, ChevronLeft } from "lucide-react";
import { categories, products } from "../data/productsFood";

export default function FoodCinema() {
  const location = useLocation();
  const navigate = useNavigate();

  // 1. Nhận dữ liệu từ trang Booking gửi qua
  const bookingData = location.state || {};
  const {
    movieTitle,
    movieImage,
    selectedSeats,
    totalTicketPrice,
    selectedDate,
    selectedTime,
    movieId,
  } = bookingData;

  const [activeCategory, setActiveCategory] = useState("all");
  const [deliveryType, setDeliveryType] = useState("seat");
  const [cart, setCart] = useState([]);

  // Chặn nếu người dùng vào trang này trực tiếp mà không qua trang Booking
  if (!movieId) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#0a0a0a] text-white">
        <h2 className="text-xl font-bold mb-4">No booking data found!</h2>
        <Link to="/home" className="text-orange-500 underline">
          Return to Home
        </Link>
      </div>
    );
  }

  // Logic: Thêm vào giỏ hàng
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item,
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const filteredProducts = useMemo(() => {
    return activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const subtotalFood = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  );
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  // 2. Tính tổng tiền cuối cùng (Vé + Đồ ăn)
  const finalTotal = totalTicketPrice + subtotalFood;

  // 3. Hàm xác nhận chuyển sang thanh toán
  const handleConfirm = () => {
    navigate("/payment", {
      state: {
        ...bookingData, // Giữ lại thông tin phim, ghế
        foodItems: cart, // Thêm danh sách đồ ăn
        subtotalFood: subtotalFood,
        totalPrice: finalTotal, // Tổng tiền mới
        deliveryType: deliveryType,
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-orange-500/30 font-sans">
      <main className="max-w-7xl mx-auto px-6 md:px-20 py-10 pb-40">
        {/* Nút Quay lại trang Booking */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white/40 hover:text-white mb-8 transition-colors text-sm font-bold uppercase tracking-widest"
        >
          <ChevronLeft size={16} /> Back to Seat Selection
        </button>

        {/* Header - Hiển thị tóm tắt phim đang đặt */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 border-b border-white/5 pb-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={movieImage}
                alt=""
                className="w-12 h-16 object-cover rounded-md border border-white/10"
              />
              <div>
                <h1 className="text-3xl md:text-4xl font-black tracking-tight italic text-orange-500 uppercase">
                  {movieTitle}
                </h1>
                <p className="text-white/40 text-sm font-bold uppercase">
                  {selectedDate} • {selectedTime} • Seats:{" "}
                  {selectedSeats?.join(", ")}
                </p>
              </div>
            </div>
            <p className="text-white/60 text-lg">
              Hungry? Skip the lines. Pre-order your snacks now.
            </p>
          </div>

          <div className="flex gap-2 bg-white/5 p-1 rounded-full border border-white/10">
            {["seat", "counter"].map((type) => (
              <button
                key={type}
                onClick={() => setDeliveryType(type)}
                className={`px-6 py-2 rounded-full text-xs font-black uppercase transition-all ${
                  deliveryType === type
                    ? "bg-orange-500 text-white"
                    : "text-white/40 hover:bg-white/5"
                }`}
              >
                {type === "seat" ? "Delivery to Seat" : "Counter Pickup"}
              </button>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-3 mb-10 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex h-11 shrink-0 items-center justify-center gap-3 rounded-full px-6 text-sm font-semibold transition-all border
                ${
                  activeCategory === cat.id
                    ? "bg-orange-500 text-white border-orange-400 shadow-lg shadow-orange-500/20"
                    : "bg-white/5 text-white/60 border-white/5 hover:bg-white/10 hover:text-white"
                }`}
            >
              <cat.icon size={18} strokeWidth={2.5} />
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((item) => (
            <div
              key={item.id}
              className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col group transition-all hover:border-orange-500/40 hover:bg-white/[0.07]"
            >
              <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-5">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${item.img})` }}
                />
                {item.tag && (
                  <span className="absolute top-3 right-3 bg-orange-500 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                    {item.tag}
                  </span>
                )}
              </div>

              <h3 className="text-xl font-bold mb-1 tracking-tight group-hover:text-orange-400">
                {item.name}
              </h3>
              <p className="text-white/40 text-sm mb-6 line-clamp-2 italic">
                {item.desc}
              </p>

              <div className="mt-auto space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-white tracking-tighter">
                    ${item.price.toFixed(2)}
                  </span>
                  <button
                    onClick={() => addToCart(item)}
                    className="bg-orange-500 text-white w-12 h-12 rounded-2xl flex items-center justify-center hover:scale-110 active:scale-90 transition-all shadow-lg shadow-orange-500/20"
                  >
                    <Plus size={24} strokeWidth={3} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Floating Order Bar */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-black/80 backdrop-blur-3xl border-t border-white/10 transition-transform duration-500 ${
          // Luôn hiện thanh này nếu đã có vé hoặc có đồ ăn
          totalItems > 0 || totalTicketPrice > 0
            ? "translate-y-0"
            : "translate-y-full"
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="bg-orange-500 p-3 rounded-2xl text-white shadow-lg">
                  <ShoppingBasket size={28} />
                </div>
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-white text-black text-[11px] font-black w-6 h-6 flex items-center justify-center rounded-full ring-4 ring-[#0a0a0a]">
                    {totalItems}
                  </span>
                )}
              </div>
              <div>
                <p className="text-[10px] text-white/40 font-black uppercase tracking-widest">
                  Total Summary
                </p>
                <p className="text-lg font-black tracking-tight uppercase">
                  {selectedSeats?.length} Tickets{" "}
                  {totalItems > 0 && `+ ${totalItems} Snacks`}
                </p>
              </div>
            </div>

            <div className="h-12 w-[1px] bg-white/10 hidden md:block" />

            {/* Chi tiết đồ ăn đã chọn */}
            <div className="hidden lg:flex gap-3 overflow-x-auto max-w-md scrollbar-hide">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-white/5 px-4 py-2 rounded-xl border border-white/5 text-[10px] font-black uppercase flex items-center gap-3 shrink-0"
                >
                  <span className="text-orange-500">{item.qty}x</span>
                  <span className="text-white/80">{item.name}</span>
                  <X
                    size={14}
                    onClick={() => removeFromCart(item.id)}
                    className="text-white/20 cursor-pointer hover:text-red-500"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-10 w-full sm:w-auto border-t sm:border-t-0 pt-4 sm:pt-0">
            <div className="text-right">
              <p className="text-[10px] text-white/40 font-black uppercase tracking-widest">
                Grand Total
              </p>
              <p className="text-3xl font-black text-orange-500 leading-none tracking-tighter">
                ${finalTotal.toFixed(2)}
              </p>
            </div>
            <button
              onClick={handleConfirm}
              className="bg-orange-500 hover:bg-orange-600 transition-all text-white px-10 h-14 rounded-2xl font-black flex items-center gap-3 flex-1 sm:flex-none justify-center shadow-xl shadow-orange-500/20 group uppercase text-sm tracking-widest"
            >
              Checkout
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
