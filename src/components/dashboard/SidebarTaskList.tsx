'use client'

import { iconMap } from '@/lib/icons';
import ModalLogout from '@/components/ModalLogout';
import { PlusCircleIcon, PowerIcon } from '@phosphor-icons/react';
import Link from 'next/link'
import Image from 'next/image';
import { ListItem } from '@/types';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

interface SidebarProps {
    lists: ListItem[];
}

export default function SidebarTaskList({ lists }: SidebarProps){
    const router = useRouter()
    const [isModalOpen, setIsModalOpen] = useState(false);

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentEmail = searchParams.get('email');

    const [localLists, setLocalLists] = useState<ListItem[]>(lists);
    const [newListName, setNewListName] = useState('');
    const [isAdding, setIsAdding] = useState(false);

    const createLink = (listId: string) => {
        let href = `/dashboard/${listId}`
        if (currentEmail) {
            href += `?email=${encodeURIComponent(currentEmail)}`;
        }
        return href;
    }


    const handleCreateList = () => {
        if (!newListName.trim()) return;

        const newList: ListItem = {
            id: uuidv4(),
            name: newListName.trim(),
            icon: 'DotsThreeVerticalIcon',
        };

        setLocalLists(prev => [...prev, newList]);
        setNewListName('')
        setIsAdding(false)
    }

    return(
        <aside className='w-2xs h-screen flex flex-col justify-around bg-[#1E1E1E]'>
            <nav className='text-white p-8 gap-y-3 justify-baseline'>
                <ul>
                    {localLists.map((list) => {
                        const isActive = pathname === `/dashboard/${list.id}`;
                        const IconComponent = iconMap[list.icon];

                        return (
                        <li key={list.id} className='mb-2'>
                            <Link
                                href={createLink(list.id)}
                                className={`
                                    flex items-center px-3 py-2 text-sm
                                    transition-colors duration-150 ease-in-out
                                    ${isActive
                                        ? 'bg-[#82203C] font-semibold rounded-2xl'
                                        : 'bg-transparent hover:bg-[#434242] font-medium rounded-2xl'
                                    }
                                    `}
                            >
                                {IconComponent && (
                                    <IconComponent
                                        size={20}
                                        className='mr-2'
                                    />
                                )}
                                {list.name}
                            </Link>
                        </li>
                        );
                    })}
                </ul>

                <div className='mt-6'>
                    {isAdding ? (
                        <div className='flex flex-col gap-2'>
                            <input 
                                type="text" 
                                className='bg-[#3C3C3C] py-1 px-3 text-white rounded-xl text-sm'
                                placeholder='Nome da nova lista'
                                value={newListName}
                                onChange={(e) => setNewListName(e.target.value)}
                            />
                            <div className='flex justify-around'>
                                <button
                                    onClick={handleCreateList}
                                    className='cursor-pointer text-sm transition-colors duration-150 ease-in-out hover:bg-[#82203C] rounded-xl py-1 px-4'
                                >
                                    Criar
                                </button>
                                <button
                                    className='cursor-pointer text-sm transition-colors duration-150 ease-in-out hover:bg-[#82203C] rounded-xl py-1 px-4'
                                    onClick={() => {
                                        setIsAdding(false);
                                        setNewListName('');
                                    }}
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button
                            className='flex flex-1  w-full items-center px-3 py-2  gap-x-2 cursor-pointer text-sm
                                    transition-colors duration-150 ease-in-out
                                    bg-transparent hover:bg-[#434242] font-medium rounded-2xl'
                            onClick={() => setIsAdding(true)}
                        >
                            <PlusCircleIcon  size={20}/>
                            <span>Nova Lista</span>
                        </button>
                    )}
                </div>
            </nav>
            <div className='flex justify-center mb-6'>
                <button 
                    onClick={() => setIsModalOpen(true)}
                    className='text-white flex cursor-pointer items-center gap-x-1 
                    hover:bg-[#82203C] px-4 py-1 transition-colors duration-150 
                    ease-in-out rounded-2xl'
                >
                        <PowerIcon size={20} weight='bold'/>
                        Sair
                </button>
                <ModalLogout isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                    <div className='flex flex-col items-center py-10'>
                        <Image
                            src="/favicon.svg"
                            alt="Logo Mega Task"
                            width={125}
                            height={125}
                            priority
                        />
                        <h2 className='text-white font-semibold text-3xl mb-8 mt-2'>Já está indo embora?</h2>
                        <button 
                            onClick={() => router.push('/login')}
                            className='bg-[#82203C] text-white font-semibold text-xl cursor-pointer
                            py-1 transition-colors duration-150 ease-in-out rounded-2xl w-full mb-2 hover:bg-[#982A35]'
                        >
                            Sim, Sair
                        </button>
                        <button 
                            onClick={() => setIsModalOpen(false)}
                            className='text-gray-500 text-xl cursor-pointer font-semibold 
                            hover:bg-[#434242]/50 hover:text-gray-300 w-full rounded-2xl transition-colors duration-150 ease-in-out py-1'
                        >
                            Não, vou ficar
                        </button>
                    </div>

                </ModalLogout>
            </div>
        </aside>
    );
}