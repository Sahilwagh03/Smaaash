import { useState, useEffect } from 'react'

const useSignUp = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [otpSent, setOtpSent] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isVerified, setIsVerified] = useState<boolean>(false)
    const [isScratchCardFinish, setIsScratchCardFinish] = useState<boolean>(false)
    const [phoneNumber, setPhoneNumber] = useState<string>('')

    useEffect(() => {
        const userStatus = localStorage.getItem('user_verified')
        if (userStatus === 'true') {
            setIsVerified(true)
        }
    }, [])

    const handleOpenChange = (open: boolean) => {
        setIsOpen(open)
        if (!open) {
            resetState()
        }
    }

    const resetState = () => {
        setOtpSent(false)
        setIsVerified(false)
        setIsScratchCardFinish(false)
        setPhoneNumber('')
    }

    const sendOtp = (number: string) => {
        setIsLoading(true)
        setTimeout(() => {
            setPhoneNumber(number)
            setOtpSent(true)
            setIsLoading(false)
        }, 2000)
    }

    const verifyOtp = () => {
        setTimeout(() => {
            setIsVerified(true)
            localStorage.setItem('user_verified', 'true')
        }, 1000)
    }

    const completeScratchCard = () => {
        setIsScratchCardFinish(true)
    }

    const logout = () => {
        localStorage.removeItem('user_verified')
        resetState()
    }

    return {
        isOpen,
        handleOpenChange,
        otpSent,
        isLoading,
        isVerified,
        isScratchCardFinish,
        sendOtp,
        verifyOtp,
        completeScratchCard,
        logout
    }
}

export default useSignUp
