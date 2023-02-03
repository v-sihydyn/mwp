import FontAwesome5, {
  FontAwesome5IconProps,
} from 'react-native-vector-icons/FontAwesome5';
import React from 'react';

export type IconProps = FontAwesome5IconProps;

export const Icon = (props: IconProps) => {
  return <FontAwesome5 {...props} />;
};
