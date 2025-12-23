import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { ImageBackground } from "expo-image";
import { Tabs } from "expo-router";
import { Image, Text } from "react-native";

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <>
              <ImageBackground
                source={images.highlight}
                className="flex flex-row w-full flex-1 min-w-[112px] min-h-14 mt-4 justify-center items-center rounded-full overflow-hidden"
              >
                <Image
                  source={icons.home}
                  tintColor="#151312"
                  className="size-5"
                />
                <Text>Home</Text>
              </ImageBackground>
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{ title: "Search", headerShown: false }}
      />
      <Tabs.Screen
        name="saved"
        options={{ title: "Saved", headerShown: false }}
      />{" "}
      <Tabs.Screen
        name="profile"
        options={{ title: "Profile", headerShown: false }}
      />
    </Tabs>
  );
};

export default TabsLayout;
