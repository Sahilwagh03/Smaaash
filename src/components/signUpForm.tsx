'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import confetti from 'canvas-confetti'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { InputOTPForm } from './otpform'
import { Check } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

const formSchema = z.object({
    phoneNumber: z
        .string()
        .min(10, 'Phone number must be at least 10 digits')
        .max(15, 'Phone number must not exceed 15 digits')
        .regex(/^\+?[1-9]\d{9,14}$/, 'Please enter a valid phone number')
})

type Props = {
    isOpen?: boolean
    onOpenChange?: (open: boolean) => void,
    formTitle: string
}

const SignUpForm = ({ isOpen = false, onOpenChange, formTitle }: Props) => {
    const router = useRouter()
    const { setIsUserVerified } = useAuth()
    const [currentStep, setCurrentStep] = useState<'phone' | 'otp' | 'welcome'>('phone')
    const [isLoading, setIsLoading] = useState(false)
    const [phoneNumber, setPhoneNumber] = useState('')

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            phoneNumber: ''
        }
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        setIsLoading(true)
        setPhoneNumber(values.phoneNumber)
        setTimeout(() => {
            setCurrentStep('otp')
            setIsLoading(false)
        }, 2000)
    }

    const handleOtpVerification = () => {
        setIsLoading(true)
        setTimeout(() => {
            setCurrentStep('welcome')
            localStorage.setItem('user_verified', 'true')
            setIsUserVerified(true)
            setIsLoading(false)
            confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } })
            setTimeout(() => {
                router.push('/profile')
                if (onOpenChange) {
                    onOpenChange(false)
                }
            }, 2000)
        }, 1000)
    }

    useEffect(() => {
        if (isOpen) {
            form.reset();
            setCurrentStep('phone');
            setIsLoading(false);
        }
    }, [isOpen, form]);
    

    const renderStep = () => {
        switch (currentStep) {
            case 'phone':
                return (
                    <>
                        <DialogHeader>
                            <DialogTitle className="text-left text-2xl">{formTitle}</DialogTitle>
                            <DialogDescription className="text-left">Enter your phone number to book your ticket</DialogDescription>
                        </DialogHeader>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
                                <FormField control={form.control} name="phoneNumber" render={({ field }) => (
                                    <FormItem>
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <FormControl>
                                            <Input id="phone" type="tel" placeholder="Enter your Number" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <Button type="submit" className="bg-[var(--brand-primary)] font-main text-white w-full" disabled={isLoading}>
                                    {isLoading ? 'Sending...' : 'Send OTP'}
                                </Button>
                            </form>
                        </Form>
                    </>
                )
            case 'otp':
                return (
                    <>
                        <DialogHeader>
                            <DialogTitle className="text-center text-2xl">Verify the OTP</DialogTitle>
                            <DialogDescription className="text-center">Please enter the one-time password sent to {phoneNumber}</DialogDescription>
                        </DialogHeader>
                        <InputOTPForm onVerify={handleOtpVerification} />
                    </>
                )
            case 'welcome':
                return (
                    <div className="flex min-h-[200px] flex-col items-center justify-center space-y-4">
                        <div className="rounded-full bg-green-100 p-3">
                            <Check className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="text-center">
                            <h2 className="text-xl font-semibold">Welcome!</h2>
                            <p className="text-gray-500">Your phone number has been verified successfully.</p>
                            <p className="text-sm text-gray-400 mt-2">Redirecting to your profile...</p>
                        </div>
                    </div>
                )
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md font-main">
                <div className="flex flex-col space-y-6 py-4">{renderStep()}</div>
            </DialogContent>
        </Dialog>
    )
}

export default SignUpForm