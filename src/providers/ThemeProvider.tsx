import { createContext, PropsWithChildren, useMemo, useState } from 'react';

import ActionSheetRender from '../components/ActionSheet/ActionSheetRender.tsx';
import DialogRender from '../components/Dialog/DialogRender.tsx';
import MessageRender from '../components/Message/MessageRender.tsx';
import OverlayRender from '../components/Overlay/OverlayRender.tsx';
import PickerRender from '../components/Picker/PickerRender.tsx';
import PortalHost from '../components/Portal/PortalHost.tsx';
import ToastRender from '../components/Toast/ToastRender.tsx';

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
            <PortalHost>
                {props.children}
                <OverlayRender />
                <ActionSheetRender />
                <PickerRender />
                <DialogRender />
                <MessageRender />
                <ToastRender />
            </PortalHost>
        </ThemeContext.Provider>
    );
}
