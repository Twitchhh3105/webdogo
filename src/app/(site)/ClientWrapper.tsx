"use client";
import { useState, useEffect } from "react";
import { SessionProvider } from "next-auth/react";
import { LanguageProvider } from "@/hooks/useLanguage";
import { ReduxProvider } from "@/redux/provider";
import { CartModalProvider } from "../context/CartSidebarModalContext";
import { ModalProvider } from "../context/QuickViewModalContext";
import { PreviewSliderProvider } from "../context/PreviewSliderContext";
import PreLoader from "@/components/Common/PreLoader";

export default function ClientWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    }, []);

    if (loading) return <PreLoader />;

    return (
        <SessionProvider>
            <LanguageProvider>
                <ReduxProvider>
                    <CartModalProvider>
                        <ModalProvider>
                            <PreviewSliderProvider>
                                {children}
                            </PreviewSliderProvider>
                        </ModalProvider>
                    </CartModalProvider>
                </ReduxProvider>
            </LanguageProvider>
        </SessionProvider>
    );
}
