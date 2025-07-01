"use server"

import { signIn, signOut } from '@/auth';

export const googleLogin = async() => {
    
    await signIn("google", { redirectTo: "/" });
}

export const googleLogout = async() => {
    
    await signOut({ redirectTo: "/" });
}

export const resendLogin = async(email: string) => {
    
    await signIn("resend", { email });
}

export const resendLogout = async() => {
    
    await signOut({ redirectTo: "/" });
}