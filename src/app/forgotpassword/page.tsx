'use client'

import EmailInput from "@/components/login/EmailInput";
import { ArrowLeftIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LogoContent from "@/components/login/LogoContent";

export default function ForgotPassword(){
    // contante de variavel que receberá o valor da string email
    const [email, setEmail] = useState('')
    // hook para navegação entre rotas com acesso de informação na proxima rota
    const router = useRouter();
    //função para submição de formulario
    const handleSubmit = (e: React.FormEvent) => {
        //prevenção de reloud de página, evento default do form
        e.preventDefault();
        //uso do hook useRouter para navegação entre rotas guardando email declarado no input
        router.push(`/forgotpassword/codeverification?email=${encodeURIComponent(email)}`)
    }

    return(
        <main className='flex flex-col lg:flex lg:flex-row h-screen '>    
            <div className='flex-1 flex flex-col items-center justify-center lg:p-4 align-middle'>
                <h2 className="text-3xl text-center lg:text-5xl font-bold">
                    Esqueceu sua senha?
                </h2>
                <p className='font-sans text-base lg:text-2xl w-md text-center font-thin mb-8'>Sem problemas! Digite seu e-mail e receba instruções de como redefinir sua senha.</p>
                <form onSubmit={handleSubmit}>
                    <EmailInput 
                        value={email} 
                        onChange={e => setEmail(e.target.value)} 
                    />
                    
                    <div className='flex flex-col items-center lg:justify-end lg:items-end'>
                        <button 
                            type="submit"
                            className='bg-[#1E1E1E] transition hover:bg-[#82203C]
                                text-white w-full mx-8 lg:w-xl box-content h-18 rounded-full text-3xl
                                mt-12 font-bold cursor-pointer'>
                            Redefir Senha
                        </button>
                    </div>
                </form>
                <div className="flex items-center mt-2">
                    <ArrowLeftIcon weight="bold" className="mr-1"/>
                    <p className=''>De volta ao
                        <Link href="/login" className='font-bold hover:text-[#82203C] ml-0.5'>
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