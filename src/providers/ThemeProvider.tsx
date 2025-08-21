import { createContext, PropsWithChildren, useEffect, useMemo, useState } from 'react';

import DialogRender from '../components/DialogRender';
import MessageRender from '../components/MessageRender';
import ToastRender from '../components/ToastRender';
import { PortalProvider } from '@gorhom/portal';
import { I18nextProvider } from 'react-i18next';
import i18n from '../scripts/i18n';

type Context = {
    theme: {
        statusBar: {
            hidden: boolean;
        };
    };
    showStatusBar: () => void;
    hideStatusBar: () => void;
    changeLanguage: (lang: string) => void;
};

export interface IThemeProviderProps extends PropsWithChildren {
    theme?: { statusBar: { hidden: boolean } };
    local?: 'zh-CN' | 'en-US' | 'ru-RU';
}

const defaultTheme = {
    statusBar: {
        hidden: false,
    },
};

export const ThemeContext = createContext<Context | undefined>(undefined);

export default function ThemeProvider(props: IThemeProviderProps) {
    const { local, theme: _theme } = props;

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

    // 切换语言
    const changeLanguage = (language: string) => {
        i18n.changeLanguage(language || 'zh-CN');
    };

    const value = useMemo(() => {
        return { theme, showStatusBar, hideStatusBar, changeLanguage };
    }, [theme, showStatusBar, hideStatusBar, changeLanguage]);

    useEffect(() => {
        if (local) {
            changeLanguage(local);
        }
    }, [local]);

    return (
        <I18nextProvider i18n={i18n}>
            <ThemeContext.Provider value={value}>
                <PortalProvider>{props.children}</PortalProvider>
                <DialogRender />
                <ToastRender />
                <MessageRender />
            </ThemeContext.Provider>
        </I18nextProvider>
    );
}
