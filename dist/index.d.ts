/// <reference types="react" />
import * as React from 'react';
/**
 * Provider
 * Wrapper for the main react component
 * <LocalizeProvider locale="en" messages={your_message}>
 *     <YourApp />
 * </LocalizeProvider>
 */
export interface ProviderProps {
    children?: any;
    caching?: boolean;
    locale: string;
    messages: {
        [prop: string]: any;
    };
}
export declare const LocalizeProvider: React.SFC<ProviderProps>;
/**
 * Consumer
 * Get the localized string
 * <Localize path="message.path" />
 */
export interface LocalizeProps {
    path: string;
}
export declare const Localize: React.SFC<LocalizeProps>;
