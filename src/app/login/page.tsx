'use client'

import { login } from '@/lib/api/auth'
import Image from 'next/image'
import Link from 'next/link';
import PasswordInput from "../../components/PasswordInput";
import EmailInput from "../../components/EmailInput";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage(){
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) =>{
        e.preventDefault();

        try {
            const result = await login(email, password);
            localStorage.setItem('token', result.token);
            router.push('/dashboard');
        } catch (err: any) {
            setError(err.message);
        }
    };
    return(
        <main className='flex flex-col-reverse lg:flex lg:flex-row h-screen '>
            <div className='flex-1 flex flex-col items-center justify-center lg:p-4 align-middle'>
                <h2 className="text-4xl lg:text-6xl font-bold">
                    Bem vindo
                </h2>
                <p className='font-sans text-base lg:text-2xl w-md text-center font-thin mb-8'>
                    Use seu email e senha para acessar sua conta.
                </p>
                <form onSubmit={handleSubmit}>
                    <EmailInput 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                    />
                    <PasswordInput 
                        value={password} 
                        onChange={e => setPassword(e.target.value)} 
                    />
                    <div className='flex flex-col items-center lg:justify-end lg:items-end'>
                        <Link
                            href="/forgotpassword"
                            className='font-semibold transition hover:text-[#82203C]'>
                        Esqueceu sua senha?
                        </Link>
                        <button 
                            type="submit"
                            className='bg-[#1E1E1E] transition hover:bg-[#82203C]
                                text-white w-full mx-8 lg:w-xl box-content h-18 rounded-full text-3xl
                                mt-12 font-bold cursor-pointer'>
                            LOGIN
                        </button>
                        {error && <p>{error}</p>}
                    </div>
                </form>
                <p className='mt-2'>Não tem conta?
                    <Link href="/register" className='font-bold hover:text-[#82203C] ml-0.5'>
                        Cadastre-se agora!
                    </Link>
                </p>
            </div>
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
        </main>
    );
}