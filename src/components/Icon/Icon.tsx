import FontAwesome5, {
  FontAwesome5IconProps,
} from 'react-native-vector-icons/FontAwesome5';
import React from 'react';

type IconProps = FontAwesome5IconProps & {
  name: React.ComponentProps<typeof FontAwesome5>['name'];
};

export const Icon = (props: IconProps) => {
  return <FontAwesome5 {...props} />;
};
