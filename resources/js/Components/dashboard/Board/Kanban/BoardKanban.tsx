import { CardDetail, CardTile, Column } from "@/Interface/Dashboard"
import BoardColumn from "./Column/BoardColumn"
import AddColumn from "./Column/AddColumn"
import { useState, useEffect } from "react"
import CardModal from "./Column/Card/CardModal"
import { MOCK_CARD_DETAILS } from "@/mock"
import { DndContext, DragEndEvent } from "@dnd-kit/core"
import { getCardDetails } from "@/APIs/Board/GetCardDetails"
import { updateCardColumn } from "@/APIs/Board/UpdateCardColumn"

type Props = {
    columns: Column []
}

export default function BoardKanban ({columns: initialColumns}: Props) {
    const [selectedCard, setSelectedCard] = useState<CardDetail | null> (null);
    const [columns, setColumns] = useState<Column[]>(initialColumns);

    const handleCardClick = async(card: CardTile) => {
        try {
            const res = await getCardDetails(card.id);

            console.log(res);
            if (res.success) {
                setSelectedCard(res.data); 
            }
        } catch(error) {
            console.log('Failed to load card data', error);
        }
    }

    const handleModalClose = () => {
        console.log('closing modal')
        setSelectedCard(null)
    }


    const handleDragEnd = async (event: DragEndEvent) => {
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

        try {
            const id = cardId;
            await updateCardColumn({ id, newColId: targetColumnId, oldColId: sourceColumn.id });
        } catch(error) {
            console.log('Failed to update card column', error);
        }
    }
    
    useEffect(() => {
        setColumns(initialColumns);
    }, [initialColumns]);

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