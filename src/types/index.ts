export interface ListItem {
    id: string;
    name: string;
    icon: string;
}

export interface DashboardLayoutProps {
    children: React.ReactNode;
    searchParams?: { [key: string]: string | string[] | undefined };
}