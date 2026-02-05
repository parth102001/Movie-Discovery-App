import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { Pressable } from "react-native";

export default function RootLayout() {
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Popular Movies",
          headerTitleAlign: "center",
          headerRight: () => (
            <Pressable
              onPress={() => router.push("/search")}
              hitSlop={10}
              style={{ marginRight: 16 }}
            >
              <Ionicons name="search-outline" size={22} color="#000" />
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
          headerTitleAlign: "center",
          headerRight: () => (
            <Pressable
              onPress={() => router.push("/review")}
              hitSlop={10}
              style={{ marginRight: 16 }}
            >
              <Ionicons name="create-outline" size={22} color="#000" />
            </Pressable>
          ),
        }}
      />

      <Stack.Screen
        name="review"
        options={{
          title: "Write Review",
          headerTitleAlign: "center",
        }}
      />
    </Stack>
  );
}
