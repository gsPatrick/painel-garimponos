"use client";

import React, { useEffect } from "react";
import { AppSidebar } from "./AppSidebar";
import { Header } from "./Header";
import useAuth from "@/hooks/useAuth";
import { useRouter, usePathname } from "next/navigation";

export function AppLayout({ children }) {
    const { isAuthenticated, isLoading, checkAuth } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = React.useState(false);

    useEffect(() => {
        const verify = async () => {
            const isValid = await checkAuth();
            if (!isValid && pathname !== "/login") {
                router.push("/login");
            }
        };
        verify();
    }, [pathname, checkAuth, router]);

    // Handle resize for auto-collapse
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 1024) {
                setIsCollapsed(true);
            } else {
                setIsCollapsed(false);
            }
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen w-screen bg-background">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    // If on login page, don't show layout
    if (pathname === "/login") {
        return <>{children}</>;
    }

    return (
        <div className="flex min-h-screen bg-background text-foreground font-sans antialiased selection:bg-primary/20 selection:text-primary">
            <AppSidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
            <main
                className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${isCollapsed ? "lg:pl-20" : "lg:pl-72"
                    }`}
            >
                <Header />
                <div className="flex-1 p-6 lg:p-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {children}
                </div>
            </main>
        </div>
    );
}
