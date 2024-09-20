import { PropsWithChildren } from 'react';
import DialogRender from './DialogRender';
import ThemeProvider from '../providers/ThemeProvider';
import ToastRender from '../providers/ToastRender';

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
