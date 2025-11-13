import { UserROLES } from "@/lib/redux/types";
import { Badge } from "./ui/badge";
import { Text } from "./ui/text";
import { FC } from "react";

type Props = {
  value?: UserROLES;
};

const UserRoleBadge: FC<Props> = ({ value }) => {
  return (
    <Badge>
      <Text>{value}</Text>
    </Badge>
  );
};

export default UserRoleBadge;
