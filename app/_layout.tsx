import { Stack, useRouter } from "expo-router";
import { Pressable, Text } from "react-native";

export default function RootLayout() {
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Popular Movies",
          headerRight: () => (
            <Pressable onPress={() => router.push("/search")}>
              <Text style={{ marginRight: 12, fontSize: 16 }}>Search</Text>
            </Pressable>
          ),
        }}
      />

      <Stack.Screen
        name="search"
        options={{
          title: "Search Movies",
        }}
      />

      <Stack.Screen
        name="movie/[id]"
        options={{
          title: "Movie Details",
        }}
      />
    </Stack>
  );
}
