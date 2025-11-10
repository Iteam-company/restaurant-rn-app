import React, { FC, PropsWithChildren } from "react";
import { ActivityIndicator, View } from "react-native";

type Props = {
  isLoading?: boolean;
  isFullScreen?: boolean;
};

const Loader: FC<PropsWithChildren<Props>> = ({
  children,
  isLoading = !children ? true : false,
}) => {
  if (children)
    return (
      <View className="relative">
        {children}
        {isLoading && (
          <View className="absolute flex h-full w-full items-center justify-center rounded-xl bg-[#00000033] transition-colors duration-300">
            <ActivityIndicator className="" />
          </View>
        )}
      </View>
    );

  return isLoading && <ActivityIndicator />;
};

export default Loader;
