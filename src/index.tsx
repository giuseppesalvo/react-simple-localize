import * as React from 'react'
import {
    resolvePath,
    isInvalid
} from './utils'

/**
 * Creating the context api with default params
 * Square brackets because @types/react does not contain the new create context api
 * Context api documentation: https://reactjs.org/docs/context.html
 */
const { Provider, Consumer } = React['createContext']({
    caching : true,
    locale  : "",
    messages: {},
})

export interface ProviderProps {
    children? : any,
    caching?  : boolean,
    locale    : string,
    messages  : { [prop:string]: any },
}

/**
 * Provider
 * Wrapper for the main react component
 */

export const LocalizeProvider:React.SFC<ProviderProps> = ({ messages, locale, children, caching = true }) => (
    <Provider value={{
        caching,
        messages: messages,
        locale: locale,
    }}>{children}</Provider>
)

/***
 * Caching messages, so we don't need to resolve the object path everytime
 * We are doing this because messages should never change
 */

type Cache = {[prop:string]:any}

const cache: Cache = {}

function getCachedMessage({ locale, messages }: ProviderProps, path:string): string {

    // Initializing locale object if it doesn't exist
    cache[locale] = cache[locale] || {}

    if ( ! cache[locale][path] ) {
        cache[locale][path] = resolvePath(messages[locale], path)
    }

    return cache[locale][path]
}

function getMessage({ locale, caching, messages }: ProviderProps, path: string): string {

    if ( isInvalid(locale) || isInvalid(messages) || isInvalid(path) )
        return undefined

    if ( caching ) {
        return getCachedMessage({ locale, messages }, path)
    } else {
        return resolvePath(messages[locale], path)
    }
}

/**
 * Consumer
 * Get the localized string
 */

export interface LocalizeProps {
    path: string
}

export const Localize: React.SFC<LocalizeProps> = ({ path }: LocalizeProps) => {
    return <Consumer>{
        (props:ProviderProps) =>
            getMessage(props, path) || `localization missing -> '${props.locale}' : ${path}`
    }</Consumer>
}