import { createContext, PropsWithChildren, useMemo, useState } from 'react';

type Context = {
    theme: {
        statusBar: {
            hidden: boolean;
        };
    };
    showStatusBar: () => void;
    hideStatusBar: () => void;
};

export const ThemeContext = createContext<Context | undefined>(undefined);

const defaultTheme = {
    statusBar: {
        hidden: false,
    },
};

function ThemeProvider(props: PropsWithChildren) {
    const [theme, setTheme] = useState(defaultTheme);

    const toggleStatusBarVisible = (isHidden: boolean) => {
        const newTheme = { ...theme, statusBar: { ...theme.statusBar, hidden: isHidden } };
        setTheme(newTheme);
    };

    const showStatusBar = () => {
        toggleStatusBarVisible(false);
    };

    const hideStatusBar = () => {
        toggleStatusBarVisible(true);
    };

    const value = useMemo(() => {
        return { theme, showStatusBar, hideStatusBar };
    }, [theme, showStatusBar, hideStatusBar]);

    return <ThemeContext.Provider value={value}>{props.children}</ThemeContext.Provider>;
}

export default ThemeProvider;
