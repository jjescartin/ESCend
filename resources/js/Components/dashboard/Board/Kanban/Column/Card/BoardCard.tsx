import { CardTile } from "@/Interface/Dashboard"
import { useDraggable } from "@dnd-kit/core";

type Props = {
    card: CardTile;
    onClick: ()=>void;
}

export default function BoardCard ({card, onClick}: Props) {
    const {attributes, listeners, setNodeRef, transform} = useDraggable({id: card.id});
    
    const style = transform ? {
        transform:  `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 999,
    } : undefined;

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            onClick={onClick}
            className="bg-white rounded-md p-3 my-3 shadow-sm text-sm text-gray-800 cursor-pointer"
        >
            <div {...listeners} className="flex flex-col mb-2 font-semibold">
                {card.code}
            </div>
            <div className="flex flex-wrap gap-1 mb-4 text-center">
                <span>{card.title}</span>
            </div>
            <div className="flex justify-between gap-1">
                <div className="flex">
                    {card.tags.map(tag=>(
                        <span
                            key={tag.id}
                            className="text-xs px-2 py-0.5 rounded-lg text-white"
                            style={{backgroundColor: tag.color}}
                        >
                            {tag.label}
                        </span>
                    ))}
                </div>
                <div className="flex gap-1">
                    {card.assignees.map(assignee =>(
                        <div
                            key={assignee.id}
                            className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs font-semibold"
                        > 
                            {assignee.initials}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}