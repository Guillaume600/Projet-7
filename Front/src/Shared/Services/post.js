import { Env } from "Env";
import Cookies from "js-cookie";

export const postService = {
    getAllPosts: () => {
        const token = Cookies.get("token");

        return fetch(`${Env.urlApi}/posts`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(async (response) => {
            if (!response.ok) {
                const error = await response.json();
                throw Error(error.message);
            }
            return response.json();
        });
    }
};