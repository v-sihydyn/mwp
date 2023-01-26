import {
  Circle,
  G,
  Rect,
  Svg,
  Text,
  ForeignObject,
  TSpan,
} from 'react-native-svg';
import { useState, useEffect, ReactNode } from 'react';
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { View } from 'react-native';
import { colors } from '../../styles/colors';

type ChartData = {
  value: number;
  textLine1: string;
  textLine2: string;
};

type Props = {
  initialValues: ChartData[];
  size?: number;
  strokeWidth?: number;
  radius?: number;
  centerLabel?: ReactNode;
};

type ChartDataItem = {
  degrees: number;
  textX: number;
  textY: number;
  color?: string;
};

const COLOR_PALETTE = ['#9013FE', '#D97400', '#2196F3', '#50E3C2', '#D02F43'];

const addColors = (_chartData: ChartDataItem[]) => {
  const result = [..._chartData];
  let colorCounter: number = 0;

  return result.map((i) => {
    if (colorCounter === COLOR_PALETTE.length) colorCounter = 0;

    const color = COLOR_PALETTE[colorCounter];

    const item = {
      ...i,
      color,
    };

    colorCounter++;

    return item;
  });
};

export const PieChart = ({
  initialValues,
  size = 160,
  strokeWidth = 30,
  radius = 60,
  centerLabel,
}: Props) => {
  const [chartData, setChartData] = useState<ChartDataItem[]>([]);
  const [areGapsVisible, setAreGapsVisible] = useState(false);
  const progress = useSharedValue(0);
  const center = size / 2;
  const cx = size / 2;
  const cy = size / 2;

  const circumference = 2 * Math.PI * radius;

  const sortedValues = initialValues.sort((a, b) => b.value - a.value);
  const dataTotal = sortedValues.reduce((acc, cur) => acc + cur.value, 0);

  const dataPercentage = (dataVal: number) => {
    return dataVal / dataTotal;
  };

  const calculateChartData = () => {
    const _chartData: ChartDataItem[] = [];
    let _angleOffset = 0;

    sortedValues.forEach((item) => {
      const { x, y } = calculateTextCoords(item.value, _angleOffset);
      const data = {
        degrees: _angleOffset,
        textX: x,
        textY: y,
      };
      _chartData.push(data);
      _angleOffset = dataPercentage(item.value) * 360 + _angleOffset;
    });

    setChartData(addColors(_chartData));
  };

  const degreesToRadians = (angle: number) => {
    return angle * (Math.PI / 180);
  };

  const calculateTextCoords = (dataVal: number, angleOffset: number) => {
    const angle = (dataPercentage(dataVal) * 360) / 2 + angleOffset;
    const radians = degreesToRadians(angle);

    return {
      x: radius * Math.cos(radians) + cx,
      y: radius * Math.sin(radians) + cy,
    };
  };

  const segmentBigEnough = (dataVal: number) => {
    return Math.round(dataPercentage(dataVal) * 100) > 10;
  };

  const animate = () => {
    progress.value = 0;
    progress.value = withTiming(1, {
      duration: 1000,
    });

    setTimeout(() => {
      setAreGapsVisible(true);
    }, 900);
  };

  useEffect(() => {
    calculateChartData();
    animate();
  }, [initialValues]);

  return (
    <View>
      <Svg height={size} width={size} viewBox={`0 0 ${size} ${size}`}>
        <>
          {sortedValues.map((item, index) => (
            <G transform={`rotate(-90, ${center}, ${center})`} key={index}>
              <PieChartSegment
                center={center}
                radius={radius}
                circumference={circumference}
                angle={chartData?.[index]?.degrees ?? 0}
                color={chartData?.[index]?.color ?? '#000'}
                percent={item.value / dataTotal}
                strokeWidth={strokeWidth}
                progress={progress}
                strokeDasharray={circumference}
              />

              {segmentBigEnough(item.value) && (
                <Text
                  textAnchor="middle"
                  dy={3}
                  fill={'#fff'}
                  x={chartData?.[index]?.textX}
                  y={chartData?.[index]?.textY}
                  transform={`rotate(90, ${chartData?.[index]?.textX ?? 0}, ${
                    chartData?.[index]?.textY ?? 0
                  })`}>
                  <TSpan
                    x={chartData?.[index]?.textX}
                    y={chartData?.[index]?.textY - 8}>
                    Back
                  </TSpan>
                  <TSpan
                    x={chartData?.[index]?.textX}
                    y={chartData?.[index]?.textY + 8}>
                    1
                  </TSpan>
                </Text>
              )}
            </G>
          ))}
          {centerLabel && (
            <ForeignObject
              x={center - radius / 2}
              y={center - radius / 2}
              width={radius}
              height={radius}>
              {centerLabel}
            </ForeignObject>
          )}

          {areGapsVisible &&
            sortedValues.map((value, index) => (
              <Rect
                x={center}
                y={center + radius / 2}
                width={2}
                height={radius}
                stroke={colors.page}
                fill={colors.page}
                transform={`rotate(${
                  (chartData?.[index]?.degrees ?? 0) + 180
                }, ${center}, ${center})`}
              />
            ))}
        </>
      </Svg>
    </View>
  );
};

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type PieChartSegmentProps = {
  center: number;
  radius: number;
  strokeWidth: number;
  circumference: number;
  color: string;
  percent: number;
  strokeDasharray: number;
  angle: number;
  progress: SharedValue<number>;
};

export const PieChartSegment = ({
  center,
  radius,
  strokeWidth,
  circumference,
  color,
  percent,
  progress,
  strokeDasharray,
  angle,
}: PieChartSegmentProps) => {
  const animatedProps = useAnimatedProps(() => {
    const strokeDashoffset = interpolate(
      progress.value,
      [0, 1],
      [circumference, circumference - percent * circumference],
    );
    const rotateAngle = interpolate(progress.value, [0, 1], [0, angle]);

    return {
      strokeDashoffset: strokeDashoffset,
      transform: [
        { translateX: center },
        { translateY: center },
        { rotate: `${rotateAngle}deg` },
        { translateX: -center },
        { translateY: -center },
      ],
    };
  });

  return (
    <AnimatedCircle
      cx={center}
      cy={center}
      r={radius}
      stroke={color}
      strokeWidth={strokeWidth}
      strokeDasharray={strokeDasharray}
      fill="transparent"
      animatedProps={animatedProps}
    />
  );
};
