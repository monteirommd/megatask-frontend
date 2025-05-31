'use client'

import EmailInput from "@/components/login/EmailInput";
import Link from 'next/link';
import PasswordInput from "@/components/login/PasswordInput";
import { useState } from "react";
import { useRouter } from "next/navigation";
import NameInput from "@/components/login/NameInput";
import { createUser } from '@/service/api'
import LogoContent from "@/components/login/LogoContent";

export default function RegisterPage(){
    const router = useRouter();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [success, setSuccess] = useState('')
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Enviando dados:", { name, email, password });
        try {
            await createUser(name, email, password);
            setSuccess('Usuário criado com sucesso!')
            router.push('/login')
        } catch(err:any) {
            const msg = err.message || "erro ao criar usuario"
            setError(msg);    
        }
    }

    return(
        <main className='flex flex-col lg:flex lg:flex-row h-screen '>
            <LogoContent 
                key="component-persist"  
            />
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
                        {error && <p className="text-red-500">{error}</p>}
                        {success && <p className="text-green-500">{success}</p>}
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