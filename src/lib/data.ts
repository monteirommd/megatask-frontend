import { ListItem } from '@/types'

export const userTaskList: ListItem[] = [
  { id: 'today', name: 'Hoje', icon: 'SunIcon' },
  { id: 'work', name: 'Trabalho', icon: 'DotsThreeVerticalIcon' },
  { id: 'market', name: 'Mercado', icon: 'DotsThreeVerticalIcon' },
];

export function getListById(id: string) {
  return userTaskList.find((list) => list.id === id) || null;
}   