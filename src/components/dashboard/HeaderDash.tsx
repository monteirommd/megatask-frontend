'use client'
import { UserCircleIcon } from '@phosphor-icons/react'
import Image from 'next/image';

export default function HeaderDash({user}: {user:string | null}){

    return(
        <main className='grid grid-cols-3 items-center p-6 bg-[#1E1E1E]'>
            <div className='flex items-center gap-x-3'>
                <Image
                    alt='Logo MegaTask'
                    src='/favicon.svg'
                    width={35}
                    height={35}
                />
                <h2 className='font-bold text-white text-2xl'>MEGA TASK</h2>
            </div>
            <p className='text-white font-semibold text-center'>Seja bem vindo, {user}</p>
            <UserCircleIcon 
                weight='fill'
                className='text-white justify-self-end'
                size={35}
            />
        </main>
    );
}