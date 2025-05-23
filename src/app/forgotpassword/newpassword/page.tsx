'use client'

import LogoContent from "@/components/login/LogoContent";
import PasswordInput from "@/components/login/PasswordInput";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";



export default function NewPassword() {
    const router = useRouter();
    const [ password, setPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Ta funcionando')
        router.push('/login')

    }

    return(
        <main className='flex flex-col lg:flex lg:flex-row h-screen '>    
            <div className='flex-1 flex flex-col items-center justify-center lg:p-4 align-middle'>
                <h2 className="text-3xl text-center lg:text-5xl font-bold mb-8">
                    Escolha sua nova senha
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col justify-center gap-4">
                        <PasswordInput 
                            value={password}
                            onChange={(e => setPassword(e.target.value))}
                        />
                        <PasswordInput 
                            title="Confirme sua Senha:"
                            value={confirmPassword}
                            onChange={(e => setConfirmPassword(e.target.value))}
                        />
                    </div>
                    <div className='flex flex-col items-center lg:justify-end lg:items-end'>
                        <button 
                            type="submit"
                            className='bg-[#1E1E1E] transition hover:bg-[#82203C]
                                text-white w-full    mx-8 lg:w-xl box-content h-18 rounded-full text-3xl
                                mt-12 font-bold cursor-pointer'>
                            Redefir Senha
                        </button>
                    </div>
                </form>
                <div className="flex items-center mt-2">
                    <p className=''>De volta ao
                        <Link href="../login" className='font-bold hover:text-[#82203C] ml-0.5'>
                            login
                        </Link>
                    </p>
                </div>
            </div>
            <LogoContent 
                key="component-persist"  
            />
                    
        </main>
    );

}