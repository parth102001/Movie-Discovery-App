import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { BASE_URL } from "../constants/api";

const API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;

export default function usePopularMovies() {
  const [movies, setMovies] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const isFetchingRef = useRef(false);

  const fetchMovies = async (pageNumber: number = page) => {
    if (isFetchingRef.current || pageNumber > totalPages) return;

    isFetchingRef.current = true;
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
      console.log("res", res);
      setMovies((prev) =>
        pageNumber === 1 ? res.data.results : [...prev, ...res.data.results],
      );

      setTotalPages(res.data.total_pages);
      setPage(pageNumber + 1);
    } catch (err: any) {
      console.log("Popular movies error:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
      isFetchingRef.current = false;
    }
  };

  useEffect(() => {
    fetchMovies(1);
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    setPage(1);
    setTotalPages(1);
    fetchMovies(1);
  };

  return {
    movies,
    fetchMovies,
    loading,
    refreshing,
    onRefresh,
  };
}
