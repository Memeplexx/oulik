import { OptionsForReduxDevtools } from '../src/shapes-external';
import { WindowAugmentedWithReduxDevtools } from '../src/shapes-internal';

export const windowAugmentedWithReduxDevtoolsImpl = {
  __REDUX_DEVTOOLS_EXTENSION__: new class {
    connect = (options: OptionsForReduxDevtools) => ({
      init: (state: any) => null,
      subscribe: (listener: (message: { type: string, payload: any, state?: any, source: any }) => any) => this._subscribers.push(listener),
      send: () => null,
    });
    disconnect = () => null;
    send = (action: { type: string, payload?: any }, state: any, options: OptionsForReduxDevtools) => null;
    _subscribers = new Array<(message: { type: string, payload: any, state?: any, source: any }) => any>();
    _mockInvokeSubscription = (message: { type: string, payload: any, state?: any, source: any }) => this._subscribers.forEach(s => s(message));
  }(),
} as unknown as WindowAugmentedWithReduxDevtools;
