import Cookies from "js-cookie";
import React from "react";

export default function Home() {
    const token = Cookies.get('token');
    if (!token) {
        window.location.href = "/login";

    }
    return <div>Page d'accueil coucou</div>
}