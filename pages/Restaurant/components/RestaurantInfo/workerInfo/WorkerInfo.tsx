import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { useGetUserByIdQuery } from "@/lib/redux/slices/user-api";
import TabBarOffset from "@/components/TabBarOffset";
import { useLocalSearchParams } from "expo-router";
import {
  BadgeCheck,
  CreditCard,
  LucideIcon,
  Mail,
  Phone,
  User,
} from "lucide-react-native";
import { ScrollView, View } from "react-native";

const UserInfo = () => {
  const { workerId } = useLocalSearchParams<{ workerId: string }>();
  const { data } = useGetUserByIdQuery(workerId);

  if (!data) return null;

  const InfoBlock = ({
    icon: IconComponent,
    label,
    value,
  }: {
    icon: LucideIcon;
    label: string;
    value: string;
  }) => (
    <Card className="mb-4">
      <CardContent className="flex flex-row p-4 rounded-xl gap-4 items-center">
        <View className="w-12 h-12 rounded-3xl flex justify-center items-center bg-primary">
          <IconComponent size={24} className="text-primary" />
        </View>
        <View className="flex flex-1 gap-1">
          <Text className="text-sm text-muted-foreground font-medium">
            {label}
          </Text>
          <Text className="text-lg text-foreground font-semibold">{value}</Text>
        </View>
      </CardContent>
    </Card>
  );

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="p-4 gap-4">
        <Card className="p-6">
          <View className="items-center gap-3">
            <Avatar alt="" className="w-24 h-24">
              <AvatarImage source={{ uri: data.icon }} />
              <AvatarFallback>
                <Text className="text-2xl font-bold text-foreground">
                  {data.firstName.charAt(0)}${data.lastName.charAt(0)}
                </Text>
              </AvatarFallback>
            </Avatar>
            <Text className="text-3xl font-bold text-center text-foreground">{`${data.firstName} ${data.lastName}`}</Text>
            <Badge
              variant="secondary"
              className="flex-row gap-2 px-3 py-1.5 rounded-full"
            >
              <BadgeCheck size={16} className="text-primary" />
              <Text className="text-base capitalize text-foreground">
                {data.role}
              </Text>
            </Badge>
          </View>
        </Card>
        <View className="mt-2 gap-4">
          <InfoBlock icon={User} label="Username" value={data.username} />
          <InfoBlock icon={Mail} label="Email" value={data.email} />
          <InfoBlock icon={Phone} label="Phone" value={data.phoneNumber} />
          <InfoBlock icon={CreditCard} label="ID" value={data.id.toString()} />
        </View>
      </View>
      <TabBarOffset />
    </ScrollView>
  );
};

export default UserInfo;
