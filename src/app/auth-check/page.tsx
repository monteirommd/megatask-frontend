'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthCheck(){
    const router = useRouter();
    
    useEffect(()=> {
        const token = localStorage.getItem('token');

        if (token) {
            router.replace('/dashboard');
        } else {
            router.replace('login');
        }
    },[router]);

    return(
        <p>Verificando autenticação...</p>
    );
}