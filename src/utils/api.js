import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YjdjMGQ1NmM1MDZkOGJjM2I3YzU4NmQ2MzQwOGNhZSIsInN1YiI6IjY1MzUzNmMxYzE0ZmVlMDEwMGU5OTUxMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.OUvWpgahW9MmP0Mk6yUfQvDCDcNLMJlUQhocy0GcUn8";

const headers = {
    Authorization: "Bearer " + TMDB_TOKEN,
}

export const fetchDataApi = async (url, params) => {
    try {
        const { data } = await axios.get(BASE_URL + url, {
            headers,
            params,
        });
        return data;
    } catch (error) {
        console.log(error);
    }
}
