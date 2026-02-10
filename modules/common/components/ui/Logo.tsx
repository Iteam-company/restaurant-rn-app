import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import Svg, { Circle, Path, G } from "react-native-svg";
import { useTheme } from "@react-navigation/native";

interface LogoProps {
  size?: number;
  style?: StyleProp<ViewStyle>;
}

export const Logo: React.FC<LogoProps> = ({ size = 200, style }) => {
  const { colors } = useTheme();

  return (
    <View style={[{ width: size, height: size }, style]}>
      <Svg width="100%" height="100%" viewBox="0 0 200 200">
        <Circle cx="100" cy="100" r="90" fill={colors.background} />

        <Circle
          cx="100"
          cy="100"
          r="70"
          fill="none"
          stroke={colors.border}
          strokeWidth="2"
        />

        <Circle
          cx="100"
          cy="100"
          r="50"
          fill="none"
          stroke={colors.primary}
          strokeWidth="4"
        />

        <G transform="translate(100 100) rotate(45)">
          <Path
            d="M-30 -20 L-10 -20 M-20 -20 L-20 20 M-30 -10 L-10 -10"
            stroke={colors.text}
            strokeWidth="4"
            strokeLinecap="round"
          />

          <Path
            d="M10 -20 L20 -20 L20 20 M10 -20 L10 0 L20 0"
            stroke={colors.text}
            strokeWidth="4"
            strokeLinecap="round"
          />
        </G>

        <Circle cx="100" cy="100" r="8" fill={colors.primary} />
      </Svg>
    </View>
  );
};
