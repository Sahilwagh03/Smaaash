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
    DollarSign, 
    Ticket, 
    CalendarCheck,
    TicketMinus,
    TicketCheck
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
        value: '₹45,231.89',
        change: '+20.1% from last month',
        icon: DollarSign,
        color: 'text-green-500', 
    },
    {
        title: 'Total Bookings',
        value: '8,673',
        change: '+12.5% from last month',
        icon: CalendarCheck,
        color: 'text-purple-500',
    },
    {
        title: 'Vouchers Used',
        value: '1,450',
        change: '+15% increase in usage',
        icon: TicketCheck,
        color: 'text-blue-500', 
    },
    {
        title: 'Vouchers Pending',
        value: '320',
        change: 'Pending approvals',
        icon: TicketMinus,
        color: 'text-yellow-500', 
    },

]

