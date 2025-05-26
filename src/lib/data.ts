import { ListItem } from '@/types'
import { Task } from '@/types';

export const userTaskList: ListItem[] = [];

export function getListById(id: string) {
  return userTaskList.find((list) => list.id === id) || null;
}   

export const tasksMock: Task[] = [
  { id: '1', listId: 'today', title: 'Enviar relatório', completed: false, priority: "high" },
  { id: '2', listId: 'today', title: 'Reunião às 15h', completed: true, priority: "low" },
  { id: '3', listId: 'today', title: 'Comprar leite', completed: false, priority: "medium" },
];