import axios from "axios";
import { useEffect, useState } from "react";

/* build-ref:delta */

const API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

export default function usePopularMovies() {
  const [movies, setMovies] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchMovies = async (pageNumber = 1, refresh = false) => {
    if (loading || pageNumber > totalPages) return;

    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/movie/popular`, {
        params: {
          api_key: API_KEY,
          page: pageNumber,
          language: "en-US",
          region: "IN",
        },
      });

      setTotalPages(res.data.total_pages);
      setMovies((prev) =>
        refresh ? res.data.results : [...prev, ...res.data.results]
      );
      setPage(pageNumber + 1);
    } catch (err) {
      console.error("Failed to fetch movies");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setPage(1);
    fetchMovies(1, true);
  };

  return { movies, fetchMovies, loading, refreshing, onRefresh };
}
