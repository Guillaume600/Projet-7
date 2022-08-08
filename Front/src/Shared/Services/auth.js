import { Env } from "Env";

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
                return response;
            })
            .then((response) => {
                return response.json();
            });
    },
    logout: () => {
        console.log("logout");
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
        console.log("is connected");
    }
}