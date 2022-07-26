import { Env } from "Env";
import Cookies from "js-cookie";

export const authService = {
    login: (email, password) => {
        return fetch(`${Env.urlApi}/auth/login`, {
            method: "POST",
            body: JSON.stringify({
                email,
                password
            }),
            headers: {
                "Content-Type": "application/json"
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
    logout: () => {
        Cookies.remove("token");
        window.location.href= "/login";
    },
    signup: (email, password) => {
        return fetch(`${Env.urlApi}/auth/signup`, {
            method: "POST",
            body: JSON.stringify({
                email,
                password
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(async (response) => {
                if (!response.ok) {
                    const error = await response.json();
                    throw Error(error.message);
                }
                return response;
            })
            .then((response) => {
                return response.json();
            });
    },
    isConnected: () => {
        const cookie = Cookies.get("token");
        return cookie != null;
    }
}