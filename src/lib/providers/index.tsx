import { PropsWithChildren } from 'react';
import DialogRender from './DialogRender';
import ThemeProvider from '@/lib/providers/ThemeProvider';
import ToastRender from '@/lib/providers/ToastRender';

const LibProviders = ({ children }: PropsWithChildren) => {
    return (
        <ThemeProvider>
            {children}
            <DialogRender />
            <ToastRender />
        </ThemeProvider>
    );
};

export default LibProviders;
