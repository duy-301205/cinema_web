export const plans = [
    {
        id: 'classic',
        name: 'Classic',
        price: '9.99',
        color: 'text-[#92a4c9]',
        borderColor: 'border-[#324467]',
        bg: 'bg-[#192233]/60',
        buttonColor: 'bg-[#232f48] hover:bg-[#2d3b5a]',
        features: [
            { text: '1 Free monthly ticket', active: true },
            { text: '5% Concession discount', active: true },
            { text: 'Standard seating', active: true },
            { text: 'Loyalty points on every visit', active: true },
        ],
        iconColor: 'text-amber-500',
    },
    {
        id: 'gold',
        name: 'Gold',
        price: '19.99',
        isPopular: true,
        color: 'text-amber-500',
        borderColor: 'border-amber-500',
        bg: 'bg-[#192233]',
        buttonColor: 'bg-amber-500 text-white shadow-lg shadow-amber-500/20 hover:brightness-110',
        features: [
            { text: '2 Free monthly tickets', active: true },
            { text: '15% Concession discount', active: true },
            { text: 'Early access to premieres', active: true },
            { text: 'Priority booking & preferred seating', active: true },
        ],
        iconColor: 'text-amber-500',
    },
    {
        id: 'platinum',
        name: 'Platinum',
        price: '34.99',
        color: 'text-purple-400',
        borderColor: 'border-purple-500/50',
        bg: 'bg-[#192233]/60',
        buttonColor: 'bg-purple-600 hover:bg-purple-500',
        features: [
            { text: '4 Free monthly tickets', active: true },
            { text: '25% Concession discount', active: true },
            { text: 'VIP Lounge access', active: true },
            { text: 'Double loyalty points', active: true },
        ],
        iconColor: 'text-purple-400',
    },
];

export const comparisonData = [
    {
        feature: 'Monthly Tickets',
        classic: { label: '1', type: 'badge', color: 'bg-[#232f48]' },
        gold: { label: '2', type: 'badge', color: 'bg-amber-500' },
        platinum: { label: '4', type: 'badge', color: 'bg-purple-600' },
    },
    {
        feature: 'Concession Discount',
        classic: { label: '5%', type: 'text' },
        gold: { label: '15%', type: 'text' },
        platinum: { label: '25%', type: 'text' },
    },
    {
        feature: 'Early Access to Premieres',
        classic: { type: 'icon', value: false },
        gold: { type: 'icon', value: true, color: 'text-amber-500' },
        platinum: { type: 'icon', value: true, color: 'text-purple-400' },
    },
    {
        feature: 'VIP Lounge Access',
        classic: { type: 'icon', value: false },
        gold: { type: 'icon', value: false },
        platinum: { type: 'icon', value: true, color: 'text-purple-400' },
    },
    {
        feature: 'Loyalty Multiplier',
        classic: { label: '1.0x', type: 'text' },
        gold: { label: '1.5x', type: 'text' },
        platinum: { label: '2.0x', type: 'text', color: 'text-purple-400 font-bold' },
    },
];