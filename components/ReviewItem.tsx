import { StyleSheet, Text, View } from "react-native";

export default function ReviewItem({ review }: { review: any }) {
  return (
    <View style={styles.card}>
      <Text style={styles.author}>{review.author}</Text>
      <Text style={styles.content}>{review.content}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  author: {
    fontWeight: "700",
    marginBottom: 6,
  },
  content: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
});
