'use client'

import EmailInput from "@/components/EmailInput";
import Link from 'next/link';
import PasswordInput from "@/components/PasswordInput";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import NameInput from "@/components/NameInput";
import { register } from '@/lib/api/auth'

export default function RegisterPage(){
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            const res = await register(name, email, password);
            router.push('/login')
        } catch(err:any) {
            setError(err.message);    
        }
    }

    return(
        <main className='flex flex-col lg:flex lg:flex-row h-screen '>
            <div className='bg-[#1E1E1E] lg:m-[10px] lg:rounded-4xl lg:flex-1 flex flex-col items-center justify-center p-8 lg:p-4 align-middle'>
                <div className='flex lg:flex-col justify-center items-center align-middle gap-x-4'>
                    <Image
                        src="/favicon.svg"
                        alt="Logo Mega Task"
                        width={50}
                        height={50}
                        className='bg-clip-content lg:w-3xs'
                        priority
                    />
                    <h1 
                        className='text-white font-bold text-center text-2xl lg:text-5xl lg:mt-4'>
                        Mega Task
                    </h1>
                </div>
            </div>
            <div className='flex-1 flex flex-col items-center justify-center lg:p-4 align-middle'>
                <h2 className="text-3xl text-center lg:text-4xl font-bold mb-8">
                    Cadastre-se Agora para Começar!
                </h2>
                <form onSubmit={handleSubmit}>
                    <NameInput 
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <EmailInput 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                    />
                    <PasswordInput 
                        value={password} 
                        onChange={e => setPassword(e.target.value)} 
                    />
                    <div className='flex flex-col items-center lg:justify-end lg:items-end'>
                        <button 
                            type="submit"
                            className='bg-[#1E1E1E] transition hover:bg-[#82203C]
                                text-white w-full mx-8 lg:w-xl box-content h-18 rounded-full text-3xl
                                mt-12 font-bold cursor-pointer'>
                            Cadastre-se
                        </button>
                        {error && <p>{error}</p>}
                    </div>
                </form>
                <p className='mt-2'>Já tem conta?
                    <Link href="/login" className='font-bold hover:text-[#82203C] ml-0.5'>
                        Faça Login agora!
                    </Link>
                </p>
            </div>
                    
                </main>
    );
}