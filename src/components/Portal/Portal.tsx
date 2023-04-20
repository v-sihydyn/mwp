import * as React from 'react';
import { PortalConsumer } from './PortalConsumer';
import { PortalHost, PortalContext, PortalMethods } from './PortalHost';

type Props = {
  children: React.ReactNode;
};

export class Portal extends React.Component<Props> {
  static Host = PortalHost;

  render() {
    const { children } = this.props;

    return (
      <PortalContext.Consumer>
        {(manager) => (
          <PortalConsumer manager={manager as PortalMethods}>
            {children}
          </PortalConsumer>
        )}
      </PortalContext.Consumer>
    );
  }
}
