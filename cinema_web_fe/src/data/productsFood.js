import {
    UtensilsCrossed,
    Popcorn,
    Beer,
    Pizza,
    Cookie,
    IceCream
} from 'lucide-react';

export const categories = [
    { id: 'all', label: 'All Items', icon: UtensilsCrossed },
    { id: 'popcorn', label: 'Popcorn', icon: Popcorn },
    { id: 'drinks', label: 'Drinks', icon: Beer },
    { id: 'snacks', label: 'Snacks', icon: Pizza },
    { id: 'desserts', label: 'Desserts', icon: IceCream },
];

export const products = [
    {
        id: 1,
        name: "Classic Salted Popcorn",
        desc: "Bắp rang bơ truyền thống với muối biển và bơ tan chảy thơm lừng.",
        price: 6.50,
        sizes: ["S", "M", "L"],
        tag: "Bestseller",
        category: "popcorn",
        img: "https://images.unsplash.com/photo-1585647347483-22b66260dfff?q=80&w=500&auto=format&fit=crop"
    },
    {
        id: 2,
        name: "Caramel Bliss Popcorn",
        desc: "Bắp rang bao phủ lớp caramel ngọt ngào, giòn tan trong từng miếng.",
        price: 7.50,
        sizes: ["S", "M", "L"],
        tag: "Must Try",
        category: "popcorn",
        img: "https://images.unsplash.com/photo-1599490659223-930b447ffad6?q=80&w=500&auto=format&fit=crop"
    },
    {
        id: 3,
        name: "Fountain Soda",
        desc: "Các loại nước giải khát có ga mát lạnh: Cola, Sprite, Fanta.",
        price: 4.00,
        sizes: ["S", "M", "L"],
        category: "drinks",
        img: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=500&auto=format&fit=crop"
    },
    {
        id: 4,
        name: "Loaded Nachos",
        desc: "Bánh đa tảng giòn rụm kèm sốt phô mai Cheddar và ớt Jalapeño.",
        price: 9.00,
        sizes: ["Regular", "Large"],
        tag: "Hot Food",
        category: "snacks",
        img: "https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?q=80&w=500&auto=format&fit=crop"
    },
    {
        id: 5,
        name: "Gourmet Hot Dog",
        desc: "Xúc xích Đức nướng kèm hành phi, mù tạt và sốt cà chua đặc biệt.",
        price: 8.50,
        sizes: ["Standard"],
        tag: "Popular",
        category: "snacks",
        img: "https://images.unsplash.com/photo-1541232399669-547014f10006?q=80&w=500&auto=format&fit=crop"
    },
    {
        id: 6,
        name: "Choco-Malt Sundae",
        desc: "Kem tươi vani hòa quyện cùng sốt chocolate và vụn bánh quy.",
        price: 5.50,
        sizes: ["One Size"],
        category: "desserts",
        img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?q=80&w=500&auto=format&fit=crop"
    }
];