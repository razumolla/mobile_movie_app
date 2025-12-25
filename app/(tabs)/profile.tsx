import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Image, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useSavedMovies } from "@/store/useSavedMovies";

const NAME_KEY = "@profile_name_v1";

const Profile = () => {
  const { saved } = useSavedMovies();
  const [name, setName] = useState("Movie Fan");

  const loadName = async () => {
    const raw = await AsyncStorage.getItem(NAME_KEY);
    if (raw) setName(raw);
  };

  const saveName = async (value: string) => {
    setName(value);
    await AsyncStorage.setItem(NAME_KEY, value);
  };

  useEffect(() => {
    loadName();
  }, []);

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />

      <SafeAreaView className="flex-1 px-5">
        <Text className="text-xl text-white font-bold mt-2">Profile</Text>

        <View className="mt-6 bg-dark-200 rounded-2xl p-5">
          <View className="flex-row items-center gap-4">
            <View className="w-14 h-14 rounded-full bg-black/40 justify-center items-center">
              <Image
                source={icons.person}
                className="w-7 h-7"
                tintColor="#fff"
              />
            </View>

            <View className="flex-1">
              <Text className="text-light-300 text-sm mb-2">Display name</Text>
              <TextInput
                value={name}
                onChangeText={saveName}
                placeholder="Your name"
                placeholderTextColor="#A8B5DB"
                className="text-white text-base bg-black/30 rounded-xl px-4 py-3"
              />
            </View>
          </View>

          <View className="flex-row justify-between mt-6">
            <View className="bg-black/30 rounded-2xl p-4 flex-1 mr-3">
              <Text className="text-light-300 text-sm">Saved</Text>
              <Text className="text-white text-2xl font-bold mt-1">
                {saved.length}
              </Text>
            </View>

            <View className="bg-black/30 rounded-2xl p-4 flex-1 ml-3">
              <Text className="text-light-300 text-sm">Plan</Text>
              <Text className="text-white text-2xl font-bold mt-1">Free</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Profile;
