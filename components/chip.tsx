import {
  DifficultyLevelEnum,
  StatusEnum,
  statusIcons,
} from "@/lib/redux/types";
import { LucideIcon } from "lucide-react-native";
import { FC } from "react";
import { Pressable, PressableProps, ViewProps, View } from "react-native";
import { Text } from "./ui/text";
import { useTheme } from "@react-navigation/native";

type Props = {
  icon?: LucideIcon;
  iconSize?: number;
  selected?: boolean;
  value: DifficultyLevelEnum | StatusEnum;
} & PressableProps &
  ViewProps;

const Chip: FC<Props> = ({
  value,
  icon: Icon = statusIcons[value as StatusEnum],
  iconSize,
  selected = true,
  ...props
}) => {
  const { colors } = useTheme();

  const getColor = (value: DifficultyLevelEnum) => {
    switch (value) {
      case DifficultyLevelEnum.EASY:
        return "green";
      case DifficultyLevelEnum.MEDIUM:
        return "orange";
      case DifficultyLevelEnum.HARD:
        return "red";
    }
  };

  return (
    <Pressable {...props}>
      {Object.values(DifficultyLevelEnum).includes(
        value as DifficultyLevelEnum
      ) && (
        <View
          className="bg-transparent border rounded-full px-2 pb-1 pt-1.5"
          style={{
            borderColor: selected
              ? getColor(value as DifficultyLevelEnum)
              : undefined,
          }}
          {...props}
        >
          <Text variant="small">
            {value[0].toUpperCase()}
            {value.slice(1)}
          </Text>
        </View>
      )}
      {Object.values(StatusEnum).includes(value as StatusEnum) && (
        <View
          className="flex flex-row gap-1 bg-transparent border rounded-full px-2 pb-1 pt-1.5"
          style={{
            backgroundColor: selected ? colors.text : colors.background,
          }}
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
      )}
    </Pressable>
  );
};

export default Chip;
