import { useGetOwnersQuery } from "@/lib/redux/slices/restaurant-api";
import { FC } from "react";

import { capitalize } from "@/lib/utils";
import { useGetUserByIdQuery } from "@/lib/redux/slices/user-api";
import Loader from "@/components/Loader";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Props = {
  value: string;
  onSelect?: (ownerId: string) => void;
};

const OwnersSelect: FC<Props> = ({ value, onSelect }) => {
  const { data: owners, isLoading: isLoadingOwners } = useGetOwnersQuery();
  const { data: user } = useGetUserByIdQuery(value, {
    skip: value.trim() !== "",
  });

  return (
    <Loader isLoading={isLoadingOwners}>
      <Select
        value={
          user && {
            label: `${capitalize(user.lastName)} ${capitalize(user.firstName)}`,
            value: user?.id.toString(),
          }
        }
        onValueChange={(option) => onSelect?.(option?.value || "")}
      >
        <SelectTrigger>
          <SelectValue placeholder="Owner" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {owners?.map((owner) => (
              <SelectItem
                key={owner.id}
                label={`${capitalize(owner.lastName)} ${capitalize(owner.firstName)}`}
                value={owner.id.toString()}
              />
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </Loader>
  );
};

export default OwnersSelect;
