// offersData.js

export const filterCategories = [
    { id: 'all', label: 'All Offers', icon: 'LayoutGrid' },
    { id: 'food', label: 'Food & Drink', icon: 'Utensils' },
    { id: 'family', label: 'Family', icon: 'Users' },
    { id: 'exclusive', label: 'Exclusive', icon: 'Star' },
    { id: 'student', label: 'Student', icon: 'GraduationCap' },
];

export const promotions = [
    // --- 1. Family (Gia đình) ---
    {
        id: 1,
        title: "Family Bundle",
        price: "$45",
        description: "4 Tickets + 2 Large Popcorns + 4 Soft Drinks. Perfect for a weekend outing.",
        image: "https://burgerkingks.com/wp-content/uploads/2021/09/Family-Bundle-WEBOFFER-31.05.jpg",
        tag: "Popular",
        tagColor: "bg-green-500",
        points: "+200 Points",
        validity: "Valid until end of month",
        iconType: "Calendar",
        category: "family",
        btnText: "Claim Offer",
        btnColor: "bg-[#233648] hover:bg-[#2e475e] text-white"
    },
    // --- 2. Student (Học sinh/Sinh viên) ---
    {
        id: 2,
        title: "Student Discount",
        price: "$10",
        description: "Flash your valid student ID for $10 tickets every Tuesday. Available for all movies.",
        image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=2000&auto=format&fit=crop",
        tag: "Weekly",
        tagColor: "bg-blue-600",
        points: "+50 Points",
        validity: "Every Tuesday • All Day",
        iconType: "Clock",
        category: "student",
        btnText: "Book Now",
        btnColor: "bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/20"
    },
    // --- 3. Exclusive (Khung giờ sáng) ---
    {
        id: 3,
        title: "Weekday Matinee",
        price: "$7",
        description: "Enjoy morning shows at a fraction of the price. Start your day with big-screen magic.",
        image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2000&auto=format&fit=crop",
        tag: "Early Bird",
        tagColor: "bg-orange-500",
        points: "+100 Points",
        validity: "Mon-Thu • Before 12 PM",
        iconType: "AlarmClock",
        category: "exclusive",
        btnText: "Book Now",
        btnColor: "bg-[#233648] hover:bg-[#2e475e] text-white"
    },
    // --- 4. Food & Drink (Cặp đôi) ---
    {
        id: 4,
        title: "Date Night Combo",
        price: "$30",
        description: "2 Premium Tickets + 1 Sweet Popcorn + 2 Glasses of Wine (or Soft Drinks).",
        image: "https://i.pinimg.com/originals/18/da/d4/18dad419d00060e33f6defd28b4721e2.jpg",
        tag: "Sweet Deal",
        tagColor: "bg-pink-500",
        points: "+150 Points",
        validity: "Fri-Sun • Evenings",
        iconType: "Wine",
        category: "food",
        btnText: "Get Combo",
        btnColor: "bg-pink-600 hover:bg-pink-700 text-white shadow-md shadow-pink-600/20"
    },
    // --- 5. Exclusive (VIP) ---
    {
        id: 5,
        title: "VIP Gold Experience",
        price: "$50",
        description: "Recliner seats, blanket service, and unlimited gourmet snacks served at your seat.",
        image: "https://assets.voxcinemas.com/content/gold-carousel-Avengers_1521973095.jpg",
        tag: "Luxury",
        tagColor: "bg-purple-600",
        points: "+500 Points",
        validity: "All Week • Gold Hall",
        iconType: "Ticket",
        category: "exclusive",
        btnText: "Upgrade Now",
        btnColor: "bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-600/20"
    },
    // --- 6. Student (Khung giờ đêm) ---
    {
        id: 6,
        title: "Midnight Madness",
        price: "$8",
        description: "Late-night screenings for horror and action movies. Adrenaline rush guaranteed.",
        image: "https://imageresizer.furnituredealer.net/img/remote/images.furnituredealer.net/b/p/a1e18853-5f6b-4575-b42b-6c376b416583/assets/b8e782e2d0ff416bac654f05af75d13a.jpeg?format=webp&quality=85",
        tag: "Thriller",
        tagColor: "bg-red-600",
        points: "+80 Points",
        validity: "Fri & Sat • After 11 PM",
        iconType: "Clock",
        category: "student",
        btnText: "Book Seats",
        btnColor: "bg-[#233648] hover:bg-[#2e475e] text-white"
    }
];
export const concessions = [
    {
        id: 1,
        title: "Pizza Combo",
        subtext: "SAVE 15%",
        icon: "Pizza",
        category: "food"
    },
    {
        id: 2,
        title: "Sweet Treat",
        subtext: "BUY 1 GET 1",
        icon: "IceCream",
        category: "food"
    },
    {
        id: 3,
        title: "Date Night",
        subtext: "FREE REFILLS",
        icon: "Wine",
        category: "food"
    },
    {
        id: 4,
        title: "Group Booking",
        subtext: "20+ TICKETS",
        icon: "Ticket",
        category: "exclusive"
    }
];