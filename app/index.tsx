import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center">
      <Link href="/onboarding">
        <Text className="text-2xl font-bold text-light-300">
          Onboarding link
        </Text>
      </Link>

      <Link href="/movie/avengers">
        <Text className="text-2xl font-bold text-light-300">
          avengers Movie
        </Text>
      </Link>
    </View>
  );
}
