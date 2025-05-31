import { FunnelIcon, PlusCircleIcon } from '@phosphor-icons/react'
import { useSidebar } from '@/context/SidebarContext';
import { criarTarefa } from '@/service/api';
import { useParams } from 'next/navigation';
import { Task } from '@/types';


export default function AddTask({ onTaskCreated }: {onTaskCreated: (t: Task) => void }){
    const { sidebarType, toggleSidebar } = useSidebar()
    const params = useParams();
    const listId = Number(params.listId);
    
    async function handleAddTask() {
        if(!listId){
            console.error('Lista não encontrada')
            return;
        }
        const tarefaDefault = {
            titulo: 'Task',
            descricao: '',
            data_tarefa: new Date().toISOString().split('T')[0],
            prioridade: 'Baixa',
            concluida: false,
            lista_tarefa_id: listId,
        };

        try {
            const novaTarefa = await criarTarefa(tarefaDefault);
            onTaskCreated(novaTarefa); // atualiza lista no componente pai
        } catch (error) {
            console.error('Erro ao criar tarefa:', error);
        }
    }

    return(
        <div className='flex space-x-2 p-2 bg-[#3C3C3C] rounded-xl mb-6'>
            <button
                onClick={() => toggleSidebar("filters")}
                className={`
                    cursor-pointer transition
                    ${sidebarType === "filters" ? "text-[#82203C] hover:text-[#82203c95]" : "text-white hover:text-gray-600"}`}
            >
                <FunnelIcon size={24} weight='fill' />
            </button>
            <button
                onClick={handleAddTask}
                className='cursor-pointer transition text-white hover:text-gray-600'
            >
                <PlusCircleIcon size={24} weight='fill' />
            </button>
        </div>
    );
}