import api from "@/services/tmdbApi";
export async function getPopularMovies() {
    const response = await api.get("movie/popular?language=pt-BR&page=1");
    return response.data;
}

export async function searchMovie(query: string) {
    const response = await api.get(
        `search/movie?query=${query}&language=pt-BR`
    );
    return response.data;
}
