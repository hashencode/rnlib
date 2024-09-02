import { PropsWithChildren } from 'react';
import DialogProvider from './DialogProvider';
import ToastProvider from './ToastProvider';
import ThemeProvider from './ThemeProvider';

const UIProviders = ({ children }: PropsWithChildren) => {
    return (
        <ThemeProvider>
            <DialogProvider>
                <ToastProvider>{children}</ToastProvider>
            </DialogProvider>
        </ThemeProvider>
    );
};

export default UIProviders;
