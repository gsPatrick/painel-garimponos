"use client";

import React, { createContext, useContext } from "react";

const SystemThemeContext = createContext({
    themeConfig: {
        SYSTEM_COLOR_PRIMARY: "#0f172a", // Default Slate 900
        SYSTEM_LOGO: null
    }
});

export const SystemThemeProvider = ({ children }) => {
    return (
        <SystemThemeContext.Provider value={{ themeConfig: { SYSTEM_COLOR_PRIMARY: "#0f172a", SYSTEM_LOGO: null } }}>
            {children}
        </SystemThemeContext.Provider>
    );
};

export const useSystemTheme = () => useContext(SystemThemeContext);
