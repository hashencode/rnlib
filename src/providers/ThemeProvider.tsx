import { createContext, PropsWithChildren, useMemo, useState } from 'react';

import DialogRender from '../components/DialogRender';
import MessageRender from '../components/MessageRender';
import ToastRender from '../components/ToastRender';
import { PortalProvider } from '@gorhom/portal';

export interface ILibProviderProps extends PropsWithChildren {
    theme: { statusBar: { hidden: boolean } };
    local: string;
}

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

function ThemeProvider(props: ILibProviderProps) {
    const [theme, setTheme] = useState({ ...defaultTheme, ...(props.theme || {}) });

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

    return (
        <ThemeContext.Provider value={value}>
            <PortalProvider>{props.children}</PortalProvider>
            <DialogRender />
            <ToastRender />
            <MessageRender />
        </ThemeContext.Provider>
    );
}

export default ThemeProvider;
