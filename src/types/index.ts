
export type IconName = 'SunIcon' | 'PlusCircleIcon' | 'DotsThreeVerticalIcon';

export interface ListItem {
    id: string;
    name: string;
    icon: IconName;
}

export interface DashboardLayoutProps {
    children: React.ReactNode;
    searchParams?: { [key: string]: string | string[] | undefined };
}