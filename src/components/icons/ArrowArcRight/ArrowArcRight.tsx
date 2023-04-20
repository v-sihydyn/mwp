import { Path, Polyline, Rect, Svg } from 'react-native-svg';
import React from 'react';

type Props = {
  color: string;
  size: number;
};

export const ArrowArcRight = ({ color, size }: Props) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 256 256">
      <Rect width="256" height="256" fill="none" />
      <Polyline
        points="163.9 148.1 227.9 148.1 227.9 84.1"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="25"
      />
      <Path
        fill="none"
        stroke={color}
        d="M32,184a96,96,0,0,1,163.9-67.9l32,32"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="25"
      />
    </Svg>
  );
};
