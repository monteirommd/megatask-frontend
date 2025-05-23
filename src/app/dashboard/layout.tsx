import SidebarTaskList from "@/components/dashboard/SidebarTaskList";
import HeaderDash from "@/components/dashboard/HeaderDash";
import { DashboardLayoutProps } from "@/types";

import { userTaskList } from "@/lib/data";

export default async function DashboardLayout( {children, searchParams}: DashboardLayoutProps ){
    const userEmail = searchParams?.email as string | null;

    return(
        <div className="flex flex-col h-screen">
            <HeaderDash
                user={userEmail}
            />
            <div className="flex flex-1 overflow-hidden">
                <SidebarTaskList
                    lists={userTaskList}
                />
                <main className="flex-1 p-6 overflow-y-auto bg-gray-100">
                    {children}
                </main>
            </div>
        </div>
    );
}