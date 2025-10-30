import { Component, ReactNode } from 'react';
import PortalConsumer from './PortalConsumer';
import PortalHost, { PortalContext, PortalMethods } from './PortalHost';

export type IPortalProps = {
    children: ReactNode;
};

class Portal extends Component<IPortalProps> {
    // @component ./PortalHost.tsx
    static Host = PortalHost;

    render() {
        const { children } = this.props;

        return (
            <PortalContext.Consumer>
                {manager => <PortalConsumer manager={manager as PortalMethods}>{children}</PortalConsumer>}
            </PortalContext.Consumer>
        );
    }
}

export default Portal;
