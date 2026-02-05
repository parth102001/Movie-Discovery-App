import { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import SearchItem from "../components/SearchItem";
import useSearchMovies from "../hooks/useSearchMovies";

export default function SearchScreen() {
  const [query, setQuery] = useState("");

  const { movies, loading, noResults, fetchMore } = useSearchMovies(query);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search movies..."
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />

      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <SearchItem movie={item} />}
        onEndReached={fetchMore}
        onEndReachedThreshold={0.6}
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" /> : null
        }
        ListEmptyComponent={
          !loading && noResults ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.noResults}>No movies found</Text>
            </View>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  card: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: "#eee",
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
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60,
  },
  noResults: {
    fontSize: 16,
    color: "#999",
  },
});
