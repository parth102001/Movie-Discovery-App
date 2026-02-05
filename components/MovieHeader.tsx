import { Image, StyleSheet, Text, View } from "react-native";
import { IMAGE_URL } from "../constants/api";

export default function MovieHeader({ details }: { details: any }) {
  if (!details) return null;

  return (
    <View>
      {details.poster_path && (
        <Image
          source={{ uri: IMAGE_URL + details.poster_path }}
          style={styles.poster}
        />
      )}

      <Text style={styles.title}>{details.title}</Text>
      <Text style={styles.subText}>
        Release: {details.release_date || "N/A"}
      </Text>
      <Text style={styles.subText}>
        Rating: {details.vote_average} ({details.vote_count})
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  poster: {
    width: "100%",
    height: 420,
    borderRadius: 12,
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    paddingHorizontal: 12,
  },
  subText: {
    fontSize: 14,
    color: "#555",
    paddingHorizontal: 12,
    marginTop: 4,
  },
});
