import { CardDetail, CardPayload, CardTile, Column, ColumnPayload } from "@/Interface/Dashboard"
import BoardColumn from "./Column/BoardColumn"
import AddColumn from "./Column/AddColumn"
import { useState, useEffect } from "react"
import CardModal from "./Column/Card/Modals/CardModal"
import CardFormModal from "./Column/Card/Modals/CardFormModal"
import { DndContext, DragEndEvent } from "@dnd-kit/core"
import { getCardDetails } from "@/APIs/Board/GetCardDetails"
import { updateCardColumn } from "@/APIs/Board/UpdateCardColumn"
import { createCard } from "@/APIs/Board/CardActions/CreateCard"
import { updateCard } from "@/APIs/Board/CardActions/UpdateCard"
import { deleteCard } from "@/APIs/Board/CardActions/DeleteCard"

type Props = {
    columns: Column[],
    onAddColumn: (payload: ColumnPayload) => void,
    onUpdateColumn: (id: number, payload: ColumnPayload) => void,
    onDeleteColumn: (id: number) => void,
}

const PRIORITY_OPTIONS = ['low', 'medium', 'high']

export default function BoardKanban({ columns: initialColumns, onAddColumn, onUpdateColumn, onDeleteColumn }: Props) {
    const [selectedCard, setSelectedCard] = useState<CardDetail | null>(null)
    const [columns, setColumns] = useState<Column[]>(initialColumns)

    // card form state
    const [showCardForm, setShowCardForm] = useState(false)
    const [cardFormData, setCardFormData] = useState<CardPayload>({
        title: '',
        description: null,
        priority: 'medium',
        due_date: null,
    });
    const [cardFormColumnId, setCardFormColumnId] = useState<number>(0);
    const [cardEditingField, setCardEditingField] = useState<string | null>(null)
    const [cardTempValue, setCardTempValue] = useState('')
    const [cardError, setCardError] = useState<{ title?: string }>({})

    // card modal handlers
    const handleCardClick = async (card: CardTile) => {
        try {
            const res = await getCardDetails(card.id)
            if (res.success) {
                setSelectedCard(res.data)
            }
        } catch (error) {
            console.log('Failed to load card data', error)
        }
    }

    const handleModalClose = () => {
        setSelectedCard(null)
    }

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event
        if (!over) return

        const cardId = active.id as number
        const targetColumnId = over.id as number

        const sourceColumn = columns.find(col => col.cards.some(card => card.id === cardId))
        if (!sourceColumn || sourceColumn.id === targetColumnId) return

        const card = sourceColumn.cards.find(c => c.id === cardId)
        if (!card) return
        setColumns(prev => prev.map(col => {
            if (col.id === sourceColumn.id) return { ...col, cards: col.cards.filter(c => c.id !== cardId) }
            if (col.id === targetColumnId) return { ...col, cards: [...col.cards, card] }
            return col
        }))

        try {
            await updateCardColumn({ id: cardId, newColId: targetColumnId, oldColId: sourceColumn.id })
        } catch (error) {
            console.log('Failed to update card column', error)
        }
    }

    const handleOpenCardForm = (columnId: number) => {
        setCardFormColumnId(columnId)
        setCardFormData({ title: '', description: null, priority: 'medium', due_date: null })
        setCardEditingField(null)
        setCardTempValue('')
        setCardError({})
        setShowCardForm(true)
    }

    const handleCloseCardForm = () => {
        setShowCardForm(false)
    }

    const handleCardUpdate = async (field: keyof CardPayload, value: string) => {
        if (!selectedCard) return
        try {
            const res = await updateCard(selectedCard.id, { [field]: value })
            if (res.success) {
                setSelectedCard(prev => prev ? { ...prev, [field]: value } : null)
                setColumns(prev => prev.map(col => ({
                    ...col,
                    cards: col.cards.map(card =>
                        card.id === selectedCard.id
                            ? { ...card, [field]: value }
                            : card
                    )
                })))
            }
        } catch (error) {
            console.log('Failed to update card', error)
        }
    }

    const handleCardDelete = async () => {
        if (!selectedCard) return
        try {
            const res = await deleteCard(selectedCard.id)
            if (res.success) {
                setColumns(prev => prev.map(col => ({
                    ...col,
                    cards: col.cards.filter(card => card.id !== selectedCard.id)
                })))
                handleModalClose()
            }
        } catch (error) {
            console.log('Failed to delete card', error)
        }
    }

    const handleCardFieldChange = (field: keyof CardPayload, value: string) => {
        setCardFormData(prev => ({ ...prev, [field]: value || null }))
    }

    const handleCreateCard = async () => {
        try {
            console.log(cardFormData);
            const res = await createCard(cardFormColumnId, cardFormData);
            if (res.success) {
                setColumns(prev => prev.map(col =>
                    col.id === cardFormColumnId
                        ? { ...col, cards: [...col.cards, { ...res.data, tags: [], assignees: [] }] }
                        : col
                ))
                handleCloseCardForm()
            }
        } catch (error) {
            console.log('Failed to create new card', error)
        }
    }

    useEffect(() => {
        setColumns(initialColumns)
    }, [initialColumns])

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div className="flex flex-row gap-4 p-4 flex-1 h-full">
                {columns.map(column => (
                    <BoardColumn
                        key={column.id}
                        column={column}
                        onCardClick={handleCardClick}
                        onAddCardClick={handleOpenCardForm}
                        onEdit={onUpdateColumn}
                        onDelete={onDeleteColumn}
                    />
                ))}
                <AddColumn onAdd={onAddColumn} />

                {selectedCard && (
                    <CardModal
                        cardDetails={selectedCard}
                        onClose={handleModalClose}
                        onUpdate={handleCardUpdate}
                        onDelete= {handleCardDelete}
                    />
                )}

                {showCardForm && (
                    <CardFormModal
                        formData={cardFormData}
                        priorityOptions={PRIORITY_OPTIONS}
                        onClose={handleCloseCardForm}
                        onCardCreate={handleCreateCard}
                        onFieldChange={handleCardFieldChange}
                    />
                )}
            </div>
        </DndContext>
    )
}