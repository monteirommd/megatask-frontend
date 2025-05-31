import { ListItem } from '@/types'
import { Task } from '@/types';

export const userTaskList: ListItem[] = [];

export function getListById(id: string) {
  return userTaskList.find((list) => list.id === id) || null;
}   
