'use client'

import { useAuth } from '@/context/AuthContext'
import Link from 'next/link';
import PasswordInput from "../../components/login/PasswordInput";
import EmailInput from "../../components/login/EmailInput";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import LogoContent from '@/components/login/LogoContent';
import { login } from '@/service/api'
import Cookies from 'js-cookie';

export default function LoginPage(){
    const router = useRouter();

    const { login: loginContext } = useAuth()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) =>{
        e.preventDefault();
        console.log("Tentando login com:", { email, password });
        setError('')

        try {
            const res = await login(email, password);
            if (!res || !res.token || !res.user) {
                throw new Error('Resposta inválida do servidor');
            }


            loginContext(res.token, res.user);

            router.push('/dashboard');
        } catch (err: any) {
            setError('Email ou senha inválidos');
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
                        {error && <p className='text-center text-[#982A35]'>{error}</p>}
                    </div>
                </form>
                <p className='mt-2'>Não tem conta?
                    <Link href="/register" className='font-bold hover:text-[#82203C] ml-0.5'>
                        Cadastre-se agora!
                    </Link>
                </p>
            </div>
            <LogoContent 
                key="component-persist"  
            />
        </main>
    );
}