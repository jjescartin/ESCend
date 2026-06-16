import { CardDetail, CardTile, Column } from "@/Interface/Dashboard"
import BoardColumn from "./Column/BoardColumn"
import AddColumn from "./Column/AddColumn"
import { useState } from "react"
import CardModal from "./Column/Card/CardModal"
import { MOCK_CARD_DETAILS } from "@/mock"
import { DndContext, DragEndEvent } from "@dnd-kit/core"

type Props = {
    columns: Column []
}

export default function BoardKanban ({columns: initialColumns}: Props) {
    const [selectedCard, setSelectedCard] = useState<CardDetail | null> (null);
    const [columns, setColumns] = useState<Column[]>(initialColumns);

    const handleCardClick = (card: CardTile) => {
        const cardDetail = MOCK_CARD_DETAILS.find(c => c.id === card.id) ?? null;
        setSelectedCard(cardDetail)
        console.log('opening modal', cardDetail);
    }

    const handleModalClose = () => {
        console.log('closing modal')
        setSelectedCard(null)
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const {active, over} = event;
        
        if (!over) return;

        const cardId = active.id as number;
        const targetColumnId = over.id as number;

        const sourceColumn = columns.find(col=>(
            col.cards.some( card => card.id === cardId)
        ));

        if (!sourceColumn || sourceColumn.id === targetColumnId) return;

        const card = sourceColumn.cards.find(c => c.id === cardId);
        if (!card) return; 
        setColumns(prev => prev.map(col => {
            if (col.id === sourceColumn.id) {
                return { ...col, cards: col.cards.filter(c => c.id !== cardId) };
            }
            if (col.id === targetColumnId) {
                return { ...col, cards: [...col.cards, card] };
            }
            return col;
        }));
    }

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div className="flex flex-row gap-4 p-4 flex-1 h-full">
                {columns.map(columns=>(
                    <BoardColumn 
                        key={columns.id} 
                        column={columns}
                        onCardClick = {handleCardClick}
                    />
                ))}
                <AddColumn />

                {selectedCard && (
                    <CardModal 
                        cardDetails = {selectedCard}
                        onClose = {handleModalClose}
                    />
                )}
            </div>
        </DndContext>
    )
}