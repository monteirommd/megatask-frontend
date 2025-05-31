import { useState, ReactNode, ElementType } from 'react'

interface TaskButtonWithMenuProps {
    label: string;
    icon: ElementType;
    children: ReactNode;
}


const TaskButtonWithMenu = ({ label, icon: Icon, children }: TaskButtonWithMenuProps) => {
    const [isOpen, setIsOpen] = useState(false)
    
    return(
        <div className='border rounded-[4px] border-white'>
            <button onClick={() => setIsOpen(!isOpen)}
                className='flex items-center p-2 space-x-2 cursor-pointer text-white w-full'    
            >
                <Icon size={24}/>
                <span>{label}</span>
            </button>
            {isOpen && <div>{children}</div>}
        </div>
    );
}

export default TaskButtonWithMenu;  