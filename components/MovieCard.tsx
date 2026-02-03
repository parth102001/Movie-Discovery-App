import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet, Text } from "react-native";

export default function MovieCard({ movie }: any) {
  const router = useRouter();

  return (
    <Pressable
      style={styles.card}
      onPress={() => router.push(`/movie/${movie.id}`)}
    >
      <Image
        source={{ uri: "https://image.tmdb.org/t/p/w500" + movie.poster_path }}
        style={styles.image}
        contentFit="cover"
        transition={300}
      />
      <Text numberOfLines={2} style={styles.title}>
        {movie.title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    marginBottom: 12,
  },
  image: {
    height: 240,
    borderRadius: 10,
  },
  title: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: "600",
  },
});
