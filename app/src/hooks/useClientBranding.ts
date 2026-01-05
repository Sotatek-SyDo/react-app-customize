import { useEffect } from 'react';
import type { ClientConfig } from '@/runtime/types';

export const useClientBranding = (config: ClientConfig) => {
    const { branding } = config;

    useEffect(() => {
        // 1. Update Title
        if (branding?.appName) {
            document.title = branding.appName;
        }

        // 2. Update Favicon
        if (branding?.favicon) {
            const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
            if (link) {
                link.href = branding.favicon;
            } else {
                const newLink = document.createElement('link');
                newLink.rel = 'icon';
                newLink.href = branding.favicon;
                document.head.appendChild(newLink);
            }
        }
    }, [branding]);
};
