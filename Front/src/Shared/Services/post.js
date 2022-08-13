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
    },

    get: (postId) => {
        const token = Cookies.get("token");

        return fetch(`${Env.urlApi}/posts/${postId}`, {
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
    },

    create: (post) => {
        const token = Cookies.get("token");
        const formData = new FormData();

        formData.append("post", JSON.stringify({ description: post.description }));
        formData.append("image", post.image);

        return fetch(`${Env.urlApi}/posts`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formData
        })
            .then(async (response) => {
                if (!response.ok) {
                    const error = await response.json();
                    throw Error(error.message);
                }
                return response.json();
            });

    },

    delete: (postId) => {
        const token = Cookies.get("token");

        return fetch(`${Env.urlApi}/posts/${postId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        })
            .then(async (response) => {
                if (!response.ok) {
                    const error = await response.json();
                    throw Error(error.message);
                }
                return response.json();
            });
    },

    edit: (postId, post) => {
        const token = Cookies.get("token");
        const formData = new FormData();

        formData.append("post", JSON.stringify({ description: post.description }));
        formData.append("image", post.image);

        return fetch(`${Env.urlApi}/posts/${postId}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formData
        })
            .then(async (response) => {
                if (!response.ok) {
                    const error = await response.json();
                    throw Error(error.message);
                }
                return response.json();
            });

    },

    like: (postId, like) => {
        const token = Cookies.get("token");

        return fetch(`${Env.urlApi}/posts/${postId}/like`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ like })
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