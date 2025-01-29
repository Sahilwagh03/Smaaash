'use client'
import React, { useEffect } from 'react'
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
import ScratchCard from './scratchCard' // Import the scratch card component
import Image from 'next/image'
import useSignUp from '@/hooks/useSignUp' // Import the custom hook

// Form validation schema
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
    const { 
        otpSent, 
        isLoading, 
        isVerified, 
        isScratchCardFinish, 
        sendOtp, 
        verifyOtp, 
        completeScratchCard, 
        handleOpenChange 
    } = useSignUp() // Using the custom hook

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            phoneNumber: ''
        }
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        sendOtp(values.phoneNumber)
    }

    // Simulate OTP verification success
    const handleOtpVerification = () => {
        verifyOtp() // Call verifyOtp from the hook
    }

    useEffect(() => {
        if (!isOpen) {
            form.reset()
        }
    }, [isOpen, form])

    return (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
            <DialogContent className="sm:max-w-md font-main">
                <div className="flex flex-col space-y-6 py-4">
                    {!isVerified ? (
                        !otpSent ? (
                            <>
                                <DialogHeader>
                                    <DialogTitle className="text-left text-2xl">
                                        {formTitle}
                                    </DialogTitle>
                                    <DialogDescription className="text-left">
                                        Enter your phone number to book your ticket
                                    </DialogDescription>
                                </DialogHeader>
                                <Form {...form}>
                                    <form
                                        onSubmit={form.handleSubmit(onSubmit)}
                                        className="w-full space-y-4"
                                    >
                                        <FormField
                                            control={form.control}
                                            name="phoneNumber"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <Label htmlFor="phone">Phone Number</Label>
                                                    <FormControl>
                                                        <Input
                                                            id="phone"
                                                            type="tel"
                                                            placeholder="Enter your Number"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <Button
                                            type="submit"
                                            className="bg-[var(--brand-primary)] font-main text-white w-full"
                                            disabled={isLoading}
                                        >
                                            {isLoading ? 'Sending...' : 'Send OTP'}
                                        </Button>
                                    </form>
                                </Form>
                            </>
                        ) : (
                            <>
                                <DialogHeader>
                                    <DialogTitle className="text-center text-2xl">
                                        Verify the OTP
                                    </DialogTitle>
                                    <DialogDescription className="text-center">
                                        Please enter the one-time password sent to your phone.
                                    </DialogDescription>
                                </DialogHeader>
                                <InputOTPForm onVerify={handleOtpVerification} />
                            </>
                        )
                    ) : (
                        // Scratch card display after verification
                        <div className="flex min-h-[200px] flex-col items-center justify-center space-y-4">
                            <ScratchCard
                                coverImage="/images/scratch-card-overlay-gift.jpg"
                                brushSize={50}
                                className='w-full h-full'
                                onComplete={() => { completeScratchCard() }}
                            >
                                <div className="select-none w-full h-full flex flex-col items-center justify-center space-y-4">
                                    <Image
                                        src="/images/reward-coin.png"
                                        alt="coin"
                                        width={200}
                                        height={200}
                                        className='w-60 h-60'
                                    />
                                    <p className="text-gray-600 text-center">
                                        You have earned <strong className='text-[var(--brand-primary)]'>5 Smaaash Coins</strong>.<br />
                                        Scratch below to reveal your reward!
                                    </p>
                                </div>
                            </ScratchCard>
                            {
                                isScratchCardFinish && (
                                    <Button onClick={() => onOpenChange?.(false)} className='bg-[var(--brand-primary)] rounded-lg text-white'>
                                        Continue
                                    </Button>
                                )
                            }
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default SignUpForm
