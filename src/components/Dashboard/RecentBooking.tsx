import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '@/components/ui/avatar'

interface Booking {
    avatar: string;
    name: string;
    email: string;
    game: string;
    price: string; // Updated to match the provided data
}

interface RecentBookingProps {
    bookings: Booking[];
}

export function RecentBooking({ bookings }: RecentBookingProps) {
    return (
        <div>
            <div className="space-y-8 h-auto">
                {bookings.map((booking, index) => (
                    <div key={index} className="flex items-center">
                        <Avatar className="h-9 w-9">
                            <AvatarImage src={booking.avatar} alt={booking.name} />
                            <AvatarFallback>
                                {booking.name
                                    .split(' ')
                                    .map((n) => n[0])
                                    .join('')}
                            </AvatarFallback>
                        </Avatar>
                        <div className="ml-4 space-y-1">
                            <p className="text-sm font-medium leading-none">{booking.name}</p>
                            <p className="text-sm text-muted-foreground">{booking.email}</p>
                            <p className="text-xs text-gray-500">Booked: {booking.game}</p>
                        </div>
                        <div className="ml-auto font-medium">+₹{booking.price}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
