export const MOVIES_DATA = [
    // --- PHIM ĐANG CHIẾU (NOW SHOWING) ---
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
        synopsis: "Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, he endeavors to prevent a terrible future only he can foresee.",
        director: {
            name: "Denis Villeneuve",
            role: "Director, Writer",
            image: "https://tse4.mm.bing.net/th/id/OIP.QNWH9hQLgRpG-I6OQkahvAHaHa?pid=Api&P=0&h=220"
        },
        cast: [
            { name: "Timothée Chalamet", role: "Paul Atreides", img: "https://tse2.mm.bing.net/th?id=OIF.e38d%2fs7eGanaBXwz9Ccv%2fg&pid=Api&P=0&h=220" },
            { name: "Zendaya", role: "Chani", img: "https://www.nme.com/wp-content/uploads/2024/01/Zendaya-main.jpg" },
            { name: "Rebecca Ferguson", role: "Lady Jessica", img: "https://tse1.mm.bing.net/th/id/OIP.4Njh8sGEMyAJKHH75IxiOQHaEK?pid=Api&P=0&h=220" }
        ],
        info: { language: "English (EN)", releaseDate: "Mar 1, 2024", studio: "Warner Bros.", budget: "$190M" }
    },
    {
        id: 2,
        title: "Kung Fu Panda 4",
        image: "https://m.media-amazon.com/images/S/pv-target-images/c6fb58055b3649eae203ec37aa4825594dad40fcaa8360bd2a09a9cffb7c7917.jpg",
        heroBg: "https://tse1.mm.bing.net/th/id/OIP.HMXXKrUMcAa7RJjokt4ttAHaEK?pid=Api&P=0&h=220",
        rating: 7.1,
        reviews: "120K",
        duration: "1h 34m",
        year: "2024",
        genres: ["Animation", "Adventure", "Comedy"],
        type: "now",
        synopsis: "Sau khi Po được chọn trở thành Thủ lĩnh tinh thần của Thung lũng Bình Yên, cậu cần tìm và huấn luyện một Chiến binh Rồng mới, trong khi một nữ pháp sư độc ác lên kế hoạch triệu hồi tất cả những kẻ phản diện mà Po đã đánh bại về cõi linh hồn.",
        director: { name: "Mike Mitchell", role: "Director", image: "https://tse2.mm.bing.net/th/id/OIP.fXMb8wXdZyaQ4ft5d4DRgwHaLH?pid=Api&P=0&h=220" },
        cast: [
            { name: "Jack Black", role: "Po (voice)", img: "https://tse1.mm.bing.net/th/id/OIP.x-8LG09ihFRAUHQoYQz3jwHaE8?pid=Api&P=0&h=220" },
            { name: "Awkwafina", role: "Zhen (voice)", img: "https://tse4.mm.bing.net/th/id/OIP.Ecis0kQq-V2CILadxko5NwHaJG?pid=Api&P=0&h=220" }
        ],
        info: { language: "English (EN)", releaseDate: "Mar 8, 2024", studio: "DreamWorks", budget: "$85M" }
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
        synopsis: "Quá trình khai quật một ngôi mộ tổ tiên đã giải phóng những hậu quả kinh hoàng ẩn giấu bên dưới, buộc hai pháp sư, một thầy phong thủy và một người làm nghề mai táng phải hợp lực đối đầu với thế lực tâm linh huyền bí.",
        director: { name: "Jang Jae-hyun", role: "Director", image: "https://tse4.mm.bing.net/th/id/OIP.1bNKE2TXdjOoKqvvToTM9QHaFI?pid=Api&P=0&h=220" },
        cast: [
            { name: "Choi Min-sik", role: "Sang-deok", img: "https://tse1.mm.bing.net/th/id/OIP.27JKI1V7sFq9skuspPA0lgAAAA?pid=Api&P=0&h=220" },
            { name: "Kim Go-eun", role: "Hwa-rim", img: "https://tse3.mm.bing.net/th/id/OIP.04dQd7nAbt-qIJ54tZuMcwHaJ4?pid=Api&P=0&h=220" },
            { name: "Lee Do-hyun", role: "Bong-gil", img: "https://tse2.mm.bing.net/th/id/OIP.WUA4DtnV7RbExEkEfKgsbAHaLH?pid=Api&P=0&h=220" }
        ],
        info: { language: "Korean (KR)", releaseDate: "Feb 22, 2024", studio: "Showbox", budget: "$10M" }
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
        synopsis: "Hai thực thể cổ đại Godzilla và Kong phải gạt bỏ hiềm khích để cùng chống lại một mối đe dọa khổng lồ mới đang ẩn mình trong thế giới của chúng ta, đe dọa sự tồn vong của nhân loại.",
        director: { name: "Adam Wingard", role: "Director", image: "https://tse2.mm.bing.net/th/id/OIP.5NJg9uefkDIv9G_cwJVRyQHaE7?pid=Api&P=0&h=220" },
        cast: [
            { name: "Rebecca Hall", role: "Ilene Andrews", img: "https://tse4.mm.bing.net/th/id/OIP.cK4cFsrCTEtYFrTzjIQtQQHaJu?pid=Api&P=0&h=220" },
            { name: "Dan Stevens", role: "Trapper", img: "https://tse4.mm.bing.net/th/id/OIP.bwLLOQ6-stv5KgvcvNOLBgHaKn?pid=Api&P=0&h=220" }
        ],
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
        synopsis: "Mai là câu chuyện về một người phụ nữ làm nghề massage đang cố gắng tìm kiếm hạnh phúc và sự chấp nhận trong một xã hội vẫn còn nhiều định kiến, cho đến khi cô gặp Dương - một chàng trai trẻ phong lưu.",
        director: { name: "Trấn Thành", role: "Director, Producer", image: "https://tse4.mm.bing.net/th/id/OIP.PRxNOObh8Efy-7irFJNBygHaHa?pid=Api&P=0&h=220" },
        cast: [
            { name: "Phương Anh Đào", role: "Mai", img: "https://tse1.mm.bing.net/th/id/OIP.zw2e-v7XD_k7XKhhIpmdjgHaEo?pid=Api&P=0&h=220" },
            { name: "Tuấn Trần", role: "Dương", img: "https://tse1.mm.bing.net/th/id/OIP.1yodTMG7-qTIzR-hV1Md1QHaJQ?pid=Api&P=0&h=220" }
        ],
        info: { language: "Vietnamese (VN)", releaseDate: "Feb 10, 2024", studio: "CJ HK Entertainment", budget: "$2M" }
    },

    // --- PHIM SẮP CHIẾU (COMING SOON) ---
    {
        id: 6,
        title: "Deadpool & Wolverine",
        image: "https://image.tmdb.org/t/p/original/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
        heroBg: "https://tse3.mm.bing.net/th/id/OIP.St5KW87lOV_p8kBcuhVuWgHaEK?pid=Api&P=0&h=220",
        rating: 0.0,
        reviews: "0",
        duration: "2h 07m",
        year: "2024",
        genres: ["Action", "Comedy", "Sci-Fi"],
        type: "soon",
        synopsis: "Deadpool bị lôi kéo vào một nhiệm vụ đa vũ trụ của TVA, buộc anh phải hợp tác với một Wolverine miễn cưỡng để cứu lấy dòng thời gian của chính mình.",
        director: { name: "Shawn Levy", role: "Director", image: "https://tse3.mm.bing.net/th/id/OIP.V2luuIeSAet5bYIHKfwFLAHaJ4?pid=Api&P=0&h=220" },
        cast: [
            { name: "Ryan Reynolds", role: "Wade Wilson / Deadpool", img: "https://tse4.mm.bing.net/th/id/OIP.zWpGDaN_Z-STxe56XWEQzAHaHh?pid=Api&P=0&h=220" },
            { name: "Hugh Jackman", role: "Logan / Wolverine", img: "https://tse3.mm.bing.net/th/id/OIP.jAH-e_5nobbTv752o75sIgHaFI?pid=Api&P=0&h=220" }
        ],
        info: { language: "English (EN)", releaseDate: "July 26, 2024", studio: "Marvel Studios", budget: "$200M" }
    },
    {
        id: 7,
        title: "Joker: Folie à Deux",
        image: "https://mlpnk72yciwc.i.optimole.com/cqhiHLc.IIZS~2ef73/w:auto/h:auto/q:75/https://bleedingcool.com/wp-content/uploads/2024/09/GWvC5R8WUAAZQj6.jpg",
        heroBg: "https://tse3.mm.bing.net/th/id/OIP.blsDSEu0QBgwEX7XkaWsuwHaEK?pid=Api&P=0&h=220",
        rating: 0.0,
        reviews: "0",
        duration: "2h 18m",
        year: "2024",
        genres: ["Drama", "Crime", "Music"],
        type: "soon",
        synopsis: "Phần tiếp theo của 'Joker' (2019), xoay quanh mối quan hệ bệnh hoạn và đầy âm nhạc giữa Arthur Fleck và Harley Quinn tại nhà tù Arkham.",
        director: { name: "Todd Phillips", role: "Director", image: "https://tse3.mm.bing.net/th/id/OIP.OHG4NmmWrHUBOX-xSeY_wwHaJ5?pid=Api&P=0&h=220" },
        cast: [
            { name: "Joaquin Phoenix", role: "Arthur Fleck / Joker", img: "https://tse1.mm.bing.net/th/id/OIP.JV7A7fAtoMPHWeTaLvteRAHaEK?pid=Api&P=0&h=220" },
            { name: "Lady Gaga", role: "Harley Quinn", img: "https://tse3.mm.bing.net/th/id/OIP.3yh4xBWg2kJIU1vbSFtH0AHaEv?pid=Api&P=0&h=220" }
        ],
        info: { language: "English (EN)", releaseDate: "Oct 4, 2024", studio: "Warner Bros.", budget: "$200M" }
    },
    {
        id: 8,
        title: "Inside Out 2",
        image: "https://s3.amazonaws.com/nightjarprod/content/uploads/sites/261/2024/05/09131602/gMB8vgHu2lcyzv1fyptD6drHmJd-scaled.jpg",
        heroBg: "https://tse2.mm.bing.net/th/id/OIP.im-AowZV21I0vJNVip72PwHaDE?pid=Api&P=0&h=220",
        rating: 0.0,
        reviews: "0",
        duration: "1h 40m",
        year: "2024",
        genres: ["Animation", "Adventure", "Family"],
        type: "soon",
        synopsis: "Riley bước vào độ tuổi dậy thì, và trung tâm chỉ huy của cô bé phải đón nhận một loạt những Cảm xúc mới như Lo Âu (Anxiety), Ganh Tị (Envy), Xấu Hổ (Embarrassment).",
        director: { name: "Kelsey Mann", role: "Director", image: "https://tse4.mm.bing.net/th/id/OIP.cjMe2ma2FXRz_ukeKlX-nAHaJB?pid=Api&P=0&h=220" },
        cast: [
            { name: "Amy Poehler", role: "Joy (voice)", img: "https://tse4.mm.bing.net/th?id=OIF.ejCvvFSVV%2fEWR1Qad5bt2A&pid=Api&P=0&h=220" },
            { name: "Maya Hawke", role: "Anxiety (voice)", img: "https://tse2.mm.bing.net/th/id/OIP.N3hqZQroXhp8mEfuLatcUQHaHa?pid=Api&P=0&h=220" }
        ],
        info: { language: "English (EN)", releaseDate: "June 14, 2024", studio: "Pixar / Disney", budget: "$175M" }
    },
    {
        id: 9,
        title: "Planet of the Apes",
        image: "https://static1.moviewebimages.com/wordpress/wp-content/uploads/2024/02/kingdom_of_the_planet_of_the_apes_ver2_xlg.jpg",
        heroBg: "https://tse2.mm.bing.net/th/id/OIP.gMZASj-nPCvCawIGtY5EKwHaDt?pid=Api&P=0&h=220",
        rating: 0.0,
        reviews: "0",
        duration: "2h 25m",
        year: "2024",
        genres: ["Action", "Sci-Fi"],
        type: "soon",
        synopsis: "Nhiều thế hệ sau sự ra đi của Caesar, bầy khỉ giờ đây là loài thống trị trong khi con người dần lùi vào bóng tối. Một thủ lĩnh khỉ trẻ tuổi bắt đầu cuộc hành trình khiến anh phải đặt câu hỏi về mọi thứ anh từng biết.",
        director: { name: "Wes Ball", role: "Director", image: "https://tse1.mm.bing.net/th/id/OIP.ZcwgKVq8STf7pAFwiVpCzAHaE8?pid=Api&P=0&h=220" },
        cast: [
            { name: "Owen Teague", role: "Noa", img: "https://tse3.mm.bing.net/th/id/OIP.hOSwwAY6m9rLqGQSbcnJYAHaLH?pid=Api&P=0&h=220" },
            { name: "Freya Allan", role: "Mae", img: "https://tse1.mm.bing.net/th/id/OIP.SVJkGqjBxWlTI2rhQzYGngHaJQ?pid=Api&P=0&h=220" }
        ],
        info: { language: "English (EN)", releaseDate: "May 10, 2024", studio: "20th Century Studios", budget: "$160M" }
    },
    {
        id: 10,
        title: "Furiosa: A Mad Max Saga",
        image: "https://mlpnk72yciwc.i.optimole.com/cqhiHLc.IIZS~2ef73/w:auto/h:auto/q:75/https://bleedingcool.com/wp-content/uploads/2024/05/GM54LyKXIAE6xF7.jpg",
        heroBg: "https://tse1.mm.bing.net/th/id/OIP.wCZvW1n5Vd_c4rnREtw9tQHaDt?pid=Api&P=0&h=220",
        rating: 0.0,
        reviews: "0",
        duration: "2h 28m",
        year: "2024",
        genres: ["Action", "Adventure"],
        type: "soon",
        synopsis: "Câu chuyện về thời trẻ của nữ chiến binh Furiosa, từ khi cô bị bắt đi khỏi Green Place và phải sống sót qua cuộc chiến giữa hai bạo chúa khét tiếng trên vùng đất chết.",
        director: { name: "George Miller", role: "Director", image: "https://tse1.mm.bing.net/th/id/OIP.jXDpSllmIOCO8lEdwUlAhwHaFj?pid=Api&P=0&h=220" },
        cast: [
            { name: "Anya Taylor-Joy", role: "Furiosa", img: "https://tse1.mm.bing.net/th/id/OIP.t6Bw2JZC7PxuOKI1AWcJ3QHaLH?pid=Api&P=0&h=220" },
            { name: "Chris Hemsworth", role: "Dementus", img: "https://tse4.mm.bing.net/th/id/OIP.kMYQBZdRdQOvlcqCO8cSvwHaHa?pid=Api&P=0&h=220" }
        ],
        info: { language: "English (EN)", releaseDate: "May 24, 2024", studio: "Warner Bros.", budget: "$168M" }
    }
];