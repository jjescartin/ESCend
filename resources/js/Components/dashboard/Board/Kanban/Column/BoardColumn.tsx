import { CardTile, Column, ColumnPayload } from "@/Interface/Dashboard";
import BoardCard from "./Card/BoardCard";
import { useDroppable } from "@dnd-kit/core";
import { useEffect, useRef, useState } from "react";

type Props = {
    column: Column,
    onCardClick: (card: CardTile) => void;
    onAddCardClick: (columnId: number) => void;
    onEdit: (id: number, payload: ColumnPayload) => void;
    onDelete: (id: number) => void;
}

export default function BoardColumn({ column, onCardClick, onAddCardClick, onEdit, onDelete }: Props) {
    const { setNodeRef, isOver } = useDroppable({ id: column.id });
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(column.title);
    const [color, setColor] = useState(column.color);
    const [error, setError] = useState("");
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleConfirmEdit = () => {
        if (!title.trim()) {
            setError("Column title is required");
            return;
        }
        setError("");
        onEdit(column.id, {title, color});
        setIsEditing(false);
    }

    const handleCancelEdit = () => {
        setTitle(column.title);
        setColor(column.color);
        setError("");
        setIsEditing(false);
    }

    return (
        <div 
            ref={setNodeRef}
            className="flex flex-col rounded-lg bg-gray-100 p-3 gap-2 w-64 shrink-0 h-full">
            {/* Column Header */}
            {isEditing ? (
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <input
                            type="color"
                            value={color}
                            onChange={(e) => setColor(e.target.value)}
                            className="w-7 h-7 rounded cursor-pointer border-0 shrink-0"
                        />
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="flex-1 text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:border-green-500"
                            autoFocus
                        />
                    </div>
                    {error && <p className="text-xs text-red-500">{error}</p>}
                    <div className="flex gap-2 justify-center">
                        <button
                            onClick={handleConfirmEdit}
                            className="text-sm text-white bg-green-700 px-3 py-1.5 rounded-lg hover:bg-green-800 transition-colors">
                            Save
                        </button>
                        <button
                            onClick={handleCancelEdit}
                            className="text-sm text-gray-500 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                        <div
                            className="w-3 h-3 rounded-full shrink-0"
                            style={{ backgroundColor: column.color }}
                        />
                        <span className="font-semibold text-sm text-gray-700">
                            {column.title}
                        </span>
                        <span className="text-xs text-gray-400">
                            {column.cards?.length ?? 0}
                        </span>
                    </div>
                    <div className="relative" ref={menuRef}>
                        <button
                            onClick={() => setIsMenuOpen(prev => !prev)}
                            className="text-gray-400 hover:text-gray-600 text-lg leading-none">
                            &#8943;
                        </button>
                        {isMenuOpen && (
                            <div className="absolute right-0 top-6 bg-white border border-gray-200 rounded-lg shadow-md z-10 w-36 py-1">
                                <button
                                    onClick={() => { setIsMenuOpen(false); setIsEditing(true) }}
                                    className="w-full text-left text-sm text-gray-700 px-3 py-2 hover:bg-gray-50">
                                    Edit column
                                </button>
                                <button
                                    onClick={() => { setIsMenuOpen(false); onDelete(column.id) }}
                                    className="w-full text-left text-sm text-red-500 px-3 py-2 hover:bg-red-50">
                                    Delete column
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
            {/* Cards */}
            <div className="relative flex-1">
                <div
                    className={"flex-1 rounded-lg transition-colors " + (isOver ? 'bg-gray-200' : '')}
                >
                    {(column.cards ?? []).map(card => (
                        <BoardCard
                            key={card.id}
                            card={card}
                            onClick={() => onCardClick(card)}
                        />
                    ))}
                </div>
                <button 
                    onClick={()=>{onAddCardClick(column.id)}}
                    className="w-full text-xs text-gray-400 border-2 border-dashed border-gray-300 rounded-lg py-1.5 hover:border-gray-400 hover:text-gray-500 transition-colors">
                    + Add card
                </button>
                {isEditing && (
                    <div className="absolute inset-0 bg-gray-100/60 backdrop-blur-sm rounded-lg" />
                )}
            </div>
        </div>
    );
}