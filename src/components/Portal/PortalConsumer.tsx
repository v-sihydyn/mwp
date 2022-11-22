import * as React from 'react';
import { PortalMethods } from './PortalHost';

type Props = {
  manager: PortalMethods;
  children: React.ReactNode;
};

export default class PortalConsumer extends React.Component<Props> {
  async componentDidMount() {
    this._checkManager();

    // Delay updating to prevent React from going to infinite loop
    await Promise.resolve();

    this._key = this.props.manager.mount(this.props.children);
  }

  componentDidUpdate() {
    this._checkManager();

    this.props.manager.update(this._key, this.props.children);
  }

  componentWillUnmount() {
    this._checkManager();

    this.props.manager.unmount(this._key);
  }

  _key: any;

  _checkManager() {
    if (!this.props.manager) {
      throw new Error('Looks like you forgot to wrap your root component with `PortalHost` component');
    }
  }
  render() {
    return null;
  }
}
