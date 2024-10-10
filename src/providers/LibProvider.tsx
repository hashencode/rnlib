import { PropsWithChildren } from 'react';
import DialogRender from '../components/DialogRender';
import ToastRender from '../components/ToastRender';
import ThemeProvider from './ThemeProvider';
import { PortalProvider } from '@gorhom/portal';

function LibProvider(props: PropsWithChildren) {
    return (
        <ThemeProvider>
            <PortalProvider>{props.children}</PortalProvider>
            <DialogRender />
            <ToastRender />
        </ThemeProvider>
    );
}

export default LibProvider;
