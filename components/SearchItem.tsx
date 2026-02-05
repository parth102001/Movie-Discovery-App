import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { IMAGE_URL } from "../constants/api";

type Props = {
  movie: any;
};

export default function SearchItem({ movie }: Props) {
  const router = useRouter();

  const onPress = () => {
    router.push(`/movie/${movie.id}`);
  };

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.card}>
        {movie.poster_path ? (
          <Image
            source={{ uri: IMAGE_URL + movie.poster_path }}
            style={styles.poster}
          />
        ) : (
          <View style={styles.posterPlaceholder} />
        )}

        <View style={styles.info}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.subText}>
            {movie.release_date || "Release date unavailable"}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  poster: {
    width: 60,
    height: 90,
    borderRadius: 6,
    backgroundColor: "#ddd",
  },
  posterPlaceholder: {
    width: 60,
    height: 90,
    borderRadius: 6,
    backgroundColor: "#ccc",
  },
  info: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  subText: {
    fontSize: 12,
    color: "#666",
    marginTop: 2,
  },
  pressed: {
    opacity: 0.6,
  },
});
