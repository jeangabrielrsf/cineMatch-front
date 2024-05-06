import api from "@/services/api";
export async function getPopularMovies() {
    const response = await api.get("movie/popular?page=1");
    return response.data;
}