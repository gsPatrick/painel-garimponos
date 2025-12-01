"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Slash, Sun, Moon, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
    const pathname = usePathname();
    const segments = pathname.split("/").filter(Boolean);

    // Simple Theme Toggle (Placeholder logic, can be connected to a theme provider)
    const [theme, setTheme] = React.useState("light");
    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        document.documentElement.classList.toggle("dark");
    };

    return (
        <header className="h-20 px-8 flex items-center justify-between sticky top-0 z-30 bg-background/50 backdrop-blur-md border-b border-border/40">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Admin</span>
                {segments.map((segment, index) => (
                    <React.Fragment key={segment}>
                        <Slash className="size-3 -rotate-12 opacity-50" />
                        <span className="capitalize font-medium text-foreground">
                            {segment.replace("-", " ")}
                        </span>
                    </React.Fragment>
                ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="rounded-full">
                    <Bell className="size-5" />
                </Button>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <Sun className="size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            <span className="sr-only">Toggle theme</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => { setTheme("light"); document.documentElement.classList.remove("dark"); }}>
                            Light
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => { setTheme("dark"); document.documentElement.classList.add("dark"); }}>
                            Dark
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
}
