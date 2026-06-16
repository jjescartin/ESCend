import { CardTile, Column } from "@/Interface/Dashboard";
import BoardCard from "./Card/BoardCard";
import { useDroppable } from "@dnd-kit/core";

type Props = {
    column: Column,
    onCardClick: (card: CardTile)=> void;
}

export default function BoardColumn ({column, onCardClick}:Props) {
    const {setNodeRef, isOver} = useDroppable({
        id:column.id
    });

    return (
        <div className="flex flex-col rounded-lg bg-gray-100 p-3 gap-2 w-64 shrink-0 h-full">
            {/* Column Header */}
            <div >
                <span 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: column.color}}
                />
                <span className="foont-semibold text-sm text-gray-700">
                    {column.title}
                </span>
                {/* <span className="text-xs text-gray-400">
                    {column.cards.length}
                </span> */}
            </div>

            {/* Cards - this is the droppable area */}
            <div
                ref={setNodeRef}
                className={`flex-1 rounded-lg transition-colors ${isOver ? 'bg-gray-200' : ''}`}
            >
                {column.cards.map( card=>(
                    // <div key={card.id} className="bg-white rounded-md p-3 my-3 shadow-sm text-sm text-gray-800">
                    //     {card.title}
                    // </div>
                    <BoardCard 
                        key={card.id}
                        card={card}
                        onClick={()=> onCardClick(card)}
                    />
                ))}
            </div>
        </div>
    );
}