import React, { useState, useEffect } from "react";
import { BoardContent, BoardPayload } from "@/Interface/Dashboard";

type Props = {
    mode: 'create' | 'edit',
    board?: BoardContent | null,
    onClose: () => void,
    onSubmit: (data: BoardPayload) => void,
    onDelete?: (id: number) => void,
}

export default function BoardFormModal({ mode, board, onClose, onSubmit, onDelete }: Props) {

    const [formData, setFormData] = useState<BoardPayload>({
        name: "",
        description: null,
        end_date: null,
    });

    const [editingField, setEditingField] = useState<string | null>(null);
    const [tempValue, setTempValue] = useState("");

    const [error, setError] = useState< {name?:string}>({});

    useEffect(() => {
        if (mode === 'edit' && board) {
            setFormData({
                name: board.name ?? "",
                description: board.description ?? null,
                end_date: board.end_date ? board.end_date.substring(0, 10) : null,
            });
        }
    }, [mode, board]);

    const startEdit = (field: keyof BoardPayload, current: string) => {
        setEditingField(field);
        setTempValue(current ?? "");
    }

    const confirmEdit = (field: keyof BoardPayload) => {
        setFormData(prev => ({ ...prev, [field]: tempValue || null }));
        setEditingField(null);
        setTempValue("");
    }

    const cancelEdit = () => {
        setEditingField(null);
        setTempValue("");
    }

    const formatDate = (dateStr: string | null) => {
        if (!dateStr) return "No date set";
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }

    const handleSubmit = () => {
        console.log(formData);
        if (!formData.name.trim()) {
            setError({name: 'Board name is required'});
            return;
        };
        setError({});
        onSubmit(formData);
        onClose();
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-xl border border-gray-200 w-full max-w-md p-6">

                {/* header */}
                <div className="flex items-center justify-between mb-6">
                    <span className="text-base font-medium text-gray-900">
                        {mode === 'create' ? 'Create board' : 'Edit board'}
                    </span>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <span className="text-lg">&#x2715;</span>
                    </button>
                </div>

                {/* board name */}
                <div className="mb-4">
                    <p className="text-xs text-gray-400 mb-1">Board name  <span className="text-red-500">*</span></p>
                    {editingField === 'name' ? (
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                value={tempValue}
                                onChange={(e) => setTempValue(e.target.value)}
                                className={"flex-1 text-sm border rounded-lg px-3 py-1.5 focus:outline-none " + (error.name ? "border-red-400 focus:border-red-400" : "border-gray-300 focus:border-green-500")}
                                autoFocus
                            />
                            <button onClick={() => confirmEdit('name')} className="text-green-600 hover:text-green-700">&#10003;</button>
                            <button onClick={cancelEdit} className="text-red-500 hover:text-red-600">&#x2715;</button>
                        </div>
                    ) : (
                        <>
                            <div className="flex items-center justify-between gap-2">
                                <span className="text-sm font-medium text-gray-900">
                                    {formData.name || 'Click pencil to set name'}
                                </span>
                                <button onClick={() => startEdit('name', formData.name)} className="text-gray-400 hover:text-gray-600 text-sm">&#9998;</button>
                            </div>
                            {error.name && (
                                <p className="text-xs text-red-500 mt-1">{error.name}</p>
                            )}
                        </>
                    )}
                </div>

                {/* description */}
                <div className="border-t border-gray-100 pt-4 mb-4">
                    <p className="text-xs text-gray-400 mb-1">Description <span className="text-xs">(optional)</span></p>
                    {editingField === 'description' ? (
                        <div className="flex flex-col gap-2">
                            <textarea
                                value={tempValue}
                                onChange={(e) => setTempValue(e.target.value)}
                                rows={3}
                                className="text-sm border border-gray-300 rounded-lg px-3 py-1.5 resize-y focus:outline-none focus:border-green-500"
                                autoFocus
                            />
                            <div className="flex justify-end gap-2">
                                <button onClick={() => confirmEdit('description')} className="text-green-600 hover:text-green-700">&#10003;</button>
                                <button onClick={cancelEdit} className="text-red-500 hover:text-red-600">&#x2715;</button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-start justify-between gap-2">
                            <span className="text-sm text-gray-500 leading-relaxed">
                                {formData.description || 'No description'}
                            </span>
                            <button onClick={() => startEdit('description', formData.description ?? "")} className="text-gray-400 hover:text-gray-600 text-sm shrink-0">&#9998;</button>
                        </div>
                    )}
                </div>

                {/* end date */}
                <div className="border-t border-gray-100 pt-4 mb-6">
                    <p className="text-xs text-gray-400 mb-1">End date <span className="text-xs">(optional)</span></p>
                    {editingField === 'end_date' ? (
                        <div className="flex items-center gap-2">
                            <input
                                type="date"
                                value={tempValue}
                                onChange={(e) => setTempValue(e.target.value)}
                                className="flex-1 text-sm border border-gray-300 rounded-lg px-3 py-1.5 focus:outline-none focus:border-green-500"
                                autoFocus
                            />
                            <button onClick={() => confirmEdit('end_date')} className="text-green-600 hover:text-green-700">&#10003;</button>
                            <button onClick={cancelEdit} className="text-red-500 hover:text-red-600">&#x2715;</button>
                        </div>
                    ) : (
                        <div className="flex items-center justify-between gap-2">
                            <span className="text-sm text-gray-500">{formatDate(formData.end_date)}</span>
                            <button onClick={() => startEdit('end_date', formData.end_date ?? "")} className="text-gray-400 hover:text-gray-600 text-sm">&#9998;</button>
                        </div>
                    )}
                </div>

                {/* footer */}
                <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                    {mode === 'edit' && onDelete && board ? (
                        <button
                            onClick={() => { onDelete(board.id); onClose(); }}
                            className="flex items-center gap-1.5 text-sm text-red-500 border border-red-300 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors">
                            &#128465; Delete board
                        </button>
                    ) : <div />}

                    <div className="flex gap-2">
                        <button
                            onClick={onClose}
                            className="text-sm text-gray-500 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="text-sm text-white bg-green-700 px-3 py-1.5 rounded-lg hover:bg-green-800 transition-colors">
                            {mode === 'create' ? 'Create' : 'Save'}
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}