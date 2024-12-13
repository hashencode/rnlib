import { PropsWithChildren } from 'react';
import { Host } from 'react-native-portalize';

import DialogRender from '../components/DialogRender';
import MessageRender from '../components/MessageRender';
import ToastRender from '../components/ToastRender';
import ThemeProvider from './ThemeProvider';
import { PortalProvider } from '@gorhom/portal';

function LibProvider(props: PropsWithChildren) {
    return (
        <ThemeProvider>
            <Host>
                <PortalProvider>{props.children}</PortalProvider>
                <DialogRender />
                <ToastRender />
                <MessageRender />
            </Host>
        </ThemeProvider>
    );
}

export default LibProvider;
