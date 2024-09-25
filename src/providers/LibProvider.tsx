import { PropsWithChildren } from 'react';
import DialogRender from '../components/DialogRender';
import ToastRender from '../components/ToastRender';
import ThemeProvider from './ThemeProvider';

function LibProvider(props: PropsWithChildren) {
    return (
        <ThemeProvider>
            {props.children}
            <DialogRender />
            <ToastRender />
        </ThemeProvider>
    );
}

export default LibProvider;
