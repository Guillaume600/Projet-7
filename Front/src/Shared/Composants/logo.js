import React from "react";
import LogoImg from "../../Assets/icon-left-font-monochrome-black.svg"
import LogoImgWhite from "../../Assets/icon-left-font-monochrome-white.svg"
import LogoImgColor from "../../Assets/icon-left-font.png"


export default function Logo(props) {
    if (props.type === LogoType.Color){
        return <img src={LogoImgColor} alt="Logo Groupomania" />   
    } 
    if (props.type === LogoType.White){
        return <img src={LogoImgWhite} alt="Logo Groupomania" />   
    } 

    return <img src={LogoImg} alt="Logo Groupomania" /> 
}

export const LogoType = {
    White: "w",
    Black: "b",
    Color: "c"
}