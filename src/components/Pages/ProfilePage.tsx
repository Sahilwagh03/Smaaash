import {
    Star,
    Phone,
    Mail,
    Link,
    MapPin,
    Pen
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import EditProfileModal from '../EditProfileModal';

const ProfilePage = () => {
    // Placeholder data for bookings, vouchers, played games - replace with actual data fetching later
    const bookings = [
        { id: 1, game: 'Bowling Night', venue: 'Fun Junction', date: 'July 15, 2024', time: '7:00 PM' },
        { id: 2, game: 'Arcade Mania', venue: 'Pixel Paradise', date: 'July 20, 2024', time: '2:00 PM' },
    ];

    const vouchers = [
        { id: 1, code: 'SUMMER20', discount: '20% off', validUntil: 'August 31, 2024' },
        { id: 2, code: 'WELCOME10', discount: '$10 off', validUntil: 'December 31, 2024' },
    ];

    const playedGames = [
        { id: 1, game: 'Cricket Clash', venue: 'Sports Arena', date: 'June 28, 2024' },
        { id: 2, game: 'VR Escape Room', venue: 'Reality Zone', date: 'June 10, 2024' },
    ];

    const scratchCards = [

    ]

    return (
        <div className="font-main bg-gray-50 min-h-screen">
            <div className="container mx-auto md:px-4 md:py-8">
                <Card className='relative'>
                    <CardHeader className="p-6">
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                            {/* Avatar */}
                            <div className="flex-shrink-0">
                                <Avatar className="h-24 w-24 md:h-32 md:w-32">
                                    <AvatarImage src="/jeremy-rose.png" alt="Jeremy Rose" />
                                    <AvatarFallback>JR</AvatarFallback>
                                </Avatar>
                            </div>

                            <div className="flex-1 flex w-full gap-6 flex-col md:flex-row">
                                <div className="flex flex-col justify-start items-center lg:items-start">
                                    <div>
                                        <CardTitle className="text-3xl font-bold text-gray-800">
                                            Jeremy Rose
                                        </CardTitle>
                                        <CardDescription className="text-gray-600 text-md md:text-left text-center">
                                            New York, NY
                                        </CardDescription>
                                    </div>
                                    <div className="mt-4 flex items-center">
                                        <span className="uppercase text-gray-700 mr-3 text-xs tracking-wider">
                                            Rankings
                                        </span>
                                        <span className="font-semibold text-xl text-gray-800">8.6</span>
                                        <div className="flex ml-2">
                                            <Star className="h-5 w-5 text-yellow-500" />
                                            <Star className="h-5 w-5 text-yellow-500" />
                                            <Star className="h-5 w-5 text-yellow-500" />
                                            <Star className="h-5 w-5 text-yellow-500" />
                                            <Star className="h-5 w-5 text-gray-300" />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="uppercase text-gray-700 font-semibold text-sm tracking-wide mb-4">
                                        Basic Information
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                                        <div>
                                            <p className="font-medium text-sm text-gray-700">Birthday:</p>
                                            <p className="text-gray-600 text-sm">June 5, 1992</p>
                                        </div>


                                        <div>
                                            <p className="font-medium text-sm text-gray-700">Gender:</p>
                                            <p className="text-gray-600 text-sm">Male</p>
                                        </div>


                                        <div className="flex items-center">
                                            <Phone className="h-5 w-5 text-gray-500 mr-3" />
                                            <div>
                                                <p className="font-medium text-sm text-gray-700">Phone:</p>
                                                <p className="text-gray-600 text-sm">+1 123 456 7890</p>
                                            </div>
                                        </div>


                                        <div className="flex items-start">
                                            <MapPin className="h-5 w-5 text-gray-500 mr-3 mt-1" />
                                            <div>
                                                <p className="font-medium text-sm text-gray-700">Address:</p>
                                                <p className="text-gray-600 text-sm">
                                                    525 E 68th Street, New York, NY 10651-78
                                                </p>
                                                <p className="text-gray-600 text-sm">156-187-60</p>
                                            </div>
                                        </div>


                                        <div className="flex items-center">
                                            <Mail className="h-5 w-5 text-gray-500 mr-3" />
                                            <div>
                                                <p className="font-medium text-sm text-gray-700">E-mail:</p>
                                                <p className="text-gray-600 text-sm">hello@jeremyrose.com</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <EditProfileModal />
                            </div>
                        </div>
                    </CardHeader>


                    <Tabs defaultValue="bookings">
                        <TabsList className="flex h-fit mx-auto md:mx-0 md:ml-4 py-2 md:p-2 w-fit">
                            <TabsTrigger
                                value="bookings"
                                className="whitespace-nowrap px-2 py-2 font-medium text-gray-600 transition-colors duration-200 
                           hover:bg-gray-100 hover:text-brand_primary data-[state=active]:bg-brand_primary data-[state=active]:text-white 
                           rounded-md mx-1"
                            >
                                Bookings
                            </TabsTrigger>
                            <TabsTrigger
                                value="vouchers"
                                className="whitespace-nowrap px-2 py-2 font-medium text-gray-600 transition-colors duration-200 
                           hover:bg-gray-100 hover:text-brand_primary data-[state=active]:bg-brand_primary data-[state=active]:text-white 
                           rounded-md mx-1"
                            >
                                Vouchers
                            </TabsTrigger>
                            <TabsTrigger
                                value="playedGames"
                                className="whitespace-nowrap px-2 py-2 font-medium text-gray-600 transition-colors duration-200 
                           hover:bg-gray-100 hover:text-brand_primary data-[state=active]:bg-brand_primary data-[state=active]:text-white 
                           rounded-md mx-1"
                            >
                                Played Games
                            </TabsTrigger>
                            <TabsTrigger
                                value="reward"
                                className="whitespace-nowrap px-2 py-2 font-medium text-gray-600 transition-colors duration-200 
                           hover:bg-gray-100 hover:text-brand_primary data-[state=active]:bg-brand_primary data-[state=active]:text-white 
                           rounded-md mx-1"
                            >
                                Reward
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="bookings" className="p-6">
                            <div>
                                <h3 className="uppercase text-gray-700 font-bold text-sm mb-3">Upcoming Bookings</h3>
                                {bookings.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {bookings.map(booking => (
                                            <Card key={booking.id}>
                                                <CardHeader>
                                                    <CardTitle className="text-lg font-semibold">{booking.game}</CardTitle>
                                                    <CardDescription className="text-sm text-gray-600">{booking.venue}</CardDescription>
                                                </CardHeader>
                                                <CardContent>
                                                    <p className="text-sm text-gray-600">Date: {booking.date}</p>
                                                    <p className="text-sm text-gray-600">Time: {booking.time}</p>
                                                </CardContent>
                                                <CardFooter className="justify-end">
                                                    <Button size="sm" className="bg-brand_primary text-white">
                                                        View Details
                                                    </Button>
                                                </CardFooter>
                                            </Card>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-600">No upcoming bookings.</p>
                                )}
                            </div>
                        </TabsContent>


                        <TabsContent value="vouchers" className="p-6">
                            <div>
                                <h3 className="uppercase text-gray-700 font-bold text-sm mb-3">My Vouchers</h3>
                                {vouchers.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {vouchers.map(voucher => (
                                            <Card key={voucher.id}>
                                                <CardHeader>
                                                    <CardTitle className="text-lg font-semibold">Voucher Code: {voucher.code}</CardTitle>
                                                </CardHeader>
                                                <CardContent>
                                                    <p className="text-sm text-gray-600">Discount: {voucher.discount}</p>
                                                    <p className="text-sm text-gray-600">Valid Until: {voucher.validUntil}</p>
                                                </CardContent>
                                                <CardFooter className="justify-end">
                                                    <Button size="sm" className="bg-brand_primary text-white">
                                                        Apply Voucher
                                                    </Button>
                                                </CardFooter>
                                            </Card>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-600">No vouchers available.</p>
                                )}
                            </div>
                        </TabsContent>


                        <TabsContent value="playedGames" className="p-6">
                            <div>
                                <h3 className="uppercase text-gray-700 font-bold text-sm mb-3">Played Games History</h3>
                                {playedGames.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {playedGames.map(game => (
                                            <Card key={game.id}>
                                                <CardHeader>
                                                    <CardTitle className="text-lg font-semibold">{game.game}</CardTitle>
                                                    <CardDescription className="text-sm text-gray-600">{game.venue}</CardDescription>
                                                </CardHeader>
                                                <CardContent>
                                                    <p className="text-sm text-gray-600">Date Played: {game.date}</p>
                                                </CardContent>
                                                <CardFooter className="justify-end">
                                                    <Button size="sm" className="bg-brand_primary text-white">
                                                        View Scorecard
                                                    </Button>
                                                </CardFooter>
                                            </Card>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-600">No game history available.</p>
                                )}
                            </div>
                        </TabsContent>


                        <TabsContent value="reward" className="p-6">
                            <div>
                                <h3 className="uppercase text-gray-700 font-bold text-sm mb-3">Your Reward</h3>
                                {scratchCards?.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {/* {scratchCards?.map(game => (
                                            <Card key={game.id}>
                                                <CardHeader>
                                                    <CardTitle className="text-lg font-semibold">{game.game}</CardTitle>
                                                    <CardDescription className="text-sm text-gray-600">{game.venue}</CardDescription>
                                                </CardHeader>
                                                <CardContent>
                                                    <p className="text-sm text-gray-600">Date Played: {game.date}</p>
                                                </CardContent>
                                                <CardFooter className="justify-end">
                                                    <Button size="sm" className="bg-brand_primary text-white">
                                                        View Scorecard
                                                    </Button>
                                                </CardFooter>
                                            </Card>
                                        ))} */}
                                    </div>
                                ) : (
                                    <div className='h-[50vh] w-full flex justify-start items-center'>
                                        <p className="w-full text-gray-600 text-center">No game reward.</p>
                                    </div>
                                )}
                            </div>
                        </TabsContent>
                    </Tabs>
                    <div className='block lg:hidden'>
                        <EditProfileModal />
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default ProfilePage;
