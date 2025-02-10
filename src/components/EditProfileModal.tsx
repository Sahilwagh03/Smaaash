'use client'
import React from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Pen, Phone, Mail, MapPin, CalendarIcon, User } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";

const EditProfileModal = () => {
    const [date, setDate] = React.useState<Date>();
    const [gender, setGender] = React.useState("male");

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    size="sm"
                    className="flex absolute w-10 h-10 lg:w-auto lg:h-10 lg:relative top-4 right-4 lg:top-0 lg:right-0 bg-brand_primary text-white"
                >
                    <Pen className='block lg:hidden' />
                    <span className='hidden lg:block'>Edit Profile</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg lg:max-w-3xl">
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>Update your profile details here.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 lg:grid lg:grid-cols-2 lg:gap-6">
                    <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" placeholder="Enter your full name" defaultValue="Jeremy Rose" />
                    </div>
                    <div className='!mt-0'>
                        <Label htmlFor="email">Email Address</Label>
                        <div className="relative flex items-center">
                            <Mail className="absolute left-3 h-5 w-5 text-gray-500" />
                            <Input id="email" type="email" className="pl-10" placeholder="Enter your email" defaultValue="hello@jeremyrose.com" />
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative flex items-center">
                            <Phone className="absolute left-3 h-5 w-5 text-gray-500" />
                            <Input id="phone" type="tel" className="pl-10" placeholder="Enter your phone number" defaultValue="+1 123 456 7890" />
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="dob">Date of Birth</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2" />
                                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div>
                        <Label htmlFor="gender">Gender</Label>
                        <Select value={gender} onValueChange={setGender}>
                            <SelectTrigger className='text-left'>
                                {gender.charAt(0).toUpperCase() + gender.slice(1)}
                            </SelectTrigger>
                            <SelectContent className='text-left'>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="lg:col-span-2">
                        <Label htmlFor="address">Address</Label>
                        <div className="relative flex items-start">
                            <MapPin className="absolute left-2 top-2 h-5 w-5 text-gray-500" />
                            <Textarea id="address" className="pl-10 max-h-40" placeholder="Enter your address" defaultValue="525 E 68th Street, New York, NY 10651-78" />
                        </div>
                    </div>
                    <div className="lg:col-span-2">
                        <Button className="w-full bg-brand_primary text-white">Save Changes</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default EditProfileModal;
