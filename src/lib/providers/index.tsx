import { PropsWithChildren } from 'react';
import DialogRender from './DialogRender';
import ThemeProvider from '@/lib/providers/ThemeProvider';

const UIProviders = ({ children }: PropsWithChildren) => {
    return (
        <ThemeProvider>
            {children}
            <DialogRender />
        </ThemeProvider>
    );
};

export default UIProviders;
