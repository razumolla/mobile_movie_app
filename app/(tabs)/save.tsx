import { useEffect } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import MovieCard from "@/components/MovieCard";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useSavedMovies } from "@/store/useSavedMovies";

const Save = () => {
  const { saved, loading, loadSaved, clearAll } = useSavedMovies();

  useEffect(() => {
    // refresh when screen mounts
    loadSaved();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />

      <SafeAreaView className="flex-1 px-5">
        <View className="flex-row items-center justify-between mt-2">
          <Text className="text-xl text-white font-bold">Saved</Text>

          {/* simple clear button (optional) */}
          <Text onPress={clearAll} className="text-accent font-semibold">
            Clear
          </Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" className="mt-10" />
        ) : saved.length === 0 ? (
          <View className="flex-1 justify-center items-center gap-3">
            <Image source={icons.save} className="w-10 h-10" tintColor="#fff" />
            <Text className="text-gray-500 text-base text-center">
              No saved movies yet.
              {"\n"}Tap the save icon on a movie to add it here.
            </Text>
          </View>
        ) : (
          <FlatList
            data={saved}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <MovieCard {...item} />}
            numColumns={3}
            columnWrapperStyle={{
              justifyContent: "flex-start",
              gap: 16,
              marginVertical: 16,
            }}
            contentContainerStyle={{ paddingBottom: 120 }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </SafeAreaView>
    </View>
  );
};

export default Save;
