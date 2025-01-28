'use client'
import React, { useState, useEffect } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { InputOTPForm } from './otpform'

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
    const [otpSent, setOtpSent] = useState(false) // State to track if OTP is sent
    const [isLoading, setIsLoading] = useState(false) // State to track loading status

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            phoneNumber: ''
        }
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values)
        // Handle form submission and trigger OTP send action
        setIsLoading(true) // Set loading to true when OTP is being sent
        setTimeout(() => {
            setOtpSent(true) // Simulate OTP sent after 2 seconds
            setIsLoading(false) // Reset loading state
        }, 2000) // Simulate an API call delay of 2 seconds
    }

    // Handler to restrict input to numbers only
    const handlePhoneInput = (e: React.FormEvent<HTMLInputElement>) => {
        e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '')
    }

    // Effect to reset form when dialog closes
    useEffect(() => {
        if (!isOpen) {
            form.reset()
            setOtpSent(false) // Reset OTP sent state when dialog closes
        }
    }, [isOpen, form])

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md font-main">
                <div className="flex flex-col space-y-6 py-4">
                    {!otpSent ? (
                        <>
                            <DialogHeader>
                                <DialogTitle className="text-left text-2xl">
                                    {formTitle}
                                </DialogTitle>
                                <DialogDescription className="text-left">
                                    Enter your phone number to Book your ticket
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
                                                        onInput={handlePhoneInput}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <Button
                                        type="submit"
                                        className="bg-[var(--brand-primary)] font-main text-white w-full"
                                        disabled={isLoading} // Disable button during loading
                                    >
                                        {isLoading ? (
                                            <span className="flex items-center">

                                                Sending...
                                            </span>
                                        ) : (
                                            'Send Otp'
                                        )}
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
                            <InputOTPForm />
                        </>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default SignUpForm
