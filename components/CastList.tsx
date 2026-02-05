import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import { IMAGE_URL } from "../constants/api";

export default function CastList({ cast }: { cast: any[] }) {
  if (!cast.length) {
    return <Text style={styles.empty}>No cast available</Text>;
  }

  return (
    <FlatList
      horizontal
      data={cast}
      keyExtractor={(item) => item.id.toString()}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <View style={styles.card}>
          {item.profile_path ? (
            <Image
              source={{ uri: IMAGE_URL + item.profile_path }}
              style={styles.image}
            />
          ) : (
            <View style={styles.placeholder} />
          )}
          <Text numberOfLines={1} style={styles.name}>
            {item.name}
          </Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    width: 90,
    marginLeft: 12,
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 110,
    borderRadius: 8,
  },
  placeholder: {
    width: 80,
    height: 110,
    borderRadius: 8,
    backgroundColor: "#ccc",
  },
  name: {
    fontSize: 12,
    marginTop: 4,
    textAlign: "center",
  },
  empty: {
    color: "#999",
    paddingHorizontal: 12,
    fontStyle: "italic",
  },
});
