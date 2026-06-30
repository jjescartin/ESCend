import { useState } from "react"
import { CardDetail, CardPayload } from "@/Interface/Dashboard"

type Props = {
    cardDetails: CardDetail,
    onClose: () => void,
    onUpdate: (field: keyof CardPayload, value: string) => void,
    onDelete: () => void
}

type EditingField = 'title' | 'description' | null

const PRIORITY_OPTIONS = ['low', 'medium', 'high']

export default function CardModal({ cardDetails, onClose, onUpdate, onDelete }: Props) {

    const [state, setState] = useState({
        editingField: null as EditingField,
        isLoading: false,
        commentInput: '',
        form: {
            title: cardDetails.title,
            description: cardDetails.description ?? '',
            priority: cardDetails.priority,
            due_date: cardDetails.due_date ?? '',
        }
    })

    const startEdit = (field: EditingField) => {
        setState(prev => ({ ...prev, editingField: field }))
    }

    const cancelEdit = () => {
        setState(prev => ({
            ...prev,
            editingField: null,
            form: {
                ...prev.form,
                title: cardDetails.title,
                description: cardDetails.description ?? '',
                priority: cardDetails.priority,
                due_date: cardDetails.due_date ?? '',
            }
        }))
    }

    const handleFieldChange = (field: keyof typeof state.form, value: string) => {
        setState(prev => ({ ...prev, form: { ...prev.form, [field]: value } }))
    }

    const confirmEdit = (field: keyof CardPayload) => {
        onUpdate(field, state.form[field] ?? '')
        setState(prev => ({ ...prev, editingField: null }))
    }

    const confirmDirectEdit = (field: keyof CardPayload, value: string) => {
        handleFieldChange(field, value)
        onUpdate(field, value)
    }

    const EditActions = ({ field }: { field: keyof CardPayload }) => (
        <div className="flex gap-1">
            <button
                onClick={() => confirmEdit(field)}
                disabled={state.isLoading}
                className="flex items-center border border-green-200 text-green-600 rounded px-1.5 py-0.5 hover:bg-green-50 disabled:opacity-50 text-xs"
            >
                {state.isLoading
                    ? <span className="w-3 h-3 border border-gray-300 border-t-blue-500 rounded-full animate-spin inline-block" />
                    : '✓'
                }
            </button>
            <button
                onClick={cancelEdit}
                className="flex items-center border border-red-200 text-red-400 rounded px-1.5 py-0.5 hover:bg-red-50 text-xs"
            >
                ✕
            </button>
        </div>
    )

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl w-[900px] max-h-[90vh] flex flex-col">

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-2 border-b">
                    <span className="text-xs text-gray-400">{cardDetails.code}</span>
                    <div className="flex items-center gap-2">
                        <button onClick={onDelete} className="text-xs text-red-400 hover:text-red-600 transition-colors">Delete</button>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
                    </div>    
                </div>

                {/* Body */}
                <div className="flex flex-1 overflow-hidden">

                    {/* LEFT */}
                    <div className="w-[60%] overflow-y-auto px-6 py-4 flex flex-col gap-6">

                        {/* Title */}
                        <div className="flex items-center justify-between gap-2">
                            {state.editingField === 'title' ? (
                                <>
                                    <input
                                        type="text"
                                        value={state.form.title}
                                        onChange={e => handleFieldChange('title', e.target.value)}
                                        className="flex-1 text-lg font-semibold text-gray-800 border border-blue-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-300"
                                        autoFocus
                                    />
                                    <EditActions field="title" />
                                </>
                            ) : (
                                <>
                                    <h2 className="text-lg font-semibold text-gray-800">{state.form.title}</h2>
                                    <button
                                        onClick={() => startEdit('title')}
                                        className="text-gray-400 hover:text-gray-600 transition-colors shrink-0"
                                    >
                                        &#9998;&#xFE0E;
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Description */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-sm font-semibold text-gray-700">Description</h3>
                                {state.editingField === 'description'
                                    ? <EditActions field="description" />
                                    : (
                                        <button
                                            onClick={() => startEdit('description')}
                                            className="text-gray-400 hover:text-gray-600 transition-colors shrink-0"
                                        >
                                            &#9998;&#xFE0E;
                                        </button>
                                    )
                                }
                            </div>
                            {state.editingField === 'description' ? (
                                <textarea
                                    value={state.form.description}
                                    onChange={e => handleFieldChange('description', e.target.value)}
                                    placeholder="Add a description..."
                                    rows={5}
                                    className="w-full border border-blue-300 rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-300 resize-y"
                                    autoFocus
                                />
                            ) : (
                                <p className="text-sm text-gray-600">
                                    {state.form.description || "No description provided."}
                                </p>
                            )}
                        </div>

                        {/* Activity */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-2">Activity</h3>
                            <div className="flex gap-2 mb-4">
                                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-semibold shrink-0">
                                    JE
                                </div>
                                <input
                                    type="text"
                                    value={state.commentInput}
                                    onChange={e => setState(prev => ({ ...prev, commentInput: e.target.value }))}
                                    placeholder="Add a comment..."
                                    className="flex-1 border rounded-md px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-300"
                                />
                            </div>
                            <div className="flex flex-col gap-4">
                                {cardDetails.comments.length > 0
                                    ? cardDetails.comments.map(comment => (
                                        <div key={comment.id} className="flex gap-2">
                                            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-xs font-semibold shrink-0">
                                                {comment.user.initials}
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-xs font-semibold text-gray-700">{comment.user.name}</span>
                                                    <span className="text-xs text-gray-400">{comment.created_at}</span>
                                                </div>
                                                <p className="text-sm text-gray-600">{comment.message}</p>
                                            </div>
                                        </div>
                                    ))
                                    : <p className="text-sm text-gray-400">No comments yet.</p>
                                }
                            </div>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="w-[40%] px-4 py-4 flex flex-col gap-4 text-sm shrink-0">
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">Details</h3>

                        {/* Priority */}
                        <div className="flex items-center justify-between">
                            <p className="text-xs text-gray-400">Priority</p>
                            <select
                                value={state.form.priority}
                                onChange={e => confirmDirectEdit('priority', e.target.value)}
                                className="text-sm font-semibold text-gray-700 border border-gray-200 rounded-md px-2 py-0.5 focus:outline-none focus:ring-1 focus:ring-blue-300 cursor-pointer"
                            >
                                {PRIORITY_OPTIONS.map(p => (
                                    <option key={p} value={p}>{p}</option>
                                ))}
                            </select>
                        </div>

                        {/* Date Created */}
                        <div className="flex items-center justify-between">
                            <p className="text-xs text-gray-400">Date Created</p>
                            <span className="font-semibold text-gray-700">{cardDetails.created_at}</span>
                        </div>

                        {/* Due Date */}
                        <div className="flex items-center justify-between">
                            <p className="text-xs text-gray-400">Due Date</p>
                            <input
                                type="date"
                                value={state.form.due_date}
                                onChange={e => confirmDirectEdit('due_date', e.target.value)}
                                className="text-sm font-semibold text-gray-700 border border-gray-200 rounded-md px-2 py-0.5 focus:outline-none focus:ring-1 focus:ring-blue-300 cursor-pointer"
                            />
                        </div>

                        {/* Assignees */}
                        <div className="flex items-center justify-between">
                            <p className="text-xs text-gray-400">Assignees</p>
                            <div className="flex items-center gap-2">
                                <div className="flex flex-col gap-2">
                                    {cardDetails.assignees.map(assignee => (
                                        <div key={assignee.id} className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center text-xs font-semibold">
                                                {assignee.initials}
                                            </div>
                                            <span className="text-gray-700">{assignee.name}</span>
                                        </div>
                                    ))}
                                </div>
                                <button className="text-gray-200 cursor-not-allowed" title="Coming soon">
                                    &#9998;&#xFE0E;
                                </button>
                            </div>
                        </div>

                        {/* Tags */}
                        <div>
                            <div className="flex items-center justify-between mb-1">
                                <p className="text-xs text-gray-400">Tags</p>
                                <button className="text-gray-200 cursor-not-allowed" title="Coming soon">
                                    &#9998;&#xFE0E;
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-1">
                                {cardDetails.tags.map(tag => (
                                    <span
                                        key={tag.id}
                                        className="text-xs px-2 py-0.5 rounded-full text-white"
                                        style={{ backgroundColor: tag.color }}
                                    >
                                        {tag.label}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}