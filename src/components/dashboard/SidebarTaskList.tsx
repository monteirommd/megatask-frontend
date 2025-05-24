'use client'

import { useState } from 'react'
import { PlusCircleIcon, PowerIcon, DotsThreeVerticalIcon, SunIcon, PencilSimpleIcon, TrashIcon } from '@phosphor-icons/react';
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link'
import { v4 as uuidv4 } from 'uuid' 
import Image from 'next/image';
import { ListItem } from '@/types';
import { EditListModal } from '@/components/modals/EditListModal'
import { LogoutModal } from '@/components/modals/LogoutModal';

interface SidebarProps {
    lists: ListItem[];
}

export default function SidebarTaskList({ lists }: SidebarProps){
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentEmail = searchParams.get('email');
    
    const [modal, setModal] = useState<{
        type: 'edit' | 'logout' | null;
        listId?: string;
    }>( { type: null })

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

    const isActive = (path: string) => pathname === path;

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

    const handleEditListName = (id: string, newName: string) => {
        setLocalLists(prev => prev.map(list => (list.id === id ? { ...list, name: newName } : list)));
    };

    const handleDeleteList = (id: string) => {
        setLocalLists(prev => prev.filter(list => list.id !== id));
    };

    const linkBaseRouter = 'flex items-center px-3 py-2 text-sm gap-2 transition-colors duration-150 ease-in-out rounded-2xl'
    const hoverRouter = 'hover:bg-[#434242]'
    const activeRouter = 'bg-[#82203C]'

    return(
        <aside className='w-2xs h-screen flex flex-col justify-around bg-[#1E1E1E]'>
            <nav className='text-white p-8 gap-y-3 justify-baseline'>
                <ul>
                    <Link
                        href={`/dashboard/today`}
                        className={`${linkBaseRouter} ${isActive('/dashboard/today') ? activeRouter : hoverRouter}`}
                    >
                        <SunIcon size={24} weight='bold'/>
                        <h2 className='font-bold text-xl'>Hoje</h2>
                    </Link>
                    
                    <div className='mt-6'>
                    {isAdding ? (
                        <div className='flex flex-col gap-2'>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleCreateList();
                                }}
                                className='flex flex-col gap-2'
                            >
                                <input
                                    type="text"
                                    className='bg-[#3C3C3C] py-2 px-3 text-white rounded-xl text-sm'
                                    placeholder='Nome da nova lista'
                                    value={newListName}
                                    onChange={(e) => setNewListName(e.target.value)}
                                    autoFocus
                                />
                                <div className='flex justify-around'>
                                    <button
                                        type='submit'
                                        className='cursor-pointer text-sm transition-colors
                                        duration-150 ease-in-out hover:bg-[#82203C] rounded-xl py-1 px-4'
                                    >
                                        Criar
                                    </button>
                                    <button
                                        type='button'
                                        className='cursor-pointer text-sm transition-colors duration-150
                                        ease-in-out hover:bg-[#82203C] rounded-xl py-1 px-4'
                                        onClick={() => {
                                            setIsAdding(false);
                                            setNewListName('');
                                        }}
                                    >
                                        Cancelar
                                    </button>
                                </div>
                            </form>
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
                    {localLists.map((list) => {
                        const path = `/dashboard/${list.id}`;
                        const active = isActive(path);

                        return (
                        <li key={list.id} className='mb-2'>
                            <div className={`flex items-center ${active ? activeRouter : ''} rounded-2xl`}>
                                <button 
                                    className='cursor-pointer hover: p-2 rounded-full
                                    transition-colors duration-150 ease-in-out hover:bg-[#434242]/40'
                                    onClick={() => setModal({ type: 'edit', listId: list.id})}
                                >
                                    <DotsThreeVerticalIcon size={24} weight='bold'/>
                                </button>

                                <Link
                                    href={createLink(list.id)}
                                    className={`
                                        ${linkBaseRouter}
                                        ${active ? 'font-semibold' : 'font-medium'}
                                        ${!active ? hoverRouter : ''} w-full
                                    `}
                                >
                                    {list.name}
                                </Link>
                            </div>
                        </li>
                        );
                    })}      
                </ul>
            </nav>
            <div className='flex justify-center mb-6'>
                <button 
                    onClick={() => setModal({ type: 'logout'})}
                    className='text-white flex cursor-pointer items-center gap-x-1 
                    hover:bg-[#82203C] px-4 py-1 transition-colors duration-150 
                    ease-in-out rounded-2xl'
                >
                        <PowerIcon size={20} weight='bold'/>
                        Sair
                </button>
            </div>
            {modal.type === 'edit' && modal.listId && (
                    <EditListModal 
                        isOpen
                        onClose={() => setModal({ type: null})}
                        onDelete={() => handleDeleteList(modal.listId!)}
                        list={localLists.find(l => l.id === modal.listId)!}
                        onSave={(name) => handleEditListName(modal.listId!, name)}
                    />
                )}
                {modal.type === 'logout' && (
                    <LogoutModal isOpen onClose={() => setModal({ type: null })}/>
                )}
        </aside>
    );
}