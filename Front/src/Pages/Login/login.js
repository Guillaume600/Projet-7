import Cookies from "js-cookie";
import React from "react";
import { Link } from "react-router-dom";
import Logo from "Shared/Composants/logo";
import { authService } from "Shared/Services/auth";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        const urlSearchParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlSearchParams.entries());
        this.state = {
            email: "",
            password: "",
            error: "",
            success: params.success ? "Compte créé avec succès" : ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        authService.login(this.state.email, this.state.password)
            .then(login => {
                Cookies.set("token", login.token);
                window.location.href = "/";
            })
            .catch((error) => {
                this.handleError(error);
            });
    }

    handleError(error) {
        this.setState({
            error: error.message
        });
        console.log(error);
    }



    render() {
        return (
            <div className="flex flex-col items-center justify-center h-full gap-5 ">
                <Logo />
                <form className="flex flex-col items-center gap-5" onSubmit={this.handleSubmit}>
                    <div className="flex flex-col">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700"> Email :</label>
                        <input className="mt-1 relative rounded-md shadow-sm focus:ring-Primaire focus:border-Primaire block min-w-full w-64 px-2 sm:text-sm border-gray-300 rounded-md" id="email" name="email" type="email" value={this.state.email} onChange={this.handleChange} required />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mot de passe :</label>
                        <input className="focus:ring-Primaire focus:border-Primaire block min-w-full w-64 px-2 sm:text-sm border-gray-300 rounded-md" name="password" id="password" type="password" value={this.state.password} onChange={this.handleChange} required />
                    </div>
                    <div className="errMessage text-green-500">{this.state.success}</div>
                    <div className="errMessage text-red-500">{this.state.error}</div>
                    <button className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md bg-Secondaire" type="submit"  >Se connecter</button>
                </form>
                <Link to= "/signup" className="text-Primaire hover:text-PrimaireSombre">Pas encore de compte ? Inscrivez-vous !</Link>
            </div>
        )
    }

}