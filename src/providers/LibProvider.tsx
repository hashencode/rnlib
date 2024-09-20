import { createContext, PropsWithChildren, useMemo, useState } from 'react';
import DialogRender from '../components/DialogRender';
import ToastRender from '../components/ToastRender';
import ThemeProvider from './ThemeProvider';

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

function LibProvider(props: PropsWithChildren) {
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

    return (
        <ThemeProvider>
            {props.children}
            <DialogRender />
            <ToastRender />
        </ThemeProvider>
    );
}

export default LibProvider;
