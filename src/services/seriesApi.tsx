import api from "@/services/tmdbApi";

export async function getPopularSeries() {
    const response = await api.get("tv/popular?language=pt-BR&page=1");
    return response.data;
}
