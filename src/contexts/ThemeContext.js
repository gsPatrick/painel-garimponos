"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { getSettings } from "@/services/mocks";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState({
        storeName: "Admin Panel",
        logoUrl: "",
        primaryColor: "#0f172a",
        secondaryColor: "#3b82f6"
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const settings = await getSettings();
                if (settings && settings.identity) {
                    setTheme(settings.identity);
                }
            } catch (error) {
                console.error("Failed to load theme settings:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, []);

    const updateTheme = (newIdentity) => {
        setTheme((prev) => ({ ...prev, ...newIdentity }));
    };

    return (
        <ThemeContext.Provider value={{ theme, updateTheme, loading }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    return useContext(ThemeContext);
}
