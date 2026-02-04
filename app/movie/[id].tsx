import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Image,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { BASE_URL, IMAGE_URL } from "../../constants/api";

const API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;

export default function MovieDetailsScreen() {
  const { id } = useLocalSearchParams();

  const [details, setDetails] = useState<any>(null);
  const [cast, setCast] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingReviews, setLoadingReviews] = useState(false);

  const fetchMovieData = async () => {
    try {
      setLoading(true);

      const [detailsRes, creditsRes, reviewsRes] = await Promise.all([
        axios.get(`${BASE_URL}/movie/${id}`, {
          params: { api_key: API_KEY },
        }),
        axios.get(`${BASE_URL}/movie/${id}/credits`, {
          params: { api_key: API_KEY },
        }),
        axios.get(`${BASE_URL}/movie/${id}/reviews`, {
          params: { api_key: API_KEY, page: 1 },
        }),
      ]);

      setDetails(detailsRes.data);
      setCast(creditsRes.data.cast.slice(0, 10));
      setReviews(reviewsRes.data.results);
      setTotalPages(reviewsRes.data.total_pages);
      setPage(2);
    } catch (err: any) {
      console.log("Details error:", err?.message);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreReviews = async () => {
    if (loadingReviews || page > totalPages) return;

    setLoadingReviews(true);

    try {
      const res = await axios.get(`${BASE_URL}/movie/${id}/reviews`, {
        params: { api_key: API_KEY, page },
      });

      setReviews((prev) => [...prev, ...res.data.results]);
      setPage((prev) => prev + 1);
    } catch (err: any) {
      console.log("Review error:", err?.message);
    } finally {
      setLoadingReviews(false);
    }
  };

  useEffect(() => {
    fetchMovieData();
  }, [id]);

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
      onEndReached={loadMoreReviews}
      onEndReachedThreshold={0.6}
      ListFooterComponent={loadingReviews ? <ActivityIndicator /> : null}
      ListHeaderComponent={
        <View>
          {details?.poster_path && (
            <Image
              source={{ uri: IMAGE_URL + details.poster_path }}
              style={styles.poster}
            />
          )}

          <Text style={styles.title}>{details?.title}</Text>
          <Text style={styles.subText}>
            Release: {details?.release_date || "N/A"}
          </Text>
          <Text style={styles.subText}>
            Rating: {details?.vote_average} ({details?.vote_count})
          </Text>

          <Text style={styles.sectionTitle}>Cast</Text>

          {cast.length === 0 ? (
            <Text style={styles.emptyText}>No cast available</Text>
          ) : (
            <FlatList
              data={cast}
              horizontal
              keyExtractor={(item, index) => `${item.id}-${index}`}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <View style={styles.castCard}>
                  {item.profile_path ? (
                    <Image
                      source={{ uri: IMAGE_URL + item.profile_path }}
                      style={styles.castImage}
                    />
                  ) : (
                    <View style={styles.castPlaceholder} />
                  )}
                  <Text numberOfLines={1} style={styles.castName}>
                    {item.name}
                  </Text>
                </View>
              )}
            />
          )}

          <Text style={styles.sectionTitle}>Reviews</Text>

          {reviews.length === 0 && (
            <Text style={styles.emptyText}>No reviews available</Text>
          )}
        </View>
      }
      renderItem={({ item }) => (
        <View style={styles.reviewCard}>
          <Text style={styles.reviewAuthor}>{item.author}</Text>
          <Text style={styles.reviewContent}>{item.content}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  poster: {
    width: "100%",
    height: 420,
    borderRadius: 12,
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 4,
    paddingHorizontal: 12,
  },
  subText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
    paddingHorizontal: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 8,
    paddingHorizontal: 12,
  },
  castCard: {
    width: 90,
    marginLeft: 12,
    alignItems: "center",
  },
  castImage: {
    width: 80,
    height: 110,
    borderRadius: 8,
  },
  castPlaceholder: {
    width: 80,
    height: 110,
    borderRadius: 8,
    backgroundColor: "#ccc",
  },
  castName: {
    fontSize: 12,
    marginTop: 4,
    textAlign: "center",
  },
  emptyText: {
    color: "#999",
    fontStyle: "italic",
    paddingHorizontal: 12,
    marginBottom: 10,
  },
  reviewCard: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  reviewAuthor: {
    fontWeight: "700",
    marginBottom: 6,
  },
  reviewContent: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
});
