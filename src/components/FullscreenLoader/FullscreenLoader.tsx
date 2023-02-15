import { View } from 'react-native';
import { colors } from '../../styles/colors';
import { Spinner } from 'native-base';
import * as React from 'react';

type FullscreenLoaderProps = {};

export const FullscreenLoader = (props: FullscreenLoaderProps) => {
  return (
    <View
      style={{
        backgroundColor: colors.page,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Spinner color={colors.green} size="lg" />
    </View>
  );
};
