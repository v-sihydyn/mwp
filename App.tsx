import { extendTheme, NativeBaseProvider } from 'native-base';

import Navigation from './src/navigation';
import { UIManager } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Container as ModalContainer } from 'react-modal-promise';
import PortalHost from './src/components/Portal/PortalHost';

import { AuthContextProvider } from './src/contexts/AuthContext';
import { ApolloClientProvider } from './src/apollo/ApolloClientProvider';

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

const config = {
  useSystemColorMode: false,
  initialColorMode: 'dark',
};

const customTheme = extendTheme({ config });

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NativeBaseProvider theme={customTheme}>
        <PortalHost>
          <AuthContextProvider>
            <ApolloClientProvider>
              <ModalContainer />
              <Navigation />
            </ApolloClientProvider>
          </AuthContextProvider>
        </PortalHost>
      </NativeBaseProvider>
    </GestureHandlerRootView>
  );
}
