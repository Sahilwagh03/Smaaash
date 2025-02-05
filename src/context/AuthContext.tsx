'use client'
import { createContext, useContext, useEffect, useState } from 'react'

type AuthContextType = {
    isUserVerified: boolean
    setIsUserVerified: (value: boolean) => void
    handleSignUpClick: () => void
    handleLoginClick: () => void
    handleLogout: () => void
    formTitle:string
    isSignUpOpen:boolean
    setIsSignUpOpen:(value:boolean)=>void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isUserVerified, setIsUserVerified] = useState<boolean>(false)
    const [formTitle, setFormTitle] = useState<string>('Sign Up')
    const [isSignUpOpen, setIsSignUpOpen] = useState(false)

    const handleSignUpClick = () => {
        setFormTitle('Sign Up')
        setIsSignUpOpen(true)
    }

    const handleLoginClick = () => {
        setFormTitle('Login')
        setIsSignUpOpen(true)
    }

    const handleLogout = () => {
        localStorage.removeItem('user_verified')
        setIsUserVerified(false) // Update state globally
    }

    useEffect(() => {
        if (localStorage.getItem('user_verified') === 'true') {
            setIsUserVerified(true)
        }
    }, [])

    return (
        <AuthContext.Provider value={{ isUserVerified, setIsUserVerified, handleSignUpClick, handleLoginClick, handleLogout , formTitle ,isSignUpOpen,setIsSignUpOpen}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
