import {
    GalleryVerticalEnd,
    LayoutDashboard,
    Calendar,
    CircleDollarSign,
    Users,
    Settings,
    Gift,
    Star, 
    LucideLoaderPinwheel,
    Ticket, 
    CalendarCheck,
    TicketMinus,
    TicketCheck,
    IndianRupee
} from 'lucide-react';
import { PiCoinVerticalBold } from "react-icons/pi";

export const sideBarConstant = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    teams: {
        name: "Admin Dashboard",
        logo: GalleryVerticalEnd,
        plan: "global",
    },
    sideNavMain: [
        {
            title: "Overview",
            url: "/dashboard/",
            icon: LayoutDashboard,
        },
        {
            title: "Bookings",
            url: "/dashboard/bookings/",
            icon: Calendar,
        },
        {
            title: "Revenue",
            url: "/dashboard/revenue/",
            icon: CircleDollarSign,
        },
        {
            title: "Vouchers",
            url: "/dashboard/vouchers/",
            icon: Ticket,
        },
        {
            title: "Smaaash Coins",
            url: "/dashboard/smaaash-coin/",
            icon: PiCoinVerticalBold,
        },
    ],
    configItems: [
        {
            title: "Configure Rewards",
            url: "/dashboard/config/",
            icon: Gift,
            isOpen: true,
            subitems: [
                {
                    title: "Spin the Wheel",
                    url: "/dashboard/config/spin-the-wheel/",
                    icon: LucideLoaderPinwheel, 
                },
                {
                    title: "Scratch Card",
                    url: "/dashboard/config/scratch-card/",
                    icon: Star, 
                }
            ]
        },
        {
            title: "Users",
            url: "/dashboard/users/",
            icon: Users,
        },
        {
            title: "Settings",
            url: "/dashboard/settings/",
            icon: Settings,
        },
    ],
};


export const stats = [
    {
        title: 'Total Revenue',
        value: '₹4,52,318.90',
        change: '+20.1% from last month',
        icon: IndianRupee
    },
    {
        title: 'Total Bookings',
        value: '8,673',
        change: '+12.5% from last month',
        icon: CalendarCheck
    },
    {
        title: 'Vouchers Used',
        value: '1,450',
        change: '+15% increase in usage',
        icon: TicketCheck
    },
    {
        title: 'Vouchers Pending',
        value: '320',
        change: 'Pending approvals',
        icon: TicketMinus
    },
];


export const bookings = [
    {
      name: "Olivia Martin",
      email: "olivia.martin@email.com",
      game: "Go-Karting",
      price: "1,999.00",
      avatar: "/avatars/01.png",
    },
    {
      name: "Jackson Lee",
      email: "jackson.lee@email.com",
      game: "Bowling",
      price: "39.00",
      avatar: "/avatars/02.png",
    },
    {
      name: "Isabella Nguyen",
      email: "isabella.nguyen@email.com",
      game: "VR Experience",
      price: "299.00",
      avatar: "/avatars/03.png",
    },
  ]

