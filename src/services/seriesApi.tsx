import api from "@/services/api"

export async function getPopularSeries() {
    const response = await api.get("tv/popular?page=1");
    return response.data;
}