import api from "@/services/api";
export async function getPopularMovies() {
    const response = await api.get("movie/popular");
    return response.data;
}