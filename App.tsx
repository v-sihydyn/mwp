import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';

import useCachedResources from './src/hooks/useCachedResources';
import Navigation from './src/navigation';
import { UIManager } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Container as ModalContainer } from 'react-modal-promise'

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NativeBaseProvider>
          <ModalContainer />
          <Navigation />
          <StatusBar />
        </NativeBaseProvider>
      </GestureHandlerRootView>
    );
  }
}
