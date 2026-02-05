import { useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import CastList from "../../components/CastList";
import MovieHeader from "../../components/MovieHeader";
import ReviewItem from "../../components/ReviewItem";
import useMovieDetails from "../../hooks/useMovieDetails";

export default function MovieDetailsScreen() {
  const { id } = useLocalSearchParams();

  const { details, cast, reviews, loading, loadingReviews, loadMoreReviews } =
    useMovieDetails(id);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <FlatList
      data={reviews}
      keyExtractor={(item, index) => `${item.id}-${index}`}
      renderItem={({ item }) => <ReviewItem review={item} />}
      onEndReached={loadMoreReviews}
      onEndReachedThreshold={0.6}
      ListFooterComponent={loadingReviews ? <ActivityIndicator /> : null}
      ListHeaderComponent={
        <>
          <MovieHeader details={details} />
          <Text style={styles.section}>Cast</Text>
          <CastList cast={cast} />
          <Text style={styles.section}>Reviews</Text>
          {!reviews.length && (
            <Text style={styles.empty}>No reviews available</Text>
          )}
        </>
      }
    />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  section: {
    fontSize: 18,
    fontWeight: "700",
    marginVertical: 12,
    paddingHorizontal: 12,
  },
  empty: {
    color: "#999",
    fontStyle: "italic",
    paddingHorizontal: 12,
    marginBottom: 20,
  },
});
