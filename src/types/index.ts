export interface ListItem {
    id: number;
    name: string;
    icon: string;
}
export type ListaFromApi = {
  id: number;
  nome: string;
};


export interface DashboardLayoutProps {
    children: React.ReactNode;
    searchParams?: { [key: string]: string | string[] | undefined };
}

export type PriorityType = "high" | "medium" | "low" | "none"

export type Task = {
  id: string;
  titulo: string;
  descricao: string;
  data_tarefa: string;
  prioridade: 'baixa' | 'media' | 'alta';
  completed: boolean;
  lista_tarefa_id: number;
};
