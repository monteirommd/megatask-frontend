'use client'

import { useEffect, useState } from 'react'
import { PlusCircleIcon, PowerIcon, DotsThreeVerticalIcon, SunIcon, PencilSimpleIcon, TrashIcon } from '@phosphor-icons/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link'
import { v4 as uuidv4 } from 'uuid' 

import { ListItem, ListaFromApi } from '@/types';
import { EditListModal } from '@/components/modals/EditListModal'
import { LogoutModal } from '@/components/modals/LogoutModal';
import { criarLista, listarListas } from '@/service/api'

import { useAuth } from '@/context/AuthContext'

interface SidebarProps {
    lists: ListItem[];
}

export default function SidebarTaskList({ lists }: SidebarProps){
    const { user, token } = useAuth();

    const router = useRouter()
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

    useEffect(() => {
        const loadLists = async () => {
            if(!user || !token) return
            try{
                const usuario_id = Number(user.id)
                const listsFromApi: ListaFromApi[] = await listarListas(usuario_id, token);

                console.log('Listas recebidas da API:', listsFromApi);
                
                const formattedList = listsFromApi.map(list => ({
                    id: String(list.id),
                    name: list.nome,
                    icon: 'DotsThreeVerticalIcon',
                }));
                setLocalLists(formattedList)
            }catch(error){
                console.error('Erro ao carregar listas', error);
            }
        };
        loadLists();
    }, [user, token])

    const createLink = (listName: string) => {
        let href = `/dashboard/${listName}`
        if (currentEmail) {
            href += `?email=${encodeURIComponent(currentEmail)}`;
        }
        return href;
    }

    const isActive = (path: string) => pathname === path;

    const handleCreateList = async () => {
        if (!newListName.trim() || !user || !token) return;

        try{
            const usuario_id = Number(user.id)
            const response = await criarLista(newListName.trim(), usuario_id, token);

            const newList: ListItem = {
                id: String(response.id), // use o id real do banco
                name: response.nome || newListName.trim(),
                icon: 'DotsThreeVerticalIcon',
             };
            setLocalLists(prev => [...prev, newList]);
            setNewListName('')
            setIsAdding(false)
        } catch (error){
            console.error('Erro ao criar a lista', error);
        }
    }

    const handleEditListName = (id: string, newName: string) => {
        setLocalLists(prev => prev.map(list => (list.id === id ? { ...list, name: newName } : list)));
    };

    const handleDeleteList = (id: string) => {
        setLocalLists(prev => prev.filter(list => list.id !== id));

        const currentListId = pathname.split('/').pop();

        if(currentListId === id) {
            router.push(`/dashboard/today${currentEmail ? `?email=${encodeURIComponent(currentEmail)}` : ''}`)
        }
    };

    const linkBaseRouter = 'flex items-center px-3 py-2 text-sm gap-2 transition-colors duration-150 ease-in-out rounded-2xl'
    const hoverRouter = 'hover:bg-[#434242]'
    const activeRouter = 'bg-[#82203C]'

    return(
        <aside className='w-2xs h-screen flex flex-col justify-around bg-[#181818]'>
            <nav className='text-white p-8 gap-y-3 justify-baseline'>
                <ul>
                    <Link
                        href={`/dashboard/Hoje`}
                        className={`${linkBaseRouter} ${isActive('/dashboard/Hoje') ? activeRouter : hoverRouter}`}
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