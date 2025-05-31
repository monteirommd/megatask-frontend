import SidebarTaskList from "@/components/dashboard/SidebarTaskList";
import HeaderDash from "@/components/dashboard/HeaderDash";
import { DashboardLayoutProps } from "@/types";
import SidebarEdit from "@/components/dashboard/SidebarEdit";
import { SidebarProvider } from "@/context/SidebarContext";

import { userTaskList } from "@/lib/data";

export default async function DashboardLayout( {children, searchParams}: DashboardLayoutProps ){

    return(
        <SidebarProvider>
            <div className="flex flex-col h-screen">
                <HeaderDash/>
                <div className="flex flex-1 overflow-hidden">
                    <SidebarTaskList
                        lists={userTaskList}
                    />
                    <main className="flex-1 p-6 overflow-y-auto bg-[#1E1E1E]">
                        {children}
                    </main>
                    <SidebarEdit />
                </div>
            </div>
        </SidebarProvider>
    );
}