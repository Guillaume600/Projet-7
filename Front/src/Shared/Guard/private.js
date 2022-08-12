import React from "react";
import { Navigate } from "react-router-dom";
import { authService } from "Shared/Services/auth";

export default function Private({children}){
    if (authService.isConnected()){
        return children;
    }
    return <Navigate to="/login" replace/>;
}