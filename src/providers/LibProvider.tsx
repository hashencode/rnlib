import { PortalProvider } from '@gorhom/portal';
import { PropsWithChildren } from 'react';

import DialogRender from '../components/DialogRender';
import ToastRender from '../components/ToastRender';
import ThemeProvider from './ThemeProvider';

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
