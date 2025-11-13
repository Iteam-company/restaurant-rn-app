import {
  DifficultyLevelEnum,
  StatusEnum,
  statusIcons,
} from "@/lib/redux/types";
import { LucideIcon } from "lucide-react-native";
import { FC } from "react";
import {
  Pressable,
  PressableProps,
  ViewProps,
  View,
  ViewStyle,
} from "react-native";
import { Text } from "./ui/text";
import { useTheme } from "@react-navigation/native";

type Props = {
  icon?: LucideIcon;
  iconSize?: number;
  selected?: boolean;
  value: DifficultyLevelEnum | StatusEnum | number | string;
} & PressableProps &
  ViewProps;

const Chip: FC<Props> = (props) => {
  return (
    <Pressable {...props}>
      <ChipContent {...props} />
    </Pressable>
  );
};

export const getDifficultyLevelColor = (value: DifficultyLevelEnum) => {
  switch (value) {
    case DifficultyLevelEnum.EASY:
      return "green";
    case DifficultyLevelEnum.MEDIUM:
      return "orange";
    case DifficultyLevelEnum.HARD:
      return "red";
  }
};

const ChipContent: FC<Props> = ({
  value,
  selected = true,
  icon: Icon = statusIcons[value as StatusEnum],
  iconSize,
  ...props
}) => {
  const { colors } = useTheme();

  const defaultStyles: ViewStyle = {
    borderColor: colors.text,
  };

  switch (true) {
    case Object.values(DifficultyLevelEnum).includes(
      value as DifficultyLevelEnum
    ):
      const item = value as DifficultyLevelEnum;
      return (
        <View
          className="bg-transparent border rounded-full px-2 pb-1 pt-1.5"
          style={[
            defaultStyles,
            {
              borderColor: selected
                ? getDifficultyLevelColor(value as DifficultyLevelEnum)
                : undefined,
            },
          ]}
          {...props}
        >
          <Text variant="small">
            {item[0].toUpperCase()}
            {item.slice(1)}
          </Text>
        </View>
      );

    case Object.values(StatusEnum).includes(value as StatusEnum):
      return (
        <View
          className="flex flex-row gap-1 bg-transparent border rounded-full px-2 pb-1 pt-1.5"
          style={[
            defaultStyles,
            {
              backgroundColor: selected ? colors.text : colors.background,
            },
          ]}
          {...props}
        >
          {Icon && (
            <Icon
              size={iconSize || 12}
              color={selected ? colors.background : colors.text}
            />
          )}
          <Text
            variant="small"
            style={{
              color: selected ? colors.background : colors.text,
            }}
          >
            {value}
          </Text>
        </View>
      );
    default:
      return (
        <View
          style={[defaultStyles]}
          className="flex flex-row gap-1 bg-transparent border rounded-full px-2 pb-1 pt-1.5"
        >
          {Icon && <Icon size={iconSize || 12} color={colors.text} />}
          <Text variant="small">{value}</Text>
        </View>
      );
  }
};

export default Chip;
