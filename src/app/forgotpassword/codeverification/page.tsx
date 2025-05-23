'use client'

import Link from "next/link";
import { useRef } from 'react';
import { useSearchParams } from "next/navigation";
import LogoContent from "@/components/login/LogoContent";
//importação de bibliotecas

//inicialização do componente React
export default function CodeVerification() {
    //uso do hook useRouter para buscar parametros atribuidos anteriormente
    const searchParams = useSearchParams();
    //atribuição do parametro enviado da rota anterior a uma variavel email
    const email = searchParams.get('email');

    //Definição da variavel input e atibuição do useRef para não renderizar componente ao alterar estado
    //tipificação com typescript => Tipo = array de elementos html ou null
    const inputs = useRef<Array<HTMLInputElement | null>>([]);
    //instanciação de variavel apenas para teste
    // constante para alteração de input
    const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        // constante que recebera o valor do input
        const value = e.target.value;
        if (/^\d$/.test(value)) {
            if (inputs.current[index + 1]) {
                inputs.current[index + 1]?.focus();
            }
        } else if (value === '') {
            // ok (backspace)
        } else {
            e.preventDefault();
        }
    };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !inputs.current[index]?.value && inputs.current[index - 1]) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    //recebe todos os valores digitados no input
    const code = inputs.current.map((input) => input?.value).join('');
    //verifica se o input recebeu 4 valores e retorna erro caso não tenha recebido
    if (code.length < 4) {
      alert('Por favor, preencha todos os dígitos.');
      return;
    }

    // Enviar o código
    console.log('Código enviado:', code);
    // Você pode usar fetch ou qualquer lógica de verificação aqui
  };

    

    return(
        <main className='flex flex-col lg:flex lg:flex-row h-screen '>    
            <div className='flex-1 flex flex-col items-center justify-center lg:p-4 align-middle'>
                <h2 className="text-3xl text-center lg:text-5xl font-bold">
                    Redefinir Senha
                </h2>
                <p className='font-sans text-base lg:text-2xl w-md text-center font-thin mb-8'>
                    Código enviado para <span className="font-normal">{email}</span>
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="flex justify-center gap-4">
                        {[0, 1, 2, 3].map((i)=> (
                            <input 
                                key={i}
                                type="text"
                                maxLength={1}
                                className="w-12 h-12 text-center text-2xl border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                onChange={(e) => handleChange(i, e)}
                                onKeyDown={(e) => handleKeyDown(i, e)}
                                ref={(el) => { inputs.current[i] = el; }}   
                            />
                            
                        ))}
                    </div>
                    <div className='flex flex-col items-center lg:justify-end lg:items-end'>
                        <button 
                            type="submit"
                            className='bg-[#1E1E1E] transition hover:bg-[#82203C]
                                text-white w-full    mx-8 lg:w-xl box-content h-18 rounded-full text-3xl
                                mt-12 font-bold cursor-pointer'>
                            Continue
                        </button>
                    </div>
                </form>
                <p>Não recebeu o email? <button className="border-none cursor-pointer font-bold mt-2 hover:text-[#82203C]">Aperte para reenviar</button></p>
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

