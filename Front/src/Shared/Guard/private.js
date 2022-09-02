import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { authService } from "Shared/Services/auth";

export default function Private({children}){
    const {id} = useParams();
    if (authService.isConnected()){
        return React.cloneElement(children, {id});
    }
    return <Navigate to="/login" replace/>;
}