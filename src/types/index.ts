export interface ListItem {
    id: string;
    name: string;
    icon: string;
}

export interface DashboardLayoutProps {
    children: React.ReactNode;
    searchParams?: { [key: string]: string | string[] | undefined };
}

export type Priority = "high" | "medium" | "low" | "none"

export interface Task {
    id: string;
    listId: string | string[];
    title: string;
    priority: Priority
    completed: boolean;
}
