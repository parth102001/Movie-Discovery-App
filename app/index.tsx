import MovieCard from "@/components/MovieCard";
import usePopularMovies from "@/hooks/usePopularMovies";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  const { movies, fetchMovies, loading, refreshing, onRefresh } =
    usePopularMovies();

  return (
    <View style={styles.container}>
      <FlatList
        data={movies}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => <MovieCard movie={item} />}
        onEndReached={() => fetchMovies()}
        onEndReachedThreshold={0.6}
        refreshing={refreshing}
        onRefresh={onRefresh}
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" /> : null
        }
        removeClippedSubviews
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={7}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    flex: 1,
  },
});
