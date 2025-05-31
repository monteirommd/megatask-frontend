'use client'

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { validarUsuario } from "@/service/api"

export default function ValidateUserPage(){
    const { code } = useParams()
    const router = useRouter()

    const [message, setMessage] = useState('Validando usuário...')
    const [error, setError] = useState('')

    useEffect(() => {
        const validate = async() => {
            try{
                await validarUsuario(code as string);
                setMessage('Usuário validado com sucesso! Redirecionando...')
                setTimeout(() => {
                    router.push('/login');
                }, 2500);
            }catch{
                setError('Erro na validação. Código inválido ou expirado')
            }
        };
        if(code) {
            validate()
        }
    }, [code, router]);

    return(
        <div className="flex flex-col items-center justify-center min-h-screen">
            {error? (
                <p className="text-red-600 text-xl">{error}</p>
            ):(
                <p className="text-green-600 text-xl">{message}</p>
            )}
        </div>
    )
}