'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import Link from "next/link"

const FormSchema = z.object({
    pin: z.string().min(6, {
        message: "Your one-time password must be 6 characters.",
    }),
})

type OTPFormProps = {
    onVerify: () => void; // Callback function to handle successful verification
}

export function InputOTPForm({ onVerify }: OTPFormProps) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            pin: "",
        },
    })

    const [isLoading, setIsLoading] = useState(false) // Loading state for button

    function onSubmit(data: z.infer<typeof FormSchema>) {
        setIsLoading(true) // Set loading state when submitting
        // Simulate an OTP verification process (replace this with real API call)
        setTimeout(() => {
            onVerify() // Call the callback function after verification
            setIsLoading(false) // Reset loading state after verification
        }, 2000)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                <FormField
                    control={form.control}
                    name="pin"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <InputOTP maxLength={6} {...field}>
                                    <InputOTPGroup>
                                        {[...Array(6)].map((_, index) => (
                                            <InputOTPSlot key={index} index={index} />
                                        ))}
                                    </InputOTPGroup>
                                </InputOTP>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex flex-row justify-between items-center gap-4">
                    <Button
                        type="submit"
                        className="w-1/2 bg-[var(--brand-primary)] text-white"
                        disabled={isLoading} // Disable button when loading
                    >
                        {isLoading ? "Verifying..." : "Verify"}
                    </Button>
                    <Link href="#" className="w-1/2 text-center text-[var(--brand-primary)] hover:underline">
                        Resend OTP
                    </Link>
                </div>
            </form>
        </Form>
    )
}