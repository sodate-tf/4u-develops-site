// src/types/globals.d.ts
// Este arquivo estende a interface Window para incluir a função gtag.

interface GtagEventParams {
    action: string;
    category: string;
    label: string;
    value?: number;
}

interface Window {
    gtag: (command: 'config' | 'event', targetId: string, params?: Record<string, any> | GtagEventParams) => void;
}
