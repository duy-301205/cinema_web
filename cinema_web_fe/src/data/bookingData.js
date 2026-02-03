// bookingData.js
export const MOVIES_DATA = [
    {
        id: 1,
        title: "Dune: Part Two",
        image: "https://m.media-amazon.com/images/M/MV5BNTc0YmQxMjEtODI5MC00NjFiLTlkMWUtOGQ5NjFmYWUyZGJhXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        heroBg: "https://tse3.mm.bing.net/th/id/OIP.RK-X7iwdWGFVJHi1WgtIJgHaEK?pid=Api&P=0&h=220",
        rating: 8.9,
        reviews: "850K",
        duration: "2h 46m",
        year: "2024",
        genres: ["Action", "Sci-Fi", "Adventure"],
        type: "now",
        synopsis: "Paul Atreides unites with Chani and the Fremen...",
        director: { name: "Denis Villeneuve", role: "Director, Writer", image: "..." },
        cast: [],
        info: { language: "English (EN)", releaseDate: "Mar 1, 2024", studio: "Warner Bros.", budget: "$190M" }
    },
    {
        id: 4,
        title: "Godzilla x Kong",
        image: "https://m.media-amazon.com/images/S/pv-target-images/adee7690c6d6455b655a5dbc4d58899a763285cab13491519b0b03470d4bd7f8.jpg",
        heroBg: "https://tse4.mm.bing.net/th/id/OIP.2tE2cVLAKJ-CdwnAYSvn7gHaDt?pid=Api&P=0&h=220",
        rating: 7.5,
        reviews: "200K",
        duration: "1h 55m",
        year: "2024",
        genres: ["Action", "Sci-Fi", "Adventure"],
        type: "now",
        synopsis: "Hai thực thể cổ đại Godzilla và Kong...",
        director: { name: "Adam Wingard", role: "Director", image: "..." },
        cast: [],
        info: { language: "English (EN)", releaseDate: "Mar 29, 2024", studio: "Legendary Pictures", budget: "$135M" }
    },
    {
        id: 5,
        title: "Mai",
        image: "https://m.media-amazon.com/images/M/MV5BNzM0MTY2MjEtM2QxNy00ZTg2LTk0MmEtZmVmY2JlNTNlMzBjXkEyXkFqcGc@._V1_.jpg",
        heroBg: "https://tse2.mm.bing.net/th/id/OIP.mjGZ-tVCJQCLUWAg4YntpAHaEK?pid=Api&P=0&h=220",
        rating: 8.5,
        reviews: "300K",
        duration: "2h 11m",
        year: "2024",
        genres: ["Drama", "Romance"],
        type: "now",
        synopsis: "Mai là câu chuyện về một người phụ nữ...",
        director: { name: "Trấn Thành", role: "Director, Producer", image: "..." },
        cast: [],
        info: { language: "Vietnamese (VN)", releaseDate: "Feb 10, 2024", studio: "CJ HK Entertainment", budget: "$2M" }
    },
    {
        id: 3,
        title: "Exhuma",
        image: "http://www.elle.vn/app/uploads/2024/11/27/621452/poster-phim-han-quat-mo-trung-ma.jpg",
        heroBg: "https://tse4.mm.bing.net/th/id/OIP.hg2Ic69daBySIi9qsyoOVQHaEK?pid=Api&P=0&h=220",
        rating: 8.2,
        reviews: "45K",
        duration: "2h 14m",
        year: "2024",
        genres: ["Horror", "Mystery", "Thriller"],
        type: "now",
        synopsis: "Quá trình khai quật một ngôi mộ tổ tiên...",
        director: { name: "Jang Jae-hyun", role: "Director", image: "..." },
        cast: [],
        info: { language: "Korean (KR)", releaseDate: "Feb 22, 2024", studio: "Showbox", budget: "$10M" }
    },
];

// 2. STATS DATA (Dữ liệu thống kê)
export const stats = [
    {
        label: "Upcoming Movies",
        value: "2 Active",
        icon: "Ticket",
        color: "text-blue-500",
        borderColor: "border-l-blue-500",
    },
    {
        label: "Loyalty Points",
        value: "1,250",
        unit: "pts",
        icon: "Star",
        color: "text-purple-500",
        borderColor: "border-l-purple-500",
    },
    {
        label: "Theaters Visited",
        value: "8 Locations",
        icon: "MapPin",
        color: "text-emerald-500",
        borderColor: "border-l-emerald-500",
    },
];

// 3. MAP DATA CHO UPCOMING (Dùng Dune 2 & Godzilla x Kong)
// Giả lập người dùng đã đặt vé cho 2 phim này
export const upcomingBookings = [
    {
        bookingId: "CP-88219",
        movie: MOVIES_DATA.find(m => m.id === 1), // Dune: Part Two
        date: "Sunday, Oct 22",
        time: "07:30 PM",
        hall: "Hall 4 • IMAX",
        seats: "Row F, 12-13",
        status: "Confirmed",
        statusColor: "bg-emerald-500/20 text-emerald-400",
        price: "240.000đ"
    },
    {
        bookingId: "CP-88344",
        movie: MOVIES_DATA.find(m => m.id === 4), // Godzilla x Kong
        date: "Monday, Oct 23",
        time: "09:15 PM",
        hall: "Hall 1 • Gold Class",
        seats: "Row B, 04",
        status: "Payment Pending",
        statusColor: "bg-amber-500/20 text-amber-400",
        price: "180.000đ"
    },
];

// 4. MAP DATA CHO PAST HISTORY (Dùng Mai & Exhuma)
// Giả lập người dùng đã xem 2 phim này
export const pastBookings = [
    {
        bookingId: "CP-77123",
        movie: MOVIES_DATA.find(m => m.id === 5), // Mai
        watchedDate: "Watched • Feb 14, 2024",
        userRating: 5, // Điểm người dùng đánh giá
        theater: "CGV Vincom"
    },
    {
        bookingId: "CP-77005",
        movie: MOVIES_DATA.find(m => m.id === 3), // Exhuma
        watchedDate: "Watched • Mar 05, 2024",
        userRating: 4,
        theater: "Galaxy Cinema"
    },
];