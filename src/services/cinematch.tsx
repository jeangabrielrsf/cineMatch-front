import backApi from "@/services/backApi";
import { MovieData, SerieData } from "@/utils/contentUtils";

export async function likeAMovie(token: string, data: MovieData) {
    const response = await backApi.post("/movies/", data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

export async function likeASerie(token: string, data: SerieData) {
    const response = await backApi.post("/series/", data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}
