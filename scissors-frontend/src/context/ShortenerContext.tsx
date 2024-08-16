import { createContext, useContext, useState } from 'react'
import { back } from '../api'

export type UrlUser = {
    long_url: string
    custom_code: string
    option: string
}

export type ShortenerContextProviderProps = {
    children: React.ReactNode
}

type ShortenerContextType = {
    shortUrl: string
    shortenUrl: (url: UrlUser) => Promise<void>
    setShortUrl: React.Dispatch<React.SetStateAction<string>>
}

export const ShortenerContext = createContext({} as ShortenerContextType)

export const ShortenerContextProvider = ({ children }: ShortenerContextProviderProps ) => {
    const [shortUrl, setShortUrl] = useState<string>('');

    const shortenUrl = async (url: UrlUser) => {
        try {
            console.log("Sending request with headers:", back.defaults.headers);
            console.log(back.toString())
            const response = await back.post('/api/shorten/', url)
            console.log(response)
            setShortUrl(response.data.short_url)
        } catch(error) {
            console.error('URL cannot be shortened', error)
        }
    }

    return (
        <ShortenerContext.Provider
        value={{shortenUrl, shortUrl, setShortUrl}}>
            { children }
        </ShortenerContext.Provider>
    )
}

export const useShortener = () => { return useContext(ShortenerContext) }
export default ShortenerContext