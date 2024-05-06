import api from "@/services/api"

export async function getPopularSeries() {
    const response = await api.get("tv/popular");
    return response.data;
}