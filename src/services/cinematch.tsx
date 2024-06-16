import backApi from "@/services/backApi";
import { MovieData } from "@/utils/contentUtils";

export async function likeAMovie(token: string, data: MovieData) {
    const response = await backApi.post("/movies/", data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}
