import { UserInfo } from "@/lib/redux/types";
import { Option } from "react-native-paper-dropdown";
import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  restaurantName: Yup.string().required("Restaurant name is required"),
  address: Yup.string().required("Address is required"),
});

export const initialValues = {
  restaurantName: "",
  address: "",
  image: undefined,
};

export const getOptions = (owners: UserInfo[]): Option[] => {
  return owners.map((elem) => ({
    label: `${elem.firstName} ${elem.lastName}`,
    value: `${elem.id}`,
  }));
};
