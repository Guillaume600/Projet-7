import React from "react";
import Logo, { LogoType } from "./logo";
import { MdLogout } from "react-icons/md";
import { authService } from "Shared/Services/auth";
import { Link } from "react-router-dom";


export default class Navigation extends React.Component {
    logout() {
        authService.logout();
    }

    render() {
        return (
            <div className="flex justify-between items-center p-2 border-b mb-8">
                <Link to = "/"><Logo type={LogoType.Color} /></Link>
                <div>
                    <span className="mr-3 hidden md:inline">{this.props.email}</span>
                    <button onClick={this.logout} className="inline-flex items-center self-end px-4 py-2  font-semibold leading-6 text-sm shadow rounded-md bg-Secondaire">
                        <MdLogout />
                    </button>
                </div>
            </div>
        )
    }
}