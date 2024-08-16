import { createContext, useContext, useState } from "react";

type ThemeContextProviderProps = {
    children: React.ReactNode
}

type ThemeContextType = {
    themeMode: string
    darkTheme: () => void
    lightTheme: () => void
}

export const ThemeContext = createContext({
    // themeMode: 'light',
    // darkTheme: () => {},
    // lightTheme: () => {}
} as ThemeContextType);

export const ThemeProvider = ({ children }: ThemeContextProviderProps) => {
    const [themeMode, setThemeMode] = useState<string>('light');

    const darkTheme = () => setThemeMode('dark');
    const lightTheme = () => setThemeMode('light');

    return (
        <ThemeContext.Provider value={{ themeMode, darkTheme, lightTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default function useTheme() {
    return useContext(ThemeContext);
}