import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import Svg, { Circle, Path, G } from 'react-native-svg';
import { useTheme } from 'react-native-paper';

interface LogoProps {
  size?: number;
  style?: StyleProp<ViewStyle>;
}

export const Logo: React.FC<LogoProps> = ({ size = 200, style }) => {
  const { colors } = useTheme();

  return (
    <View style={[{ width: size, height: size }, style]}>
      <Svg width="100%" height="100%" viewBox="0 0 200 200">
        {/* Main circle */}
        <Circle cx="100" cy="100" r="90" fill={colors.background} />

        {/* Inner decorative circle */}
        <Circle
          cx="100"
          cy="100"
          r="70"
          fill="none"
          stroke={colors.surfaceVariant}
          strokeWidth="2"
        />

        {/* Stylized plate */}
        <Circle
          cx="100"
          cy="100"
          r="50"
          fill="none"
          stroke={colors.primary}
          strokeWidth="4"
        />

        {/* Fork and knife */}
        <G transform="translate(100 100) rotate(45)">
          {/* Fork */}
          <Path
            d="M-30 -20 L-10 -20 M-20 -20 L-20 20 M-30 -10 L-10 -10"
            stroke={colors.secondary}
            strokeWidth="4"
            strokeLinecap="round"
          />

          {/* Knife */}
          <Path
            d="M10 -20 L20 -20 L20 20 M10 -20 L10 0 L20 0"
            stroke={colors.secondary}
            strokeWidth="4"
            strokeLinecap="round"
          />
        </G>

        {/* Location dot */}
        <Circle cx="100" cy="100" r="8" fill={colors.primary} />
      </Svg>
    </View>
  );
};
