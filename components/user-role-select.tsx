import { UserROLES } from "@/lib/redux/types";
import { FC } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { capitalize } from "@/lib/utils";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  value: UserROLES;
  onSelect?: (role: UserROLES) => void;
};

const UserRoleDropdown: FC<Props> = ({ value, onSelect }) => {
  const insets = useSafeAreaInsets();
  const handleChange = (newRole: UserROLES) => {
    onSelect?.(newRole);
  };

  return (
    <Select
      value={{ label: capitalize(value), value }}
      onValueChange={(option) => handleChange(option?.value as UserROLES)}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent insets={insets} className="w-[180px]">
        <SelectGroup>
          <SelectLabel>Roles</SelectLabel>
          {Object.values(UserROLES)
            .filter((val) => val !== UserROLES.OWNER)
            .map((val) => (
              <SelectItem key={val} label={capitalize(val)} value={val}>
                {capitalize(val)}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default UserRoleDropdown;
