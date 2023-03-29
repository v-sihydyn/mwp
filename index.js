import 'react-native-url-polyfill/auto';
import 'react-native-get-random-values';

import { AppRegistry, Linking } from 'react-native';
import { Amplify } from 'aws-amplify';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import App from './App';
import { name as appName } from './app.json';
import awsconfig from './src/aws-exports';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

const urlOpener = async (url, redirectUrl) => {
  await InAppBrowser.isAvailable();
  const response = await InAppBrowser.openAuth(url, redirectUrl, {
    showTitle: false,
    enableUrlBarHiding: true,
    enableDefaultShare: false,
    ephemeralWebSession: false,
  });

  if (response.type === 'success') {
    Linking.openURL(response.url);
  }
};

Amplify.configure({
  ...awsconfig,
  oauth: {
    ...awsconfig.oauth,
    urlOpener,
  },
});

AppRegistry.registerComponent(appName, () => App);
