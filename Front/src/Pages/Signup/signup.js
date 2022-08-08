import React from "react";
import { Link } from "react-router-dom";
import Logo from "Shared/Composants/logo";
import { authService } from "Shared/Services/auth";

export default class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            error: ""
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
        authService.signup(this.state.email, this.state.password)
            .then(signup => {
                window.location.href = "/login";
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
            <div className="text-center">
                <Logo />
                <form className="flex flex-col items-center" onSubmit={this.handleSubmit}>
                    <div className="flex flex-row">
                    <label> Email :</label>
                    <input className="" name="email" type="email" value={this.state.email} onChange={this.handleChange} />
                    </div>
                    <div className="flex flex-row">
                    <label>Mot de passe :</label>
                    <input className="" name="password" type="password" value={this.state.password} onChange={this.handleChange} />
                    </div>
                    <div className="errMessage">{this.state.error}</div>
                    <input type="submit" value="S'inscrire" />
                </form>
                <Link to= "/login">Déjà inscrit ? Connectez-vous !</Link>

            </div>
        )
    }

}