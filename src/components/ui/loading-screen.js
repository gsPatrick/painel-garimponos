"use client";

import { Box } from "lucide-react";

export function LoadingScreen() {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm transition-all duration-500">
            <div className="relative flex flex-col items-center">
                {/* Animated Logo Container */}
                <div className="relative flex items-center justify-center size-24 mb-8">
                    <div className="absolute inset-0 rounded-3xl bg-primary/20 animate-ping duration-1000" />
                    <div className="relative flex items-center justify-center size-20 rounded-2xl bg-gradient-to-br from-primary to-violet-600 shadow-2xl shadow-primary/30 animate-pulse">
                        <Box className="size-10 text-white" />
                    </div>
                </div>

                {/* Text */}
                <div className="space-y-2 text-center">
                    <h3 className="text-xl font-bold tracking-tight text-foreground animate-in fade-in slide-in-from-bottom-4 duration-700">
                        AdminPanel
                    </h3>
                    <p className="text-sm text-muted-foreground animate-in fade-in slide-in-from-bottom-3 duration-1000 delay-150">
                        Carregando sistema...
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="w-48 h-1 mt-8 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary animate-progress-indeterminate origin-left" />
                </div>
            </div>
        </div>
    );
}
