'use client'

import { useEffect } from 'react'

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}


export default function ModalLogout({ isOpen, onClose, children}: ModalProps){
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if(e.key === 'Escape') onClose();
        };
        if(isOpen){
            document.addEventListener('keydown', handleKey)
        }
        return () => document.removeEventListener('keydown', handleKey)

    },[isOpen, onClose]);

    if(!isOpen) return null;

    return(
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
            <div className='bg-[#1E1E1E] rounded-lg shadow-xl w-full max-w-md p-6 relative'>
                <button onClick={onClose} className='absolute top-2 right-2 text-white transition-colors duration-150 ease-in-out hover:text-gray-500 text-lg cursor-pointer'>
                    ×
                </button>
                {children}
            </div>
        </div>
    );
}