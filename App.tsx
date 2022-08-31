import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base';

import useCachedResources from './src/hooks/useCachedResources';
import Navigation from './src/navigation';
import PortalHost from './src/components/Portal/PortalHost';
import { UIManager } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <PortalHost>
          <NativeBaseProvider>
            <Navigation />
            <StatusBar />
          </NativeBaseProvider>
        </PortalHost>
      </GestureHandlerRootView>

    );
  }
}
