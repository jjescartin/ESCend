import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

type Props = {
    icon: IconDefinition,
    label: String,
    onClick: ()=> void,
}

export default function RailButtons({icon, label, onClick}: Props){
    return (
        <button
            className="text-white flex flex-col items-center w-full text-2xl px-3 py-3 border-2 border-transparent hover:border-green-400 rounded-3xl group"
            onClick={onClick}
        >
            <FontAwesomeIcon icon = {icon} className="group-hover:text-green-400 mb-1"/>
            <span className="text-xs group-hover:text-green-400">{label}</span>
        </button>
    );
}