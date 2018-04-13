/// <reference types="react" />
import * as React from 'react';
export interface ProviderProps {
    children?: any;
    caching?: boolean;
    locale: string;
    messages: {
        [prop: string]: any;
    };
}
/**
 * Provider
 * Wrapper for the main react component
 */
export declare const LocalizeProvider: React.SFC<ProviderProps>;
/**
 * Consumer
 * Get the localized string
 */
export interface LocalizeProps {
    path: string;
}
export declare const Localize: React.SFC<LocalizeProps>;
