import { FC, useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  size?: number;
};

const UserAvatarSkeleton: FC<Props> = ({ size = 30 }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Skeleton style={{ width: size, height: size }} className="rounded-full" />
  );
};

export default UserAvatarSkeleton;
