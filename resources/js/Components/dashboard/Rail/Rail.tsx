import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faBell, faCircleUser, faTableColumns, faBolt, faSearch } from '@fortawesome/free-solid-svg-icons';
import RailButtons from "./RailButtons";

type Props = {
    showPanel: (selected:string)=> void
}

export default function Rail({showPanel}: Props) {
    return (
        <div className="rail-component top-0 left-0 h-screen w-15 flex flex-col items-center bg-black gap-4 px-2 py-3  justify-between">
            {/* Top section */}
            <div className="flex flex-col items-center w-100">
                <div className="text-green-500  text-3xl font-bold py-2 pb-5 px-2">
                    ESC
                </div>
                <RailButtons 
                    icon={faTableColumns}
                    label={"Board"}
                    onClick={showPanel}
                />
                <RailButtons 
                    icon={faSearch}
                    label={"Search"}
                    onClick={showPanel}
                />
                <RailButtons 
                    icon={faBell}
                    label={"Alerts"}
                    onClick={showPanel}
                />
            </div>

            {/* Bottom section */}
            <div className="flex flex-col items-center ">
                <button className="text-White text-3xl py-3 px-2" onClick={()=>showPanel("Profile")}>
                    <FontAwesomeIcon icon={faCircleUser}/>
                </button>
            </div>
        </div>
    );
}