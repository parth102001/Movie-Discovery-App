import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { BASE_URL } from "../constants/api";

const API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;

export default function useSearchMovies(query: string) {
  const [movies, setMovies] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const isFetchingRef = useRef(false);

  const fetchSearchMovies = async (pageNumber = 1) => {
    if (!query.trim() || isFetchingRef.current || pageNumber > totalPages)
      return;

    isFetchingRef.current = true;
    setLoading(true);

    try {
      const response = await axios.get(`${BASE_URL}/search/movie`, {
        params: {
          api_key: API_KEY,
          query,
          page: pageNumber,
          language: "en-US",
          region: "IN",
        },
      });

      const results = response.data.results;

      setMovies((prev) => (pageNumber === 1 ? results : [...prev, ...results]));

      setTotalPages(response.data.total_pages);
      setNoResults(results.length === 0);
      setPage(pageNumber + 1);
    } catch (error: any) {
      console.log("Search API Error:", error?.message);
    } finally {
      setLoading(false);
      isFetchingRef.current = false;
    }
  };

  useEffect(() => {
    setMovies([]);
    setPage(1);
    setTotalPages(1);
    setNoResults(false);

    const timer = setTimeout(() => {
      if (query.trim()) {
        fetchSearchMovies(1);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return {
    movies,
    loading,
    noResults,
    fetchMore: () => fetchSearchMovies(page),
  };
}
