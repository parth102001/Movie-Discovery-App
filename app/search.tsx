import axios from "axios";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const searchMovies = async (searchText: string, pageNumber = 1) => {
    if (!searchText || loading || pageNumber > totalPages) return;

    setLoading(true);

    try {
      const response = await axios.get(`${BASE_URL}/search/movie`, {
        params: {
          api_key: API_KEY,
          query: searchText,
          page: pageNumber,
          language: "en-US",
          region: "IN",
        },
      });

      const results = response.data.results;

      if (pageNumber === 1) {
        setMovies(results);
      } else {
        setMovies((prev) => [...prev, ...results]);
      }

      setTotalPages(response.data.total_pages);
      setNoResults(results.length === 0);
      setPage(pageNumber + 1);
    } catch (error: any) {
      console.log("Search API Error:", error?.message);
    } finally {
      setLoading(false);
    }
  };

  const onSearchChange = (text: string) => {
    setQuery(text);
    setMovies([]);
    setPage(1);
    setTotalPages(1);
    setNoResults(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim().length > 0) {
        searchMovies(query, 1);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search movies..."
        value={query}
        onChangeText={onSearchChange}
        style={styles.input}
      />

      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subText}>
              {item.release_date || "Release date unavailable"}
            </Text>
          </View>
        )}
        onEndReached={() => searchMovies(query, page)}
        onEndReachedThreshold={0.6}
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" /> : null
        }
      />

      {noResults && !loading && (
        <Text style={styles.noResults}>No movies found</Text>
      )}
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
  noResults: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: "#999",
  },
});
