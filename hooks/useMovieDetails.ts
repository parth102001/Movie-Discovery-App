import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constants/api";

const API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;

export default function useMovieDetails(movieId: string | string[]) {
  const [details, setDetails] = useState<any>(null);
  const [cast, setCast] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingReviews, setLoadingReviews] = useState(false);

  const fetchInitialData = async () => {
    try {
      setLoading(true);

      const [detailsRes, creditsRes, reviewsRes] = await Promise.all([
        axios.get(`${BASE_URL}/movie/${movieId}`, {
          params: { api_key: API_KEY },
        }),
        axios.get(`${BASE_URL}/movie/${movieId}/credits`, {
          params: { api_key: API_KEY },
        }),
        axios.get(`${BASE_URL}/movie/${movieId}/reviews`, {
          params: { api_key: API_KEY, page: 1 },
        }),
      ]);

      setDetails(detailsRes.data);
      setCast(creditsRes.data.cast.slice(0, 10));
      setReviews(reviewsRes.data.results);
      setTotalPages(reviewsRes.data.total_pages);
      setPage(2);
    } catch (err: any) {
      console.log("Movie details error:", err?.message);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreReviews = async () => {
    if (loadingReviews || page > totalPages) return;

    setLoadingReviews(true);

    try {
      const res = await axios.get(`${BASE_URL}/movie/${movieId}/reviews`, {
        params: { api_key: API_KEY, page },
      });

      setReviews((prev) => [...prev, ...res.data.results]);
      setPage((prev) => prev + 1);
    } catch (err: any) {
      console.log("Review pagination error:", err?.message);
    } finally {
      setLoadingReviews(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, [movieId]);

  return {
    details,
    cast,
    reviews,
    loading,
    loadingReviews,
    loadMoreReviews,
  };
}
