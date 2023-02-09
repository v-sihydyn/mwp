import { NativeBaseProvider } from 'native-base';

import Navigation from './src/navigation';
import { UIManager } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Container as ModalContainer } from 'react-modal-promise';
import PortalHost from './src/components/Portal/PortalHost';

import { AuthContextProvider } from './src/contexts/AuthContext';

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NativeBaseProvider>
        <PortalHost>
          <AuthContextProvider>
            <ModalContainer />
            <Navigation />
          </AuthContextProvider>
        </PortalHost>
      </NativeBaseProvider>
    </GestureHandlerRootView>
  );
}
