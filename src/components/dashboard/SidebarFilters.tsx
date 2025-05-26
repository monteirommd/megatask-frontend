import Image from 'next/image';
import { FunnelIcon, ArrowUpIcon, ArrowDownIcon, ArrowsDownUpIcon } from '@phosphor-icons/react'

export default function SidebarFilters(){
    return(
        <aside>   
            <div className='flex space-x-2 items-center text-white mb-8'>
                <FunnelIcon weight='fill' size={24} />
                <h2 className='font-semibold'>Filters</h2>
            </div>
            <div className='text-white space-y-6'>
                <div className='border p-2 rounded-[4px] flex flex-col space-y-3'>
                    <div className='flex items-center space-x-1'>
                        <Image
                            src='/abcube.svg'
                            alt='Icone de letra em cubo'
                            width={24}
                            height={24}
                        />
                        <h3 className='font-semibold'>Ordem Alfabética</h3>
                    </div>
                    <div>
                        <button className='flex items-center space-x-1 cursor-pointer'>
                            <Image
                                src='/az.svg'
                                alt='Icone de ordem crescente'
                                width={24}
                                height={24}
                            />
                            Ordem Crescente
                        </button>
                    </div>
                    <button className='flex items-center space-x-1 cursor-pointer'>
                        <Image
                            src='/za.svg'
                            alt='Icone de ordem decrescente'
                            width={24}
                            height={24}
                        />
                        Ordem Decrescente
                    </button>
                </div>
                <div className='border p-2 rounded-[4px] flex flex-col space-y-3'>
                    <div className='flex items-center space-x-1'>
                        <ArrowsDownUpIcon weight='bold' size={24}/>
                        <h3  className='font-semibold'>Prioridade</h3>
                    </div>
                    <button className='flex items-center space-x-1 cursor-pointer'>
                        <ArrowUpIcon size={24} />
                        Maior Prioridade
                    </button>
                    <button className='flex items-center space-x-1 cursor-pointer'>
                        <ArrowDownIcon size={24}/>
                        Menor Prioridade
                    </button>
                </div>
                <div className='border p-2 rounded-[4px] flex flex-col space-y-3'>
                    <div className='flex items-center space-x-1'>
                        <ArrowsDownUpIcon weight='bold' size={24}/>
                        <h3 className='font-semibold'>Data</h3>
                    </div>
                    <button className='flex items-center space-x-1 cursor-pointer'>
                        <ArrowUpIcon size={24}/>
                        Recente
                    </button>
                    <button className='flex items-center space-x-1 cursor-pointer'>
                        <ArrowDownIcon size={24}/>
                        Antigo
                    </button>
                </div>
            </div>
        </aside>
    );
}