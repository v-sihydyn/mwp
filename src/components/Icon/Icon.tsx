import FontAwesome5, { FontAwesome5IconProps } from 'react-native-vector-icons/FontAwesome5';

type IconProps = FontAwesome5IconProps;

// @TODO: use this component
export const Icon = (props: IconProps) => {
  return <FontAwesome5 {...props} />;
};
