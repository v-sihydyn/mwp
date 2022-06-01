import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider } from 'native-base'

import useCachedResources from './src/hooks/useCachedResources';
import Navigation from './src/navigation';
import PortalHost from './src/components/Portal/PortalHost'

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <PortalHost>
        <NativeBaseProvider>
          <Navigation />
          <StatusBar />
        </NativeBaseProvider>

      </PortalHost>
    );
  }
}
