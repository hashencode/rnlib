import { createContext, PropsWithChildren, useMemo, useState } from 'react';

import { PortalProvider } from '@gorhom/portal';
import DialogRender from '../components/DialogRender';
import MessageRender from '../components/MessageRender';
import ToastRender from '../components/ToastRender';

type Context = {
    theme: {
        statusBar: {
            hidden: boolean;
        };
    };
    showStatusBar: () => void;
    hideStatusBar: () => void;
};

export interface IThemeProviderProps extends PropsWithChildren {
    theme?: { statusBar: { hidden: boolean } };
}

const defaultTheme = {
    statusBar: {
        hidden: false,
    },
};

export const ThemeContext = createContext<Context | undefined>(undefined);

export default function ThemeProvider(props: IThemeProviderProps) {
    const { theme: _theme } = props;

    const [theme, setTheme] = useState({ ...defaultTheme, ...(_theme || {}) });

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
