import { icons } from "@/constants/icons";
import { useSavedMovies } from "@/store/useSavedMovies";
import { Link } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

const MovieCard = (movie: Movie) => {
  const { id, poster_path, title, vote_average, release_date } = movie;

  const { toggle, isSaved } = useSavedMovies();
  const saved = isSaved(id);

  return (
    <Link href={`/movie/${id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <View className="relative">
          <Image
            source={{
              uri: poster_path
                ? `https://image.tmdb.org/t/p/w500${poster_path}`
                : "https://placehold.co/600x400/1a1a1a/FFFFFF.png",
            }}
            className="w-full h-52 rounded-lg"
            resizeMode="cover"
          />

          {/* Save button overlay */}
          <TouchableOpacity
            onPress={(e) => {
              e.stopPropagation?.(); // prevents opening details on some platforms
              toggle(movie);
            }}
            className="absolute top-2 right-2 bg-black/60 rounded-full p-2"
          >
            <Image
              source={icons.save}
              className="w-4 h-4"
              tintColor={saved ? "#AB8BFF" : "#fff"}
            />
          </TouchableOpacity>
        </View>

        <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>
          {title}
        </Text>

        <View className="flex-row items-center justify-start gap-x-1">
          <Image source={icons.star} className="size-4" />
          <Text className="text-xs text-white font-bold uppercase">
            {Math.round(vote_average / 2)}
          </Text>
        </View>

        <View className="flex-row items-center justify-between">
          <Text className="text-xs text-light-300 font-medium mt-1">
            {release_date?.split("-")[0]}
          </Text>
          <Text className="text-xs font-medium text-light-300 uppercase">
            Movie
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
