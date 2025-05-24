import { Modal } from '../Modal';
import { useState } from 'react';
import { ListItem } from '@/types';
import { PencilSimpleIcon, TrashIcon } from '@phosphor-icons/react';

interface EditListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  list: ListItem;
  onSave: (newName: string) => void;
}

export function EditListModal({ isOpen, onClose, list, onSave, onDelete }: EditListModalProps) {
    const [isRenaming, setIsRenaming] = useState(false)
    const [newName, setNewName] = useState(list.name);

    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newName.trim()) {
        onSave(newName.trim());
        setIsRenaming(false)
    }
    };

    return (
        <Modal 
            isOpen={isOpen}
            onClose={onClose}
            title={`${list.name}`}
        >
            <div className='flex flex-col items-center'>
                {isRenaming ? (
                    <form 
                        onSubmit={handleSubmit}
                        className='text-3xl font-semibold mb-8'
                    >
                        <input 
                            type="text"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            autoFocus
                            className='text-center'
                        />
                    </form>
                ): (
                    <h2 className='text-3xl font-semibold mb-8'>{list.name}</h2>
                )}
                
                <div className='flex flex-col items-center w-full space-y-5'>
                    <button
                        onClick={() => setIsRenaming(true)}
                        className='cursor-pointer flex items-center justify-center rounded-2xl bg-[#3C3C3C] py-2 w-full
                        hover:bg-[#4e4e4e] transition-colors duration-150 ease-in-out gap-2'
                    >
                        <PencilSimpleIcon size={24} weight='fill'/>
                        Renomear
                    </button>
                    <button 
                        onClick={() => {
                            onDelete()
                            onClose()
                        }}
                        className='cursor-pointer flex items-center justify-center rounded-2xl bg-[#82203C] py-2 w-full
                        hover:bg-[#982A35] transition-colors duration-150 ease-in-out gap-2'
                    >
                        <TrashIcon size={24} weight='fill'/>
                        Deletar
                    </button>
                </div>
            </div>
    </Modal>
    );
}