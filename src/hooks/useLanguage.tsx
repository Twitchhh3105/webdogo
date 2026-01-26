"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { vi } from "@/lang/vi";

type Dictionary = typeof vi;

interface LanguageContextType {
    t: Dictionary;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
    children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
    // Always use Vietnamese
    const t = vi;

    return (
        <LanguageContext.Provider value={{ t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}

export default useLanguage;
