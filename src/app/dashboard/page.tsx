'use client'

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const defaultListId = 'today';

export default function DashboardRedirectPage(){
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.replace('/login');
            return;
        }

        setIsCheckingAuth(false);

        const emailParam = searchParams.get('email');

        let redirectToPath = `/dashboard/${defaultListId}`;

        if(emailParam) {
            const query = new URLSearchParams();
            query.set('email', emailParam);
            redirectToPath += `?${query.toString()}`
        }

        router.replace(redirectToPath);
    }, [router, searchParams]);
    
    if (isCheckingAuth) {
        return (
            <div className="flex items-center justify-center h-screen bg-[#1E1E1E]">
                <p className="text-lg text-gray-100 animate-pulse">Verificando acesso...</p>
            </div>
        );
    }

    // Este conteúdo será mostrado muito brevemente (ou nem isso)
    // antes do segundo redirecionamento (para a lista padrão) ocorrer.
    return (
        <div className="flex items-center justify-center h-screen bg-[#1E1E1E}]">
            <p className="text-lg text-gray-100 animate-pulse">Redirecionando para seu painel...</p>
        </div>
    );

}

