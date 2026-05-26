import React from "react";
type Props = {
    isOpen: boolean
}
export default function Panel({isOpen}: Props) {
    return (
        <div className={`panel-component h-screen bg-green-400 flex flex-col items-center gap-4 px-2 py-4 transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'w-64 opacity-100' : 'w-0 px-0 opacity-0'}`}>
            this is the panel
        </div>
    );
}